import { describe, it, expect } from 'vitest';
import { FullName } from './FullName.js';
import { DomainError } from '../shared/errors/DomainError.js';

describe('FullName', () => {
  describe('create', () => {
    it('cria nome válido', () => {
      const name = FullName.create('João Silva');
      expect(name).toBeInstanceOf(FullName);
      expect(name.value).toBe('João Silva');
    });

    it('remove espaços ao redor', () => {
      const name = FullName.create('  Maria Souza  ');
      expect(name.value).toBe('Maria Souza');
    });

    it('aceita nome com acentos', () => {
      const name = FullName.create('José Almeida de Sá');
      expect(name.value).toBe('José Almeida de Sá');
    });

    it('aceita nome com 3 caracteres', () => {
      const name = FullName.create('Ana');
      expect(name.value).toBe('Ana');
    });

    it('lança DomainError para nome vazio', () => {
      expect(() => FullName.create('')).toThrow(DomainError);
    });

    it('lança DomainError para nome com menos de 3 caracteres', () => {
      expect(() => FullName.create('Ab')).toThrow(DomainError);
      expect(() => FullName.create('  A  ')).toThrow(DomainError);
    });

    it('lança DomainError para nome só com espaços', () => {
      expect(() => FullName.create('   ')).toThrow(DomainError);
    });

    it('lança DomainError para nome com números', () => {
      expect(() => FullName.create('João Silva 123')).toThrow(DomainError);
    });

    it('lança DomainError para nome com caracteres especiais', () => {
      expect(() => FullName.create('João @Silva')).toThrow(DomainError);
    });

    it('lança DomainError para nome muito longo', () => {
      expect(() => FullName.create('A'.repeat(256))).toThrow(DomainError);
    });

    it('aceita nome com 255 caracteres', () => {
      const name = FullName.create('A'.repeat(255));
      expect(name.value).toHaveLength(255);
    });

    it('lança DomainError com mensagem específica', () => {
      try {
        FullName.create('Ab');
      } catch (e) {
        expect(e).toBeInstanceOf(DomainError);
        expect((e as DomainError).message).toContain('3');
      }
    });
  });
});
