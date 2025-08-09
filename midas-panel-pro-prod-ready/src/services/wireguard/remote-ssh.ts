import { Client } from 'ssh2'
export function runSSH(host:string, user:string, key:string, cmd:string): Promise<string>{
  return new Promise((resolve,reject)=>{
    const conn = new Client()
    conn.on('ready', ()=>{
      conn.exec(cmd, (err, stream)=>{
        if(err) return reject(err)
        let out=''
        stream.on('data', (d:any)=> out+=d.toString())
        stream.on('close', ()=>{ conn.end(); resolve(out) })
      })
    }).on('error', reject).connect({ host, username: user, privateKey: key })
  })
}
export async function addPeer(publicKey:string, allowedIPs:string){
  const out = await runSSH(process.env.WG_SSH_HOST!, process.env.WG_SSH_USER!, process.env.WG_SSH_KEY!, `sudo wg set wg0 peer ${publicKey} allowed-ips ${allowedIPs} && sudo wg-quick save wg0 && echo ok`)
  return out.includes('ok')
}
