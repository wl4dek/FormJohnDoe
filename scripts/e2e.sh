#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
COMPOSE_FILES="-f ${PROJECT_DIR}/docker-compose.e2e.yml"

cleanup() {
  echo "Limpando containers..."
  docker compose $COMPOSE_FILES down 2>/dev/null || true
}
trap cleanup EXIT

echo "Subindo o ambiente para o test..."
docker compose $COMPOSE_FILES up -d --build --wait postgres backend frontend
echo "Backend pronto!"

MODE="${1:-container}"

if [ "$MODE" = "--local" ]; then
  cd "$PROJECT_DIR/e2e" && npx playwright test
else
  docker compose $COMPOSE_FILES run --build --rm e2e
fi
