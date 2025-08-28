const defaultLinks = [
  'https://wa.me/3834319968',
  'https://www.instagram.com/la.nuit.cta?igsh=MW56d3c4eWNub2xiNg==',
  'https://maps.app.goo.gl/LLeguWkm2kCSFyfLA'
];
let links = [...defaultLinks];

function renderButtons() {
  const container = document.getElementById('floatContainer');
  container.innerHTML = '';
  const emojis = ['📱', '📸', '📍'];
  links.forEach((url, i) => {
    const btn = document.createElement('button');
    btn.className = 'float-btn';
    btn.textContent = emojis[i];
    btn.onclick = () => window.open(url, '_blank');
    container.appendChild(btn);
  });
}

function initializeReservationForm() {
  const form = document.getElementById('reservationForm');
  const fechaInput = document.getElementById('fecha');
  const today = new Date().toISOString().split('T')[0];
  fechaInput.setAttribute('min', today);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const txt = `Nueva reserva en La Nuit:\nNombre: ${fd.get('nombre')}\nTeléfono: ${fd.get('telefono')}\nFecha: ${fd.get('fecha')}\nHora: ${fd.get('hora')}\nPersonas: ${fd.get('personas')}`;
    window.open(`https://wa.me/3834319968?text=${encodeURIComponent(txt)}`, '_blank');
    e.target.reset();
  });
}

function initializeCarousel() {
  const photos = [
    'https://i.postimg.cc/9f29FZ6N/Screenshot-20250818-162430.png',
    'https://i.postimg.cc/442pbKcm/Screenshot-20250818-162459.png',
    'https://i.postimg.cc/c4KwDs7T/Screenshot-20250818-162524.png',
    'https://i.postimg.cc/x1MH2t4z/Screenshot-20250818-162549.png',
    'https://i.postimg.cc/xTWHhWtQ/Screenshot-20250818-162606.png'
  ];
  let idx = 0;
  const carousel = document.getElementById('photoCarousel');
  photos.forEach(src => {
    const img = document.createElement('img');
    img.className = 'carousel-img';
    img.src = src;
    img.alt = '';
    carousel.appendChild(img);
  });
  carousel.children[0].classList.add('active');
  setInterval(() => {
    const prev = idx;
    idx = (idx + 1) % photos.length;
    carousel.children[prev].classList.remove('active');
    carousel.children[idx].classList.add('active');
  }, 3000);
}

async function loadPromocional() {
  try {
    const res = await fetch('/content/promocional.json');
    const data = await res.json();
    if (data.activa && data.imagen) {
      document.getElementById('promoImg').src = data.imagen;
    }
  } catch {
    document.getElementById('promoImg').src = 'https://i.postimg.cc/858rf0CT/IMG-20250814-WA0012.jpg';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderButtons();
  initializeReservationForm();
  initializeCarousel();
  loadPromocional();
});
