import 'dotenv/config';

function required(name: string, fallback?: string): string {
  const v = process.env[name] ?? fallback;
  if (!v) throw new Error(`Missing environment variable: ${name}`);
  return v;
}

export const ENV = {
  DATABASE_URL: required('DATABASE_URL'),
  REDIS_URL:    required('REDIS_URL'),
  PORT:         Number(required('PORT', '3000')),
};
