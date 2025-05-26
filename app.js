import express from 'express';
import authRoutes from './src/routes/auth.js';
import uploadRoutes from './src/routes/upload.js';
import fileRoutes from './src/routes/files.js';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/upload', uploadRoutes);
app.use('/files', fileRoutes);
app.get('/health', (_, res) => res.send('OK'));

export default app;
