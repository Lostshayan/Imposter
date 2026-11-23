'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, ShieldCheck, Skull, ArrowRight, Sparkles } from 'lucide-react';
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
        <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-slate-800 text-slate-300 border border-slate-700">
          Role Assignment • Round {gameState.round}
        </span>
        <h2 className="text-2xl font-black text-slate-100 mt-2">Check Your Secret Role</h2>
        <p className="text-xs text-slate-400">Keep your phone screen tilted away from other players!</p>
      </div>

      {/* Interactive Secret Card */}
      <div
        onClick={() => setIsRevealed(!isRevealed)}
        className="w-full cursor-pointer select-none perspective-1000 my-4"
      >
        <div
          className={`w-full min-h-[340px] rounded-3xl p-6 transition-all duration-500 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden ${
            !isRevealed
              ? 'bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 border-2 border-dashed border-slate-700 hover:border-slate-500 hover:scale-[1.01]'
              : isImposter
              ? 'bg-gradient-to-br from-rose-950 via-slate-900 to-red-950 border-2 border-rose-500/80 shadow-rose-500/20'
              : 'bg-gradient-to-br from-indigo-950 via-slate-900 to-cyan-950 border-2 border-cyan-500/80 shadow-cyan-500/20'
          }`}
        >
          {!isRevealed ? (
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 mb-4 animate-pulse">
                <EyeOff className="w-10 h-10" />
              </div>
              <span className="font-extrabold text-lg text-slate-200">Tap Card to Reveal</span>
              <span className="text-xs text-slate-400 mt-1 max-w-[200px]">
                Click or tap to view your secret identity and word/hint
              </span>
            </div>
          ) : isImposter ? (
            /* Imposter Card */
            <div className="flex flex-col items-center animate-fade-in w-full">
              <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center text-3xl mb-3 shadow-lg shadow-rose-500/20">
                😈
              </div>

              <div className="text-xs font-black tracking-widest text-rose-400 uppercase mb-1">
                YOU ARE THE
              </div>
              <h3 className="text-3xl font-black text-rose-300 tracking-wider mb-3">IMPOSTER</h3>

              <div className="w-full bg-slate-900/90 border border-rose-500/30 rounded-2xl p-4 my-2 text-left">
                <div className="text-[10px] font-bold uppercase tracking-wider text-rose-400 mb-0.5">
                  Category: {gameState.currentCategory || 'General'}
                </div>
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Your Secret Hint:
                </div>
                <div className="text-sm font-medium text-amber-200 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
                  "{gameState.myHint}"
                </div>
              </div>

              <p className="text-[11px] text-slate-400 mt-2 max-w-xs leading-relaxed">
                You do <b>not</b> know the exact secret word! Use your hint to blend in, type a plausible clue, and deceive the civilians.
              </p>
            </div>
          ) : (
            /* Civilian Card */
            <div className="flex flex-col items-center animate-fade-in w-full">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center text-3xl mb-3 shadow-lg shadow-cyan-500/20">
                😇
              </div>

              <div className="text-xs font-black tracking-widest text-cyan-400 uppercase mb-1">
                YOU ARE A
              </div>
              <h3 className="text-3xl font-black text-cyan-300 tracking-wider mb-3">CIVILIAN</h3>

              <div className="w-full bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-4 my-2 text-center">
                <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-1">
                  Category: {gameState.currentCategory || 'General'}
                </div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  The Secret Word is:
                </div>
                <div className="text-2xl sm:text-3xl font-black tracking-wide bg-gradient-to-r from-cyan-300 via-teal-200 to-indigo-300 bg-clip-text text-transparent my-1">
                  {gameState.mySecretWord}
                </div>
              </div>

              <p className="text-[11px] text-slate-400 mt-2 max-w-xs leading-relaxed">
                Give a clue that shows fellow civilians you know the word, but don’t make it too obvious for the imposter!
              </p>
            </div>
          )}

          <div className="absolute bottom-3 text-[10px] text-slate-500 flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>Tap card to toggle view</span>
          </div>
        </div>
      </div>

      {/* Progress Buttons */}
      <div className="w-full mt-2">
        {isHost ? (
          <button
            onClick={onProceed}
            className="w-full py-3.5 px-5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
          >
            <span>Everyone is Ready • Proceed ({timeLeft}s)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="text-xs text-slate-400 font-medium">
            Starting clue round in <span className="font-bold text-indigo-400">{timeLeft}s</span>...
          </div>
        )}
      </div>
    </div>
  );
}
