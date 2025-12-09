# Next.js App Router Conventions

## File System Routing

### App Directory Structure

```
app/
├── layout.tsx                 # Root layout
├── page.tsx                   # Home page
├── loading.tsx               # Loading UI
├── error.tsx                 # Error UI
├── not-found.tsx            # 404 page
├── (auth)/                   # Route group (not in URL)
│   ├── login/
│   │   └── page.tsx
│   └── signup/
│       └── page.tsx
├── dashboard/
│   ├── layout.tsx           # Nested layout
│   ├── page.tsx             # /dashboard
│   ├── settings/
│   │   └── page.tsx         # /dashboard/settings
│   └── [userId]/            # Dynamic route
│       └── page.tsx         # /dashboard/:userId
├── api/                      # API routes
│   └── users/
│       └── route.ts         # /api/users
└── globals.css
```

### Special Files

- `layout.tsx` - Shared UI for segments
- `page.tsx` - Route page UI
- `loading.tsx` - Loading UI with Suspense
- `error.tsx` - Error UI with Error Boundary
- `not-found.tsx` - 404 UI
- `template.tsx` - Re-rendered layout on navigation
- `route.ts` - API endpoint

## Server Components (Default)

Server Components are the default in Next.js App Router.

### When to Use Server Components

```typescript
// ✅ Server Component (no 'use client' needed)
// Use for:
// - Data fetching
// - Accessing backend resources
// - Keeping sensitive info on server
// - Keeping large dependencies on server

export default async function ProductPage() {
  // Direct data fetching
  const products = await fetch('https://api.example.com/products')
    .then(res => res.json())
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

### Async Server Components

```typescript
// Server components can be async
export default async function Page() {
  // Parallel data fetching
  const [user, posts] = await Promise.all([
    fetchUser(),
    fetchPosts()
  ])
  
  return (
    <div>
      <UserProfile user={user} />
      <PostsList posts={posts} />
    </div>
  )
}
```

## Client Components

### When to Use Client Components

Only use 'use client' when you need:
- Event listeners (onClick, onChange, etc.)
- State and lifecycle (useState, useEffect, etc.)
- Browser-only APIs (localStorage, window, etc.)
- Custom hooks
- Class components

```typescript
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

// ✅ Client Component - uses interactivity
export function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={() => setCount(count + 1)}>
        Increment
      </Button>
    </div>
  )
}
```

### Client Component Best Practices

```typescript
// ❌ Bad - Entire page is client-side
'use client'

export default function Page() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <Header />
      <Sidebar />
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <Footer />
    </div>
  )
}

// ✅ Good - Only interactive part is client-side
export default function Page() {
  return (
    <div>
      <Header />
      <Sidebar />
      <Counter /> {/* Only this is 'use client' */}
      <Footer />
    </div>
  )
}
```

## Data Fetching

### Server-Side Data Fetching

```typescript
// Fetch at component level (not in useEffect)
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    // Next.js extends fetch with caching options
    cache: 'force-cache', // Default: cache forever
    // OR
    cache: 'no-store', // Always fetch fresh data
    // OR
    next: { revalidate: 3600 } // Revalidate every hour
  })
  
  return <div>{/* Use data */}</div>
}
```

### Parallel Data Fetching

```typescript
// ✅ Good - Parallel requests
const [users, posts, comments] = await Promise.all([
  fetchUsers(),
  fetchPosts(),
  fetchComments()
])

// ❌ Bad - Sequential requests (slower)
const users = await fetchUsers()
const posts = await fetchPosts()
const comments = await fetchComments()
```

### Server Actions

```typescript
// app/actions.ts
'use server'

export async function createUser(formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')
  
  // Validate data
  if (!name || !email) {
    return { error: 'Missing required fields' }
  }
  
  // Perform database operation
  const user = await db.user.create({
    data: { name, email }
  })
  
  // Revalidate cache if needed
  revalidatePath('/users')
  
  return { success: true, user }
}

