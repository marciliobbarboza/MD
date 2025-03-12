document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id");

    if (!movieId) {
        alert("Movie ID not found!");
        return;
    }

    const username = localStorage.getItem("username");
    const userButton = document.getElementById("userButton");
    const loginLink = document.getElementById("loginLink");
    const createAccountLink = document.getElementById("createAccountLink");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const logoutButton = document.getElementById("logoutButton");
    const createButton = document.getElementById("createButton");

    if (username) {
        document.getElementById("username").textContent = username;
        loginLink.style.display = "none";
        createAccountLink.style.display = "none";
        userButton.style.display = "flex";

        if (createButton) {
            fetch("http://localhost:5000/api/check-admin", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                if (response.ok) {
                    document.getElementById("username").style.color = "#1255FF";
                    createButton.style.display = "block";
                } else {
                    document.getElementById("username").style.color = "#FFC107";
                }
            })
            .catch(error => console.error("Error checking admin:", error));
        }
    } else {
        userButton.style.display = "none";
    }

    if (userButton && dropdownMenu) {
        userButton.addEventListener("click", () => {
            dropdownMenu.classList.toggle("show");
        });

    
        window.addEventListener("click", (event) => {
            if (!userButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.remove("show");
            }
        });
    }

    // Logout do usuário
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("username"); 
            localStorage.removeItem("token");   
            window.location.href = "index.html"; 
        });
    }

    // Fetch movie details from API
    fetch(`http://localhost:5000/api/movies/${movieId}`)
        .then(response => response.json())
        .then(movie => {
           
            document.getElementById("movieTitle").textContent = movie.title;
            document.getElementById("moviePoster").src = movie.poster;
            document.getElementById("movieType").textContent = movie.type;
            document.getElementById("movieGenres").textContent = movie.genre.join(", ");
            document.getElementById("movieYear").textContent = movie.year;

           
            const starRating = document.getElementById("starRating");
            const reviewCount = document.getElementById("reviewCount");
            starRating.innerHTML = generateStars(movie.rating);
            reviewCount.textContent = `(${movie.reviews.length} reviews)`;

           
            renderUserRating(movieId, movie.userRating || 0);
        })
        .catch(error => {
            console.error("Erro ao buscar detalhes do filme:", error);
            alert("Falha ao carregar os detalhes do filme.");
        });

    
    function generateStars(rating) {
        const starColors = ["#E35F53", "#FFE629", "#2BFF32", "#36F9E2", "#1255FF"]; 

        let stars = "";
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                stars += `<span class="star" style="color: ${starColors[i - 1]}">&#9733;</span>`;
            } else {
                stars += `<span class="star" style="color: #D9D9D9">&#9733;</span>`;
            }
        }
        return stars;
    }

    
    function renderUserRating(movieId, savedRating) {
        const starContainer = document.getElementById("userRating");
        starContainer.innerHTML = ""; 

        for (let i = 1; i <= 5; i++) {
            const star = document.createElement("span");
            star.classList.add("star");
            star.innerHTML = "&#9733;";

            const starColors = ["#E35F53", "#FFE629", "#2BFF32", "#36F9E2", "#1255FF"];
            if (savedRating === 5) {
                star.style.color = starColors[i - 1];
            } else {
                star.style.color = i <= savedRating ? starColors[savedRating - 1] : "#D9D9D9";
            }

            star.addEventListener("mouseover", () => handleHover(i));
            star.addEventListener("mouseout", clearHover);
            star.addEventListener("click", () => handleRating(i, movieId));

            starContainer.appendChild(star);
        }
    }

    function handleHover(starIndex) {
        const stars = document.querySelectorAll("#userRating .star");
        const starColors = ["#E35F53", "#FFE629", "#2BFF32", "#36F9E2", "#1255FF"];

        stars.forEach((star, index) => {
            if (index < starIndex) {
                star.style.color = starColors[index] 
            } else {
                star.style.color = "#D9D9D9";
            }
        });
    }

    function clearHover() {
        const stars = document.querySelectorAll("#userRating .star");
        const activeColor = ["#E35F53", "#FFE629", "#2BFF32", "#36F9E2", "#1255FF"];

        stars.forEach((star, index) => {
            const activeStar = star.classList.contains("active");
            star.style.color = activeStar ? activeColor[index] : "#D9D9D9";
        });
    }

    function handleRating(starIndex, movieId) {
        const stars = document.querySelectorAll("#userRating .star");
        const starColors = ["#E35F53", "#FFE629", "#2BFF32", "#36F9E2", "#1255FF"];

        if (!localStorage.getItem("username")) {
            window.location.href = "create-account.html";
            return;
        }

        stars.forEach((star, index) => {
            if (index < starIndex) {
                star.style.color = starIndex === 5 ? starColors[index] : starColors[starIndex - 1];
            } else {
                star.style.color = "#D9D9D9";
            }
            star.classList.toggle("active", index < starIndex);
        });

        fetch(`http://localhost:5000/api/movies/${movieId}/review`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ rating: starIndex })
        })
        .then(response => {
            if (response.ok) {
                document.getElementById("ratingMessage").textContent = `Your rating: ${starIndex} stars!`;
            } else {
                response.json().then(error => {
                    document.getElementById("ratingMessage").textContent = `Erro: ${error.message}`;
                });
            }
        })
        .catch(error => {
            console.error("Erro ao salvar o rating:", error);
            document.getElementById("ratingMessage").textContent = "Falha ao salvar o rating.";
        });

        // Genres button redirects and saves changes
        document.getElementById('genresButton').addEventListener('click', () => {
            saveChanges(); 
            window.location.href = 'main-page.html';
        });

        function saveChanges() {
            const userRating = document.querySelectorAll('.star.active').length; 
            const movieId = new URLSearchParams(window.location.search).get('id');
            if (movieId && userRating) {
                fetch(`http://localhost:5000/api/movies/${movieId}/save`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({ userRating })
                }).catch(error => console.error('error saving changes:', error));
            }
        }

    }
});
