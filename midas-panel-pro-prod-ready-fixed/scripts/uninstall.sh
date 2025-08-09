#!/usr/bin/env bash
set -euo pipefail

read -p "This will stop containers and remove volumes. Continue? [y/N] " yn
case $yn in
  [Yy]* ) ;;
  * ) echo "Aborted."; exit 0;;
esac

docker compose -f docker-compose.prod.yml down -v
echo "Removing wireguard configs (if any)..."
rm -rf wireguard || true
echo "Uninstalled."
