'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Sparkles, Fingerprint, ShieldCheck } from 'lucide-react';
import { ClientGameState } from '../types/game';
import { PlayerAvatar } from './PlayerAvatar';

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
      <div className="w-full bg-slate-900/70 border border-slate-800 rounded-2xl p-4 shadow-sm mb-4 backdrop-blur-md">
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
          <span className="font-semibold uppercase tracking-wider">
            {gameState.currentCategory || 'General'}
          </span>
          <span className="font-mono text-slate-400">Round {gameState.round}</span>
        </div>

        {isImposter ? (
          <div>
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wide flex items-center gap-1.5">
              <Fingerprint className="w-4 h-4" />
              <span>You are the Imposter • Category Hint:</span>
            </div>
            <div className="text-sm font-bold text-amber-300 mt-1 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
              "{gameState.myHint}"
            </div>
          </div>
        ) : (
          <div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Secret Word:</span>
            </div>
            <div className="text-2xl font-black text-slate-100 tracking-wide mt-0.5">
              {gameState.mySecretWord}
            </div>
          </div>
        )}
      </div>

      {/* Turn Order Tracker Sequence */}
      <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-3 shadow-sm mb-3.5 sm:mb-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
          <span className="font-bold uppercase tracking-wider text-[10px]">Clue Submission Sequence</span>
          <span className="font-mono text-slate-400">
            {submittedClues.length} of {turnOrderPlayers.length} Submitted
          </span>
        </div>

        <div className="flex items-center gap-1.5 min-w-max">
          {turnOrderPlayers.map((player, idx) => {
            if (!player) return null;
            const isTurn = player.id === currentTurnPlayerId;
            const isDone = player.hasSubmittedClue;

            return (
              <div
                key={player.id}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  isTurn
                    ? 'bg-rose-500/10 border-rose-500/50 text-rose-300 ring-1 ring-rose-500/30'
                    : isDone
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <PlayerAvatar
                  avatar={player.avatar}
                  color={player.color}
                  name={player.name}
                  size="xs"
                />
                <span className="truncate max-w-[85px]">{player.name}</span>
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : isTurn ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping shrink-0" />
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
          <div className="p-3 bg-rose-500/10 border border-rose-500/40 rounded-xl text-center">
            <span className="font-bold text-rose-300 text-xs sm:text-sm flex items-center justify-center gap-1.5">
              <span>It is your turn to submit a clue ({timeLeft}s)</span>
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Type a unique word or clue that hasn't been submitted yet.
            </p>
          </div>
        ) : (
          <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-center flex items-center justify-center gap-2 text-xs text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping shrink-0" />
            <span>
              Waiting for <b className="text-slate-200">{activePlayer?.name || 'player'}</b> to type ({timeLeft}s)...
            </span>
          </div>
        )}
      </div>

      {/* Active Turn Form or Waiting State */}
      <div className="w-full mb-4">
        {isMyTurn ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <input
                type="text"
                autoFocus
                maxLength={60}
                placeholder="Type your 1-3 word clue..."
                value={clueText}
                onChange={(e) => {
                  setClueText(e.target.value);
                  setLocalError(null);
                }}
                className={`w-full bg-slate-950 border rounded-xl px-4 py-3 text-base font-semibold text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                  duplicate
                    ? 'border-rose-500 ring-1 ring-rose-500/30'
                    : 'border-slate-800 focus:border-rose-500/60'
                }`}
              />
              <span className="absolute right-3.5 bottom-3 text-[10px] text-slate-500 font-mono">
                {clueText.length}/60
              </span>
            </div>

            {duplicate && (
              <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>
                  <b>Duplicate:</b> "{duplicate.clue}" was already given by {duplicate.name}. Clues must be unique.
                </span>
              </div>
            )}

            {localError && !duplicate && (
              <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{localError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={!clueText.trim() || !!duplicate}
              className="w-full py-3.5 px-5 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] text-white font-bold text-sm rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Clue</span>
            </button>
          </form>
        ) : hasSubmitted ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-center flex flex-col items-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 mb-1" />
            <span className="font-semibold text-slate-200 text-xs">Your clue is locked in:</span>
            <div className="mt-1 text-xs italic font-medium text-slate-200 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              "{myPlayer?.clue}"
            </div>
          </div>
        ) : (
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3.5 text-center text-xs text-slate-500">
            Waiting for your turn in the sequence.
          </div>
        )}
      </div>

      {/* Live Submitted Clues Feed */}
      <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center justify-between">
          <span>Submitted Clues ({submittedClues.length})</span>
          <span className="text-[10px] text-slate-500">All clues must be unique</span>
        </h3>

        {submittedClues.length === 0 ? (
          <div className="text-center text-xs text-slate-500 py-3 italic">
            Waiting for the first player to submit...
          </div>
        ) : (
          <div className="space-y-1.5">
            {submittedClues.map((player) => (
              <div
                key={player.id}
                className="flex items-center justify-between p-2 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <PlayerAvatar
                    avatar={player.avatar}
                    color={player.color}
                    name={player.name}
                    size="xs"
                  />
                  <span className="font-semibold text-slate-200 truncate">{player.name}</span>
                </div>
                <div className="italic text-slate-100 font-medium bg-slate-900 px-2.5 py-0.5 rounded-lg border border-slate-800">
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
