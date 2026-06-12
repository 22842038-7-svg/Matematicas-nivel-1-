let vidas = 3;
let pares = 0;

let primera = null;
let segunda = null;
let bloqueo = false;

const cartas = [
"3+2","5",
"4+3","7",
"6-2","4",
"8-3","5"
];

window.onload = ()=>{

document.getElementById("nombreUsuario").innerHTML =
localStorage.getItem("nombre") || "Estudiante";

document.getElementById("avatarUsuario").src =
localStorage.getItem("avatar") || "";

hablar(
"Encuentra las parejas matemáticas."
);

crearTablero();

};

function hablar(texto){

let voz =
new SpeechSynthesisUtterance(texto);

voz.lang = "es-ES";

speechSynthesis.speak(voz);

}

function crearTablero(){

const tablero =
document.getElementById("tablero");

cartas.sort(()=>Math.random()-0.5);

cartas.forEach(valor=>{

let carta =
document.createElement("div");

carta.classList.add("carta");

carta.dataset.valor = valor;

carta.innerHTML = "?";

carta.onclick =
()=>voltear(carta);

tablero.appendChild(carta);

});

}

function voltear(carta){

if(
bloqueo ||
carta === primera ||
carta.classList.contains("abierta")
)return;

carta.innerHTML =
carta.dataset.valor;

carta.classList.add("abierta");

if(!primera){

primera = carta;
return;

}

segunda = carta;

bloqueo = true;

setTimeout(verificar,800);

}

function verificar(){

let a =
primera.dataset.valor;

let b =
segunda.dataset.valor;

let correcto =

(a==="3+2" && b==="5") ||
(a==="5" && b==="3+2") ||

(a==="4+3" && b==="7") ||
(a==="7" && b==="4+3") ||

(a==="6-2" && b==="4") ||
(a==="4" && b==="6-2") ||

(a==="8-3" && b==="5") ||
(a==="5" && b==="8-3");

if(correcto){

document
.getElementById("correcto")
.play();

pares++;

document
.getElementById("pares")
.innerHTML =
pares;

if(pares>=4){

confetti({
particleCount:250,
spread:180
});

document
.getElementById("victoria")
.classList
.remove("oculto");

}

}else{

document
.getElementById("error")
.play();

vidas--;

document
.getElementById("vidas")
.innerHTML =
vidas;

primera.innerHTML="?";
segunda.innerHTML="?";

primera.classList.remove("abierta");
segunda.classList.remove("abierta");

if(vidas<=0){

alert("😵 GAME OVER");
location.reload();

}

}

primera = null;
segunda = null;
bloqueo = false;

}

function siguienteNivel(){

localStorage.setItem(
"nivel3",
"desbloqueado"
);

location.href =
"juego3.html";

}