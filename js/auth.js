// =============================== 
// ARCHIVO DE SCRIPT JAVASCRIPT: AUTH.JS 
// =============================== 

// js/auth.js
document.addEventListener('DOMContentLoaded', () => {
    actualizarHeaderAuth();
});

function loginFormSubmit(e) {
    e.preventDefault();
    const username = document.getElementById('auth-username').value;
    const passwordElem = document.getElementById('auth-password');
    const password = passwordElem ? passwordElem.value : "";
    
    if (!username || username.trim() === '') {
        showToast("Por favor ingresa un nombre de usuario o email.", "error");
        return false;
    }
    
    if (!password || password.trim() === '') {
        showToast("Por favor ingresa tu contraseña.", "error");
        return false;
    }
    
    // Call user_data.js validation
    const result = authenticateUser(username.trim(), password);
    
    if (result.success) {
        localStorage.setItem('cronogame_user', JSON.stringify(result.user));
        window.location.href = "mis-listas.html";
    } else {
        showToast(result.message, "error");
    }
    

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
            <a href="mis-listas.html" class="auth-btn user-btn" style="text-decoration:none; padding:8px 16px; border-radius:20px; font-size:0.9rem; margin-right:10px;">👤 ${user.nombre || user.username}</a>
            <button onclick="logout()" class="auth-btn logout-btn" style="background:transparent; padding:8px 16px; border-radius:20px; font-size:0.9rem; cursor:pointer;">Salir</button>
        `;
    } else {
        headerAuthContainer.innerHTML = `
            <div style="position: relative; display: inline-block;" id="auth-dropdown-container">
                <button onclick="toggleAuthDropdown()" class="auth-btn auth-login-btn" style="background:transparent; padding:8px 16px; border-radius:20px; font-size:0.9rem; font-weight:500; cursor:pointer;">Ingresar ▾</button>
                <div id="auth-dropdown-menu" style="display: none; position: absolute; right: 0; top: 100%; margin-top: 5px; background-color: #1a1a1a; border: 1px solid #333; border-radius: 8px; overflow: hidden; z-index: 1000; box-shadow: 0 4px 12px rgba(0,0,0,0.5); min-width: 120px; text-align: left;">
                    <a href="acceder.html" class="dropdown-item" style="display: block; padding: 10px 15px; color: #fff; text-decoration: none; font-size: 0.9rem; border-bottom: 1px solid #333;">Acceder</a>
                    <a href="registro.html" class="dropdown-item" style="display: block; padding: 10px 15px; color: #fff; text-decoration: none; font-size: 0.9rem;">Registro</a>
                </div>
            </div>
        `;
    }
}

window.toggleAuthDropdown = function() {
    const menu = document.getElementById('auth-dropdown-menu');
    if(menu) {
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    }
};

document.addEventListener('click', function(e) {
    const container = document.getElementById('auth-dropdown-container');
    if(container && !container.contains(e.target)) {
        const menu = document.getElementById('auth-dropdown-menu');
        if(menu) menu.style.display = 'none';
    }
});
