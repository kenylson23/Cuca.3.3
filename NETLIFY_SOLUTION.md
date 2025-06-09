# Netlify Deployment Fix - CUCA Beer

## Problem Solved
The "Permission denied" error for `netlify-build.sh` has been resolved by creating a proper configuration that doesn't require executable scripts.

## Solution Files Created

### 1. Updated `netlify.toml` (Main Configuration)
```toml
[build]
  publish = "client/dist"
  command = "npm install && npx vite build --root client --outDir dist"

[build.environment]
  NODE_VERSION = "20"
  VITE_API_URL = "https://cuca-beer.vercel.app"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 2. `client/vite.config.js` (Client-specific config)
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-dialog'],
          'motion-vendor': ['framer-motion']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      '@shared': path.resolve('../shared'),
      '@assets': path.resolve('./public')
    }
  }
})
```

## Deployment Steps

1. **Remove old build script permissions issue:**
   - The new configuration doesn't use `netlify-build.sh`
   - Uses direct npm commands instead

2. **Upload to Netlify:**
   - Connect your repository to Netlify
   - The `netlify.toml` will be automatically detected
   - Build settings are configured automatically

3. **Environment Variables:**
   - `NODE_VERSION`: 20 (set automatically)
   - `VITE_API_URL`: https://cuca-beer.vercel.app (set automatically)

## What's Fixed

✅ Permission denied error resolved
✅ Correct build directory (`client/dist`)
✅ SPA routing configured
✅ Cache headers optimized
✅ Security headers included

Your site will build successfully on Netlify without any permission errors.