'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Home, ShieldCheck, Fingerprint, EyeOff, Sparkles } from 'lucide-react';
import { ClientGameState } from '../types/game';
import { Leaderboard } from './Leaderboard';
import { PlayerAvatar } from './PlayerAvatar';

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
        particleCount: 80,
        spread: 60,
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
          className={`w-20 h-20 rounded-2xl mx-auto flex items-center justify-center mb-3 shadow-lg border ${
            civWon
              ? 'bg-emerald-500/10 border-emerald-500/30'
              : 'bg-rose-500/10 border-rose-500/30'
          }`}
        >
          {civWon ? (
            <ShieldCheck className="w-10 h-10 text-emerald-400 stroke-[2.2]" />
          ) : (
            <Fingerprint className="w-10 h-10 text-rose-400 stroke-[2.2]" />
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
          {civWon ? 'Civilians Win' : 'Imposter Wins'}
        </h1>

        <p className="text-sm font-medium text-slate-400 mt-1 max-w-md mx-auto">
          {gameState.winReason || (civWon ? 'The imposter was successfully unmasked.' : 'The imposter remained undetected.')}
        </p>
      </div>

      {/* Spotlight: Original Imposter Card */}
      {gameState.originalImposters && gameState.originalImposters.length > 0 && (
        <div className="w-full bg-slate-900/90 border border-rose-500/30 rounded-2xl p-4 mb-5 shadow-lg text-left">
          <div className="text-[11px] font-bold uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-1.5">
            <EyeOff className="w-3.5 h-3.5" />
            <span>The Imposter</span>
          </div>
          {gameState.originalImposters.map((imp) => (
            <div key={imp.id} className="flex items-center gap-3">
              <PlayerAvatar
                avatar={imp.avatar}
                color={imp.color}
                name={imp.name}
                size="lg"
              />
              <div className="min-w-0">
                <div className="font-extrabold text-slate-100 text-base flex items-center gap-2">
                  <span>{imp.name}</span>
                  <span className="text-[10px] font-bold uppercase text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded-full border border-rose-500/30">
                    Imposter
                  </span>
                </div>
                <div className="text-xs text-rose-300/90 mt-0.5">
                  Secret hint received: <span className="italic font-bold text-amber-200">"{imp.hint || gameState.myHint}"</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Secret Word & Roles Reveal Card */}
      <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg mb-5">
        <div className="flex flex-col sm:flex-row items-center justify-around gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
          {/* Secret Word */}
          <div className="w-full sm:w-1/2 flex flex-col items-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Secret Word
            </span>
            <span className="text-2xl font-black text-amber-300 tracking-wide">
              {gameState.revealedWord || gameState.mySecretWord || 'Secret'}
            </span>
            <span className="text-xs text-slate-400 mt-0.5">
              Category: {gameState.currentCategory}
            </span>
          </div>

          {/* Imposter Hint */}
          <div className="w-full sm:w-1/2 flex flex-col items-center pt-3 sm:pt-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 mb-1">
              Imposter Hint
            </span>
            <span className="text-xs font-semibold text-slate-200 italic bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/80 max-w-xs">
              "{gameState.myHint || 'Categorical clue'}"
            </span>
          </div>
        </div>
      </div>

      {/* Tournament Leaderboard */}
      <div className="w-full mb-5">
        <Leaderboard
          players={gameState.players}
          myPlayerId={gameState.myPlayer?.id}
          showRecentGain={true}
          title="Overall Tournament Standings"
          subtitle="Cumulative points across games • Continue to next game to climb"
        />
      </div>

      {/* Roster & Final Role Reveal */}
      <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-4 mb-6 text-left">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 text-center">
          Final Player Identities & Clues
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {gameState.players.map((player) => {
            const isImposter = player.role === 'IMPOSTER';
            return (
              <div
                key={player.id}
                className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 ${
                  isImposter
                    ? 'bg-rose-950/20 border-rose-500/40'
                    : 'bg-slate-800/50 border-slate-700/50'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <PlayerAvatar
                    avatar={player.avatar}
                    color={player.color}
                    name={player.name}
                    size="sm"
                  />
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-slate-100 truncate flex items-center gap-1.5">
                      <span>{player.name}</span>
                      {isImposter ? (
                        <span className="text-[9px] font-bold uppercase text-rose-400 bg-rose-500/20 px-1.5 py-0.5 rounded">
                          Imposter
                        </span>
                      ) : (
                        <span className="text-[9px] font-semibold uppercase text-cyan-400 bg-cyan-500/20 px-1.5 py-0.5 rounded">
                          Civilian
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5">
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
      <div className="w-full max-w-md flex flex-col gap-2.5">
        {isHost ? (
          <button
            onClick={onPlayAgain}
            className="w-full py-3.5 px-6 bg-rose-600 hover:bg-rose-500 text-white font-bold text-base rounded-xl border border-rose-500 shadow-md shadow-rose-900/30 flex items-center justify-center gap-2 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again (New Word)</span>
          </button>
        ) : (
          <div className="w-full py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 text-xs font-semibold">
            Waiting for Host to start next game...
          </div>
        )}

        <button
          onClick={onLeave}
          className="w-full py-2.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 text-slate-300 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Exit to Main Menu</span>
        </button>
      </div>
    </div>
  );
}
