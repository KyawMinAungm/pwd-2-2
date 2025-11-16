const express = require("express");
const router = express.Router();

const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const auth = require("../middlewares/auth");

router.get("/", async (req, res) => {
	const posts = await prisma.post.findMany({
		orderBy: { id: "desc" },
		take: 20,
		include: {
			user: true,
			comments: true,
		},
	});

	res.json(posts);
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;

	const post = await prisma.post.findFirst({
        where: {
            id: Number(id),
        },
		include: {
			user: true,
			comments: {
                include: {
                    user: true,
                }
            },
		},
	});

	res.json(post);
});

module.exports = router;
