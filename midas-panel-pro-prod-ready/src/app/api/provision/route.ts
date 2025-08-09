import { z } from 'zod'
import QRCode from 'qrcode'
import { auth } from '@/lib/auth'
import { createPeer } from '@/services/wireguard/local-docker'

const Req = z.object({ node: z.enum(['local','remote']).default('local') })

export async function POST(req: Request){
  const session = await auth()
  if(!session?.user?.email) return new Response('Unauthorized',{status:401})
  const body = await req.json()
  const { node } = Req.parse(body)
  // demo: local docker manager creates peer and returns config
  const peer = await createPeer(session.user.email)
  const config = `[Interface]
PrivateKey = ${peer.privateKey}
Address = ${peer.address}
DNS = 1.1.1.1

[Peer]
PublicKey = ${peer.serverPublicKey}
AllowedIPs = 0.0.0.0/0, ::/0
Endpoint = ${peer.endpoint}
PersistentKeepalive = 25
`
  const qr = await QRCode.toDataURL(config)
  return Response.json({ config, qr })
}
