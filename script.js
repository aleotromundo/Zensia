// script.js

document.addEventListener('DOMContentLoaded', () => {
  // ========== 1. Partículas flotantes doradas ==========
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    const particleCount = window.innerWidth > 768 ? 30 : 15;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      // Posición horizontal aleatoria
      const leftPos = Math.random() * 100;
      particle.style.left = `${leftPos}vw`;

      // Propiedades aleatorias
      const size = 2 + Math.random() * 4; // 2px a 6px
      const duration = 8 + Math.random() * 12; // 8s a 20s
      const delay = Math.random() * 5; // Hasta 5s de retraso

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;

      particlesContainer.appendChild(particle);
    }
  }

  // ========== 2. Toggle menú móvil ==========
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      // Opcional: cambiar ícono a "X" cuando esté abierto
      const icon = menuToggle.querySelector('i');
      if (mobileMenu.classList.contains('hidden')) {
        icon.setAttribute('data-lucide', 'menu');
      } else {
        icon.setAttribute('data-lucide', 'x');
      }
      // Re-render ícono de Lucide
      lucide.createIcons();
    });
  }

  // ========== 3. Scroll suave para botones con data-scroll ==========
  const scrollButtons = document.querySelectorAll('[data-scroll]');
  scrollButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const targetId = button.getAttribute('data-scroll');
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Cierra el menú móvil si está abierto
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          const icon = menuToggle.querySelector('i');
          icon.setAttribute('data-lucide', 'menu');
          lucide.createIcons();
        }

        // Scroll suave
        const offsetTop = targetElement.offsetTop - 80; // Ajusta por navbar sticky
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========== 4. Actualizar año en el footer ==========
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // ========== 5. (Opcional) Lógica de pestañas en Zensia AI ==========
  const aiTabs = document.querySelectorAll('.ai-tab');
  const aiContents = document.querySelectorAll('.ai-tab-content');

  aiTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');

      // Activar pestaña
      aiTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Mostrar contenido correspondiente
      aiContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === `ai-${target}`) {
          content.classList.add('active');
        }
      });
    });
  });

  // ========== 6. (Opcional) Formularios de IA - solo prevenir envío por ahora ==========
  const aiChatForm = document.getElementById('ai-chat-form');
  const aiImageForm = document.getElementById('ai-image-form');

  if (aiChatForm) {
    aiChatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Aquí iría la lógica de IA más adelante
      alert('Esta funcionalidad estará disponible próximamente.');
    });
  }

  if (aiImageForm) {
    aiImageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Aquí iría la generación de imagen
      alert('Generador visual en desarrollo.');
    });
  }

  // ========== 7. (Opcional) FAQ dinámico - ejemplo básico ==========
  const faqList = document.getElementById('faq-list');
  if (faqList) {
    const faqs = [
      {
        q: "¿Zensia contiene azúcar?",
        a: "No. Zensia no tiene azúcar añadida ni edulcorantes artificiales."
      },
      {
        q: "¿Cuándo se empiezan a notar los beneficios?",
        a: "Los efectos pueden variar por persona, pero muchas usuarias reportan mejoras en digestión y energía en pocos días, y en la piel a partir de las 4 semanas."
      },
      {
        q: "¿Es apto para veganos?",
        a: "No, ya que el colágeno hidrolizado es de origen animal (bovino o marino)."
      },
      {
        q: "¿Puedo tomarlo si estoy embarazada?",
        a: "Recomendamos consultar con tu médico antes de usar cualquier suplemento durante el embarazo o lactancia."
      }
    ];

    faqs.forEach(faq => {
      const item = document.createElement('div');
      item.classList.add('faq-item');
      item.innerHTML = `
        <div class="faq-question">
          <span>${faq.q}</span>
          <i data-lucide="chevron-down" class="faq-icon"></i>
        </div>
        <div class="faq-answer">
          <p>${faq.a}</p>
        </div>
      `;
      faqList.appendChild(item);
    });

    // Activar íconos de Lucide para FAQ
    lucide.createIcons();

    // Toggle FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('.faq-icon');
        answer.classList.toggle('open');
        icon.setAttribute('data-lucide', answer.classList.contains('open') ? 'chevron-up' : 'chevron-down');
        lucide.createIcons();
      });
    });
  }
});