const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "tracker_user",
  password: "tracker123",
  database: "coding_tracker"
});

db.connect(err => {
  if (err) {
    console.error("DB ERROR:", err);
    return;
  }
  console.log("MySQL Connected");
});

module.exports = db;

