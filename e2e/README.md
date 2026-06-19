# E2E — FormJohnDoe

Testes end-to-end com Playwright para o formulário de cadastro.

## Cenários

Os testes validam 6 cenários no arquivo `tests/register-form.spec.ts`:

1. **Cadastro bem-sucedido** — fluxo completo com dados válidos
2. **Formulário vazio** — validação de todos os campos obrigatórios
3. **CPF inválido** — erro de validação mockado (400)
4. **E-mail inválido** — erro de validação mockado (400)
5. **Nome muito curto** — validação client-side (< 3 caracteres)
6. **CPF duplicado** — rejeição do backend com dois cadastros consecutivos

## Estratégia

- **Sucesso e CPF duplicado**: usam a API real + banco PostgreSQL
- **Erros de validação (CPF, email)**: usam `page.route()` para mockar resposta 400
- **Nome curto**: validação puramente client-side, sem chamada de API

## Como Rodar

### Em container (recomendado)

```bash
bash scripts/e2e.sh
```

Orquestra todo o ambiente: postgres → backend → frontend → playwright.

### No host (para debug/ui)

```bash
bash scripts/e2e.sh --local
```

Requer Node.js + Playwright instalados no host:

```bash
cd e2e && npx playwright install chromium
```

## Estrutura

```
e2e/
├── tests/           → Arquivos de teste (*.spec.ts)
├── helpers/         → Utilitários (ex: limpeza de banco)
├── Dockerfile       → Imagem Playwright para execução containerizada
└── playwright.config.ts
```

Resultados (screenshots/vídeos) salvos em `test-results/`.
