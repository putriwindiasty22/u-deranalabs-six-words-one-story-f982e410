// Six Words, One Story — make.fun bounty entry.
// Node 22, zero dependencies, no network, no secrets.
// Writes exactly six words to /output/entry.txt (or ./output/entry.txt
// when /output is not writable, e.g. a local run), with no trailing newline
// so the word count stays exact.
import { mkdirSync, writeFileSync } from "node:fs";

const STORY = "He kept the ticket. She left.";

const targets = ["/output/entry.txt", "./output/entry.txt"];
let wrote = false;
for (const target of targets) {
  try {
    mkdirSync(target.slice(0, target.lastIndexOf("/")), { recursive: true });
    writeFileSync(target, STORY, "utf8");
    wrote = true;
    break;
  } catch {
    // /output not writable locally — fall through to the next target.
  }
}
if (!wrote) {
  throw new Error("could not write entry.txt to any output location");
}
