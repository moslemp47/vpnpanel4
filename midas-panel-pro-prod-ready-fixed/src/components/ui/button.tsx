import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: 'default'|'outline'|'ghost'
}
const variants = {
  default: 'btn btn-primary focus-ring',
  outline: 'btn border border-neutral-200 dark:border-neutral-800 bg-transparent',
  ghost: 'inline-flex items-center gap-2 rounded-2xl px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 focus-ring'
}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant='default', asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp ref={ref} className={cn(variants[variant], className)} {...props} />
  }
)
Button.displayName = 'Button'
