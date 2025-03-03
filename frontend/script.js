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