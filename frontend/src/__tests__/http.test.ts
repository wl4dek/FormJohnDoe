import { describe, it, expect, vi, beforeEach } from "vitest";
import { create_user } from "../service/http";
import type { FormData } from "../types/form";

const mockForm: FormData = {
  fullName: "João Silva",
  cpf: "529.982.247-25",
  email: "joao@email.com",
  color: "blue",
  observation: "",
};

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("create_user", () => {
  it("faz POST para /api/users com os dados do formulário", async () => {
    const mockResponse = { success: true, message: "Cadastro realizado!", userId: "123" };
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await create_user(mockForm);

    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/users"),
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockForm),
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it("lança o body quando a resposta não é ok", async () => {
    const errorBody = { success: false, errors: [{ field: "cpf", message: "CPF inválido" }] };
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve(errorBody),
    });

    await expect(create_user(mockForm)).rejects.toEqual(errorBody);
  });

  it("rejeita quando a requisição falha", async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new TypeError("Network error"));

    await expect(create_user(mockForm)).rejects.toThrow(TypeError);
  });
});
