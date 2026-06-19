import { describe, it, expect } from 'vitest';
import { CPFValidator } from './CPFValidator.js';

describe('CPFValidator', () => {
  describe('validar', () => {
    it('retorna true para CPF válido 52998224725', () => {
      expect(CPFValidator.validar('52998224725')).toBe(true);
    });

    it('retorna true para CPF válido com máscara', () => {
      expect(CPFValidator.validar('529.982.247-25')).toBe(true);
    });

    it('retorna true para outro CPF válido', () => {
      expect(CPFValidator.validar('11144477735')).toBe(true);
    });

    it('retorna false para todos dígitos iguais', () => {
      expect(CPFValidator.validar('11111111111')).toBe(false);
      expect(CPFValidator.validar('22222222222')).toBe(false);
      expect(CPFValidator.validar('00000000000')).toBe(false);
    });

    it('retorna false para CPF com primeiro dígito verificador errado', () => {
      expect(CPFValidator.validar('52998224724')).toBe(false);
    });

    it('retorna false para CPF com segundo dígito verificador errado', () => {
      expect(CPFValidator.validar('52998224726')).toBe(false);
    });

    it('retorna false para menos de 11 dígitos', () => {
      expect(CPFValidator.validar('123')).toBe(false);
      expect(CPFValidator.validar('')).toBe(false);
    });

    it('retorna false para mais de 11 dígitos', () => {
      expect(CPFValidator.validar('123456789012')).toBe(false);
    });

    it('retorna false para string com letras', () => {
      expect(CPFValidator.validar('abc')).toBe(false);
    });
  });
});
