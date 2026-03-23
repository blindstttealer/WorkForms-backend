# === Build ===
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

RUN npm ci

# Prisma generate не подключается к БД, но prisma.config.ts требует переменную
ENV DATABASE_URL="postgresql://x:x@x:5432/x"
RUN npx prisma generate

COPY . .
RUN npm run build

# === Production ===
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

# Prisma schema + миграции
COPY --from=build /app/prisma ./prisma

# Сгенерированный Prisma-клиент с query engine для Alpine Linux
COPY --from=build /app/src/generated ./src/generated

# Скомпилированное приложение
COPY --from=build /app/dist ./dist

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
