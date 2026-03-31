// js/auth.js
document.addEventListener('DOMContentLoaded', () => {
    actualizarHeaderAuth();
});

function loginFormSubmit(e) {
    e.preventDefault();
    const username = document.getElementById('auth-username').value;
    if (!username || username.trim() === '') {
        alert("Por favor ingresa un nombre de usuario.");
        return false;
    }
    
    // Simulate user creation/login
    const user = { username: username.trim(), createdAt: new Date().toISOString() };
    localStorage.setItem('cronogame_user', JSON.stringify(user));
    
    // Initialize default lists if they don't exist for this user
    if (!localStorage.getItem(`cronogame_lists_${user.username}`)) {
        const defaultLists = {
            "Favoritos": [],
            "Juegos Pendientes": []
        };
        localStorage.setItem(`cronogame_lists_${user.username}`, JSON.stringify(defaultLists));
    }
    
    window.location.href = "mis-listas.html";
    return false;
}

function logout() {
    localStorage.removeItem('cronogame_user');
    window.location.href = "index.html";
}

function getCurrentUser() {
    const userStr = localStorage.getItem('cronogame_user');
    if (!userStr) return null;
    return JSON.parse(userStr);
}

function actualizarHeaderAuth() {
    const user = getCurrentUser();
    const headerAuthContainer = document.getElementById('header-auth-container');
    if (!headerAuthContainer) return;
    
    if (user) {
        headerAuthContainer.innerHTML = `
            <a href="mis-listas.html" class="auth-btn user-btn" style="text-decoration:none; padding:8px 16px; border-radius:20px; font-size:0.9rem; margin-right:10px;">👤 ${user.username}</a>
            <button onclick="logout()" class="auth-btn logout-btn" style="background:transparent; padding:8px 16px; border-radius:20px; font-size:0.9rem; cursor:pointer;">Salir</button>
        `;
    } else {
        headerAuthContainer.innerHTML = `
            <a href="cuenta.html" class="auth-btn auth-login-btn" style="text-decoration:none; padding:8px 16px; border-radius:20px; font-size:0.9rem; font-weight:500;">Ingresar / Registro</a>
        `;
    }
}
