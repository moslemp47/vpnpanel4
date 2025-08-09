import NextAuth, { type NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { db } from './db'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const credsSchema = z.object({ email: z.string().email(), password: z.string().min(6) })

export const authConfig: NextAuthConfig = {
  session: { strategy: 'jwt', maxAge: 60*60*24*30 },
  jwt: { maxAge: 60*60*24*30 },
  pages: { signIn: '/login' },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const parsed = credsSchema.safeParse(credentials)
        if (!parsed.success) return null
        const user = await db.user.findUnique({ where: { email: parsed.data.email } })
        if (!user || !user.passwordHash) return null
        const ok = await bcrypt.compare(parsed.data.password, user.passwordHash)
        return ok ? { id: user.id, email: user.email, role: user.role } as any : null
      }
    })
  ],
  cookies: {
    sessionToken: { name: '__Host-next-auth.session-token', options: { httpOnly: true, secure: true, sameSite: 'lax', path: '/' } }
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role || 'USER'
      return token
    },
    async session({ session, token }) {
      if (session.user) (session.user as any).role = token.role
      return session
    }
  }
}
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
