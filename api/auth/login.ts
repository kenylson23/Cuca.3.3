import { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';

const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "cuca2024"
};

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
  
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  try {
    const { username, password } = req.body;
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const user = {
        id: "admin-1",
        username: "admin",
        email: "admin@cuca.ao",
        firstName: "Admin",
        lastName: "CUCA",
        role: "admin"
      };
      
      const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
      
      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Secure; SameSite=None; Max-Age=${7 * 24 * 60 * 60}; Path=/`);
      
      res.status(200).json({
        success: true,
        message: "Login realizado com sucesso",
        user: user
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Credenciais inválidas"
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}