#!/usr/bin/env bash
set -euo pipefail

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is required. Please install Docker and try again."
  exit 1
fi

if ! command -v docker compose >/dev/null 2>&1; then
  echo "Docker Compose V2 is required. Please install it and try again."
  exit 1
fi

# Generate .env if missing
if [ ! -f ".env" ]; then
  echo "Creating .env from .env.example ..."
  cp .env.example .env
  # Generate random NEXTAUTH_SECRET if not set
  sed -i.bak "s|^NEXTAUTH_SECRET=.*|NEXTAUTH_SECRET=$(openssl rand -hex 32)|" .env || true
fi

# Open ports (Linux ufw if available)
if command -v ufw >/dev/null 2>&1; then
  sudo ufw allow ${APP_PORT:-3000}/tcp || true
  sudo ufw allow 51820/udp || true
  sudo ufw allow 51821/tcp || true
  sudo ufw allow 5432/tcp || true
  sudo ufw allow 6379/tcp || true
fi

echo "Starting services..."
docker compose -f docker-compose.prod.yml up -d

# Run prisma migrate deploy + seed inside the frontend container
APP_CONTAINER=$(docker ps --format '{{.Names}}' | grep midas-frontend || true)
if [ -n "$APP_CONTAINER" ]; then
  echo "Running Prisma migrations..."
  docker exec -e DATABASE_URL -e NODE_ENV=production "$APP_CONTAINER" npx prisma migrate deploy || true
  echo "Seeding database..."
  docker exec -e DATABASE_URL -e NODE_ENV=production "$APP_CONTAINER" node prisma/seed.cjs 2>/dev/null || \
  docker exec -e DATABASE_URL -e NODE_ENV=production "$APP_CONTAINER" ts-node --transpile-only prisma/seed.ts 2>/dev/null || true
fi

echo "All done!"
