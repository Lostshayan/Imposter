'use client';

import React from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';
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
  const clues = gameState.allClues;

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      {/* Title */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-slate-800 text-slate-300 border border-slate-700 mb-1.5">
          <MessageSquare className="w-3 h-3 text-slate-400" />
          <span>Discussion Phase • Round {gameState.round}</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-100">Review All Clues</h2>
        <p className="text-xs text-slate-400 mt-0.5 max-w-md mx-auto">
          Read each clue carefully. Who sounds too vague? Who seems to only know a broad category hint?
        </p>
      </div>

      {/* Clues Showcase Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {clues.map((item, index) => {
          const isMe = item.playerId === gameState.myPlayer?.id;
          return (
            <div
              key={item.playerId || index}
              className={`rounded-xl p-4 border transition-all flex flex-col justify-between ${
                isMe
                  ? 'bg-slate-850 border-rose-500/40 ring-1 ring-rose-500/20'
                  : 'bg-slate-900/70 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <PlayerAvatar
                    avatar={item.avatar}
                    color={item.color}
                    name={item.playerName}
                    size="sm"
                  />
                  <div>
                    <span className="font-semibold text-xs text-slate-200">{item.playerName}</span>
                    {isMe && <span className="ml-1.5 text-[9px] font-bold text-rose-400">(You)</span>}
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">#{index + 1}</span>
              </div>

              {/* The Clue */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3">
                <p className="text-sm font-semibold text-slate-100 italic">
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
            className="w-full py-3.5 px-5 bg-rose-600 hover:bg-rose-500 active:scale-[0.98] text-white font-bold text-sm rounded-xl border border-rose-500 shadow-md shadow-rose-900/20 flex items-center justify-center gap-2 transition-all"
          >
            <span>Proceed to Voting ({timeLeft}s)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="text-xs text-slate-400 text-center font-medium">
            Voting phase begins in {timeLeft}s...
          </div>
        )}
      </div>
    </div>
  );
}
