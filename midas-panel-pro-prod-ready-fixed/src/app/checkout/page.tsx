import { redirect } from 'next/navigation'
import Stripe from 'stripe'
import { auth } from '@/lib/auth'

export default async function Checkout({ searchParams }: { searchParams: { price?: string }}){
  const session = await auth()
  if (!session) redirect('/login')
  const price = searchParams.price || process.env.STRIPE_PRICE_BASIC!
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' })
  const ck = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price, quantity: 1 }],
    success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=1`,
    cancel_url: `${process.env.NEXTAUTH_URL}/pricing`,
    customer_email: session.user?.email || undefined
  })
  redirect(ck.url!)
}
