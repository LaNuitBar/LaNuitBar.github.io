/* Enlaces por defecto con Instagram actualizado */
const defaultLinks = [
  'https://wa.me/3834619831',
  'https://www.instagram.com/la.nuit.cta?igsh=MW56d3c4eWNub2xiNg==',
  'https://maps.google.com'
];
let links = JSON.parse(localStorage.getItem('floatLinks')) || [...defaultLinks];

function renderButtons(){
  const container = document.getElementById('floatContainer');
  container.innerHTML = '';
  const emojis = ['📱','📸','📍'];
  links.forEach((url,i)=>{
    const btn = document.createElement('button');
    btn.className = 'float-btn';
    btn.textContent = emojis[i];
    btn.onclick = ()=> window.open(url,'_blank');
    container.appendChild(btn);
  });
}
renderButtons();

function toggleAdmin(show){
  document.getElementById('adminPanel').style.display = show ? 'flex' : 'none';
  if(!show) document.getElementById('adminSections').style.display='none';
}
function checkPass(){
  if(document.getElementById('passInput').value === '0000'){
    document.querySelectorAll('#adminSections input[type=url]').forEach((inp,i)=>inp.value=links[i]);
    document.getElementById('promoUrl').value = localStorage.getItem('promoImg') || '';
    document.getElementById('adminSections').style.display='flex';
  }else{
    alert('Contraseña incorrecta');
  }
}
function savePromo(){
  const url = document.getElementById('promoUrl').value.trim();
  if(!url){ alert('URL vacía'); return; }
  localStorage.setItem('promoImg', url);
  document.getElementById('promoImg').src = url;
  alert('Imagen guardada');
}
function saveLinks(){
  links = Array.from(document.querySelectorAll('#adminSections input[type=url]:not(#promoUrl)'))
               .map(el=>el.value.trim() || defaultLinks[0]);
  localStorage.setItem('floatLinks', JSON.stringify(links));
  renderButtons();
  toggleAdmin(false);
}

document.getElementById('reservationForm').addEventListener('submit', e=>{
  e.preventDefault();
  const fd = new FormData(e.target);
  const txt = `Nueva reserva en La Nuit:\nNombre: ${fd.get('nombre')}\nTeléfono: ${fd.get('telefono')}\nFecha: ${fd.get('fecha')}\nHora: ${fd.get('hora')}\nPersonas: ${fd.get('personas')}`;
  window.open(`https://wa.me/3834619831?text=${encodeURIComponent(txt)}`,'_blank');
  e.target.reset();
});

/* ---------- Carrusel de 5 fotos ---------- */
const photos = [
  'https://i.postimg.cc/9f29FZ6N/Screenshot-20250818-162430.png',
  'https://i.postimg.cc/442pbKcm/Screenshot-20250818-162459.png',
  'https://i.postimg.cc/c4KwDs7T/Screenshot-20250818-162524.png',
  'https://i.postimg.cc/x1MH2t4z/Screenshot-20250818-162549.png',
  'https://i.postimg.cc/xTWHhWtQ/Screenshot-20250818-162606.png'
];

let idx = 0;
const carousel = document.getElementById('photoCarousel');

photos.forEach(src=>{
  const img = document.createElement('img');
  img.className = 'carousel-img';
  img.src = src;
  img.alt = '';
  carousel.appendChild(img);
});

carousel.children[0].classList.add('active');

setInterval(()=>{
  const prev = idx;
  idx = (idx + 1) % photos.length;
  carousel.children[prev].classList.remove('active');
  carousel.children[idx].classList.add('active');
}, 3000);
