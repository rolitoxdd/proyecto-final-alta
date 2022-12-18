FROM node:16-alpine

WORKDIR /app

COPY package-lock.json package.json ./

RUN npm ci

COPY tsconfig.json index.ts getService.ts ./

CMD ["npx", "ts-node", "index.ts"]