// In component
'use client'

import { createUser } from './actions'

export function CreateUserForm() {
  return (
    <form action={createUser}>
      <input name="name" />
      <input name="email" />
      <button type="submit">Create</button>
    </form>
  )
}
```

## Routing and Navigation

### Link Component

```typescript
import Link from 'next/link'

// Basic link
<Link href="/dashboard">Dashboard</Link>

// With dynamic route
<Link href={`/posts/${post.id}`}>Read more</Link>

// With query params
<Link href={{ pathname: '/search', query: { q: 'query' } }}>
  Search
</Link>

// Prefetch disabled (for auth-required pages)
<Link href="/admin" prefetch={false}>Admin</Link>
```

### useRouter Hook

```typescript
'use client'

import { useRouter } from 'next/navigation'

export function MyComponent() {
  const router = useRouter()
  
  // Navigate programmatically
  const handleClick = () => {
    router.push('/dashboard')
    // OR
    router.replace('/dashboard') // No history entry
    // OR
    router.back()
    // OR
    router.refresh() // Refresh current route
  }
  
  return <button onClick={handleClick}>Go to Dashboard</button>
}
```

### Dynamic Routes

```typescript
// app/blog/[slug]/page.tsx
interface PageProps {
  params: {
    slug: string
  }
}

export default async function BlogPost({ params }: PageProps) {
  const post = await fetchPost(params.slug)
  
  return <article>{post.content}</article>
}

// Generate static params at build time
export async function generateStaticParams() {
  const posts = await fetchAllPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
```

### Catch-all Routes

```typescript
// app/shop/[...slug]/page.tsx
// Matches: /shop/a, /shop/a/b, /shop/a/b/c

interface PageProps {
  params: {
    slug: string[]
  }
}

export default function ShopPage({ params }: PageProps) {
  // params.slug is an array: ['a', 'b', 'c']
  return <div>Category: {params.slug.join(' / ')}</div>
}
```

## Loading and Error States

### Loading UI

```typescript
// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
    </div>
  )
}
```

### Error Handling

```typescript
// app/dashboard/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

## Metadata

### Static Metadata

```typescript
// app/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to our app',
  openGraph: {
    title: 'Home',
    description: 'Welcome to our app',
    images: ['/og-image.jpg'],
  },
}

export default function Page() {
  return <div>Content</div>
}
```

### Dynamic Metadata

```typescript
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await fetchPost(params.slug)
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  }
}
```

## API Routes

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'

// GET /api/users
export async function GET(request: NextRequest) {
  const users = await fetchUsers()
  
  return NextResponse.json(users)
}

// POST /api/users
export async function POST(request: NextRequest) {
  const body = await request.json()
  
  // Validate and create user
  const user = await createUser(body)
  
  return NextResponse.json(user, { status: 201 })
}

// Dynamic route: app/api/users/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await fetchUser(params.id)
  
  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    )
  }
  
  return NextResponse.json(user)
}
```

## Middleware

```typescript
// middleware.ts (root level)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check authentication
  const token = request.cookies.get('token')
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*',
}
```

## Environment Variables

```typescript
// Access in Server Components or API routes
const apiKey = process.env.API_KEY

// For browser (must be prefixed with NEXT_PUBLIC_)
const publicKey = process.env.NEXT_PUBLIC_API_KEY
```

## Best Practices

1. **Prefer Server Components** - Only use Client Components when needed
2. **Fetch data at the component level** - Not in useEffect
3. **Use loading.tsx and error.tsx** - For better UX
4. **Colocate data fetching** - Keep data fetching close to where it's used
5. **Use Server Actions** - For form submissions and mutations
6. **Optimize metadata** - Use generateMetadata for SEO
7. **Use route groups** - Organize routes without affecting URLs
8. **Implement proper caching** - Use revalidate options appropriately
