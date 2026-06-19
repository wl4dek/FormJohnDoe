import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('dotenv/config', () => ({}));

beforeEach(() => {
  delete process.env.DATABASE_URL;
  delete process.env.PORT;
  delete process.env.CORS_ORIGIN;
  vi.resetModules();
});

describe('env', () => {
  it('usa valores padrão quando variáveis não estão definidas', async () => {
    const { env } = await import('./env.js');
    expect(env.databaseUrl).toBe('postgres://postgres:postgres@localhost:5432/form_john_doe');
    expect(env.port).toBe(3000);
    expect(env.corsOrigin).toEqual(['http://localhost:5173']);
  });

  it('lê DATABASE_URL da variável de ambiente', async () => {
    process.env.DATABASE_URL = 'postgres://user:pass@host:5432/db';
    const { env } = await import('./env.js');
    expect(env.databaseUrl).toBe('postgres://user:pass@host:5432/db');
  });

  it('lê PORT da variável de ambiente', async () => {
    process.env.PORT = '4000';
    const { env } = await import('./env.js');
    expect(env.port).toBe(4000);
  });

  it('converte CORS_ORIGIN em array', async () => {
    process.env.CORS_ORIGIN = 'http://a.com,http://b.com';
    const { env } = await import('./env.js');
    expect(env.corsOrigin).toEqual(['http://a.com', 'http://b.com']);
  });

  it('usa CORS_ORIGIN com origem única como array de 1 elemento', async () => {
    process.env.CORS_ORIGIN = 'http://localhost:3000';
    const { env } = await import('./env.js');
    expect(env.corsOrigin).toEqual(['http://localhost:3000']);
  });
});
