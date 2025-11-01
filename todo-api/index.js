const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get("/items", (req, res) => {
    res.json([
        { id: 3, name: "Apple", done: false },
        { id: 2, name: "Orange", done: true },
        { id: 1, name: "Egg", done: false },
    ]);
});

app.get("/items/:id", (req, res) => {
	const id = req.params.id;
	res.json({ id });
});

app.post("/items", (req, res) => {
    const name = req.body?.name;
    if(!name) {
        return res.status(400).json({ msg: "name is required" });
    }

    res.json({ name });
});

app.listen(8800, () => {
    console.log("Todo API running at 8800...");
});
