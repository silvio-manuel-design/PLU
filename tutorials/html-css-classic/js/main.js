document.addEventListener('DOMContentLoaded', function() {
  // === MOBILE MENU TOGGLE ===
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navWrapper = document.querySelector('.nav-wrapper');

  // Mobile menu toggle functionality
  if (mobileMenuToggle && navWrapper) {
    mobileMenuToggle.addEventListener('click', function() {
      navWrapper.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });
  }

  // === DARK MODE ===
  const darkModeToggle = document.getElementById('dark-mode-toggle');

  // Check saved mode or system preference
  const isDarkMode = localStorage.getItem('darkMode') === 'true' ||
                    (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (isDarkMode) {
    document.documentElement.classList.add('dark-mode');
    if (darkModeToggle) {
      darkModeToggle.innerHTML = '🌕';
    }
  }

  // Toggle function
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark-mode');
      const isActive = document.documentElement.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isActive);
      darkModeToggle.innerHTML = isActive ? '🌕' : '🌓';
    });
  }

  // === DROPDOWN-MENÜ (wie zuvor) ===
  const toggles = document.querySelectorAll('.nav-item.dropdown > a.nav-link');
  toggles.forEach(toggle => {
    const dropdown = toggle.nextElementSibling;
    if (dropdown && dropdown.classList.contains('dropdown-menu')) {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();

        // Determine if mobile menu is active (hamburger menu expanded)
        const isMobileMenuActive = document.querySelector('.nav-wrapper')?.classList.contains('active');
        const isMobileView = window.innerWidth <= 768;

        // Close all other dropdowns and toggle current one
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
          // If mobile menu is active or we're in mobile view, use classList
          if (isMobileMenuActive || isMobileView) {
            if (menu !== dropdown) menu.classList.remove('show');
          } else {
            if (menu !== dropdown) menu.style.display = 'none';
          }
        });

        // Toggle current dropdown
        const isCurrentlyShown = dropdown.classList.contains('show');
        if (isMobileMenuActive || isMobileView) {
          dropdown.classList.toggle('show');
        } else {
          dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }

        // On mobile, if we just opened a dropdown, ensure the mobile menu is scrolled to show it
        if ((isMobileMenuActive || isMobileView) && !isCurrentlyShown) {
          setTimeout(() => {
            // Scroll the mobile menu to show the opened dropdown
            const navWrapper = document.querySelector('.nav-wrapper');
            if (navWrapper && dropdown) {
              // Calculate position of dropdown relative to the mobile menu
              const dropdownRect = dropdown.getBoundingClientRect();
              const navWrapperRect = navWrapper.getBoundingClientRect();

              // If dropdown is not fully visible, scroll to it
              if (dropdownRect.bottom > navWrapperRect.bottom || dropdownRect.top < navWrapperRect.top) {
                const scrollTop = navWrapper.scrollTop;
                const elementTop = dropdown.offsetTop;
                const elementHeight = dropdown.offsetHeight;

                // Scroll to position that shows the dropdown
                navWrapper.scrollTop = elementTop - 100; // 100px offset to show some context
              }
            }
          }, 10); // Small delay to allow DOM update
        }
      });
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item.dropdown')) {
      // Determine if mobile menu is active
      const isMobileMenuActive = document.querySelector('.nav-wrapper')?.classList.contains('active');
      const isMobileView = window.innerWidth <= 768;

      // Close all dropdowns using appropriate method based on mobile menu state
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        if (isMobileMenuActive || isMobileView) {
          menu.classList.remove('show');
        } else {
          menu.style.display = 'none';
        }
      });
    }
  });

  // Close mobile menu when clicking outside
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

  // Close mobile menu when resizing to desktop view
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

  // === BACK-TO-TOP (wird seitenweise eingebunden, daher hier nicht nötig) ===

  // === SERVICE WORKER REGISTRIERUNG ===
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('./sw.js')
        .then(function(registration) {
          console.log('SW registriert: ', registration);
        })
        .catch(function(registrationError) {
          console.log('SW Registrierung fehlgeschlagen: ', registrationError);
        });
    });
  }
});