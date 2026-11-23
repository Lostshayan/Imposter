'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Clock, Sparkles, UserCheck, Bot } from 'lucide-react';
import { ClientGameState } from '../types/game';

interface ClueInputScreenProps {
  gameState: ClientGameState;
  timeLeft: number;
  onSubmitClue: (clue: string, onResult?: (res: { success: boolean; error?: string }) => void) => void;
}

export function ClueInputScreen({ gameState, timeLeft, onSubmitClue }: ClueInputScreenProps) {
  const [clueText, setClueText] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const myPlayer = gameState.myPlayer;
  const isImposter = myPlayer?.role === 'IMPOSTER';
  const hasSubmitted = myPlayer?.hasSubmittedClue ?? false;

  const currentTurnPlayerId = gameState.currentTurnPlayerId;
  const isMyTurn = currentTurnPlayerId === myPlayer?.id;
  const activePlayer = gameState.players.find((p) => p.id === currentTurnPlayerId);

  const turnOrderPlayers = (gameState.turnOrder || [])
    .map((id) => gameState.players.find((p) => p.id === id))
    .filter(Boolean);

  // Clues already submitted this round
  const submittedClues = gameState.players.filter((p) => p.clue !== null && p.clue !== undefined);

  // Client duplicate check
  const trimmed = clueText.trim().toLowerCase();
  const duplicate = trimmed
    ? submittedClues.find((p) => p.clue && p.clue.trim().toLowerCase() === trimmed)
    : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!isMyTurn) {
      setLocalError("It is not your turn yet! Please wait for your turn.");
      return;
    }

    if (!clueText.trim()) return;

    if (duplicate) {
      setLocalError(`The clue "${clueText.trim()}" was already submitted by ${duplicate.name}! Every clue must be unique.`);
      return;
    }

    onSubmitClue(clueText.trim(), (res) => {
      if (res && !res.success && res.error) {
        setLocalError(res.error);
      }
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center">
      {/* Secret Word / Hint Reminder Banner */}
      <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl mb-4">
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

      {/* Turn Order Tracker Sequence */}
      <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 shadow-md mb-4 overflow-x-auto">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span className="font-bold uppercase tracking-wider text-[11px]">Clue Turn Order</span>
          <span className="text-indigo-400 font-mono font-semibold">
            {submittedClues.length} of {turnOrderPlayers.length} Done
          </span>
        </div>

        <div className="flex items-center gap-2 min-w-max">
          {turnOrderPlayers.map((player, idx) => {
            if (!player) return null;
            const isTurn = player.id === currentTurnPlayerId;
            const isDone = player.hasSubmittedClue;

            return (
              <div
                key={player.id}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                  isTurn
                    ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200 ring-2 ring-indigo-500/40 animate-pulse'
                    : isDone
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400'
                }`}
              >
                <span>{player.avatar}</span>
                <span className="truncate max-w-[90px]">{player.name}</span>
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : isTurn ? (
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping shrink-0" />
                ) : (
                  <span className="text-[10px] text-slate-500 font-mono">#{idx + 1}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Turn Status Alert Banner */}
      <div className="w-full mb-4">
        {isMyTurn ? (
          <div className="p-3.5 bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900 border border-indigo-500/50 rounded-2xl text-center shadow-lg shadow-indigo-500/15">
            <span className="font-extrabold text-indigo-300 text-sm flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
              <span>It is YOUR Turn to Type! ({timeLeft}s)</span>
            </span>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Type a unique word or clue that has not been submitted yet.
            </p>
          </div>
        ) : (
          <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-2xl text-center flex items-center justify-center gap-2 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0" />
            <span>
              Waiting for <b>{activePlayer?.name || 'player'}</b> to type their clue ({timeLeft}s)...
            </span>
            {activePlayer?.isBot && (
              <span className="text-[10px] font-bold uppercase bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-500/30">
                AI Bot Thinking
              </span>
            )}
          </div>
        )}
      </div>

      {/* Input or Submitted Card */}
      <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl mb-5">
        <h2 className="text-xl font-black text-slate-100 text-center mb-1">
          {isMyTurn ? 'Enter Your Unique Clue' : 'Player Clues in Order'}
        </h2>
        <p className="text-xs text-slate-400 text-center mb-4">
          Remember: <b>No two players can submit the same clue!</b>
        </p>

        {/* Form is active only when it's your turn and not yet submitted */}
        {isMyTurn && !hasSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <input
                type="text"
                autoFocus
                maxLength={60}
                placeholder="Type your unique clue here..."
                value={clueText}
                onChange={(e) => {
                  setClueText(e.target.value);
                  setLocalError(null);
                }}
                className={`w-full bg-slate-800/90 border rounded-2xl px-5 py-4 text-base font-medium text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 ${
                  duplicate
                    ? 'border-rose-500 focus:ring-rose-500 text-rose-200'
                    : 'border-slate-700 focus:ring-indigo-500'
                }`}
              />
              <span className="absolute right-4 bottom-3 text-[11px] text-slate-500 font-mono">
                {clueText.length}/60
              </span>
            </div>

            {/* Real-time duplicate error alert */}
            {duplicate && (
              <div className="p-3 bg-rose-500/15 border border-rose-500/40 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>
                  <b>Duplicate Clue!</b> "{duplicate.clue}" was already given by {duplicate.name}. Please enter something different.
                </span>
              </div>
            )}

            {localError && !duplicate && (
              <div className="p-3 bg-rose-500/15 border border-rose-500/40 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{localError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={!clueText.trim() || !!duplicate}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold rounded-2xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Submit My Clue</span>
            </button>
          </form>
        ) : hasSubmitted ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-center flex flex-col items-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-1" />
            <span className="font-bold text-slate-200 text-sm">Your Clue is Locked In!</span>
            <div className="mt-1 text-sm italic font-medium text-emerald-300 bg-emerald-950/40 px-4 py-1.5 rounded-xl border border-emerald-500/20">
              "{myPlayer?.clue}"
            </div>
          </div>
        ) : (
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5 text-center text-xs text-slate-400">
            Waiting for your turn in the sequence. You will type your clue when your turn arrives!
          </div>
        )}
      </div>

      {/* Live Submitted Clues Feed (Visible to Everyone) */}
      <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
          <span>Clues Given So Far ({submittedClues.length})</span>
          <span className="text-[10px] text-slate-500">Must all be unique</span>
        </h3>

        {submittedClues.length === 0 ? (
          <div className="text-center text-xs text-slate-500 py-4 italic">
            No clues submitted yet. First player is taking their turn!
          </div>
        ) : (
          <div className="space-y-2">
            {submittedClues.map((player, i) => (
              <div
                key={player.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/70 text-xs"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-base">{player.avatar}</span>
                  <span className="font-bold text-slate-200 truncate">{player.name}</span>
                </div>
                <div className="italic text-slate-100 font-semibold bg-slate-900/80 px-3 py-1 rounded-lg border border-slate-800">
                  "{player.clue}"
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
