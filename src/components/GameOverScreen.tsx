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
  CheckCircle2,
  AlertCircle,
  HelpCircle,
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
    <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center">
      {/* 1. Hero Victory Banner */}
      <div className="mb-6 flex flex-col items-center">
        <div
          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-3 shadow-lg border transition-transform ${
            civWon
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
          }`}
        >
          {civWon ? (
            <ShieldCheck className="w-9 h-9 sm:w-11 sm:h-11 stroke-[2.2]" />
          ) : (
            <Fingerprint className="w-9 h-9 sm:w-11 sm:h-11 stroke-[2.2]" />
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          {civWon ? 'Civilians Win!' : 'Imposter Wins!'}
        </h1>

        {/* Narrative Reason Tag */}
        <div className="mt-2">
          {lastEliminated ? (
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                lastEliminated.wasImposter
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                  : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
              }`}
            >
              {lastEliminated.wasImposter ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{lastEliminated.name} was voted out and was the Imposter!</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                  <span>{lastEliminated.name} was an innocent civilian voted out!</span>
                </>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-400 font-medium">
              {gameState.winReason || (civWon ? 'The imposter was successfully unmasked.' : 'The imposter evaded detection across all rounds.')}
            </p>
          )}
        </div>
      </div>

      {/* 2. Unified Reveal Card (Secret Word & Imposter) */}
      <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm mb-5 text-left">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
          {/* Secret Word */}
          <div className="flex flex-col justify-center pr-0 sm:pr-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Secret Word
            </span>
            <div className="text-2xl font-black text-amber-300 tracking-wide">
              {gameState.revealedWord || gameState.mySecretWord || 'Secret'}
            </div>
            {gameState.currentCategory && (
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-400">
                <Tag className="w-3 h-3 text-slate-500" />
                <span>{gameState.currentCategory}</span>
              </div>
            )}
          </div>

          {/* Imposter & Hint */}
          <div className="flex flex-col justify-center pt-3 sm:pt-0 sm:pl-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 mb-1.5">
              The Imposter
            </span>
            {originalImposter ? (
              <div className="flex items-center gap-3">
                <PlayerAvatar
                  avatar={originalImposter.avatar}
                  color={originalImposter.color}
                  name={originalImposter.name}
                  size="md"
                />
                <div className="min-w-0">
                  <div className="font-bold text-slate-100 text-sm truncate flex items-center gap-1.5">
                    <span>{originalImposter.name}</span>
                    <span className="text-[9px] font-bold uppercase text-rose-400 bg-rose-500/20 px-1.5 py-0.5 rounded">
                      Imposter
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Bluffed with: <span className="italic font-semibold text-amber-200">"{originalImposter.hint || gameState.myHint}"</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400 italic">
                Secret hint: "{gameState.myHint || 'Categorical clue'}"
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Tournament Standings & Points */}
      <div className="w-full mb-4">
        <Leaderboard
          players={gameState.players}
          myPlayerId={gameState.myPlayer?.id}
          showRecentGain={true}
          title="Match Standings"
          subtitle="Points awarded: +1 to winners • 0 to losers"
        />
      </div>

      {/* 4. Collapsible Clues Archive (Reduces visual clutter) */}
      <div className="w-full mb-6">
        <button
          type="button"
          onClick={() => setShowClues(!showClues)}
          className="w-full py-2.5 px-3 bg-slate-900/40 hover:bg-slate-900/70 border border-slate-800/80 rounded-xl text-xs text-slate-400 hover:text-slate-300 font-medium flex items-center justify-between transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            <span>Review Player Clues & Submissions</span>
          </span>
          {showClues ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showClues && (
          <div className="mt-2 p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2 text-left animate-fade-in">
            {gameState.players.map((player) => (
              <div
                key={player.id}
                className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-950/40 border border-slate-800/60"
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
                    <span className="text-[9px] font-bold uppercase text-rose-400 bg-rose-500/20 px-1 py-0.5 rounded">
                      Imposter
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-300 italic truncate ml-2">
                  "{player.clue || 'No clue'}"
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. Clean Action Buttons */}
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
  );
}
