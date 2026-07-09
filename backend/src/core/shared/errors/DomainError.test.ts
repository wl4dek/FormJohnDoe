import { describe, it, expect } from 'vitest';
import { DomainError } from './DomainError.js';

describe('DomainError', () => {
  it('cria com mensagem', () => {
    const error = new DomainError('Erro de domínio');
    expect(error.message).toBe('Erro de domínio');
    expect(error.name).toBe('DomainError');
  });

  it('usa field padrão "general"', () => {
    const error = new DomainError('Erro');
    expect(error.field).toBe('general');
  });

  it('aceita field customizado', () => {
    const error = new DomainError('CPF inválido', 'cpf');
    expect(error.field).toBe('cpf');
  });

  it('é instância de Error', () => {
    const error = new DomainError('Erro');
    expect(error).toBeInstanceOf(Error);
  });

  it('lança e captura como DomainError', () => {
    try {
      throw new DomainError('teste', 'campo');
    } catch (e) {
      expect(e).toBeInstanceOf(DomainError);
      expect((e as DomainError).field).toBe('campo');
      expect((e as DomainError).message).toBe('teste');
    }
  });

  it('preserva cause quando fornecido', () => {
    const root = new Error('causa raiz');
    const error = new DomainError('erro de domínio', 'general', { cause: root });
    expect(error.cause).toBe(root);
  });
});
