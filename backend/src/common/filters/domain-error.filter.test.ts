import { describe, it, expect, vi } from 'vitest';
import { DomainErrorFilter } from './domain-error.filter.js';
import { DomainError } from '../../core/shared/errors/DomainError.js';
import type { ArgumentsHost } from '@nestjs/common';

describe('DomainErrorFilter', () => {
  function makeMockHost() {
    const send = vi.fn();
    const status = vi.fn().mockReturnValue({ send });
    const reply = { status, send };
    const host = {
      switchToHttp: () => ({
        getResponse: () => reply,
      }),
    } as unknown as ArgumentsHost;
    return { host, reply, status, send };
  }

  it('captura DomainError e retorna status 400', () => {
    const { host, status } = makeMockHost();
    const filter = new DomainErrorFilter();

    filter.catch(new DomainError('Erro de teste'), host);

    expect(status).toHaveBeenCalledWith(400);
  });

  it('retorna corpo com success false e errors contendo field e message', () => {
    const { host, send } = makeMockHost();
    const filter = new DomainErrorFilter();

    filter.catch(new DomainError('CPF inválido', 'cpf'), host);

    expect(send).toHaveBeenCalledWith({
      success: false,
      errors: [{ field: 'cpf', message: 'CPF inválido' }],
    });
  });

  it('usa field "general" quando não especificado', () => {
    const { host, send } = makeMockHost();
    const filter = new DomainErrorFilter();

    filter.catch(new DomainError('Erro genérico'), host);

    expect(send).toHaveBeenCalledWith({
      success: false,
      errors: [{ field: 'general', message: 'Erro genérico' }],
    });
  });

  it('ignora erros que não são DomainError (passa para próximo filtro)', () => {
    const { host } = makeMockHost();
    const filter = new DomainErrorFilter();

    expect(() =>
      filter.catch(new Error('Normal error') as unknown as DomainError, host),
    ).not.toThrow();
  });
});
