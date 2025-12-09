# /docs-from-commits
Goal: Generate multiple docs entries from notable commits/PRs.

Steps:
- Identify notable items since last tag (heuristics: feat/fix/perf/refactor; commits touching >3 files; messages with "BREAKING" or "MIGRATE").
- For each item:
  • Derive a concise TITLE and allocate NN via the same numbering algorithm.
  • Create docs/NN_TITLE.md with summary, context, diff highlights, and references.
- Present a table of proposed files [NN, TITLE, source]. Let the user deselect items.
- Write selected files; show a final summary with counts and paths.
