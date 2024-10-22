import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client/extension";

declare global {
    var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

if (process.env.NODE_ENV !== "production"){
    global.prisma = client;
} 

export default client;
