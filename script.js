let nombre = "";
let categoria = "";
let numero1 = 0;
let numero2 = 0;
let respuestaCorrecta = 0;

let problemaActual = 1;
let aciertos = 0;

function comenzar() {
  nombre = document.getElementById("nombre").value.trim();

  if (nombre === "") {
    alert("Escribí tu nombre primero.");
    return;
  }

  document.getElementById("inicio").classList.add("hidden");
  document.getElementById("menu").classList.remove("hidden");

  document.getElementById("saludo").textContent =
    "¡Hola, " + nombre + "!";
}

function iniciarJuego(tipo) {
  categoria = tipo;
  problemaActual = 1;
  aciertos = 0;

  document.getElementById("menu").classList.add("hidden");
  document.getElementById("final").classList.add("hidden");
  document.getElementById("juego").classList.remove("hidden");

  nuevoProblema();
}

function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function nuevoProblema() {
  let tipoActual = categoria;

  // En modo mixto elegimos una operación al azar
  if (categoria === "mixto") {
    const tipos = ["suma", "resta", "multiplicacion", "division"];
    tipoActual = tipos[numeroAleatorio(0, tipos.length - 1)];
  }

  if (tipoActual === "suma") {
    numero1 = numeroAleatorio(1, 100);
    numero2 = numeroAleatorio(1, 100);
    respuestaCorrecta = numero1 + numero2;

  } else if (tipoActual === "resta") {
    numero1 = numeroAleatorio(1, 100);
    numero2 = numeroAleatorio(1, 100);

    if (numero2 > numero1) {
      [numero1, numero2] = [numero2, numero1];
    }

    respuestaCorrecta = numero1 - numero2;

  } else if (tipoActual === "multiplicacion") {
    numero1 = numeroAleatorio(1, 12);
    numero2 = numeroAleatorio(1, 12);
    respuestaCorrecta = numero1 * numero2;

  } else if (tipoActual === "division") {
    numero2 = numeroAleatorio(1, 12);
    respuestaCorrecta = numeroAleatorio(1, 12);
    numero1 = numero2 * respuestaCorrecta;
  }

  document.getElementById("problem").textContent =
    numero1 + " " + simbolo(tipoActual) + " " + numero2 + " = ?";

  document.getElementById("progress").textContent =
    "Problema " + problemaActual + " / 20";

  document.getElementById("respuesta").value = "";
  document.getElementById("respuesta").focus();
}

function simbolo(tipo) {
  if (tipo === "suma") return "+";
  if (tipo === "resta") return "−";
  if (tipo === "multiplicacion") return "×";
  if (tipo === "division") return "÷";
}

function comprobar() {
  const respuesta =
    Number(document.getElementById("respuesta").value);

  if (respuesta === respuestaCorrecta) {
    aciertos++;
  }

  if (problemaActual >= 20) {
    terminar();
  } else {
    problemaActual++;
    nuevoProblema();
  }
}

function terminar() {
  document.getElementById("juego").classList.add("hidden");
  document.getElementById("final").classList.remove("hidden");

  document.getElementById("result").textContent =
    nombre + ", acertaste " + aciertos + " de 20.";
}

function volverMenu() {
  document.getElementById("final").classList.add("hidden");
  document.getElementById("menu").classList.remove("hidden");
}
