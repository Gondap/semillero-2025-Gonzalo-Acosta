// ============================================
// NAVEGACIÓN MÓVIL
// ============================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// ============================================
// ANIMACIONES AL SCROLL
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observar elementos para animación
document.querySelectorAll('.timeline-item, .skill-card, .education-item, .contact-item').forEach(el => {
  observer.observe(el);
});

// ============================================
// SCROLL SUAVE Y ACTIVE NAV
// ============================================

window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// ============================================
// EFECTO PARALLAX EN HERO
// ============================================

const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    hero.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
  });
}

// ============================================
// ANIMACIÓN DE BARRAS DE IDIOMAS
// ============================================

const animateLanguageBars = () => {
  const languageFills = document.querySelectorAll('.language-fill');
  
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'none';
        setTimeout(() => {
          entry.target.style.animation = '';
        }, 10);
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  languageFills.forEach(fill => {
    barObserver.observe(fill);
  });
};

animateLanguageBars();

// ============================================
// EFECTOS DE HOVER EN CARDS
// ============================================

document.querySelectorAll('.skill-card, .timeline-content, .education-item').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
  });

  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// ============================================
// COPIAR INFORMACIÓN DE CONTACTO
// ============================================

document.querySelectorAll('.contact-item a').forEach(link => {
  link.addEventListener('click', function(e) {
    if (this.href.startsWith('mailto:') || this.href.startsWith('tel:')) {
      // Permitir que el navegador maneje estos enlaces
      return;
    }
    e.preventDefault();
  });
});

// ============================================
// CONTADOR DE ANIMACIÓN
// ============================================

const animateCounter = (element, target, duration = 2000) => {
  let current = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
};

// ============================================
// SMOOTH SCROLL PARA NAVEGACIÓN
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============================================
// DETECCIÓN DE TEMA OSCURO/CLARO
// ============================================

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

if (prefersDarkScheme.matches) {
  document.body.classList.add('dark-theme');
} else {
  document.body.classList.add('light-theme');
}

// ============================================
// CARGAR ANIMACIONES AL INICIAR
// ============================================

window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  
  // Animar elementos del hero
  const heroText = document.querySelector('.hero-text');
  const heroImage = document.querySelector('.hero-image');
  
  if (heroText) {
    heroText.style.animation = 'slideInLeft 0.8s ease-out';
  }
  if (heroImage) {
    heroImage.style.animation = 'fadeInUp 0.8s ease-out 0.2s both';
  }
});

// ============================================
// MANEJO DE ERRORES Y COMPATIBILIDAD
// ============================================

if (!window.matchMedia) {
  console.warn('Media queries no soportadas en este navegador');
}

if (!Element.prototype.scrollIntoView) {
  console.warn('scrollIntoView no soportado, usando fallback');
}

// ============================================
// PERFORMANCE: Lazy Loading
// ============================================

if ('IntersectionObserver' in window) {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// ============================================
// ESTILOS DINÁMICOS PARA NAVEGACIÓN MÓVIL
// ============================================

const style = document.createElement('style');
style.textContent = `
  @media (max-width: 768px) {
    .nav-menu {
      display: none;
      position: fixed;
      top: 70px;
      left: 0;
      right: 0;
      background: rgba(15, 23, 42, 0.98);
      backdrop-filter: blur(10px);
      flex-direction: column;
      padding: 1rem;
      gap: 0.5rem;
      border-bottom: 1px solid var(--border-color);
    }

    .nav-menu.active {
      display: flex;
    }

    .nav-link {
      padding: 0.75rem 1rem;
      border-radius: 6px;
      transition: all 0.3s ease;
    }

    .nav-link:hover {
      background: rgba(99, 102, 241, 0.1);
    }

    .nav-toggle.active span:nth-child(1) {
      transform: rotate(45deg) translate(8px, 8px);
    }

    .nav-toggle.active span:nth-child(2) {
      opacity: 0;
    }

    .nav-toggle.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -7px);
    }
  }
`;
document.head.appendChild(style);

console.log('Script de CV cargado exitosamente');
