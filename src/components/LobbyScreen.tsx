'use client';

import React, { useState } from 'react';
import {
  Copy,
  Check,
  Crown,
  Bot,
  UserPlus,
  Play,
  Settings,
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
  const iconProps = { className: 'w-4 h-4' };
  switch (iconKey) {
    case 'film':
      return <Clapperboard {...iconProps} className="w-4 h-4 text-amber-400" />;
    case 'book':
      return <BookOpen {...iconProps} className="w-4 h-4 text-indigo-400" />;
    case 'sparkles':
      return <Award {...iconProps} className="w-4 h-4 text-yellow-400" />;
    case 'utensils':
      return <Utensils {...iconProps} className="w-4 h-4 text-orange-400" />;
    case 'compass':
      return <Compass {...iconProps} className="w-4 h-4 text-emerald-400" />;
    case 'globe':
      return <Globe {...iconProps} className="w-4 h-4 text-cyan-400" />;
    case 'gamepad':
      return <Gamepad2 {...iconProps} className="w-4 h-4 text-purple-400" />;
    case 'music':
      return <Music {...iconProps} className="w-4 h-4 text-rose-400" />;
    case 'trophy':
      return <Trophy {...iconProps} className="w-4 h-4 text-teal-400" />;
    case 'smartphone':
      return <Smartphone {...iconProps} className="w-4 h-4 text-blue-400" />;
    default:
      return <Tag {...iconProps} className="w-4 h-4 text-slate-400" />;
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

  const isHost = gameState.myPlayer?.isHost ?? false;
  const playerCount = gameState.players.length;
  const canStart = playerCount >= 3;
  const botsCount = gameState.players.filter((p) => p.isBot).length;

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
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* Room Code Card */}
      <div className="w-full bg-slate-900/70 border border-slate-800 rounded-2xl p-5 text-center shadow-sm backdrop-blur-md mb-4">
        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block mb-1">
          Room Code
        </span>
        <div className="flex items-center justify-center gap-3 my-1">
          <span className="text-4xl sm:text-5xl font-mono font-bold tracking-widest text-slate-100">
            {gameState.code}
          </span>
          <button
            onClick={copyCode}
            title="Copy room code"
            className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700/80 rounded-xl text-slate-300 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">
          Share this code with players to join from their phone or browser.
        </p>
      </div>

      {errorMsg && (
        <div className="w-full mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs text-center flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* AI Companions Section */}
      {isHost && (
        <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-4 shadow-sm mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-200 text-xs sm:text-sm">
                  Add AI Bots
                </h3>
                <p className="text-[11px] text-slate-400">
                  Play solo or fill empty spots with human-like bots.
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={onAddBot}
                disabled={playerCount >= 12}
                className="py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs border border-slate-700 flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add 1 Bot</span>
              </button>

              {playerCount < 4 && (
                <button
                  type="button"
                  onClick={addBotsToMin}
                  className="py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
                  title="Fills the room with enough bots so you can start right now"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Fill to 4</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Word Categories Section */}
      <div className="w-full bg-slate-900/70 border border-slate-800 rounded-2xl p-4 shadow-sm mb-4">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Secret Word Categories
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-800 text-slate-300 rounded-md border border-slate-700">
              {enabledCategories.length} Active
            </span>
          </div>

          {isHost && (
            <button
              type="button"
              onClick={selectAllCategories}
              className="text-[11px] font-medium text-slate-400 hover:text-slate-200 transition-colors"
            >
              Select All
            </button>
          )}
        </div>

        <p className="text-[11px] text-slate-400 mb-2.5">
          {isHost
            ? 'Choose which topics will appear in this room:'
            : 'Categories active for this room:'}
        </p>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
          {CATEGORIES_LIST.map((cat) => {
            const isEnabled = enabledCategories.includes(cat.name);
            return (
              <button
                key={cat.name}
                type="button"
                disabled={!isHost}
                onClick={() => toggleCategory(cat.name)}
                className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between gap-2 ${
                  isEnabled
                    ? 'bg-slate-850 border-slate-700 hover:border-slate-600'
                    : 'bg-slate-950/40 border-slate-800/60 opacity-40'
                } ${isHost ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="p-1 rounded-md bg-slate-800/80 shrink-0">
                    <CategoryIcon iconKey={cat.iconKey} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-xs text-slate-200 truncate">
                      {cat.name}
                    </div>
                  </div>
                </div>

                {isHost && (
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                      isEnabled
                        ? 'bg-rose-600 border-rose-500 text-white'
                        : 'border-slate-700 bg-slate-900 text-transparent'
                    }`}
                  >
                    {isEnabled && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Players Section */}
      <div className="w-full bg-slate-900/70 border border-slate-800 rounded-2xl p-4 shadow-sm mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200 text-xs sm:text-sm uppercase tracking-wider">
              Players ({playerCount} / 12)
            </span>
            {botsCount > 0 && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                {botsCount} {botsCount === 1 ? 'Bot' : 'Bots'}
              </span>
            )}
          </div>

          {isHost && (
            <button
              onClick={() => setShowSettingsModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-xs font-medium text-slate-300 transition-colors border border-slate-700"
            >
              <SlidersHorizontal className="w-3 h-3 text-slate-400" />
              <span>Timers</span>
            </button>
          )}
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {gameState.players.map((player) => (
            <div
              key={player.id}
              className="bg-slate-950/60 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2 min-w-0">
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
                      {player.score || 0} {(player.score || 0) === 1 ? 'pt' : 'pts'}
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
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}

          {/* Interactive "Add AI Bot" Button */}
          {isHost && playerCount < 12 && (
            <button
              type="button"
              onClick={onAddBot}
              className="border border-dashed border-slate-700 hover:border-slate-600 bg-slate-950/30 hover:bg-slate-900/50 rounded-xl p-2.5 flex items-center justify-center gap-1.5 text-slate-400 hover:text-slate-200 transition-all text-xs font-medium"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Bot</span>
            </button>
          )}
        </div>

        {!canStart && (
          <div className="mt-3 p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 text-xs text-center">
            Need at least <b className="text-slate-200">3 players</b> to start.{' '}
            {isHost && (
              <span>
                Click <b className="text-slate-200">"Add 1 Bot"</b> or <b className="text-slate-200">"Fill to 4"</b> above to play right away.
              </span>
            )}
          </div>
        )}
      </div>

      {/* Tournament Standings in Lobby */}
      {gameState.players.some((p) => (p.score || 0) > 0) && (
        <div className="w-full mb-4">
          <Leaderboard
            players={gameState.players}
            myPlayerId={gameState.myPlayer?.id}
            showRecentGain={false}
            title="Tournament Standings"
            subtitle="Cumulative points across games played in this room"
          />
          {isHost && onResetScores && (
            <div className="flex justify-end mt-1.5">
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

      {/* Start Button / Waiting Banner */}
      <div className="w-full">
        {isHost ? (
          <button
            onClick={onStartGame}
            disabled={!canStart}
            className="w-full py-3.5 px-6 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl shadow-sm flex items-center justify-center gap-2 transition-colors active:scale-[0.99]"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Game ({playerCount} Players)</span>
          </button>
        ) : (
          <div className="w-full py-3 px-6 bg-slate-900 border border-slate-800 rounded-xl text-center text-slate-400 text-xs font-medium flex items-center justify-center gap-2">
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
              {/* Clue Time */}
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
                      className={`py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                        gameState.settings.clueTime === sec
                          ? 'bg-rose-600 border-rose-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {sec}s
                    </button>
                  ))}
                </div>
              </div>

              {/* Vote Time */}
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
                      className={`py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                        gameState.settings.voteTime === sec
                          ? 'bg-rose-600 border-rose-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {sec}s
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowSettingsModal(false)}
              className="mt-5 w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded-xl transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
