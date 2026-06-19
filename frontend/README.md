# Frontend — FormJohnDoe

Interface de usuário para cadastro, construída com React 19 + Vite 8 + Tailwind CSS 4.

## Stack

| Tecnologia    | Versão |
|---------------|--------|
| React         | 19     |
| Vite          | 8      |
| TypeScript    | 6      |
| Tailwind CSS  | 4      |
| Framer Motion | 12     |
| Lucide React  | 1      |

## Componentes

| Componente       | Descrição                          |
|------------------|------------------------------------|
| `InputField`     | Campo de texto com validação visual|
| `ColorSelect`    | Dropdown de cores                  |
| `TextareaField`  | Área de texto com contador         |
| `Toast`          | Notificação de sucesso/erro        |
| `BackgroundBlobs`| Decoração animada do fundo         |

## Scripts

```bash
npm run dev      # Servidor de desenvolvimento (Vite)
npm run build    # Build de produção (single-file HTML)
npm run preview  # Preview do build
npm run lint     # ESLint
```

## Variáveis de Ambiente

| Variável     | Padrão                   |
|--------------|--------------------------|
| VITE_API_URL | http://localhost:3001    |

## Docker

```bash
docker compose up --build frontend
```

Build de dois estágios: Node 24 para compilar → Nginx Alpine para servir na porta 8080.
