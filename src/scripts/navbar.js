// Script para manejar el menú móvil
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileMenuButton && navMenu) {
    mobileMenuButton.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      mobileMenuButton.classList.toggle('active');
      
      const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
      mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Cerrar el menú cuando se hace clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        mobileMenuButton.classList.remove('active');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }
});