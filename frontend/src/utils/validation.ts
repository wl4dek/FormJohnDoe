import type { FormData, FormErrors } from "../types/form";

export const formatCPF = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

export const isValidCPF = (cpf: string): boolean => {
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11 || /^(.)(\1{10})$/.test(digits)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(digits[i]) * (10 - i);
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(digits[9])) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(digits[i]) * (11 - i);
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  return rev === parseInt(digits[10]);
};

export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


export const validate = (data: FormData): FormErrors => {
  const e: FormErrors = {};
  if (!data.fullName.trim()) e.fullName = "Informe seu nome completo";
  else if (data.fullName.trim().length < 3)
    e.fullName = "Nome deve ter pelo menos 3 caracteres";

  if (!data.cpf) e.cpf = "Informe seu CPF";
  else if (data.cpf.replace(/\D/g, "").length !== 11)
    e.cpf = "CPF incompleto";
  else if (!isValidCPF(data.cpf)) e.cpf = "CPF inválido";

  if (!data.email) e.email = "Informe seu e-mail";
  else if (!isValidEmail(data.email)) e.email = "E-mail inválido";

  if (!data.color) e.color = "Selecione uma cor preferida";

  return e;
}