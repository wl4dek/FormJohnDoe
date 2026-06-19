import { User } from '../entities/User.js';

export interface IUserRepository {
  save(user: User): Promise<void>;
  findByCPF(cpf: string): Promise<User | null>;
}
