document.addEventListener("DOMContentLoaded", async () => {
    const username = localStorage.getItem("username");
    const userButton = document.getElementById("userButton");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const filterMovies = document.getElementById("filterMovies");
    const filterSeries = document.getElementById("filterSeries");
    const ratedMoviesSection = document.getElementById("ratedMoviesSection");
    const ratedSeriesSection = document.getElementById("ratedSeriesSection");
    const noRatingsMessage = document.getElementById("noRatingsMessage");

    if (username) {
        document.getElementById("username").textContent = username;

        // Check if the user is admin
        try {
            const response = await fetch("http://localhost:5000/api/check-admin", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.ok) {
                document.getElementById("username").style.color = "#1255FF"; 
                const adminButton = document.getElementById("createButton");
                if (adminButton) {
                    adminButton.style.display = "block"; 
                }
            } else {
                document.getElementById("username").style.color = "#FFC107"; 
            }
        } catch (error) {
            console.error("Error checking admin status:", error);
        }
    } else {
        alert("Please log in.");
        window.location.href = "login.html";
    }

    // Toggle dropdown
    userButton.addEventListener("click", () => {
        dropdownMenu.classList.toggle("show");
    });

    // Close dropdown when clicking outside
    window.addEventListener("click", (event) => {
        if (!userButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove("show");
        }
    });

    // Logout
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem('username');
            window.location.href = "index.html";
        });
    }

    filterMovies.addEventListener("change", updateFilters);
    filterSeries.addEventListener("change", updateFilters);

    function updateFilters() {
        const showMovies = document.getElementById("filterMovies").checked;
        const showSeries = document.getElementById("filterSeries").checked;

        if (!showMovies && !showSeries) {
            document.getElementById("ratedMoviesSection").style.display = "block";
            document.getElementById("ratedSeriesSection").style.display = "block";
        } else {
            document.getElementById("ratedMoviesSection").style.display = showMovies ? "block" : "none";
            document.getElementById("ratedSeriesSection").style.display = showSeries ? "block" : "none";
        }
    }

    // Load user-rated content
    try {
        const response = await fetch("http://localhost:5000/api/auth/reviews", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const userRatings = await response.json();
        if (!userRatings.length) {
            noRatingsMessage.style.display = "block";
        } else {
            renderContent(userRatings, ratedMoviesSection, "movie");
            renderContent(userRatings, ratedSeriesSection, "series");
        }
    } catch (error) {
        console.error("Failed to load ratings:", error);
    }
});

function renderContent(ratings, section, type) {
    const grid = section.querySelector(".content-grid");
    grid.innerHTML = "";
    ratings
        .filter((rating) => rating.type === type)
        .forEach((rating) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <img src="${rating.poster}" alt="${rating.title}">
                <div class="rating">${generateStars(rating.rating)}</div>
            `;
            grid.appendChild(card);
        });
}

function generateStars(rating) {
    const starColors = ["#E35F53", "#FFE629", "#2BFF32", "#36F9E2", "#1255FF"]; 

    let stars = "";
    for (let i = 1; i <= rating; i++) {
        stars += `<span class="star" style="color: ${starColors[i - 1]}">&#9733;</span>`;
    }
    return stars;
}
