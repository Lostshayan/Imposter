'use client';

import React, { useState, useEffect } from 'react';
import { Vote, CheckCircle2, RefreshCw } from 'lucide-react';
import { ClientGameState } from '../types/game';
import { PlayerAvatar } from './PlayerAvatar';

interface VotingScreenProps {
  gameState: ClientGameState;
  timeLeft: number;
  onCastVote: (targetId: string) => void;
}

export function VotingScreen({ gameState, timeLeft, onCastVote }: VotingScreenProps) {
  const myPlayer = gameState.myPlayer;
  const currentVote = myPlayer?.votedFor ?? null;
  const hasVoted = currentVote !== null && currentVote !== undefined;

  const [selectedTargetId, setSelectedTargetId] = useState<string | null>(currentVote);

  // Sync local selection if server vote changes externally
  useEffect(() => {
    if (currentVote) {
      setSelectedTargetId(currentVote);
    }
  }, [currentVote]);

  const alivePlayers = gameState.players.filter((p) => p.isAlive);
  const candidates = alivePlayers.filter((p) => p.id !== myPlayer?.id);
  const votedCount = alivePlayers.filter((p) => p.votedFor !== null && p.votedFor !== undefined).length;
  const remainingVotes = alivePlayers.length - votedCount;

  // Can change vote as long as voting hasn't ended (at least 1 player still left to vote)
  const canChangeVote = remainingVotes >= 1;
  const isChangingSelection = hasVoted && selectedTargetId !== null && selectedTargetId !== currentVote;

  // Build real-time voter list per target
  const getVotersFor = (targetId: string) =>
    alivePlayers.filter((p) => p.votedFor === targetId);

  const skipVoters = getVotersFor('SKIP');

  const handleVoteSubmit = () => {
    if (!selectedTargetId || !canChangeVote) return;
    if (hasVoted && selectedTargetId === currentVote) return;
    onCastVote(selectedTargetId);
  };

  const currentVoteTargetName =
    currentVote === 'SKIP'
      ? 'Skip Vote'
      : gameState.players.find((p) => p.id === currentVote)?.name || 'Unknown';

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-4 sm:gap-5">
      {/* Title */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/30 mb-2">
          <Vote className="w-3.5 h-3.5" />
          <span>Live Voting • {timeLeft}s Left</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
          Vote Out the Imposter
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Votes appear live. You can change your vote until everyone has voted.
        </p>
      </div>

      {/* Big Rectangular Candidates Grid with Live Vote Counts & Voter Names */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
        {candidates.map((player) => {
          const isSelected = selectedTargetId === player.id;
          const isMyCurrentVote = currentVote === player.id;
          const voters = getVotersFor(player.id);
          const voteCount = voters.length;

          return (
            <div
              key={player.id}
              onClick={() => canChangeVote && setSelectedTargetId(player.id)}
              className={`rounded-2xl p-4 border transition-all flex flex-col justify-between min-h-[124px] ${
                canChangeVote ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'
              } ${
                isSelected
                  ? 'bg-rose-950/30 border-rose-500 ring-2 ring-rose-500/35 shadow-md'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              {/* Top: Avatar, Name + Live Vote Count + Radio */}
              <div className="flex items-start justify-between gap-2.5">
                <div className="flex items-start gap-2.5 min-w-0">
                  <PlayerAvatar
                    avatar={player.avatar}
                    color={player.color}
                    name={player.name}
                    size="md"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-100 text-sm sm:text-base truncate">
                        {player.name}
                      </span>
                      {/* Live Vote Count Badge next to name */}
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-bold font-mono border transition-all ${
                          voteCount > 0
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                            : 'bg-slate-800/70 text-slate-500 border-slate-700/60'
                        }`}
                      >
                        {voteCount} {voteCount === 1 ? 'vote' : 'votes'}
                      </span>
                    </div>

                    {/* Small font voter names below the candidate's name */}
                    <div className="text-[11px] text-slate-400 mt-0.5 min-h-[16px]">
                      {voters.length > 0 ? (
                        <span className="text-rose-300/90 font-medium">
                          Voted by: {voters.map((v) => (v.id === myPlayer?.id ? 'You' : v.name)).join(', ')}
                        </span>
                      ) : (
                        <span className="text-slate-500">No votes yet</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Radio / Current Vote Check */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition-all ${
                    isSelected
                      ? 'border-rose-400 bg-rose-500 text-white'
                      : isMyCurrentVote
                      ? 'border-emerald-400 bg-emerald-500 text-white'
                      : 'border-slate-700 bg-slate-800'
                  }`}
                >
                  {(isSelected || isMyCurrentVote) && <span className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>

              {/* Bottom: Clue */}
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

      {/* Skip Option with Live Skip Voters */}
      <div
        onClick={() => canChangeVote && setSelectedTargetId('SKIP')}
        className={`w-full max-w-md rounded-xl p-3.5 border transition-all flex items-center justify-between gap-3 ${
          canChangeVote ? 'cursor-pointer' : 'cursor-default'
        } ${
          selectedTargetId === 'SKIP'
            ? 'bg-slate-800 border-indigo-500 ring-1 ring-indigo-500/40'
            : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
        }`}
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-semibold text-slate-300">
              Skip Vote (Unsure / Pass)
            </span>
            {skipVoters.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-slate-700 text-slate-200">
                {skipVoters.length}
              </span>
            )}
          </div>
          {skipVoters.length > 0 && (
            <div className="text-[11px] text-slate-400 mt-0.5 truncate">
              Skipped by: {skipVoters.map((v) => (v.id === myPlayer?.id ? 'You' : v.name)).join(', ')}
            </div>
          )}
        </div>
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
            selectedTargetId === 'SKIP' ? 'border-indigo-400 bg-indigo-500' : 'border-slate-700'
          }`}
        >
          {selectedTargetId === 'SKIP' && <span className="w-2 h-2 rounded-full bg-white" />}
        </div>
      </div>

      {/* Action / Change Vote Controls */}
      <div className="w-full max-w-md space-y-2.5">
        {!hasVoted ? (
          <button
            onClick={handleVoteSubmit}
            disabled={!selectedTargetId}
            className="w-full py-3.5 px-6 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] text-white font-bold text-sm sm:text-base rounded-xl border border-rose-500 shadow-md shadow-rose-900/20 flex items-center justify-center gap-2 transition-all"
          >
            <Vote className="w-4 h-4" />
            <span>Cast Vote</span>
          </button>
        ) : isChangingSelection ? (
          <button
            onClick={handleVoteSubmit}
            className="w-full py-3.5 px-6 bg-amber-600 hover:bg-amber-500 active:scale-[0.98] text-white font-bold text-sm sm:text-base rounded-xl border border-amber-500 shadow-md flex items-center justify-center gap-2 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Change Vote</span>
          </button>
        ) : (
          <div className="w-full py-3 px-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center text-emerald-300 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Voted for <b>{currentVoteTargetName}</b> • Tap another card to change ({remainingVotes} left)
            </span>
          </div>
        )}

        <div className="text-center text-xs text-slate-500 font-medium">
          {votedCount} of {alivePlayers.length} players have voted
        </div>
      </div>
    </div>
  );
}
