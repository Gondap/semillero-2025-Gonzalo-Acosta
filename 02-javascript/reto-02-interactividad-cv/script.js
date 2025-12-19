document.addEventListener('DOMContentLoaded', () => {
  // 1. Efecto de escritura en la consola del Hero
  const codeElement = document.getElementById('typing-code');
  const codeText = `class GonzaloAcosta:
    def __init__(self):
        self.role = "Mechatronics Engineer"
        self.focus = ["AI", "Industry 4.0", "Robotics"]
        self.location = "Monterrey, MX"

    def get_mission(self):
        return "Transforming industry through innovation"

# Initializing profile...
gonzalo = GonzaloAcosta()
print(gonzalo.get_mission())`;

  let i = 0;
  function typeCode() {
    if (i < codeText.length) {
      codeElement.textContent += codeText.charAt(i);
      i++;
      setTimeout(typeCode, 20);
    }
  }
  typeCode();

  // 2. Cambio de Tema (Dark/Light)
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme');
    const isLight = body.classList.contains('light-theme');
    themeToggle.textContent = isLight ? '🌙' : '☀️';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // Cargar tema guardado
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-theme');
    body.classList.remove('dark-theme');
    themeToggle.textContent = '🌙';
  }

  // 3. Tabs de Habilidades
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.skills-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });

  // 4. Secciones Expandibles (Logros)
  const expandBtns = document.querySelectorAll('.expand-btn');
  
  expandBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const achievements = btn.nextElementSibling;
      achievements.classList.toggle('hidden');
      btn.textContent = achievements.classList.contains('hidden') ? 'Ver logros ▼' : 'Ocultar logros ▲';
    });
  });

  // 5. Validación de Formulario
  const contactForm = document.getElementById('contact-form');
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
      alert(`¡Gracias ${name}! Tu mensaje ha sido enviado (simulación).`);
      contactForm.reset();
    } else {
      alert('Por favor, completa todos los campos.');
    }
  });

  // 6. Animación de entrada al hacer scroll
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });
});
