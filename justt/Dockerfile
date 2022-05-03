ARG NODE_VERSION=14.5.0-alpine
ARG PORT=4200

FROM node:${NODE_VERSION}

WORKDIR /usr/app
EXPOSE ${PORT}

COPY package.json package-lock.json ./

RUN export PATH=:"$PATH:/usr/app/node_modules/.bin:" && \
  npm i

COPY . .

ENV PORT=${PORT}

CMD ["npm", "run", "serve:web"]

LABEL NODE_VERSION=${NODE_VERSION} \
PORT=${PORT}
