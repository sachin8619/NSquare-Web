import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import pageRoutes from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Database Connection
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (uri) {
      // Disable buffering globally so queries fail fast if not connected
      // This allows our controller try/catch to serve fallback data immediately
      mongoose.set('bufferCommands', false);
      
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of default 30s
      });
      console.log('MongoDB Connected');
    } else {
      console.log('MONGODB_URI not found. Running in offline mode with mock data.');
    }
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    console.log('Running in offline mode.');
  }
};
connectDB();

// View Engine Setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/', pageRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).render('pages/404', { title: 'Page Not Found' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
