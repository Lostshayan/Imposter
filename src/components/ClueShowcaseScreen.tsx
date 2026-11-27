'use client';

import React from 'react';
import { MessageSquare, ArrowRight, Fingerprint, ShieldCheck } from 'lucide-react';
import { ClientGameState } from '../types/game';
import { PlayerAvatar } from './PlayerAvatar';

interface ClueShowcaseScreenProps {
  gameState: ClientGameState;
  timeLeft: number;
  onProceedToVoting: () => void;
}

export function ClueShowcaseScreen({
  gameState,
  timeLeft,
  onProceedToVoting,
}: ClueShowcaseScreenProps) {
  const isHost = gameState.myPlayer?.isHost ?? false;
  const isImposter = gameState.myPlayer?.role === 'IMPOSTER';
  const clues = gameState.allClues;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-5">
      {/* Header & Compact Secret Reminder */}
      <div className="w-full flex flex-col items-center text-center gap-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700">
          <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
          <span>Discuss Clues • Round {gameState.round}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
          Who Doesn't Belong?
        </h2>

        {/* Compact Reminder Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
          {isImposter ? (
            <>
              <Fingerprint className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-slate-400">Your Hint:</span>
              <span className="font-bold text-amber-300">"{gameState.myHint}"</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-400">Secret Word:</span>
              <span className="font-bold text-slate-100">{gameState.mySecretWord}</span>
            </>
          )}
        </div>
      </div>

      {/* Big Rectangular Clue Grid */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3">
        {clues.map((item, index) => {
          const isMe = item.playerId === gameState.myPlayer?.id;
          return (
            <div
              key={item.playerId || index}
              className={`min-h-[120px] sm:min-h-[136px] rounded-2xl p-3.5 sm:p-4 border flex flex-col justify-between transition-all ${
                isMe
                  ? 'bg-slate-900/90 border-rose-500/40 ring-1 ring-rose-500/20'
                  : 'bg-slate-900/80 border-slate-800 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <PlayerAvatar
                    avatar={item.avatar}
                    color={item.color}
                    name={item.playerName}
                    size="sm"
                  />
                  <div className="min-w-0">
                    <div className="font-bold text-xs sm:text-sm text-slate-200 truncate">
                      {item.playerName}
                    </div>
                    {isMe && (
                      <span className="text-[10px] font-bold text-rose-400 block leading-none mt-0.5">
                        You
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-[11px] text-slate-500 font-mono shrink-0">#{index + 1}</span>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center min-h-[44px]">
                <p className="text-base sm:text-lg font-extrabold text-slate-100 leading-snug break-words">
                  {item.clue || 'No clue'}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Button */}
      <div className="w-full max-w-sm mt-1">
        {isHost ? (
          <button
            onClick={onProceedToVoting}
            className="w-full py-3.5 px-6 bg-rose-600 hover:bg-rose-500 active:scale-[0.98] text-white font-bold text-sm rounded-xl border border-rose-500 shadow-md shadow-rose-900/20 flex items-center justify-center gap-2 transition-all"
          >
            <span>Start Voting ({timeLeft}s)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="text-xs sm:text-sm text-slate-400 text-center font-medium">
            Voting begins in {timeLeft}s...
          </div>
        )}
      </div>
    </div>
  );
}
