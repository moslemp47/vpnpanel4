import { Redis } from '@upstash/redis'
export const redis = process.env.REDIS_URL ? Redis.fromEnv() : undefined
