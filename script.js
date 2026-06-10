let filtroActual = "todas";

let galeria;

/* ====== LETRAS ====== */
const letras = [
  { letra: "A", palabra: "Avión", imagen: "https://images.icon-icons.com/577/PNG/256/Airplane_Grey_icon-icons.com_54909.png" },

  { letra: "B", palabra: "Bombilla", imagen: "https://images.icon-icons.com/1367/PNG/512/32officeicons-1_89729.png" },

  { letra: "C", palabra: "Carro", imagen: "https://images.icon-icons.com/110/PNG/512/studebaker_station_wagon_18541.png" },

  { letra: "D", palabra: "Dado", imagen: "https://images.icon-icons.com/1465/PNG/512/678gamedice_100992.png" },

  { letra: "E", palabra: "Elefante", imagen: "https://images.icon-icons.com/29/PNG/256/animal_elephant_2739.png" },

  { letra: "F", palabra: "Flor", imagen: "https://upload.wikimedia.org/wikipedia/commons/4/40/Sunflower_sky_backdrop.jpg" },

  { letra: "G", palabra: "Gato", imagen: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg" },

  { letra: "H", palabra: "Helicóptero", imagen: "https://images.icon-icons.com/1448/PNG/512/42592helicopter_98991.png" },

  { letra: "I", palabra: "Imán", imagen: "https://images.icon-icons.com/677/PNG/512/magnet_icon-icons.com_60807.png" },

  { letra: "J", palabra: "Jirafa", imagen: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Giraffe_standing.jpg" },

  { letra: "K", palabra: "Kiwi", imagen: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Kiwi_aka.jpg" },

  { letra: "L", palabra: "Luna", imagen: "https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg" },

  { letra: "M", palabra: "Manzana", imagen: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg" },

  { letra: "N", palabra: "Niño", imagen: "https://images.icon-icons.com/1736/PNG/512/4043235-afro-boy-child-kid_113264.png" },

  { letra: "O", palabra: "Oso", imagen: "https://images.icon-icons.com/2079/PNG/512/bear_wild_animal_wildlife_nature_big_fur_icon_127304.png" },

  { letra: "P", palabra: "Perro", imagen: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Golde33443.jpg" },

  { letra: "Q", palabra: "Queso", imagen: " https://images.icon-icons.com/1447/PNG/512/32377cheesewedge_98913.png" },

  { letra: "R", palabra: "Rana", imagen: "https://images.icon-icons.com/1352/PNG/512/if-46-harry-potter-colour-chocolate-frog-2730310_88162.png" },

  { letra: "S", palabra: "Sol", imagen: "https://images.icon-icons.com/1493/PNG/512/sun_102839.png" },

  { letra: "T", palabra: "Tigre", imagen: "https://upload.wikimedia.org/wikipedia/commons/5/56/Tiger.50.jpg" },

  { letra: "U", palabra: "Unicornio", imagen: " https://images.icon-icons.com/1465/PNG/512/454unicornface_100914.png" },

  { letra: "V", palabra: "Vaca", imagen: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Cow_female_black_white.jpg" },

  { letra: "W", palabra: "Wafle", imagen: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Waffles_with_Strawberries.jpg" },

  { letra: "X", palabra: "Xilófono", imagen: "https://images.icon-icons.com/1860/PNG/512/xylophone_118105.png" },

  { letra: "Y", palabra: "Yate", imagen: "https://images.icon-icons.com/1814/PNG/512/21yacht_115461.png" },

   { letra: "Z", palabra: "Zorro", imagen: "https://images.icon-icons.com/1446/PNG/512/22218foxface_98828.png" } 
];

/* ====== INICIAR CUANDO CARGA LA PÁGINA ====== */
window.onload = function () {
  galeria = document.getElementById("galeria");
  render();
};

/* ====== RENDER ====== */
function render() {
  galeria.innerHTML = "";

  letras.forEach(item => {

    const esVocal = ["A","E","I","O","U"].includes(item.letra);

    galeria.innerHTML += `
      <div class="card ${esVocal ? "vocal" : "consonante"}" onclick="voltear(this)">
        <div class="card-inner">
          <div class="card-frente">
            <h1>${item.letra}</h1>
          </div>

          <div class="card-dorso">
            <img src="${item.imagen}" alt="${item.palabra}">
            <p>${item.palabra}</p>
          </div>
        </div>
      </div>
    `;
  });
}

/* ====== SONIDO ====== */
function sonidoFlip() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();

  osc.connect(gain);
  gain.connect(audioContext.destination);

  osc.type = "triangle";
  osc.frequency.value = 500;

  gain.gain.setValueAtTime(0.2, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15);

  osc.start();
  osc.stop(audioContext.currentTime + 0.15);
}

/* ====== VOLTEAR ====== */
function voltear(card) {
  sonidoFlip();

  card.classList.toggle("volteada");

  if (!card.dataset.vista) {
    card.dataset.vista = "si";
  }

  actualizarContador();

  const total = document.querySelectorAll('[data-vista="si"]').length;

  if (total === 26) {
    setTimeout(() => {
      alert("🎉 Juego completado");
      reiniciarJuego();
    }, 800);
  }
}

/* ====== CONTADOR ====== */
function actualizarContador() {
  const vistos = document.querySelectorAll('[data-vista="si"]').length;

  document.getElementById("contador").textContent =
    `Letras vistas: ${vistos}`;
}

/* ====== FILTRO ====== */
function filtrar(tipo) {
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    if (tipo === "todas") {
      card.style.display = "block";
    } 
    else if (tipo === "vocales") {
      card.style.display = card.classList.contains("vocal")
        ? "block"
        : "none";
    }
  });
}

/* ====== REINICIAR ====== */
function reiniciarJuego() {
  document.querySelectorAll(".card").forEach(card => {
    card.classList.remove("volteada");
    delete card.dataset.vista;
    card.style.display = "block";
  });

  actualizarContador();
}

/* ====== SALIR ====== */
function salirJuego() {
  window.location.href = "https://www.google.com";
}