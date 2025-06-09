#!/usr/bin/env node

// Script para build do frontend para Netlify
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building client for Netlify deployment...');

try {
  // Execute vite build
  execSync('npx vite build', { stdio: 'inherit' });
  
  // Create _redirects file for SPA routing
  const redirectsContent = '/*    /index.html   200\n';
  const distPath = path.join(process.cwd(), 'dist');
  
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
  }
  
  fs.writeFileSync(path.join(distPath, '_redirects'), redirectsContent);
  
  console.log('✅ Client build completed successfully!');
  console.log('📁 Output directory: dist/');
  console.log('🔄 SPA redirects configured');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}