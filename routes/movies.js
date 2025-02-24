const express = require("express");
const router = express.Router();
const Movie = require("../models/moviesTR");

// Route to list all movies
router.get("/", async (req, res) => {
    try {
        const { genre, type } = req.query; //getting parameters from URL

        let filter = {};

        if (genre) {
            filter.genre = { $in: genre.split(',') };
        }

        if (type) {
            filter.type = type; // filter by "movie" or "series"
        }

        const movies = await Movie.find(filter);
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: "Error when searching for movies and series" });
    }
});

// Route to add a new movie
router.post("/", async (req, res) => {
    try {
        const { title, genre, rating, year, type } = req.body;
        //console.log("Received genre:", genre); // To see what is arriving on the server

        if(!title || !genre || !rating || !year || !type ) {
            return res.status(400).json({ error: "title, genre, rating, year and type are required" });
        }

        if (!["movie", "series"].includes(type)) {
            return res.status(400).json({ error: "Type must be 'movie' or 'series'" });
        }

        if (!Array.isArray(genre)) {
            return res.status(400).json({ error: "genre must be an array" });
        }

        const newMovie = new Movie({ title, genre, rating, year, type });
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ error: "Error adding movie" });
    }

});

// Update a movie by ID
router.put("/:id", async (req, res) => {
    try {
        const { title, rating, genre, year, type } = req.body;

        if (type && !["movie", "series"].includes(type)) {
            return res.status(400).json({ error: "Type must be 'movie' or 'series'" });
        }

        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id, // movie ID
            { title, rating, genre, year, type }, // Data to be updated
            { new: true } // Returns the new updated document
        );

        if (!updatedMovie) {
            return res.status(404).json({ error: "Movie or Series not found" });
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
