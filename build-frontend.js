#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🚀 Building CUCA Beer frontend for Netlify...');

try {
  // Set production environment
  process.env.NODE_ENV = 'production';
  process.env.VITE_API_URL = 'https://cuca-beer.vercel.app';
  
  console.log('📦 Installing dependencies...');
  execSync('npm ci', { stdio: 'inherit' });
  
  console.log('🔨 Building frontend...');
  execSync('vite build --config vite.config.production.ts', { 
    stdio: 'inherit',
    env: { ...process.env }
  });
  
  // Ensure client/dist directory exists
  const distPath = path.join(__dirname, 'client', 'dist');
  if (!fs.existsSync(distPath)) {
    console.error('❌ Build failed - dist directory not created');
    process.exit(1);
  }
  
  // Create _redirects file for SPA routing
  console.log('⚙️  Configuring SPA routing...');
  const redirectsContent = '/*    /index.html   200\n';
  fs.writeFileSync(path.join(distPath, '_redirects'), redirectsContent);
  
  console.log('✅ Frontend build completed successfully!');
  console.log('📁 Output directory: client/dist/');
  console.log('🔄 SPA redirects configured');
  
  // List build output
  const files = fs.readdirSync(distPath);
  console.log('📋 Build contents:', files.join(', '));
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}