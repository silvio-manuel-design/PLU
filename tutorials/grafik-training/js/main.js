document.addEventListener('DOMContentLoaded', function() {
  // === DARK MODE TOGGLE (wie im JS-Tutorial) ===
  const darkModeToggle = document.getElementById('dark-mode-toggle');

  const isDarkMode = localStorage.getItem('darkMode') === 'true' ||
                    (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  if (isDarkMode) {
    document.documentElement.classList.add('dark-mode');
    if (darkModeToggle) {
      darkModeToggle.innerHTML = '🌕';
    }
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark-mode');
      const isActive = document.documentElement.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isActive);
      darkModeToggle.innerHTML = isActive ? '🌕' : '🌓';
    });
  }

  // === DROPDOWN-MENÜ (Desktop) ===
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

  // === MOBILE HAMBURGER MENÜ ===
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navWrapper = document.querySelector('.nav-wrapper');

  if (mobileToggle && navWrapper) {
    mobileToggle.addEventListener('click', () => {
      navWrapper.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });

    // Dropdowns im Mobile-Menü klickbar machen
    const mobileDropdownToggles = navWrapper.querySelectorAll('.nav-item.dropdown > a');
    mobileDropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const menu = toggle.nextElementSibling;
        if (menu && menu.classList.contains('dropdown-menu')) {
          menu.classList.toggle('show');
        }
      });
    });

    // Klick außerhalb schließt Menü
    document.addEventListener('click', (e) => {
      const isClickInsideNav = navWrapper.contains(e.target);
      const isClickOnToggle = mobileToggle.contains(e.target);
      if (!isClickInsideNav && !isClickOnToggle) {
        navWrapper.classList.remove('active');
        mobileToggle.classList.remove('active');
      }
    });
  }
});

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}