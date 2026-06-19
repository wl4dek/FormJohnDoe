import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toast } from "../../components/Toast";

describe("Toast", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renderiza título e descrição", () => {
    render(
      <Toast
        type="success"
        title="Cadastro realizado!"
        description="Seus dados foram salvos."
        onClose={() => {}}
      />,
    );

    expect(screen.getByText("Cadastro realizado!")).toBeInTheDocument();
    expect(screen.getByText("Seus dados foram salvos.")).toBeInTheDocument();
  });

  it("chama onClose ao clicar no botão fechar", () => {
    const onClose = vi.fn();

    render(
      <Toast
        type="success"
        title="Título"
        description="Descrição"
        onClose={onClose}
      />,
    );

    const closeButton = screen.getByRole("button");
    closeButton.click();

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("auto-dismiss após 6 segundos", () => {
    const onClose = vi.fn();

    render(
      <Toast
        type="success"
        title="Título"
        description="Descrição"
        onClose={onClose}
      />,
    );

    act(() => {
      vi.advanceTimersByTime(6000);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("não chama onClose antes de 6 segundos", () => {
    const onClose = vi.fn();

    render(
      <Toast
        type="success"
        title="Título"
        description="Descrição"
        onClose={onClose}
      />,
    );

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  it("limpa o timer ao desmontar", () => {
    const onClose = vi.fn();

    const { unmount } = render(
      <Toast
        type="success"
        title="Título"
        description="Descrição"
        onClose={onClose}
      />,
    );

    unmount();

    act(() => {
      vi.advanceTimersByTime(6000);
    });

    expect(onClose).not.toHaveBeenCalled();
  });
});
