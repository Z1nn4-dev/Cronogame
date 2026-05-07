// =============================== 
// ARCHIVO DE SCRIPT JAVASCRIPT: APP.JS 
// =============================== 

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registroForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const direccion = document.getElementById("direccion").value;
        const password = document.getElementById("password").value;

        if (nombre === "" || correo === "" || direccion === "" || password === "") {
            document.getElementById("mensaje").textContent = "Todos los campos son obligatorios.";
            document.getElementById("mensaje").style.color = "red";
            return;
        }

        const result = registerUser(nombre, correo, direccion, password);
        
        if (result.success) {
            document.getElementById("mensaje").textContent = result.message + " Redirigiendo...";
            document.getElementById("mensaje").style.color = "green";
            setTimeout(() => {
                window.location.href = "acceder.html";
            }, 1500);
        } else {
            document.getElementById("mensaje").textContent = result.message;
            document.getElementById("mensaje").style.color = "red";
        }
    });
});
