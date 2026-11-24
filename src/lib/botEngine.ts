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

// Casual, relatable human party-game bluffs used by human imposters
const GENERIC_HUMAN_BLUFFS = [
  'Total classic',
  'Honestly iconic',
  'Can never go wrong with it',
  'Super nostalgic',
  'Always hits the spot',
  'Crowd favorite',
  'Huge fan personally',
  'Such good vibes',
  'Major throwback',
  'Hard to beat',
  'Everyone knows this one',
  'Really popular choice',
  'Unmatched energy',
  'Always a solid pick',
  'Pretty unforgettable',
  'Instant crowd pleaser',
  'One of the best',
  'Absolute perfection',
];

// Contextual bluffs derived from common hint themes
function getHintBasedBluffs(hint: string): string[] {
  const lower = hint.toLowerCase();
  const bluffs: string[] = [];

  if (lower.includes('dish') || lower.includes('food') || lower.includes('coffee') || lower.includes('snack') || lower.includes('dessert') || lower.includes('pastry')) {
    bluffs.push('Comfort food vibes', 'Late night craving', 'Always delivers', 'Best with friends', 'Warm and savory', 'Delicious staple', 'Such good flavor');
  }
  if (lower.includes('movie') || lower.includes('heist') || lower.includes('battles') || lower.includes('team') || lower.includes('virtual')) {
    bluffs.push('Total blockbuster', 'High stakes drama', 'Intense visuals', 'Pure cinema classic', 'Big screen vibes', 'Edge of your seat');
  }
  if (lower.includes('detective') || lower.includes('wizard') || lower.includes('lovers') || lower.includes('monster') || lower.includes('quest') || lower.includes('wonderland')) {
    bluffs.push('Epic storyline', 'Legendary story', 'Unforgettable characters', 'Classic page turner', 'Deep fictional lore', 'Pure fantasy');
  }
  if (lower.includes('singer') || lower.includes('scientist') || lower.includes('star') || lower.includes('painter') || lower.includes('billionaire') || lower.includes('playwright') || lower.includes('legend')) {
    bluffs.push('Global icon', 'Huge worldwide fame', 'Legendary talent', 'Inspiring figure', 'Changed history', 'Household name');
  }
  if (lower.includes('animal') || lower.includes('bird') || lower.includes('lizard') || lower.includes('creature') || lower.includes('mammal')) {
    bluffs.push('Fascinating creature', 'Wild and free', 'Natural beauty', 'Rare wildlife sighting', 'Unique animal', 'Nature documentary star');
  }
  if (lower.includes('landmark') || lower.includes('monument') || lower.includes('tombs') || lower.includes('statue') || lower.includes('arena') || lower.includes('palace')) {
    bluffs.push('Must visit destination', 'World famous sight', 'Huge tourist crowd', 'Incredible architecture', 'Bucket list trip', 'Historic landmark');
  }
  if (lower.includes('game') || lower.includes('puzzle') || lower.includes('arcade') || lower.includes('nintendo')) {
    bluffs.push('Addictive gameplay', 'Nostalgic gaming', 'Childhood favorite', 'High score challenge', 'Pure gaming fun', 'Total classic game');
  }
  if (lower.includes('instrument') || lower.includes('record') || lower.includes('mixer') || lower.includes('rock') || lower.includes('keyboard')) {
    bluffs.push('Timeless rhythm', 'Great sound', 'Iconic melody', 'Pure acoustic vibe', 'Vintage feel', 'Musical masterpiece');
  }
  if (lower.includes('sport') || lower.includes('racing') || lower.includes('diving') || lower.includes('court')) {
    bluffs.push('High intensity', 'Fast reflexes', 'Competitive energy', 'Pure athletic focus', 'Peak performance', 'Exciting match');
  }
  if (lower.includes('phone') || lower.includes('shield') || lower.includes('wheeler') || lower.includes('viewer') || lower.includes('document')) {
    bluffs.push('Everyday essential', 'Modern staple', 'Never leave home without it', 'Daily companion', 'Super practical', 'Handy item');
  }

  return bluffs;
}

export function generateBotClue(
  bot: Player,
  currentWord: GameWord,
  existingClues: string[] = []
): string {
  const isImposter = bot.role === 'IMPOSTER';
  const normalizedExisting = new Set(existingClues.map((c) => c.trim().toLowerCase()));

  if (!isImposter) {
    // ================= CIVILIAN BOT =================
    // Pick from authentic, human party clues specific to this word
    const authenticPool = currentWord.fakeCivClues && currentWord.fakeCivClues.length > 0
      ? currentWord.fakeCivClues
      : [`Classic ${currentWord.word}`, `Known for ${currentWord.word}`];

    const available = authenticPool.filter((c) => !normalizedExisting.has(c.trim().toLowerCase()));
    if (available.length > 0) {
      return available[Math.floor(Math.random() * available.length)];
    }

    // Natural fallback variations if all pool clues used
    const prefixes = ['Definitely', 'Signature', 'Always', 'Pure', 'Real'];
    for (const prefix of prefixes) {
      const candidate = `${prefix} ${authenticPool[0] || currentWord.word}`;
      if (!normalizedExisting.has(candidate.toLowerCase())) {
        return candidate;
      }
    }

    return `${authenticPool[0]} vibes`;
  }

  // ================= IMPOSTER BOT =================
  // A human imposter only has the vague 2-word hint (e.g. "Hot Slice" or "Cold Voyage")
  // and wants to sound casual, safe, and believable.
  const hintBluffs = getHintBasedBluffs(currentWord.hint);
  const candidatePool = [
    ...(currentWord.fakeImposterClues && currentWord.fakeImposterClues.length > 0
      ? currentWord.fakeImposterClues
      : []),
    ...hintBluffs,
    ...GENERIC_HUMAN_BLUFFS,
  ];

  // Try to find a clue that hasn't been submitted yet
  const available = candidatePool.filter((c) => !normalizedExisting.has(c.trim().toLowerCase()));
  if (available.length > 0) {
    return available[Math.floor(Math.random() * available.length)];
  }

  // Fallback to casual human variants without robotic metadata
  const prefixes = ['Super', 'Total', 'Really', 'Truly', 'Always'];
  for (const p of prefixes) {
    const candidate = `${p} iconic`;
    if (!normalizedExisting.has(candidate.toLowerCase())) {
      return candidate;
    }
  }

  return 'A personal favorite';
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
  'great',
  'nice',
  'unforgettable',
  'legendary',
  'throwback',
  'staple',
  'crowd',
  'hits',
  'spot',
];

