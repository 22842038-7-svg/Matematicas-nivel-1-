// Obtener datos guardados
let nombre = localStorage.getItem("nombre");
let avatar = localStorage.getItem("avatar");

console.log("Nombre:", nombre);
console.log("Avatar:", avatar);

// Verificar datos
if (nombre && avatar) {

    // Mostrar nombre
    document.getElementById("nombreUsuario").textContent = nombre;

    // Mostrar avatar
    document.getElementById("avatarUsuario").src = avatar;

    // Saludo
    document.getElementById("saludo").textContent =
        "¡Bienvenido " + nombre + "!";

    hablar("Bienvenido " + nombre);

} else {

    alert("No hay datos guardados");

    // Volver al login
    window.location.href = "index.html";
}


// Voz
function hablar(texto) {

    let mensaje = new SpeechSynthesisUtterance(texto);

    mensaje.lang = "es-CL";
    mensaje.rate = 1;
    mensaje.pitch = 1;

    speechSynthesis.cancel();
    speechSynthesis.speak(mensaje);
}



function continuar() 
{
    window.location.href = "matematica.html";
}