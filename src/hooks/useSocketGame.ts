'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { ClientGameState, GameSettings } from '../types/game';

const STORAGE_KEY_CODE = 'imposter_room_code';
const STORAGE_KEY_PLAYER_ID = 'imposter_player_id';

export function useSocketGame() {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [gameState, setGameState] = useState<ClientGameState | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Initialize socket
  useEffect(() => {
    const socket = io({
      autoConnect: true,
      reconnectionAttempts: 5,
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      // Check if we have saved session to reconnect
      const savedCode = localStorage.getItem(STORAGE_KEY_CODE);
      const savedPlayerId = localStorage.getItem(STORAGE_KEY_PLAYER_ID);
      if (savedCode && savedPlayerId) {
        socket.emit('syncState', { roomCode: savedCode, playerId: savedPlayerId }, (state: ClientGameState | null) => {
          if (state) {
            setGameState(state);
          } else {
            localStorage.removeItem(STORAGE_KEY_CODE);
            localStorage.removeItem(STORAGE_KEY_PLAYER_ID);
          }
        });
      }
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('gameStateUpdate', (newState: ClientGameState) => {
      setGameState(newState);
      setErrorMsg(null);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Countdown timer based on phaseEndTime
  useEffect(() => {
    if (!gameState?.phaseEndTime) {
      setTimeLeft(0);
      return;
    }

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((gameState.phaseEndTime! - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [gameState?.phaseEndTime]);

  const createRoom = useCallback((playerName: string, avatar: string, color: string) => {
    if (!socketRef.current) return;
    setErrorMsg(null);
    socketRef.current.emit(
      'createRoom',
      { playerName, avatar, color },
      (res: { success: boolean; roomCode?: string; playerId?: string; state?: ClientGameState; error?: string }) => {
        if (res.success && res.roomCode && res.playerId && res.state) {
          localStorage.setItem(STORAGE_KEY_CODE, res.roomCode);
          localStorage.setItem(STORAGE_KEY_PLAYER_ID, res.playerId);
          setGameState(res.state);
        } else {
          setErrorMsg(res.error || 'Failed to create room');
        }
      }
    );
  }, []);

  const joinRoom = useCallback((roomCode: string, playerName: string, avatar: string, color: string) => {
    if (!socketRef.current) return;
    setErrorMsg(null);
    socketRef.current.emit(
      'joinRoom',
      { roomCode, playerName, avatar, color },
      (res: { success: boolean; roomCode?: string; playerId?: string; state?: ClientGameState; error?: string }) => {
        if (res.success && res.roomCode && res.playerId && res.state) {
          localStorage.setItem(STORAGE_KEY_CODE, res.roomCode);
          localStorage.setItem(STORAGE_KEY_PLAYER_ID, res.playerId);
          setGameState(res.state);
        } else {
          setErrorMsg(res.error || 'Failed to join room');
        }
      }
    );
  }, []);

  const addBot = useCallback(() => {
    if (!socketRef.current || !gameState?.code) return;
    socketRef.current.emit('addBot', { roomCode: gameState.code });
  }, [gameState?.code]);

  const removeBot = useCallback(
    (botId: string) => {
      if (!socketRef.current || !gameState?.code) return;
      socketRef.current.emit('removeBot', { roomCode: gameState.code, botId });
    },
    [gameState?.code]
  );

  const updateSettings = useCallback(
    (settings: Partial<GameSettings>) => {
      if (!socketRef.current || !gameState?.code) return;
      socketRef.current.emit('updateSettings', { roomCode: gameState.code, settings });
    },
    [gameState?.code]
  );

  const startGame = useCallback(() => {
    if (!socketRef.current || !gameState?.code) return;
    setErrorMsg(null);
    socketRef.current.emit('startGame', { roomCode: gameState.code }, (res?: { success: boolean; error?: string }) => {
      if (res && !res.success && res.error) {
        setErrorMsg(res.error);
      }
    });
  }, [gameState?.code]);

  const proceedToClues = useCallback(() => {
    if (!socketRef.current || !gameState?.code) return;
    socketRef.current.emit('proceedToClues', { roomCode: gameState.code });
  }, [gameState?.code]);

  const submitClue = useCallback(
    (clue: string) => {
      if (!socketRef.current || !gameState?.code || !gameState.myPlayer) return;
      socketRef.current.emit('submitClue', {
        roomCode: gameState.code,
        playerId: gameState.myPlayer.id,
        clue,
      });
    },
    [gameState?.code, gameState?.myPlayer]
  );

  const proceedToVoting = useCallback(() => {
    if (!socketRef.current || !gameState?.code) return;
    socketRef.current.emit('proceedToVoting', { roomCode: gameState.code });
  }, [gameState?.code]);

  const castVote = useCallback(
    (targetId: string) => {
      if (!socketRef.current || !gameState?.code || !gameState.myPlayer) return;
      socketRef.current.emit('castVote', {
        roomCode: gameState.code,
        voterId: gameState.myPlayer.id,
        targetId,
      });
    },
    [gameState?.code, gameState?.myPlayer]
  );

  const proceedAfterResults = useCallback(() => {
    if (!socketRef.current || !gameState?.code) return;
    socketRef.current.emit('proceedAfterResults', { roomCode: gameState.code });
  }, [gameState?.code]);

  const playAgain = useCallback(() => {
    if (!socketRef.current || !gameState?.code) return;
    socketRef.current.emit('playAgain', { roomCode: gameState.code });
  }, [gameState?.code]);

  const leaveRoom = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY_CODE);
    localStorage.removeItem(STORAGE_KEY_PLAYER_ID);
    setGameState(null);
  }, []);

  return {
    isConnected,
    gameState,
    timeLeft,
    errorMsg,
    createRoom,
    joinRoom,
    addBot,
    removeBot,
    updateSettings,
    startGame,
    proceedToClues,
    submitClue,
    proceedToVoting,
    castVote,
    proceedAfterResults,
    playAgain,
    leaveRoom,
  };
}
