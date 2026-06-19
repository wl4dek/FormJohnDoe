# E2E — Instruções para Agentes

## Convenções

- Testes em `tests/` com sufixo `.spec.ts`.
- Helpers em `helpers/` (ex: `db.ts` com `clearUsers()`).
- `clearUsers()` é chamado no `beforeEach` de cada teste para isolar o estado.

## Configuração

- `baseURL` lê de `BASE_URL` env var (default `http://localhost:8080`).
- `DATABASE_URL` env var para conexão com PostgreSQL (default `postgres://postgres:postgres@localhost:5432/form_john_doe_test`).
- Chromium headless, screenshots + vídeo apenas em falha.
- Timeout de 30 segundos por teste.

## Estratégia de Testes

- **Fluxos reais** (sucesso, CPF duplicado): chamam API real, usam `clearUsers()` para limpar banco.
- **Erros de validação** (CPF inválido, email inválido): usar `page.route('**/api/users', ...)` para mockar resposta 400.
- **Validação client-side** (nome curto): enviar formulário e verificar mensagem de erro no DOM.

## Docker

- `Dockerfile` baseado em `mcr.microsoft.com/playwright:v1.52.0-jammy`.
- `docker-compose.e2e.yml` define serviço `e2e` com dependências de postgres, backend e frontend.
- `BASE_URL=http://frontend:8080` no container (rede interna Docker).
