require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// ─── MongoDB Connection (with auto-reconnect) ──────────────────────────────────
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS:          45000,
      connectTimeoutMS:         10000,
      heartbeatFrequencyMS:     10000,
    });
    console.log('✅  MongoDB connected successfully');
    require('./db/seed');
  } catch (err) {
    console.error('❌  MongoDB connection error:', err.message);
    console.log('🔄  Retrying MongoDB in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected — reconnecting...');
  setTimeout(connectDB, 3000);
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err.message);
});

connectDB();

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: (origin, callback) => {
    // Allow any localhost port in dev, or the configured FRONTEND_URL in prod
    const allowed = [
      process.env.FRONTEND_URL,
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:4173',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5175',
    ].filter(Boolean);
    if (!origin || allowed.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Serve uploaded files as static assets
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth',          require('./routes/auth'));
app.use('/api/projects',      require('./routes/projects'));
app.use('/api/blogs',         require('./routes/blogs'));
app.use('/api/testimonials',  require('./routes/testimonials'));
app.use('/api/inquiries',     require('./routes/inquiries'));
app.use('/api/careers',       require('./routes/careers'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/stats',         require('./routes/stats'));
app.use('/api/upload',        require('./routes/upload'));
app.use('/api/settings',      require('./routes/settings'));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: '🏗️  Stryper API is running',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    version: '2.0.0'
  });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  if (!res.headersSent) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Internal Server Error'
    });
  }
});

// ─── Catch unhandled promise rejections — prevent crash ───────────────────────
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Promise Rejection:', reason);
  // Do NOT exit — keep server running
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  // Do NOT exit for non-fatal errors
});

// ─── Start Server ─────────────────────────────────────────────────────────────
const startServer = () => {
  const server = app.listen(PORT, () => {
    console.log(`✅  Stryper backend running at http://localhost:${PORT}`);
  });

  // Increase keep-alive and timeout to prevent ECONNRESET
  server.keepAliveTimeout = 65000;
  server.headersTimeout   = 66000;
  server.timeout          = 60000;

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️  Port ${PORT} busy — killing existing process...`);
      const { exec } = require('child_process');
      const killCmd = process.platform === 'win32'
        ? `FOR /F "tokens=5" %i IN ('netstat -aon ^| findstr :${PORT} ^| findstr LISTENING') DO taskkill /PID %i /F`
        : `fuser -k ${PORT}/tcp`;
      exec(killCmd, () => {
        setTimeout(() => {
          console.log(`🔄  Retrying on port ${PORT}...`);
          startServer();
        }, 1500);
      });
    } else {
      console.error('Server error:', err.message);
    }
  });
};

startServer();
