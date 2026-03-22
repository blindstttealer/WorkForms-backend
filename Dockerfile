# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

RUN npm ci

# Prisma generate needs DATABASE_URL to load config, but doesn't connect to DB
ENV DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"
RUN npx prisma generate

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

# Prisma schema + migrations (for prisma migrate deploy at startup)
COPY --from=builder /app/prisma ./prisma

# Generated Prisma client with linux-musl query engine binary
COPY --from=builder /app/src/generated ./src/generated

# Compiled NestJS application
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
