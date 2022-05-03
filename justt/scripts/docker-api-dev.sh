#!/bin/sh
# ENVIRONEMTN from docker-compose.yaml doesn't get through to subprocesses
# Need to explicit pass DATABASE_URL here, otherwise migration doesn't work
# Run migrations
DATABASE_URL="postgresql://prisma:prisma@postgres:5432/prisma?schema=public" npm run prisma:generate
DATABASE_URL="postgresql://prisma:prisma@postgres:5432/prisma?schema=public" npx prisma migrate deploy
# start app
DATABASE_URL="postgresql://prisma:prisma@postgres:5432/prisma?schema=public" npm run seed
DATABASE_URL="postgresql://prisma:prisma@postgres:5432/prisma?schema=public" npm run serve:api
