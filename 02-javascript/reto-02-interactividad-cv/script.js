// ============================================
// RETO 02 - INTERACTIVIDAD PARA EL CV
// Gonzalo Acosta Soto - Semillero Zero2Hero 2025
// ============================================

// ============================================
// 1. DATOS DINÁMICOS
// ============================================

const projectsData = [
  {
    id: 1,
    title: "Sistema de Monitoreo Predictivo",
    company: "International Motors",
    description: "Implementación de soluciones IA para análisis predictivo en líneas de producción",
    technologies: ["Python", "Machine Learning", "SQL"],
    year: 2024
  },
  {
    id: 2,
    title: "Optimización de Procesos Manufacturing",
    company: "DataSystems Group",
    description: "Diseño e implementación de estrategias de optimización en plantas de manufactura",
    technologies: ["Power BI", "Python", "Análisis de Datos"],
    year: 2023
  },
  {
    id: 3,
    title: "Instrumentación de Plantas de Reducción",
    company: "Tenova Hyl Technologies",
    description: "Supervisión e instalación de sistemas de instrumentación en plantas de hierro",
    technologies: ["P&ID", "Navisworks", "EIC Standards"],
    year: 2021
  },
  {
    id: 4,
    title: "Diseño de Prototipos Electrónicos",
    company: "Clickpoint EXO",
    description: "Desarrollo de prototipos electrónicos para exoesqueletos médicos",
    technologies: ["PCB Design", "Electrónica", "Testing"],
    year: 2018
  }
];

const skillsData = {
  "Programación": ["Python", "C++", "JavaScript", "SQL"],
  "Herramientas CAD": ["SolidWorks", "AutoCAD", "Navisworks"],
  "Análisis": ["Power BI", "Matlab", "Excel Avanzado"],
  "Industria 4.0": ["IoT", "Automatización", "Robótica", "IA"],
  "Gestión": ["Liderazgo", "Project Management", "Design Thinking"]
};

const experienceYears = {
  startYear: 2017,
  currentYear: new Date().getFullYear()
};

// ============================================
// 2. INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Script de CV cargado exitosamente');
  
  // Cargar preferencias guardadas
  loadThemePreference();
  loadLastSection();
  
  // Inicializar funcionalidades
  initNavigation();
  initThemeToggle();
  initExpandableSections();
  initContactForm();
  initProjectsList();
  initExperienceCounter();
  initScrollAnimations();
});

// ============================================
// 3. NAVEGACIÓN Y MENÚ MÓVIL
// ============================================

function initNavigation() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Abrir/cerrar menú móvil
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }

  // Cerrar menú al hacer clic en un enlace
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      navMenu.classList.remove('active');
      if (navToggle) navToggle.classList.remove('active');
      
      // Guardar última sección visitada
      const sectionId = link.getAttribute('href').slice(1);
      if (sectionId) {
        localStorage.setItem('lastSection', sectionId);
      }
    });
  });

  // Smooth scroll
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

  // Actualizar nav activo al scroll
  window.addEventListener('scroll', updateActiveNav);
}

function updateActiveNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
}

// ============================================
// 4. TEMA OSCURO/CLARO CON LOCALSTORAGE
// ============================================

function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Aplicar tema guardado al cargar
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);
}

function toggleTheme() {
  const currentTheme = localStorage.getItem('theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Feedback visual
  showToast(`Tema cambiado a ${newTheme === 'dark' ? 'oscuro' : 'claro'}`);
}

function applyTheme(theme) {
  const root = document.documentElement;
  
  if (theme === 'light') {
    root.style.setProperty('--dark-bg', '#f8fafc');
    root.style.setProperty('--card-bg', '#ffffff');
    root.style.setProperty('--text-primary', '#0f172a');
    root.style.setProperty('--text-secondary', '#475569');
    root.style.setProperty('--border-color', '#e2e8f0');
    document.body.classList.add('light-theme');
  } else {
    root.style.setProperty('--dark-bg', '#0f172a');
    root.style.setProperty('--card-bg', '#1e293b');
    root.style.setProperty('--text-primary', '#f1f5f9');
    root.style.setProperty('--text-secondary', '#cbd5e1');
    root.style.setProperty('--border-color', '#334155');
    document.body.classList.remove('light-theme');
  }
}

// ============================================
// 5. SECCIONES EXPANDIBLES (VER MÁS/MENOS)
// ============================================

function initExpandableSections() {
  const expandButtons = document.querySelectorAll('[data-expand]');
  
  expandButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = button.getAttribute('data-expand');
      const target = document.getElementById(targetId);
      
      if (target) {
        target.classList.toggle('expanded');
        button.textContent = target.classList.contains('expanded') ? 'Ver menos' : 'Ver más';
        button.classList.toggle('active');
      }
    });
  });
}

