import { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import * as schema from '../../shared/schema';

// Initialize database connection
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema });

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Add CORS headers
  const origin = req.headers.origin;
  const allowedOrigins = [
    'https://cucatest.netlify.app',
    'https://cuca.netlify.app',
    'http://localhost:5173',
    'http://localhost:5000'
  ];
  
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin as string);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  // For now, return unauthorized since we don't have session management in Vercel
  return res.status(401).json({ message: 'Unauthorized' });
}