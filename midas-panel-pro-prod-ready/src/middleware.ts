import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'
import { redis } from './lib/redis'
import { Ratelimit } from '@upstash/ratelimit'

const ratelimit = redis ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(100, '10 m') }) : undefined

export async function middleware(req: NextRequest) {
  // Rate limit
  if (ratelimit) {
    const ip = req.ip ?? '127.0.0.1'
    const { success } = await ratelimit.limit(`mw:${ip}`)
    if (!success) return new NextResponse('Too Many Requests', { status: 429 })
  }
  const url = req.nextUrl
  const isDashboard = url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/admin')

  if (isDashboard) {
    const session = await auth()
    if (!session) return NextResponse.redirect(new URL('/login', url))
    const role = (session.user as any).role
    if (url.pathname.startsWith('/admin') && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', url))
    }
  }
  return NextResponse.next()
}

export const config = { matcher: ['/dashboard/:path*', '/admin/:path*', '/api/:path*'] }
