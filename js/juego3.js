let vidas = 3;
let puntos = 0;
let correcta = 0;

window.onload = ()=>{

document.getElementById("nombreUsuario").innerHTML =
localStorage.getItem("nombre") || "Estudiante";

document.getElementById("avatarUsuario").src =
localStorage.getItem("avatar") || "";

hablar(
"Bienvenido al juego de restas."
);

nuevaPregunta();

};

function hablar(texto){

speechSynthesis.cancel();

let voz =
new SpeechSynthesisUtterance(texto);

voz.lang="es-ES";

speechSynthesis.speak(voz);

}

function nuevaPregunta(){

let a =
Math.floor(Math.random()*10)+10;

let b =
Math.floor(Math.random()*9)+1;

correcta = a-b;

document.getElementById("pregunta").innerHTML =
`${a} - ${b} = ?`;

hablar(
`¿Cuánto es ${a} menos ${b}?`
);

let opciones = [
correcta,
correcta+1,
correcta-1,
correcta+2
];

opciones.sort(()=>Math.random()-0.5);

let contenedor =
document.getElementById("opciones");

contenedor.innerHTML="";

opciones.forEach(numero=>{

let boton =
document.createElement("button");

boton.innerHTML = numero;

boton.onclick =
()=> verificar(numero);

contenedor.appendChild(boton);

});

}

function verificar(valor){

if(valor===correcta){

document
.getElementById("correcto")
.play();

puntos++;

document
.getElementById("puntos")
.innerHTML =
puntos;

document
.getElementById("barra")
.style.width =
(puntos/5)*100 + "%";

if(puntos>=5){

confetti({
particleCount:300,
spread:180
});

document
.getElementById("victoria")
.classList
.remove("oculto");

return;

}

nuevaPregunta();

}else{

document
.getElementById("error")
.play();

vidas--;

document
.getElementById("vidas")
.innerHTML =
vidas;

if(vidas<=0){

alert("😵 GAME OVER");

location.reload();

}

}

}

function siguienteNivel(){

localStorage.setItem(
"nivel4",
"desbloqueado"
);

location.href =
"juego4.html";

}