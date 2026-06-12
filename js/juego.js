const tablero=document.getElementById("tablero");
const piezas=document.getElementById("piezas");
const boton=document.getElementById("comprobar");
const mensaje=document.getElementById("mensaje");
const progreso=document.getElementById("progreso");
const estrellas=document.getElementById("estrellas");

let arrastrado=null;
let vidas=3;

/* avatar */
const avatarJuego=
document.getElementById("avatarJuego");

let avatar=
localStorage.getItem("avatar");

if(avatar){
    avatarJuego.src=avatar;
}

/* voz */
function hablar(texto){

    speechSynthesis.cancel();

    let voz=
    new SpeechSynthesisUtterance(texto);

    voz.lang="es-ES";
    voz.pitch=1.5;
    voz.rate=1.15;

    speechSynthesis.speak(voz);
}

/* mensajes aleatorios acierto */
function mensajeAcierto(){

    const frases=[

        "¡Muy bien!",

        "¡Excelente!",

        "¡Genial!",

        "¡Perfecto!",

        "¡Buen trabajo!",

        "¡Sigue así!",

        "¡Increíble!",

        "¡Qué rápido!",

        "¡Fantástico!",

        "¡Lo estás haciendo súper bien!"

    ];

    const numeroAleatorio=
    Math.floor(
        Math.random()*frases.length
    );

    const frase=
    frases[numeroAleatorio];

    mensaje.innerHTML=frase;

    hablar(frase);
}

/* mensajes final */
function mensajeFinal(){

    const finales=[

        "¡Felicitaciones! Terminaste el juego.",

        "¡Excelente trabajo! Completaste todos los números.",

        "¡Qué bien lo hiciste!",

        "¡Increíble! Ganaste el desafío.",

        "¡Bravo! Juego completado.",

        "¡Muy bien! Terminaste el nivel.",

        "¡Lo lograste!"

    ];

    const numeroAleatorio=
    Math.floor(
        Math.random()*finales.length
    );

    const frase=
    finales[numeroAleatorio];

    mensaje.innerHTML=frase;

    hablar(frase);
}

/* fondo habla */
const fondo=
document.getElementById("fondo");

const mensajes=[

    "Hola",

    "Sigue jugando",

    "Tú puedes",

    "Vamos muy bien",

    "Qué divertido"

];

fondo.addEventListener(
"click",
()=>{

    let random=
    mensajes[
        Math.floor(
            Math.random()*mensajes.length
        )
    ];

    hablar(random);
});

/* mensaje inicial */
mensaje.innerHTML=
"⭐ Nivel 1 | ❤️❤️❤️";

hablar(
"Bienvenido. Ordena los números"
);

/* vidas */
function mostrarVidas(){

    let corazones="";

    for(let i=0;i<vidas;i++){
        corazones+="❤️";
    }

    mensaje.innerHTML=
    "⭐ Nivel 1 | " + corazones;

    if(vidas===2){
        estrellas.innerHTML="⭐⭐";
    }

    if(vidas===1){
        estrellas.innerHTML="⭐";
    }
}

/* tablero */
for(let i=1;i<=10;i++){

    let casilla=
    document.createElement("div");

    casilla.className="casilla";

    casilla.dataset.valor=i;

    casilla.addEventListener(
        "dragover",
        e=>e.preventDefault()
    );

    casilla.addEventListener(
        "drop",
        (e)=>{

            e.preventDefault();

            if(!arrastrado) return;

            let valor=
            arrastrado.textContent;

            if(valor===casilla.dataset.valor){

                casilla.appendChild(
                    arrastrado
                );

                arrastrado.draggable=false;

                /* color correcto */
                casilla.style.background=
                "#c8f7c5";

                /* animación */
                arrastrado.style.transform=
                "scale(1.15)";

                setTimeout(()=>{

                    arrastrado.style.transform=
                    "scale(1)";

                },200);

                mensajeAcierto();

                mostrarBoton();

            }else{

                vidas--;

                hablar(
                "Ups. Inténtalo otra vez"
                );

                mostrarVidas();

                if(vidas===0){

                    hablar(
                    "Se acabaron tus vidas"
                    );

                    mensaje.innerHTML=
                    "😢 Sin vidas";

                    boton.classList.remove(
                    "oculto"
                    );

                    boton.textContent=
                    "🔄 Empezar otra vez";
                }
            }

            arrastrado=null;
        }
    );

    tablero.appendChild(casilla);
}

/* piezas */
let numeros=
[1,2,3,4,5,6,7,8,9,10];

numeros.sort(
()=>Math.random()-0.5
);

numeros.forEach(n=>{

    let pieza=
    document.createElement("div");

    pieza.className="numero";

    pieza.draggable=true;

    pieza.textContent=n;

    pieza.addEventListener(
        "dragstart",
        ()=>{

            arrastrado=pieza;
        }
    );

    piezas.appendChild(pieza);
});

/* progreso */
function mostrarBoton(){

    let llenas=0;

    document.querySelectorAll(
    ".casilla"
    ).forEach(c=>{

        if(
        c.querySelector(".numero")
        ){
            llenas++;
        }
    });

    let porcentaje=
    (llenas/10)*100;

    progreso.style.width=
    porcentaje+"%";

    if(llenas===10){

        boton.classList.remove(
        "oculto"
        );
    }
}

/* comprobar */
boton.addEventListener(
"click",
()=>{

    if(vidas===0){

        location.reload();
        return;
    }

    let correcto=true;

    document.querySelectorAll(
    ".casilla"
    ).forEach(c=>{

        let pieza=
        c.querySelector(".numero");

        if(
            !pieza ||
            pieza.textContent
            !==c.dataset.valor
        ){
            correcto=false;
        }
    });

    if(correcto){

        mensajeFinal();

        confetti({

            particleCount:200,

            spread:90,

            origin:{y:0.6}
        });



    }else{

        vidas--;

        mostrarVidas();

        hablar(
        "Inténtalo otra vez"
        );

        if(vidas===0){

            mensaje.innerHTML=
            "😢 Sin vidas";

            boton.textContent=
            "🔄 Empezar otra vez";
        }
    }
});