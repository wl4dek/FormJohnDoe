import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { User } from "lucide-react";
import { InputField } from "../../components/InputField";

describe("InputField", () => {
  it("renderiza label e input", () => {
    render(
      <InputField
        label="Nome Completo"
        icon={User}
        value=""
        onChange={() => {}}
        placeholder="Digite seu nome"
      />,
    );

    expect(screen.getByText("Nome Completo")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Digite seu nome")).toBeInTheDocument();
  });

  it("exibe mensagem de erro quando touched e error", () => {
    render(
      <InputField
        label="Nome"
        icon={User}
        value=""
        onChange={() => {}}
        error="Campo obrigatório"
        touched
      />,
    );

    expect(screen.getByText("Campo obrigatório")).toBeInTheDocument();
  });

  it("exibe hint quando não há erro", () => {
    render(
      <InputField
        label="CPF"
        icon={User}
        value=""
        onChange={() => {}}
        hint="Digite apenas números"
      />,
    );

    expect(screen.getByText("Digite apenas números")).toBeInTheDocument();
  });

  it("chama onChange ao digitar", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <InputField
        label="Nome"
        icon={User}
        value=""
        onChange={onChange}
      />,
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "J");

    expect(onChange).toHaveBeenCalledWith("J");
  });

  it("não exibe erro quando não está touched", () => {
    render(
      <InputField
        label="Nome"
        icon={User}
        value=""
        onChange={() => {}}
        error="Campo obrigatório"
        touched={false}
      />,
    );

    expect(screen.queryByText("Campo obrigatório")).not.toBeInTheDocument();
  });

  it("não exibe hint quando há erro e está touched", () => {
    render(
      <InputField
        label="CPF"
        icon={User}
        value=""
        onChange={() => {}}
        error="CPF inválido"
        touched
        hint="Digite apenas números"
      />,
    );

    expect(screen.queryByText("Digite apenas números")).not.toBeInTheDocument();
  });
});
