'use client';

import React, { useState } from 'react';
import { Fingerprint, Play, Plus, Users, Bot, HelpCircle, X, Shield, Eye, AlertCircle } from 'lucide-react';
import { PlayerAvatar, AVATAR_GLYPHS, AvatarGlyphId } from './PlayerAvatar';

interface HomeScreenProps {
  onCreateRoom: (name: string, avatar: string, color: string) => void;
  onJoinRoom: (code: string, name: string, avatar: string, color: string) => void;
  onSoloPlay: (name: string, avatar: string, color: string) => void;
  errorMsg: string | null;
}

const COLOR_THEMES = [
  { id: 'rose', bg: 'from-rose-600 to-rose-800', border: 'border-rose-500/40' },
  { id: 'indigo', bg: 'from-indigo-600 to-indigo-800', border: 'border-indigo-500/40' },
  { id: 'emerald', bg: 'from-emerald-600 to-emerald-800', border: 'border-emerald-500/40' },
  { id: 'amber', bg: 'from-amber-600 to-amber-800', border: 'border-amber-500/40' },
  { id: 'cyan', bg: 'from-cyan-600 to-cyan-800', border: 'border-cyan-500/40' },
  { id: 'slate', bg: 'from-slate-600 to-slate-800', border: 'border-slate-500/40' },
];

