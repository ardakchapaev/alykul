#!/bin/bash
set -e

SERVER="vps"
PROJECT_DIR="/opt/alykul"
REPO="https://github.com/ardakchapaev/alykul.git"

echo "=== Deploying Alykul to VPS ==="

# 1. Create project dir and clone/pull
ssh $SERVER "
  mkdir -p $PROJECT_DIR
  if [ -d $PROJECT_DIR/.git ]; then
    cd $PROJECT_DIR && git pull origin main
  else
    git clone $REPO $PROJECT_DIR
  fi
"

# 2. Create alykul database in existing postgres
ssh $SERVER "
  docker exec aihub-postgres psql -U postgres -c \"SELECT 1 FROM pg_database WHERE datname='alykul'\" | grep -q 1 || \
  docker exec aihub-postgres psql -U postgres -c \"CREATE USER alykul WITH PASSWORD 'alykul_secret'; CREATE DATABASE alykul OWNER alykul;\"
  echo 'Database ready'
"

# 3. Ensure aihub-net network exists
ssh $SERVER "
  docker network inspect aihub-net >/dev/null 2>&1 || docker network create aihub-net
  echo 'Network ready'
"

# 4. Build and start containers
ssh $SERVER "
  cd $PROJECT_DIR
  docker compose build --no-cache
  docker compose up -d
  echo 'Containers started'
"

# 5. Run seed data
ssh $SERVER "
  docker exec alykul-api python -m seed || echo 'Seed skipped (already seeded or error)'
"

# 6. Setup Nginx
ssh $SERVER "
  cp $PROJECT_DIR/infra/nginx/alykul.conf /etc/nginx/sites-available/alykul
  ln -sf /etc/nginx/sites-available/alykul /etc/nginx/sites-enabled/alykul
  nginx -t && systemctl reload nginx
  echo 'Nginx configured'
"

# 7. SSL certificate
ssh $SERVER "
  if [ ! -f /etc/letsencrypt/live/alykul.baimuras.pro/fullchain.pem ]; then
    certbot --nginx -d alykul.baimuras.pro --non-interactive --agree-tos --email ardakchapaev@gmail.com
    echo 'SSL certificate obtained'
  else
    echo 'SSL certificate already exists'
  fi
"

echo "=== Deploy complete ==="
echo "Frontend: https://alykul.baimuras.pro"
echo "API Docs: https://alykul.baimuras.pro/docs"
echo "Health:   https://alykul.baimuras.pro/health"
