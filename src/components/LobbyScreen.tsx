'use client';

import React, { useState } from 'react';
import {
  Copy,
  Check,
  Crown,
  Bot,
  Play,
  X,
  AlertCircle,
  Plus,
  Zap,
  Tag,
  Trophy,
  RotateCcw,
  Clapperboard,
  BookOpen,
  Award,
  Utensils,
  Compass,
  Globe,
  Gamepad2,
  Music,
  Smartphone,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ClientGameState, GameSettings } from '../types/game';
import { CATEGORIES_LIST, ALL_CATEGORY_NAMES } from '../lib/wordBank';
import { Leaderboard } from './Leaderboard';
import { PlayerAvatar } from './PlayerAvatar';

interface LobbyScreenProps {
  gameState: ClientGameState;
  onAddBot: () => void;
  onRemoveBot: (botId: string) => void;
  onUpdateSettings: (settings: Partial<GameSettings>) => void;
  onStartGame: () => void;
  onResetScores?: () => void;
  errorMsg: string | null;
}

function CategoryIcon({ iconKey }: { iconKey: string }) {
  const iconProps = { className: 'w-3.5 h-3.5' };
  switch (iconKey) {
    case 'film':
      return <Clapperboard {...iconProps} className="w-3.5 h-3.5 text-amber-400" />;
    case 'book':
      return <BookOpen {...iconProps} className="w-3.5 h-3.5 text-indigo-400" />;
    case 'sparkles':
      return <Award {...iconProps} className="w-3.5 h-3.5 text-yellow-400" />;
    case 'utensils':
      return <Utensils {...iconProps} className="w-3.5 h-3.5 text-orange-400" />;
    case 'compass':
      return <Compass {...iconProps} className="w-3.5 h-3.5 text-emerald-400" />;
    case 'globe':
      return <Globe {...iconProps} className="w-3.5 h-3.5 text-cyan-400" />;
    case 'gamepad':
      return <Gamepad2 {...iconProps} className="w-3.5 h-3.5 text-purple-400" />;
    case 'music':
      return <Music {...iconProps} className="w-3.5 h-3.5 text-rose-400" />;
    case 'trophy':
      return <Trophy {...iconProps} className="w-3.5 h-3.5 text-teal-400" />;
    case 'smartphone':
      return <Smartphone {...iconProps} className="w-3.5 h-3.5 text-blue-400" />;
    default:
      return <Tag {...iconProps} className="w-3.5 h-3.5 text-slate-400" />;
  }
}

