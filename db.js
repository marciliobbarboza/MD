require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error(" MONGO_URI not defined in .env");
        }

        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(" Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
