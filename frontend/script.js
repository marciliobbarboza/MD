function redirectTo(page) {
    window.location.href = page;
}

document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('username').textContent = username;
        document.getElementById('loginLink').style.display = 'none';
        document.getElementById('createAccountLink').style.display = 'none';
    }
});
document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("http://localhost:5000/api/movies"); // Substitua pela URL correta da sua API
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
            genreSections[primaryGenre].insertBefore(movieCard, genreSections[primaryGenre].querySelector(".next"));
        }
    });
});
function generateStars(rating) {
    const starColors = {
        1: "#E35F53",       // 1 estrela → Vermelho
        2: "#FFE629",    // 2 estrelas → Amarelo
        3: "#2BFF32",     // 3 estrelas → Verde
        4: "#36F9E2",      // 4 estrelas → Azul
        5: ["#E35F53", "#FFE629", "#2BFF32", "#36F9E2", "#1255FF"] // 5 estrelas → Todas as cores misturadas
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