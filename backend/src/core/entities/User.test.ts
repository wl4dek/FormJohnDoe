import { describe, it, expect } from 'vitest';
import { User } from './User.js';
import { FullName } from '../value-objects/FullName.js';
import { CPF } from '../value-objects/CPF.js';
import { Email } from '../value-objects/Email.js';
import { Color } from '../value-objects/Color.js';

function makeUserProps() {
  return {
    fullName: FullName.create('João Silva'),
    cpf: CPF.criar('52998224725'),
    email: Email.criar('joao@email.com'),
    color: Color.create('blue'),
    observation: null,
    createdAt: new Date('2025-01-01'),
  };
}

describe('User', () => {
  describe('create', () => {
    it('cria usuário com todas as props', () => {
      const props = makeUserProps();
      const user = User.create(props);

      expect(user).toBeInstanceOf(User);
      expect(user.fullName.value).toBe('João Silva');
      expect(user.cpf.value).toBe('52998224725');
      expect(user.email.value).toBe('joao@email.com');
      expect(user.color.value).toBe('blue');
      expect(user.observation).toBeNull();
      expect(user.createdAt).toEqual(new Date('2025-01-01'));
    });

    it('gera id automaticamente se não fornecido', () => {
      const user = User.create(makeUserProps());
      expect(user.id).toBeDefined();
      expect(typeof user.id).toBe('string');
    });

    it('usa o id fornecido', () => {
      const user = User.create(makeUserProps(), 'custom-id-123');
      expect(user.id).toBe('custom-id-123');
    });

    it('usa data atual se createdAt não for fornecido', () => {
      const before = new Date();
      const user = User.create({
        fullName: FullName.create('João Silva'),
        cpf: CPF.criar('52998224725'),
        email: Email.criar('joao@email.com'),
        color: Color.create('blue'),
        observation: null,
      });
      const after = new Date();
      expect(user.createdAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(user.createdAt.getTime()).toBeLessThanOrEqual(after.getTime());
    });

    it('aceita observation preenchida', () => {
      const user = User.create({
        ...makeUserProps(),
        observation: 'Alguma observação',
      });
      expect(user.observation).toBe('Alguma observação');
    });
  });

  describe('equals', () => {
    it('retorna true para mesma instância', () => {
      const user = User.create(makeUserProps());
      expect(user.equals(user)).toBe(true);
    });

    it('retorna true para mesmo id', () => {
      const a = User.create(makeUserProps(), 'same-id');
      const b = User.create(makeUserProps(), 'same-id');
      expect(a.equals(b)).toBe(true);
    });

    it('retorna false para ids diferentes', () => {
      const a = User.create(makeUserProps(), 'id-1');
      const b = User.create(makeUserProps(), 'id-2');
      expect(a.equals(b)).toBe(false);
    });

    it('retorna false para null', () => {
      const user = User.create(makeUserProps());
      expect(user.equals(null as unknown as User)).toBe(false);
    });
  });
});
