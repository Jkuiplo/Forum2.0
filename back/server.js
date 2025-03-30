const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const dotenv = require("dotenv");

const PORT = process.env.PORT || 5000;
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));