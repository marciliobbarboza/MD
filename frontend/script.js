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

document.addEventListener("DOMContentLoaded", () => {
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

    // toggle menu visibility when clicking on name
    userButton.addEventListener("click", () => {
        dropdownMenu.classList.toggle("show");
    });

    
    logoutButton.addEventListener("click", () => {
        localStorage.removeItem('username');
        window.location.href = "index.html";
    });

    // close dropdown if click outside
    window.addEventListener("click", (event) => {
        if (!userButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove("show");
        }
    });
});

document.addEventListener("DOMContentLoaded", async () => {
    const username = localStorage.getItem("username");
    const userSpan = document.getElementById("username");

    if (username) {
        userSpan.textContent = username;
        document.getElementById("loginLink").style.display = "none";
        document.getElementById("createAccountLink").style.display = "none";

        // Verifica se o usuário é admin
        try {
            const response = await fetch("http://localhost:5000/api/check-admin", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.ok) {
                // Admin: cor azul
                userSpan.style.color = "#1255FF";
            } else {
                // Não admin: cor padrão
                userSpan.style.color = "#FFC107"; // Mantendo a cor padrão para usuários normais
            }
        } catch (error) {
            console.error("Erro ao verificar se o usuário é admin:", error);
        }
    }
});




document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("http://localhost:5000/api/movies"); 
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