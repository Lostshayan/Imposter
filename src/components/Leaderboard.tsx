'use client';

import React, { useState } from 'react';
import { Trophy, TrendingUp, Sparkles, HelpCircle, ChevronDown, ChevronUp, Award } from 'lucide-react';
import { ClientPlayer } from '../types/game';

interface LeaderboardProps {
  players: ClientPlayer[];
  myPlayerId?: string;
  showRecentGain?: boolean;
  title?: string;
  subtitle?: string;
  compact?: boolean;
}

export function Leaderboard({
  players,
  myPlayerId,
  showRecentGain = true,
  title = 'Tournament Leaderboard',
  subtitle = 'Points persist across games in this room',
  compact = false,
}: LeaderboardProps) {
  const [showRules, setShowRules] = useState(false);

  // Sort players descending by total score, then by round gain
  const sortedPlayers = [...players].sort((a, b) => {
    if ((b.score || 0) !== (a.score || 0)) {
      return (b.score || 0) - (a.score || 0);
    }
    return (b.lastScoreGain || 0) - (a.lastScoreGain || 0);
  });

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 font-black text-xs flex items-center justify-center shadow-lg shadow-amber-500/30">
            🥇
          </div>
        );
      case 2:
        return (
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-slate-300 to-slate-100 text-slate-950 font-black text-xs flex items-center justify-center shadow-md">
            🥈
          </div>
        );
      case 3:
        return (
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-700 to-amber-500 text-amber-100 font-black text-xs flex items-center justify-center shadow-md">
            🥉
          </div>
        );
      default:
        return (
          <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-400 font-bold text-xs flex items-center justify-center border border-slate-700">
            #{rank}
          </div>
        );
    }
  };

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-2xl text-left">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500/20 to-yellow-500/30 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-slate-100 text-base flex items-center gap-2">
              <span>{title}</span>
            </h3>
            <p className="text-[11px] text-slate-400">{subtitle}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowRules(!showRules)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-amber-300 text-xs font-semibold transition-colors border border-slate-700/80"
          title="How points work"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Scoring Rules</span>
          {showRules ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* Rules Explainer Dropdown */}
      {showRules && (
        <div className="mb-4 p-3.5 bg-slate-950/80 border border-indigo-500/30 rounded-2xl text-xs space-y-2 text-slate-300 animate-fadeIn">
          <div className="font-bold text-indigo-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Award className="w-4 h-4 text-indigo-400" /> Point Distribution Rules:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="font-bold text-cyan-300 block mb-0.5">🎯 Civilians Catch Imposter</span>
              <span className="text-slate-300">
                • <b className="text-emerald-400">+1 point</b> to each Civilian
                <br />• <b className="text-slate-400">0 points</b> to the Imposter
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="font-bold text-rose-300 block mb-0.5">😈 Imposter Wins</span>
              <span className="text-slate-300">
                • <b className="text-amber-300">+1 point</b> to the Imposter
                <br />• <b className="text-slate-400">0 points</b> to the Civilians
              </span>
            </div>
          </div>
          <div className="text-[10px] text-slate-400 italic">
            Points carry over game after game until you leave the room!
          </div>
        </div>
      )}

      {/* Leaderboard List */}
      <div className="space-y-2">
        {sortedPlayers.map((player, index) => {
          const rank = index + 1;
          const isTop3 = rank <= 3;
          const isMe = player.id === myPlayerId;
          const hasGain = showRecentGain && player.lastScoreGain !== undefined && player.lastScoreGain > 0;

          return (
            <div
              key={player.id}
              className={`p-2.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                isMe
                  ? 'bg-indigo-950/30 border-indigo-500/60 shadow-indigo-500/10 shadow-lg ring-1 ring-indigo-500/30'
                  : isTop3
                  ? 'bg-slate-800/80 border-slate-700/80 hover:bg-slate-850'
                  : 'bg-slate-900/60 border-slate-800/80'
              }`}
            >
              {/* Left: Rank & Avatar & Name */}
              <div className="flex items-center gap-3 min-w-0">
                {getRankBadge(rank)}

                <div
                  className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${player.color} flex items-center justify-center text-lg shrink-0 shadow-md`}
                >
                  {player.avatar}
                </div>

                <div className="min-w-0">
                  <div className="font-bold text-sm text-slate-100 truncate flex items-center gap-1.5">
                    <span className="truncate">{player.name}</span>
                    {isMe && (
                      <span className="text-[10px] text-indigo-300 font-extrabold bg-indigo-500/20 px-1.5 py-0.2 rounded border border-indigo-500/30">
                        YOU
                      </span>
                    )}
                    {player.isBot && (
                      <span className="text-[9px] text-cyan-300 font-semibold bg-cyan-500/15 px-1 py-0.2 rounded">
                        AI
                      </span>
                    )}
                  </div>

                  {player.role && (
                    <div className="flex items-center gap-1 mt-0.5">
                      {player.role === 'IMPOSTER' ? (
                        <span className="text-[9px] font-black uppercase text-rose-400 bg-rose-500/20 px-1.5 py-0.5 rounded">
                          Imposter
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold uppercase text-cyan-400 bg-cyan-500/20 px-1.5 py-0.5 rounded">
                          Civilian
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Round Gain + Total Score */}
              <div className="flex items-center gap-2.5 shrink-0 text-right">
                {showRecentGain && player.lastScoreGain !== undefined && (
                  <div
                    className={`flex items-center gap-0.5 px-2 py-1 rounded-xl text-xs font-bold ${
                      hasGain
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'text-slate-500 bg-slate-800/40 text-[11px]'
                    }`}
                  >
                    {hasGain ? (
                      <>
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                        <span>+{player.lastScoreGain}</span>
                      </>
                    ) : (
                      <span>+0</span>
                    )}
                  </div>
                )}

                <div className="bg-slate-950/70 px-3 py-1.5 rounded-xl border border-slate-800 min-w-[76px] text-right">
                  <span className="text-base font-black font-mono text-amber-300 tracking-tight">
                    {player.score || 0}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 ml-1">
                    {(player.score || 0) === 1 ? 'pt' : 'pts'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
