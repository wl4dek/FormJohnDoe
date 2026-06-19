# FormJohnDoe

Aplicação full-stack de formulário de cadastro com validação em tempo real.

## Estrutura do Projeto

| Diretório | Descrição |
|-----------|-----------|
| [`backend/`](backend/README.md) | API REST com NestJS + Fastify + Drizzle ORM + PostgreSQL |
| [`frontend/`](frontend/README.md) | Interface React 19 + Vite 8 + Tailwind CSS 4 |
| [`e2e/`](e2e/README.md) | Testes end-to-end com Playwright |

## Como Rodar

```bash
# Desenvolvimento
docker compose up --build

# Testes e2e
bash scripts/e2e.sh
```

## Scripts Disponíveis

- **Backend**: `cd backend && npm run dev` (desenvolvimento), `npm run test` (testes unitários)
- **Frontend**: `cd frontend && npm run dev` (dev server), `npm run build` (build produção)
- **E2E**: `bash scripts/e2e.sh` (container) ou `cd e2e && npx playwright test` (host)
