/* =========================================================
   PICGELATO — JAVASCRIPT
   ========================================================= */

/* ---------- 1. Animación de partículas ---------- */

const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.speedY = -(Math.random() * 1 + 0.2);
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.color = ['#c6f000', '#ff9500', '#ffd600', '#e53b2e'][Math.floor(Math.random() * 4)];
      this.opacity = Math.random() * 0.6 + 0.2;
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      if (this.y < 0) this.reset();
    }
    draw() {
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < 40; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

/* ---------- 2. Cuenta regresiva ---------- */
function updateCountdown() {
  // La preventa termina al finalizar el lunes 28 de septiembre de 2026
  const targetDate = new Date('2026-09-29T00:00:00').getTime();
  const now = new Date().getTime();
  const difference = targetDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (difference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor(
      (difference % (1000 * 60)) / 1000
    );

    document.getElementById('cd-days').innerText =
      String(days).padStart(2, '0');

    document.getElementById('cd-hours').innerText =
      String(hours).padStart(2, '0');

    document.getElementById('cd-minutes').innerText =
      String(minutes).padStart(2, '0');

    document.getElementById('cd-seconds').innerText =
      String(seconds).padStart(2, '0');

  } else {

    // Mensaje cuando la preventa haya terminado
    document.getElementById('countdown').innerHTML = `
      <div class="bg-green-500 text-black rounded-xl p-5 border-4 border-black shadow-neo-orange text-center col-span-4">
        <div class="font-anton text-3xl sm:text-4xl uppercase">
          PREVENTA CERRADA
        </div>

        <div class="font-bold text-sm sm:text-base mt-1">
          Muchas gracias por sus compras 💚
        </div>
      </div>
    `;
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();

/* ---------- 3. Constructor de helados ---------- */
let selectedFlavors = [];

  function handleFlavorChange(cb) {
    const size = document.querySelector('input[name="builder-size"]:checked').value;
    const maxAllowed = parseInt(size);

    if (cb.checked) {
      if (selectedFlavors.length >= maxAllowed) {
        // Uncheck the earliest checked flavor
        const firstValue = selectedFlavors.shift();
        document.querySelectorAll('.flavor-cb').forEach(el => {
          if (el.value === firstValue) el.checked = false;
        });
      }
      selectedFlavors.push(cb.value);
    } else {
      selectedFlavors = selectedFlavors.filter(item => item !== cb.value);
    }

    updateBuilder();
  }

  function updateBuilder() {
    const sizeInput = document.querySelector('input[name="builder-size"]:checked');
    const size = sizeInput ? sizeInput.value : '1';
    const isBig = size === '2';

    // Update flavor limit note
    const limitNote = document.getElementById('flavor-limit-note');
    if (limitNote) {
      limitNote.innerText = isBig ? 'Selecciona hasta 2 sabores:' : 'Selecciona 1 sabor:';
    }

    // Limit active flavors if switched back to small size
    if (!isBig && selectedFlavors.length > 1) {
      selectedFlavors.pop();
      document.querySelectorAll('.flavor-cb').forEach(el => {
        if (!selectedFlavors.includes(el.value)) el.checked = false;
      });
    }

    // Selected Bobas
    const bobas = [];
    document.querySelectorAll('.boba-cb:checked').forEach(el => bobas.push(el.value));

    // Selected Toppings
    const toppings = [];
    document.querySelectorAll('.top-cb:checked').forEach(el => toppings.push(el.value));

    // Price Calculation
    const totalPrice = isBig ? 7000 : 5000;

    // Summary Elements Update
    document.getElementById('summary-size').innerText = isBig ? 'Grande (2 Bolas)' : 'Pequeño (1 Bola)';
    document.getElementById('summary-flavors').innerText = selectedFlavors.length > 0 ? selectedFlavors.join(', ') : 'Ninguno';
    document.getElementById('summary-boba').innerText = bobas.length > 0 ? bobas.join(', ') : 'Sin perlas';
    document.getElementById('summary-toppings').innerText = toppings.length > 0 ? toppings.join(', ') : 'Sin toppings';
    document.getElementById('summary-total').innerText = '$' + totalPrice.toLocaleString('es-CO');

    // Visual Scoop Graphic
    const previewScoops = document.getElementById('preview-scoops');
    const previewBadge = document.getElementById('preview-badge');
    
    if (isBig) {
      previewScoops.innerText = '🍨🍨';
      previewBadge.innerText = '2 Bolas Seleccionadas';
      previewBadge.className = 'inline-block bg-orange text-black font-extrabold px-3 py-1 rounded-full text-xs shadow-md';
    } else {
      previewScoops.innerText = '🍨';
      previewBadge.innerText = '1 Bola Seleccionada';
      previewBadge.className = 'inline-block bg-lime text-black font-extrabold px-3 py-1 rounded-full text-xs shadow-md';
    }
  }

  function sendCustomOrder() {
    const size = document.querySelector('input[name="builder-size"]:checked').value === '2' ? 'Grande (2 Bolas - $7.000)' : 'Pequeño (1 Bola - $5.000)';
    const flavors = selectedFlavors.length > 0 ? selectedFlavors.join(', ') : 'A elección del chef';
    
    const bobas = [];
    document.querySelectorAll('.boba-cb:checked').forEach(el => bobas.push(el.value));
    const bobaText = bobas.length > 0 ? bobas.join(', ') : 'Sin perlas';

    const toppings = [];
    document.querySelectorAll('.top-cb:checked').forEach(el => toppings.push(el.value));
    const topText = toppings.length > 0 ? toppings.join(', ') : 'Sin adicionales';

    const textMsg = `Hola Picgelato! ⚡ Quiero pedir mi helado personalizado:%0A` +
      `- *Tamaño:* ${size}%0A` +
      `- *Sabores:* ${flavors}%0A` +
      `- *Popping Boba:* ${bobaText}%0A` +
      `- *Toppings:* ${topText}`;

    window.open(`https://wa.me/573163895608?text=${textMsg}`, '_blank');
  }

/* ---------- 4. Filtro del menú ---------- */
function filterMenu(category) {
    const cards = document.querySelectorAll('.combo-card');
    const tabs = document.querySelectorAll('.menu-tab');

    tabs.forEach(tab => {
      tab.classList.remove('bg-lime', 'text-black');
      tab.classList.add('bg-darkCard', 'text-white');
    });

    event.currentTarget.classList.remove('bg-darkCard', 'text-white');
    event.currentTarget.classList.add('bg-lime', 'text-black');

    cards.forEach(card => {
      if (category === 'all') {
        card.style.display = 'block';
      } else if (card.classList.contains(category)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

/* ---------- 5. Inicialización ---------- */
window.onload = function() {
    updateBuilder();
  };
