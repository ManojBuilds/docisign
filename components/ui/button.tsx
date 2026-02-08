import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-linear-to-b from-primary/95 to-primary text-primary-foreground shadow-[inset_0_1.5px_0_rgba(255,255,255,0.25),inset_0_-1.5px_0_rgba(0,0,0,0.25),0_4px_8px_rgba(0,0,0,0.15)] ring-1 ring-primary/20 ring-offset-background hover:ring-primary/40 hover:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.3),inset_0_-1.5px_0_rgba(0,0,0,0.3),0_6px_12px_rgba(0,0,0,0.2)] active:scale-[0.98] transition-all duration-200 rounded-lg",
        premium:
          "bg-linear-to-b from-primary/95 to-primary text-primary-foreground shadow-[inset_0_1.5px_0_rgba(255,255,255,0.25),inset_0_-1.5px_0_rgba(0,0,0,0.25),0_4px_8px_rgba(0,0,0,0.15)] ring-1 ring-primary/20 ring-offset-background hover:ring-primary/40 hover:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.3),inset_0_-1.5px_0_rgba(0,0,0,0.3),0_6px_12px_rgba(0,0,0,0.2)] active:scale-[0.98] transition-all duration-200 rounded-lg",
        destructive:
          "bg-linear-to-b from-destructive/95 to-destructive text-white shadow-[inset_0_1.5px_0_rgba(255,255,255,0.2),inset_0_-1.5px_0_rgba(0,0,0,0.2),0_2px_4px_rgba(0,0,0,0.1)] ring-1 ring-destructive/20 ring-offset-background hover:ring-destructive/40 hover:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.25),inset_0_-1.5px_0_rgba(0,0,0,0.25),0_4px_8px_rgba(0,0,0,0.15)] active:scale-[0.98] transition-all duration-200 rounded-lg",
        outline:
          "border border-input bg-linear-to-b from-background/95 to-background shadow-[0_1px_2px_rgba(0,0,0,0.05)] ring-1 ring-transparent ring-offset-background hover:bg-accent hover:text-accent-foreground hover:ring-input/40 active:scale-[0.98] transition-all duration-200 rounded-lg",
        secondary:
          "bg-linear-to-b from-secondary/95 to-secondary text-secondary-foreground shadow-[inset_0_1.5px_0_rgba(255,255,255,0.5),inset_0_-1.5px_0_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.1)] ring-1 ring-secondary-foreground/10 ring-offset-background hover:bg-secondary/80 hover:ring-secondary-foreground/20 active:scale-[0.98] transition-all duration-200 rounded-lg",
        ghost:
          "hover:bg-accent hover:text-accent-foreground active:scale-[0.98] transition-all duration-200 rounded-lg dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline transition-all duration-200 active:opacity-70",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
