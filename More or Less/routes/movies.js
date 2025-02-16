const express = require("express");
const router = express.Router();
const Movie = require("../models/moviesTR");

// Route to list all movies
router.get("/", async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: "Error when searching for movies" });
    }
});

// Route to add a new movie
router.post("/", async (req, res) => {
    try {
        const { title, rating } = req.body;
        const newMovie = new Movie({ title, rating });
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ error: "Error adding movie" });
    }

});

// Update a movie by ID
router.put("/:id", async (req, res) => {
    try {
        const { title, rating } = req.body;
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id, // movie ID
            { title, rating }, // Data to be updated
            { new: true } // Returns the new updated document
        );

        if (!updatedMovie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        res.json(updatedMovie);
    } catch (error) {
        res.status(500).json({ error: "Error updating movie" });
    }
});

// Deleting a movie by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

        if (!deletedMovie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        res.json({ message: "Successfully deleted movie" });
    } catch (error) {
        res.status(500).json({ error: "Error when deleting the movie" });
    }
});

module.exports = router;
