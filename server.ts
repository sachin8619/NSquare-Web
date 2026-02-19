import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import apiRoutes from './routes/index.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Database Connection
  const connectDB = async () => {
    try {
      const uri = process.env.MONGODB_URI;
      if (uri) {
        mongoose.set('bufferCommands', false);
        await mongoose.connect(uri, {
          serverSelectionTimeoutMS: 5000,
        });
        console.log('MongoDB Connected');
      } else {
        console.log('MONGODB_URI not found. Running in offline mode with mock data.');
      }
    } catch (err: any) {
      console.error('MongoDB Connection Error:', err.message);
      console.log('Running in offline mode.');
    }
  };
  connectDB();

  // Middleware
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // API Routes
  app.use('/api', apiRoutes);

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, 'dist')));
    
    // SPA fallback
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
