FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY tsconfig.json tsconfig.build.json ./
COPY src/ src/
COPY scripts scripts/
RUN npm run build
RUN cp -r src/infrastructure/persistence/drizzle/migrations dist/infrastructure/persistence/drizzle/migrations
RUN npm prune --omit=dev

FROM node:24-alpine AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 appuser && \
    adduser --system --uid 1001 appuser

COPY --from=builder /app/dist dist/
COPY --from=builder /app/scripts/entrypoint.sh /entrypoint.sh
COPY --from=builder /app/node_modules node_modules/
COPY --from=builder /app/package.json ./

USER appuser

EXPOSE 3001

ENTRYPOINT ["/entrypoint.sh"]
