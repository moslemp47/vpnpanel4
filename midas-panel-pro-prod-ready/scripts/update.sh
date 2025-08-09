#!/usr/bin/env bash
set -euo pipefail

echo "Pulling latest image and restarting..."
docker compose -f docker-compose.prod.yml pull frontend || true
docker compose -f docker-compose.prod.yml up -d --no-deps frontend
echo "Running Prisma migrations..."
APP_CONTAINER=$(docker ps --format '{{.Names}}' | grep midas-frontend || true)
if [ -n "$APP_CONTAINER" ]; then
  docker exec -e DATABASE_URL -e NODE_ENV=production "$APP_CONTAINER" npx prisma migrate deploy || true
fi
echo "Updated."
