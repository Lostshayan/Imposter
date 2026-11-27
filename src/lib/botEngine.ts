import { Player, GameWord, RoundClueRecord } from '../types/game';

export interface BotPersona {
  name: string;
  avatar: string;
  color: string;
  personality: 'analytical' | 'bold' | 'sneaky' | 'poetic' | 'casual';
}

export const BOT_ROSTER: BotPersona[] = [
  { name: 'Alex', avatar: 'target', color: 'from-amber-600/80 to-amber-700/80', personality: 'analytical' },
  { name: 'Maya', avatar: 'sparkles', color: 'from-rose-600/80 to-pink-700/80', personality: 'casual' },
  { name: 'Leo', avatar: 'flame', color: 'from-orange-600/80 to-red-700/80', personality: 'bold' },
  { name: 'Sam', avatar: 'ghost', color: 'from-emerald-600/80 to-teal-700/80', personality: 'sneaky' },
  { name: 'Zoe', avatar: 'gem', color: 'from-indigo-600/80 to-violet-700/80', personality: 'poetic' },
  { name: 'Max', avatar: 'zap', color: 'from-blue-600/80 to-cyan-700/80', personality: 'analytical' },
];

export function createBotPlayer(existingBotsCount: number): Player {
  const persona = BOT_ROSTER[existingBotsCount % BOT_ROSTER.length];
  const uniqueSuffix =
    existingBotsCount >= BOT_ROSTER.length
      ? ` ${Math.floor(existingBotsCount / BOT_ROSTER.length) + 1}`
      : '';

  return {
    id: `bot_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: `${persona.name}${uniqueSuffix} (Bot)`,
    avatar: persona.avatar,
    color: persona.color,
    isHost: false,
    isBot: true,
    isAlive: true,
    score: 0,
    role: null,
    clue: null,
    hasSubmittedClue: false,
    votedFor: null,
    votesReceived: 0,
  };
}

function getBotPersonality(botName: string): BotPersona['personality'] {
  const found = BOT_ROSTER.find((b) => botName.startsWith(b.name));
  return found?.personality || 'casual';
}

// Short, natural 1-2 word casual bluffs real people type in party games
const GENERIC_HUMAN_BLUFFS = [
  'classic',
  'iconic',
  'popular',
  'favorite',
  'nostalgic',
  'famous',
  'legendary',
  'timeless',
  'solid',
  'big deal',
  'everyone knows',
  'overrated',
  'top tier',
  'childhood',
  'vibes',
  'essential',
  'memorable',
  'huge',
];

// Contextual 1-2 word bluffs derived from the vague category hint
function getHintBasedBluffs(hint: string): string[] {
  const lower = hint.toLowerCase();
  const bluffs: string[] = [];

  if (lower.includes('dish') || lower.includes('food') || lower.includes('coffee') || lower.includes('snack') || lower.includes('dessert') || lower.includes('pastry')) {
    bluffs.push('comfort food', 'late night', 'craving', 'savory', 'warm', 'dinner', 'tasty', 'homemade');
  }
  if (lower.includes('movie') || lower.includes('heist') || lower.includes('battles') || lower.includes('team') || lower.includes('virtual')) {
    bluffs.push('blockbuster', 'theater', 'popcorn', 'sequel', 'cinema', 'action', 'big screen');
  }
  if (lower.includes('detective') || lower.includes('wizard') || lower.includes('lovers') || lower.includes('monster') || lower.includes('quest') || lower.includes('wonderland')) {
    bluffs.push('bestseller', 'fantasy', 'chapter', 'fiction', 'novel', 'plot twist', 'lore');
  }
  if (lower.includes('singer') || lower.includes('scientist') || lower.includes('star') || lower.includes('painter') || lower.includes('billionaire') || lower.includes('playwright') || lower.includes('legend')) {
    bluffs.push('icon', 'genius', 'legend', 'famous', 'talent', 'household name');
  }
  if (lower.includes('animal') || lower.includes('bird') || lower.includes('lizard') || lower.includes('creature') || lower.includes('mammal')) {
    bluffs.push('wild', 'nature', 'zoo', 'wildlife', 'habitat', 'creature');
  }
  if (lower.includes('landmark') || lower.includes('monument') || lower.includes('tombs') || lower.includes('statue') || lower.includes('arena') || lower.includes('palace')) {
    bluffs.push('bucket list', 'tourist', 'vacation', 'historic', 'postcards', 'travel');
  }
  if (lower.includes('game') || lower.includes('puzzle') || lower.includes('arcade') || lower.includes('nintendo')) {
    bluffs.push('multiplayer', 'retro', 'addicting', 'arcade', 'console', 'high score');
  }
  if (lower.includes('instrument') || lower.includes('record') || lower.includes('mixer') || lower.includes('rock') || lower.includes('keyboard')) {
    bluffs.push('concert', 'melody', 'rhythm', 'acoustic', 'sound', 'band');
  }
  if (lower.includes('sport') || lower.includes('racing') || lower.includes('diving') || lower.includes('court')) {
    bluffs.push('olympics', 'stadium', 'intense', 'teamwork', 'trophy', 'fast');
  }
  if (lower.includes('phone') || lower.includes('shield') || lower.includes('wheeler') || lower.includes('viewer') || lower.includes('document')) {
    bluffs.push('everyday', 'handy', 'portable', 'modern', 'useful', 'gadget');
  }

  return bluffs;
}

/**
 * Condenses wordy clue strings into natural 1-2 word human party-game clues
 * and matches natural casing habits (mostly lowercase on phones).
 */
function formatAsHumanClue(
  rawClue: string,
  personality: BotPersona['personality'],
  existingClues: string[]
): string {
  let clue = rawClue.trim();

  // Trim overly wordy 3+ word AI-like phrases down to 2 punchy words when safe
  const words = clue.split(/\s+/);
  if (words.length >= 3) {
    // Keep 2-word core unless it starts with a proper name/number like "Platform 9 3/4"
    if (!/\d/.test(clue) && !clue.includes('and') && !clue.includes('vs')) {
      clue = words.slice(0, 2).join(' ');
    }
  }

  // Detect if existing players in the room are typing mostly lowercase
  const nonEmpty = existingClues.filter((c) => c.trim().length > 0);
  const lowercaseCount = nonEmpty.filter((c) => c === c.toLowerCase()).length;
  const roomPrefersLowercase = nonEmpty.length > 0 && lowercaseCount >= nonEmpty.length / 2;

  // Apply natural human typing style by personality
  if (roomPrefersLowercase || personality === 'casual' || personality === 'sneaky') {
    // Casual mobile typists mostly type lowercase unless it's a clear acronym
    if (clue !== clue.toUpperCase()) {
      return clue.toLowerCase();
    }
  } else if (personality === 'poetic') {
    return clue.toLowerCase();
  } else if (personality === 'bold' && Math.random() < 0.5) {
    return clue.toLowerCase();
  }

  return clue;
}

export function generateBotClue(
  bot: Player,
  currentWord: GameWord,
  existingClues: string[] = []
): string {
  const isImposter = bot.role === 'IMPOSTER';
  const personality = getBotPersonality(bot.name);
  const normalizedExisting = new Set(existingClues.map((c) => c.trim().toLowerCase()));

  if (!isImposter) {
    // ================= CIVILIAN BOT =================
    const authenticPool =
      currentWord.fakeCivClues && currentWord.fakeCivClues.length > 0
        ? currentWord.fakeCivClues
        : [currentWord.word];

    // Shuffle pool so bots don't always pick in the same order
    const shuffled = [...authenticPool].sort(() => Math.random() - 0.5);

    for (const raw of shuffled) {
      const formatted = formatAsHumanClue(raw, personality, existingClues);
      if (!normalizedExisting.has(formatted.toLowerCase()) && formatted.toLowerCase() !== currentWord.word.toLowerCase()) {
        return formatted;
      }
      // Also try raw if formatted collided
      if (!normalizedExisting.has(raw.toLowerCase()) && raw.toLowerCase() !== currentWord.word.toLowerCase()) {
        return raw.toLowerCase();
      }
    }

    const fallbacks = ['original', 'iconic', 'real deal', 'signature', 'classic'];
    for (const fb of fallbacks) {
      if (!normalizedExisting.has(fb)) return fb;
    }
    return `${currentWord.category.split(' ')[0].toLowerCase()} pick`;
  }

  // ================= IMPOSTER BOT =================
  // Combine hint-based 1-2 word bluffs + generic casual bluffs
  const hintBluffs = getHintBasedBluffs(currentWord.hint);
  const rawImposterPool = [
    ...hintBluffs,
    ...(currentWord.fakeImposterClues || []),
    ...GENERIC_HUMAN_BLUFFS,
  ];

  // Prioritize shorter 1-2 word bluffs (75% of the time) so imposter doesn't sound wordy
  const shortBluffs = rawImposterPool.filter((c) => c.trim().split(/\s+/).length <= 2);
  const pool = shortBluffs.length >= 4 ? shortBluffs : rawImposterPool;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);

  for (const raw of shuffled) {
    const formatted = formatAsHumanClue(raw, personality, existingClues);
    if (!normalizedExisting.has(formatted.toLowerCase())) {
      return formatted;
    }
  }

  const fallbacks = ['classic', 'favorite', 'solid', 'popular', 'timeless', 'legend'];
  for (const fb of fallbacks) {
    if (!normalizedExisting.has(fb)) return fb;
  }
  return 'familiar';
}

// Keywords often found in generic bluffs
const BLUFF_INDICATORS = [
  'classic',
  'iconic',
  'popular',
  'famous',
  'nostalgic',
  'vibes',
  'favorite',
  'everyone',
  'anyone',
  'solid',
  'timeless',
  'unforgettable',
  'legendary',
  'throwback',
  'essential',
  'overrated',
  'huge',
  'big deal',
  'top tier',
  'memorable',
];

export function pickBotVote(
  bot: Player,
  alivePlayers: Player[],
  clues: RoundClueRecord[],
  imposterIds: string[],
  currentWord?: GameWord | null
): string {
  const candidates = alivePlayers.filter((p) => p.id !== bot.id);
  if (candidates.length === 0) return 'SKIP';

  const isBotImposter = bot.role === 'IMPOSTER';
  const personality = getBotPersonality(bot.name);

  const clueMap = new Map<string, string>();
  clues.forEach((c) => {
    if (c.clue) clueMap.set(c.playerId, c.clue.trim());
  });

  if (isBotImposter) {
    // ==========================================
    // IMPOSTER BOT STRATEGY:
    // Blend in by voting for a civilian whose clue looks vague or generic
    // ==========================================
    const civilianCandidates = candidates.filter((p) => !imposterIds.includes(p.id));
    const targetPool = civilianCandidates.length > 0 ? civilianCandidates : candidates;

    let bestTarget = targetPool[0];
    let maxScore = -999;

    targetPool.forEach((cand) => {
      const candClue = (clueMap.get(cand.id) || '').toLowerCase();
      let score = Math.random() * 15; // Natural human variation

      if (!candClue || candClue.includes('no clue')) score += 40;
      if (candClue.split(/\s+/).length === 1) score += 12;
      if (BLUFF_INDICATORS.some((b) => candClue.includes(b))) score += 25;
      if (!cand.isBot) score += 8;

      if (score > maxScore) {
        maxScore = score;
        bestTarget = cand;
      }
    });

    return bestTarget.id;
  }

  // ==========================================
  // CIVILIAN BOT STRATEGY:
  // Balanced deduction without unfairly punishing creative human clues
  // ==========================================
  const wordTokens = currentWord
    ? [
        currentWord.word.toLowerCase(),
        ...(currentWord.fakeCivClues || []).flatMap((c) => c.toLowerCase().split(/\s+/)),
      ].filter((t) => t.length > 2)
    : [];

  const suspicionScores = new Map<string, number>();

  candidates.forEach((cand) => {
    const rawClue = clueMap.get(cand.id) || '';
    const candClue = rawClue.toLowerCase().trim();
    // Baseline suspicion + slight random human instinct jitter (-6 to +6)
    let suspicion = 30 + (Math.random() * 12 - 6);

    if (!candClue || candClue.includes('no clue') || candClue.includes('skipped')) {
      suspicion += 65;
      suspicionScores.set(cand.id, suspicion);
      return;
    }

    // 1. Direct Knowledge Check
    let authenticMatches = 0;
    wordTokens.forEach((token) => {
      if (candClue.includes(token)) {
        authenticMatches++;
      }
    });

    if (authenticMatches >= 2) {
      suspicion -= 40;
    } else if (authenticMatches === 1) {
      suspicion -= 22;
    }

    // 2. Generic Bluff Detection (only penalize if it matches generic bluff words)
    const bluffMatches = BLUFF_INDICATORS.filter((b) => candClue.includes(b)).length;
    if (bluffMatches > 0 && authenticMatches === 0) {
      suspicion += 32 + bluffMatches * 12;
    }

    // 3. Persona instincts
    if (personality === 'bold' && bluffMatches > 0) {
      suspicion += 15;
    }
    if (personality === 'analytical' && bluffMatches > 0) {
      suspicion += 12;
    }
    if (personality === 'sneaky' && (candClue.includes('everyone') || candClue.includes('popular'))) {
      suspicion += 18;
    }

    suspicionScores.set(cand.id, suspicion);
  });

  let mostSuspiciousId = candidates[0].id;
  let highestScore = -999;

  candidates.forEach((cand) => {
    const score = suspicionScores.get(cand.id) ?? 0;
    if (score > highestScore) {
      highestScore = score;
      mostSuspiciousId = cand.id;
    }
  });

  return mostSuspiciousId;
}
