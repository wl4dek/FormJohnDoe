# Backend — Instruções para Agentes

## Regras de Arquitetura

1. **Core layer é framework-free**: Arquivos em `src/core/` NÃO podem importar nada de `@nestjs/*`, `drizzle-orm`, ou qualquer dependência de infraestrutura.
2. **DI wiring apenas em `app.module.ts`**: Use string tokens (`'IUserRepository'`, `'REGISTER_USER_USE_CASE'`) com `useFactory` para injetar dependências do core nos controllers.
3. **Path aliases**: `@core/*` → `src/core/*`, `@infrastructure/*` → `src/infrastructure/*`. Resolvidos em build via `tsc-alias`.
4. **ESM**: Todos os imports usam extensão `.js` (ex: `import { X } from './X.js'`).

## Padrões de Código

- Value Objects estendem `ValueObject<Props>` e possuem método estático `create()` ou `criar()` que retorna instância ou lança `DomainError`.
- `DomainError` recebe `(message: string, field: string = 'general')`. O campo `field` é usado pelo filter para construir resposta `{ errors: [{ field, message }] }`.
- Entidades estendem `Entity<Props>` com método estático `create()`.
- Use Cases são classes simples com construtor recebendo interfaces de repositório.
- Repositórios implementam interfaces definidas em `core/ports/`.

## Validação

- Dupla validação: `class-validator` no DTO (infrastructure) + value objects no core.
- Custom validator `IsCPFConstraint` registrado como decorator `@IsCPF()` no DTO.
- `ValidationPipe` global formata erros como `{ success: false, errors: [{ field, message }] }`.
- `DomainErrorFilter` global captura `DomainError` e retorna mesmo formato.

## Testes

- Usar Vitest (`npm run test`).
- Testes unitários em `src/` com sufixo `.test.ts` ou `.spec.ts`.
