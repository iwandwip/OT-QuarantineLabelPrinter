# Context7 MCP Server Workflow

## CRITICAL: Always Use Context7 Before Writing Code

Before writing any code, ALWAYS use the Context7 MCP server to get relevant context and references from documentation.

## What is Context7?

Context7 is an MCP (Model Context Protocol) server that provides:
- Access to official documentation
- Code examples and best practices
- API references
- Up-to-date framework guidelines

## Workflow Rules

### 1. Search Documentation First

Before implementing any feature or component, search Context7 for relevant documentation.

**Steps:**
1. Identify what you need to implement
2. Search Context7 for relevant docs
3. Review the documentation and examples
4. Implement based on the official guidance

### 2. When to Use Context7

Use Context7 when you need information about:

- **Next.js Features**
  - App Router patterns
  - Server Components vs Client Components
  - Data fetching strategies
  - Route handlers
  - Middleware
  - Metadata API
  - Error handling

- **React Patterns**
  - Hooks usage
  - Server Components best practices
  - Client Components optimization
  - State management patterns

- **Shadcn UI Components**
  - Component API reference
  - Customization examples
  - Accessibility guidelines
  - Styling patterns

- **TypeScript Usage**
  - Type definitions
  - Generic patterns
  - Utility types
  - Best practices

- **Tailwind CSS**
  - Utility classes
  - Configuration options
  - Custom styling
  - Responsive design patterns

### 3. Integration Workflow

**Standard workflow for any new implementation:**

```
1. User Request
   ↓
2. Search Context7 for relevant documentation
   ↓
3. Review documentation and examples
   ↓
4. Plan implementation based on official guidance
   ↓
5. Write code following best practices from docs
   ↓
6. Verify against documentation
```

### 4. Example Queries for Context7

#### Next.js Queries
```
- "Next.js App Router data fetching"
- "Next.js Server Components best practices"
- "Next.js dynamic routes"
- "Next.js API routes with App Router"
- "Next.js loading and error states"
- "Next.js metadata API"
```

#### React Queries
```
- "React Server Components"
- "React use hook"
- "React useOptimistic"
- "React Suspense patterns"
- "React error boundaries"
```

#### Shadcn UI Queries
```
- "Shadcn UI form component"
- "Shadcn UI dialog examples"
- "Shadcn UI table implementation"
- "Shadcn UI customization"
```

#### TypeScript Queries
```
- "TypeScript generic types"
- "TypeScript utility types"
- "TypeScript with React"
- "TypeScript async patterns"
```

### 5. Code Implementation Pattern

After retrieving documentation from Context7:

1. **Understand the Pattern**
   - Read the documentation thoroughly
   - Review code examples
   - Understand the rationale

2. **Adapt to Project Context**
   - Follow project conventions
   - Use project's tech stack (pnpm, Shadcn, etc.)
   - Maintain consistency with existing code

3. **Implement with Best Practices**
   - Type-safe implementations
   - Accessible components
   - Performance-optimized code
   - Error handling

4. **Document Decisions**
   - Add comments explaining complex logic
   - Reference official docs when relevant
   - Document deviations from standard patterns

### 6. Don't Implement Without Context

❌ **NEVER DO THIS:**
- Write code based on assumptions
- Implement features without checking official docs
- Use outdated patterns
- Ignore best practices from documentation

✅ **ALWAYS DO THIS:**
- Search Context7 first
- Follow official documentation
- Use current best practices
- Verify implementation against docs

### 7. Staying Up-to-Date

Context7 provides access to current documentation. Always:
- Prefer Context7 references over potentially outdated knowledge
- Check for deprecations and new features
- Follow migration guides when available
- Use recommended patterns over legacy approaches

## Example: Implementing a Form

**Bad approach:**
```typescript
// Implementing form without checking docs
// Might use outdated patterns or miss new features
```

**Good approach:**
```
1. Search Context7: "Shadcn UI form with react-hook-form"
2. Review: Form component API, validation patterns
3. Search Context7: "Next.js form actions"
4. Review: Server actions, form validation
5. Implement: Using current best practices from both sources
```

## Benefits

Using Context7 consistently ensures:
- ✅ Code follows official best practices
- ✅ Implementation uses latest features
- ✅ Patterns are framework-approved
- ✅ Examples are production-ready
- ✅ Accessibility is maintained
- ✅ Performance is optimized
- ✅ Type safety is preserved

## Integration with Other Rules

Context7 usage complements:
- **UI Components**: Verify Shadcn component APIs
- **Code Style**: Follow official style guidelines
- **Next.js Conventions**: Use recommended patterns
- **TypeScript**: Implement proper typing
