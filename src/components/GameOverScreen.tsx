'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Home, Sparkles, ShieldCheck, Skull } from 'lucide-react';
import { ClientGameState } from '../types/game';

interface GameOverScreenProps {
  gameState: ClientGameState;
  onPlayAgain: () => void;
  onLeave: () => void;
}

export function GameOverScreen({ gameState, onPlayAgain, onLeave }: GameOverScreenProps) {
  const isHost = gameState.myPlayer?.isHost ?? false;
  const civWon = gameState.winner === 'CIVILIANS';

  // Trigger celebration confetti
  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center">
      {/* Victory Banner */}
      <div className="mb-6">
        <div
          className={`w-24 h-24 rounded-3xl mx-auto flex items-center justify-center text-5xl mb-4 shadow-2xl ${
            civWon
              ? 'bg-gradient-to-tr from-cyan-500 to-emerald-600 shadow-cyan-500/30'
              : 'bg-gradient-to-tr from-rose-600 to-amber-600 shadow-rose-600/30'
          }`}
        >
          {civWon ? '🏆' : '😈'}
        </div>

        <h1
          className={`text-4xl sm:text-5xl font-black tracking-tight ${
            civWon
              ? 'bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-400 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 bg-clip-text text-transparent'
          }`}
        >
          {civWon ? 'CIVILIANS WIN!' : 'THE IMPOSTER WINS!'}
        </h1>

        <p className="text-sm font-medium text-slate-300 mt-2 max-w-md mx-auto">
          {gameState.winReason || (civWon ? 'The imposter was successfully unmasked!' : 'The imposter outsmarted the room!')}
        </p>
      </div>

      {/* Spotlight: Original Imposter Card */}
      {gameState.originalImposters && gameState.originalImposters.length > 0 && (
        <div className="w-full bg-gradient-to-br from-rose-950/60 to-slate-900 border border-rose-500/50 rounded-3xl p-5 mb-6 shadow-xl text-left">
          <div className="text-[11px] font-black uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-1.5">
            <span>😈 THE ORIGINAL IMPOSTER</span>
          </div>
          {gameState.originalImposters.map((imp) => (
            <div key={imp.id} className="flex items-center gap-3.5">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${imp.color} flex items-center justify-center text-3xl shrink-0 shadow-lg`}>
                {imp.avatar}
              </div>
              <div className="min-w-0">
                <div className="font-black text-slate-100 text-lg flex items-center gap-2">
                  <span>{imp.name}</span>
                  <span className="text-[10px] font-black uppercase text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded-full border border-rose-500/30">
                    The Imposter
                  </span>
                </div>
                <div className="text-xs text-rose-300 mt-1">
                  Secret hint they had: <span className="italic font-bold text-amber-200">"{imp.hint || gameState.myHint}"</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Secret Word & Roles Reveal Card */}
      <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-around gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
          {/* Secret Word */}
          <div className="w-full sm:w-1/2 flex flex-col items-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              The Secret Common Word
            </span>
            <span className="text-3xl font-black text-amber-300 tracking-wide">
              {gameState.revealedWord || gameState.mySecretWord || 'Secret'}
            </span>
            <span className="text-xs text-slate-400 mt-0.5">
              Category: {gameState.currentCategory}
            </span>
          </div>

          {/* Imposter Hint */}
          <div className="w-full sm:w-1/2 flex flex-col items-center pt-3 sm:pt-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 mb-1">
              The Imposter's Hint
            </span>
            <span className="text-xs font-medium text-slate-200 italic bg-slate-800/80 px-3 py-2 rounded-xl border border-slate-700/80 max-w-xs">
              "{gameState.myHint || 'Categorical clue'}"
            </span>
          </div>
        </div>
      </div>

      {/* Roster & Final Role Reveal */}
      <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-5 mb-6 text-left">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 text-center">
          Final Player Identities & Clues
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {gameState.players.map((player) => {
            const isImposter = player.role === 'IMPOSTER';
            return (
              <div
                key={player.id}
                className={`p-3 rounded-xl border flex items-center justify-between gap-2 ${
                  isImposter
                    ? 'bg-rose-950/40 border-rose-500/50'
                    : 'bg-slate-800/60 border-slate-700/60'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${player.color} flex items-center justify-center text-lg shrink-0`}
                  >
                    {player.avatar}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-sm text-slate-100 truncate flex items-center gap-1.5">
                      <span>{player.name}</span>
                      {isImposter ? (
                        <span className="text-[10px] font-black uppercase text-rose-400 bg-rose-500/20 px-1.5 py-0.5 rounded">
                          Imposter
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold uppercase text-cyan-400 bg-cyan-500/20 px-1.5 py-0.5 rounded">
                          Civilian
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 truncate mt-0.5">
                      Clue: <span className="italic text-slate-300">"{player.clue || 'None'}"</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-md flex flex-col gap-3">
        {isHost ? (
          <button
            onClick={onPlayAgain}
            className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 text-white font-black text-lg rounded-2xl shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <RotateCcw className="w-5 h-5" />
            <span>PLAY AGAIN (NEW WORD)</span>
          </button>
        ) : (
          <div className="w-full py-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 text-sm font-semibold">
            Waiting for Host to start next game...
          </div>
        )}

        <button
          onClick={onLeave}
          className="w-full py-3 bg-slate-800/80 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Exit to Main Menu</span>
        </button>
      </div>
    </div>
  );
}
