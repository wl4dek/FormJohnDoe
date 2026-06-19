# Frontend — Instruções para Agentes

## Organização

```
src/
├── components/   → Componentes de UI puros (sem lógica de estado global)
├── hooks/        → Custom Hooks (lógica de estado compartilhada)
├── service/      → Chamadas HTTP para API
├── styles/       → Arquivos CSS extras
├── types/        → Interfaces TypeScript
└── utils/        → Funções utilitárias e constantes
```

## Convenções

- **Path alias**: `@/` resolve para `src/` (configurado em `vite.config.ts` e `tsconfig.json`).
- **Estado**: Centralizado no hook `useForm()`. Componentes recebem props e não gerenciam estado de formulário.
- **Estilos**: Tailwind CSS 4 CSS-first. Tema customizado via diretiva `@theme` em `index.css`. Sem arquivo `tailwind.config`.
- **Animações**: Framer Motion para entradas/saídas. Animações CSS puras em `animations.css`.
- **Ícones**: Lucide React. Importar apenas os ícones necessários.
- **Build**: `vite-plugin-singlefile` gera único `index.html` com CSS/JS inline.

## Validação

- `validate()` em `utils/validation.ts` valida todos os campos e retorna `FormErrors`.
- `formatCPF()` formata CPF com máscara `000.000.000-00` durante a digitação.
- Erros do servidor são parseados no hook e mapeados para campos específicos ou toast de erro.
