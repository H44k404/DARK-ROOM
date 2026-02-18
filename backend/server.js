import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import authRoutes from './server/routes/authRoutes.js';
import youtubeRoutes from './server/routes/youtubeRoutes.js';
import postRoutes from './server/routes/postRoutes.js';
import userRoutes from './server/routes/userRoutes.js';
import settingsRoutes from './server/routes/settingsRoutes.js';
import uploadRoutes from './server/routes/uploadRoutes.js';

import { init } from './server/socket.js';
import http from 'http';

const app = express();
const PORT = process.env.PORT || 5000;
const httpServer = http.createServer(app);

// Initialize Socket.io
const io = init(httpServer);

io.on('connection', (socket) => {
    console.log('Client connected: ' + socket.id);
    socket.on('disconnect', () => {
        console.log('Client disconnected: ' + socket.id);
    });
});

app.use(helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false
}));
app.use(cors()); // Allow Cross-Origin requests
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 1000, // Limit each IP to 1000 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use('/api', limiter);

// Static Files (for uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
// Contact Route
import { sendContactEmail } from './server/controllers/contactController.js';
app.post('/api/contact', sendContactEmail);

app.use('/api/auth', authRoutes);
app.use('/api/youtube', youtubeRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Dark Room API is running secure.' });
});

// Frontend is served by Nginx in production

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
