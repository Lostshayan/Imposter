import { GameRoom, Player, GameSettings, ClientGameState, RoundClueRecord } from '../types/game';
import { getRandomWord } from './wordBank';
import { createBotPlayer, generateBotClue, pickBotVote, pickBotImposterGuess } from './botEngine';

const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function generateRoomCode(): string {
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += CODE_CHARS.charAt(Math.floor(Math.random() * CODE_CHARS.length));
  }
  return code;
}

export const DEFAULT_SETTINGS: GameSettings = {
  clueTime: 45,
  voteTime: 40,
  guessTime: 25,
  category: 'All',
  allowImposterGuess: true,
  imposterCount: 1,
  maxRounds: 3,
};

export class GameRoomManager {
  private rooms: Map<string, GameRoom> = new Map();
  private timers: Map<string, NodeJS.Timeout> = new Map();

  public getRoom(code: string): GameRoom | undefined {
    return this.rooms.get(code.toUpperCase());
  }

  public createRoom(hostName: string, avatar: string, color: string): { room: GameRoom; hostPlayer: Player } {
    let code = generateRoomCode();
    while (this.rooms.has(code)) {
      code = generateRoomCode();
    }

    const hostPlayer: Player = {
      id: `player_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: hostName || 'Player 1',
      avatar: avatar || '🕵️',
      color: color || 'from-blue-500 to-indigo-600',
      isHost: true,
      isBot: false,
      isAlive: true,
      score: 0,
      role: null,
      clue: null,
      hasSubmittedClue: false,
      votedFor: null,
      votesReceived: 0,
    };

    const room: GameRoom = {
      code,
      phase: 'LOBBY',
      round: 1,
      players: [hostPlayer],
      currentWord: null,
      imposterIds: [],
      phaseEndTime: null,
      phaseDuration: 0,
      settings: { ...DEFAULT_SETTINGS },
      history: [],
      lastEliminated: null,
      winner: null,
    };

    this.rooms.set(code, room);
    return { room, hostPlayer };
  }

  public joinRoom(code: string, playerName: string, avatar: string, color: string): { room?: GameRoom; player?: Player; error?: string } {
    const room = this.getRoom(code);
    if (!room) {
      return { error: 'Room not found. Check the 4-character code!' };
    }

    if (room.phase !== 'LOBBY') {
      return { error: 'Game is already in progress in this room.' };
    }

    if (room.players.length >= 12) {
      return { error: 'Room is full (maximum 12 players).' };
    }

    const player: Player = {
      id: `player_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: playerName || `Player ${room.players.length + 1}`,
      avatar: avatar || '🕵️',
      color: color || 'from-violet-500 to-purple-600',
      isHost: false,
      isBot: false,
      isAlive: true,
      score: 0,
      role: null,
      clue: null,
      hasSubmittedClue: false,
      votedFor: null,
      votesReceived: 0,
    };

    room.players.push(player);
    return { room, player };
  }

  public addBot(code: string): { room?: GameRoom; error?: string } {
    const room = this.getRoom(code);
    if (!room) return { error: 'Room not found' };
    if (room.phase !== 'LOBBY') return { error: 'Cannot add bots once game starts' };
    if (room.players.length >= 12) return { error: 'Room is full' };

    const botCount = room.players.filter((p) => p.isBot).length;
    const bot = createBotPlayer(botCount);
    room.players.push(bot);
    return { room };
  }

  public removeBot(code: string, botId: string): { room?: GameRoom; error?: string } {
    const room = this.getRoom(code);
    if (!room) return { error: 'Room not found' };
    room.players = room.players.filter((p) => p.id !== botId);
    return { room };
  }

  public updateSettings(code: string, newSettings: Partial<GameSettings>): GameRoom | undefined {
    const room = this.getRoom(code);
    if (!room) return undefined;
    room.settings = { ...room.settings, ...newSettings };
    return room;
  }

