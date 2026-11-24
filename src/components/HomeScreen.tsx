'use client';

import React, { useState } from 'react';
import { ShieldAlert, Play, PlusCircle, Users, Bot, HelpCircle, Sparkles } from 'lucide-react';

interface HomeScreenProps {
  onCreateRoom: (name: string, avatar: string, color: string) => void;
  onJoinRoom: (code: string, name: string, avatar: string, color: string) => void;
  onSoloPlay: (name: string, avatar: string, color: string) => void;
  errorMsg: string | null;
}

const AVATARS = ['🕵️', '🦊', '🐱', '🐼', '🦁', '🦄', '👾', '👻', '🎭', '🚀', '🐸', '👑'];

const COLOR_GRADIENTS = [
  'from-rose-500 to-pink-600',
  'from-indigo-500 to-purple-600',
  'from-blue-500 to-cyan-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-violet-500 to-fuchsia-600',
];

export function HomeScreen({ onCreateRoom, onJoinRoom, onSoloPlay, errorMsg }: HomeScreenProps) {
  const [name, setName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [selectedColor, setSelectedColor] = useState(COLOR_GRADIENTS[0]);
  const [showRules, setShowRules] = useState(false);
  const [mode, setMode] = useState<'MAIN' | 'JOIN'>('MAIN');

  const playerName = name.trim() || 'Player';

  const handleCreate = () => {
    onCreateRoom(playerName, selectedAvatar, selectedColor);
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode.trim()) return;
    onJoinRoom(roomCode.trim().toUpperCase(), playerName, selectedAvatar, selectedColor);
  };

  const handleSolo = () => {
    onSoloPlay(playerName, selectedAvatar, selectedColor);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md mx-auto relative z-10 flex flex-col items-center">
        {/* Title & Badge */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-rose-500 to-indigo-600 p-0.5 shadow-xl shadow-rose-500/20 mb-4 animate-bounce-slow">
            <div className="w-full h-full bg-slate-900 rounded-2xl flex items-center justify-center text-4xl">
              🕵️
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-rose-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
            THE IMPOSTER
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-xs">
            Everyone knows the secret word. One person only gets a hint. Can you blend in or spot the fake?
          </p>
        </div>

        {errorMsg && (
          <div className="w-full mb-4 p-3 bg-rose-500/15 border border-rose-500/40 rounded-xl text-rose-300 text-sm text-center flex items-center justify-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Profile Card */}
        <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-xl mb-4">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Choose Your Name & Avatar
          </label>

          <div className="flex items-center gap-3 mb-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${selectedColor} flex items-center justify-center text-2xl shadow-lg shrink-0`}>
              {selectedAvatar}
            </div>
            <input
              type="text"
              placeholder="Enter your nickname"
              value={name}
              maxLength={15}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>

          {/* Avatar selector */}
          <div className="grid grid-cols-6 gap-2 mb-4">
            {AVATARS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setSelectedAvatar(emoji)}
                className={`h-10 rounded-lg flex items-center justify-center text-lg transition-transform ${
                  selectedAvatar === emoji
                    ? 'bg-indigo-600 scale-110 shadow-md ring-2 ring-indigo-400'
                    : 'bg-slate-800 hover:bg-slate-700/80 hover:scale-105'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Color selector */}
          <div className="flex items-center justify-between gap-2">
            {COLOR_GRADIENTS.map((gradient) => (
              <button
                key={gradient}
                type="button"
                onClick={() => setSelectedColor(gradient)}
                className={`w-8 h-8 rounded-full bg-gradient-to-tr ${gradient} transition-transform ${
                  selectedColor === gradient ? 'scale-125 ring-2 ring-white shadow-lg' : 'opacity-70 hover:opacity-100'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        {mode === 'MAIN' ? (
          <div className="w-full flex flex-col gap-3">
            <button
              onClick={handleCreate}
              className="w-full py-3.5 px-5 bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Create New Room (Host)</span>
            </button>

            <button
              onClick={() => setMode('JOIN')}
              className="w-full py-3.5 px-5 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-200 font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <Users className="w-5 h-5 text-indigo-400" />
              <span>Join with Room Code</span>
            </button>

            <button
              onClick={handleSolo}
              className="w-full py-3 px-5 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-500/40 text-emerald-300 font-semibold rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <Bot className="w-5 h-5 text-emerald-400" />
              <span>Instant Solo Play (with AI Bots)</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleJoin} className="w-full flex flex-col gap-3">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Enter 4-Character Room Code
              </label>
              <input
                type="text"
                maxLength={4}
                autoFocus
                placeholder="e.g. WOLF"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-center text-3xl font-mono font-black tracking-widest text-amber-400 uppercase focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setMode('MAIN')}
                className="w-1/3 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!roomCode.trim()}
                className="w-2/3 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Join Game</span>
              </button>
            </div>
          </form>
        )}

        {/* How to Play Toggle */}
        <button
          onClick={() => setShowRules(true)}
          className="mt-6 flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
          <span>How does the game work?</span>
        </button>

        {/* Rules Modal */}
        {showRules && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-lg mb-4">
                <Sparkles className="w-5 h-5" />
                <span>How to Play The Imposter</span>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 font-bold text-xs">
                    1
                  </span>
                  <div>
                    <h4 className="font-semibold text-slate-100">The Secret Word & Hint</h4>
                    <p className="text-slate-400 text-xs mt-0.5">
                      Civilians get the exact secret word (e.g. <b>"Espresso"</b>). The secret Imposter only gets a vague hint (e.g. <b>"Morning Roast"</b>).
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 font-bold text-xs">
                    2
                  </span>
                  <div>
                    <h4 className="font-semibold text-slate-100">Type Your Clue</h4>
                    <p className="text-slate-400 text-xs mt-0.5">
                      Each round, everyone types in a short clue. Be clever! If you’re a civilian, don’t make it too obvious or the imposter will guess the word. If you’re the imposter, pretend you know the word!
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold text-xs">
                    3
                  </span>
                  <div>
                    <h4 className="font-semibold text-slate-100">Discuss & Vote</h4>
                    <p className="text-slate-400 text-xs mt-0.5">
                      Read all submitted clues together, debate who sounds suspicious, and vote out the suspected Imposter!
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-xs">
                    4
                  </span>
                  <div>
                    <h4 className="font-semibold text-slate-100">Instant Victory & Elimination</h4>
                    <p className="text-slate-400 text-xs mt-0.5">
                      If the majority votes out the Imposter, Civilians win immediately! But if an innocent Civilian is voted out, the Imposter wins on the spot.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowRules(false)}
                className="mt-6 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition-colors"
              >
                Got It, Let's Play!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
