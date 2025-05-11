// Script para el slideshow del hero section
document.addEventListener('DOMContentLoaded', function() {
  // Elementos del slideshow
  var slides = document.querySelectorAll('.slide');
  var dots = document.querySelectorAll('.control-dot');
  var currentSlide = 0;
  var slideInterval;
  
  // Función para mostrar un slide específico
  function showSlide(index) {
    // Quitar clase active de todos los slides y dots
    slides.forEach(function(slide) {
      slide.classList.remove('active');
    });
    
    dots.forEach(function(dot) {
      dot.classList.remove('active');
    });
    
    // Añadir clase active al slide y dot actual
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentSlide = index;
  }
  
  // Función para mostrar el siguiente slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  
  // Iniciar slideshow automático
  function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5000); // Cambiar slide cada 5 segundos
  }
  
  // Detener slideshow
  function stopSlideshow() {
    clearInterval(slideInterval);
  }
  
  // Añadir eventos a los dots para cambiar slide manualmente
  dots.forEach(function(dot, index) {
    dot.addEventListener('click', function() {
      stopSlideshow();
      showSlide(index);
      startSlideshow();
    });
  });
  
  // Iniciar slideshow al cargar la página
  startSlideshow();
  
  // Efecto paralaje al desplazar
  window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY;
    var activeSlide = document.querySelector('.slide.active');
    
    if (activeSlide) {
      activeSlide.style.transform = 'scale(1) translateY(' + (scrollPosition * 0.1) + 'px)';
    }
  });
});