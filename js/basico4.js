window.onload = ()=>{

let nombre =
localStorage.getItem("nombre") || "Estudiante";

let avatar =
localStorage.getItem("avatar") || "";

document
.getElementById("nombreUsuario")
.innerHTML = nombre;

document
.getElementById("avatarUsuario")
.src = avatar;

hablar(
"Bienvenido. Hoy aprenderemos suma, resta, multiplicación y división."
);

};

function hablar(texto){

speechSynthesis.cancel();

let voz =
new SpeechSynthesisUtterance(texto);

voz.lang = "es-ES";

speechSynthesis.speak(voz);

}

function comenzarJuego(){

location.href =
"juego1.html";

}