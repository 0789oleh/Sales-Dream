# syntax=docker/dockerfile:1

FROM node:20

# pnpm через corepack
RUN corepack enable && corepack prepare pnpm@9 --activate

WORKDIR /app

# сначала зависимости (кеш)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# потом код
COPY . .

# drizzle / node / ts доступны
CMD ["pnpm", "dev"]
