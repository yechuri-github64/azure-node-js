const express = require("express");
const cors = require("cors");
const createHandler = require("azure-function-express").createHandler;
const routes = require("./routes"); // ✅ corrected path

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// mount routes
app.use("/api", routes);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({
    error: { code: "NOT_FOUND", message: "Route not found" }
  });
});

// export as Azure Function handler
module.exports = createHandler(app);
