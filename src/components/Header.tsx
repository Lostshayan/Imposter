'use client';

import React from 'react';
import { ShieldAlert, Users, Clock, LogOut, Copy, Check } from 'lucide-react';
import { ClientGameState } from '../types/game';

interface HeaderProps {
  gameState: ClientGameState | null;
  timeLeft: number;
  onLeave: () => void;
  isConnected?: boolean;
}

export function Header({ gameState, timeLeft, onLeave, isConnected = true }: HeaderProps) {
  const [copied, setCopied] = React.useState(false);

  const copyCode = () => {
    if (gameState?.code) {
      navigator.clipboard.writeText(gameState.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!gameState) return null;

  return (
    <header className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 py-3 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Title & Room Code */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-rose-500/20 text-rose-400 rounded-lg border border-rose-500/30">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <span className="font-extrabold text-lg tracking-wider bg-gradient-to-r from-rose-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent hidden sm:inline">
              IMPOSTER
            </span>
          </div>

          <button
            onClick={copyCode}
            title="Click to copy room code"
            className="flex items-center gap-1.5 bg-slate-800/90 hover:bg-slate-700/80 px-2.5 py-1 rounded-md border border-slate-700 text-xs font-mono font-bold text-slate-200 transition-colors"
          >
            <span className="text-slate-400">ROOM:</span>
            <span className="text-amber-400">{gameState.code}</span>
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          </button>
        </div>

        {/* Center: Phase / Round / Timer */}
        <div className="flex items-center gap-3 text-xs sm:text-sm">
          {gameState.phase !== 'LOBBY' && (
            <div className="px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-300 font-semibold border border-slate-700">
              Round <span className="text-indigo-400">{gameState.round}</span>
            </div>
          )}

          {timeLeft > 0 && gameState.phase !== 'LOBBY' && (
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-mono font-bold transition-all ${
                timeLeft <= 5
                  ? 'bg-rose-500/20 border border-rose-500 text-rose-400 animate-pulse'
                  : 'bg-indigo-950/50 border border-indigo-700/50 text-indigo-300'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{timeLeft}s</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-md border border-slate-700/60">
            <span
              className={`w-2 h-2 rounded-full ${
                isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'
              }`}
              title={isConnected ? 'Connected' : 'Reconnecting...'}
            />
            <Users className="w-3.5 h-3.5" />
            <span>{gameState.players.length}</span>
          </div>
        </div>

        {/* Right: Leave */}
        <button
          onClick={onLeave}
          title="Leave Room"
          className="text-slate-400 hover:text-rose-400 p-1.5 rounded-md hover:bg-slate-800 transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}

export function TimerBar({ timeLeft, totalTime }: { timeLeft: number; totalTime: number }) {
  if (totalTime <= 0 || timeLeft <= 0) return null;
  const percentage = Math.min(100, Math.max(0, (timeLeft / totalTime) * 100));
  const isUrgent = timeLeft <= 5;

  return (
    <div className="w-full bg-slate-800/80 h-1.5 overflow-hidden">
      <div
        className={`h-full transition-all duration-500 ease-linear ${
          isUrgent ? 'bg-rose-500 shadow-lg shadow-rose-500/50' : 'bg-gradient-to-r from-indigo-500 to-rose-500'
        }`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
