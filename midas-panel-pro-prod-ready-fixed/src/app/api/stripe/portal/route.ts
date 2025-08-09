import Stripe from 'stripe'
import { auth } from '@/lib/auth'

export async function POST(){
  const session = await auth()
  if(!session?.user?.email) return new Response('Unauthorized',{status:401})
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' })
  const portal = await stripe.billingPortal.sessions.create({
    customer_email: session.user.email,
    return_url: process.env.STRIPE_PORTAL_RETURN_URL || `${process.env.NEXTAUTH_URL}/dashboard`
  } as any)
  return Response.json({ url: portal.url })
}
