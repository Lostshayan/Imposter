import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server as SocketIOServer, Socket } from 'socket.io';
import os from 'os';
import { gameManager } from './src/lib/gameRoomManager';
import { GameSettings } from './src/types/game';

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Map socket id to room and player
interface SocketData {
  roomCode?: string;
  playerId?: string;
}

const socketMeta = new Map<string, SocketData>();
const roomTimers = new Map<string, NodeJS.Timeout>();

function getLocalIp(): string {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    const netList = interfaces[name];
    if (!netList) continue;
    for (const net of netList) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

function clearRoomTimer(code: string) {
  const existing = roomTimers.get(code);
  if (existing) {
    clearTimeout(existing);
    roomTimers.delete(code);
  }
}

function scheduleRoomPhaseTimer(io: SocketIOServer, code: string, durationSec: number, onExpire: () => void) {
  clearRoomTimer(code);
  const timer = setTimeout(() => {
    onExpire();
    broadcastRoom(io, code);
  }, durationSec * 1000);
  roomTimers.set(code, timer);
}

function broadcastRoom(io: SocketIOServer, code: string) {
  const room = gameManager.getRoom(code);
  if (!room) return;

  const roomSockets = io.sockets.adapter.rooms.get(code);
  if (!roomSockets) return;

  roomSockets.forEach((socketId) => {
    const s = io.sockets.sockets.get(socketId);
    if (!s) return;
    const meta = socketMeta.get(socketId);
    const playerId = meta?.playerId || '';
    const state = gameManager.getSanitizedState(code, playerId);
    if (state) {
      s.emit('gameStateUpdate', state);
    }
  });
}

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url || '', true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error handling request:', err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
    pingInterval: 10000,
    pingTimeout: 5000,
  });

  io.on('connection', (socket: Socket) => {
    socketMeta.set(socket.id, {});

    // Create Room
    socket.on('createRoom', ({ playerName, avatar, color }: { playerName: string; avatar: string; color: string }, callback) => {
      const { room, hostPlayer } = gameManager.createRoom(playerName, avatar, color);
      socket.join(room.code);
      socketMeta.set(socket.id, { roomCode: room.code, playerId: hostPlayer.id });

      const state = gameManager.getSanitizedState(room.code, hostPlayer.id);
      if (typeof callback === 'function') {
        callback({ success: true, roomCode: room.code, playerId: hostPlayer.id, state });
      }
      broadcastRoom(io, room.code);
    });

    // Join Room
    socket.on('joinRoom', ({ roomCode, playerName, avatar, color }: { roomCode: string; playerName: string; avatar: string; color: string }, callback) => {
      const upperCode = roomCode.toUpperCase().trim();
      const result = gameManager.joinRoom(upperCode, playerName, avatar, color);

      if (result.error || !result.room || !result.player) {
        if (typeof callback === 'function') {
          callback({ success: false, error: result.error || 'Failed to join' });
        }
        return;
      }

      socket.join(upperCode);
      socketMeta.set(socket.id, { roomCode: upperCode, playerId: result.player.id });

      const state = gameManager.getSanitizedState(upperCode, result.player.id);
      if (typeof callback === 'function') {
        callback({ success: true, roomCode: upperCode, playerId: result.player.id, state });
      }
      broadcastRoom(io, upperCode);
    });

    // Add Bot
    socket.on('addBot', ({ roomCode }: { roomCode: string }) => {
      const result = gameManager.addBot(roomCode);
      if (result.room) {
        broadcastRoom(io, roomCode);
      }
    });

    // Remove Bot
    socket.on('removeBot', ({ roomCode, botId }: { roomCode: string; botId: string }) => {
      const result = gameManager.removeBot(roomCode, botId);
      if (result.room) {
        broadcastRoom(io, roomCode);
      }
    });

    // Update Settings
    socket.on('updateSettings', ({ roomCode, settings }: { roomCode: string; settings: Partial<GameSettings> }) => {
      const updated = gameManager.updateSettings(roomCode, settings);
      if (updated) {
        broadcastRoom(io, roomCode);
      }
    });

    // Start Game
    socket.on('startGame', ({ roomCode }: { roomCode: string }, callback) => {
      const result = gameManager.startGame(roomCode);
      if (result.error) {
        if (typeof callback === 'function') callback({ success: false, error: result.error });
        return;
      }

      if (typeof callback === 'function') callback({ success: true });
      broadcastRoom(io, roomCode);

      // Auto-schedule transition from ROLE_REVEAL to CLUE_INPUT
      scheduleRoomPhaseTimer(io, roomCode, 8, () => {
        gameManager.proceedToClueInput(roomCode);
        // Start clue timer
        const currentRoom = gameManager.getRoom(roomCode);
        if (currentRoom) {
          scheduleClueTimer(io, roomCode, currentRoom.settings.clueTime);
        }
      });
    });

    function scheduleClueTimer(ioServer: SocketIOServer, code: string, seconds: number) {
      scheduleRoomPhaseTimer(ioServer, code, seconds, () => {
        const room = gameManager.getRoom(code);
        if (room && room.phase === 'CLUE_INPUT') {
          gameManager.proceedToClueShowcase(code);
          scheduleShowcaseTimer(ioServer, code, 25);
        }
      });
    }

    function scheduleShowcaseTimer(ioServer: SocketIOServer, code: string, seconds: number) {
      scheduleRoomPhaseTimer(ioServer, code, seconds, () => {
        const room = gameManager.getRoom(code);
        if (room && room.phase === 'CLUE_SHOWCASE') {
          gameManager.proceedToVoting(code);
          scheduleVotingTimer(ioServer, code, room.settings.voteTime);
        }
      });
    }

    function scheduleVotingTimer(ioServer: SocketIOServer, code: string, seconds: number) {
      scheduleRoomPhaseTimer(ioServer, code, seconds, () => {
        const room = gameManager.getRoom(code);
        if (room && room.phase === 'VOTING') {
          gameManager.tallyVotes(code);
          scheduleResultsTimer(ioServer, code, 7);
        }
      });
    }

    function scheduleResultsTimer(ioServer: SocketIOServer, code: string, seconds: number) {
      scheduleRoomPhaseTimer(ioServer, code, seconds, () => {
        const room = gameManager.getRoom(code);
        if (room && room.phase === 'VOTE_RESULTS') {
          const outcomeRoom = gameManager.resolveVoteOutcome(code);
          if (outcomeRoom?.phase === 'CLUE_INPUT') {
            scheduleClueTimer(ioServer, code, outcomeRoom.settings.clueTime);
          }
        }
      });
    }

    // Skip reveal timer & proceed directly to clues
    socket.on('proceedToClues', ({ roomCode }: { roomCode: string }) => {
      const room = gameManager.proceedToClueInput(roomCode);
      if (room) {
        broadcastRoom(io, roomCode);
        scheduleClueTimer(io, roomCode, room.settings.clueTime);
      }
    });

    // Submit Clue
    socket.on('submitClue', ({ roomCode, playerId, clue }: { roomCode: string; playerId: string; clue: string }) => {
      const result = gameManager.submitClue(roomCode, playerId, clue);
      if (result.room) {
        broadcastRoom(io, roomCode);
        if (result.allSubmitted) {
          clearRoomTimer(roomCode);
          scheduleShowcaseTimer(io, roomCode, 25);
        }
      }
    });

    // Host manually advances from Clue Showcase to Voting
    socket.on('proceedToVoting', ({ roomCode }: { roomCode: string }) => {
      clearRoomTimer(roomCode);
      const room = gameManager.proceedToVoting(roomCode);
      if (room) {
        broadcastRoom(io, roomCode);
        scheduleVotingTimer(io, roomCode, room.settings.voteTime);
      }
    });

    // Cast Vote
    socket.on('castVote', ({ roomCode, voterId, targetId }: { roomCode: string; voterId: string; targetId: string }) => {
      const result = gameManager.castVote(roomCode, voterId, targetId);
      if (result.room) {
        broadcastRoom(io, roomCode);
        if (result.allVoted) {
          clearRoomTimer(roomCode);
          scheduleResultsTimer(io, roomCode, 7);
        }
      }
    });

    // Host manually advances after results
    socket.on('proceedAfterResults', ({ roomCode }: { roomCode: string }) => {
      clearRoomTimer(roomCode);
      const outcomeRoom = gameManager.resolveVoteOutcome(roomCode);
      if (outcomeRoom) {
        broadcastRoom(io, roomCode);
        if (outcomeRoom.phase === 'CLUE_INPUT') {
          scheduleClueTimer(io, roomCode, outcomeRoom.settings.clueTime);
        }
      }
    });

    // Play Again / Reset to Lobby
    socket.on('playAgain', ({ roomCode }: { roomCode: string }) => {
      clearRoomTimer(roomCode);
      const room = gameManager.resetToLobby(roomCode);
      if (room) {
        broadcastRoom(io, roomCode);
      }
    });

    // Client reconnect / sync request
    socket.on('syncState', ({ roomCode, playerId }: { roomCode: string; playerId: string }, callback) => {
      socket.join(roomCode);
      socketMeta.set(socket.id, { roomCode, playerId });
      const state = gameManager.getSanitizedState(roomCode, playerId);
      if (typeof callback === 'function') {
        callback(state);
      }
    });

    // Disconnect
    socket.on('disconnect', () => {
      const meta = socketMeta.get(socket.id);
      if (meta && meta.roomCode && meta.playerId) {
        const room = gameManager.getRoom(meta.roomCode);
        // Only remove player if they are still in lobby
        if (room && room.phase === 'LOBBY') {
          gameManager.removePlayer(meta.roomCode, meta.playerId);
          broadcastRoom(io, meta.roomCode);
        }
      }
      socketMeta.delete(socket.id);
    });
  });

  httpServer.listen(port, () => {
    const localIp = getLocalIp();
    console.log(`\n==================================================`);
    console.log(`🎮 Imposter Game Server is running!`);
    console.log(`> Local:   http://localhost:${port}`);
    console.log(`> Network: http://${localIp}:${port} (join from mobile)`);
    console.log(`==================================================\n`);
  });
});
