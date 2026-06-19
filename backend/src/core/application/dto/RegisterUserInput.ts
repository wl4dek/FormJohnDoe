export interface RegisterUserInput {
  fullName: string;
  cpf: string;
  email: string;
  color: string;
  observation?: string | null;
}
