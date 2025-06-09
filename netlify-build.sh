#!/bin/bash

echo "🚀 Building CUCA Beer for Netlify..."

# Set production environment
export NODE_ENV=production
export VITE_API_URL="https://cuca-beer.vercel.app"

# Install dependencies
echo "📦 Installing dependencies..."
npm install --silent

# Build the client
echo "🏗️ Building frontend..."
npx vite build --mode production

# Create SPA redirects
echo "🔄 Configuring SPA routing..."
echo "/*    /index.html   200" > dist/_redirects

# Verify build
if [ -f "dist/index.html" ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Output: dist/"
    ls -la dist/
else
    echo "❌ Build failed - index.html not found"
    exit 1
fi