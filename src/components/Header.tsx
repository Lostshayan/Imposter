'use client';

import React from 'react';
import { Fingerprint, Users, Clock, LogOut, Copy, Check, Sun, Moon } from 'lucide-react';
import { ClientGameState } from '../types/game';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  gameState: ClientGameState | null;
  timeLeft: number;
  onLeave: () => void;
  isConnected?: boolean;
}

export function Header({ gameState, timeLeft, onLeave, isConnected = true }: HeaderProps) {
  const [copied, setCopied] = React.useState(false);
  const { theme, toggleTheme } = useTheme();

  const copyCode = () => {
    if (gameState?.code) {
      navigator.clipboard.writeText(gameState.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!gameState) return null;

  return (
    <header className="w-full bg-[#0c1017]/90 backdrop-blur-md border-b border-slate-800 px-3 sm:px-4 py-2 sm:py-2.5 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Brand Mark & Room Code */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="p-1 sm:p-1.5 bg-rose-500/10 text-rose-400 rounded-lg border border-rose-500/30">
              <Fingerprint className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
            </span>
            <span className="font-black text-xs sm:text-sm tracking-wider text-slate-100 hidden md:inline">
              IMPOSTER
            </span>
          </div>

          <button
            onClick={copyCode}
            title="Click to copy room code"
            className="flex items-center gap-1 bg-slate-900 hover:bg-slate-800 active:scale-95 px-2 py-1 rounded-md border border-slate-700/80 text-[11px] sm:text-xs font-mono font-bold text-slate-200 transition-all shrink-0"
          >
            <span className="text-slate-400 hidden xs:inline">ROOM:</span>
            <span className="text-amber-400 tracking-wider">{gameState.code}</span>
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
          </button>
        </div>

        {/* Center: Phase / Round / Timer */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs shrink-0">
          {gameState.phase !== 'LOBBY' && (
            <div className="px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 font-semibold border border-slate-700 text-[11px] sm:text-xs">
              R<span className="hidden sm:inline">ound </span><span className="text-indigo-400">{gameState.round}</span>
            </div>
          )}

          {timeLeft > 0 && gameState.phase !== 'LOBBY' && (
            <div
              className={`flex items-center gap-1 px-2 py-0.5 rounded-md font-mono font-bold text-[11px] sm:text-xs transition-all ${
                timeLeft <= 5
                  ? 'bg-rose-500/20 border border-rose-500 text-rose-300 animate-pulse'
                  : 'bg-slate-800/80 border border-slate-700 text-slate-300'
              }`}
            >
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{timeLeft}s</span>
            </div>
          )}

          <div className="flex items-center gap-1 text-slate-400 bg-slate-850 px-2 py-0.5 rounded-md border border-slate-800 text-[11px] sm:text-xs">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isConnected ? 'bg-emerald-400' : 'bg-rose-500'
              }`}
              title={isConnected ? 'Connected' : 'Reconnecting...'}
            />
            <Users className="w-3 h-3" />
            <span>{gameState.players.length}</span>
          </div>
        </div>

        {/* Right: Theme Toggle & Leave Button */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={toggleTheme}
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Beige Light Mode'}
            className="text-slate-400 hover:text-amber-500 active:scale-95 p-1.5 rounded-md hover:bg-slate-800 transition-all min-w-[28px] min-h-[28px] flex items-center justify-center"
          >
            {theme === 'light' ? (
              <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-600" />
            ) : (
              <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            )}
          </button>

          <button
            onClick={onLeave}
            title="Leave Room"
            className="text-slate-400 hover:text-rose-400 active:scale-95 p-1.5 rounded-md hover:bg-slate-800 transition-all shrink-0 min-w-[28px] min-h-[28px] flex items-center justify-center"
          >
            <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
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
