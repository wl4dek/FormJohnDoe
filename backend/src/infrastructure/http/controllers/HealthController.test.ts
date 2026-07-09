import { describe, it, expect } from 'vitest';
import { HealthController } from './HealthController.js';

describe('HealthController', () => {
  it('deve retornar { status: "ok" }', () => {
    const result = new HealthController().check();
    expect(result).toEqual({ status: 'ok' });
  });
});
