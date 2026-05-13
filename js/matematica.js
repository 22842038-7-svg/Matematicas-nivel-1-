function reproducirNumero(numero){

    // Mensaje
    document.getElementById("mensaje").innerHTML =
    "¡Muy bien! Seleccionaste el número " + numero;

    // Número flotante
    const flotante =
    document.getElementById("numeroFlotante");

    // Mostrar número
    flotante.innerText = numero;

    // Reiniciar animación
    flotante.classList.remove("animar");

    // Reinicio forzado
    void flotante.offsetWidth;

    // Ejecutar animación
    flotante.classList.add("animar");

    // Voz
    let voz =
    new SpeechSynthesisUtterance(numero.toString());

    voz.lang = "es-ES";

    speechSynthesis.speak(voz);
}


// MENSAJE
function mostrarMensaje(){

    document.getElementById("mensaje").innerHTML =
    "Haz clic en un número para escucharlo 🎵";
}


// DATOS DEL USUARIO
let nombre = localStorage.getItem("nombre");

let avatar = localStorage.getItem("avatar");

if(nombre && avatar){

    document.getElementById("nombreUsuario").textContent =
    nombre;

    document.getElementById("avatarUsuario").src =
    avatar;
}