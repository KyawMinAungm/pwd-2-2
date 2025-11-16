const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const postsRouter = require("./routes/posts");
app.use("/posts", postsRouter);

app.get("/", (req, res) => {
    res.json({ msg: "Social API", status: "Running..." });
});

app.listen(8800, () => {
    console.log("Social API running at port 8800...");
});
