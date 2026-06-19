import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DomainError } from '../../../core/shared/errors/DomainError.js';
import { IUserRepository } from '../../../core/ports/IUserRepository.js';
import { User } from '../../../core/entities/User.js';
import { FullName, CPF, Email, Color } from '../../../core/value-objects/index.js';
import { users } from '../drizzle/schema.js';
import { DRIZZLE, type DrizzleDb } from '../drizzle/drizzle.provider.js';

@Injectable()
export class DrizzleUserRepository implements IUserRepository {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDb) { }

  async save(user: User): Promise<void> {
    try {
      await this.db.insert(users).values({
        id: user.id,
        fullName: user.fullName.value,
        cpf: user.cpf.value,
        email: user.email.value,
        color: user.color.value,
        observation: user.observation,
        createdAt: user.createdAt,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao salvar usuário';
      throw new DomainError(message);
    }
  }

  async findByCPF(cpf: string): Promise<User | null> {
    try {
      const result = await this.db
        .select()
        .from(users)
        .where(eq(users.cpf, cpf))
        .limit(1);

      if (result.length === 0) return null;

      const row = result[0];
      return new User(
        {
          fullName: FullName.create(row.fullName),
          cpf: CPF.criar(row.cpf),
          email: Email.criar(row.email),
          color: Color.create(row.color),
          observation: row.observation,
          createdAt: row.createdAt,
        },
        row.id,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao buscar usuário';
      throw new DomainError(message);
    }
  }
}
