# Package Management with pnpm

## CRITICAL RULE: Always Use pnpm

This project EXCLUSIVELY uses **pnpm** as the package manager. Never use npm or yarn.

## Package Manager Commands

### Installation

```bash
# Install all dependencies
pnpm install

# Install with frozen lockfile (CI/CD)
pnpm install --frozen-lockfile

# Install specific package
pnpm add [package-name]

# Install dev dependency
pnpm add -D [package-name]

# Install global package
pnpm add -g [package-name]
```

### Removal

```bash
# Remove package
pnpm remove [package-name]

# Remove multiple packages
pnpm remove [package-1] [package-2]
```

### Updates

```bash
# Update all dependencies
pnpm update

# Update specific package
pnpm update [package-name]

# Update to latest version (interactive)
pnpm update --latest --interactive

# Check outdated packages
pnpm outdated
```

### Scripts

```bash
# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint

# Run tests
pnpm test

# Run type checking
pnpm type-check
```

### Workspace Commands (if using pnpm workspaces)

```bash
# Run command in specific workspace
pnpm --filter [workspace-name] [command]

# Run command in all workspaces
pnpm -r [command]

# Add dependency to specific workspace
pnpm --filter [workspace-name] add [package-name]
```

## Shadcn UI Installation

For Shadcn UI components, use the `dlx` command:

```bash
# Install single component
pnpm dlx shadcn@latest add [component-name]

# Install multiple components
pnpm dlx shadcn@latest add [component-1] [component-2] [component-3]

# Example: Install form-related components
pnpm dlx shadcn@latest add form input label button

# Example: Install dialog and related components
pnpm dlx shadcn@latest add dialog sheet
```

## Common Packages for This Stack

### Essential Dependencies

```bash
# Next.js and React
pnpm add next react react-dom

# TypeScript types
pnpm add -D typescript @types/react @types/node

# Tailwind CSS
pnpm add -D tailwindcss postcss autoprefixer

# Shadcn UI dependencies (usually auto-installed)
pnpm add class-variance-authority clsx tailwind-merge
pnpm add lucide-react  # For icons
```

### Common Additional Packages

```bash
# Form handling
pnpm add react-hook-form zod @hookform/resolvers

# State management
pnpm add zustand  # or
pnpm add jotai    # or
pnpm add @tanstack/react-query

# Data fetching
pnpm add @tanstack/react-query
pnpm add axios  # or fetch

# Date handling
pnpm add date-fns  # or
pnpm add dayjs

# Animation
pnpm add framer-motion

# Icons
pnpm add lucide-react  # (recommended with Shadcn)
```

## Lockfile Management

- **NEVER** commit changes to `package-lock.json` or `yarn.lock`
- **ALWAYS** commit `pnpm-lock.yaml`
- If you find other lockfiles, remove them:
  ```bash
  rm package-lock.json yarn.lock
  ```

## Troubleshooting

### Clear Cache and Reinstall

```bash
# Remove node_modules and lockfile
rm -rf node_modules pnpm-lock.yaml

# Clear pnpm cache
pnpm store prune

# Reinstall
pnpm install
```

### Fix Peer Dependencies Issues

```bash
# Install with legacy peer deps
pnpm install --legacy-peer-deps

# Or use --force
pnpm install --force
```

### Check Disk Space Usage

```bash
# Check pnpm store size
pnpm store status

# Clean old packages
pnpm store prune
```

## Why pnpm?

- **Fast**: Uses hard links and content-addressable storage
- **Efficient**: Saves significant disk space
- **Strict**: Better dependency resolution
- **Monorepo friendly**: Excellent workspace support
- **Security**: Prevents dependency hoisting issues

## Error Prevention

❌ **NEVER DO THIS:**
```bash
npm install
npm install package-name
yarn add package-name
npx create-next-app
```

✅ **ALWAYS DO THIS:**
```bash
pnpm install
pnpm add package-name
pnpm dlx create-next-app
```