export function LobbyScreen({
  gameState,
  onAddBot,
  onRemoveBot,
  onUpdateSettings,
  onStartGame,
  onResetScores,
  errorMsg,
}: LobbyScreenProps) {
  const [copied, setCopied] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showStandings, setShowStandings] = useState(false);

  const isHost = gameState.myPlayer?.isHost ?? false;
  const playerCount = gameState.players.length;
  const canStart = playerCount >= 3;
  const botsCount = gameState.players.filter((p) => p.isBot).length;
  const hasScores = gameState.players.some((p) => (p.score || 0) > 0);

  const enabledCategories = gameState.settings.enabledCategories || ALL_CATEGORY_NAMES;

  const copyCode = () => {
    navigator.clipboard.writeText(gameState.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addBotsToMin = () => {
    const needed = Math.max(0, 4 - playerCount);
    for (let i = 0; i < needed; i++) {
      setTimeout(() => onAddBot(), i * 180);
    }
  };

  const toggleCategory = (catName: string) => {
    if (!isHost) return;
    let next: string[];
    if (enabledCategories.includes(catName)) {
      if (enabledCategories.length <= 1) return; // Keep at least 1 category
      next = enabledCategories.filter((c) => c !== catName);
    } else {
      next = [...enabledCategories, catName];
    }
    onUpdateSettings({ enabledCategories: next });
  };

  const selectAllCategories = () => {
    if (!isHost) return;
    onUpdateSettings({ enabledCategories: [...ALL_CATEGORY_NAMES] });
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center">
      {/* 1. Compact Room Code Banner */}
      <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-sm mb-3">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
            Room Code
          </span>
          <span className="text-2xl sm:text-3xl font-mono font-bold tracking-wider text-slate-100">
            {gameState.code}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyCode}
            title="Copy room code"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-750 border border-slate-700/80 rounded-xl text-xs font-semibold text-slate-200 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="w-full mb-3 p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs text-center flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 2. Players Card with Inline Bot Controls */}
      <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm mb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200 text-xs uppercase tracking-wider">
              Players ({playerCount} / 12)
            </span>
            {botsCount > 0 && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                {botsCount} Bot{botsCount > 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Quick Host Actions: Add Bot & Fill */}
          {isHost && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onAddBot}
                disabled={playerCount >= 12}
                className="py-1 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs border border-slate-700 flex items-center gap-1 transition-colors disabled:opacity-40"
              >
                <Plus className="w-3 h-3" />
                <span>Bot</span>
              </button>

              {playerCount < 4 && (
                <button
                  type="button"
                  onClick={addBotsToMin}
                  className="py-1 px-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center gap-1 transition-colors"
                  title="Adds enough bots to start immediately"
                >
                  <Zap className="w-3 h-3" />
                  <span>Fill to 4</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Players Grid - 1 column on mobile, 2 columns on tablet/desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {gameState.players.map((player) => (
            <div
              key={player.id}
              className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-2.5 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <PlayerAvatar
                  avatar={player.avatar}
                  color={player.color}
                  name={player.name}
                  size="sm"
                />

                <div className="min-w-0">
                  <div className="font-semibold text-xs text-slate-200 truncate flex items-center gap-1">
                    <span className="truncate">{player.name}</span>
                    {player.id === gameState.myPlayer?.id && (
                      <span className="text-[9px] text-rose-400 font-bold">(You)</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {player.isHost && (
                      <span className="flex items-center gap-0.5 text-[9px] font-semibold text-amber-400">
                        <Crown className="w-2.5 h-2.5" /> Host
                      </span>
                    )}
                    {player.isBot && (
                      <span className="flex items-center gap-0.5 text-[9px] font-medium text-slate-400">
                        <Bot className="w-2.5 h-2.5" /> Bot
                      </span>
                    )}
                    <span className="text-[9px] font-bold text-slate-400 font-mono">
                      {player.score || 0} pts
                    </span>
                  </div>
                </div>
              </div>

              {/* Host remove bot button */}
              {isHost && player.isBot && (
                <button
                  type="button"
                  onClick={() => onRemoveBot(player.id)}
                  title="Remove bot"
                  className="p-1 rounded-md text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
        </div>

        {!canStart && (
          <div className="mt-2.5 p-2 bg-slate-950/60 border border-slate-800/80 rounded-xl text-slate-400 text-xs text-center">
            Need at least <b className="text-slate-200">3 players</b> to start.{' '}
            {isHost && (
              <span>
                Click <b className="text-indigo-400">"Fill to 4"</b> to play right away.
              </span>
            )}
          </div>
        )}
      </div>

      {/* 3. Word Categories Section (Clean & Collapsible) */}
      <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 shadow-sm mb-3">
        <div
          onClick={() => setShowCategories(!showCategories)}
          className="flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Word Categories
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-800 text-slate-300 rounded-md border border-slate-700">
              {enabledCategories.length} Active
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">
              {showCategories ? 'Hide' : 'Customize'}
            </span>
            {showCategories ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
          </div>
        </div>

        {showCategories && (
          <div className="mt-3 pt-3 border-t border-slate-800 animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-slate-400">
                {isHost ? 'Toggle topics for this room:' : 'Active topics:'}
              </span>
              {isHost && (
                <button
                  type="button"
                  onClick={selectAllCategories}
                  className="text-[11px] font-medium text-rose-400 hover:text-rose-300 transition-colors"
                >
                  Select All
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {CATEGORIES_LIST.map((cat) => {
                const isEnabled = enabledCategories.includes(cat.name);
                return (
                  <button
                    key={cat.name}
                    type="button"
                    disabled={!isHost}
                    onClick={() => toggleCategory(cat.name)}
                    className={`p-2 rounded-lg border text-left transition-all flex items-center justify-between gap-1.5 ${
                      isEnabled
                        ? 'bg-slate-800/80 border-slate-700 hover:border-slate-600'
                        : 'bg-slate-950/30 border-slate-800/60 opacity-40'
                    } ${isHost ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <CategoryIcon iconKey={cat.iconKey} />
                      <span className="font-semibold text-xs text-slate-200 truncate">
                        {cat.name}
                      </span>
                    </div>

                    {isHost && (
                      <div
                        className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                          isEnabled
                            ? 'bg-rose-600 border-rose-500 text-white'
                            : 'border-slate-700 bg-slate-900 text-transparent'
                        }`}
                      >
                        {isEnabled && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 4. Tournament Standings Accordion (If scores exist) */}
      {hasScores && (
        <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 shadow-sm mb-3">
          <div
            onClick={() => setShowStandings(!showStandings)}
            className="flex items-center justify-between cursor-pointer select-none"
          >
            <div className="flex items-center gap-2">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Tournament Standings
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400">
                {showStandings ? 'Hide' : 'View Scores'}
              </span>
              {showStandings ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
            </div>
          </div>

          {showStandings && (
            <div className="mt-3 pt-3 border-t border-slate-800 animate-fade-in">
              <Leaderboard
                players={gameState.players}
                myPlayerId={gameState.myPlayer?.id}
                showRecentGain={false}
                title="Tournament Standings"
                subtitle="Cumulative points across games played in this room"
              />
              {isHost && onResetScores && (
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Reset all tournament scores to 0 for this room?')) {
                        onResetScores();
                      }
                    }}
                    className="text-[10px] text-slate-500 hover:text-rose-400 flex items-center gap-1 transition-colors px-2 py-0.5 rounded hover:bg-slate-800"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Tournament Scores</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 5. Start Game Button */}
      <div className="w-full">
        {isHost ? (
          <button
            onClick={onStartGame}
            disabled={!canStart}
            className="w-full py-3.5 px-6 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl border border-rose-500 shadow-md shadow-rose-900/20 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Game ({playerCount} Players)</span>
          </button>
        ) : (
          <div className="w-full py-3 px-6 bg-slate-900/80 border border-slate-800 rounded-xl text-center text-slate-400 text-xs font-medium flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" />
            <span>Waiting for Host to start the game...</span>
          </div>
        )}
      </div>

      {/* Settings Modal (Timers) */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 max-w-sm w-full shadow-xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                <span>Round Timer Settings</span>
              </h3>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-slate-400 hover:text-slate-200 p-1 rounded-md hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Clue Submission Time
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[30, 45, 60].map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => onUpdateSettings({ clueTime: sec })}
                      className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                        gameState.settings.clueTime === sec
                          ? 'bg-rose-600 border-rose-500 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                      }`}
                    >
                      {sec}s
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Voting Time
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[20, 30, 45].map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => onUpdateSettings({ voteTime: sec })}
                      className={`py-2 rounded-xl text-xs font-bold border transition-colors ${
                        gameState.settings.voteTime === sec
                          ? 'bg-rose-600 border-rose-500 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                      }`}
                    >
                      {sec}s
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5">
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
