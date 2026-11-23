'use client';

import React, { useState } from 'react';
import { Copy, Check, Crown, Bot, UserPlus, Play, Settings, X, ShieldAlert, Sparkles, Plus, Zap } from 'lucide-react';
import { ClientGameState, GameSettings } from '../types/game';
import { CATEGORIES } from '../lib/wordBank';

interface LobbyScreenProps {
  gameState: ClientGameState;
  onAddBot: () => void;
  onRemoveBot: (botId: string) => void;
  onUpdateSettings: (settings: Partial<GameSettings>) => void;
  onStartGame: () => void;
  errorMsg: string | null;
}

export function LobbyScreen({
  gameState,
  onAddBot,
  onRemoveBot,
  onUpdateSettings,
  onStartGame,
  errorMsg,
}: LobbyScreenProps) {
  const [copied, setCopied] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const isHost = gameState.myPlayer?.isHost ?? false;
  const playerCount = gameState.players.length;
  const canStart = playerCount >= 3;
  const botsCount = gameState.players.filter((p) => p.isBot).length;

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

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* Room Code Card */}
      <div className="w-full bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-slate-800 rounded-3xl p-6 text-center shadow-2xl relative overflow-hidden mb-6">
        <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">
          Invite Friends with Room Code
        </div>
        <div className="flex items-center justify-center gap-3 my-2">
          <span className="text-5xl sm:text-6xl font-black font-mono tracking-widest bg-gradient-to-r from-amber-300 via-rose-300 to-indigo-300 bg-clip-text text-transparent">
            {gameState.code}
          </span>
          <button
            onClick={copyCode}
            title="Copy code"
            className="p-3 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-2xl text-slate-300 transition-colors"
          >
            {copied ? <Check className="w-6 h-6 text-emerald-400" /> : <Copy className="w-6 h-6" />}
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          Friends can enter this code on their phones/laptops to play together in real-time!
        </p>
      </div>

      {errorMsg && (
        <div className="w-full mb-4 p-3 bg-rose-500/15 border border-rose-500/40 rounded-xl text-rose-300 text-sm text-center flex items-center justify-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Prominent AI Bots Banner / Controls for Host */}
      {isHost && (
        <div className="w-full bg-gradient-to-r from-indigo-950/60 via-purple-950/40 to-slate-900 border border-indigo-500/30 rounded-3xl p-5 shadow-xl mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shrink-0 text-xl shadow-md">
                🤖
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-slate-100 text-base">
                    Solo or Missing Players?
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">
                    AI Companions
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Add smart AI bots who submit realistic clues and vote intelligently.
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={onAddBot}
                disabled={playerCount >= 12}
                className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 transition-all disabled:opacity-50"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>+ Add 1 AI Bot</span>
              </button>

              {playerCount < 4 && (
                <button
                  type="button"
                  onClick={addBotsToMin}
                  className="py-2.5 px-3.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/40 border border-purple-500/40 text-purple-200 font-bold text-xs flex items-center gap-1.5 transition-all"
                  title="Fills the room with enough bots so you can start right now"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  <span>Auto-Fill to 4</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Players Section */}
      <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-100 text-lg">Players in Room</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {playerCount} / 12
            </span>
            {botsCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {botsCount} {botsCount === 1 ? 'Bot' : 'Bots'}
              </span>
            )}
          </div>

          {isHost && (
            <button
              onClick={() => setShowSettingsModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors border border-slate-700"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Settings</span>
            </button>
          )}
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {gameState.players.map((player) => (
            <div
              key={player.id}
              className="bg-slate-800/70 border border-slate-700/70 rounded-2xl p-3 flex items-center justify-between gap-2 shadow-sm relative group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${player.color} flex items-center justify-center text-xl shrink-0 shadow-md`}
                >
                  {player.avatar}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm text-slate-100 truncate flex items-center gap-1">
                    <span>{player.name}</span>
                    {player.id === gameState.myPlayer?.id && (
                      <span className="text-[10px] text-indigo-400 font-bold">(You)</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    {player.isHost && (
                      <span className="flex items-center gap-0.5 text-[10px] font-semibold text-amber-400">
                        <Crown className="w-3 h-3" /> Host
                      </span>
                    )}
                    {player.isBot && (
                      <span className="flex items-center gap-0.5 text-[10px] font-semibold text-cyan-400">
                        <Bot className="w-3 h-3" /> AI Bot
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Host remove bot button */}
              {isHost && player.isBot && (
                <button
                  type="button"
                  onClick={() => onRemoveBot(player.id)}
                  title="Remove bot"
                  className="p-1 rounded-lg bg-slate-700/60 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}

          {/* Interactive "Add AI Bot" Empty Seat Card */}
          {isHost && playerCount < 12 && (
            <button
              type="button"
              onClick={onAddBot}
              className="border-2 border-dashed border-indigo-500/40 hover:border-indigo-400/80 bg-indigo-950/20 hover:bg-indigo-900/30 rounded-2xl p-3 flex items-center justify-center gap-2 text-indigo-300 hover:text-indigo-200 transition-all text-xs font-bold group"
            >
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 group-hover:scale-110 flex items-center justify-center transition-transform">
                <Plus className="w-4 h-4 text-indigo-400" />
              </div>
              <span>Add AI Player</span>
            </button>
          )}
        </div>

        {!canStart && (
          <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300/90 text-xs text-center flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
            <span>
              Need at least <b>3 players</b> to start.{' '}
              {isHost ? (
                <span>
                  Click <b className="text-white">"+ Add 1 AI Bot"</b> or <b className="text-white">"Auto-Fill to 4"</b> above to play immediately!
                </span>
              ) : (
                'Waiting for host to add players or start.'
              )}
            </span>
          </div>
        )}
      </div>

      {/* Start Button / Waiting Banner */}
      <div className="w-full">
        {isHost ? (
          <button
            onClick={onStartGame}
            disabled={!canStart}
            className="w-full py-4 px-6 bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-lg rounded-2xl shadow-xl shadow-rose-500/25 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>START GAME ({playerCount} Players)</span>
          </button>
        ) : (
          <div className="w-full py-4 px-6 bg-slate-900 border border-slate-800 rounded-2xl text-center text-slate-400 font-semibold flex items-center justify-center gap-2">
            <span className="inline-block w-2.5 h-2.5 bg-indigo-500 rounded-full animate-ping" />
            <span>Waiting for Host to start the game...</span>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-slate-100 flex items-center gap-2">
                <Settings className="w-5 h-5 text-indigo-400" />
                <span>Game Settings</span>
              </h3>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-slate-400 hover:text-slate-200 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Word Category
                </label>
                <select
                  value={gameState.settings.category}
                  onChange={(e) => onUpdateSettings({ category: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clue Time */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
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
                          ? 'bg-indigo-600 border-indigo-400 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {sec} seconds
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowSettingsModal(false)}
              className="mt-6 w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors"
            >
              Save Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
