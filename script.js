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
    const promoContainer = document.getElementById('promoContainer');
    
    // Limpiar el contenedor
    promoContainer.innerHTML = '';
    
    // Verificar si existen imágenes y filtrar las activas
    if (data.imagenes && Array.isArray(data.imagenes)) {
      const activeImages = data.imagenes.filter(img => img.activa);
      
      // Crear y agregar cada elemento activo
      activeImages.forEach((imgData, index) => {
        if (imgData.video) {
          // Es un video de YouTube
          const videoId = extractYoutubeId(imgData.video);
          if (videoId) {
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&loop=1&playlist=${videoId}`;
            iframe.className = 'promo-img';
            iframe.frameBorder = '0';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = false;
            promoContainer.appendChild(iframe);
          }
        } else if (imgData.imagen) {
          // Es una imagen
          const img = document.createElement('img');
          img.src = imgData.imagen;
          img.alt = `Imagen promocional ${index + 1}`;
          img.className = 'promo-img';
          promoContainer.appendChild(img);
        }
      });
    }
  } catch (error) {
    console.error('Error al cargar imágenes promocionales:', error);
    // Imagen de respaldo si hay error
    const promoContainer = document.getElementById('promoContainer');
    promoContainer.innerHTML = '';
    const fallbackImg = document.createElement('img');
    fallbackImg.src = 'https://i.postimg.cc/858rf0CT/IMG-20250814-WA0012.jpg';
    fallbackImg.alt = 'Imagen promocional de respaldo';
    fallbackImg.className = 'promo-img';
    promoContainer.appendChild(fallbackImg);
  }
}

// Función auxiliar para extraer el ID del video de YouTube
function extractYoutubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

document.addEventListener('DOMContentLoaded', () => {
  renderButtons();
  initializeReservationForm();
  initializeCarousel();
  loadPromocional();
});