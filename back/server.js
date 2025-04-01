require('./models/Thread');
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const dotenv = require("dotenv");

const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);

const threadRoutes = require("./routes/threadRoutes");
app.use("/api/threads", threadRoutes);

const commentRoutes = require("./routes/commentRoutes");
app.use("/api/comments", commentRoutes);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));