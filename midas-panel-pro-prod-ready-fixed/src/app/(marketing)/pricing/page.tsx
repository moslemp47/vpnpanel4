import { db } from '@/lib/db'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
export default async function Pricing(){
  const plans = await db.plan.findMany({ orderBy: { sort: 'asc' } })
  return (
    <main className="container py-16">
      <h1 className="text-4xl font-bold mb-8">Choose your plan</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {plans.map(p=> (
          <div key={p.id} className="rounded-2xl border p-6 shadow-soft">
            <div className="mb-2 text-xl font-semibold">{p.name}</div>
            <div className="mb-4 whitespace-pre-line opacity-80">{p.perks}</div>
            <Link href={`/checkout?price=${encodeURIComponent(p.stripePriceId)}`}><Button>Start</Button></Link>
          </div>
        ))}
      </div>
    </main>
  )
}
