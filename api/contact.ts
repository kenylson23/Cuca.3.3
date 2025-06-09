import { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import * as schema from '../shared/schema';

// Initialize database connection
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool, schema });

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
  
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'POST') {
      const { name, email, subject, message } = req.body;
      
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
      }

      const [newMessage] = await db.insert(schema.contactMessages).values({
        name,
        email,
        subject,
        message,
        status: 'unread'
      }).returning();

      return res.status(201).json({ 
        message: 'Mensagem enviada com sucesso!',
        id: newMessage.id 
      });
    }

    if (req.method === 'GET') {
      const messages = await db.select().from(schema.contactMessages);
      return res.status(200).json(messages);
    }

    return res.status(405).json({ message: 'Método não permitido' });
  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}