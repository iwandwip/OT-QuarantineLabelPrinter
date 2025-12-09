# /docs-new
Goal: Create a new docs/NN_TITLE.md from recent changes and/or notes.

Steps:
- Ask for a short title (one line). Convert to SCREAMING_SNAKE_CASE => TITLE.
- Scan docs/ for ^[0-9]{2,}_[A-Z0-9_]+\.md$, pick next NN (00 if none; else max+1).
- Collect evidence:
  • Git: commits since last tag (fallback: 30 days), changed files, any "BREAKING CHANGE" markers.
  • PR/Issues via MCP if available.
  • docs/_inputs/conversations/*.md if present.
- Draft docs/NN_TITLE.md (use the front matter + section template).
- Show target path + preview. On approval, write the file.
- Output a one-line “Added: docs/NN_TITLE.md”.
