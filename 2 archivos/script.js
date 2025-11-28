// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  const icon = mobileMenuButton.querySelector('svg');
  if (mobileMenu.classList.contains('hidden')) {
    icon.innerHTML = '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
  } else {
    icon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>';
  }
});

// FAQ Accordion
const faqs = [
  { question: '¿Qué contiene Zensia?', answer: 'Zensia contiene una mezcla funcional de Colágeno Hidrolizado, Açaí liofilizado, Camu Camu, Cúrcuma, Ginseng, Inulina (prebiótico) y está endulzado naturalmente con Stevia.' },
  { question: '¿Zensia tiene azúcar?', answer: 'No, Zensia no contiene azúcar añadida. Su sabor dulce proviene exclusivamente de la Stevia, un endulzante de origen natural sin calorías.' },
  { question: '¿Cómo se prepara Zensia?', answer: 'Es muy simple: disuelve 1 stick (o la medida indicada) en un vaso de agua fría, tibia o en tu smoothie favorito. Revuelve bien hasta disolver y disfruta.' },
  { question: '¿Para qué sirve el colágeno hidrolizado?', answer: 'El colágeno hidrolizado aporta aminoácidos esenciales que apoyan la estructura y elasticidad de la piel, así como el mantenimiento de otros tejidos conectivos del cuerpo.' },
  { question: '¿Qué aporta el açaí liofilizado?', answer: 'El açaí es una fuente rica en antioxidantes (antocianinas) que ayudan a combatir el estrés oxidativo celular, además de aportar fibra y energía natural.' },
  { question: '¿El camu camu es una fuente de vitamina C?', answer: 'Sí, el camu camu es una de las frutas con mayor concentración de Vitamina C natural en el mundo, fundamental para la absorción del colágeno y el sistema inmune.' },
  { question: '¿Zensia reemplaza comidas?', answer: 'No. Zensia es un complemento nutricional diseñado para acompañar una dieta equilibrada, no para reemplazar ninguna comida principal.' },
  { question: '¿Zensia es para todos?', answer: 'Zensia está formulado con ingredientes naturales. Sin embargo, mujeres embarazadas, en lactancia o personas con condiciones médicas específicas deben consultar a su médico antes de consumirlo.' },
  { question: '¿Cómo se toma diariamente?', answer: 'Recomendamos tomarlo una vez al día, preferiblemente en las mañanas para aprovechar el boost de energía natural o a media tarde como una pausa de bienestar.' },
  { question: '¿Dónde puedo pedir información?', answer: 'Puedes contactarnos directamente vía WhatsApp o llamada al teléfono 322 3769698 para cualquier duda o consulta adicional.' }
];

const faqContainer = document.getElementById('faq-container');
let openIndex = null;
faqs.forEach((faq, index) => {
  const faqElement = document.createElement('div');
  faqElement.className = 'bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden';
  faqElement.innerHTML = `
    <button class="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none" data-index="${index}">
      <span class="text-lg font-medium text-gray-900 pr-4">${faq.question}</span>
      <span class="text-zensia-purple flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </span>
    </button>
    <div class="px-6 transition-all duration-300 ease-in-out overflow-hidden max-h-0 opacity-0" data-content="${index}">
      <p class="text-gray-600 leading-relaxed py-0 pb-6">${faq.answer}</p>
    </div>
  `;
  faqContainer.appendChild(faqElement);
});

faqContainer.addEventListener('click', (e) => {
  const button = e.target.closest('button');
  if (!button) return;
  const index = parseInt(button.dataset.index);
  const content = document.querySelector(`[data-content="${index}"]`);
  const chevron = button.querySelector('.chevron');
  if (openIndex === index) {
    content.style.maxHeight = '0';
    content.style.opacity = '0';
    chevron.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';
    openIndex = null;
  } else {
    if (openIndex !== null) {
      const prevContent = document.querySelector(`[data-content="${openIndex}"]`);
      const prevChevron = document.querySelector(`button[data-index="${openIndex}"] .chevron`);
      if (prevContent) {
        prevContent.style.maxHeight = '0';
        prevContent.style.opacity = '0';
        prevChevron.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';
      }
    }
    content.style.maxHeight = '500px';
    content.style.opacity = '1';
    chevron.innerHTML = '<polyline points="18 15 12 9 6 15"></polyline>';
    openIndex = index;
  }
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  htmlElement.classList.add('dark');
  sunIcon.classList.add('hidden');
  moonIcon.classList.remove('hidden');
}
themeToggle.addEventListener('click', () => {
  htmlElement.classList.toggle('dark');
  if (htmlElement.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
  } else {
    localStorage.setItem('theme', 'light');
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
  }
});

// Floating Particles
function createParticle() {
  const particle = document.createElement('div');
  particle.className = 'particle';
  const startX = Math.random() * window.innerWidth;
  particle.style.left = startX + 'px';
  particle.style.bottom = '-10px';
  const duration = 8 + Math.random() * 6;
  particle.style.animationDuration = duration + 's';
  const drift = (Math.random() - 0.5) * 100;
  particle.style.setProperty('--drift', drift + 'px');
  particle.style.animationDelay = Math.random() * 2 + 's';
  const size = 6 + Math.random() * 6;
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';
  document.body.appendChild(particle);
  setTimeout(() => particle.remove(), (duration + 2) * 1000);
}
setInterval(createParticle, 400);
for (let i = 0; i < 10; i++) {
  setTimeout(createParticle, i * 200);
}