import { headers } from 'next/headers'
import Stripe from 'stripe'
import { db } from '@/lib/db'

export async function POST(req: Request){
  const body = await req.text()
  const sig = (await headers()).get('stripe-signature')!
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' })
  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (e:any){
    return new Response(`Webhook Error: ${e.message}`, { status: 400 })
  }
  if (event.type === 'checkout.session.completed'){
    const s = event.data.object as Stripe.Checkout.Session
    const customerEmail = s.customer_details?.email
    if (customerEmail){
      const user = await db.user.upsert({ where: { email: customerEmail }, update: {}, create: { email: customerEmail }})
      await db.order.upsert({
        where: { stripeId: s.id },
        create: { stripeId: s.id, userId: user.id, amount: (s.amount_total||0), currency: s.currency||'usd', status: 'paid' },
        update: { status: 'paid' }
      })
    }
  }
  if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.created'){
    const sub = event.data.object as Stripe.Subscription
    const email = (sub as any).items?.data?.[0]?.price?.metadata?.email
    if (email){
      const user = await db.user.findUnique({ where: { email } })
      if (user){
        await db.subscription.upsert({
          where: { id: sub.id },
          update: { status: sub.status, currentPeriodEnd: new Date(sub.current_period_end*1000), cancelAtPeriodEnd: sub.cancel_at_period_end, priceId: sub.items.data[0].price.id },
          create: { id: sub.id, userId: user.id, status: sub.status, currentPeriodEnd: new Date(sub.current_period_end*1000), cancelAtPeriodEnd: sub.cancel_at_period_end, priceId: sub.items.data[0].price.id }
        })
      }
    }
  }
  return new Response('ok', { status: 200 })
}
