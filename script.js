document.addEventListener('DOMContentLoaded', () => {
  // ----------------------------------------
  // 1. MENÚ DESPLEGABLE RESPONSIVO
  // ----------------------------------------
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Cerrar el menú al hacer clic en un enlace
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // ----------------------------------------
  // 2. LÓGICA DEL CARRUSEL DE IMÁGENES
  // ----------------------------------------
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let currentSlide = 0;
  let autoSlideInterval;

  function showSlide(index) {
    // Control de rangos
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    // Actualizar clases activas
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentSlide);
    });

    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  // Eventos de botones
  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetTimer();
    });

    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetTimer();
    });
  }

  // Eventos de indicadores
  indicators.forEach(indicator => {
    indicator.addEventListener('click', (e) => {
      const slideIndex = parseInt(e.target.getAttribute('data-slide'));
      showSlide(slideIndex);
      resetTimer();
    });
  });

  // Transición automática cada 5 segundos
  function startTimer() {
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  function resetTimer() {
    clearInterval(autoSlideInterval);
    startTimer();
  }

  // Inicializar carrusel
  if (slides.length > 0) {
    startTimer();
  }
});