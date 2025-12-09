# Security & Best Practices

## Sensitive Files Protection

### Files That MUST NOT Be Read or Modified

The following files contain sensitive data and MUST NOT be accessed:

- `.env`
- `.env.local`
- `.env.production`
- `.env.development`
- `*.key`
- `*.pem`
- `credentials.json`
- Any file in `secrets/` directory
- `service-account.json`
- `.npmrc` with authentication tokens
- Any file containing API keys or tokens

### Environment Variables

```typescript
// ✅ Good - Use environment variables
const apiKey = process.env.API_KEY

// ❌ Bad - Never hardcode secrets
const apiKey = "sk-1234567890abcdef"
```

### .env File Structure

```bash
# .env.local (never commit this)
DATABASE_URL="postgresql://..."
API_KEY="your-api-key"
SECRET_KEY="your-secret"

# .env.example (commit this as template)
DATABASE_URL="postgresql://user:password@localhost:5432/db"
API_KEY="your-api-key-here"
SECRET_KEY="your-secret-here"
```

## Authentication & Authorization

### Protect API Routes

```typescript
// app/api/protected/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Verify authentication
  const token = request.cookies.get('token')
  
  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  // Verify token
  const user = await verifyToken(token.value)
  
  if (!user) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 403 }
    )
  }
  
  // Proceed with authorized request
  return NextResponse.json({ data: 'Protected data' })
}
```

### Server Actions Security

```typescript
'use server'

import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function deletePost(postId: string) {
  // Always verify authentication in Server Actions
  const session = await auth()
  
  if (!session?.user) {
    throw new Error('Unauthorized')
  }
  
  // Verify authorization (user owns the post)
  const post = await db.post.findUnique({ where: { id: postId } })
  
  if (post.authorId !== session.user.id) {
    throw new Error('Forbidden')
  }
  
  // Proceed with deletion
  await db.post.delete({ where: { id: postId } })
  
  revalidatePath('/posts')
}
```

## Input Validation

### Always Validate User Input

```typescript
import { z } from 'zod'

// Define schema
const userSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  age: z.number().min(18).max(120),
})

// Validate
function createUser(data: unknown) {
  // Validate and parse
  const validData = userSchema.parse(data)
  
  // Now validData is type-safe
  return db.user.create({ data: validData })
}
```

### Form Validation

```typescript
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type FormData = z.infer<typeof formSchema>

export function LoginForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })
  
  async function onSubmit(data: FormData) {
    // Data is validated
    await login(data)
  }
  
  return <form onSubmit={form.handleSubmit(onSubmit)} />
}
```

## SQL Injection Prevention

```typescript
// ✅ Good - Use parameterized queries or ORM
const user = await db.user.findUnique({
  where: { email: userInput }
})

// ❌ Bad - Never concatenate user input
const query = `SELECT * FROM users WHERE email = '${userInput}'`
```

## XSS Prevention

### Next.js Auto-Escapes by Default

```typescript
// ✅ Safe - React escapes by default
<div>{userInput}</div>

// ⚠️ Only use dangerouslySetInnerHTML for trusted content
<div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />

// If you must render HTML, sanitize it first
import DOMPurify from 'isomorphic-dompurify'

const sanitizedHTML = DOMPurify.sanitize(untrustedHTML)
```

## CSRF Protection

```typescript
// Next.js Server Actions have built-in CSRF protection
// No additional configuration needed when using Server Actions

'use server'

export async function updateProfile(formData: FormData) {
  // This is automatically protected
  // ...
}
```

## Rate Limiting

```typescript
// Use rate limiting for API routes
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
})

export async function POST(request: NextRequest) {
  const ip = request.ip ?? 'anonymous'
  
  const { success, limit, reset, remaining } = await ratelimit.limit(ip)
  
  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    )
  }
  
  // Process request
}
```

## Secure Headers

```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
```

## Dependency Security

### Regular Updates

```bash
# Check for outdated packages
pnpm outdated

# Update dependencies
pnpm update

# Audit for vulnerabilities
pnpm audit

# Fix vulnerabilities
pnpm audit --fix
```

### Use Exact Versions for Critical Packages

```json
// package.json
{
  "dependencies": {
    "next": "14.0.0", // Exact version
    "react": "^18.0.0" // Allow patches
  }
}
```

## Error Handling

### Never Expose Sensitive Information

```typescript
// ❌ Bad - Exposes internal details
catch (error) {
  return NextResponse.json(
    { error: error.message }, // Might contain DB details
    { status: 500 }
  )
}

// ✅ Good - Generic message
catch (error) {
  console.error('Database error:', error) // Log internally
  return NextResponse.json(
    { error: 'An error occurred' }, // Generic message
    { status: 500 }
  )
}
```

## File Uploads

### Validate File Types and Sizes

```typescript
export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File
  
  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: 'Invalid file type' },
      { status: 400 }
    )
  }
  
  // Validate file size (5MB)
  const maxSize = 5 * 1024 * 1024
  if (file.size > maxSize) {
    return NextResponse.json(
      { error: 'File too large' },
      { status: 400 }
    )
  }
  
  // Process file
}
```

## HTTPS Only

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  // Redirect HTTP to HTTPS in production
  if (
    process.env.NODE_ENV === 'production' &&
    request.headers.get('x-forwarded-proto') !== 'https'
  ) {
    return NextResponse.redirect(
      `https://${request.headers.get('host')}${request.nextUrl.pathname}`,
      301
    )
  }
}
```

## Content Security Policy

```typescript
// next.config.js
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' data:;
  connect-src 'self' https://api.example.com;
`

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
          },
        ],
      },
    ]
  },
}
```

## Logging and Monitoring

### Log Security Events

```typescript
// Log authentication attempts
async function login(email: string, password: string) {
  try {
    const user = await authenticate(email, password)
    logger.info('Successful login', { userId: user.id, email })
    return user
  } catch (error) {
    logger.warn('Failed login attempt', { email, error })
    throw error
  }
}
```

## Secure Cookies

```typescript
import { cookies } from 'next/headers'

// Set secure cookie
cookies().set('session', token, {
  httpOnly: true, // Cannot be accessed by JavaScript
  secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
  sameSite: 'lax', // CSRF protection
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: '/',
})
```

## Security Checklist

- [ ] Environment variables are not committed
- [ ] API routes verify authentication
- [ ] User input is validated with Zod
- [ ] SQL queries use parameterized queries/ORM
- [ ] Passwords are hashed (bcrypt, argon2)
- [ ] HTTPS is enforced in production
- [ ] Security headers are configured
- [ ] Rate limiting is implemented
- [ ] File uploads are validated
- [ ] Dependencies are regularly updated
- [ ] Error messages don't expose internals
- [ ] Sensitive operations are logged
- [ ] CORS is properly configured
- [ ] Sessions expire after timeout
