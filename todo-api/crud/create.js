const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function main() {
    const role = await prisma.role.create({
        data: {
            name: "User",
            users: {
                create: [
                    { name: "Alice", age: 22 },
                    { name: "Bob", age: 23 },
                ]
            }
        },
    });

    console.log(role);
}

main();