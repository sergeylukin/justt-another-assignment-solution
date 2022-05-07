FROM node:14.5.0-alpine AS builder

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:web

FROM nginx:1.19.2 AS production
WORKDIR /usr/share/nginx/html

ARG API_HOST=host.docker.internal
ARG API_PORT=3333

ENV API_HOST=$API_HOST
ENV API_PORT=$API_PORT

COPY --from=builder /usr/app/dist/apps/front-website ./
COPY --from=builder /usr/app/nginx.conf.prod.template /etc/nginx/templates/default.conf.template
