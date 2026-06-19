import { describe, it, expect } from 'vitest';
import { CPF } from './CPF.js';
import { DomainError } from '../shared/errors/DomainError.js';

describe('CPF', () => {
  describe('criar', () => {
    it('cria CPF com 11 dígitos válidos', () => {
      const cpf = CPF.criar('52998224725');
      expect(cpf).toBeInstanceOf(CPF);
      expect(cpf.value).toBe('52998224725');
    });

    it('cria CPF a partir de valor mascarado', () => {
      const cpf = CPF.criar('529.982.247-25');
      expect(cpf.value).toBe('52998224725');
    });

    it('cria CPF ignorando caracteres não-dígitos', () => {
      const cpf = CPF.criar('abc529.982.247-25xyz');
      expect(cpf.value).toBe('52998224725');
    });

    it('lança DomainError para CPF com dígitos iguais', () => {
      expect(() => CPF.criar('11111111111')).toThrow(DomainError);
    });

    it('lança DomainError para CPF com dígitos verificadores errados', () => {
      expect(() => CPF.criar('12345678901')).toThrow(DomainError);
    });

    it('lança DomainError para CPF com menos de 11 dígitos', () => {
      expect(() => CPF.criar('123')).toThrow(DomainError);
    });

    it('lança DomainError para CPF vazio', () => {
      expect(() => CPF.criar('')).toThrow(DomainError);
    });

    it('lança DomainError com field "general"', () => {
      try {
        CPF.criar('12345678901');
      } catch (e) {
        expect(e).toBeInstanceOf(DomainError);
        expect((e as DomainError).field).toBe('general');
      }
    });
  });

  describe('formatado', () => {
    it('retorna CPF formatado 000.000.000-00', () => {
      const cpf = CPF.criar('52998224725');
      expect(cpf.formatado).toBe('529.982.247-25');
    });
  });

  describe('equals', () => {
    it('retorna true para CPFs com mesmo valor', () => {
      const a = CPF.criar('52998224725');
      const b = CPF.criar('52998224725');
      expect(a.equals(b)).toBe(true);
    });

    it('retorna false para CPFs com valores diferentes', () => {
      const a = CPF.criar('52998224725');
      const b = CPF.criar('11144477735');
      expect(a.equals(b)).toBe(false);
    });

    it('retorna false para null', () => {
      const a = CPF.criar('52998224725');
      expect(a.equals(null as unknown as CPF)).toBe(false);
    });
  });
});
