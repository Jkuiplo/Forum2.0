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

app.use(cors());


app.use("/api/auth", authRoutes);

const threadRoutes = require("./routes/threadRoutes");
app.use("/api/threads", threadRoutes);

const commentRoutes = require("./routes/commentRoutes");
app.use("/api/comments", commentRoutes);

const path = require("path");

// Путь к фронтенду
const frontPath = path.resolve(__dirname, "../front/");
const tempPath = path.resolve(__dirname, "../front/public/")


// Раздача статики
app.use(express.static(frontPath));

app.get("/", (req, res) => {
	res.sendFile(path.join(frontPath, "index.html"));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(tempPath, "register.html"));
});

app.get("/login", (req, res) => {
	res.sendFile(path.join(tempPath, "login.html"));
    });
    
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));