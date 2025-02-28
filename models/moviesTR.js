const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: [{ type: String, required: true }], // Array
    rating: { type: Number, required: true, min: 1, max: 5 },
    year: { type: Number, required: true},
    type: { type: String, enum: ["movie", "series"], required: true },
    poster: { type: String, required: true },
    reviews: [
        {
            userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, //user Id
            rating: { type: Number, required: true, min: 1, max: 5 } // rate 1 to 5
        }
    ]
});

module.exports = mongoose.model("Movie", movieSchema);
