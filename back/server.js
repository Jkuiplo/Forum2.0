require('./models/Thread');
const path = require("path");
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const dotenv = require("dotenv");


const PORT = process.env.PORT || 4000;

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const routes = require("./routes/routes");
app.use("/", routes);

const authRoutes = require('./routes/authRoutes');
app.use("/api/auth", authRoutes);

const threadRoutes = require("./routes/threadRoutes");
app.use("/api/threads", threadRoutes);

const commentRoutes = require("./routes/commentRoutes");
app.use("/api/comments", commentRoutes);


app.use('/public', express.static(path.join(__dirname, '..', '/front/public')));

app.use('/src', express.static(path.join(__dirname, '..', '/front/src')));

app.use('/img', express.static(path.join(__dirname, '..', '/front/public/img')));

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));