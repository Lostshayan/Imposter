'use client';

import React, { useState } from 'react';
import { Trophy, TrendingUp, HelpCircle, ChevronDown, ChevronUp, Crown, ShieldCheck, Fingerprint } from 'lucide-react';
import { ClientPlayer } from '../types/game';
import { PlayerAvatar } from './PlayerAvatar';

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
  title = 'Tournament Standings',
  subtitle = 'Cumulative score across all games in this room',
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
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/40 text-amber-300 font-extrabold text-xs flex items-center justify-center gap-0.5 shadow-sm">
            <Crown className="w-3 h-3 text-amber-400" />
            <span>1</span>
          </div>
        );
      case 2:
        return (
          <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-600/50 text-slate-200 font-extrabold text-xs flex items-center justify-center">
            <span>2</span>
          </div>
        );
      case 3:
        return (
          <div className="w-8 h-8 rounded-lg bg-orange-950/30 border border-orange-600/40 text-orange-300 font-extrabold text-xs flex items-center justify-center">
            <span>3</span>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 font-bold text-xs flex items-center justify-center">
            <span>{rank}</span>
          </div>
        );
    }
  };

  return (
    <div className="w-full bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-sm text-left backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <span>{title}</span>
            </h3>
            <p className="text-[11px] text-slate-400">{subtitle}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowRules(!showRules)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-slate-100 text-xs font-medium transition-colors border border-slate-700/70"
          title="Point rules"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Scoring Rules</span>
          {showRules ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* Rules Explainer Dropdown */}
      {showRules && (
        <div className="mb-4 p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-2 text-slate-300 animate-fadeIn">
          <div className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">
            Points System:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="font-bold text-emerald-400 flex items-center gap-1 mb-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Civilians Catch Imposter
              </span>
              <span className="text-slate-400">
                • <b className="text-slate-200">+1 point</b> to each Civilian
                <br />• <b className="text-slate-400">0 points</b> to the Imposter
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="font-bold text-rose-400 flex items-center gap-1 mb-1">
                <Fingerprint className="w-3.5 h-3.5" /> Imposter Wins
              </span>
              <span className="text-slate-400">
                • <b className="text-slate-200">+1 point</b> to the Imposter
                <br />• <b className="text-slate-400">0 points</b> to the Civilians
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard List */}
      <div className="space-y-1.5">
        {sortedPlayers.map((player, index) => {
          const rank = index + 1;
          const isMe = player.id === myPlayerId;
          const hasGain = showRecentGain && player.lastScoreGain !== undefined && player.lastScoreGain > 0;

          return (
            <div
              key={player.id}
              className={`p-2.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                isMe
                  ? 'bg-slate-850 border-rose-500/40 ring-1 ring-rose-500/20'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700/80'
              }`}
            >
              {/* Left: Rank & Avatar & Name */}
              <div className="flex items-center gap-3 min-w-0">
                {getRankBadge(rank)}

                <PlayerAvatar
                  avatar={player.avatar}
                  color={player.color}
                  name={player.name}
                  size="sm"
                />

                <div className="min-w-0">
                  <div className="font-semibold text-xs sm:text-sm text-slate-100 truncate flex items-center gap-1.5">
                    <span className="truncate">{player.name}</span>
                    {isMe && (
                      <span className="text-[9px] text-rose-400 font-bold bg-rose-500/10 px-1.5 py-0.2 rounded border border-rose-500/20">
                        YOU
                      </span>
                    )}
                    {player.isBot && (
                      <span className="text-[9px] text-slate-400 font-medium bg-slate-800 px-1 py-0.2 rounded border border-slate-700">
                        BOT
                      </span>
                    )}
                  </div>

                  {player.role && (
                    <div className="flex items-center gap-1 mt-0.5">
                      {player.role === 'IMPOSTER' ? (
                        <span className="text-[9px] font-bold uppercase text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20">
                          Imposter
                        </span>
                      ) : (
                        <span className="text-[9px] font-medium uppercase text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                          Civilian
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Round Gain + Total Score */}
              <div className="flex items-center gap-2 shrink-0 text-right">
                {showRecentGain && player.lastScoreGain !== undefined && (
                  <div
                    className={`flex items-center gap-0.5 px-2 py-0.5 rounded-lg text-xs font-bold ${
                      hasGain
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'text-slate-500 text-[11px]'
                    }`}
                  >
                    {hasGain ? (
                      <>
                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                        <span>+{player.lastScoreGain}</span>
                      </>
                    ) : (
                      <span>+0</span>
                    )}
                  </div>
                )}

                <div className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 min-w-[64px] text-right">
                  <span className="text-sm font-bold font-mono text-slate-100">
                    {player.score || 0}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400 ml-1">
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
