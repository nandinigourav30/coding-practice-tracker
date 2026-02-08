const express = require("express");
const db = require("../db");

const router = express.Router();

router.post("/", (req, res) => {
  const { user_id, title, platform, difficulty, topic, solved_date, notes } = req.body;

  db.query(
    "INSERT INTO problems VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)",
    [user_id, title, platform, difficulty, topic, solved_date, notes],
    (err) => {
      if (err) return res.status(400).json(err);
      res.json("Problem added");
    }
  );
});

router.get("/:user_id", (req, res) => {
  db.query(
    "SELECT * FROM problems WHERE user_id = ?",
    [req.params.user_id],
    (err, result) => {
      if (err) return res.status(400).json(err);
      res.json(result);
    }
  );
});

module.exports = router;
