import { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { eq } from 'drizzle-orm';
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
  
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const { status } = req.query;
      
      if (status === 'approved') {
        const photos = await db.select().from(schema.fanPhotos).where(eq(schema.fanPhotos.status, 'approved'));
        return res.status(200).json(photos);
      } else if (status === 'pending') {
        const photos = await db.select().from(schema.fanPhotos).where(eq(schema.fanPhotos.status, 'pending'));
        return res.status(200).json(photos);
      }
      
      const photos = await db.select().from(schema.fanPhotos);
      return res.status(200).json(photos);
    }

    if (req.method === 'POST') {
      const { imageData, caption, name } = req.body;
      
      if (!imageData || !name) {
        return res.status(400).json({ message: 'Dados da imagem e nome são obrigatórios' });
      }

      const [newPhoto] = await db.insert(schema.fanPhotos).values({
        imageData,
        caption: caption || '',
        name,
        status: 'pending'
      }).returning();

      return res.status(201).json(newPhoto);
    }

    if (req.method === 'PUT') {
      const { id } = req.query;
      const { status, approvedBy } = req.body;
      
      if (!id || !status) {
        return res.status(400).json({ message: 'ID e status são obrigatórios' });
      }

      const [updatedPhoto] = await db
        .update(schema.fanPhotos)
        .set({ 
          status, 
          approvedBy: approvedBy || null,
          approvedAt: status === 'approved' ? new Date() : null
        })
        .where(eq(schema.fanPhotos.id, parseInt(id as string)))
        .returning();

      return res.status(200).json(updatedPhoto);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json({ message: 'ID é obrigatório' });
      }

      await db.delete(schema.fanPhotos).where(eq(schema.fanPhotos.id, parseInt(id as string)));
      return res.status(200).json({ message: 'Foto deletada com sucesso' });
    }

    return res.status(405).json({ message: 'Método não permitido' });
  } catch (error) {
    console.error('Fan Photos API error:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
}