// ============================================
// 6. VALIDACIÓN DE FORMULARIO DE CONTACTO
// ============================================

function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const name = form.querySelector('[name="name"]')?.value.trim();
  const email = form.querySelector('[name="email"]')?.value.trim();
  const message = form.querySelector('[name="message"]')?.value.trim();
  
  // Validación
  if (!validateForm(name, email, message)) {
    return;
  }
  
  // Simular envío
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';
  
  setTimeout(() => {
    showToast('✅ Mensaje enviado exitosamente');
    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }, 1000);
}

function validateForm(name, email, message) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!name || name.length < 3) {
    showToast('❌ El nombre debe tener al menos 3 caracteres');
    return false;
  }
  
  if (!email || !emailRegex.test(email)) {
    showToast('❌ Por favor ingresa un email válido');
    return false;
  }
  
  if (!message || message.length < 10) {
    showToast('❌ El mensaje debe tener al menos 10 caracteres');
    return false;
  }
  
  return true;
}

// ============================================
// 7. RENDERIZAR LISTA DE PROYECTOS
// ============================================

function initProjectsList() {
  const projectsContainer = document.getElementById('projectsList');
  
  if (projectsContainer) {
    renderProjects(projectsData);
  }
}

function renderProjects(projects) {
  const container = document.getElementById('projectsList');
  
  if (!container) return;
  
  container.innerHTML = '';
  
  projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.innerHTML = `
      <h3>${project.title}</h3>
      <p class="project-company">${project.company} • ${project.year}</p>
      <p class="project-description">${project.description}</p>
      <div class="project-tech">
        ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
      </div>
    `;
    
    container.appendChild(projectCard);
  });
  
  console.log(`✅ ${projects.length} proyectos renderizados`);
}

// ============================================
// 8. CONTADOR DE AÑOS DE EXPERIENCIA
// ============================================

function initExperienceCounter() {
  const experienceElement = document.getElementById('experienceYears');
  
  if (experienceElement) {
    const yearsOfExperience = experienceYears.currentYear - experienceYears.startYear;
    experienceElement.textContent = yearsOfExperience;
    console.log(`✅ Años de experiencia calculados: ${yearsOfExperience}`);
  }
}

// ============================================
// 9. ANIMACIONES AL SCROLL
// ============================================

function initScrollAnimations() {
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

  // Observar elementos
  document.querySelectorAll('.project-card, .skill-card, .education-item').forEach(el => {
    observer.observe(el);
  });
}

// ============================================
// 10. UTILIDADES
// ============================================

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // Mostrar
  setTimeout(() => toast.classList.add('show'), 10);
  
  // Ocultar y eliminar
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function loadThemePreference() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);
}

function loadLastSection() {
  const lastSection = localStorage.getItem('lastSection');
  if (lastSection) {
    const element = document.getElementById(lastSection);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }
}

// ============================================
// 11. EVENT LISTENERS GLOBALES
// ============================================

// Prevenir errores comunes
window.addEventListener('error', (event) => {
  console.error('❌ Error en la página:', event.error);
});

// Log cuando el documento está listo
window.addEventListener('load', () => {
  console.log('✅ Página completamente cargada');
});

// Detectar cambios de tema del sistema
const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
darkModeQuery.addEventListener('change', (e) => {
  const newTheme = e.matches ? 'dark' : 'light';
  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
});
