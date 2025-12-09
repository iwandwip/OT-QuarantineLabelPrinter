# Code Style & Conventions

## TypeScript Guidelines

### Type Safety

- Use TypeScript for ALL code
- Enable strict mode in `tsconfig.json`
- Prefer `interface` over `type` for object shapes
- Avoid `any` type - use `unknown` or proper types
- Use type inference when possible

```typescript
// ❌ Bad
const data: any = fetchData()
type Props = { name: string }

// ✅ Good
const data = fetchData() // Let TypeScript infer
interface Props {
  name: string
}
```

### Type Definitions

```typescript
// Use descriptive interface names
interface UserProfile {
  id: string
  name: string
  email: string
}

// Use type for unions and intersections
type Status = "idle" | "loading" | "success" | "error"

// Use generic types when needed
interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}

// Proper function typing
function fetchUser(id: string): Promise<UserProfile> {
  // implementation
}

// Async function
async function getData(): Promise<UserProfile[]> {
  // implementation
}
```

### Avoid Enums, Use Objects

```typescript
// ❌ Bad
enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE"
}

// ✅ Good
const Status = {
  Active: "ACTIVE",
  Inactive: "INACTIVE"
} as const

type Status = typeof Status[keyof typeof Status]
```

## Naming Conventions

### Variables and Functions

- Use `camelCase` for variables and functions
- Use descriptive names with auxiliary verbs for booleans
- Use plural names for arrays and collections

```typescript
// ❌ Bad
const data = []
const flag = true
const x = getUserData()

// ✅ Good
const users = []
const isLoading = true
const hasPermission = false
const canSubmit = false
const shouldRender = true
const userData = getUserData()
```

### Components and Types

- Use `PascalCase` for React components
- Use `PascalCase` for TypeScript interfaces and types
- Suffix props interfaces with `Props`

```typescript
// ✅ Component
export function UserProfile({ name, email }: UserProfileProps) {
  // implementation
}

// ✅ Props interface
interface UserProfileProps {
  name: string
  email: string
}

// ✅ Type
type ButtonVariant = "default" | "destructive" | "outline"
```

### Files and Folders

- Use `kebab-case` for folders: `user-profile/`, `auth-wizard/`
- Use `kebab-case` for component files: `user-card.tsx`, `nav-menu.tsx`
- Use `kebab-case` for utility files: `format-date.ts`, `api-client.ts`

```
src/
├── components/
│   ├── user-profile/
│   │   ├── user-avatar.tsx
│   │   ├── user-details.tsx
│   │   └── index.tsx
│   └── auth/
│       ├── login-form.tsx
│       └── signup-form.tsx
├── lib/
│   ├── utils.ts
│   ├── api-client.ts
│   └── format-date.ts
└── app/
    └── dashboard/
        └── page.tsx
```

## React Component Patterns

### Component Structure

```typescript
// ✅ Functional component with proper structure
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface UserCardProps {
  name: string
  email: string
  className?: string
}

export function UserCard({ name, email, className }: UserCardProps) {
  // Hooks first
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Event handlers
  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }
  
  // Render
  return (
    <div className={cn("rounded-lg border p-4", className)}>
      <h3>{name}</h3>
      <p>{email}</p>
      <Button onClick={handleToggle}>
        {isExpanded ? "Collapse" : "Expand"}
      </Button>
    </div>
  )
}
```

### Use Function Declarations

```typescript
// ✅ Good - Use function keyword
export function MyComponent() {
  return <div>Content</div>
}

// ❌ Avoid - Arrow function for components
export const MyComponent = () => {
  return <div>Content</div>
}
```

### Component Organization

Order within component:
1. Props interface
2. Component function
3. Hooks (useState, useEffect, custom hooks)
4. Event handlers and helper functions
5. Derived state and computations
6. Render logic
7. JSX return

### Server vs Client Components

```typescript
// Server Component (default in Next.js App Router)
// No 'use client' directive needed
export function ServerComponent() {
  // Can fetch data directly
  // No useState, useEffect, or browser APIs
  return <div>Server rendered content</div>
}

// Client Component
'use client'

import { useState } from 'react'

export function ClientComponent() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

## Code Formatting

### Imports Organization

```typescript
// 1. React and Next.js imports
import { useState, useEffect } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"

// 2. Third-party libraries
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

// 3. UI components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// 4. Local components
import { UserCard } from "@/components/user-card"
import { Header } from "@/components/header"

// 5. Utils and helpers
import { cn } from "@/lib/utils"
import { formatDate } from "@/lib/format-date"

// 6. Types
import type { User } from "@/types/user"
```

### JSX Formatting

```typescript
// Single line for simple components
<Button variant="outline">Click me</Button>

// Multiple lines for complex components
<Button
  variant="outline"
  size="lg"
  onClick={handleClick}
  className="w-full"
>
  Click me
</Button>

// Conditional rendering
{isLoading && <Spinner />}
{error && <ErrorMessage error={error} />}
{data && <DataDisplay data={data} />}

// Ternary for simple cases
<div>{isLoading ? <Spinner /> : <Content />}</div>
```

### Conditional Logic

```typescript
// Early returns for guards
function processUser(user: User | null) {
  if (!user) return null
  if (!user.isActive) return null
  
  // Main logic here
  return <UserProfile user={user} />
}

// Use guard clauses
async function fetchData() {
  if (!userId) {
    throw new Error("User ID required")
  }
  
  if (!hasPermission) {
    throw new Error("Permission denied")
  }
  
  // Happy path
  const data = await fetch(`/api/users/${userId}`)
  return data
}
```

## Error Handling

```typescript
// Handle errors explicitly
try {
  const result = await riskyOperation()
  return result
} catch (error) {
  if (error instanceof ValidationError) {
    // Handle validation error
  }
  if (error instanceof NetworkError) {
    // Handle network error
  }
  throw error // Re-throw if unknown
}

// Use custom error types
class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ValidationError"
  }
}
```

## Comments and Documentation

```typescript
// Use JSDoc for functions
/**
 * Fetches user data from the API
 * @param userId - The unique identifier of the user
 * @returns Promise resolving to user data
 * @throws {NotFoundError} When user doesn't exist
 */
async function fetchUser(userId: string): Promise<User> {
  // Implementation
}

// Explain WHY, not WHAT
// ❌ Bad - Obvious comment
// Set loading to true
setIsLoading(true)

// ✅ Good - Explains reasoning
// Disable form during submission to prevent duplicate requests
setIsLoading(true)
```

## Utility Functions

```typescript
// Use the cn() utility for conditional classes
import { cn } from "@/lib/utils"

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  error && "error-classes",
  className // Allow override
)} />
```

## Performance

- Minimize 'use client' directives - prefer Server Components
- Use dynamic imports for heavy components
- Memoize expensive computations with useMemo
- Optimize re-renders with useCallback for callbacks

```typescript
// Dynamic import
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./heavy-component'), {
  loading: () => <Spinner />,
})
```
