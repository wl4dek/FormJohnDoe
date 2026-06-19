import { describe, it, expect } from 'vitest';
import { Email } from './Email.js';
import { DomainError } from '../shared/errors/DomainError.js';

describe('Email', () => {
  describe('criar', () => {
    it('cria email válido', () => {
      const email = Email.criar('usuario@exemplo.com');
      expect(email).toBeInstanceOf(Email);
      expect(email.value).toBe('usuario@exemplo.com');
    });

    it('normaliza para minúsculo', () => {
      const email = Email.criar('Usuario@Exemplo.COM');
      expect(email.value).toBe('usuario@exemplo.com');
    });

    it('remove espaços ao redor', () => {
      const email = Email.criar('  usuario@exemplo.com  ');
      expect(email.value).toBe('usuario@exemplo.com');
    });

    it('aceita email com subdomínio', () => {
      const email = Email.criar('usuario@sub.exemplo.com');
      expect(email.value).toBe('usuario@sub.exemplo.com');
    });

    it('lança DomainError para email sem @', () => {
      expect(() => Email.criar('usuarioexemplo.com')).toThrow(DomainError);
    });

    it('lança DomainError para email sem domínio', () => {
      expect(() => Email.criar('usuario@')).toThrow(DomainError);
    });

    it('lança DomainError para email sem usuário', () => {
      expect(() => Email.criar('@exemplo.com')).toThrow(DomainError);
    });

    it('lança DomainError para email vazio', () => {
      expect(() => Email.criar('')).toThrow(DomainError);
    });

    it('lança DomainError para string com espaço', () => {
      expect(() => Email.criar('usuario @exemplo.com')).toThrow(DomainError);
    });
  });

  describe('equals', () => {
    it('retorna true para emails equivalentes', () => {
      const a = Email.criar('Usuario@Exemplo.COM');
      const b = Email.criar('usuario@exemplo.com');
      expect(a.equals(b)).toBe(true);
    });
  });
});
