'use client';

import React, { useState } from 'react';
import { Sparkles, HelpCircle, Send, Check } from 'lucide-react';
import { ClientGameState } from '../types/game';

interface ImposterGuessScreenProps {
  gameState: ClientGameState;
  timeLeft: number;
  onSubmitGuess: (guess: string) => void;
}

export function ImposterGuessScreen({
  gameState,
  timeLeft,
  onSubmitGuess,
}: ImposterGuessScreenProps) {
  const [selectedWord, setSelectedWord] = useState('');
  const [customWord, setCustomWord] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const myPlayer = gameState.myPlayer;
  const wasImposter = gameState.lastEliminated?.wasImposter;
  const isMeEliminated = gameState.lastEliminated?.id === myPlayer?.id;
  const options = gameState.imposterGuessOptions || [];

  const handleGuess = (word: string) => {
    if (!word.trim() || submitted) return;
    setSubmitted(true);
    onSubmitGuess(word.trim());
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center">
      {/* Title */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Clutch Final Guess • {timeLeft}s</span>
        </div>
        <h2 className="text-3xl font-black text-slate-100">Imposter's Final Chance!</h2>
        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
          If the imposter can correctly guess the secret common word, they steal the victory!
        </p>
      </div>

      {isMeEliminated && wasImposter ? (
        /* You are the imposter guessing */
        <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl mb-6">
          <div className="text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1">
            Category: {gameState.currentCategory}
          </div>
          <div className="text-sm text-slate-300 mb-4 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            Remember your hint: <span className="text-amber-300 font-semibold">"{gameState.myHint}"</span>
          </div>

          <h3 className="text-base font-bold text-slate-100 mb-3">
            What was the secret common word?
          </h3>

          {/* Multiple choice options */}
          {options.length > 0 && (
            <div className="grid grid-cols-2 gap-2.5 mb-4">
              {options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  disabled={submitted}
                  onClick={() => {
                    setSelectedWord(opt);
                    handleGuess(opt);
                  }}
                  className={`p-3.5 rounded-xl border font-bold text-sm transition-all ${
                    selectedWord === opt
                      ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-lg'
                      : 'bg-slate-800/90 hover:bg-slate-700 border-slate-700 text-slate-200'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Or type custom word */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleGuess(customWord);
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              disabled={submitted}
              placeholder="Or type the exact word..."
              value={customWord}
              onChange={(e) => setCustomWord(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button
              type="submit"
              disabled={!customWord.trim() || submitted}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold rounded-xl text-sm transition-all shrink-0"
            >
              Guess
            </button>
          </form>

          {submitted && (
            <div className="mt-4 text-xs font-bold text-amber-300">
              Guess submitted! Verifying result...
            </div>
          )}
        </div>
      ) : (
        /* Spectating civilians */
        <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center text-3xl mb-4 border border-amber-500/30 animate-pulse">
            🤔
          </div>
          <h3 className="text-xl font-bold text-slate-100 mb-1">
            {gameState.lastEliminated?.name} is Guessing...
          </h3>
          <p className="text-xs text-slate-400 max-w-xs mb-4">
            They are trying to guess the common word based on all clues given during the game!
          </p>
          <div className="text-2xl font-mono font-black text-amber-400">
            {timeLeft}s
          </div>
        </div>
      )}
    </div>
  );
}
