#!/bin/sh
set -eu

DATABASE_URL_VALUE="${DATABASE_URL:-${DATABASE_PRIVATE_URL:-${DATABASE_PUBLIC_URL:-}}}"

if [ -z "$DATABASE_URL_VALUE" ]; then
  echo "Missing database URL. Set DATABASE_URL in Railway service variables."
  exit 1
fi

case "$DATABASE_URL_VALUE" in
  DATABASE_URL=*)
    DATABASE_URL_VALUE="${DATABASE_URL_VALUE#DATABASE_URL=}"
    ;;
esac

case "$DATABASE_URL_VALUE" in
  \"*\")
    DATABASE_URL_VALUE="${DATABASE_URL_VALUE#\"}"
    DATABASE_URL_VALUE="${DATABASE_URL_VALUE%\"}"
    ;;
esac

export DATABASE_URL="$DATABASE_URL_VALUE"

case "$DATABASE_URL" in
  postgresql://*|postgres://*)
    ;;
  *)
    echo "Invalid DATABASE_URL. Use only the Postgres URL value from Railway, without the DATABASE_URL= prefix."
    exit 1
    ;;
esac

npx prisma migrate deploy
exec node dist/main.js
