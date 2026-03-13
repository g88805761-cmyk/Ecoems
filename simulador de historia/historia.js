const preguntas = [
  { pregunta: "¿En qué año inició la Revolución Mexicana?", opciones: ["1905", "1910", "1917", "1920"], correcta: 1 },
  { pregunta: "¿Quién promulgó la Constitución de 1917?", opciones: ["Venustiano Carranza", "Francisco I. Madero", "Porfirio Díaz", "Álvaro Obregón"], correcta: 0 },
  { pregunta: "¿Qué civilización construyó Teotihuacan?", opciones: ["Mexica", "Olmeca", "Maya", "Se desconoce con certeza"], correcta: 3 },
  { pregunta: "¿Cuál fue una causa interna de la Independencia de México?", opciones: ["La invasión napoleónica a España", "Las desigualdades sociales en la Nueva España", "La Guerra de los Siete Años", "La independencia de Brasil"], correcta: 1 },
  { pregunta: "¿Qué documento consumó la Independencia de México en 1821?", opciones: ["Sentimientos de la Nación", "Tratados de Córdoba", "Constitución de Apatzingán", "Plan de Ayutla"], correcta: 1 },
  { pregunta: "¿Quién encabezó el movimiento de Independencia en 1810?", opciones: ["José María Morelos", "Miguel Hidalgo", "Ignacio Zaragoza", "Benito Juárez"], correcta: 1 },
  { pregunta: "¿Qué presidente mexicano impulsó las Leyes de Reforma?", opciones: ["Benito Juárez", "Santa Anna", "Lázaro Cárdenas", "Porfirio Díaz"], correcta: 0 },
  { pregunta: "¿Qué evento detonó la Primera Guerra Mundial en 1914?", opciones: ["La Revolución Rusa", "La caída del Muro de Berlín", "El asesinato de Francisco Fernando", "La invasión de Polonia"], correcta: 2 },
  { pregunta: "¿Cuál fue una consecuencia de la Segunda Guerra Mundial?", opciones: ["La creación de la ONU", "La caída del Imperio Romano", "El inicio de la Revolución Francesa", "La independencia de Estados Unidos"], correcta: 0 },
  { pregunta: "¿Qué país inició la Revolución Industrial?", opciones: ["Francia", "Alemania", "Reino Unido", "España"], correcta: 2 },
  { pregunta: "¿Qué periodo histórico siguió a la Edad Media en Europa?", opciones: ["La Antigüedad", "El Renacimiento", "La Prehistoria", "La Guerra Fría"], correcta: 1 },
  { pregunta: "¿Qué cultura mesoamericana desarrolló el calendario de cuenta larga?", opciones: ["Maya", "Tolteca", "Tarasca", "Zapoteca"], correcta: 0 },
  { pregunta: "¿Qué presidente nacionalizó el petróleo en México en 1938?", opciones: ["Plutarco Elías Calles", "Lázaro Cárdenas", "Adolfo López Mateos", "Manuel Ávila Camacho"], correcta: 1 },
  { pregunta: "¿Qué país fue dividido en Alemania Oriental y Occidental tras la Segunda Guerra Mundial?", opciones: ["Polonia", "Austria", "Alemania", "Hungría"], correcta: 2 },
  { pregunta: "¿Qué movimiento buscó terminar con la dictadura de Porfirio Díaz?", opciones: ["Plan de Tuxtepec", "Revolución Mexicana", "Guerra Cristera", "Movimiento estudiantil de 1968"], correcta: 1 },
  { pregunta: "¿Cuál fue la principal actividad económica en la Nueva España?", opciones: ["Industria pesada", "Minería", "Turismo", "Pesca"], correcta: 1 },
  { pregunta: "¿Qué bloque lideró Estados Unidos durante la Guerra Fría?", opciones: ["Pacto de Varsovia", "Eje", "Aliados", "Bloque capitalista"], correcta: 3 },
  { pregunta: "¿Qué documento redactó José María Morelos en 1813?", opciones: ["Plan de Iguala", "Sentimientos de la Nación", "Acta de Independencia", "Constitución de 1857"], correcta: 1 },
  { pregunta: "¿En qué año cayó el Muro de Berlín?", opciones: ["1989", "1975", "1994", "1961"], correcta: 0 },
  { pregunta: "¿Qué imperio fue derrotado en la conquista de México-Tenochtitlan en 1521?", opciones: ["Inca", "Mexica", "Maya", "Olmeca"], correcta: 1 },
  { pregunta: "¿Cuál fue una causa de la Revolución Francesa?", opciones: ["Desigualdad social y crisis económica", "Descubrimiento de América", "La independencia de México", "La guerra de Vietnam"], correcta: 0 },
  { pregunta: "¿Qué presidente impulsó la educación socialista en México en los años 30?", opciones: ["Lázaro Cárdenas", "Vicente Fox", "Miguel Alemán", "Gustavo Díaz Ordaz"], correcta: 0 }
];

