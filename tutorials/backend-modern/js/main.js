/**
 * Main JavaScript - Backend Tutorial v2.1 Mission Hub
 * Lädt alle Module und initialisiert die Basisfunktionen
 */

// === PHASE 3: MODULE LOADER (Synchrone Ladereihenfolge) ===
// Diese Skripte müssen vor DOMContentLoaded geladen werden
(function loadScripts() {
  const scripts = [
    'js/utils.js',
    'js/missions.js', 
    'js/ai.js',
    'js/abgabe.js',
    'js/seed.js',
    'js/classroom.js'
  ];
  
  // Für Mission-Seiten: Pfade relativ anpassen
  const pathPrefix = window.location.pathname.includes('/kapitel/') || 
                     window.location.pathname.includes('/uebungen/') ? '../' : '';
  
  scripts.forEach(src => {
    const script = document.createElement('script');
    script.src = pathPrefix + src;
    script.async = false; // Wichtig: Synchron laden für Abhängigkeiten
    document.head.appendChild(script);
  });
})();

document.addEventListener('DOMContentLoaded', function() {
  console.log('[Main] DOM ready, initializing...');
  
  // === MOBILE MENU TOGGLE ===
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navWrapper = document.querySelector('.nav-wrapper');

  if (mobileMenuToggle && navWrapper) {
    mobileMenuToggle.addEventListener('click', function() {
      navWrapper.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });
  }

  // === DARK MODE ===
  const darkModeToggle = document.getElementById('dark-mode-toggle');

  const isDarkMode = localStorage.getItem('darkMode') === 'true' ||
                    (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDarkMode) {
    document.documentElement.classList.add('dark-mode');
    if (darkModeToggle) {
      darkModeToggle.innerHTML = '[◐]';
    }
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark-mode');
      const isActive = document.documentElement.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isActive);
      darkModeToggle.innerHTML = isActive ? '[◐]' : '[◑]';
    });
  }

  // === DROPDOWN-MENÜ ===
  const toggles = document.querySelectorAll('.nav-item.dropdown > a.nav-link');
  toggles.forEach(toggle => {
    const dropdown = toggle.nextElementSibling;
    if (dropdown && dropdown.classList.contains('dropdown-menu')) {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const isMobileMenuActive = document.querySelector('.nav-wrapper')?.classList.contains('active');
        const isMobileView = window.innerWidth <= 768;

        document.querySelectorAll('.dropdown-menu').forEach(menu => {
          if (isMobileMenuActive || isMobileView) {
            if (menu !== dropdown) menu.classList.remove('show');
          } else {
            if (menu !== dropdown) menu.style.display = 'none';
          }
        });

        const isCurrentlyShown = dropdown.classList.contains('show');
        if (isMobileMenuActive || isMobileView) {
          dropdown.classList.toggle('show');
        } else {
          dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }

        if ((isMobileMenuActive || isMobileView) && !isCurrentlyShown) {
          setTimeout(() => {
            const navWrapper = document.querySelector('.nav-wrapper');
            if (navWrapper && dropdown) {
              const dropdownRect = dropdown.getBoundingClientRect();
              const navWrapperRect = navWrapper.getBoundingClientRect();
              if (dropdownRect.bottom > navWrapperRect.bottom || dropdownRect.top < navWrapperRect.top) {
                navWrapper.scrollTop = dropdown.offsetTop - 100;
              }
            }
          }, 10);
        }
      });
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item.dropdown')) {
      const isMobileMenuActive = document.querySelector('.nav-wrapper')?.classList.contains('active');
      const isMobileView = window.innerWidth <= 768;

      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        if (isMobileMenuActive || isMobileView) {
          menu.classList.remove('show');
        } else {
          menu.style.display = 'none';
        }
      });
    }
  });

  document.addEventListener('click', function(e) {
    const navWrapper = document.querySelector('.nav-wrapper');
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle');

    if (navWrapper && navWrapper.classList.contains('active') &&
        !e.target.closest('.nav-wrapper') &&
        !e.target.closest('#mobile-menu-toggle')) {
      navWrapper.classList.remove('active');
      if (mobileMenuBtn) {
        mobileMenuBtn.classList.remove('active');
      }
    }
  });

  window.addEventListener('resize', function() {
    const navWrapper = document.querySelector('.nav-wrapper');
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle');

    if (window.innerWidth > 768 && navWrapper && navWrapper.classList.contains('active')) {
      navWrapper.classList.remove('active');
      if (mobileMenuBtn) {
        mobileMenuBtn.classList.remove('active');
      }
    }
  });

  // === SERVICE WORKER ===
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('SW registered'))
        .catch(err => console.log('SW failed', err));
    });
  }

  console.log('[Main] Initialization complete');
});

// === PHASE 2: Legacy Progress System (für Abwärtskompatibilität) ===
// Exportiere ProgressSystem als Alias zu MissionsAPI wenn verfügbar
window.ProgressSystem = {
  completeMission(id) {
    if (window.MissionsAPI) {
      return window.MissionsAPI.completeMission(id);
    }
    console.error('MissionsAPI not loaded yet');
    return false;
  },
  getMissionStatus() {
    if (window.MissionsAPI) {
      return window.MissionsAPI.getMissionStatus();
    }
    return {};
  },
  init() {
    if (window.MissionsAPI) {
      window.MissionsAPI.init();
    }
  }
};
