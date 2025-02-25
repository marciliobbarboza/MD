const express = require("express");
const router = express.Router();
const Movie = require("../models/moviesTR");
const protect = require("../middlewares/auth");

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


// Create or update assessment
router.post("/:id/review", protect, async (req, res) => {
    const { rating } = req.body;
    const movieId = req.params.id;
    const userId = req.userId; // the userID will be filled by the middleware when the tolken is send

    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ error: "Rating must be between 1 and 5." });
    }

    try {
        // check if the media exist
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        // check if user have review
        let review = movie.reviews.find(review => review.userId.toString() === userId);

        if (review) {
            // if yes update the rview
            review.rating = rating;
        } else {
            // if not create a new
            movie.reviews.push({ userId, rating });
        }

        // recalculate the average of reviews
        const totalRatings = movie.reviews.length;
        const totalScore = movie.reviews.reduce((acc, review) => acc + review.rating, 0);
        movie.rating = totalScore / totalRatings; 

        await movie.save();

        res.status(200).json({ message: "Review added/updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error adding/updating review" });
    }
});

// Get info from media
router.get("/:id", protect, async (req, res) => {
    const movieId = req.params.id;
    const userId = req.userId; // userId for logged users

    try {
        const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        let userRating = null;
        if (userId) {
            // show logged user reviews
            const review = movie.reviews.find(review => review.userId.toString() === userId);
            if (review) {
                userRating = review.rating;
            }
        }

        // calculate percentage of reviews
        const ratingPercentages = movie.reviews.reduce((acc, review) => {
            acc[review.rating] = (acc[review.rating] || 0) + 1;
            return acc;
        }, {});

        // calculate of reviews
        const totalReviews = movie.reviews.length;
        for (let rating in ratingPercentages) {
            ratingPercentages[rating] = `${((ratingPercentages[rating] / totalReviews) * 100).toFixed(2)}%`;
        }

        // show all info
        res.json({
            ...movie.toObject(),
            userRating,  
            ratingPercentages
        });
    } catch (error) {
        res.status(500).json({ error: "Error fetching movie details" });
    }
});

module.exports = router;
