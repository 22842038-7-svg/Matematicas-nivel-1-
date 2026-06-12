// ===============================
// NÚMEROS APRENDIDOS
// ===============================
let numerosAprendidos = [];


// ===============================
// BOTÓN OCULTO AL INICIO
// ===============================
document.querySelector(".boton").style.display =
"none";


// ===============================
// FUNCIÓN REPRODUCIR NÚMERO
// ===============================
function reproducirNumero(numero){

    // MENSAJE
    document.getElementById("mensaje").innerHTML =
    "🎉 ¡Muy bien! Seleccionaste el número " +
    numero;

    // NÚMERO FLOTANTE
    const flotante =
    document.getElementById("numeroFlotante");

    // MOSTRAR NÚMERO
    flotante.innerText =
    numero;

    // REINICIAR ANIMACIÓN
    flotante.classList.remove("animar");

    // FORZAR REINICIO
    void flotante.offsetWidth;

    // EJECUTAR ANIMACIÓN
    flotante.classList.add("animar");

    // VOZ DEL NÚMERO
    let voz =
    new SpeechSynthesisUtterance(
        numero.toString()
    );

    voz.lang = "es-ES";

    speechSynthesis.speak(voz);


    // ==========================
    // GUARDAR NÚMEROS APRENDIDOS
    // ==========================
    if(!numerosAprendidos.includes(numero)){

        numerosAprendidos.push(numero);

    }


    // ==========================
    // SI APRENDIÓ LOS 10
    // ==========================
    if(numerosAprendidos.length === 10){

        // MOSTRAR BOTÓN
        document.querySelector(".boton").style.display =
        "inline-block";

        // MENSAJE
        document.getElementById("mensaje").innerHTML =
        "🏆 ¡Excelente! Ya aprendiste todos los números. Presiona COMENZAR";

        // VOZ FELICITACIÓN
        let listo =
        new SpeechSynthesisUtterance(
            "Excelente. Ya aprendiste todos los números. Presiona comenzar"
        );

        listo.lang = "es-ES";

        speechSynthesis.speak(listo);

    }

}


// ===============================
// FUNCIÓN BOTÓN COMENZAR
// ===============================
function mostrarMensaje(){

    // MENSAJE FINAL
    document.getElementById("mensaje").innerHTML =
    "🏆 ¡Felicidades! Aprendiste todos los números. Ahora vamos a jugar 🎮";

    // VOZ FELICITACIÓN
    let felicitacion =
    new SpeechSynthesisUtterance(
        "Felicitaciones. Aprendiste todos los números. Ahora vamos a jugar"
    );

    felicitacion.lang = "es-ES";

    speechSynthesis.speak(felicitacion);

    // CAMBIAR FONDO
    document.body.style.background =
    "linear-gradient(135deg, #fff176, #ffb300, #ff6f00)";


    // ESPERAR 5 SEGUNDOS
    setTimeout(() => {

        // IR A LA PÁGINA DEL JUEGO
        window.location.href =
        "juego.html";

    }, 5000);

}


// ===============================
// DATOS DEL USUARIO
// ===============================
let nombre =
localStorage.getItem("nombre");

let avatar =
localStorage.getItem("avatar");


// ===============================
// MOSTRAR DATOS
// ===============================
if(nombre && avatar){

    document.getElementById("nombreUsuario").textContent =
    nombre;

    document.getElementById("avatarUsuario").src =
    avatar;

}