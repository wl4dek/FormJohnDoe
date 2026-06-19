#!/bin/sh
set -e

echo "Rodando migrations..."
node dist/scripts/migrate.js

echo "Iniciando servidor..."
exec node dist/main.js
