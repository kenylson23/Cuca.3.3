import { VercelRequest, VercelResponse } from '@vercel/node';

// Simple test endpoint for Vercel
export default function handler(req: VercelRequest, res: VercelResponse) {
  // Add CORS headers
  const origin = req.headers.origin;
  const allowedOrigins = [
    'https://cucatest.netlify.app',
    'https://cuca.netlify.app',
    'https://incomparable-tartufo-db7f34.netlify.app',
    'http://localhost:5173',
    'http://localhost:5000'
  ];
  
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin as string);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  res.status(200).json({ 
    message: 'CUCA API funcionando!',
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString()
  });
}