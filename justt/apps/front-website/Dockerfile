FROM node:14.5.0-alpine AS builder

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:web

FROM nginx:1.19.2 AS production
WORKDIR /usr/share/nginx/html

COPY --from=builder /usr/app/dist/apps/front-website ./
COPY --from=builder /usr/app/apps/front-website/nginx.conf /etc/nginx/nginx.conf
