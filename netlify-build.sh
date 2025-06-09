#!/bin/bash

echo "Building CUCA Beer for Netlify..."

# Set production environment
export NODE_ENV=production
export VITE_API_URL="https://cuca-beer.vercel.app"

# Install dependencies
echo "Installing dependencies..."
npm install --silent

# Build the client using existing npm script
echo "Building frontend..."
npm run build

# Create SPA redirects in the correct output directory
echo "Configuring SPA routing..."
echo "/*    /index.html   200" > dist/public/_redirects

# Verify build
if [ -f "dist/public/index.html" ]; then
    echo "Build completed successfully!"
    echo "Output: dist/public/"
    ls -la dist/public/
else
    echo "Build failed - index.html not found"
    exit 1
fi