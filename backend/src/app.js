const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const packageRoutes = require("./routes/packages.routes");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use("/uploads", express.static("src/uploads"));
app.use("/auth", authRoutes);
app.use("/packages", packageRoutes);

app.use(express.static("public"));
app.get("*", (_, res) =>
  res.sendFile(path.resolve("public/index.html"))
);

module.exports = app;
