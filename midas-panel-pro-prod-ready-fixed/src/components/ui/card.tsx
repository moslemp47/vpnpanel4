import * as React from 'react'
import { cn } from '@/lib/utils'
export function Card({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/60 p-6 shadow-soft', className)} {...props} />
}
export function CardHeader(props: React.HTMLAttributes<HTMLDivElement>){ return <div className="mb-4" {...props}/>}
export function CardTitle(props: React.HTMLAttributes<HTMLHeadingElement>){ return <h3 className="text-lg font-semibold" {...props}/>}
export function CardContent(props: React.HTMLAttributes<HTMLDivElement>){ return <div {...props}/>}