  public startGame(code: string): { room?: GameRoom; error?: string } {
    const room = this.getRoom(code);
    if (!room) return { error: 'Room not found' };
    if (room.players.length < 3) {
      return { error: 'Need at least 3 players to start! Add AI Bots if playing solo.' };
    }

    // Reset players for new game
    room.round = 1;
    room.winner = null;
    room.winReason = undefined;
    room.history = [];
    room.lastEliminated = null;

    // Pick random word
    const usedWordIds = room.history.map((h) => h.word);
    const word = getRandomWord(room.settings.category, usedWordIds);
    room.currentWord = word;

    // Assign Imposter(s)
    const alivePlayers = [...room.players];
    alivePlayers.forEach((p) => {
      p.isAlive = true;
      p.clue = null;
      p.hasSubmittedClue = false;
      p.votedFor = null;
      p.votesReceived = 0;
      p.role = 'CIVILIAN';
    });

    const imposterIndices = new Set<number>();
    const count = Math.min(room.settings.imposterCount, Math.floor(alivePlayers.length / 2));
    while (imposterIndices.size < count) {
      imposterIndices.add(Math.floor(Math.random() * alivePlayers.length));
    }

    room.imposterIds = [];
    imposterIndices.forEach((idx) => {
      alivePlayers[idx].role = 'IMPOSTER';
      room.imposterIds.push(alivePlayers[idx].id);
    });

    // Enter ROLE_REVEAL phase
    room.phase = 'ROLE_REVEAL';
    room.phaseDuration = 8;
    room.phaseEndTime = Date.now() + 8000;

    return { room };
  }

  public proceedToClueInput(code: string): GameRoom | undefined {
    const room = this.getRoom(code);
    if (!room) return undefined;

    room.phase = 'CLUE_INPUT';
    room.phaseDuration = room.settings.clueTime;
    room.phaseEndTime = Date.now() + room.settings.clueTime * 1000;

    // Reset clues
    room.players.forEach((p) => {
      p.clue = null;
      p.hasSubmittedClue = false;
      p.votedFor = null;
      p.votesReceived = 0;
    });

    // Automatically schedule bot clues with staggered human-like delays
    this.triggerBotClues(room);

    return room;
  }

  private triggerBotClues(room: GameRoom) {
    if (!room.currentWord) return;
    const botPlayers = room.players.filter((p) => p.isBot && p.isAlive);

    botPlayers.forEach((bot, index) => {
      const delayMs = 1500 + index * 1200 + Math.random() * 800;
      setTimeout(() => {
        const liveRoom = this.getRoom(room.code);
        if (liveRoom && liveRoom.phase === 'CLUE_INPUT' && liveRoom.currentWord) {
          const clue = generateBotClue(bot, liveRoom.currentWord);
          this.submitClue(liveRoom.code, bot.id, clue);
        }
      }, delayMs);
    });
  }

  public submitClue(code: string, playerId: string, clueText: string): { room?: GameRoom; allSubmitted?: boolean } {
    const room = this.getRoom(code);
    if (!room || room.phase !== 'CLUE_INPUT') return {};

    const player = room.players.find((p) => p.id === playerId);
    if (!player || !player.isAlive) return {};

    player.clue = clueText.trim();
    player.hasSubmittedClue = true;

    const alivePlayers = room.players.filter((p) => p.isAlive);
    const allSubmitted = alivePlayers.every((p) => p.hasSubmittedClue);

    if (allSubmitted) {
      this.proceedToClueShowcase(room.code);
    }

    return { room, allSubmitted };
  }

  public proceedToClueShowcase(code: string): GameRoom | undefined {
    const room = this.getRoom(code);
    if (!room) return undefined;

    // Fill in default clue for anyone who timed out
    room.players.filter((p) => p.isAlive && !p.hasSubmittedClue).forEach((p) => {
      p.clue = '(No clue submitted in time)';
      p.hasSubmittedClue = true;
    });

    room.phase = 'CLUE_SHOWCASE';
    room.phaseDuration = 25;
    room.phaseEndTime = Date.now() + 25000;

    return room;
  }

  public proceedToVoting(code: string): GameRoom | undefined {
    const room = this.getRoom(code);
    if (!room) return undefined;

    room.phase = 'VOTING';
    room.phaseDuration = room.settings.voteTime;
    room.phaseEndTime = Date.now() + room.settings.voteTime * 1000;

    room.players.forEach((p) => {
      p.votedFor = null;
      p.votesReceived = 0;
    });

    this.triggerBotVotes(room);

    return room;
  }

