// Six Words, One Story — make.fun entry
// Node 22, zero dependencies, no network.
//
// Writes one complete six-word story to /output/entry.txt
// (the grading sandbox path), falling back to ./output/entry.txt
// when /output is not writable (local runs).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const STORY = "He kept the ticket. She left.";

// The gate requires UTF-8 text of 1–60 chars, not only whitespace.
// This story is exactly six words, 34 characters, no trailing newline.
const OUTPUT_NAME = "entry.txt";

// Fail loudly rather than writing an invalid entry: the story must be
// exactly six words and within the gate's 1–60 character window.
function validateStory(text: string): void {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length !== 6) {
    throw new Error(`story must be exactly six words, got ${words.length}`);
  }
  if (text.length < 1 || text.length > 60) {
    throw new Error(`story must be 1–60 characters, got ${text.length}`);
  }
}

function writeStory(): string {
  validateStory(STORY);
  const candidates = ["/output", join(process.cwd(), "output")];
  let lastError: unknown;
  for (const dir of candidates) {
    try {
      mkdirSync(dir, { recursive: true });
      const target = join(dir, OUTPUT_NAME);
      writeFileSync(target, STORY, "utf8");
      return target;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

const writtenTo = writeStory();
console.log(`Wrote six-word story to ${writtenTo}`);
