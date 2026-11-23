'use client';

import React from 'react';
import { MessageSquare, ArrowRight, Sparkles, Volume2 } from 'lucide-react';
import { ClientGameState } from '../types/game';

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
  const clues = gameState.allClues;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      {/* Title */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-2">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Discussion Phase • Round {gameState.round}</span>
        </div>
        <h2 className="text-3xl font-black text-slate-100">Review Everyone's Clues</h2>
        <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
          Read all the clues below! Who seems too vague? Who sounds like they didn't know the exact word?
        </p>
      </div>

      {/* Clues Showcase Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {clues.map((item, index) => {
          const isMe = item.playerId === gameState.myPlayer?.id;
          return (
            <div
              key={item.playerId || index}
              className={`rounded-2xl p-5 border transition-all shadow-lg flex flex-col justify-between ${
                isMe
                  ? 'bg-gradient-to-br from-indigo-950/60 to-slate-900 border-indigo-500/50 ring-1 ring-indigo-500/30'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-lg shadow-md`}
                  >
                    {item.avatar}
                  </div>
                  <div>
                    <span className="font-bold text-sm text-slate-200">{item.playerName}</span>
                    {isMe && <span className="ml-1.5 text-[10px] font-bold text-indigo-400">(You)</span>}
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">#{index + 1}</span>
              </div>

              {/* The Clue */}
              <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 my-1">
                <p className="text-base font-semibold text-slate-100 italic">
                  "{item.clue}"
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Host Action or Countdown Banner */}
      <div className="w-full max-w-md">
        {isHost ? (
          <button
            onClick={onProceedToVoting}
            className="w-full py-4 px-6 bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white font-black rounded-2xl shadow-xl shadow-rose-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Proceed to Voting ({timeLeft}s)</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <div className="w-full py-3.5 px-6 bg-slate-900/80 border border-slate-800 rounded-2xl text-center text-slate-400 text-sm font-semibold flex items-center justify-center gap-2">
            <span>Voting starts in</span>
            <span className="font-mono font-bold text-indigo-400 text-base">{timeLeft}s</span>
          </div>
        )}
      </div>
    </div>
  );
}
