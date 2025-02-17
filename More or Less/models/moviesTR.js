const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
});

module.exports = mongoose.model("Movie", movieSchema);
