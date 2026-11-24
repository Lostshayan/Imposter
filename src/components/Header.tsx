'use client';

import React from 'react';
import { Fingerprint, Users, Clock, LogOut, Copy, Check } from 'lucide-react';
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
    <header className="w-full bg-[#0c1017]/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Title & Room Code */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-rose-500/10 text-rose-400 rounded-lg border border-rose-500/30">
              <Fingerprint className="w-4 h-4 stroke-[2.2]" />
            </span>
            <span className="font-black text-sm tracking-wider text-slate-100 hidden sm:inline">
              IMPOSTER
            </span>
          </div>

          <button
            onClick={copyCode}
            title="Click to copy room code"
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700/80 text-xs font-mono font-bold text-slate-200 transition-colors"
          >
            <span className="text-slate-400">ROOM:</span>
            <span className="text-amber-400">{gameState.code}</span>
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          </button>
        </div>

        {/* Center: Phase / Round / Timer */}
        <div className="flex items-center gap-2.5 text-xs">
          {gameState.phase !== 'LOBBY' && (
            <div className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 font-semibold border border-slate-700">
              Round <span className="text-indigo-400">{gameState.round}</span>
            </div>
          )}

          {timeLeft > 0 && gameState.phase !== 'LOBBY' && (
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono font-bold transition-all ${
                timeLeft <= 5
                  ? 'bg-rose-500/20 border border-rose-500 text-rose-300 animate-pulse'
                  : 'bg-slate-800/80 border border-slate-700 text-slate-300'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{timeLeft}s</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-slate-400 bg-slate-850 px-2.5 py-1 rounded-md border border-slate-800">
            <span
              className={`w-2 h-2 rounded-full ${
                isConnected ? 'bg-emerald-400' : 'bg-rose-500'
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

  return (
    <div className="w-full h-1 bg-slate-800 overflow-hidden">
      <div
        className="h-full bg-rose-500 transition-all duration-1000 ease-linear"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
