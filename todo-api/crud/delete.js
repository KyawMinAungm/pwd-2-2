const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function remove() {
    const user = await prisma.user.delete({
        where: { id: 2 },
    });

    console.log(user);
}

remove();
