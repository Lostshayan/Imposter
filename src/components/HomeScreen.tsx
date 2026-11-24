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
    <div className="min-h-screen bg-[#0c1017] text-slate-100 flex flex-col items-center justify-center p-4 relative selection:bg-rose-500/30">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        {/* Sleek Brand Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-rose-500 shadow-md mb-3.5">
            <Fingerprint className="w-7 h-7 stroke-[2.2]" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">
            Social Deduction
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
            THE IMPOSTER
          </h1>
          <p className="text-slate-400 text-xs mt-1.5 max-w-xs leading-relaxed">
            One player has a vague hint instead of the word. Give subtle clues, identify the bluffer, and vote.
          </p>
        </div>

        {errorMsg && (
          <div className="w-full mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs text-center flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Player Profile Card */}
        <div className="w-full bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-sm backdrop-blur-md mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Your Player Identity
            </label>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <PlayerAvatar
              avatar={selectedGlyph}
              color={selectedColor}
              name={playerName}
              size="lg"
            />
            <input
              type="text"
              placeholder="Enter your nickname"
              value={name}
              maxLength={15}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500/60 focus:ring-1 focus:ring-rose-500/40 font-medium transition-colors"
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
                    className={`h-9 rounded-lg flex items-center justify-center transition-all ${
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
                    className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${theme.bg} border transition-all ${
                      isSelected
                        ? 'scale-110 ring-2 ring-white border-transparent shadow-sm'
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
          <div className="w-full flex flex-col gap-2.5">
            <button
              onClick={handleCreate}
              className="w-full py-3 px-5 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm rounded-xl shadow-sm flex items-center justify-center gap-2 transition-colors active:scale-[0.99]"
            >
              <Plus className="w-4 h-4" />
              <span>Create Room (Host)</span>
            </button>

            <button
              onClick={() => setMode('JOIN')}
              className="w-full py-3 px-5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors active:scale-[0.99]"
            >
              <Users className="w-4 h-4 text-slate-400" />
              <span>Join with Room Code</span>
            </button>

            <button
              onClick={handleSolo}
              className="w-full py-2.5 px-5 bg-slate-900/60 hover:bg-slate-850 border border-slate-800/80 text-emerald-400 hover:text-emerald-300 font-medium text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Bot className="w-4 h-4" />
              <span>Solo Play with AI Companions</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleJoin} className="w-full flex flex-col gap-3">
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
                Enter Room Code
              </label>
              <input
                type="text"
                maxLength={4}
                autoFocus
                placeholder="ABCD"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-center text-3xl font-mono font-bold tracking-widest text-slate-100 uppercase focus:outline-none focus:border-rose-500/60"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMode('MAIN')}
                className="w-1/3 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-medium text-xs rounded-xl transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!roomCode.trim()}
                className="w-2/3 py-2.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white font-semibold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Join Game</span>
              </button>
            </div>
          </form>
        )}

        {/* How to Play Link */}
        <button
          onClick={() => setShowRules(true)}
          className="mt-6 flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>How to play</span>
        </button>

        {/* Rules Modal */}
        {showRules && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-xl relative animate-fade-in">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Fingerprint className="w-5 h-5 text-rose-400" />
                  <h3 className="font-bold text-slate-100 text-base">How to Play</h3>
                </div>
                <button
                  onClick={() => setShowRules(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3.5 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="font-bold text-slate-100 block mb-0.5">1. Roles & The Secret Word</span>
                  <span className="text-slate-400">
                    Civilians receive the exact secret word (e.g. <b>"Espresso"</b>). The secret Imposter only receives a simple category hint (e.g. <b>"Strong Coffee"</b>).
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="font-bold text-slate-100 block mb-0.5">2. Turn-Based Clue Submission</span>
                  <span className="text-slate-400">
                    Players take turns submitting a unique 1 to 3 word clue. Civilians give subtle clues that verify they know the word without giving it away. The imposter bluffs!
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <span className="font-bold text-slate-100 block mb-0.5">3. Discussion & Voting</span>
                  <span className="text-slate-400">
                    Review all clues, analyze who gave a vague non-answer, and vote. If the Imposter is voted out, Civilians win! If an innocent Civilian is eliminated, the Imposter wins.
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowRules(false)}
                className="mt-5 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
