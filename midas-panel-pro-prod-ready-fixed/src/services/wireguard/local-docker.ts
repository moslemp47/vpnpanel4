export type Peer = { id: string; publicKey: string; address: string; allowedIPs: string }
export async function createPeer(email: string){
  const res = await fetch(`${process.env.WG_MANAGER_URL}/peers`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email }) })
  if(!res.ok) throw new Error('wg-manager error')
  return res.json()
}
export async function deletePeer(id: string){ return fetch(`${process.env.WG_MANAGER_URL}/peers/${id}`, { method: 'DELETE' }) }
export async function listPeers(){ const r = await fetch(`${process.env.WG_MANAGER_URL}/peers`); return r.json() }
