document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id");

    if (!movieId) {
        alert("Movie ID not found!");
        return;
    }

    // Exibir o nome do usuário logado, se existir
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

        // Verifica se o usuário é admin
        if (createButton) {
            fetch("http://localhost:5000/api/check-admin", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                if (response.ok) {
                    // Usuário é admin: altera estilo e mostra o botão de criar
                    document.getElementById("username").style.color = "#1255FF";
                    createButton.style.display = "block";
                } else {
                    // Não é admin: cor padrão
                    document.getElementById("username").style.color = "#FFC107";
                }
            })
            .catch(error => console.error("Error checking admin:", error));
        }
    } else {
        userButton.style.display = "none";
    }

    // Alternar o menu dropdown ao clicar no botão do usuário
    if (userButton && dropdownMenu) {
        userButton.addEventListener("click", () => {
            dropdownMenu.classList.toggle("show");
        });

        // Fechar o dropdown ao clicar fora dele
        window.addEventListener("click", (event) => {
            if (!userButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.remove("show");
            }
        });
    }

    // Logout do usuário
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("username"); // Remove o nome do usuário
            localStorage.removeItem("token");   // Remove o token
            window.location.href = "index.html"; // Redireciona para a página inicial
        });
    }

    // Fetch movie details from API
    fetch(`http://localhost:5000/api/movies/${movieId}`)
        .then(response => response.json())
        .then(movie => {
            // Popula os detalhes do filme
            document.getElementById("movieTitle").textContent = movie.title;
            document.getElementById("moviePoster").src = movie.poster;
            document.getElementById("movieType").textContent = movie.type;
            document.getElementById("movieGenres").textContent = movie.genre.join(", ");
            document.getElementById("movieYear").textContent = movie.year;

            // Renderiza as estrelas do rating geral
            const starRating = document.getElementById("starRating");
            const reviewCount = document.getElementById("reviewCount");
            starRating.innerHTML = generateStars(movie.rating);
            reviewCount.textContent = `(${movie.reviews.length} reviews)`;

            // Carrega o rating do usuário
            renderUserRating(movieId, movie.userRating || 0);
        })
        .catch(error => {
            console.error("Erro ao buscar detalhes do filme:", error);
            alert("Falha ao carregar os detalhes do filme.");
        });

    // Gera as estrelas coloridas para o rating geral
    function generateStars(rating) {
        const starColors = ["#E35F53", "#FFE629", "#2BFF32", "#36F9E2", "#1255FF"]; // Cores específicas para cada estrela

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

    // Renderiza as estrelas do rating do usuário
    function renderUserRating(movieId, savedRating) {
        const starContainer = document.getElementById("userRating");
        starContainer.innerHTML = ""; // Limpa as estrelas anteriores

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
                star.style.color = starIndex === 5 ? starColors[index] : starColors[starIndex - 1];
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
            // Redireciona para a página de criação de conta se o usuário não estiver logado
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
    }
});
