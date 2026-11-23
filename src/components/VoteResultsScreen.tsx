'use client';

import React from 'react';
import { ArrowRight, Users, ShieldAlert, Sparkles, Skull } from 'lucide-react';
import { ClientGameState } from '../types/game';

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
        <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-slate-800 text-slate-300 border border-slate-700">
          The Verdict • Round {gameState.round}
        </span>
        <h2 className="text-3xl font-black text-slate-100 mt-2">Voting Results</h2>
      </div>

      {/* Outcome Card */}
      <div className="w-full mb-6">
        {eliminated ? (
          <div
            className={`rounded-3xl p-6 border shadow-2xl flex flex-col items-center transition-all ${
              eliminated.wasImposter
                ? 'bg-gradient-to-b from-rose-950/80 to-slate-900 border-rose-500 shadow-rose-500/20'
                : 'bg-gradient-to-b from-amber-950/80 to-slate-900 border-amber-500 shadow-amber-500/20'
            }`}
          >
            <div className="w-20 h-20 rounded-2xl bg-slate-900/90 border border-slate-700 flex items-center justify-center text-4xl mb-3 shadow-xl">
              {eliminated.avatar}
            </div>

            <div className="text-xl font-black text-slate-100 mb-1">
              {eliminated.name} was voted out by majority!
            </div>

            <div className="my-2">
              {eliminated.wasImposter ? (
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-500/30 text-rose-300 border border-rose-500/50 text-sm font-extrabold tracking-wide uppercase">
                  <span>🎯 THEY WERE THE IMPOSTER!</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-sm font-extrabold tracking-wide uppercase">
                  <span>😱 THEY WERE AN INNOCENT CIVILIAN!</span>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-300 mt-1 max-w-xs font-medium">
              {eliminated.wasImposter
                ? 'The civilians caught the imposter! Civilians win immediately!'
                : 'The game ends immediately! The imposter fooled the civilians and wins.'}
            </p>

            {/* REVEAL OF THE ORIGINAL IMPOSTER */}
            {!eliminated.wasImposter && originalImposters.length > 0 && (
              <div className="w-full bg-slate-950/90 border border-rose-500/40 rounded-2xl p-4 mt-4 text-left">
                <div className="text-[11px] font-black uppercase tracking-wider text-rose-400 mb-2.5 flex items-center gap-1.5">
                  <span>😈 THE ORIGINAL IMPOSTER WAS:</span>
                </div>
                {originalImposters.map((imp) => (
                  <div key={imp.id} className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${imp.color} flex items-center justify-center text-2xl shrink-0 shadow-lg`}
                    >
                      {imp.avatar}
                    </div>
                    <div className="min-w-0">
                      <div className="font-black text-slate-100 text-base flex items-center gap-2">
                        <span>{imp.name}</span>
                        <span className="text-[10px] font-black uppercase text-rose-400 bg-rose-500/20 px-1.5 py-0.5 rounded">
                          Imposter
                        </span>
                      </div>
                      <div className="text-xs text-rose-300/90 mt-0.5">
                        Secret hint they had: <span className="italic font-semibold text-amber-200">"{imp.hint || gameState.myHint}"</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Secret Word Reveal if Civilian Eliminated */}
            {!eliminated.wasImposter && gameState.revealedWord && (
              <div className="w-full bg-cyan-950/30 border border-cyan-500/30 rounded-2xl p-3 mt-3 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-0.5">
                  The Secret Common Word Was:
                </span>
                <span className="text-2xl font-black tracking-wide text-cyan-200">
                  {gameState.revealedWord}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-3">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-1">Tie Vote / No Majority</h3>
            <p className="text-xs text-slate-400 max-w-xs">
              Votes were tied or skipped! Nobody reached majority so another round will decide.
            </p>
          </div>
        )}
      </div>

      {/* Vote Breakdown */}
      <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-4 mb-6 text-left">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 text-center">
          Vote Tally Breakdown
        </h4>
        <div className="space-y-2">
          {players.map((player) => (
            <div
              key={player.id}
              className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50"
            >
              <div className="flex items-center gap-2">
                <span>{player.avatar}</span>
                <span className="font-semibold text-slate-200">{player.name}</span>
                {player.role === 'IMPOSTER' && eliminated && (
                  <span className="text-[9px] font-bold uppercase text-rose-400 bg-rose-500/20 px-1 py-0.5 rounded">
                    Imposter
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-amber-400">
                  {player.votesReceived} {player.votesReceived === 1 ? 'vote' : 'votes'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advance Button */}
      <div className="w-full max-w-md">
        {isHost ? (
          <button
            onClick={onProceed}
            className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 text-white font-black rounded-2xl shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>
              {eliminated && !eliminated.wasImposter
                ? `Game Over • View Final Screen (${timeLeft}s)`
                : `Proceed (${timeLeft}s)`}
            </span>
            <ArrowRight className="w-5 h-5" />
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
