const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded());

app.get("/items", async (req, res) => {
	const items = await prisma.item.findMany();
	setTimeout(() => {
        res.send(items);
    }, 2000);
});

app.get("/items/:id", async (req, res) => {
	const id = req.params.id;
	const item = await prisma.item.findFirst({
		where: { id: Number(id) },
	});

	res.json(item);
});

app.post("/items", async (req, res) => {
	const name = req.body?.name;
	if (!name) {
		return res.status(400).json({ msg: "name is required" });
	}

	const item = await prisma.item.create({
		data: {
			name,
			done: false,
		},
	});

	res.status(201).json(item);
});

app.put("/items/:id/toggle", async (req, res) => {
	const id = req.params.id;
	const item = await prisma.item.findFirst({
		where: { id: Number(id) },
	});

	const update = await prisma.item.update({
		where: { id: Number(id) },
		data: {
			done: !item.done,
		},
	});

	res.json(update);
});

app.listen(8800, () => {
	console.log("Todo API running at 8800...");
});
