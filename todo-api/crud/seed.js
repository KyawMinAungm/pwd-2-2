const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function seed() {
    const items = await prisma.item.createMany({
        data: [
            { name: "Apple", done: false },
            { name: "Egg", done: false },
            { name: "Bread", done: true },
            { name: "Butter", done: false },
        ],
    });

    console.log(items);
}

seed();
