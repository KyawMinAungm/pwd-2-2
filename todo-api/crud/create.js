const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

prisma.user.create({
    data: {
        name: "Chris",
        age: 23,
        roleId: 1,
    }
}).then(user => {
    console.log(user);
});

async function main() {
    const user = await prisma.role.create({
        data: {
            name: "User",
            users: {
                create: [
                    { name: "Bob", age: 22 },
                    { name: "Eve", age: 22 },
                ]
            }
        },
    });

    console.log(user);

    const admin = await prisma.role.create({
		data: {
			name: "Admin",
			users: {
				create: [
                    { name: "Alice", age: 21 },
                ],
			},
		},
	});

    console.log(admin);
}

main();