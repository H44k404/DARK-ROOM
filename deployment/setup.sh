#!/bin/bash

# Dark Room Server Setup Script (Separated Architecture)

set -e # Exit on error

echo "🚀 Starting Deployment..."

# 1. Update & Install Dependencies
echo "📦 Updating system & installing tools..."
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx

# 2. Install PM2
echo "⚙️ Installing PM2..."
sudo npm install -g pm2

# 3. Backend Setup
echo "🔙 Setting up Backend..."
# Assume we are in the project root
npm install
# Generate Prisma Client
npx prisma generate
# Push Database Schema
if [ ! -f "prod.db" ]; then
    echo "🗄️ Initializing SQLite DB..."
    touch prod.db
fi
npx prisma db push

# 4. Frontend Setup
echo "frontend Setting up Frontend..."
echo "🏗️ Building React App..."
npm run build

echo "📂 deploying to /var/www/darkroom..."
sudo mkdir -p /var/www/darkroom
sudo rm -rf /var/www/darkroom/*
sudo cp -r dist/* /var/www/darkroom/

# 5. Configure Nginx
echo "🌐 Configuring Nginx..."
sudo cp deployment/nginx.conf /etc/nginx/sites-available/default
# Set permissions for uploads folder (so Nginx can read it)
chmod 755 /home/ubuntu/dark-room/uploads || true

echo "🔄 Restarting Nginx..."
sudo nginx -t
sudo systemctl restart nginx

# 6. Backend Env Setup
if [ ! -f .env ]; then
    echo "⚠️ Setup .env file..."
    cat > .env << EOL
PORT=5000
DATABASE_URL="file:./prod.db"
JWT_SECRET="$(openssl rand -hex 32)"
NODE_ENV="production"
# Cloudinary Keys needed here
EOL
    echo "✅ Created .env template."
fi

# 7. Start Backend
echo "🚀 Starting Backend with PM2..."
pm2 delete darkroom 2>/dev/null || true
pm2 start server.js --name darkroom --env production
pm2 save

echo "🎉 Deployment Complete!"
echo "👉 Site: http://$(curl -s ifconfig.me)"
