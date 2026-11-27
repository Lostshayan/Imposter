'use client';

import React, { useState } from 'react';
import { Vote, CheckCircle2 } from 'lucide-react';
import { ClientGameState } from '../types/game';
import { PlayerAvatar } from './PlayerAvatar';

interface VotingScreenProps {
  gameState: ClientGameState;
  timeLeft: number;
  onCastVote: (targetId: string) => void;
}

export function VotingScreen({ gameState, timeLeft, onCastVote }: VotingScreenProps) {
  const [selectedTargetId, setSelectedTargetId] = useState<string | null>(null);
  const myPlayer = gameState.myPlayer;
  const hasVoted = myPlayer?.votedFor !== null && myPlayer?.votedFor !== undefined;

  const alivePlayers = gameState.players.filter((p) => p.isAlive);
  const candidates = alivePlayers.filter((p) => p.id !== myPlayer?.id);
  const votedCount = alivePlayers.filter((p) => p.votedFor !== null).length;

  const handleVoteSubmit = () => {
    if (!selectedTargetId || hasVoted) return;
    onCastVote(selectedTargetId);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-5">
      {/* Title */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/30 mb-2">
          <Vote className="w-3.5 h-3.5" />
          <span>Voting • {timeLeft}s Left</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
          Vote Out the Imposter
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Tap a player card to select who you suspect.
        </p>
      </div>

      {/* Big Rectangular Candidates Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
        {candidates.map((player) => {
          const isSelected = selectedTargetId === player.id;
          return (
            <div
              key={player.id}
              onClick={() => !hasVoted && setSelectedTargetId(player.id)}
              className={`rounded-2xl p-4 border transition-all cursor-pointer flex flex-col justify-between min-h-[112px] active:scale-[0.99] ${
                isSelected
                  ? 'bg-rose-950/30 border-rose-500 ring-2 ring-rose-500/35 shadow-md'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              } ${hasVoted ? 'cursor-default opacity-80' : ''}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <PlayerAvatar
                    avatar={player.avatar}
                    color={player.color}
                    name={player.name}
                    size="md"
                  />
                  <div className="font-bold text-slate-100 text-sm sm:text-base truncate">
                    {player.name}
                  </div>
                </div>

                {/* Radio Check Indicator */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                    isSelected
                      ? 'border-rose-400 bg-rose-500 text-white'
                      : 'border-slate-700 bg-slate-800'
                  }`}
                >
                  {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                  Clue
                </span>
                <p className="text-base font-extrabold text-slate-100 leading-snug break-words">
                  {player.clue || 'No clue'}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Skip Option */}
      <div
        onClick={() => !hasVoted && setSelectedTargetId('SKIP')}
        className={`w-full max-w-md rounded-xl p-3.5 border transition-all cursor-pointer flex items-center justify-between gap-3 ${
          selectedTargetId === 'SKIP'
            ? 'bg-slate-800 border-indigo-500 ring-1 ring-indigo-500/40'
            : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
        } ${hasVoted ? 'cursor-default opacity-80' : ''}`}
      >
        <div className="text-xs sm:text-sm font-semibold text-slate-300">
          Skip Vote (Unsure / Pass)
        </div>
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
            selectedTargetId === 'SKIP' ? 'border-indigo-400 bg-indigo-500' : 'border-slate-700'
          }`}
        >
          {selectedTargetId === 'SKIP' && <span className="w-2 h-2 rounded-full bg-white" />}
        </div>
      </div>

      {/* Action / Voted Banner */}
      <div className="w-full max-w-md">
        {!hasVoted ? (
          <button
            onClick={handleVoteSubmit}
            disabled={!selectedTargetId}
            className="w-full py-3.5 px-6 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] text-white font-bold text-sm sm:text-base rounded-xl border border-rose-500 shadow-md shadow-rose-900/20 flex items-center justify-center gap-2 transition-all"
          >
            <Vote className="w-4 h-4" />
            <span>Lock In Vote</span>
          </button>
        ) : (
          <div className="w-full py-3.5 px-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center text-emerald-300 font-semibold text-sm flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Vote Locked In • Waiting for others ({timeLeft}s)</span>
          </div>
        )}

        <div className="text-center text-xs text-slate-500 font-medium mt-3">
          {votedCount} of {alivePlayers.length} votes cast
        </div>
      </div>
    </div>
  );
}
