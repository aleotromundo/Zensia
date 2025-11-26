// ========== UTILIDADES ==========
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ========== SCROLL SUAVE Y NAVBAR ==========
const navbar = $('#navbar');
const menuToggle = $('#menu-toggle');
const mobileMenu = $('#mobile-menu');

// Efecto sticky en navbar
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Scroll suave a secciones
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80; // Altura aproximada del navbar
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// Cerrar menú mobile y hacer scroll
function handleNavClick(e) {
  const target = e.currentTarget.getAttribute('data-scroll');
  if (target) {
    scrollToSection(target);
    // Cerrar menú mobile si está abierto
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
    }
  }
}

// Asignar eventos a todos los botones de navegación
$$('[data-scroll]').forEach(button => {
  button.addEventListener('click', handleNavClick);
});

// ========== MENÚ MOBILE ==========
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
  if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
    if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      mobileMenu.classList.add('hidden');
    }
  }
});

// ========== FAQ ACCORDION ==========
const faqData = [
  {
    question: "¿Qué beneficios tiene Zensia?",
    answer: "Zensia ofrece soporte de colágeno para la piel, acción antioxidante gracias al Acai y Camu-Camu, y apoya la digestión mediante prebióticos (inulina). Ayuda a mantener el bienestar general de forma natural."
  },
  {
    question: "¿Zensia tiene azúcar?",
    answer: "No. Zensia es una bebida 100% libre de azúcar añadida. Su sabor proviene de los ingredientes naturales y endulzantes no calóricos seguros."
  },
  {
    question: "¿Qué contiene Zensia?",
    answer: "Contiene Colágeno Hidrolizado, extracto de Acai, polvo de Camu-Camu (rico en Vitamina C), Ginseng y Prebióticos (Inulina)."
  },
  {
    question: "¿Cómo se toma Zensia?",
    answer: "Mezcla un stick (5g) en un vaso de agua fría, jugo o smoothie. Se recomienda tomarlo una vez al día, preferiblemente en la mañana o media tarde."
  },
  {
    question: "¿Zensia sirve para la piel?",
    answer: "Sí. El colágeno hidrolizado y la Vitamina C del Camu-Camu son nutrientes conocidos por dar soporte a la estructura y elasticidad de la piel."
  },
  {
    question: "¿Zensia tiene efectos secundarios?",
    answer: "Zensia es un alimento seguro. Sin embargo, si estás embarazada, lactando o tienes alguna condición médica específica, consulta a tu médico antes de consumir."
  },
  {
    question: "¿Zensia es natural?",
    answer: "Zensia prioriza ingredientes de origen natural y extractos reales de frutas y plantas. No contiene colorantes artificiales agresivos."
  },
  {
    question: "¿Zensia reemplaza comidas?",
    answer: "No. Zensia es un complemento nutricional funcional, no un reemplazo de comidas. Debe consumirse dentro de una dieta equilibrada."
  },
  {
    question: "¿Para quién es Zensia?",
    answer: "Está formulado especialmente para mujeres a partir de los 25 años que buscan cuidar su piel y bienestar interno de forma preventiva y mantenida."
  },
  {
    question: "¿Dónde comprar Zensia?",
    answer: "Puedes comprar Zensia directamente en esta página web con envío a toda Colombia."
  }
];

// Renderizar FAQ
const faqList = $('#faq-list');
if (faqList) {
  faqData.forEach((item, index) => {
    const faqItem = document.createElement('div');
    faqItem.className = 'faq-item';
    faqItem.innerHTML = `
      <div class="faq-question">
        ${item.question}
      </div>
      <div class="faq-answer">
        ${item.answer}
      </div>
    `;
    faqList.appendChild(faqItem);

    // Añadir evento al botón de pregunta
    const questionBtn = faqItem.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      faqItem.classList.toggle('open');
    });
  });
}

// ========== AI EXPERIENCE (SIMULADO) ==========
let aiMessages = [
  { role: 'model', text: 'Hola, soy tu asistente Zensia. ¿Tienes dudas sobre ingredientes o cómo tomarlo?' }
];

