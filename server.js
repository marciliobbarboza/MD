require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db"); // Import the connection to MongoDB
const path = require("path");
const app = express();

connectDB();

//app.use(limiter);
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'frontend')));

// autentification rotes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
    res.send("API working!");
});

// import routes after connecting to the bank
const movieRoutes = require("./routes/movies");
app.use("/api/movies", movieRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
