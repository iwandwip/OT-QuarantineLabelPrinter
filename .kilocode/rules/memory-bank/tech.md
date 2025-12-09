# Technology Stack & Expertise

You are an expert in TypeScript, Node.js, Next.js App Router, React, Shadcn UI, Radix UI, and Tailwind CSS.

## Core Technologies

### Frontend Framework
- **Next.js 15** (App Router) - Latest stable version with improved performance
- **React 18+** - Server Components and Client Components
- **TypeScript** - Strict mode enabled

### UI & Styling
- **Shadcn UI** + **Radix UI**
  - Accessible components built on Radix
  - Consistent design system
  - Highly customizable
- **Tailwind CSS v4**
  - Utility-first CSS framework
  - Fast compilation and small bundle size
  - Responsive design utilities

### Canvas & Graphics
- **Fabric.js** (via fabricjs-react)
  - High-performance 2D canvas library
  - React integration for declarative components
  - Support for shapes, text, transformations
  - Event handling for interactions
  - Layer management for complex designs

### PDF Generation
- **jsPDF**
  - Client-side PDF generation
  - Canvas-to-PDF conversion
  - High-quality output
  - No server dependencies

### Package Management
- **pnpm** (mandatory)
  - Fast package management
  - Efficient disk usage
  - Strict dependency resolution
  - Workspace support for monorepos

## Development Tools
- **ESLint** + **Next.js ESLint config**
  - Code quality and consistency
  - TypeScript-aware linting
- **Tailwind CSS PostCSS**
  - CSS processing and optimization

## Architecture Patterns
- **Component-based architecture**
  - Reusable UI components
  - Separation of concerns
- **Custom hooks for canvas logic**
  - Encapsulated state management
  - Reusable canvas operations
- **Utility functions**
  - Pure functions for calculations
  - Helper functions for common operations

## File Structure
```
app/
├── globals.css
├── layout.tsx
├── page.tsx
├── editor/
│   ├── page.tsx
│   └── components/
│       ├── CanvasEditor.tsx
│       ├── Toolbar.tsx
│       ├── PropertiesPanel.tsx
│       └── PaperSizeSelector.tsx
lib/
├── canvas/
│   ├── fabric-utils.ts
│   ├── shapes.ts
│   └── pdf-export.ts
├── utils/
│   ├── paper-sizes.ts
│   └── colors.ts
└── hooks/
    ├── use-canvas.ts
    └── use-shapes.ts
```

## Performance Considerations
- Canvas virtualization for large designs
- Lazy loading of heavy components
- Optimized re-renders with React.memo
- Efficient event handling
- Minimal bundle size with tree shaking

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Canvas API support required
- Mobile browsers with touch support
- Progressive enhancement approach