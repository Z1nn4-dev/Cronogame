// Manejo del tema Claro/Oscuro
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const root = document.documentElement;

    // Verificar si el usuario ya tenía un tema guardado
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        root.classList.add('light-theme');
        if (themeToggleBtn) themeToggleBtn.innerHTML = '🌙 Modo Oscuro';
    } else {
        root.classList.remove('light-theme');
        if (themeToggleBtn) themeToggleBtn.innerHTML = '☀️ Modo Claro';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            root.classList.toggle('light-theme');

            if (root.classList.contains('light-theme')) {
                localStorage.setItem('theme', 'light');
                themeToggleBtn.innerHTML = '🌙 Modo Oscuro';
            } else {
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.innerHTML = '☀️ Modo Claro';
            }
        });
    }
});
