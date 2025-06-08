import { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.SESSION_SECRET || "cuca-admin-secret-key-2024";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin;
  const allowedOrigins = [
    'https://cucatest.netlify.app',
    'https://cuca.netlify.app',
    'http://localhost:5173',
    'http://localhost:5000'
  ];
  
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  try {
    const cookies = req.headers.cookie;
    const token = cookies?.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    res.status(200).json(decoded);
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}