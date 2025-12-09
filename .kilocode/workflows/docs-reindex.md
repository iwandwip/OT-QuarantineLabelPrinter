# /docs-reindex
Goal: Build or update docs/INDEX.md listing all numbered docs.

Steps:
- Enumerate docs/^[0-9]{2,}_[A-Z0-9_]+\.md$ sorted by NN ascending.
- Extract the first H1 as the display title (fallback to filename).
- Write/overwrite docs/INDEX.md with a simple table:
  | No. | File | Title | Created |
- Do not touch any other files.
