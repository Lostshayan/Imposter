'use client';

import React from 'react';
import { ArrowRight, Scale, CheckCircle2, AlertCircle, EyeOff } from 'lucide-react';
import { ClientGameState } from '../types/game';
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

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center">
      <div className="mb-5">
        <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-slate-800 text-slate-300 border border-slate-700">
          The Verdict • Round {gameState.round}
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-2">
          {eliminated ? 'Vote Outcome' : 'Tie Vote • No Majority'}
        </h2>
      </div>

      {/* Outcome Card */}
      <div className="w-full mb-5">
        {eliminated ? (
          <div
            className={`rounded-2xl p-5 border shadow-sm flex flex-col items-center ${
              eliminated.wasImposter
                ? 'bg-rose-950/20 border-rose-500/40'
                : 'bg-amber-950/20 border-amber-500/40'
            }`}
          >
            <div className="mb-2.5">
              <PlayerAvatar
                avatar={eliminated.avatar}
                color={eliminated.color}
                name={eliminated.name}
                size="lg"
              />
            </div>

            <div className="text-base font-bold text-slate-100 mb-1">
              {eliminated.name} was voted out by majority
            </div>

            <div className="my-1.5">
              {eliminated.wasImposter ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-xs font-bold tracking-wide uppercase">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>They Were The Imposter</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30 text-xs font-bold tracking-wide uppercase">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                  <span>They Were An Innocent Civilian</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 text-amber-400 flex items-center justify-center mb-2.5">
              <Scale className="w-6 h-6" />
            </div>
            <p className="text-xs text-slate-300 max-w-xs font-medium">
              Votes were tied or skipped! Nobody reached majority so another round will decide.
            </p>
          </div>
        )}
      </div>

      {/* Vote Breakdown */}
      <div className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 mb-5 text-left">
        <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 text-center">
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
              </div>
              <span className="font-mono font-bold text-amber-400 shrink-0">
                {player.votesReceived} {player.votesReceived === 1 ? 'vote' : 'votes'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Advance Button */}
      <div className="w-full max-w-sm">
        {isHost ? (
          <button
            onClick={onProceed}
            className="w-full py-3 px-6 bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm rounded-xl border border-rose-500 shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
          >
            <span>Proceed to Next Round ({timeLeft}s)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="text-xs text-slate-400 font-medium">
            Starting next round in {timeLeft}s...
          </div>
        )}
      </div>
    </div>
  );
}
