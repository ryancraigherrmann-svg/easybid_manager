#!/bin/sh
# Simple wait-for-postgres script
set -e

host="$1"
shift

until pg_isready -h "$host" -p 5432 -U "$POSTGRES_USER" -d "$POSTGRES_DB"; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec "$@"
