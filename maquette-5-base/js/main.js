document.addEventListener('DOMContentLoaded', () => {
  /* 🎨 Thème Sombre / Clair */
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      // Sauvegarder le thème dans localStorage
      const isDarkMode = document.body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });

    // Appliquer le thème sauvegardé au chargement de la page
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }
  }

  /* 🔝 Animation du Header au Scroll */
  let lastScrollY = window.scrollY;
  const header = document.querySelector('.main-header');

  if (header) {
    window.addEventListener('scroll', () => {
      // Ajout de la classe "scrolled" quand on descend
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Masquer / Réafficher le header selon la direction du scroll
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        header.classList.add('hide');
      } else {
        header.classList.remove('hide');
      }
      lastScrollY = window.scrollY;
    });
  }

  /* 🎭 Animation des Liens de Navigation */
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      // Animation de clic
      this.style.transform = 'scale(0.95)';
      this.style.transition = 'transform 0.2s ease';
      setTimeout(() => {
        this.style.transform = 'none';
        window.location.href = this.href;
      }, 200);
    });
  });

  /* 🔄 Animation du Logo au Survol */
  const logo = document.querySelector('.header-logo');
  if (logo) {
    logo.addEventListener('mouseenter', () => {
      logo.style.transform = 'rotate(-5deg) scale(1.05)';
      logo.style.transition = 'transform 0.3s ease';
    });
    logo.addEventListener('mouseleave', () => {
      logo.style.transform = 'none';
    });
  }

  /* 📱 Menu Burger (Mobile) */
  const menuToggle = document.getElementById('menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const mainNav = document.querySelector('.main-nav');
      if (mainNav) {
        mainNav.classList.toggle('show');
      }
    });
  }
});