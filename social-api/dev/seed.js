const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

async function seed() {
	console.log("User seeding started...");
	await prisma.user.create({
		data: {
			name: "Alice",
			username: "alice",
			bio: faker.person.bio(),
			password: await bcrypt.hash("password", 10),
		},
	});

	for (let i = 0; i < 9; i++) {
		const first = faker.person.firstName();
		const last = faker.person.lastName();
		const password = await bcrypt.hash("password", 10);

		await prisma.user.create({
			data: {
				name: `${first} ${last}`,
				username: `${first}${last[0]}`.toLowerCase(),
				bio: faker.person.bio(),
				password,
			},
		});
	}
	console.log("User seeding done.\n");

	console.log("Post seeding started.");
	for (let i = 0; i < 20; i++) {
		await prisma.post.create({
			data: {
				content: faker.lorem.paragraph(),
				userId: faker.number.int({ min: 1, max: 10 }),
			},
		});
	}
	console.log("Post seeding done.\n");

	console.log("Comment seeding started...");
	for (let i = 0; i < 40; i++) {
		await prisma.comment.create({
			data: {
				content: faker.lorem.paragraph(),
				userId: faker.number.int({ min: 1, max: 10 }),
				postId: faker.number.int({ min: 1, max: 20 }),
			},
		});
	}
	console.log("Comment seeding done.");
}

seed();
