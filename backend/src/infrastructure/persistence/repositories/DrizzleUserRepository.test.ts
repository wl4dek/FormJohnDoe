import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DrizzleUserRepository } from './DrizzleUserRepository.js';
import { DomainError } from '../../../core/shared/errors/DomainError.js';
import { User } from '../../../core/entities/User.js';
import { FullName, CPF, Email, Color } from '../../../core/value-objects/index.js';

function makeUser(): User {
  return User.create({
    fullName: FullName.create('João Silva'),
    cpf: CPF.criar('52998224725'),
    email: Email.criar('joao@email.com'),
    color: Color.create('blue'),
    observation: null,
  });
}

function makeMockDb() {
  const values = vi.fn<(...args: [object]) => Promise<void>>();
  const insert = vi.fn().mockReturnValue({ values });

  const limit = vi.fn<() => Promise<object[]>>();
  const where = vi.fn().mockReturnValue({ limit });
  const from = vi.fn().mockReturnValue({ where });
  const select = vi.fn().mockReturnValue({ from });

  return { insert, select, values, limit, where, from } as any;
}

describe('DrizzleUserRepository', () => {
  let db: ReturnType<typeof makeMockDb>;
  let repo: DrizzleUserRepository;

  beforeEach(() => {
    db = makeMockDb();
    repo = new DrizzleUserRepository(db);
  });

  describe('save', () => {
    it('deve inserir usuário com valores corretos', async () => {
      db.values.mockResolvedValue(undefined);

      await repo.save(makeUser());

      expect(db.values).toHaveBeenCalledWith({
        id: expect.any(String),
        fullName: 'João Silva',
        cpf: '52998224725',
        email: 'joao@email.com',
        color: 'blue',
        observation: null,
        createdAt: expect.any(Date),
      });
    });

    it('deve lançar DomainError quando unique violation (23505)', async () => {
      db.values.mockRejectedValue({ code: '23505' });

      await expect(repo.save(makeUser())).rejects.toThrow(DomainError);
      await expect(repo.save(makeUser())).rejects.toThrow('CPF já cadastrado');
    });

    it('deve lançar DomainError para outros erros do banco', async () => {
      db.values.mockRejectedValue(new Error('connection timeout'));

      await expect(repo.save(makeUser())).rejects.toThrow(DomainError);
      await expect(repo.save(makeUser())).rejects.toThrow('Erro ao salvar usuário');
    });
  });

  describe('findByCPF', () => {
    it('deve retornar User quando encontrado', async () => {
      db.limit.mockResolvedValue([{
        id: 'abc-123',
        fullName: 'João Silva',
        cpf: '52998224725',
        email: 'joao@email.com',
        color: 'blue',
        observation: null,
        createdAt: new Date('2025-01-01'),
      }]);

      const user = await repo.findByCPF('52998224725');

      expect(user).toBeInstanceOf(User);
      expect(user!.cpf.value).toBe('52998224725');
      expect(user!.fullName.value).toBe('João Silva');
      expect(user!.email.value).toBe('joao@email.com');
      expect(user!.color.value).toBe('blue');
    });

    it('deve retornar null quando CPF não existe', async () => {
      db.limit.mockResolvedValue([]);

      const user = await repo.findByCPF('00000000000');

      expect(user).toBeNull();
    });

    it('deve lançar DomainError quando banco falha', async () => {
      db.limit.mockRejectedValue(new Error('query failed'));

      await expect(repo.findByCPF('52998224725')).rejects.toThrow(DomainError);
      await expect(repo.findByCPF('52998224725')).rejects.toThrow('Erro ao buscar usuário');
    });
  });
});
