'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Clock, Sparkles, HelpCircle } from 'lucide-react';
import { ClientGameState } from '../types/game';

interface ClueInputScreenProps {
  gameState: ClientGameState;
  timeLeft: number;
  onSubmitClue: (clue: string) => void;
}

export function ClueInputScreen({ gameState, timeLeft, onSubmitClue }: ClueInputScreenProps) {
  const [clueText, setClueText] = useState('');
  const myPlayer = gameState.myPlayer;
  const isImposter = myPlayer?.role === 'IMPOSTER';
  const hasSubmitted = myPlayer?.hasSubmittedClue ?? false;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clueText.trim() || hasSubmitted) return;
    onSubmitClue(clueText.trim());
  };

  const alivePlayers = gameState.players.filter((p) => p.isAlive);
  const submittedCount = alivePlayers.filter((p) => p.hasSubmittedClue).length;

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center">
      {/* Secret Word / Hint Reminder Banner */}
      <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl mb-5">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span className="font-semibold uppercase tracking-wider">
            {gameState.currentCategory || 'General'}
          </span>
          <span className="font-semibold text-indigo-400">Round {gameState.round}</span>
        </div>

        {isImposter ? (
          <div>
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wide flex items-center gap-1">
              <span>😈 You are the Imposter • Hint:</span>
            </div>
            <div className="text-sm font-semibold text-amber-200 mt-1 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
              "{gameState.myHint}"
            </div>
          </div>
        ) : (
          <div>
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wide flex items-center gap-1">
              <span>😇 Secret Word:</span>
            </div>
            <div className="text-2xl font-black text-cyan-300 tracking-wide mt-0.5">
              {gameState.mySecretWord}
            </div>
          </div>
        )}
      </div>

      {/* Input or Submitted Card */}
      <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl mb-6">
        <h2 className="text-xl font-black text-slate-100 text-center mb-1">Type Your Secret Clue</h2>
        <p className="text-xs text-slate-400 text-center mb-4">
          {isImposter
            ? 'Act natural! Type a clue that sounds like you know the exact word.'
            : 'Be subtle! Give enough clue so humans trust you, but not enough for the imposter to guess.'}
        </p>

        {!hasSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                autoFocus
                maxLength={60}
                placeholder="e.g. Dark roast, Little cup..."
                value={clueText}
                onChange={(e) => setClueText(e.target.value)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-2xl px-5 py-4 text-base font-medium text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="absolute right-4 bottom-3 text-[11px] text-slate-500 font-mono">
                {clueText.length}/60
              </span>
            </div>

            <button
              type="submit"
              disabled={!clueText.trim()}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold rounded-2xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Submit Clue</span>
            </button>
          </form>
        ) : (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 text-center flex flex-col items-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mb-2" />
            <span className="font-bold text-slate-200">Clue Submitted!</span>
            <div className="mt-2 text-sm italic font-medium text-emerald-300 bg-emerald-950/40 px-4 py-2 rounded-xl border border-emerald-500/20">
              "{myPlayer?.clue}"
            </div>
            <span className="text-xs text-slate-400 mt-3">Waiting for other players to submit their clues...</span>
          </div>
        )}
      </div>

      {/* Roster Submission Status */}
      <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-3">
          <span>Submissions Progress</span>
          <span className="text-indigo-400">
            {submittedCount} / {alivePlayers.length} Submitted
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {alivePlayers.map((player) => (
            <div
              key={player.id}
              className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 text-xs transition-all ${
                player.hasSubmittedClue
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-400'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-base">{player.avatar}</span>
                <span className="font-medium truncate">{player.name}</span>
              </div>
              {player.hasSubmittedClue ? (
                <span className="text-[10px] font-bold text-emerald-400 shrink-0">Ready</span>
              ) : (
                <span className="text-[10px] font-mono text-slate-500 shrink-0 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
                  Typing
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
