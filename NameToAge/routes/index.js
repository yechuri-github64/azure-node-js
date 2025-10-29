// src/routes/index.js
const express = require("express");
const router = express.Router();

router.get("/name-to-age", (req, res) => {
  const name = req.query.name || (req.body && req.body.name);
  if (!name) {
    return res.status(400).json({
      error: { code: "MISSING_NAME", message: "Name is required" }
    });
  }
  const age = name.length * 7;
  res.json({ name, age });
});

module.exports = router;
