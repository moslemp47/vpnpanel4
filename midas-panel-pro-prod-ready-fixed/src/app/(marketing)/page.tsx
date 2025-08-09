'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function Home(){
  return (
    <main className="container py-16">
      <div className="flex flex-col items-center text-center gap-6">
        <Image src="/logo.svg" alt="logo" width={160} height={40}/>
        <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-4xl sm:text-6xl font-bold tracking-tight">
          Private Internet, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-indigo-500">Made Simple</span>
        </motion.h1>
        <p className="max-w-2xl opacity-80">Fast WireGuard® VPN with gorgeous UX. One click to get protected.</p>
        <div className="flex gap-3">
          <Link href="/pricing"><Button>See Pricing</Button></Link>
          <Link href="/dashboard"><Button variant="outline">Go to Dashboard</Button></Link>
        </div>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}} className="mt-12 w-full rounded-2xl border bg-neutral-50 dark:bg-neutral-900/50 p-6 shadow-soft">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div><strong>Zero Logs</strong><div className="opacity-70">Privacy-first</div></div>
            <div><strong>WireGuard</strong><div className="opacity-70">Modern protocol</div></div>
            <div><strong>Stripe</strong><div className="opacity-70">Secure billing</div></div>
            <div><strong>24/7</strong><div className="opacity-70">Uptime</div></div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
