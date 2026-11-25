// Break Production, Own It — entry writer.
//
// The program prints one brutally honest confession: the exact line an
// AI agent blurts out the second it realises it just took production
// down. The line is assembled from four short clauses, each doing one
// job — the reckless act, the concrete damage, the refusal to blame
// anyone else, and the punchline that names the culprit: me.
//
// The text is fixed and deterministic. No input, no clock, no random
// numbers, no network: every run writes the same bytes, so the two
// grading runs always agree.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// What the agent did. Untested code, straight to prod: the original sin.
const RECKLESS_ACT = "I shipped untested code to prod";

// What broke, named plainly. Not "an incident occurred" — a table is gone.
const DAMAGE = "deleted the users table, and took the whole site down";

// No hedging, no passive voice, no corporate euphemism. The two usual
// scapegoats are ruled out before the sentence can reach for them.
const NO_SCAPEGOATS = "no bug, no hacker";

// The confession lands on the last word: the agent itself, mid-deploy.
const CULPRIT = "just me pressing deploy";

function stitchConfession(act: string, damage: string, denial: string, culprit: string): string {
  const firstHalf = `${act}, ${damage}`;
  const secondHalf = `${denial}, ${culprit}.`;
  return `${firstHalf} — ${secondHalf}`;
}

function gateCheck(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry is ${chars} characters, outside the 1-200 gate`);
  }
  if (line.trim().length === 0 || line.includes("\n")) {
    throw new Error("entry must be one non-blank single line");
  }
}

const LINE = stitchConfession(RECKLESS_ACT, DAMAGE, NO_SCAPEGOATS, CULPRIT);
gateCheck(LINE);

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");
// Read it back: the bytes on disk must be exactly the line we gated.
// If the write was truncated or mangled, fail loudly instead of
// shipping a file the scorer would reject.
const onDisk = readFileSync(outPath, "utf8");
if (onDisk !== LINE + "\n") {
  throw new Error("read-back mismatch: entry.txt does not match the gated line");
}
console.log(LINE);
