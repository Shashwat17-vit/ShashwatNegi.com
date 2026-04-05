import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { contactRouter } from './routes/contact';

const app = express();
const PORT = process.env.PORT ?? 3001;

// ── CORS ─────────────────────────────────────────────────────────────────────
const isDev = process.env.NODE_ENV !== 'production';

const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // No origin = curl / Postman / server-to-server — always allow
      if (!origin) return callback(null, true);

      // In development, allow any localhost origin regardless of port
      if (isDev && /^http:\/\/localhost(:\d+)?$/.test(origin)) {
        return callback(null, true);
      }

      // In production, check against the explicit allowlist
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    methods: ['POST', 'OPTIONS'],
  })
);

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '16kb' }));

// ── Rate limiting ─────────────────────────────────────────────────────────────
// Max 5 contact submissions per IP per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/contact', limiter);

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/api/contact', contactRouter);

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
