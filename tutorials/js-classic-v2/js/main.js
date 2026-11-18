document.addEventListener('DOMContentLoaded', function() {
  // === DARK MODE TOGGLE ===
  // Verwende existierenden Button aus HTML oder erstelle neuen
  let darkModeToggle = document.getElementById('dark-mode-toggle');
  
  if (!darkModeToggle) {
    darkModeToggle = document.createElement('button');
    darkModeToggle.id = 'dark-mode-toggle';
    darkModeToggle.setAttribute('aria-label', 'Dark Mode umschalten');
    darkModeToggle.innerHTML = '🌓';
    const headerContainer = document.querySelector('.header-container');
    if (headerContainer) {
      headerContainer.appendChild(darkModeToggle);
    }
  }

  const isDarkMode = localStorage.getItem('darkMode') === 'true' || 
                    (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  if (isDarkMode) {
    document.documentElement.classList.add('dark-mode');
    darkModeToggle.innerHTML = '🌕';
  }

  darkModeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-mode');
    const isActive = document.documentElement.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isActive);
    darkModeToggle.innerHTML = isActive ? '🌕' : '🌓';
  });

  // === DROPDOWN-MENÜ ===
  const toggles = document.querySelectorAll('.nav-item.dropdown > a.nav-link');
  toggles.forEach(toggle => {
    const dropdown = toggle.nextElementSibling;
    if (dropdown && dropdown.classList.contains('dropdown-menu')) {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
          if (menu !== dropdown) menu.style.display = 'none';
        });
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
      });
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item.dropdown')) {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.style.display = 'none';
      });
    }
  });

  // === BACK-TO-TOP ===
  const button = document.getElementById('back-to-top');
  if (button) {
    const toggleButton = () => {
      button.classList.toggle('show', window.scrollY > 600);
    };
    window.addEventListener('scroll', toggleButton);
    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});