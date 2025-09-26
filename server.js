// server.js  (ESM, vì package.json có "type": "module")
import 'dotenv/config';
import express from 'express';
import pkg from 'pg';
import Redis from 'ioredis';
console.log('DATABASE_URL=', process.env.DATABASE_URL);


const { Pool } = pkg;

// ====== ENV ======
const PORT = Number(process.env.PORT || 3000);
const DATABASE_URL = process.env.DATABASE_URL;
const REDIS_URL = process.env.REDIS_URL;

if (!DATABASE_URL) throw new Error('Missing DATABASE_URL in .env');
if (!REDIS_URL) throw new Error('Missing REDIS_URL in .env');

// ====== KẾT NỐI ======
const pg = new Pool({ connectionString: DATABASE_URL });
const redis = new Redis(REDIS_URL);

// ====== APP ======
const app = express();

app.get('/health', (_req, res) => {
  res.json({ ok: true, env: { NODE_ENV: process.env.NODE_ENV, PORT } });
});

app.get('/health/deps', async (_req, res) => {
  try {
    const r = await pg.query('select 1 as ok');
    const pong = await redis.ping();
    const dbOK = r.rows[0].ok === 1;
    const redisOK = pong === 'PONG';
    res.json({ ok: dbOK && redisOK, dbOK, redisOK });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});
