// src/config/env.js  (ESM)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config as dotenvConfig } from 'dotenv';
import { expand as dotenvExpand } from 'dotenv-expand';
import { cleanEnv, str, port } from 'envalid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Nạp .env theo thứ tự ưu tiên:
 *   .env.<NODE_ENV>.local  >
 *   .env.<NODE_ENV>        >
 *   .env.local             >
 *   .env
 */
function loadEnvFiles(nodeEnv) {
  const cwd = process.cwd();
  const order = [
    `.env.${nodeEnv}.local`,
    `.env.${nodeEnv}`,
    `.env.local`,
    `.env`,
  ];
  for (const name of order) {
    const file = path.resolve(cwd, name);
    if (fs.existsSync(file)) {
      dotenvExpand(dotenvConfig({ path: file }));
    }
  }
}

const NODE_ENV = process.env.NODE_ENV || 'development';
loadEnvFiles(NODE_ENV);

// Validate & chuẩn hoá biến bắt buộc
export const ENV = cleanEnv(process.env, {
  NODE_ENV:  str({ choices: ['development', 'test', 'production'], default: 'development' }),
  PORT:      port({ default: 3000 }),
  DATABASE_URL: str(),
  REDIS_URL:    str(),
  SMTP_HOST:    str({ default: 'localhost' }),
  SMTP_PORT:    port({ default: 1025 }),
});

export default ENV;
