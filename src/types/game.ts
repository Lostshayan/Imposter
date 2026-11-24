export type GamePhase =
  | 'LOBBY'
  | 'ROLE_REVEAL'
  | 'CLUE_INPUT'
  | 'CLUE_SHOWCASE'
  | 'VOTING'
  | 'VOTE_RESULTS'
  | 'GAME_OVER';

export type PlayerRole = 'CIVILIAN' | 'IMPOSTER' | null;

export interface Player {
  id: string;
  name: string;
  avatar: string;
  color: string;
  isHost: boolean;
  isBot: boolean;
  isAlive: boolean;
  score: number;
  lastScoreGain?: number; // points earned in the most recent round
  role: PlayerRole;
  clue: string | null;
  hasSubmittedClue: boolean;
  votedFor: string | null; // target player id or 'SKIP'
  votesReceived: number;
}

export interface GameWord {
  id: string;
  word: string;
  category: string;
  hint: string;
  options?: string[]; // multiple choice options for imposter guess
  fakeCivClues?: string[];
  fakeImposterClues?: string[];
}

export interface GameSettings {
  clueTime: number; // in seconds
  voteTime: number; // in seconds
  enabledCategories: string[]; // Active categories chosen by host
  imposterCount: number; // 1 (or 2 for large groups)
  maxRounds: number; // default 3
}

export interface RoundClueRecord {
  playerId: string;
  playerName: string;
  avatar: string;
  color: string;
  clue: string;
  isImposter?: boolean;
}

export interface RoundHistory {
  round: number;
  word: string;
  category: string;
  clues: RoundClueRecord[];
  eliminatedPlayerId?: string;
  eliminatedPlayerName?: string;
  wasImposterEliminated?: boolean;
  imposterGuessedWord?: boolean;
}

export interface GameRoom {
  code: string;
  phase: GamePhase;
  round: number;
  players: Player[];
  currentWord: GameWord | null;
  imposterIds: string[];
  turnOrder: string[]; // Order of player IDs for clue submission
  currentTurnIndex: number; // Current index in turnOrder
  currentTurnPlayerId: string | null;
  phaseEndTime: number | null; // epoch timestamp
  phaseDuration: number; // seconds
  settings: GameSettings;
  history: RoundHistory[];
  lastEliminated: {
    player: Player;
    wasImposter: boolean;
  } | null;
  winner: 'CIVILIANS' | 'IMPOSTER' | null;
  winReason?: string;
}

// Client-sanitized player view (doesn't leak other players' roles!)
export interface ClientPlayer extends Omit<Player, 'role'> {
  role: PlayerRole; // null during game for opponents, revealed at game over
}

export interface ClientGameState {
  code: string;
  phase: GamePhase;
  round: number;
  players: ClientPlayer[];
  myPlayer: Player | null; // contains the requesting player's own role and secret
  currentCategory: string | null;
  mySecretWord: string | null; // only present if civilian
  myHint: string | null; // only present if imposter
  allClues: RoundClueRecord[];
  turnOrder: string[];
  currentTurnIndex: number;
  currentTurnPlayerId: string | null;
  phaseEndTime: number | null;
  phaseDuration: number;
  settings: GameSettings;
  lastEliminated: {
    id: string;
    name: string;
    avatar: string;
    color?: string;
    wasImposter: boolean;
  } | null;
  winner: 'CIVILIANS' | 'IMPOSTER' | null;
  winReason?: string;
  revealedWord?: string; // only revealed at game over or when imposter revealed
  originalImposters?: {
    id: string;
    name: string;
    avatar: string;
    color: string;
    clue?: string | null;
    hint?: string | null;
  }[];
}
