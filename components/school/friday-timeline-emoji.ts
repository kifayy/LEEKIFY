/** Pick a timeline-node emoji from activity / location / vibe (no 📚 for everything). */

const VARIETY = ["✨", "🌟", "🎯", "☀️", "🌸", "💫", "🎒", "📍", "⏰", "🌿"] as const;

const RULES: { re: RegExp; emoji: string }[] = [
  { re: /bubble tea|boba|milk tea|tea run/i, emoji: "🧋" },
  { re: /coffee|espresso|latte|starbucks|cafe\b|café/i, emoji: "☕" },
  { re: /snowboard|skiing|\bski\b|slope|powder|snow\b/i, emoji: "🏂" },
  { re: /climb|boulder|climbing wall|rock wall/i, emoji: "🧗" },
  { re: /burger|pizza|dining hall|dinner|lunch|brunch|food|eat\b|grab|restaurant|pizzeria|taco|sushi|ramen/i, emoji: "🍕" },
  { re: /movie|film|cinema|screening/i, emoji: "🎬" },
  { re: /party|concert|rave|club night|dance\b/i, emoji: "🎉" },
  { re: /gym|workout|lift|fitness|yoga|run\b|running/i, emoji: "💪" },
  { re: /library|study hall|lecture|class\b|homework|exam/i, emoji: "📚" },
  { re: /game\b|basketball|football|soccer|sports|stadium/i, emoji: "⚽" },
  { re: /swim|pool|beach|lake/i, emoji: "🏊" },
  { re: /hike|trail|camp|outdoor|quad|park\b|circle/i, emoji: "🌳" },
  { re: /bus|train|uber|drive|trip to|road/i, emoji: "🚌" },
  { re: /art|museum|gallery|studio/i, emoji: "🎨" },
  { re: /music|band|orchestra|open mic/i, emoji: "🎵" },
  { re: /volunteer|service|community/i, emoji: "🤝" },
  { re: /lab|research|science|stem/i, emoji: "🔬" },
  { re: /intern|career|networking|fair/i, emoji: "💼" },
  { re: /nap|sleep|dorm|room\b/i, emoji: "😴" },
  { re: /breakfast|bagel|donut/i, emoji: "🥐" },
];

function embeddedEmoji(text: string): string | null {
  const m = text.match(/\p{Extended_Pictographic}/u);
  return m?.[0] ?? null;
}

function hashPick(text: string, index: number): string {
  let h = index * 31;
  for (let i = 0; i < text.length; i++) h = (h + text.charCodeAt(i) * (i + 1)) % 997;
  return VARIETY[Math.abs(h) % VARIETY.length]!;
}

export function emojiForFridaySlot(
  slot: { activity: string; location?: string; vibe?: string },
  index: number,
): string {
  const combined = `${slot.vibe || ""} ${slot.activity} ${slot.location || ""}`.trim();
  if (!combined) return VARIETY[index % VARIETY.length]!;

  const embedded = embeddedEmoji(combined);
  if (embedded) return embedded;

  const lower = combined.toLowerCase();
  for (const { re, emoji } of RULES) {
    if (re.test(lower)) return emoji;
  }

  return hashPick(slot.activity || combined, index);
}
