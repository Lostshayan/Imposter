'use client';

import React, { useState } from 'react';
import { Vote, CheckCircle, ShieldAlert, Sparkles, UserCheck } from 'lucide-react';
import { ClientGameState } from '../types/game';

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
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* Title */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30 mb-2">
          <Vote className="w-3.5 h-3.5" />
          <span>Voting Phase • {timeLeft}s Left</span>
        </div>
        <h2 className="text-3xl font-black text-slate-100">Who is the Imposter?</h2>
        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
          Cast your vote for the player whose clue seemed most suspicious!
        </p>
      </div>

      {/* Candidates List */}
      <div className="w-full space-y-3 mb-6">
        {candidates.map((player) => {
          const isSelected = selectedTargetId === player.id;
          return (
            <div
              key={player.id}
              onClick={() => !hasVoted && setSelectedTargetId(player.id)}
              className={`w-full rounded-2xl p-4 border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                isSelected
                  ? 'bg-rose-950/40 border-rose-500 ring-2 ring-rose-500/30 shadow-lg shadow-rose-500/10'
                  : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              } ${hasVoted ? 'cursor-default opacity-85' : ''}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${player.color} flex items-center justify-center text-2xl shrink-0 shadow-md`}
                >
                  {player.avatar}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-100 text-base truncate">{player.name}</div>
                  <div className="text-xs text-slate-400 mt-0.5 truncate">
                    Clue: <span className="italic text-slate-300">"{player.clue || 'No clue'}"</span>
                  </div>
                </div>
              </div>

              {/* Radio Check Indicator */}
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  isSelected
                    ? 'border-rose-400 bg-rose-500 text-white'
                    : 'border-slate-700 bg-slate-800'
                }`}
              >
                {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-white" />}
              </div>
            </div>
          );
        })}

        {/* Skip Option */}
        <div
          onClick={() => !hasVoted && setSelectedTargetId('SKIP')}
          className={`w-full rounded-2xl p-3.5 border transition-all cursor-pointer flex items-center justify-between gap-3 ${
            selectedTargetId === 'SKIP'
              ? 'bg-slate-800 border-indigo-400 ring-2 ring-indigo-500/30'
              : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
          } ${hasVoted ? 'cursor-default opacity-85' : ''}`}
        >
          <div className="text-xs font-semibold text-slate-400">
            Skip Vote (Too unsure / Tie vote)
          </div>
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
              selectedTargetId === 'SKIP' ? 'border-indigo-400 bg-indigo-500' : 'border-slate-700'
            }`}
          >
            {selectedTargetId === 'SKIP' && <span className="w-2 h-2 rounded-full bg-white" />}
          </div>
        </div>
      </div>

      {/* Action / Voted Banner */}
      <div className="w-full max-w-md">
        {!hasVoted ? (
          <button
            onClick={handleVoteSubmit}
            disabled={!selectedTargetId}
            className="w-full py-4 px-6 bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-lg rounded-2xl shadow-xl shadow-rose-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Vote className="w-5 h-5" />
            <span>Lock In Vote</span>
          </button>
        ) : (
          <div className="w-full py-3.5 px-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center text-emerald-300 font-bold flex items-center justify-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span>Vote Locked In! Waiting for results ({timeLeft}s)...</span>
          </div>
        )}

        <div className="text-center text-xs text-slate-500 font-medium mt-3">
          {votedCount} of {alivePlayers.length} votes cast
        </div>
      </div>
    </div>
  );
}
