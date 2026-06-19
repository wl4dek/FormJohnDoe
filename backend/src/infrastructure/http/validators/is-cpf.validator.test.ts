import { describe, it, expect } from 'vitest';
import { IsCPFConstraint } from './is-cpf.validator.js';

describe('IsCPFConstraint', () => {
  it('valida CPF com dígitos corretos', () => {
    const validator = new IsCPFConstraint();
    expect(validator.validate('52998224725')).toBe(true);
  });

  it('valida CPF com máscara', () => {
    const validator = new IsCPFConstraint();
    expect(validator.validate('529.982.247-25')).toBe(true);
  });

  it('rejeita CPF com dígitos iguais', () => {
    const validator = new IsCPFConstraint();
    expect(validator.validate('11111111111')).toBe(false);
  });

  it('rejeita CPF com checksum errado', () => {
    const validator = new IsCPFConstraint();
    expect(validator.validate('12345678901')).toBe(false);
  });

  it('rejeita CPF muito curto', () => {
    const validator = new IsCPFConstraint();
    expect(validator.validate('123')).toBe(false);
  });

  it('retorna mensagem padrão', () => {
    const validator = new IsCPFConstraint();
    expect(validator.defaultMessage()).toBe('CPF inválido');
  });
});
