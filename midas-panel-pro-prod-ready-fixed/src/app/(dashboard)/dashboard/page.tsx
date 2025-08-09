'use client'
import useSWR from 'swr'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'

const fetcher = (u:string)=> fetch(u).then(r=>r.json())

export default function Dashboard(){
  const { data } = useSWR('/api/me', fetcher)
  const { toast, Toast } = useToast()
  const sub = data?.subscription
  return (
    <div className="container py-8 grid gap-6">
      <Card>
        <CardHeader><CardTitle>Welcome back{data?.user?.email ? `, ${data.user.email}` : ''} 👋</CardTitle></CardHeader>
        <CardContent className="grid sm:grid-cols-3 gap-4">
          <div><div className="text-xs opacity-70 mb-1">Status</div><div className="text-lg font-semibold">{sub?.status ?? '—'}</div></div>
          <div><div className="text-xs opacity-70 mb-1">Next renewal</div><div className="text-lg font-semibold">{sub?.currentPeriodEnd ? new Date(sub.currentPeriodEnd).toLocaleDateString(): '—'}</div></div>
          <div><Button onClick={()=>toast('Copied config URL!')}>Get Config / QR</Button></div>
        </CardContent>
      </Card>
      <Toast/>
    </div>
  )
}