  private triggerBotVotes(room: GameRoom) {
    const botPlayers = room.players.filter((p) => p.isBot && p.isAlive);
    const alivePlayers = room.players.filter((p) => p.isAlive);
    const clues: RoundClueRecord[] = alivePlayers.map((p) => ({
      playerId: p.id,
      playerName: p.name,
      avatar: p.avatar,
      color: p.color,
      clue: p.clue || '',
    }));

    botPlayers.forEach((bot, index) => {
      const delayMs = 2000 + index * 1000 + Math.random() * 1000;
      setTimeout(() => {
        const liveRoom = this.getRoom(room.code);
        if (liveRoom && liveRoom.phase === 'VOTING') {
          const targetId = pickBotVote(bot, liveRoom.players.filter((p) => p.isAlive), clues, liveRoom.imposterIds);
          this.castVote(liveRoom.code, bot.id, targetId);
        }
      }, delayMs);
    });
  }

  public castVote(code: string, voterId: string, targetId: string): { room?: GameRoom; allVoted?: boolean } {
    const room = this.getRoom(code);
    if (!room || room.phase !== 'VOTING') return {};

    const voter = room.players.find((p) => p.id === voterId);
    if (!voter || !voter.isAlive) return {};

    voter.votedFor = targetId;

    const alivePlayers = room.players.filter((p) => p.isAlive);
    const allVoted = alivePlayers.every((p) => p.votedFor !== null);

    if (allVoted) {
      this.tallyVotes(room.code);
    }

    return { room, allVoted };
  }

  public tallyVotes(code: string): GameRoom | undefined {
    const room = this.getRoom(code);
    if (!room) return undefined;

    const alivePlayers = room.players.filter((p) => p.isAlive);

    // Count votes
    const voteCounts: Record<string, number> = {};
    alivePlayers.forEach((p) => {
      if (p.votedFor && p.votedFor !== 'SKIP') {
        voteCounts[p.votedFor] = (voteCounts[p.votedFor] || 0) + 1;
      }
    });

    alivePlayers.forEach((p) => {
      p.votesReceived = voteCounts[p.id] || 0;
    });

    // Find highest voted
    let maxVotes = 0;
    let eliminatedId: string | null = null;
    let isTie = false;

    Object.entries(voteCounts).forEach(([targetId, count]) => {
      if (count > maxVotes) {
        maxVotes = count;
        eliminatedId = targetId;
        isTie = false;
      } else if (count === maxVotes && maxVotes > 0) {
        isTie = true;
      }
    });

    // Save round clue history
    const roundClues: RoundClueRecord[] = alivePlayers.map((p) => ({
      playerId: p.id,
      playerName: p.name,
      avatar: p.avatar,
      color: p.color,
      clue: p.clue || '',
      isImposter: p.role === 'IMPOSTER',
    }));

    if (!isTie && eliminatedId && maxVotes > 0) {
      const eliminatedPlayer = room.players.find((p) => p.id === eliminatedId);
      if (eliminatedPlayer) {
        eliminatedPlayer.isAlive = false;
        const wasImposter = eliminatedPlayer.role === 'IMPOSTER';

        const imposterPlayers = room.players.filter((p) => p.role === 'IMPOSTER');
        const imposterNames = imposterPlayers.map((p) => p.name).join(', ') || 'The Imposter';

        if (wasImposter) {
          if (!room.settings.allowImposterGuess) {
            room.winner = 'CIVILIANS';
            room.winReason = `The Imposter (${eliminatedPlayer.name}) was discovered and voted out! Civilians win!`;
          }
        } else {
          // A Civilian was voted out by majority - game ends immediately!
          room.winner = 'IMPOSTER';
          room.winReason = `An innocent civilian (${eliminatedPlayer.name}) was wrongly voted out! The Imposter (${imposterNames}) deceived everyone and won!`;
        }

        room.lastEliminated = {
          player: { ...eliminatedPlayer },
          wasImposter,
        };

        room.history.push({
          round: room.round,
          word: room.currentWord?.word || '',
          category: room.currentWord?.category || '',
          clues: roundClues,
          eliminatedPlayerId: eliminatedPlayer.id,
          eliminatedPlayerName: eliminatedPlayer.name,
          wasImposterEliminated: wasImposter,
        });

        room.phase = 'VOTE_RESULTS';
        room.phaseDuration = 8;
        room.phaseEndTime = Date.now() + 8000;

        return room;
      }
    }

    // Tie or skipped votes: no one eliminated
    room.lastEliminated = null;
    room.history.push({
      round: room.round,
      word: room.currentWord?.word || '',
      category: room.currentWord?.category || '',
      clues: roundClues,
    });

    room.phase = 'VOTE_RESULTS';
    room.phaseDuration = 7;
    room.phaseEndTime = Date.now() + 7000;
    return room;
  }

