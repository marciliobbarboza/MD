document.addEventListener("DOMContentLoaded", () => {
    // Fetch movie ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id");

    if (!movieId) {
        alert("Movie ID not found!");
        return;
    }

    // Fetch movie details from API
    fetch(`http://localhost:5000/api/movies/${movieId}`)
        .then(response => response.json())
        .then(movie => {
            // Populate page with movie details
            document.getElementById("movieTitle").textContent = movie.title;
            document.getElementById("moviePoster").src = movie.poster;
            document.getElementById("movieType").textContent = movie.type;
            document.getElementById("movieGenres").textContent = movie.genre.join(", ");
            document.getElementById("movieYear").textContent = movie.year;

            // Update rating and reviews
            const starRating = document.getElementById("starRating");
            const reviewCount = document.getElementById("reviewCount");

            starRating.innerHTML = generateStars(movie.rating);
            reviewCount.textContent = `(${movie.reviews.length} reviews)`;
        })
        .catch(error => {
            console.error("Error fetching movie details:", error);
            alert("Failed to load movie details.");
        });

    // Generate colored stars for ratings
    function generateStars(rating) {
        const starColors = {
            1: "#E35F53",
            2: "#FFE629",
            3: "#2BFF32",
            4: "#36F9E2",
            5: ["#E35F53", "#FFE629", "#2BFF32", "#36F9E2", "#1255FF"]
        };

        let stars = "";
        if (rating < 5) {
            for (let i = 0; i < rating; i++) {
                stars += `<span class="star" style="color: ${starColors[rating]}">&#9733;</span>`;
            }
        } else {
            for (let i = 0; i < 5; i++) {
                stars += `<span class="star" style="color: ${starColors[5][i]}">&#9733;</span>`;
            }
        }
        return stars;
    }
});
