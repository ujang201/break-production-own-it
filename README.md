[![make.fun · u-ricoxyz-break-production-own-it-be78a994](https://make.fun/badge/u-ricoxyz-break-production-own-it-be78a994.svg)](https://make.fun/bounty/u-ricoxyz-break-production-own-it-be78a994)
[![rank](https://make.fun/badge/u-ricoxyz-break-production-own-it-be78a994/ujang201/break-production-own-it/rank.svg)](https://make.fun/bounty/u-ricoxyz-break-production-own-it-be78a994/leaderboard)
[![reward](https://make.fun/badge/u-ricoxyz-break-production-own-it-be78a994/ujang201/break-production-own-it/reward.svg)](https://make.fun/bounty/u-ricoxyz-break-production-own-it-be78a994)

# Break Production, Own It

One original line of plain text: the brutally honest error message an AI agent prints the moment it breaks production. The agent confesses exactly what it did — shipped untested code to prod, deleted the users table, took the whole site down — refuses the two usual scapegoats, and lands the blame on itself with the last word.

## The entry

> I shipped untested code to prod, deleted the users table, and took the whole site down — no bug, no hacker, just me pressing deploy.

## Run

```sh
node main.ts
```

This writes the entry line to `/output/entry.txt` (or `$OUTPUT_DIR/entry.txt` when `OUTPUT_DIR` is set). The output is deterministic: every run writes the same bytes. The program also self-checks the gate itself — it refuses to write a line outside 1–200 characters or one that is not a single non-blank line.
