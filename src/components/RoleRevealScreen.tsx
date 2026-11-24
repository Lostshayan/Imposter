'use client';

import React, { useState } from 'react';
import { EyeOff, ShieldCheck, Fingerprint, ArrowRight } from 'lucide-react';
import { ClientGameState } from '../types/game';

interface RoleRevealScreenProps {
  gameState: ClientGameState;
  timeLeft: number;
  onProceed: () => void;
}

export function RoleRevealScreen({ gameState, timeLeft, onProceed }: RoleRevealScreenProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const myPlayer = gameState.myPlayer;
  const isImposter = myPlayer?.role === 'IMPOSTER';
  const isHost = myPlayer?.isHost ?? false;

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center text-center">
      <div className="mb-4">
        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-slate-800 text-slate-300 border border-slate-700">
          Role Assignment • Round {gameState.round}
        </span>
        <h2 className="text-xl font-bold text-slate-100 mt-2">Check Your Role</h2>
        <p className="text-xs text-slate-400">Keep your screen hidden from others!</p>
      </div>

      {/* Interactive Secret Card */}
      <div
        onClick={() => setIsRevealed(!isRevealed)}
        className="w-full cursor-pointer select-none my-3"
      >
        <div
          className={`w-full min-h-[300px] rounded-2xl p-6 transition-all duration-300 shadow-sm flex flex-col items-center justify-center relative ${
            !isRevealed
              ? 'bg-slate-900/60 border border-dashed border-slate-700 hover:border-slate-600'
              : isImposter
              ? 'bg-slate-900/90 border border-rose-500/40 ring-1 ring-rose-500/20'
              : 'bg-slate-900/90 border border-emerald-500/40 ring-1 ring-emerald-500/20'
          }`}
        >
          {!isRevealed ? (
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 mb-3.5">
                <EyeOff className="w-6 h-6" />
              </div>
              <span className="font-bold text-base text-slate-200">Tap Card to Reveal</span>
              <span className="text-xs text-slate-400 mt-1 max-w-[200px]">
                View your identity and word / category hint
              </span>
            </div>
          ) : isImposter ? (
            /* Imposter Card */
            <div className="flex flex-col items-center w-full animate-fade-in">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mb-2.5">
                <Fingerprint className="w-6 h-6 stroke-[2.2]" />
              </div>

              <span className="text-[10px] font-bold tracking-widest text-rose-400 uppercase">
                YOU ARE THE
              </span>
              <h3 className="text-2xl font-black text-rose-300 tracking-wider mb-2">IMPOSTER</h3>

              <div className="w-full bg-slate-950/80 border border-rose-500/20 rounded-xl p-3.5 my-2 text-left">
                <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400 mb-0.5">
                  Category: {gameState.currentCategory || 'General'}
                </div>
                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Your Category Hint:
                </div>
                <div className="text-sm font-bold text-amber-300 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                  "{gameState.myHint}"
                </div>
              </div>

              <p className="text-[11px] text-slate-400 mt-1 max-w-xs leading-relaxed">
                You do not know the exact secret word! Use your hint to blend in and deceive the civilians.
              </p>
            </div>
          ) : (
            /* Civilian Card */
            <div className="flex flex-col items-center w-full animate-fade-in">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-2.5">
                <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              </div>

              <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">
                YOU ARE A
              </span>
              <h3 className="text-2xl font-black text-emerald-300 tracking-wider mb-2">CIVILIAN</h3>

              <div className="w-full bg-slate-950/80 border border-emerald-500/20 rounded-xl p-3.5 my-2 text-center">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-0.5">
                  Category: {gameState.currentCategory || 'General'}
                </div>
                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-0.5">
                  The Secret Word is:
                </div>
                <div className="text-2xl font-black text-slate-100 my-0.5">
                  {gameState.mySecretWord}
                </div>
              </div>

              <p className="text-[11px] text-slate-400 mt-1 max-w-xs leading-relaxed">
                Give a clue that proves to fellow civilians you know the word, but don't give it away to the imposter!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Advance Button */}
      <div className="w-full mt-2">
        {isHost ? (
          <button
            onClick={onProceed}
            className="w-full py-3 px-5 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition-colors"
          >
            <span>Proceed to Clues ({timeLeft}s)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="text-xs text-slate-400 font-medium">
            Starting in {timeLeft}s...
          </div>
        )}
      </div>
    </div>
  );
}
