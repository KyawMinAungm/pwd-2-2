const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function read() {
    const roles = await prisma.role.findMany({
        include: { users: true },
    });

    const user = await prisma.user.findFirst({
        where: { id: 1 },
        include: { role: true },
    });

    console.log(roles, user);
}

read();
