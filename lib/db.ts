import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

declare global {
    var cachedPrisma: PrismaClient
}
let prisma: PrismaClient
if(process.env.NODE_ENV === "production"){
    prisma = new PrismaClient()
}else{
    if(!global.cachedPrisma){
        global.cachedPrisma = new PrismaClient()
    }
    prisma = global.cachedPrisma
}

async function main() {
    const hashedPassword = await bcrypt.hash('your_password_here', 10);

    await prisma.user.upsert({
        where: { email: 'test5@gmail.com' },
        update: {},
        create: {
            email: 'test5@gmail.com',
            name: 'test5',
            hashedPassword: hashedPassword,
        },
    });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

export const db = prisma 

