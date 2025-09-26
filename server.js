// server.js (ESM) — dùng ENV module để đọc .env theo môi trường
import express from 'express';
import pkg from 'pg';
import Redis from 'ioredis';
import ENV from './src/config/env.js'; // ⬅️ module cấu hình bạn vừa tạo

const { Pool } = pkg;

const app = express();

// Kết nối Postgres & Redis theo ENV
const pgPool = new Pool({ connectionString: ENV.DATABASE_URL });
const redis  = new Redis(ENV.REDIS_URL);

// Health routes
app.get('/health', (_req, res) => {
  res.json({ ok: true, env: { nodeEnv: ENV.NODE_ENV, port: ENV.PORT } });
});

app.get('/health/deps', async (_req, res) => {
  try {
    const r = await pgPool.query('select 1 as ok');
    const pong = await redis.ping();
    res.json({
      ok: r.rows[0].ok === 1 && pong === 'PONG',
      dbOK: r.rows[0].ok === 1,
      redisOK: pong === 'PONG'
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.listen(ENV.PORT, () => {
  console.log(`API listening on http://localhost:${ENV.PORT} (${ENV.NODE_ENV})`);
});
