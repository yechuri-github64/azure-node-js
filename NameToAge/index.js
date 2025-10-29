// NameToAge/index.js
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "1mb" }));
app.use("/api", routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: { code: "NOT_FOUND", message: "Route not found" }
  });
});

module.exports = async function (context, req) {
  context.log(`HTTP ${req.method} ${req.url}`);

  // Mock Express response
  const res = {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: null,
    setHeader(key, value) { this.headers[key] = value; },
    status(code) { this.statusCode = code; return this; },
    json(obj) { this.body = JSON.stringify(obj); },
    end() { /* no-op */ }
  };

  // Mock Express request
  const expressReq = {
    method: req.method,
    url: req.url,
    originalUrl: req.url,
    headers: req.headers || {},
    query: req.query || {},
    body: req.body || {}
  };

  // Run Express and wait for it to call `next()`
  await new Promise((resolve, reject) => {
    const next = (err) => (err ? reject(err) : resolve());
    app(expressReq, res, next); // Express calls `next()` when done
  });

  // Send response to Azure
  context.res = {
    status: res.statusCode,
    headers: res.headers,
    body: res.body
  };
};
