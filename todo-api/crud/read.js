const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function read() {
    const role = await prisma.role.findFirst({
        where: { id: 2 },
        include: { users: true },
    });

    console.log(role);
}

read();
