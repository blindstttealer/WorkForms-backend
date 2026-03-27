import {PrismaClient} from "../generated/client";

export const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
});

prisma.$connect()
    .then(() => {
        console.log("[Prisma] Successfully connected to the database");
    })
    .catch((err: unknown) => {
        console.error("[Prisma] Failed to connect to the database:", err);
    });