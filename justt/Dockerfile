ARG NODE_VERSION=14.5.0-alpine
ARG PORT=4200

# Install dependencies only when needed
FROM node:${NODE_VERSION} AS deps
# Check
# https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
# to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /usr/app
COPY package.json package-lock.json ./
RUN npm install

FROM node:${NODE_VERSION} AS runner
WORKDIR /usr/app

COPY --from=deps /usr/app/node_modules ./node_modules
COPY . .

RUN export PATH=:"$PATH:/usr/app/node_modules/.bin:"

ENV PORT=${PORT}
EXPOSE ${PORT}

CMD ["npm", "run", "serve:web"]

LABEL NODE_VERSION=${NODE_VERSION} \
PORT=${PORT}
