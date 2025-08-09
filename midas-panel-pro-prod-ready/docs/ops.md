# Ops, Security & Scale

- **Headers**: CSP, XFO=DENY, Referrer-Policy strict, Permissions-Policy minimal.
- **Auth**: NextAuth JWT, HttpOnly Secure cookies, bcrypt hashing. RBAC via `middleware.ts`.
- **Rate limit**: Upstash Redis sliding window.
- **Observability**: pino logger available via `lib/logger.ts`. Attach to routes/middleware as needed.
- **Health**: `/api/health` ready.
- **DB**: Prisma with indexes, safe `migrate deploy` on startup.
- **Zero-downtime**: `docker compose pull && docker compose up -d --remove-orphans`.
- **Backups**: configure Postgres dump via cron (not included).
- **WireGuard**: use either local `wg-manager` service or remote SSH module.
