const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);

// Rota de saúde
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Tratamento de rotas não encontradas
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
