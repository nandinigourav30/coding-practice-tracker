const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashed],
    (err) => {
      if (err) return res.status(400).json(err);
      res.json("User registered");
    }
  );
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (result.length === 0) return res.status(400).json("User not found");

      const valid = await bcrypt.compare(password, result[0].password);
      if (!valid) return res.status(400).json("Wrong password");

      const token = jwt.sign({ id: result[0].id }, "secret");
      res.json({ token, userId: result[0].id });
    }
  );
});

module.exports = router;