// Cambiar pestañas
const aiTabChat = $('#ai-tab-chat');
const aiTabVisualize = $('#ai-tab-visualize');
const aiChatContent = $('#ai-chat');
const aiVisualizeContent = $('#ai-visualize');

function switchAiTab(tab) {
  // Actualizar botones
  aiTabChat.classList.toggle('active', tab === 'chat');
  aiTabVisualize.classList.toggle('active', tab === 'visualize');
  
  // Mostrar contenido
  aiChatContent.classList.toggle('active', tab === 'chat');
  aiVisualizeContent.classList.toggle('active', tab === 'visualize');
}

if (aiTabChat) aiTabChat.addEventListener('click', () => switchAiTab('chat'));
if (aiTabVisualize) aiTabVisualize.addEventListener('click', () => switchAiTab('visualize'));

// Chat simulado
const aiChatMessages = $('#ai-chat-messages');
const aiChatForm = $('#ai-chat-form');
const aiChatInput = $('#ai-chat-input');

if (aiChatForm) {
  aiChatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = aiChatInput.value.trim();
    if (!message) return;

    // Añadir mensaje del usuario
    const userMsg = document.createElement('div');
    userMsg.className = 'ai-message ai-message-user';
    userMsg.textContent = message;
    aiChatMessages.appendChild(userMsg);

    // Limpiar input
    aiChatInput.value = '';

    // Simular respuesta después de un retraso
    setTimeout(() => {
      const responses = [
        "¡Excelente pregunta! Zensia combina colágeno hidrolizado con antioxidantes naturales para un enfoque holístico del bienestar.",
        "Nuestro colágeno es de tipo I y III, ideal para piel, cabello y uñas. Se absorbe rápidamente gracias a su hidrólisis.",
        "El Camu-Camu es una de las fuentes naturales más ricas en vitamina C, esencial para la síntesis de colágeno en tu cuerpo.",
        "Zensia no contiene azúcar añadida. Su sabor natural proviene de los ingredientes y un toque de edulcorante natural seguro.",
        "Te recomiendo tomarlo en la mañana con agua fría para empezar el día con energía y bienestar.",
        "¡Claro! Puedes mezclarlo en smoothies, jugos naturales o incluso en agua con gas. ¡Sé creativa!"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const modelMsg = document.createElement('div');
      modelMsg.className = 'ai-message ai-message-model';
      modelMsg.textContent = randomResponse;
      aiChatMessages.appendChild(modelMsg);
      
      // Scroll al final
      aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    }, 1000);
  });
}

// Generador de imágenes simulado
const aiImageForm = $('#ai-image-form');
const aiPreview = $('#ai-preview');

if (aiImageForm) {
  aiImageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const prompt = $('#ai-prompt').value.trim();
    if (!prompt) return;

    // Mostrar estado de carga
    aiPreview.innerHTML = `
      <div class="ai-preview-placeholder">
        <i data-lucide="loader-2" class="ai-preview-icon animate-spin"></i>
        <p>Creando tu visualización...</p>
      </div>
    `;
    lucide.createIcons();

    // Simular generación
    setTimeout(() => {
      // Usar una imagen placeholder basada en el prompt
      const imgSrc = `https://picsum.photos/800/600?random=${Math.floor(Math.random() * 100)}`;
      
      aiPreview.innerHTML = `
        <div style="position: relative; width: 100%; height: 100%;">
          <img src="${imgSrc}" alt="Visualización generada" style="max-width: 100%; max-height: 100%; object-fit: contain;">
          <a href="${imgSrc}" download="zensia-vision.png" style="
            position: absolute; 
            bottom: 1rem; 
            right: 1rem; 
            background: rgba(255,255,255,0.2); 
            backdrop-filter: blur(4px); 
            padding: 0.5rem; 
            border-radius: 50%; 
            color: white;
            text-decoration: none;
          ">
            <i data-lucide="download"></i>
          </a>
        </div>
      `;
      lucide.createIcons();
    }, 2000);
  });
}

// ========== FOOTER ==========
const currentYearEl = $('#current-year');
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}

// ========== INICIALIZACIÓN FINAL ==========
// Scroll al inicio para asegurar que no hay scroll residual
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});