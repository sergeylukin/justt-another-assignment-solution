#!/bin/sh
# ENVIRONEMTN from docker-compose.yaml doesn't get through to subprocesses
# Need to explicit pass DATABASE_URL here as first argument and re-declare it,
# otherwise migration doesn't work
export DATABASE_URL="postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public"

echo "^^^^^^^^^^"
echo ${NODE_ENV}
echo "^^^^^^^^^^"
echo ${DATABASE_URL}
echo "^^^^^^^^^^"
echo ${DB_USER}
echo "^^^^^^^^^^"
# Run migrations
npm run prisma:generate
npx prisma migrate deploy
# start app
if [ "${NODE_ENV}" == "production" ]
then
  node /usr/app/prisma/seed
  node /usr/app/dist/apps/api/main
else
  npm run prisma:seed
  npm run serve:api
fi
