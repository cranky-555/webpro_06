"use strict";
const express = require("express");
const app = express();

let bbs = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(__dirname + "/public"));


app.post("/check", (req, res) => {
    res.json({ number: bbs.length });
});

app.post("/read", (req, res) => {
    const start = Number(req.body.start);
    res.json({ messages: bbs.slice(start) });
});

app.post("/post", (req, res) => {
    const id = Date.now();
    const { name, message } = req.body;
    bbs.push({ id, name, message, likes: 0 });
    res.json({ number: bbs.length });
});

app.delete("/bbs/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = bbs.findIndex((post) => post.id === id);
    if (index !== -1) {
        bbs.splice(index, 1);
        res.json({ message: "Post deleted" });
    } else {
        res.status(404).json({ error: "Post not found" });
    }
});

app.put("/bbs/:id", (req, res) => {
    const id = Number(req.params.id);
    const post = bbs.find((post) => post.id === id);
    if (post) {
        post.message = req.body.message || post.message;
        res.json(post);
    } else {
        res.status(404).json({ error: "Post not found" });
    }
});

app.post("/bbs/:id/like", (req, res) => {
    const id = Number(req.params.id);
    const post = bbs.find((post) => post.id === id);
    if (post) {
        post.likes += 1;
        res.json({ likes: post.likes });
    } else {
        res.status(404).json({ error: "Post not found" });
    }
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
