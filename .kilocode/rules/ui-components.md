# UI Components - Shadcn UI

## Component Usage Rules

### Always Use Shadcn UI Components

When building UI components, ALWAYS prioritize using Shadcn UI components over custom implementations.

### Installation Workflow

Before using any Shadcn UI component, check if it's already installed. If not, install it using pnpm.

**Installation command pattern:**
```bash
pnpm dlx shadcn@latest add [component-name]
```

**Examples:**
```bash
# Install button component
pnpm dlx shadcn@latest add button

# Install form components
pnpm dlx shadcn@latest add form input label

# Install dialog
pnpm dlx shadcn@latest add dialog

# Install card
pnpm dlx shadcn@latest add card

# Install multiple components at once
pnpm dlx shadcn@latest add button input label card dialog
```

### Common Shadcn Components

Frequently used components that should be preferred:

- **Button** - For all button interactions
- **Input** - For text inputs
- **Label** - For form labels
- **Form** - For form handling with react-hook-form
- **Card** - For content containers
- **Dialog** - For modals and popups
- **Select** - For dropdown selections
- **Checkbox** - For boolean inputs
- **RadioGroup** - For single selection from multiple options
- **Textarea** - For multi-line text input
- **Switch** - For toggle switches
- **Tabs** - For tabbed interfaces
- **Table** - For data tables
- **Toast** - For notifications
- **Avatar** - For user avatars
- **Badge** - For status indicators
- **Dropdown Menu** - For dropdown menus
- **Sheet** - For side panels
- **Skeleton** - For loading states

### Component Usage Guidelines

1. **Import Correctly**
   ```typescript
   import { Button } from "@/components/ui/button"
   import { Input } from "@/components/ui/input"
   import { Label } from "@/components/ui/label"
   ```

2. **Use Variants Properly**
   ```typescript
   // Button variants
   <Button variant="default">Default</Button>
   <Button variant="destructive">Delete</Button>
   <Button variant="outline">Cancel</Button>
   <Button variant="ghost">Link</Button>
   <Button variant="link">Text Link</Button>
   
   // Button sizes
   <Button size="default">Normal</Button>
   <Button size="sm">Small</Button>
   <Button size="lg">Large</Button>
   <Button size="icon">Icon Only</Button>
   ```

3. **Customize with Tailwind**
   ```typescript
   // Extend with Tailwind classes using cn() utility
   import { cn } from "@/lib/utils"
   
   <Button className={cn("w-full", isLoading && "opacity-50")}>
     Submit
   </Button>
   ```

4. **Compose Components**
   ```typescript
   // Good - Composing Shadcn components
   <Card>
     <CardHeader>
       <CardTitle>Title</CardTitle>
       <CardDescription>Description</CardDescription>
     </CardHeader>
     <CardContent>
       <Form>
         <FormField
           name="email"
           render={({ field }) => (
             <FormItem>
               <FormLabel>Email</FormLabel>
               <FormControl>
                 <Input {...field} />
               </FormControl>
             </FormItem>
           )}
         />
       </Form>
     </CardContent>
   </Card>
   ```

### Before Creating Custom Components

Before creating any custom UI component, check if:
1. Shadcn UI has an equivalent component
2. The component can be composed from existing Shadcn components
3. Only create custom components when Shadcn doesn't provide suitable functionality

### Accessibility

Shadcn UI components are built on Radix UI and are accessible by default. Maintain this accessibility:
- Keep ARIA labels
- Maintain keyboard navigation
- Preserve focus management
- Don't override accessibility attributes without good reason

### Styling Consistency

- Use Tailwind CSS classes for styling
- Follow the project's design tokens defined in `tailwind.config.ts`
- Use the `cn()` utility from `@/lib/utils` for conditional classes
- Maintain consistent spacing using Tailwind's spacing scale
