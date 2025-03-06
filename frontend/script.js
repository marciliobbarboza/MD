// Redirecionar para outra página
function redirectTo(page) {
    window.location.href = page;
}

document.addEventListener("DOMContentLoaded", () => {
    // Exibir o nome do usuário logado, se existir
    const username = localStorage.getItem('username');
    const userButton = document.getElementById('userButton');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const logoutButton = document.getElementById('logoutButton');

    if (username) {
        document.getElementById('username').textContent = username;
        document.getElementById('loginLink').style.display = 'none';
        document.getElementById('createAccountLink').style.display = 'none';
        userButton.style.display = 'flex';
    } else {
        userButton.style.display = 'none';
    }

    // Alternar menu suspenso
    if (userButton && dropdownMenu) {
        userButton.addEventListener("click", () => {
            dropdownMenu.classList.toggle("show");
        });

        // Fechar dropdown ao clicar fora
        window.addEventListener("click", (event) => {
            if (!userButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.remove("show");
            }
        });
    }

    // Logout
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem('username');
            window.location.href = "index.html";
        });
    }

    // Checar se o usuário é admin e exibir botões específicos
    const createButton = document.getElementById("createButton");
    if (username && createButton) {
        try {
            fetch("http://localhost:5000/api/check-admin", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).then(response => {
                if (response.ok) {
                    document.getElementById('username').style.color = "#1255FF";
                    createButton.style.display = "block";
                } else {
                    document.getElementById('username').style.color = "#FFC107";
                }
            }).catch(error => console.error("Error checking admin:", error));
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // Carregar filmes e organizar por gêneros
    fetch("http://localhost:5000/api/movies").then(async (response) => {
        const movies = await response.json();
        const genreSections = {
            "music": document.querySelector(".genre-section:nth-of-type(1) .carousel"),
            "Action": document.querySelector(".genre-section:nth-of-type(2) .carousel"),
            "drama": document.querySelector(".genre-section:nth-of-type(3) .carousel")
        };

        movies.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("card");
            movieCard.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}">
                <div class="rating">${generateStars(movie.rating)}</div>
            `;

            const primaryGenre = movie.genre[0];
            if (genreSections[primaryGenre]) {
                genreSections[primaryGenre].insertBefore(
                    movieCard,
                    genreSections[primaryGenre].querySelector(".next")
                );
            }
        });
    }).catch(error => console.error("Error fetching movies:", error));

    // Gerar estrelas de acordo com a avaliação
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
                stars += `<span class="star star-${rating}">&#9733;</span>`;
            }
        } else {
            for (let i = 0; i < 5; i++) {
                stars += `<span class="star" style="color: ${starColors[5][i]}">&#9733;</span>`;
            }
        }
        return stars;
    }

    // Função para o formulário de envio de filmes
    const movieForm = document.getElementById("movieForm");
    if (movieForm) {
        movieForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const title = document.getElementById("title").value;
            const genre = document.getElementById("genre").value;
            const rating = document.getElementById("rating").value;
            const year = document.getElementById("year").value;
            const typeMovie = document.getElementById("typeMovie")?.checked;
            const typeSeries = document.getElementById("typeSeries")?.checked;
            const posterInput = document.getElementById("posterInput").files[0];

            if (!posterInput) {
                alert("Please upload a poster!");
                return;
            }

            const formData = new FormData();
            formData.append("title", title);
            formData.append("genre", genre);
            formData.append("rating", rating);
            formData.append("year", year);
            formData.append("type", typeMovie ? "Movies" : typeSeries ? "Series" : "");
            formData.append("poster", posterInput);

            try {
                const response = await fetch("http://localhost:5000/api/movies", {
                    method: "POST",
                    body: formData
                });
                if (response.ok) {
                    alert("Movie added successfully!");
                    window.location.href = "main-page.html";
                } else {
                    alert("Failed to add movie.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred.");
            }
        });
    }

    // display selected image in poster container
    const posterInput = document.getElementById("posterInput");
    const posterPreview = document.getElementById("posterPreview");
    const posterImage = document.getElementById("posterImage");
    const removePosterButton = document.getElementById("removePosterButton");

    if (posterInput && posterPreview && posterImage && removePosterButton) {
        posterInput.addEventListener("change", () => {
            const file = posterInput.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    posterImage.src = e.target.result;
                    posterPreview.classList.remove("hidden");
                };
                reader.readAsDataURL(file);
            }
        });

        removePosterButton.addEventListener("click", () => {
            posterInput.value = "";
            posterImage.src = "";
            posterPreview.classList.add("hidden");
        });
    } else {
        console.error("Poster elements are missing in the DOM.");
    }
});
