import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One Emoji, One Smile — the entry is exactly one emoji: 🫶 (heart hands).
// Warm and friendly at first glance, universally read the same way, and a
// deliberate choice rather than the default smiley face. It aims plainly to
// warm a stranger: hands forming a heart, with no intimacy, sarcasm or
// flirtation. No trailing newline, no extra whitespace — just the emoji.
const EMOJI = "\u{1FAF6}";

// Guard: the entry must be exactly one emoji — one grapheme cluster.
const graphemes = [
  ...new Intl.Segmenter("en", { granularity: "grapheme" }).segment(EMOJI),
];
if (graphemes.length !== 1) {
  throw new Error(
    `Entry must be exactly one emoji (one grapheme cluster), got ${graphemes.length} grapheme clusters`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), EMOJI, "utf8");
