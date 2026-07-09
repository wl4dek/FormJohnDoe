import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@nestjs/core', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@nestjs/core')>();
  const mockListen = vi.fn().mockResolvedValue(undefined);
  const mockEnableCors = vi.fn();
  return {
    ...actual,
    NestFactory: {
      create: vi.fn().mockResolvedValue({
        enableCors: mockEnableCors,
        listen: mockListen,
      }),
    },
  };
});

vi.mock('@nestjs/platform-fastify', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@nestjs/platform-fastify')>();
  return {
    ...actual,
    FastifyAdapter: vi.fn(),
  };
});

import { bootstrap } from './main.js';

describe('bootstrap', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve criar app com AppModule e FastifyAdapter', async () => {
    await bootstrap();

    const { NestFactory } = await import('@nestjs/core');
    expect(NestFactory.create).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(Object),
    );
  });

  it('deve habilitar CORS com credentials true', async () => {
    await bootstrap();

    const { NestFactory } = await import('@nestjs/core');
    const app = await vi.mocked(NestFactory.create).mock.results[0]!.value;
    expect(app.enableCors).toHaveBeenCalledWith({
      origin: expect.any(Array),
      credentials: true,
    });
  });

  it('deve escutar em 0.0.0.0 na porta configurada', async () => {
    await bootstrap();

    const { NestFactory } = await import('@nestjs/core');
    const app = await vi.mocked(NestFactory.create).mock.results[0]!.value;
    expect(app.listen).toHaveBeenCalledWith(expect.any(Number), '0.0.0.0');
  });
});
