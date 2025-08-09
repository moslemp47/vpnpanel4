import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
export async function GET(){
  const session = await auth()
  if(!session) return new Response('Unauthorized',{status:401})
  const [user, sub] = await Promise.all([
    db.user.findUnique({ where: { email: session.user?.email! }, select: { id:true, email:true, role:true } }),
    db.subscription.findFirst({ where: { user: { email: session.user?.email! } }, orderBy: { createdAt: 'desc' } })
  ])
  return Response.json({ user, subscription: sub })
}
