'use client';

import React from 'react';
import { ArrowRight, Users, CheckCircle2, AlertCircle, EyeOff, Scale } from 'lucide-react';
import { ClientGameState } from '../types/game';
import { Leaderboard } from './Leaderboard';
import { PlayerAvatar } from './PlayerAvatar';

interface VoteResultsScreenProps {
  gameState: ClientGameState;
  timeLeft: number;
  onProceed: () => void;
}

export function VoteResultsScreen({ gameState, timeLeft, onProceed }: VoteResultsScreenProps) {
  const isHost = gameState.myPlayer?.isHost ?? false;
  const eliminated = gameState.lastEliminated;
  const players = gameState.players;
  const originalImposters = gameState.originalImposters || [];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center">
      <div className="mb-4">
        <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-slate-800 text-slate-300 border border-slate-700">
          The Verdict • Round {gameState.round}
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-2">Voting Results</h2>
      </div>

      {/* Outcome Card */}
      <div className="w-full mb-6">
        {eliminated ? (
          <div
            className={`rounded-2xl p-6 border shadow-xl flex flex-col items-center transition-all ${
              eliminated.wasImposter
                ? 'bg-rose-950/20 border-rose-500/40 shadow-rose-950/20'
                : 'bg-amber-950/20 border-amber-500/40 shadow-amber-950/20'
            }`}
          >
            <div className="mb-3">
              <PlayerAvatar
                avatar={eliminated.avatar}
                color={eliminated.color}
                name={eliminated.name}
                size="lg"
              />
            </div>

            <div className="text-lg font-bold text-slate-100 mb-1">
              {eliminated.name} was voted out by majority
            </div>

            <div className="my-2">
              {eliminated.wasImposter ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-bold tracking-wide uppercase">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>They Were The Imposter</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30 text-xs font-bold tracking-wide uppercase">
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  <span>They Were An Innocent Civilian</span>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-300 mt-1 max-w-xs font-medium">
              {eliminated.wasImposter
                ? 'The civilians caught the imposter! Civilians win this game.'
                : 'The game ends immediately! The imposter evaded capture and wins.'}
            </p>

            {/* REVEAL OF THE ORIGINAL IMPOSTER */}
            {!eliminated.wasImposter && originalImposters.length > 0 && (
              <div className="w-full bg-slate-900/90 border border-rose-500/30 rounded-xl p-3.5 mt-4 text-left">
                <div className="text-[11px] font-bold uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-1.5">
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>The Real Imposter Was</span>
                </div>
                {originalImposters.map((imp) => (
                  <div key={imp.id} className="flex items-center gap-3">
                    <PlayerAvatar
                      avatar={imp.avatar}
                      color={imp.color}
                      name={imp.name}
                      size="md"
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-slate-100 text-sm flex items-center gap-2">
                        <span>{imp.name}</span>
                        <span className="text-[10px] font-bold uppercase text-rose-400 bg-rose-500/20 px-1.5 py-0.5 rounded">
                          Imposter
                        </span>
                      </div>
                      <div className="text-xs text-rose-300/90 mt-0.5">
                        Secret hint they held: <span className="italic font-semibold text-amber-200">"{imp.hint || gameState.myHint}"</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Secret Word Reveal if Civilian Eliminated */}
            {!eliminated.wasImposter && gameState.revealedWord && (
              <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-3 mt-3 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  The Secret Word Was
                </span>
                <span className="text-xl font-extrabold tracking-wide text-amber-300">
                  {gameState.revealedWord}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center mb-3">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-1">Tie Vote / No Majority</h3>
            <p className="text-xs text-slate-400 max-w-xs">
              Votes were tied or skipped. No player reached majority so another round will decide.
            </p>
          </div>
        )}
      </div>

      {/* Vote Breakdown */}
      <div className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-4 mb-6 text-left">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 text-center">
          Vote Tally Breakdown
        </h4>
        <div className="space-y-1.5">
          {players.map((player) => (
            <div
              key={player.id}
              className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-800/40 border border-slate-700/40"
            >
              <div className="flex items-center gap-2 min-w-0">
                <PlayerAvatar
                  avatar={player.avatar}
                  color={player.color}
                  name={player.name}
                  size="sm"
                />
                <span className="font-semibold text-slate-200 truncate">{player.name}</span>
                {player.role === 'IMPOSTER' && eliminated && (
                  <span className="text-[9px] font-bold uppercase text-rose-400 bg-rose-500/20 px-1 py-0.5 rounded">
                    Imposter
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono font-bold text-amber-400">
                  {player.votesReceived} {player.votesReceived === 1 ? 'vote' : 'votes'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard & Round Points */}
      <div className="w-full mb-6">
        <Leaderboard
          players={players}
          myPlayerId={gameState.myPlayer?.id}
          showRecentGain={true}
          title="Round Standings & Points"
          subtitle="Points awarded based on this round's voting results"
        />
      </div>

      {/* Advance Button */}
      <div className="w-full max-w-md">
        {isHost ? (
          <button
            onClick={onProceed}
            className="w-full py-3.5 px-6 bg-rose-600 hover:bg-rose-500 text-white font-bold text-base rounded-xl border border-rose-500 shadow-md shadow-rose-900/30 flex items-center justify-center gap-2 transition-all"
          >
            <span>
              {eliminated && !eliminated.wasImposter
                ? `View Final Summary (${timeLeft}s)`
                : `Proceed to Next Round (${timeLeft}s)`}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="text-xs text-slate-400 font-medium">
            {eliminated && !eliminated.wasImposter
              ? `Game concluded. Proceeding to final recap in ${timeLeft}s...`
              : `Continuing in ${timeLeft}s...`}
          </div>
        )}
      </div>
    </div>
  );
}