const TOTAL_PREGUNTAS = 20;
const DURACION_EXAMEN = 25 * 60;

let preguntasExamen = [];
let temporizadorId;
let tiempoRestante = DURACION_EXAMEN;
let examenFinalizado = false;
let resultadosChart;

const questionCounter = document.getElementById("question-counter");
const timer = document.getElementById("timer");
const questionsContainer = document.getElementById("questions");
const examForm = document.getElementById("exam-form");
const submitBtn = document.getElementById("submit-btn");

// Mezcla un arreglo con el algoritmo Fisher-Yates.
function mezclarArreglo(arreglo) {
  const copia = [...arreglo];
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// Crea el examen tomando preguntas aleatorias y las pinta en pantalla.
function renderizarPreguntas() {
  preguntasExamen = mezclarArreglo(preguntas).slice(0, TOTAL_PREGUNTAS);
  questionCounter.textContent = `Preguntas: ${preguntasExamen.length}`;

  questionsContainer.innerHTML = "";
  preguntasExamen.forEach((item, indice) => {
    const bloque = document.createElement("article");
    bloque.className = "question";

    const titulo = document.createElement("p");
    titulo.className = "question-title";
    titulo.textContent = `${indice + 1}. ${item.pregunta}`;
    bloque.appendChild(titulo);

    item.opciones.forEach((opcion, opcionIndice) => {
      const etiqueta = document.createElement("label");
      etiqueta.className = "option";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `pregunta-${indice}`;
      radio.value = opcionIndice;

      etiqueta.appendChild(radio);
      etiqueta.append(` ${opcion}`);
      bloque.appendChild(etiqueta);
    });

    questionsContainer.appendChild(bloque);
  });
}

// Inicia el conteo regresivo y autoenvía cuando el tiempo termina.
function iniciarTemporizador() {
  actualizarTemporizador();
  temporizadorId = setInterval(() => {
    tiempoRestante -= 1;
    actualizarTemporizador();

    if (tiempoRestante <= 0) {
      finalizarExamen();
    }
  }, 1000);
}

function actualizarTemporizador() {
  const minutos = String(Math.floor(tiempoRestante / 60)).padStart(2, "0");
  const segundos = String(tiempoRestante % 60).padStart(2, "0");
  timer.textContent = `Tiempo restante: ${minutos}:${segundos}`;
}

// Evalúa respuestas, bloquea edición y muestra métricas finales.
function finalizarExamen() {
  if (examenFinalizado) return;

  examenFinalizado = true;
  clearInterval(temporizadorId);
  submitBtn.disabled = true;

  const radios = questionsContainer.querySelectorAll("input[type='radio']");
  radios.forEach((radio) => {
    radio.disabled = true;
  });

  let aciertos = 0;

  preguntasExamen.forEach((pregunta, indice) => {
    const seleccionada = questionsContainer.querySelector(`input[name='pregunta-${indice}']:checked`);
    const respuesta = seleccionada ? Number(seleccionada.value) : -1;

    if (respuesta === pregunta.correcta) {
      aciertos += 1;
    } else {
      // Muestra la respuesta correcta si el alumno falló o no contestó.
      const bloque = questionsContainer.children[indice];
      const ayuda = document.createElement("p");
      ayuda.className = "correct-answer";
      ayuda.textContent = `Respuesta correcta: ${pregunta.opciones[pregunta.correcta]}`;
      bloque.appendChild(ayuda);
    }
  });

  const errores = preguntasExamen.length - aciertos;
  const porcentaje = ((aciertos / preguntasExamen.length) * 100).toFixed(1);

  document.getElementById("correct-count").textContent = String(aciertos);
  document.getElementById("wrong-count").textContent = String(errores);
  document.getElementById("percentage").textContent = `${porcentaje}%`;
  document.getElementById("final-message").textContent = `Examen terminado. Tu puntaje es ${aciertos} / ${preguntasExamen.length}.`;
  document.getElementById("results").classList.remove("hidden");

  renderizarGrafica(aciertos, errores);
}

// Dibuja una gráfica comparando aciertos vs errores con Chart.js.
function renderizarGrafica(aciertos, errores) {
  const ctx = document.getElementById("results-chart");

  if (resultadosChart) {
    resultadosChart.destroy();
  }

  resultadosChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Aciertos", "Errores"],
      datasets: [{
        label: "Resultado del examen",
        data: [aciertos, errores],
        backgroundColor: ["#0f766e", "#b91c1c"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom"
        }
      }
    }
  });
}

examForm.addEventListener("submit", (evento) => {
  evento.preventDefault();
  finalizarExamen();
});

renderizarPreguntas();
iniciarTemporizador();