import { describe, it, expect } from 'vitest';
import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule, formatValidationErrors } from './app.module.js';
import { DRIZZLE } from './infrastructure/persistence/drizzle/drizzle.provider.js';

describe('AppModule', () => {
  it('deve compilar com todos os providers', async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DRIZZLE)
      .useValue({})
      .compile();

    expect(module).toBeDefined();
    expect(module.get('IUserRepository')).toBeDefined();
    expect(module.get('REGISTER_USER_USE_CASE')).toBeDefined();
  });
});

describe('formatValidationErrors', () => {
  it('deve formatar erros no padrão da API', () => {
    const errors = [
      {
        property: 'fullName',
        constraints: { isNotEmpty: 'fullName não pode estar vazio' },
      },
      {
        property: 'cpf',
        constraints: { isCpf: 'cpf inválido' },
      },
    ] as any;

    const result = formatValidationErrors(errors);

    expect(result).toBeInstanceOf(BadRequestException);
    expect(result.getResponse()).toEqual({
      success: false,
      errors: [
        { field: 'fullName', message: 'fullName não pode estar vazio' },
        { field: 'cpf', message: 'cpf inválido' },
      ],
    });
  });

  it('deve usar string vazia quando constraints é undefined', () => {
    const errors = [{ property: 'field' }] as any;

    const result = formatValidationErrors(errors);

    expect(result.getResponse()).toEqual({
      success: false,
      errors: [{ field: 'field', message: '' }],
    });
  });
});
