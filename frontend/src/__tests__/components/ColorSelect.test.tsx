import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ColorSelect } from "../../components/ColorSelect";

describe("ColorSelect", () => {
  it("renderiza label e elemento select", () => {
    render(<ColorSelect value="" onChange={() => {}} />);

    expect(screen.getByText("Cor Preferida")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renderiza todas as opções de cor", () => {
    render(<ColorSelect value="" onChange={() => {}} />);

    expect(screen.getByRole("option", { name: "Selecione uma cor" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Azul" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Verde" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Vermelho" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Roxo" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Laranja" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Rosa" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Cinza" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Preto" })).toBeInTheDocument();
  });

  it("exibe mensagem de erro quando touched e error", () => {
    render(
      <ColorSelect value="" onChange={() => {}} error="Selecione uma cor preferida" touched />,
    );

    expect(screen.getByText("Selecione uma cor preferida")).toBeInTheDocument();
  });

  it("não exibe erro quando não está touched", () => {
    render(
      <ColorSelect value="" onChange={() => {}} error="Selecione uma cor preferida" />,
    );

    expect(screen.queryByText("Selecione uma cor preferida")).not.toBeInTheDocument();
  });

  it("chama onChange ao selecionar uma cor", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<ColorSelect value="" onChange={onChange} />);

    const select = screen.getByRole("combobox");
    await user.selectOptions(select, "blue");

    expect(onChange).toHaveBeenCalledWith("blue");
  });
});
