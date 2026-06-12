let vidas = 3;
let aciertos = 0;

window.onload = () => {

    document.getElementById("nombreUsuario").innerHTML =
    localStorage.getItem("nombre") || "Estudiante";

    document.getElementById("avatarUsuario").src =
    localStorage.getItem("avatar") || "";

    hablar(
    "Bienvenido al juego uno. Arrastra la respuesta correcta."
    );

    iniciarJuego();

};

function hablar(texto){

    speechSynthesis.cancel();

    let voz =
    new SpeechSynthesisUtterance(texto);

    voz.lang = "es-ES";

    speechSynthesis.speak(voz);

}

function iniciarJuego(){

    let numeros =
    document.querySelectorAll(".numero");

    numeros.forEach(numero=>{

        numero.addEventListener("dragstart",()=>{

            numero.classList.add("arrastrando");

        });

    });

    let zonas =
    document.querySelectorAll(".zona");

    zonas.forEach(zona=>{

        zona.addEventListener("dragover",(e)=>{

            e.preventDefault();

        });

        zona.addEventListener("drop",()=>{

            let arrastrado =
            document.querySelector(".arrastrando");

            let valor =
            arrastrado.textContent;

            if(valor === zona.dataset.respuesta){

                document
                .getElementById("correcto")
                .play();

                zona.innerHTML = valor;

                arrastrado.remove();

                aciertos++;

                document
                .getElementById("barra")
                .style.width =
                (aciertos/3)*100 + "%";

                if(aciertos >= 3){

                    confetti({
                        particleCount:250,
                        spread:180
                    });

                    hablar(
                    "Excelente trabajo. Completaste el juego."
                    );

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

                hablar(
                "Inténtalo nuevamente"
                );

                if(vidas <= 0){

                    alert("😵 GAME OVER");

                    location.reload();

                }

            }

        });

    });

}

function siguienteNivel(){

    localStorage.setItem("nivel2","desbloqueado");

    location.href =
    "juego2.html";

}