'use client';

import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Home,
  ShieldCheck,
  Fingerprint,
  ChevronDown,
  ChevronUp,
  Tag,
  Trophy,
  HelpCircle,
  UserX,
} from 'lucide-react';
import { ClientGameState } from '../types/game';
import { Leaderboard } from './Leaderboard';
import { PlayerAvatar } from './PlayerAvatar';

interface GameOverScreenProps {
  gameState: ClientGameState;
  onPlayAgain: () => void;
  onLeave: () => void;
}

export function GameOverScreen({ gameState, onPlayAgain, onLeave }: GameOverScreenProps) {
  const [showStandings, setShowStandings] = useState(false);
  const [showClues, setShowClues] = useState(false);
  const isHost = gameState.myPlayer?.isHost ?? false;
  const civWon = gameState.winner === 'CIVILIANS';
  const lastEliminated = gameState.lastEliminated;
  const originalImposter = gameState.originalImposters?.[0];

  // Fire celebratory confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.55 },
      });
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center text-center">
      {/* Atmospheric Victory Screen Ambient Glow (Green for Civilians, Red for Imposter) */}
      <div
        className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-1000 ${
          civWon
            ? 'bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.22)_0%,_rgba(5,46,22,0.12)_35%,_transparent_70%)] shadow-[inset_0_0_120px_rgba(16,185,129,0.22),inset_0_0_40px_rgba(16,185,129,0.35)]'
            : 'bg-[radial-gradient(ellipse_at_top,_rgba(239,68,68,0.22)_0%,_rgba(69,10,10,0.12)_35%,_transparent_70%)] shadow-[inset_0_0_120px_rgba(239,68,68,0.22),inset_0_0_40px_rgba(239,68,68,0.35)]'
        }`}
      />

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* 1. Hero Victory Banner */}
        <div className="mb-5 flex flex-col items-center">
          <div className="relative mb-3">
            <div
              className={`absolute -inset-3 rounded-full blur-xl opacity-70 animate-pulse ${
                civWon ? 'bg-emerald-500/40' : 'bg-red-500/40'
              }`}
            />
            <div
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-2xl border ${
                civWon
                  ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-400 shadow-emerald-500/25 ring-1 ring-emerald-500/30'
                  : 'bg-red-950/70 border-red-500/50 text-red-400 shadow-red-500/25 ring-1 ring-red-500/30'
              }`}
            >
              {civWon ? (
                <ShieldCheck className="w-9 h-9 sm:w-11 sm:h-11 stroke-[2.2]" />
              ) : (
                <Fingerprint className="w-9 h-9 sm:w-11 sm:h-11 stroke-[2.2]" />
              )}
            </div>
          </div>

          <h1
            className={`text-3xl sm:text-5xl font-black tracking-tight ${
              civWon
                ? 'text-emerald-100 drop-shadow-[0_2px_12px_rgba(16,185,129,0.35)]'
                : 'text-red-100 drop-shadow-[0_2px_12px_rgba(239,68,68,0.35)]'
            }`}
          >
            {civWon ? 'Civilians Win!' : 'Imposter Wins!'}
          </h1>
        </div>

        {/* 2. Prominent Key Results: Who Was Voted Out & Who The Imposter Was */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-left">
          {/* Card A: Who Was Kicked Out */}
          <div
            className={`rounded-2xl p-4 sm:p-5 border shadow-md flex flex-col justify-between ${
              lastEliminated
                ? lastEliminated.wasImposter
                  ? 'bg-emerald-500/10 border-emerald-500/35'
                  : 'bg-red-500/10 border-red-500/35'
                : 'bg-slate-900/80 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              <UserX className="w-4 h-4 text-slate-300" />
              <span>Voted Out</span>
            </div>

            {lastEliminated ? (
              <div className="flex items-center gap-3">
                <PlayerAvatar
                  avatar={lastEliminated.avatar}
                  color={lastEliminated.color}
                  name={lastEliminated.name}
                  size="lg"
                />
                <div className="min-w-0">
                  <div className="text-2xl sm:text-3xl font-black text-slate-100 leading-tight truncate">
                    {lastEliminated.name}
                  </div>
                  <div
                    className={`text-xs sm:text-sm font-bold mt-1 ${
                      lastEliminated.wasImposter ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {lastEliminated.wasImposter ? 'Was the Imposter' : 'Innocent Civilian'}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-200">No One</div>
                <div className="text-xs text-slate-400 mt-1">Tie votes reached max rounds</div>
              </div>
            )}
          </div>

          {/* Card B: Who The Imposter Was */}
          <div className="rounded-2xl p-4 sm:p-5 border border-rose-500/35 bg-rose-500/10 shadow-md flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-rose-400 mb-2">
              <Fingerprint className="w-4 h-4" />
              <span>The Real Imposter</span>
            </div>

            {originalImposter ? (
              <div className="flex items-center gap-3">
                <PlayerAvatar
                  avatar={originalImposter.avatar}
                  color={originalImposter.color}
                  name={originalImposter.name}
                  size="lg"
                />
                <div className="min-w-0">
                  <div className="text-2xl sm:text-3xl font-black text-slate-100 leading-tight truncate">
                    {originalImposter.name}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 mt-1">
                    Hint: <span className="font-bold text-amber-300">"{originalImposter.hint || gameState.myHint}"</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-lg font-bold text-slate-300">
                Hint: "{gameState.myHint || 'Categorical clue'}"
              </div>
            )}
          </div>
        </div>

        {/* 3. Secret Word Banner */}
        <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl px-5 py-3.5 mb-4 flex items-center justify-between gap-3">
          <div className="text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Secret Word
            </span>
            <span className="text-2xl sm:text-3xl font-black text-amber-300 tracking-wide">
              {gameState.revealedWord || gameState.mySecretWord || 'Secret'}
            </span>
          </div>
          {gameState.currentCategory && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950/70 border border-slate-800 text-xs font-semibold text-slate-300 shrink-0">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              <span>{gameState.currentCategory}</span>
            </div>
          )}
        </div>

        {/* 4. Dropdown: Match Standings */}
        <div className="w-full mb-2.5">
          <button
            type="button"
            onClick={() => setShowStandings(!showStandings)}
            className="w-full py-3 px-4 bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 font-bold flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Match Standings & Points</span>
            </span>
            {showStandings ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {showStandings && (
            <div className="mt-2 animate-fade-in">
              <Leaderboard
                players={gameState.players}
                myPlayerId={gameState.myPlayer?.id}
                showRecentGain={true}
                title="Match Standings"
                subtitle="Points awarded: +1 to winners • 0 to losers"
              />
            </div>
          )}
        </div>

        {/* 5. Dropdown: Clues Archive */}
        <div className="w-full mb-6">
          <button
            type="button"
            onClick={() => setShowClues(!showClues)}
            className="w-full py-3 px-4 bg-slate-900/40 hover:bg-slate-900/70 border border-slate-800/80 rounded-xl text-xs sm:text-sm text-slate-300 font-semibold flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>Review Player Clues</span>
            </span>
            {showClues ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {showClues && (
            <div className="mt-2 p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2 text-left animate-fade-in">
              {gameState.players.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between text-xs sm:text-sm p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <PlayerAvatar
                      avatar={player.avatar}
                      color={player.color}
                      name={player.name}
                      size="sm"
                    />
                    <span className="font-semibold text-slate-200 truncate">{player.name}</span>
                    {player.role === 'IMPOSTER' && (
                      <span className="text-[9px] font-bold uppercase text-red-400 bg-red-500/20 px-1.5 py-0.5 rounded">
                        Imposter
                      </span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-200 font-bold ml-2">
                    "{player.clue || 'No clue'}"
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 6. Clean Action Buttons */}
        <div className="w-full max-w-sm flex flex-col gap-2.5">
          {isHost ? (
            <button
              onClick={onPlayAgain}
              className="w-full py-3.5 px-6 bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm rounded-xl border border-rose-500 shadow-md shadow-rose-900/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Next Game (New Word)</span>
            </button>
          ) : (
            <div className="w-full py-3 bg-slate-900/80 border border-slate-800 rounded-xl text-slate-400 text-xs font-medium flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" />
              <span>Waiting for Host to start the next game...</span>
            </div>
          )}

          <button
            onClick={onLeave}
            className="w-full py-2.5 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-300 font-medium text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-3.5 h-3.5 text-slate-400" />
            <span>Exit to Main Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
}
