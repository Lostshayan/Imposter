import { Player, GameWord, RoundClueRecord } from '../types/game';

export interface BotPersona {
  name: string;
  avatar: string;
  color: string;
  personality: 'analytical' | 'bold' | 'sneaky' | 'poetic' | 'casual';
}

export const BOT_ROSTER: BotPersona[] = [
  { name: 'Alex', avatar: '🦊', color: 'from-amber-500 to-orange-600', personality: 'analytical' },
  { name: 'Maya', avatar: '🐱', color: 'from-pink-500 to-rose-600', personality: 'casual' },
  { name: 'Leo', avatar: '🦁', color: 'from-yellow-500 to-amber-600', personality: 'bold' },
  { name: 'Sam', avatar: '🐼', color: 'from-emerald-500 to-teal-600', personality: 'sneaky' },
  { name: 'Zoe', avatar: '🦄', color: 'from-purple-500 to-indigo-600', personality: 'poetic' },
  { name: 'Max', avatar: '🤖', color: 'from-cyan-500 to-blue-600', personality: 'analytical' },
];

export function createBotPlayer(existingBotsCount: number): Player {
  const persona = BOT_ROSTER[existingBotsCount % BOT_ROSTER.length];
  const uniqueSuffix = existingBotsCount >= BOT_ROSTER.length ? ` ${Math.floor(existingBotsCount / BOT_ROSTER.length) + 1}` : '';
  
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

export function generateBotClue(bot: Player, currentWord: GameWord, existingClues: string[] = []): string {
  const isImposter = bot.role === 'IMPOSTER';
  const normalizedExisting = new Set(existingClues.map((c) => c.trim().toLowerCase()));
  
  const candidatePool = isImposter
    ? [
        ...(currentWord.fakeImposterClues && currentWord.fakeImposterClues.length > 0
          ? currentWord.fakeImposterClues
          : []),
        `Very notable in ${currentWord.category.toLowerCase()}`,
        'Something almost everyone recognizes',
        'Has a prominent and distinct purpose',
        'Quite iconic and widely discussed',
        'Known for its recognizable presence',
        'Found and celebrated across cultures',
      ]
    : [
        ...(currentWord.fakeCivClues && currentWord.fakeCivClues.length > 0
          ? currentWord.fakeCivClues
          : []),
        `Signature element of ${currentWord.word}`,
        'Instantly recognizable trait',
        'Key defining detail',
        'Unmistakable characteristic',
      ];

  // Filter out any clues that match already submitted clues
  const available = candidatePool.filter((c) => !normalizedExisting.has(c.trim().toLowerCase()));

  if (available.length > 0) {
    return available[Math.floor(Math.random() * available.length)];
  }

  // Guaranteed fallback with persona attribution to guarantee no duplicate
  const base = candidatePool[0] || 'Very distinct';
  return `${base} (observed)`;
}

export function pickBotVote(
  bot: Player,
  alivePlayers: Player[],
  clues: RoundClueRecord[],
  imposterIds: string[]
): string {
  // Candidate targets are alive players other than self
  const candidates = alivePlayers.filter((p) => p.id !== bot.id);
  if (candidates.length === 0) return 'SKIP';

  const isBotImposter = bot.role === 'IMPOSTER';

  if (isBotImposter) {
    // As imposter, bot votes for a civilian who has an interesting or weird clue, avoiding fellow imposters
    const civilianCandidates = candidates.filter((p) => !imposterIds.includes(p.id));
    if (civilianCandidates.length > 0) {
      return civilianCandidates[Math.floor(Math.random() * civilianCandidates.length)].id;
    }
    return candidates[Math.floor(Math.random() * candidates.length)].id;
  } else {
    // As civilian, bot has a 75% chance of picking an actual imposter if suspicious, or random candidate
    const actualImposters = candidates.filter((p) => imposterIds.includes(p.id));
    const shouldVoteImposter = Math.random() < 0.70 && actualImposters.length > 0;

    if (shouldVoteImposter) {
      return actualImposters[Math.floor(Math.random() * actualImposters.length)].id;
    }

    return candidates[Math.floor(Math.random() * candidates.length)].id;
  }
}
