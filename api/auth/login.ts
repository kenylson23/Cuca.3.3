import { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcrypt';

// Admin credentials
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "cuca2024"
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
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
  
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  try {
    const { username, password } = req.body;
    
    // Check admin credentials
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // Set session cookie
      const sessionData = {
        id: "admin-1",
        username: "admin",
        email: "admin@cuca.ao",
        firstName: "Admin",
        lastName: "CUCA",
        role: "admin"
      };
      
      // For now, just return success without session storage
      // Session management would need Redis or similar for serverless
      res.status(200).json({
        success: true,
        message: "Login realizado com sucesso",
        user: sessionData
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