import { db } from '@/lib/db'
import { auth } from '@/lib/auth'
export async function GET(){
  const s = await auth()
  if(!s || (s.user as any).role !== 'ADMIN') return new Response('Forbidden',{status:403})
  const users = await db.user.findMany({ select: { email:true, role:true, createdAt:true } })
  return Response.json(users.map(u=>({ email:u.email, role:u.role, status:'active' })))
}
