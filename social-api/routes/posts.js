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

router.post("/", auth, async (req, res) => {
	const content = req.body?.content;

	if (!content?.trim()) {
		return res.status(400).json({ msg: "content is required" });
	}

	try {
		const post = await prisma.post.create({
			data: {
				content: content.trim(),
				userId: req.user.id,
			},
			include: {
				user: true,
				comments: {
					include: {
						user: true,
					},
				},
			},
		});

		return res.status(201).json(post);
	} catch (error) {
		console.error("Error creating post", error);
		return res.status(500).json({ msg: "Unable to create post" });
	}
});

router.post("/:id/comments", auth, async (req, res) => {
	const id = Number(req.params.id);
	const content = req.body?.content;

	if (!Number.isInteger(id)) {
		return res.status(400).json({ msg: "Invalid post id" });
	}

	if (!content?.trim()) {
		return res.status(400).json({ msg: "content is required" });
	}

	try {
		const comment = await prisma.comment.create({
			data: {
				content: content.trim(),
				postId: id,
				userId: req.user.id,
			},
			include: {
				user: true,
			},
		});

		return res.status(201).json(comment);
	} catch (error) {
		if (error.code === "P2003") {
			return res.status(404).json({ msg: "Post not found" });
		}

		console.error("Error creating comment", error);
		return res.status(500).json({ msg: "Unable to create comment" });
	}
});

module.exports = router;