export function pickBotVote(
  bot: Player,
  alivePlayers: Player[],
  clues: RoundClueRecord[],
  imposterIds: string[],
  currentWord?: GameWord | null
): string {
  // Candidate targets are alive players other than self
  const candidates = alivePlayers.filter((p) => p.id !== bot.id);
  if (candidates.length === 0) return 'SKIP';

  const isBotImposter = bot.role === 'IMPOSTER';

  // Build a lookup map of clues by player ID
  const clueMap = new Map<string, string>();
  clues.forEach((c) => {
    if (c.clue) clueMap.set(c.playerId, c.clue.trim());
  });

  if (isBotImposter) {
    // ==========================================
    // IMPOSTER BOT STRATEGY:
    // Does not know the word. Wants to blend in and frame a civilian.
    // Finds the civilian whose clue is most divisive, vague, or short.
    // ==========================================
    const civilianCandidates = candidates.filter((p) => !imposterIds.includes(p.id));
    const targetPool = civilianCandidates.length > 0 ? civilianCandidates : candidates;

    // Rank civilian targets by who is easiest to frame:
    // 1) Clue is very short or vague
    // 2) Clue was a generic phrase
    // 3) Already has suspicion
    let bestTarget = targetPool[0];
    let maxVulnerability = -1;

    targetPool.forEach((cand) => {
      const candClue = (clueMap.get(cand.id) || '').toLowerCase();
      let vulnerability = 10;

      // Shorter clues are easier to frame as "suspiciously low effort"
      if (candClue.split(/\s+/).length <= 2) vulnerability += 20;

      // If clue contains words commonly questioned in word games
      if (BLUFF_INDICATORS.some((b) => candClue.includes(b))) {
        vulnerability += 25;
      }

      // Slightly prefer humans over other bots to test player bluffing
      if (!cand.isBot) vulnerability += 10;

      if (vulnerability > maxVulnerability) {
        maxVulnerability = vulnerability;
        bestTarget = cand;
      }
    });

    return bestTarget.id;
  }

  // ==========================================
  // CIVILIAN BOT STRATEGY:
  // Genuine Social Deduction!
  // Evaluates every candidate's clue against the secret word and authentic traits.
  // Calculates a Suspicion Score (0 to 100+). Highest suspicion gets voted!
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
    let suspicion = 30; // Baseline neutral suspicion

    if (!candClue || candClue.includes('no clue') || candClue.includes('skipped')) {
      // Failed to submit a clue on time: extremely suspicious!
      suspicion += 60;
      suspicionScores.set(cand.id, suspicion);
      return;
    }

    const candWords = candClue.split(/\s+/);

    // 1. Direct Knowledge Check (Did this clue mention real word specifics?)
    let authenticMatches = 0;
    wordTokens.forEach((token) => {
      if (candClue.includes(token)) {
        authenticMatches++;
      }
    });

    if (authenticMatches >= 2) {
      // Highly specific authentic clue: definitely civilian!
      suspicion -= 45;
    } else if (authenticMatches === 1) {
      // Mentioned an authentic element
      suspicion -= 25;
    }

    // 2. Generic Bluff Detection
    // If the clue is made of generic party bluffs and lacks any authentic tokens:
    const bluffMatches = BLUFF_INDICATORS.filter((b) => candClue.includes(b)).length;
    if (bluffMatches > 0 && authenticMatches === 0) {
      suspicion += 35 + bluffMatches * 10; // Smells like an imposter bluffing!
    }

    // 3. Ultra-short non-committal answer (e.g. 1-2 words without specific noun)
    if (candWords.length <= 1 && authenticMatches === 0) {
      suspicion += 25;
    }

    // 4. Persona-Specific Instincts:
    // Alex & Max (analytical): Penalize non-factual adjectives heavily
    if (bot.name.includes('Alex') || bot.name.includes('Max')) {
      if (authenticMatches === 0) suspicion += 15;
    }
    // Leo (bold): Charges hard at highest bluffers
    if (bot.name.includes('Leo')) {
      if (bluffMatches > 0) suspicion += 20;
    }
    // Sam (sneaky): Suspicious of generic consensus
    if (bot.name.includes('Sam')) {
      if (candClue.includes('everyone') || candClue.includes('popular')) suspicion += 20;
    }

    suspicionScores.set(cand.id, suspicion);
  });

  // Pick candidate with the highest suspicion score
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
