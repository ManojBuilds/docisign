# Support Modal Component

A reusable modal component for submitting support requests including bug reports, feature requests, and help requests with optional screenshot attachments.

## Features

- Form validation with Zod
- File upload with drag and drop support
- Support for multiple image attachments (up to 3 files)
- Responsive design
- Loading states and user feedback

## Installation

The component is ready to use. Make sure you have the required dependencies installed:

```bash
npm install react-dropzone react-hook-form zod @hookform/resolvers
```

## Usage

### Basic Usage

```tsx
import { SupportModal } from '@/components/support'

export default function MyComponent() {
  return (
    <div>
      {/* This will use the default trigger button */}
      <SupportModal />
    </div>
  )
}
```

### Custom Trigger

```tsx
import { SupportModal } from '@/components/support'
import { Button } from '@/components/ui/button'
import { HelpCircle } from 'lucide-react'

export default function MyComponent() {
  return (
    <div>
      {/* This will use your custom trigger element */}
      <SupportModal 
        trigger={
          <Button variant="outline">
            <HelpCircle className="w-4 h-4 mr-2" />
            Need Help?
          </Button>
        } 
      />
    </div>
  )
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| trigger | React.ReactNode (optional) | Custom trigger element for the modal |

## Form Fields

1. **Request Type** (required): Select the type of request
   - Bug Report
   - Feature Request
   - Help Request

2. **Title** (required): Brief description of the request (2-100 characters)

3. **Description** (required): Detailed information about the request (10-1000 characters)

4. **Screenshots** (optional): Attach up to 3 image files (PNG, JPG, GIF) up to 5MB each

## API Integration

The component is integrated with HeySheet for handling submissions. When a user submits a request, the data is sent to:
`https://app.heysheet.in/api/s/Zo0HVTIDk6`

The submission includes:
- `type`: The request type (bug/feature/help)
- `title`: The request title
- `description`: The detailed description
- `screenshot_1`, `screenshot_2`, `screenshot_3`: Uploaded image files (if any)

## Customization

You can customize the component by modifying the following:

- Form validation rules in the `formSchema`
- File upload restrictions in the `useDropzone` configuration
- Styling by modifying the Tailwind classes
- Submission handler in the `onSubmit` function

## Dependencies

- react-dropzone
- react-hook-form
- zod
- @hookform/resolvers
- lucide-react
- shadcn/ui components (dialog, form, select, button, input, textarea)