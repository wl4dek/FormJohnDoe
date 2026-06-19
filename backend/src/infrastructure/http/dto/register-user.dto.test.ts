import { describe, it, expect } from 'vitest';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { RegisterUserDto } from './register-user.dto.js';

const validData = {
  fullName: 'João Silva',
  cpf: '52998224725',
  email: 'joao@email.com',
  color: 'blue',
};

async function validateDto(data: object) {
  const dto = plainToInstance(RegisterUserDto, data);
  return await validate(dto);
}

describe('RegisterUserDto', () => {
  describe('dados válidos', () => {
    it('passa na validação com todos os campos corretos', async () => {
      const errors = await validateDto(validData);
      expect(errors).toHaveLength(0);
    });

    it('passa na validação com observation opcional', async () => {
      const errors = await validateDto({ ...validData, observation: 'Obs' });
      expect(errors).toHaveLength(0);
    });

    it('passa na validação com CPF mascarado', async () => {
      const errors = await validateDto({ ...validData, cpf: '529.982.247-25' });
      expect(errors).toHaveLength(0);
    });

    it('passa na validação com email maiúsculo', async () => {
      const errors = await validateDto({ ...validData, email: 'JOAO@EMAIL.COM' });
      expect(errors).toHaveLength(0);
    });

    it('passa na validação com cor maiúscula', async () => {
      const errors = await validateDto({ ...validData, color: 'BLUE' });
      expect(errors).toHaveLength(0);
    });
  });

  describe('fullName', () => {
    it('falha com nome vazio', async () => {
      const errors = await validateDto({ ...validData, fullName: '' });
      expect(errors.some(e => e.property === 'fullName')).toBe(true);
    });

    it('falha com nome muito curto', async () => {
      const errors = await validateDto({ ...validData, fullName: 'Ab' });
      expect(errors.some(e => e.property === 'fullName')).toBe(true);
    });

    it('falha com nome contendo números', async () => {
      const errors = await validateDto({ ...validData, fullName: 'João 123' });
      expect(errors.some(e => e.property === 'fullName')).toBe(true);
    });
  });

  describe('cpf', () => {
    it('falha com CPF vazio', async () => {
      const errors = await validateDto({ ...validData, cpf: '' });
      expect(errors.some(e => e.property === 'cpf')).toBe(true);
    });

    it('falha com CPF com letras', async () => {
      const errors = await validateDto({ ...validData, cpf: 'abc' });
      expect(errors.some(e => e.property === 'cpf')).toBe(true);
    });

    it('falha com CPF com dígitos inválidos', async () => {
      const errors = await validateDto({ ...validData, cpf: '11111111111' });
      expect(errors.some(e => e.property === 'cpf')).toBe(true);
    });

    it('falha com CPF com menos de 11 dígitos', async () => {
      const errors = await validateDto({ ...validData, cpf: '1234567890' });
      expect(errors.some(e => e.property === 'cpf')).toBe(true);
    });

    it('transforma CPF removendo não-dígitos antes da validação', async () => {
      const errors = await validateDto({ ...validData, cpf: '529.982.247-25' });
      expect(errors).toHaveLength(0);
    });
  });

  describe('email', () => {
    it('falha com email vazio', async () => {
      const errors = await validateDto({ ...validData, email: '' });
      expect(errors.some(e => e.property === 'email')).toBe(true);
    });

    it('falha com email inválido', async () => {
      const errors = await validateDto({ ...validData, email: 'invalido' });
      expect(errors.some(e => e.property === 'email')).toBe(true);
    });

    it('falha com email sem domínio', async () => {
      const errors = await validateDto({ ...validData, email: 'usuario@' });
      expect(errors.some(e => e.property === 'email')).toBe(true);
    });
  });

  describe('color', () => {
    it('falha com cor vazia', async () => {
      const errors = await validateDto({ ...validData, color: '' });
      expect(errors.some(e => e.property === 'color')).toBe(true);
    });

    it('falha com cor inválida', async () => {
      const errors = await validateDto({ ...validData, color: 'invalid' });
      expect(errors.some(e => e.property === 'color')).toBe(true);
    });
  });
});