  public resolveVoteOutcome(code: string): GameRoom | undefined {
    const room = this.getRoom(code);
    if (!room) return undefined;

    if (room.lastEliminated) {
      // Someone was voted out by majority - game concludes!
      if (room.lastEliminated.wasImposter) {
        if (room.settings.allowImposterGuess && room.lastEliminated.player) {
          room.phase = 'IMPOSTER_GUESS';
          room.phaseDuration = room.settings.guessTime;
          room.phaseEndTime = Date.now() + room.settings.guessTime * 1000;

          // If eliminated player is a bot, trigger bot guess
          if (room.lastEliminated.player.isBot && room.currentWord) {
            setTimeout(() => {
              const botGuess = pickBotImposterGuess(room.currentWord!);
              this.handleImposterGuess(room.code, botGuess);
            }, 3500);
          }
          return room;
        } else {
          // Civilians win directly!
          room.winner = 'CIVILIANS';
          room.winReason = `The Imposter (${room.lastEliminated.player.name}) was discovered and voted out! Civilians win!`;
          room.phase = 'GAME_OVER';
          return room;
        }
      } else {
        // A Civilian was voted out by majority! Game ends immediately with Imposter winning!
        const imposterPlayers = room.players.filter((p) => p.role === 'IMPOSTER');
        const imposterNames = imposterPlayers.map((p) => p.name).join(', ') || 'The Imposter';
        room.winner = 'IMPOSTER';
        room.winReason = `An innocent civilian (${room.lastEliminated.player.name}) was wrongly voted out! The Imposter (${imposterNames}) deceived everyone and won!`;
        room.phase = 'GAME_OVER';
        return room;
      }
    }

    // Nobody was eliminated (Tie vote or Skip)
    if (room.round >= room.settings.maxRounds) {
      room.winner = 'IMPOSTER';
      room.winReason = `Tie votes reached max rounds! The Imposter survived undetected.`;
      room.phase = 'GAME_OVER';
      return room;
    }

    // Tie: continue to next round so players can break the tie!
    room.round += 1;
    this.proceedToClueInput(room.code);
    return room;
  }

  public handleImposterGuess(code: string, guess: string): GameRoom | undefined {
    const room = this.getRoom(code);
    if (!room || room.phase !== 'IMPOSTER_GUESS' || !room.currentWord) return undefined;

    const normalizedGuess = guess.trim().toLowerCase();
    const correctWord = room.currentWord.word.toLowerCase();
    const isCorrect = normalizedGuess === correctWord;

    if (isCorrect) {
      room.winner = 'IMPOSTER';
      room.winReason = `The Imposter stole the win! Even though voted out, they correctly guessed the secret word "${room.currentWord.word}"!`;
    } else {
      room.winner = 'CIVILIANS';
      room.winReason = `Civilians Win! The Imposter guessed "${guess}", but the secret word was "${room.currentWord.word}".`;
    }

    room.phase = 'GAME_OVER';
    return room;
  }

  public resetToLobby(code: string): GameRoom | undefined {
    const room = this.getRoom(code);
    if (!room) return undefined;

    room.phase = 'LOBBY';
    room.round = 1;
    room.currentWord = null;
    room.imposterIds = [];
    room.winner = null;
    room.winReason = undefined;
    room.lastEliminated = null;
    room.history = [];

    room.players.forEach((p) => {
      p.isAlive = true;
      p.role = null;
      p.clue = null;
      p.hasSubmittedClue = false;
      p.votedFor = null;
      p.votesReceived = 0;
    });

    return room;
  }

