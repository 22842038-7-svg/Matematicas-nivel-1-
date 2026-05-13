let avatarSeleccionado = "";

// Seleccionar avatar
function seleccionar(img) {
    let avatares = document.querySelectorAll(".contenedor-avatares img");

    avatares.forEach(avatar => {
        avatar.classList.remove("seleccionado");
    });

    img.classList.add("seleccionado");

    // Guardar ruta correcta
    avatarSeleccionado = img.getAttribute("src");

    hablar("Avatar seleccionado");
}

// Botón ingresar
function ingresar() {
    let nombre = document.getElementById("nombre").value.trim();

    // Validación: falta todo
    if (nombre === "" && avatarSeleccionado === "") {
        hablar("Debes escribir tu nombre y seleccionar un avatar");
        return;
    }

    // Falta nombre
    if (nombre === "") {
        hablar("Debes escribir tu nombre");
        return;
    }

    // Falta avatar
    if (avatarSeleccionado === "") {
        hablar("Debes seleccionar un avatar");
        return;
    }

    // Todo correcto
    hablar("Bien hecho " + nombre);

    // Guardar datos
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("avatar", avatarSeleccionado);

    // Guardar nivel inicial
    if (!localStorage.getItem("nivel")) {
        localStorage.setItem("nivel", 1);
    }

    lanzarConfeti();

    // Ir a bienvenida
    setTimeout(() => {
        window.location.href = "bienvenido.html";
    }, 2500);
}

// Confeti
function lanzarConfeti() {
    for (let i = 0; i < 100; i++) {
        let confeti = document.createElement("div");
        confeti.classList.add("confeti");

        confeti.style.left = Math.random() * 100 + "vw";

        let colores = [
            "#ff4757",
            "#ffa502",
            "#2ed573",
            "#1e90ff",
            "#eccc68",
            "#ff6b81",
            "#7bed9f"
        ];

        confeti.style.backgroundColor =
            colores[Math.floor(Math.random() * colores.length)];

        confeti.style.animationDuration =
            (Math.random() * 3 + 2) + "s";

        document.body.appendChild(confeti);

        setTimeout(() => {
            confeti.remove();
        }, 5000);
    }
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