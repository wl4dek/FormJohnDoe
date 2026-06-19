import { describe, it, expect, vi } from 'vitest';
import { UserController } from './UserController.js';
import type { RegisterUserUseCase } from '../../../core/application/use-cases/RegisterUser.js';

describe('UserController', () => {
  it('delega register para o use case e retorna resultado', async () => {
    const mockResult = {
      success: true,
      message: 'Cadastro realizado com sucesso!',
      userId: 'abc-123',
    };
    const mockUseCase = {
      execute: vi.fn().mockResolvedValue(mockResult),
    } as unknown as RegisterUserUseCase;

    const controller = new UserController(mockUseCase);

    const dto = {
      fullName: 'João Silva',
      cpf: '52998224725',
      email: 'joao@email.com',
      color: 'blue',
    };

    const result = await controller.register(dto as any);

    expect(mockUseCase.execute).toHaveBeenCalledWith(dto);
    expect(result).toEqual(mockResult);
  });

  it('propaga erros do use case', async () => {
    const mockError = new Error('CPF já cadastrado');
    const mockUseCase = {
      execute: vi.fn().mockRejectedValue(mockError),
    } as unknown as RegisterUserUseCase;

    const controller = new UserController(mockUseCase);

    const dto = {
      fullName: 'João Silva',
      cpf: '52998224725',
      email: 'joao@email.com',
      color: 'blue',
    };

    await expect(controller.register(dto as any)).rejects.toThrow('CPF já cadastrado');
  });
});
