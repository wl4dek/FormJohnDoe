import { describe, it, expect, vi } from 'vitest';
import { RegisterUserUseCase } from './RegisterUser.js';
import { DomainError } from '../../shared/errors/DomainError.js';
import { User } from '../../entities/User.js';
import type { IUserRepository } from '../../ports/IUserRepository.js';
import type { RegisterUserInput } from '../dto/index.js';

function makeValidInput(): RegisterUserInput {
  return {
    fullName: 'João Silva',
    cpf: '52998224725',
    email: 'joao@email.com',
    color: 'blue',
  };
}

function makeRepoMock() {
  return {
    findByCPF: vi.fn().mockResolvedValue(null),
    save: vi.fn().mockResolvedValue(undefined),
  } satisfies IUserRepository;
}

describe('RegisterUserUseCase', () => {
  it('deve criar e salvar usuário com dados válidos', async () => {
    const repo = makeRepoMock();
    const useCase = new RegisterUserUseCase(repo);

    const result = await useCase.execute(makeValidInput());

    expect(result.success).toBe(true);
    expect(result.message).toBe('Cadastro realizado com sucesso!');
    expect(result.userId).toBeDefined();
    expect(repo.findByCPF).toHaveBeenCalledWith('52998224725');
    expect(repo.save).toHaveBeenCalledTimes(1);
  });

  it('deve lançar DomainError quando CPF já está cadastrado', async () => {
    const repo = makeRepoMock();
    repo.findByCPF = vi.fn().mockResolvedValue({ id: 'existing-id' });

    const useCase = new RegisterUserUseCase(repo);

    await expect(useCase.execute(makeValidInput())).rejects.toThrow(DomainError);
    await expect(useCase.execute(makeValidInput())).rejects.toThrow('CPF já cadastrado');
    expect(repo.save).not.toHaveBeenCalled();
  });

  it('deve passar observation preenchida para o usuário', async () => {
    const repo = makeRepoMock();
    const useCase = new RegisterUserUseCase(repo);

    const input = { ...makeValidInput(), observation: 'Observação importante' };
    const result = await useCase.execute(input);

    expect(result.success).toBe(true);
    const savedUser = repo.save.mock.calls[0][0];
    expect(savedUser.observation).toBe('Observação importante');
  });

  it('deve passar observation como null quando vazia', async () => {
    const repo = makeRepoMock();
    const useCase = new RegisterUserUseCase(repo);

    const input = { ...makeValidInput(), observation: '' };
    const result = await useCase.execute(input);

    expect(result.success).toBe(true);
    const savedUser = repo.save.mock.calls[0][0];
    expect(savedUser.observation).toBeNull();
  });

  it('deve passar observation como null quando undefined', async () => {
    const repo = makeRepoMock();
    const useCase = new RegisterUserUseCase(repo);

    const result = await useCase.execute(makeValidInput());

    expect(result.success).toBe(true);
    const savedUser = repo.save.mock.calls[0][0];
    expect(savedUser.observation).toBeNull();
  });

  it('deve passar observation com trim', async () => {
    const repo = makeRepoMock();
    const useCase = new RegisterUserUseCase(repo);

    const input = { ...makeValidInput(), observation: '  observação com espaços  ' };
    const result = await useCase.execute(input);

    expect(result.success).toBe(true);
    const savedUser = repo.save.mock.calls[0][0];
    expect(savedUser.observation).toBe('observação com espaços');
  });

  it('deve lançar DomainError quando fullName é inválido', async () => {
    const repo = makeRepoMock();
    const useCase = new RegisterUserUseCase(repo);

    const input = { ...makeValidInput(), fullName: 'Ab' };

    await expect(useCase.execute(input)).rejects.toThrow(DomainError);
    expect(repo.save).not.toHaveBeenCalled();
  });

  it('deve lançar DomainError quando CPF é inválido', async () => {
    const repo = makeRepoMock();
    const useCase = new RegisterUserUseCase(repo);

    const input = { ...makeValidInput(), cpf: '12345678901' };

    await expect(useCase.execute(input)).rejects.toThrow(DomainError);
    expect(repo.save).not.toHaveBeenCalled();
  });

  it('deve lançar DomainError quando email é inválido', async () => {
    const repo = makeRepoMock();
    const useCase = new RegisterUserUseCase(repo);

    const input = { ...makeValidInput(), email: 'invalido' };

    await expect(useCase.execute(input)).rejects.toThrow(DomainError);
    expect(repo.save).not.toHaveBeenCalled();
  });

  it('deve lançar DomainError quando color é inválida', async () => {
    const repo = makeRepoMock();
    const useCase = new RegisterUserUseCase(repo);

    const input = { ...makeValidInput(), color: 'invalid' };

    await expect(useCase.execute(input)).rejects.toThrow(DomainError);
    expect(repo.save).not.toHaveBeenCalled();
  });

  it('deve propagar DomainError quando save falha com DomainError', async () => {
    const repo = makeRepoMock();
    const domainError = new DomainError('Erro de negócio no repositório');
    repo.save = vi.fn().mockRejectedValue(domainError);

    const useCase = new RegisterUserUseCase(repo);

    await expect(useCase.execute(makeValidInput())).rejects.toThrow(DomainError);
    await expect(useCase.execute(makeValidInput())).rejects.toThrow('Erro de negócio no repositório');
  });

  it('deve envolver erro genérico do save em DomainError preservando cause', async () => {
    const repo = makeRepoMock();
    const originalError = new Error('conexão com banco perdida');
    repo.save = vi.fn().mockRejectedValue(originalError);

    const useCase = new RegisterUserUseCase(repo);

    try {
      await useCase.execute(makeValidInput());
      expect.unreachable('Deveria ter lançado DomainError');
    } catch (error) {
      expect(error).toBeInstanceOf(DomainError);
      expect((error as DomainError).message).toBe('Erro ao processar cadastro');
      expect((error as DomainError).cause).toBe(originalError);
    }
  });

  it('deve salvar usuário com fullName, cpf, email e color corretos', async () => {
    const repo = makeRepoMock();

    await new RegisterUserUseCase(repo).execute(makeValidInput());

    const savedUser = repo.save.mock.calls[0][0] as User;
    expect(savedUser.fullName.value).toBe('João Silva');
    expect(savedUser.cpf.value).toBe('52998224725');
    expect(savedUser.email.value).toBe('joao@email.com');
    expect(savedUser.color.value).toBe('blue');
  });

  it('deve validar CPF antes de verificar duplicidade no banco', async () => {
    const repo = makeRepoMock();
    repo.findByCPF = vi.fn();

    const input = { ...makeValidInput(), cpf: '00000000000' };

    await expect(new RegisterUserUseCase(repo).execute(input)).rejects.toThrow(DomainError);
    expect(repo.findByCPF).not.toHaveBeenCalled();
  });
});
