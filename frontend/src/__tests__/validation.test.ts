import { describe, it, expect } from "vitest";
import { formatCPF, isValidCPF, isValidEmail, validate } from "../utils/validation";
import type { FormData } from "../types/form";

describe("formatCPF", () => {
  it("formata 11 dígitos no padrão 000.000.000-00", () => {
    expect(formatCPF("52998224725")).toBe("529.982.247-25");
  });

  it("formata parcialmente com 3 dígitos", () => {
    expect(formatCPF("123")).toBe("123");
  });

  it("formata parcialmente com 6 dígitos", () => {
    expect(formatCPF("123456")).toBe("123.456");
  });

  it("formata parcialmente com 9 dígitos", () => {
    expect(formatCPF("123456789")).toBe("123.456.789");
  });

  it("remove caracteres não-dígitos", () => {
    expect(formatCPF("abc529.982.247-25def")).toBe("529.982.247-25");
  });

  it("limita a 11 dígitos", () => {
    expect(formatCPF("1234567890123")).toBe("123.456.789-01");
  });

  it("retorna string vazia para entrada vazia", () => {
    expect(formatCPF("")).toBe("");
  });
});

describe("isValidCPF", () => {
  it("retorna true para CPF válido 529.982.247-25", () => {
    expect(isValidCPF("52998224725")).toBe(true);
  });

  it("retorna true para CPF válido com máscara", () => {
    expect(isValidCPF("529.982.247-25")).toBe(true);
  });

  it("retorna false para todos dígitos iguais", () => {
    expect(isValidCPF("11111111111")).toBe(false);
    expect(isValidCPF("22222222222")).toBe(false);
  });

  it("retorna false para CPF com dígitos verificadores errados", () => {
    expect(isValidCPF("52998224724")).toBe(false);
    expect(isValidCPF("52998224726")).toBe(false);
  });

  it("retorna false para menos de 11 dígitos", () => {
    expect(isValidCPF("123")).toBe(false);
    expect(isValidCPF("")).toBe(false);
  });

  it("retorna false para CPF com letras", () => {
    expect(isValidCPF("abc")).toBe(false);
  });
});

describe("isValidEmail", () => {
  it("retorna true para emails válidos", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
    expect(isValidEmail("joao@email.com")).toBe(true);
    expect(isValidEmail("test.user@domain.co")).toBe(true);
  });

  it("retorna false para emails inválidos", () => {
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("invalido")).toBe(false);
    expect(isValidEmail("@domain.com")).toBe(false);
    expect(isValidEmail("user@")).toBe(false);
    expect(isValidEmail("user@.com")).toBe(false);
  });
});

describe("validate", () => {
  const validForm: FormData = {
    fullName: "João Silva",
    cpf: "529.982.247-25",
    email: "joao@email.com",
    color: "blue",
    observation: "",
  };

  it("retorna todos os erros para formulário vazio", () => {
    const empty: FormData = {
      fullName: "",
      cpf: "",
      email: "",
      color: "",
      observation: "",
    };
    const errors = validate(empty);
    expect(errors.fullName).toBe("Informe seu nome completo");
    expect(errors.cpf).toBe("Informe seu CPF");
    expect(errors.email).toBe("Informe seu e-mail");
    expect(errors.color).toBe("Selecione uma cor preferida");
    expect(Object.keys(errors)).toHaveLength(4);
  });

  it("retorna erro para nome muito curto", () => {
    const form = { ...validForm, fullName: "Ab" };
    const errors = validate(form);
    expect(errors.fullName).toBe("Nome deve ter pelo menos 3 caracteres");
  });

  it("retorna erro para CPF incompleto", () => {
    const form = { ...validForm, cpf: "123" };
    const errors = validate(form);
    expect(errors.cpf).toBe("CPF incompleto");
  });

  it("retorna erro para CPF inválido", () => {
    const form = { ...validForm, cpf: "111.111.111-11" };
    const errors = validate(form);
    expect(errors.cpf).toBe("CPF inválido");
  });

  it("retorna erro para e-mail inválido", () => {
    const form = { ...validForm, email: "invalido" };
    const errors = validate(form);
    expect(errors.email).toBe("E-mail inválido");
  });

  it("não retorna erros para formulário válido", () => {
    const errors = validate(validForm);
    expect(Object.keys(errors)).toHaveLength(0);
  });
});
