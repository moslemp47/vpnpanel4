# syntax=docker/dockerfile:1

# --- base ---
FROM node:20-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

# --- deps ---
FROM base AS deps
RUN apk add --no-cache libc6-compat python3 make g++
COPY package*.json ./
npm install

# --- builder ---
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Ensure Prisma engines for build time
RUN npx prisma generate || true
RUN npm run build

# --- runner ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Next.js enables standalone output by default if configured; ensure .next/standalone exists
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

# Expose app port
ENV PORT=${APP_PORT:-3000}
EXPOSE $PORT

# Healthcheck (basic)
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD wget -qO- http://localhost:$PORT/ || exit 1

CMD ["node", "server.js"]
