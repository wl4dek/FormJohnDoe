import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useForm } from "../hooks/useForm";

const mockCreateUser = vi.fn();

vi.mock("../service/http", () => ({
  create_user: (...args: unknown[]) => mockCreateUser(...args),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

function setup() {
  return renderHook(() => useForm());
}

describe("useForm", () => {
  it("inicializa com estado vazio", () => {
    const { result } = setup();

    expect(result.current.form).toEqual({
      fullName: "",
      cpf: "",
      email: "",
      color: "",
      observation: "",
    });
    expect(result.current.errors).toEqual({});
    expect(result.current.touched).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.toast).toBeNull();
  });

  it("updateField atualiza o campo e marca como touched", () => {
    const { result } = setup();

    act(() => result.current.updateField("fullName", "João"));

    expect(result.current.form.fullName).toBe("João");
    expect(result.current.touched.fullName).toBe(true);
  });

  it("updateField dispara validação e define erro para campo vazio", () => {
    const { result } = setup();

    act(() => result.current.updateField("fullName", ""));

    expect(result.current.errors.fullName).toBeDefined();
  });

  it("handleSubmit não chama API se houver erros de validação", async () => {
    const { result } = setup();

    await act(async () => {
      await result.current.handleSubmit(new Event("submit") as unknown as React.FormEvent);
    });

    expect(mockCreateUser).not.toHaveBeenCalled();
    expect(result.current.isSubmitting).toBe(false);
  });

  it("handleSubmit chama API e mostra toast de sucesso em dados válidos", async () => {
    mockCreateUser.mockResolvedValue({
      success: true,
      message: "Cadastro realizado com sucesso!",
      userId: "abc-123",
    });

    const { result } = setup();

    await act(async () => {
      result.current.updateField("fullName", "João Silva");
      result.current.updateField("cpf", "529.982.247-25");
      result.current.updateField("email", "joao@email.com");
      result.current.updateField("color", "blue");
    });

    await act(async () => {
      await result.current.handleSubmit(new Event("submit") as unknown as React.FormEvent);
    });

    expect(mockCreateUser).toHaveBeenCalledTimes(1);
    expect(result.current.toast).toEqual({
      type: "success",
      title: "Cadastro realizado!",
      description: "Seus dados foram enviados com sucesso.",
    });
    expect(result.current.form).toEqual({
      fullName: "",
      cpf: "",
      email: "",
      color: "",
      observation: "",
    });
  });

  it("handleSubmit com erro estruturado do servidor mapeia errors", async () => {
    mockCreateUser.mockRejectedValue({
      success: false,
      errors: [{ field: "cpf", message: "CPF inválido" }],
    });

    const { result } = setup();

    await act(async () => {
      result.current.updateField("fullName", "João Silva");
      result.current.updateField("cpf", "529.982.247-25");
      result.current.updateField("email", "joao@email.com");
      result.current.updateField("color", "blue");
    });

    await act(async () => {
      await result.current.handleSubmit(new Event("submit") as unknown as React.FormEvent);
    });

    expect(result.current.errors.cpf).toBe("CPF inválido");
    expect(result.current.toast).toEqual({
      type: "error",
      title: "Erro ao cadastrar",
      description: "Verifique os campos e tente novamente.",
    });
  });

  it("handleSubmit com erro genérico mostra 'Erro inesperado'", async () => {
    mockCreateUser.mockRejectedValue({});

    const { result } = setup();

    await act(async () => {
      result.current.updateField("fullName", "João Silva");
      result.current.updateField("cpf", "529.982.247-25");
      result.current.updateField("email", "joao@email.com");
      result.current.updateField("color", "blue");
    });

    await act(async () => {
      await result.current.handleSubmit(new Event("submit") as unknown as React.FormEvent);
    });

    expect(result.current.errors.server).toBe("Erro inesperado. Tente novamente.");
    expect(result.current.toast).toEqual({
      type: "error",
      title: "Erro ao cadastrar",
      description: "Erro inesperado. Tente novamente.",
    });
  });

  it("handleSubmit com erro de campo 'general' mapeia para server", async () => {
    mockCreateUser.mockRejectedValue({
      success: false,
      errors: [{ field: "general", message: "Erro interno" }],
    });

    const { result } = setup();

    await act(async () => {
      result.current.updateField("fullName", "João Silva");
      result.current.updateField("cpf", "529.982.247-25");
      result.current.updateField("email", "joao@email.com");
      result.current.updateField("color", "blue");
    });

    await act(async () => {
      await result.current.handleSubmit(new Event("submit") as unknown as React.FormEvent);
    });

    expect(result.current.errors.server).toBe("Erro interno");
    expect(result.current.toast?.description).toBe("Erro interno");
  });
});
