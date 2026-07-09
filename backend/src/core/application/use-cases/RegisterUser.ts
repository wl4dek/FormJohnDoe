import { DomainError } from '@core/shared/errors/DomainError.js';
import { RegisterUserInput, RegisterUserResponse } from '../dto';
import { IUserRepository } from '@core/ports/IUserRepository.js';
import { User } from '@core/entities/User.js';
import { FullName, CPF, Email, Color } from '@core/value-objects';

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
  ) { }

  async execute(userInput: RegisterUserInput): Promise<RegisterUserResponse> {
    const fullName = FullName.create(userInput.fullName);
    const cpf = CPF.criar(userInput.cpf);
    const email = Email.criar(userInput.email);
    const color = Color.create(userInput.color);

    const existing = await this.userRepository.findByCPF(cpf.value);
    if (existing !== null) {
      throw new DomainError('CPF já cadastrado');
    }

    const user = User.create({
      fullName,
      cpf,
      email,
      color,
      observation: userInput.observation?.trim() || null,
    });

    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error instanceof DomainError) throw error;
      throw new DomainError('Erro ao processar cadastro', 'general', { cause: error });
    }

    return {
      success: true,
      message: 'Cadastro realizado com sucesso!',
      userId: user.id,
    };
  }
}
