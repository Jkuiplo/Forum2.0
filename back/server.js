const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("АЛЕ");
});

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));