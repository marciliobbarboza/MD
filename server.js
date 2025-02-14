require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db"); // Import the connection to MongoDB
const app = express();
const rateLimit = require("express-rate-limit");


// Connect to MongoDB before starting the server
connectDB();

// Rate Limiting
// const limiter = rateLimit({
    // windowMs: 15 * 60 * 1000, // 15 minutos
   //  max: 100, // Limita a 100 requisições por IP
    // message: "try latter.",
  // });
  
app.use(limiter);
app.use(express.json());
app.use(cors());

// Autentification rotes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
    res.send("API working!");
});

// Import routes after connecting to the bank
const movieRoutes = require("./routes/movies");
app.use("/api/movies", movieRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
