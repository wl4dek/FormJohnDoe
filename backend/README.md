# Backend — FormJohnDoe

API REST para cadastro de usuários com NestJS + Fastify + Drizzle ORM + PostgreSQL.

## Arquitetura

```
core/                  → Domínio puro (sem dependências externas)
├── application/       → Use cases e DTOs
├── entities/          → Entidades do domínio
├── ports/             → Interfaces de repositório
├── services/          → Serviços de domínio (ex: validação CPF)
├── shared/            → Base classes (Entity, ValueObject, DomainError)
└── value-objects/     → Value objects (FullName, CPF, Email, Color)

infrastructure/        → Implementações concretas (NestJS, Drizzle)
├── config/            → Configurações de ambiente
├── http/              → Controllers, DTOs, validators
└── persistence/       → Drizzle schema, módulo, repositório
```

## Endpoints

| Método | Rota        | Descrição              |
|--------|-------------|------------------------|
| POST   | /api/users  | Cadastrar novo usuário |

## Variáveis de Ambiente

| Variável     | Padrão                                          |
|--------------|--------------------------------------------------|
| DATABASE_URL | postgres://postgres:postgres@localhost:5432/...  |
| PORT         | 3000                                             |
| CORS_ORIGIN  | http://localhost:5173                            |

## Scripts

```bash
npm run dev                # Desenvolvimento com watch (tsx)
npm run build              # Compilar TypeScript
npm run start              # Rodar build compilado
npm run migration:generate # Gerar migration do schema Drizzle
npm run test               # Rodar testes unitários (Vitest)
npm run lint               # Lint com ESLint
```

## Docker

```bash
docker compose up --build backend
```

O entrypoint executa migrations automaticamente antes de iniciar o servidor.