  public removePlayer(code: string, playerId: string): GameRoom | undefined {
    const room = this.getRoom(code);
    if (!room) return undefined;

    const removedIndex = room.players.findIndex((p) => p.id === playerId);
    if (removedIndex === -1) return room;

    const wasHost = room.players[removedIndex].isHost;
    room.players.splice(removedIndex, 1);

    if (room.players.length === 0) {
      this.rooms.delete(code);
      return undefined;
    }

    if (wasHost) {
      // Transfer host to first non-bot player, or first player
      const nextHost = room.players.find((p) => !p.isBot) || room.players[0];
      if (nextHost) nextHost.isHost = true;
    }

    return room;
  }

  // Sanitized state for a specific client to avoid leaking the secret word or other players' roles
  public getSanitizedState(code: string, playerId: string): ClientGameState | null {
    const room = this.getRoom(code);
    if (!room) return null;

    const myPlayer = room.players.find((p) => p.id === playerId) || null;
    const isGameOver = room.phase === 'GAME_OVER';
    const isVoteResultEliminated = room.phase === 'VOTE_RESULTS' && room.lastEliminated !== null;
    const isImposterGuess = room.phase === 'IMPOSTER_GUESS';
    const showRoles = isGameOver || isVoteResultEliminated || isImposterGuess;

    const sanitizedPlayers = room.players.map((p) => {
      const { role, ...rest } = p;
      return {
        ...rest,
        role: showRoles || p.id === playerId ? role : null,
      };
    });

    const imposterPlayers = room.players.filter((p) => p.role === 'IMPOSTER');
    const originalImposters = showRoles
      ? imposterPlayers.map((p) => ({
          id: p.id,
          name: p.name,
          avatar: p.avatar,
          color: p.color,
          clue: p.clue,
          hint: room.currentWord?.hint || null,
        }))
      : undefined;

    let mySecretWord: string | null = null;
    let myHint: string | null = null;

    if (room.currentWord) {
      if (showRoles) {
        mySecretWord = room.currentWord.word;
        myHint = room.currentWord.hint;
      } else if (myPlayer) {
        if (myPlayer.role === 'CIVILIAN') {
          mySecretWord = room.currentWord.word;
          myHint = null;
        } else if (myPlayer.role === 'IMPOSTER') {
          mySecretWord = null;
          myHint = room.currentWord.hint;
        }
      }
    }

    const allClues: RoundClueRecord[] = room.players
      .filter((p) => p.clue !== null)
      .map((p) => ({
        playerId: p.id,
        playerName: p.name,
        avatar: p.avatar,
        color: p.color,
        clue: p.clue || '',
        isImposter: showRoles ? p.role === 'IMPOSTER' : undefined,
      }));

    return {
      code: room.code,
      phase: room.phase,
      round: room.round,
      players: sanitizedPlayers,
      myPlayer,
      currentCategory: room.currentWord?.category || null,
      mySecretWord,
      myHint,
      allClues,
      phaseEndTime: room.phaseEndTime,
      phaseDuration: room.phaseDuration,
      settings: room.settings,
      lastEliminated: room.lastEliminated
        ? {
            id: room.lastEliminated.player.id,
            name: room.lastEliminated.player.name,
            avatar: room.lastEliminated.player.avatar,
            wasImposter: room.lastEliminated.wasImposter,
          }
        : null,
      winner: room.winner,
      winReason: room.winReason,
      revealedWord: showRoles ? room.currentWord?.word : undefined,
      originalImposters,
      imposterGuessOptions: room.phase === 'IMPOSTER_GUESS' ? room.currentWord?.options : undefined,
    };
  }
}

// Global singleton for server-side persistence
declare global {
  var __gameRoomManager: GameRoomManager | undefined;
}

export const gameManager = global.__gameRoomManager || new GameRoomManager();
if (process.env.NODE_ENV !== 'production') {
  global.__gameRoomManager = gameManager;
}
