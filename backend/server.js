const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors()); // Allow frontend requests


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Function to get queue position and waiting time
const getQueuePosition = (userId, callback) => {
    db.query("SELECT queue_number FROM users WHERE id = ?", [userId], (err, result) => {
        if (err) return callback(err, null);
        if (result.length === 0) return callback(null, { position: -1, time: 0 });

        const userQueueNumber = result[0].queue_number;
        db.query("SELECT COUNT(*) AS count FROM users WHERE queue_number < ?", [userQueueNumber], (err, countResult) => {
            if (err) return callback(err, null);

            let position = countResult[0].count;
            let estimatedTime = position * 5; // Assuming each person takes 5 minutes
            callback(null, { position, estimatedTime });
        });
    });
};

// Function to send email notification
const sendNotification = (email) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your Turn is Coming Soon!",
        text: "Only 5 people are left before you! Please be ready."
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.error("Email error:", err);
        else console.log("Notification sent:", info.response);
    });
};

// Endpoint to join the queue
app.post("/join-queue", (req, res) => {
    const { name, email } = req.body;

    db.query("SELECT MAX(queue_number) AS maxQueue FROM users", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        let newQueueNumber = result[0].maxQueue ? result[0].maxQueue + 1 : 1;

        db.query("INSERT INTO users (name, email, queue_number) VALUES (?, ?, ?)", [name, email, newQueueNumber], (err, insertResult) => {
            if (err) return res.status(500).json({ error: err.message });

            res.json({ message: "Added to queue", queue_number: newQueueNumber });

            // Check if user is at position 5
            getQueuePosition(insertResult.insertId, (err, data) => {
                if (!err && data.position === 5) {
                    sendNotification(email);
                }
            });
        });
    });
});

// Endpoint to check queue position
app.get("/queue-position/:userId", (req, res) => {
    const userId = req.params.userId;
    getQueuePosition(userId, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(data);
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
