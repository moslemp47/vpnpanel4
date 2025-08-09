export function cn(...a:(string|undefined|false|null)[]){ return a.filter(Boolean).join(' ') }
export const isProd = process.env.NODE_ENV === 'production'
