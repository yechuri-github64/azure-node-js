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
  // Mock Express res object
  const res = {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: null,
    setHeader: (key, value) => { res.headers[key] = value; },
    status: (code) => { res.statusCode = code; return res; },
    json: (obj) => { res.body = JSON.stringify(obj); }
  };

  // Mock Express req object
  const expressReq = {
    method: req.method,
    url: req.url,
    originalUrl: req.url,
    headers: req.headers,
    query: req.query || {},
    body: req.body || {}
  };

  // Run Express app
  await new Promise((resolve) => {
    app(expressReq, res);
    resolve();
  });

  // Send to Azure
  context.res = {
    status: res.statusCode,
    headers: res.headers,
    body: res.body
  };
};
