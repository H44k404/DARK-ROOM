#!/bin/bash

# Dark Room Server Setup Script (Frontend/Backend folders)

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

# 3. Setup Project Structure
# We assume the repo structure is:
# /deployment
# /frontend
# /backend

# 4. Backend Setup
echo "🔙 Setting up Backend..."
cd backend
npm install
# Generate Prisma Client
npx prisma generate
# Push Database Schema (in backend dir)
if [ ! -f "prod.db" ]; then
    echo "🗄️ Initializing SQLite DB..."
    touch prod.db
fi
npx prisma db push

# 5. Frontend Setup
echo "frontend Setting up Frontend..."
cd ../frontend
npm install
echo "🏗️ Building React App..."
npm run build

echo "📂 deploying to /var/www/darkroom..."
sudo mkdir -p /var/www/darkroom
sudo rm -rf /var/www/darkroom/*
sudo cp -r dist/* /var/www/darkroom/

# 6. Configure Nginx
echo "🌐 Configuring Nginx..."
cd .. # Back to root
sudo cp deployment/nginx.conf /etc/nginx/sites-available/default
# Set permissions for uploads folder (so Nginx can read it)
# Make sure backend uploads folder exists
mkdir -p backend/uploads
chmod 755 backend/uploads || true

echo "🔄 Restarting Nginx..."
sudo nginx -t
sudo systemctl restart nginx

# 7. Backend Env Setup
cd backend
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

# 8. Start Backend
echo "🚀 Starting Backend with PM2..."
pm2 delete darkroom 2>/dev/null || true
pm2 start server.js --name darkroom --env production
pm2 save

echo "🎉 Deployment Complete!"
echo "👉 Site: http://$(curl -s ifconfig.me)"
