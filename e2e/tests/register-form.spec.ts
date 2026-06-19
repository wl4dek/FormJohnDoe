import { test, expect, type Page } from "@playwright/test";
import { clearUsers } from "../helpers/db";

const VALID_USER = {
  fullName: "João Silva",
  cpf: "52998224725",
  email: "joao@email.com",
  color: "blue",
};

async function fillForm(page: Page, data: typeof VALID_USER) {
  await page.getByPlaceholder("Digite seu nome completo").fill(data.fullName);
  await page.getByPlaceholder("000.000.000-00").fill(data.cpf);
  await page.getByPlaceholder("seu@email.com").fill(data.email);
  await page.selectOption("select", data.color);
}

async function submitForm(page: Page) {
  await page.getByRole("button", { name: "Enviar Cadastro" }).click();
}

test.describe("Formulário de Cadastro", () => {
  test.beforeEach(async ({ page }) => {
    await clearUsers();
    await page.goto("/");
  });

  test("deve cadastrar usuário com sucesso", async ({ page }) => {
    await fillForm(page, VALID_USER);
    await submitForm(page);

    await expect(page.getByText("Cadastro realizado!")).toBeVisible();
    await expect(
      page.getByText("Seus dados foram enviados com sucesso."),
    ).toBeVisible();
  });

  test("deve mostrar erros de validação ao enviar formulário vazio", async ({
    page,
  }) => {
    await submitForm(page);

    await expect(page.getByText("Informe seu nome completo")).toBeVisible();
    await expect(page.getByText("Informe seu CPF")).toBeVisible();
    await expect(page.getByText("Informe seu e-mail")).toBeVisible();
    await expect(
      page.getByText("Selecione uma cor preferida"),
    ).toBeVisible();
  });

  test("deve validar CPF inválido", async ({ page }) => {
    await fillForm(page, { ...VALID_USER, cpf: "12345678901" });
    await page.route("**/api/users", (route) =>
      route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          errors: [{ field: "cpf", message: "CPF inválido" }],
        }),
      }),
    );
    await submitForm(page);

    await expect(page.getByText("CPF inválido")).toBeVisible();
  });

  test("deve validar e-mail inválido", async ({ page }) => {
    await fillForm(page, { ...VALID_USER, email: "invalido" });
    await page.route("**/api/users", (route) =>
      route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({
          success: false,
          errors: [{ field: "email", message: "E-mail inválido" }],
        }),
      }),
    );
    await submitForm(page);

    await expect(page.getByText("E-mail inválido")).toBeVisible();
  });

  test("deve validar nome muito curto", async ({ page }) => {
    await fillForm(page, { ...VALID_USER, fullName: "Ab" });
    await submitForm(page);

    await expect(
      page.getByText("Nome deve ter pelo menos 3 caracteres"),
    ).toBeVisible();
  });

  test("deve rejeitar CPF duplicado", async ({ page }) => {
    await fillForm(page, VALID_USER);
    await submitForm(page);
    await expect(page.getByText("Cadastro realizado!")).toBeVisible();

    await page.getByRole("button", { name: "Enviar Cadastro" }).waitFor({
      state: "visible",
      timeout: 10000,
    });

    await fillForm(page, { ...VALID_USER, fullName: "Fulano de TAL", email: "fulano@tem.email.com" });
    await submitForm(page);

    await expect(page.getByText("CPF já cadastrado")).toBeVisible({ timeout: 10000 });
  });
});
