'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Fingerprint, ShieldCheck, Clock } from 'lucide-react';
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
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const submittedClues = gameState.players.filter((p) => p.clue !== null && p.clue !== undefined);
  const trimmed = clueText.trim().toLowerCase();
  const duplicate = trimmed
    ? submittedClues.find((p) => p.clue && p.clue.trim().toLowerCase() === trimmed)
    : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!isMyTurn) {
      setLocalError('Wait for your turn.');
      return;
    }

    if (!clueText.trim()) return;

    if (duplicate) {
      setLocalError(`"${clueText.trim()}" was already used by ${duplicate.name}.`);
      return;
    }

    onSubmitClue(clueText.trim(), (res) => {
      if (res && !res.success && res.error) {
        setLocalError(res.error);
      } else {
        setClueText('');
      }
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-4 sm:gap-5">
      {/* 1. Clean Hero Secret Card */}
      <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            {isImposter ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-400">
                <Fingerprint className="w-4 h-4" />
                <span>You are the Imposter • Hint</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Secret Word</span>
              </span>
            )}
          </div>

          <div
            className={`text-2xl sm:text-3xl font-black tracking-tight ${
              isImposter ? 'text-amber-300' : 'text-slate-100'
            }`}
          >
            {isImposter ? `"${gameState.myHint}"` : gameState.mySecretWord}
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="px-3 py-1 rounded-lg bg-slate-950/70 border border-slate-800 text-xs font-semibold text-slate-300">
            {gameState.currentCategory || 'General'}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-950/70 border border-slate-800 text-xs font-mono text-slate-400">
            {submittedClues.length}/{turnOrderPlayers.length}
          </span>
        </div>
      </div>

      {/* 2. Turn Action Area (Focused & Uncluttered) */}
      <div className="w-full">
        {isMyTurn ? (
          <form
            onSubmit={handleSubmit}
            className="w-full bg-slate-900/90 border border-rose-500/40 ring-1 ring-rose-500/20 rounded-2xl p-4 shadow-md space-y-3 animate-fade-in"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span>Your Turn — Drop a 1–2 word clue</span>
              </span>
              <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {timeLeft}s
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <input
                  type="text"
                  autoFocus
                  maxLength={60}
                  placeholder="Type your clue..."
                  value={clueText}
                  onChange={(e) => {
                    setClueText(e.target.value);
                    setLocalError(null);
                  }}
                  className={`w-full bg-slate-950 border rounded-xl px-4 py-3 text-base font-semibold text-slate-100 placeholder-slate-500 focus:outline-none transition-colors ${
                    duplicate
                      ? 'border-rose-500 ring-1 ring-rose-500/30'
                      : 'border-slate-700 focus:border-rose-500'
                  }`}
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-500 font-mono">
                  {clueText.length}/60
                </span>
              </div>

              <button
                type="submit"
                disabled={!clueText.trim() || !!duplicate}
                className="py-3 px-6 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] text-white font-bold text-sm rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
                <span>Submit Clue</span>
              </button>
            </div>

            {(duplicate || localError) && (
              <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>
                  {duplicate
                    ? `"${duplicate.clue}" was already submitted by ${duplicate.name}.`
                    : localError}
                </span>
              </div>
            )}
          </form>
        ) : (
          <div className="w-full py-2.5 px-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              {hasSubmitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Clue locked in • Waiting for <b className="text-slate-100">{activePlayer?.name || 'next player'}</b>
                  </span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                  <span>
                    <b className="text-slate-100">{activePlayer?.name || 'Player'}</b> is thinking...
                  </span>
                </>
              )}
            </div>
            <span className="font-mono font-bold text-slate-400 shrink-0">{timeLeft}s</span>
          </div>
        )}
      </div>

      {/* 3. Big Rectangular Clue Grid */}
      <div className="w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {turnOrderPlayers.map((player, idx) => {
            const isMe = player.id === myPlayer?.id;
            const isTurn = player.id === currentTurnPlayerId;
            const isDone = player.hasSubmittedClue && player.clue;

            return (
              <div
                key={player.id}
                className={`min-h-[118px] sm:min-h-[132px] rounded-2xl p-3.5 sm:p-4 border flex flex-col justify-between transition-all ${
                  isDone
                    ? 'bg-slate-900/90 border-slate-700/80 shadow-sm animate-clue-register'
                    : isTurn
                    ? 'bg-rose-950/15 border-rose-500/60 ring-1 ring-rose-500/25'
                    : 'bg-slate-900/40 border-dashed border-slate-800/80 opacity-65'
                }`}
              >
                {/* Top: Avatar, Name & Status */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <PlayerAvatar
                      avatar={player.avatar}
                      color={player.color}
                      name={player.name}
                      size="sm"
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-xs sm:text-sm text-slate-200 truncate">
                        {player.name}
                      </div>
                      {isMe && (
                        <span className="text-[10px] font-bold text-rose-400 block leading-none mt-0.5">
                          You
                        </span>
                      )}
                    </div>
                  </div>

                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : isTurn ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping shrink-0" />
                  ) : (
                    <span className="text-[11px] font-mono text-slate-500 shrink-0">#{idx + 1}</span>
                  )}
                </div>

                {/* Bottom/Center: Big Visible Clue Word or Waiting State */}
                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center min-h-[44px]">
                  {isDone ? (
                    <p
                      key={player.clue}
                      className="text-base sm:text-lg font-extrabold text-slate-100 leading-snug break-words animate-clue-word"
                    >
                      {player.clue}
                    </p>
                  ) : isTurn ? (
                    <span className="text-xs sm:text-sm font-semibold text-rose-300 animate-pulse">
                      {isMe ? 'Your turn...' : 'Typing clue...'}
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-slate-500 italic">
                      Waiting...
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
