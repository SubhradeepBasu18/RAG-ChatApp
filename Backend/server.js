import express from 'express';
import cors from 'cors';
import {configDotenv} from 'dotenv';
import fileUploadRoutes from './routes/fileUpload.routes.js';
import chatRoutes from './routes/chat.routes.js';

configDotenv({quiet: true});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Disposition'],
  exposedHeaders: ['Content-Disposition']
}));

// Handle preflight requests
app.options('*', cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/upload', fileUploadRoutes);
app.use('/api/chat', chatRoutes);
app.use(express.static('public'));
app.use('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
