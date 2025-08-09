#!/usr/bin/env bash
set -euo pipefail
sudo apt-get update
sudo apt-get install -y fail2ban ufw
sudo ufw allow OpenSSH
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 51820/udp
yes | sudo ufw enable
echo "Server initialized."
