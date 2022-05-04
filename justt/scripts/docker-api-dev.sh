#!/bin/sh
# ENVIRONEMTN from docker-compose.yaml doesn't get through to subprocesses
# Need to explicit pass DATABASE_URL here as first argument and re-declare it,
# otherwise migration doesn't work
export DATABASE_URL="$1"
# Run migrations
npm run prisma:generate
npx prisma migrate deploy
# start app
npm run seed
npm run serve:api
