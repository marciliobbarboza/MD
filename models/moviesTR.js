const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: [{ type: String, required: true }], // Array
    rating: { type: Number, required: true, min: 1, max: 5 },
    releaseYear: Number,
});

module.exports = mongoose.model("Movie", movieSchema);
