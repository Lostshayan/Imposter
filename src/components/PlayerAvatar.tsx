'use client';

import React from 'react';
import {
  Shield,
  Eye,
  Flame,
  Zap,
  Crown,
  Ghost,
  Sparkles,
  Compass,
  Target,
  Gem,
  User,
  Feather,
  Bot,
  HelpCircle,
} from 'lucide-react';

export const AVATAR_GLYPHS = [
  { id: 'target', label: 'Target', icon: Target },
  { id: 'shield', label: 'Shield', icon: Shield },
  { id: 'eye', label: 'Eye', icon: Eye },
  { id: 'flame', label: 'Flame', icon: Flame },
  { id: 'zap', label: 'Zap', icon: Zap },
  { id: 'crown', label: 'Crown', icon: Crown },
  { id: 'ghost', label: 'Ghost', icon: Ghost },
  { id: 'compass', label: 'Compass', icon: Compass },
  { id: 'sparkles', label: 'Sparkles', icon: Sparkles },
  { id: 'gem', label: 'Gem', icon: Gem },
  { id: 'feather', label: 'Feather', icon: Feather },
  { id: 'user', label: 'User', icon: User },
] as const;

export type AvatarGlyphId = typeof AVATAR_GLYPHS[number]['id'];

interface PlayerAvatarProps {
  avatar: string;
  color?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function PlayerAvatar({
  avatar,
  color = 'from-slate-800 to-slate-900',
  name = 'Player',
  size = 'md',
  className = '',
}: PlayerAvatarProps) {
  const sizeMap = {
    xs: { box: 'w-6 h-6 rounded-md', icon: 'w-3.5 h-3.5', text: 'text-[10px]' },
    sm: { box: 'w-8 h-8 rounded-lg', icon: 'w-4 h-4', text: 'text-xs' },
    md: { box: 'w-10 h-10 rounded-xl', icon: 'w-5 h-5', text: 'text-sm' },
    lg: { box: 'w-12 h-12 rounded-xl', icon: 'w-6 h-6', text: 'text-base' },
    xl: { box: 'w-16 h-16 rounded-2xl', icon: 'w-8 h-8', text: 'text-xl' },
  };

  const { box, icon: iconSize, text } = sizeMap[size];

  // Check if avatar is one of our known glyph IDs
  const matchedGlyph = AVATAR_GLYPHS.find(
    (g) => g.id.toLowerCase() === avatar?.toLowerCase()
  );

  // If emoji or old avatar passed, map common emojis to clean icons or display fallback initial
  const emojiIconMap: Record<string, React.ElementType> = {
    '🕵️': Eye,
    '🦊': Target,
    '🐱': Sparkles,
    '🦁': Flame,
    '🐼': Ghost,
    '🦄': Gem,
    '🤖': Bot,
    '👑': Crown,
    '⚡': Zap,
    '🚀': Compass,
    '👾': Ghost,
    '🎭': Eye,
    '🐸': Shield,
  };

  const IconComponent = matchedGlyph
    ? matchedGlyph.icon
    : emojiIconMap[avatar] || null;

  return (
    <div
      className={`${box} bg-gradient-to-tr ${color} border border-white/10 flex items-center justify-center shrink-0 shadow-sm text-slate-100 font-semibold ${className}`}
    >
      {IconComponent ? (
        <IconComponent className={iconSize} />
      ) : (
        <span className={text}>{name?.charAt(0)?.toUpperCase() || 'P'}</span>
      )}
    </div>
  );
}
