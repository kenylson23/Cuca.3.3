#!/usr/bin/env node

// Script para build do frontend para Netlify
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('Building client for Netlify deployment...');

try {
  // Set production environment
  process.env.NODE_ENV = 'production';
  
  // Execute vite build with production config
  execSync('vite build --config vite.config.production.ts', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
  
  // Create _redirects file for SPA routing
  const redirectsContent = '/*    /index.html   200\n';
  const distPath = path.join(__dirname, 'dist');
  
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
  }
  
  fs.writeFileSync(path.join(distPath, '_redirects'), redirectsContent);
  
  console.log('Client build completed successfully!');
  console.log('Output directory: dist/');
  console.log('SPA redirects configured');
  
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}