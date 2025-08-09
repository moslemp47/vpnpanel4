import * as React from 'react'
export function useToast(){ 
  const [msg, setMsg] = React.useState<string | null>(null)
  const Toast = () => msg ? <div className="fixed bottom-4 right-4 rounded-xl bg-black/80 px-4 py-2 text-white shadow-soft">{msg}</div> : null
  return { toast:(m:string)=>{ setMsg(m); setTimeout(()=>setMsg(null),2500) }, Toast }
}
