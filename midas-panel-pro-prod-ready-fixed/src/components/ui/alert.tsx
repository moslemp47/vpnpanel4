export function Alert({title, description, variant='default'}:{title:string,description?:string,variant?:'default'|'destructive'|'success'}){
  const variants = {
    default:'border-neutral-200 dark:border-neutral-800',
    destructive:'border-red-300 dark:border-red-900 bg-red-50/50 dark:bg-red-950/30 text-red-800 dark:text-red-200',
    success:'border-emerald-300 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200'
  }
  return <div className={`rounded-2xl border p-4 ${variants[variant]}`}>
    <div className="font-medium">{title}</div>
    {description && <div className="text-sm opacity-80">{description}</div>}
  </div>
}
