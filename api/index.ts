import { VercelRequest, VercelResponse } from '@vercel/node';
import express, { type Request, Response, NextFunction } from 'express';
import { registerRoutes } from '../server/routes';

let app: express.Application | null = null;

async function initializeApp(): Promise<express.Application> {
  if (app) return app;
  
  const expressApp = express();
  expressApp.use(express.json({ limit: '10mb' }));
  expressApp.use(express.urlencoded({ extended: false, limit: '10mb' }));
  
  // Add CORS headers for Netlify frontend
  expressApp.use((req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin;
    const allowedOrigins = [
      'https://cucatest.netlify.app',
      'https://cuca.netlify.app',
      'http://localhost:5173',
      'http://localhost:5000'
    ];
    
    if (allowedOrigins.includes(origin as string)) {
      res.header('Access-Control-Allow-Origin', origin);
    }
    
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie');
    res.header('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });
  
  // Setup API routes
  const server = await registerRoutes(expressApp);
  
  app = expressApp;
  return app;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const expressApp = await initializeApp();
    
    // Convert Vercel request/response to Express format
    const expressReq = req as any;
    const expressRes = res as any;
    
    // Handle the request through Express
    expressApp(expressReq, expressRes);
  } catch (error) {
    console.error('Vercel handler error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}