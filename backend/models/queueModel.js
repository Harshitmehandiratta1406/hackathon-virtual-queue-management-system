const db = require("../config/db");

const createQueueTable = () => {
    const sql = `CREATE TABLE IF NOT EXISTS queue (
         id INT AUTO_INCREMENT PRIMARY KEY,
         user_id INT NOT NULL,
         position INT NOT NULL,
         estimated_time INT NOT NULL,
         notified BOOLEAN DEFAULT FALSE,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    db.query(sql, (err) => {
        if (err) throw err;
        console.log("Queue table ready!");
    });
};

createQueueTable();

module.exports = {
    addToQueue: (name, phone, callback) => {
        const sql = "INSERT INTO queue (name, phone) VALUES (?, ?)";
        db.query(sql, [name, phone], callback);
    },
    getQueue: (callback) => {
        const sql = "SELECT * FROM queue WHERE status='waiting' ORDER BY timestamp ASC";
        db.query(sql, callback);
    },
    serveNext: (callback) => {
        const sql = "UPDATE queue SET status='served' WHERE id = (SELECT id FROM queue WHERE status='waiting' ORDER BY timestamp ASC LIMIT 1)";
        db.query(sql, callback);
    }
};