export function HomeScreen({ onCreateRoom, onJoinRoom, onSoloPlay, errorMsg }: HomeScreenProps) {
  const [name, setName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [selectedGlyph, setSelectedGlyph] = useState<AvatarGlyphId>('target');
  const [selectedColor, setSelectedColor] = useState(COLOR_THEMES[0].bg);
  const [showRules, setShowRules] = useState(false);
  const [mode, setMode] = useState<'MAIN' | 'JOIN'>('MAIN');

  const playerName = name.trim() || 'Player';

  const handleCreate = () => {
    onCreateRoom(playerName, selectedGlyph, selectedColor);
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode.trim()) return;
    onJoinRoom(roomCode.trim().toUpperCase(), playerName, selectedGlyph, selectedColor);
  };

  const handleSolo = () => {
    onSoloPlay(playerName, selectedGlyph, selectedColor);
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#0c1017] text-slate-100 flex flex-col items-center justify-center p-3.5 sm:p-4 relative selection:bg-rose-500/30">
      <div className="w-full max-w-md mx-auto flex flex-col items-center py-4">
        {/* Sleek Brand Header */}
        <div className="flex flex-col items-center mb-6 sm:mb-8 text-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-rose-500 shadow-md mb-2.5 sm:mb-3.5">
            <Fingerprint className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">
            Social Deduction Party Game
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
            THE IMPOSTER
          </h1>
          <p className="text-slate-400 text-xs mt-1 max-w-xs leading-relaxed px-2">
            One player receives a vague hint instead of the word. Give subtle clues, spot the bluffs, and vote.
          </p>
        </div>

        {errorMsg && (
          <div className="w-full mb-3 sm:mb-4 p-2.5 sm:p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs text-center flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Player Profile Card */}
        <div className="w-full bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm backdrop-blur-md mb-3.5 sm:mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Your Player Identity
            </label>
          </div>

          <div className="flex items-center gap-3 mb-3.5 sm:mb-4">
            <PlayerAvatar
              avatar={selectedGlyph}
              color={selectedColor}
              name={playerName}
              size="lg"
            />
            {/* Input uses text-base to prevent iOS Safari auto-zoom */}
            <input
              type="text"
              placeholder="Enter nickname"
              value={name}
              maxLength={15}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500/60 focus:ring-1 focus:ring-rose-500/40 font-medium transition-colors"
            />
          </div>

          {/* Clean Avatar Glyphs */}
          <div className="mb-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Select Avatar Glyph
            </div>
            <div className="grid grid-cols-6 gap-1.5">
              {AVATAR_GLYPHS.map((glyph) => {
                const Icon = glyph.icon;
                const isSelected = selectedGlyph === glyph.id;
                return (
                  <button
                    key={glyph.id}
                    type="button"
                    title={glyph.label}
                    onClick={() => setSelectedGlyph(glyph.id)}
                    className={`h-10 sm:h-9 rounded-lg flex items-center justify-center transition-all active:scale-95 ${
                      isSelected
                        ? 'bg-rose-600 text-white shadow-sm ring-1 ring-rose-400'
                        : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-slate-800/60'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color theme selectors */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Select Theme Accent
            </div>
            <div className="flex items-center gap-2">
              {COLOR_THEMES.map((theme) => {
                const isSelected = selectedColor === theme.bg;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setSelectedColor(theme.bg)}
                    className={`w-8 h-8 sm:w-7 sm:h-7 rounded-lg bg-gradient-to-tr ${theme.bg} border transition-all active:scale-95 ${
                      isSelected
                        ? 'scale-105 ring-2 ring-white border-transparent shadow-sm'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        {mode === 'MAIN' ? (
          <div className="w-full flex flex-col gap-2">
            <button
              onClick={handleCreate}
              className="w-full py-3.5 px-5 bg-rose-600 hover:bg-rose-500 active:scale-[0.98] text-white font-bold text-sm rounded-xl border border-rose-500 shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Create Room (Host)</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMode('JOIN')}
                className="py-3 px-3.5 bg-slate-850 hover:bg-slate-800 active:scale-[0.98] text-slate-200 border border-slate-700 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
              >
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>Join with Code</span>
              </button>

              <button
                onClick={handleSolo}
                className="py-3 px-3.5 bg-slate-850 hover:bg-slate-800 active:scale-[0.98] text-slate-200 border border-slate-700 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all"
              >
                <Bot className="w-3.5 h-3.5 text-indigo-400" />
                <span>Play Solo (Bots)</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleJoin} className="w-full flex flex-col gap-2.5 animate-fade-in">
            <div>
              <input
                type="text"
                autoFocus
                placeholder="ENTER 4-LETTER ROOM CODE"
                value={roomCode}
                maxLength={4}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-center text-xl font-mono font-bold tracking-widest text-slate-100 placeholder-slate-600 focus:outline-none focus:border-rose-500 transition-colors uppercase"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMode('MAIN')}
                className="py-3 px-4 bg-slate-800/80 hover:bg-slate-700 active:scale-[0.98] text-slate-300 font-semibold text-xs rounded-xl transition-all"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!roomCode.trim()}
                className="py-3 px-4 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Enter Room</span>
              </button>
            </div>
          </form>
        )}

        {/* Footer How-to-Play Link */}
        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() => setShowRules(true)}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-slate-900"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>How to play</span>
          </button>
        </div>
      </div>

      {/* Rules Explainer Modal */}
      {showRules && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3.5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 max-w-sm w-full shadow-2xl max-h-[90dvh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-rose-400" />
                <span>Game Rules</span>
              </h3>
              <button
                onClick={() => setShowRules(false)}
                className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <div className="font-bold text-emerald-400 text-xs mb-1 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Civilians</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Everyone receives the same secret word. Give subtle clues proving you know the word without giving it away to the Imposter.
                </p>
              </div>

              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <div className="font-bold text-rose-400 text-xs mb-1 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>The Imposter</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  You receive only a vague 2-word category hint. Listen to others, blend in, bluff with a believable clue, and evade being voted out!
                </p>
              </div>

              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <div className="font-bold text-amber-300 text-xs mb-1">
                  Unique Clue Rule & Scoring
                </div>
                <p className="text-[11px] text-slate-400">
                  Players take turns typing clues in sequence. No duplicate clues allowed. If the Imposter is voted out, each Civilian gains 1 point. If an innocent Civilian is eliminated, the Imposter gains 1 point!
                </p>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={() => setShowRules(false)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-bold rounded-xl transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
