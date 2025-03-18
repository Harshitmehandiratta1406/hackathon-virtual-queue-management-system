const express = require("express");
const router = express.Router();
const Queue = require("../models/queueModel");

router.post("/join", (req, res) => {
    const { name, phone } = req.body;
    Queue.addToQueue(name, phone, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Added to queue", id: result.insertId });
    });
});

router.get("/queue", (req, res) => {
    Queue.getQueue((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

router.put("/serve", (req, res) => {
    Queue.serveNext((err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Next person served" });
    });
});

module.exports = router;
