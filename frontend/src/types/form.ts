export interface FormData {
  fullName: string;
  cpf: string;
  email: string;
  color: string;
  observation: string;
}

export interface FormErrors {
  fullName?: string;
  cpf?: string;
  email?: string;
  color?: string;
  server?: string;
}
