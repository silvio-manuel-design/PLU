/**
 * KI Academy - Module 09: Abschluss & Zertifikat
 * Certificate personalization and printing functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initCertificate();
  initScrollProgress();
  initRevealAnimations();
  initSmoothScroll();
  initClassroomMode();
  generateCertificateId();
  setCurrentDate();
});

// ============================================
// CERTIFICATE PERSONALIZATION
// ============================================
function initCertificate() {
  const nameInput = document.getElementById('cert-name');
  
  if (nameInput) {
    // Load saved name from localStorage
    const savedName = localStorage.getItem('ki_academy_certificate_name');
    if (savedName) {
      nameInput.value = savedName;
      updateCertificateDisplay(savedName);
    }
    
    // Allow Enter key to update
    nameInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        updateCertificate();
      }
    });
  }
}

function updateCertificate() {
  const nameInput = document.getElementById('cert-name');
  const name = nameInput.value.trim();
  
  if (!name) {
    // Show a gentle reminder
    nameInput.focus();
    nameInput.style.borderColor = '#E76F51';
    setTimeout(() => {
      nameInput.style.borderColor = '';
    }, 2000);
    return;
  }
  
  // Save to localStorage
  localStorage.setItem('ki_academy_certificate_name', name);
  
  // Update the display
  updateCertificateDisplay(name);
  
  // Visual feedback
  const btn = document.querySelector('.btn-update-cert');
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="ph ph-check"></i> Aktualisiert!';
  btn.style.background = 'linear-gradient(135deg, #90A955 0%, #7A9048 100%)';
  
  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.style.background = '';
  }, 2000);
}

function updateCertificateDisplay(name) {
  const recipientElement = document.getElementById('cert-recipient-name');
  if (recipientElement) {
    recipientElement.textContent = name;
  }
}

function generateCertificateId() {
  const idElement = document.getElementById('cert-id');
  if (idElement) {
    // Generate a unique ID based on timestamp and random
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    const certId = `KA-2026-${timestamp}${random}`;
    idElement.textContent = certId;
  }
}

function setCurrentDate() {
  const dateElement = document.getElementById('cert-date');
  if (dateElement) {
    const now = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('de-DE', options);
  }
}

// ============================================
// CERTIFICATE PRINTING
// ============================================
function printCertificate() {
  // Check if name is set
  const recipientName = document.getElementById('cert-recipient-name').textContent.trim();
  if (recipientName === 'Ihr Name') {
    alert('Bitte geben Sie zuerst Ihren Namen ein.');
    document.getElementById('cert-name').focus();
    return;
  }
  
  window.print();
}

// ============================================
// CERTIFICATE DOWNLOAD (as PDF)
// ============================================
function downloadCertificate() {
  const recipientName = document.getElementById('cert-recipient-name').textContent.trim();
  if (recipientName === 'Ihr Name') {
    alert('Bitte geben Sie zuerst Ihren Namen ein.');
    document.getElementById('cert-name').focus();
    return;
  }
  
  // Trigger print dialog with instructions for PDF
  alert('Um das Zertifikat als PDF zu speichern:\n\n1. Wählen Sie "Als PDF speichern" im Druckdialog\n2. Format: A4 Hochformat (steht bereits korrekt)\n3. Keine Kopf-/Fußzeilen (optional)\n4. Speichern Sie die Datei\n\nDas Zertifikat wird jetzt auf einer einzigen A4-Seite erstellt.');
  
  setTimeout(() => {
    window.print();
  }, 500);
}

// ============================================
// DONATION SUPPORT
// ============================================
function supportPLU() {
  window.open('https://www.pantam.at/tutorials/pages/spenden.html', '_blank', 'noopener,noreferrer');
}

// ============================================
// SCROLL PROGRESS
// ============================================
function initScrollProgress() {
  const progressBar = document.getElementById('progress-bar');
  if (!progressBar) return;
  
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
  }
  
  // Throttled scroll listener
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  
  // Initial update
  updateProgress();
}

// ============================================
// REVEAL ANIMATIONS
// ============================================
function initRevealAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if (!revealElements.length) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  revealElements.forEach(el => observer.observe(el));
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        
        const navHeight = document.querySelector('.main-nav')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================
// CLASSROOM MODE
// ============================================
function initClassroomMode() {
  const ClassroomMode = {
    toggleBtn: null,
    
    init() {
      this.toggleBtn = document.querySelector('.classroom-toggle');
      if (!this.toggleBtn) return;
      
      // Restore saved state
      if (localStorage.getItem('ki_academy_classroom') === 'true') {
        document.body.classList.add('classroom-mode');
        this.toggleBtn.classList.add('active');
      }
      
      this.toggleBtn.addEventListener('click', () => this.toggle());
    },
    
    toggle() {
      document.body.classList.toggle('classroom-mode');
      const isActive = document.body.classList.contains('classroom-mode');
      localStorage.setItem('ki_academy_classroom', isActive);
      
      if (this.toggleBtn) {
        this.toggleBtn.classList.toggle('active', isActive);
      }
      
      // Accessibility announcement
      const announcement = document.createElement('div');
      announcement.setAttribute('role', 'status');
      announcement.setAttribute('aria-live', 'polite');
      announcement.className = 'sr-only';
      announcement.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
      announcement.textContent = isActive 
        ? 'Klassenraummodus aktiviert' 
        : 'Klassenraummodus deaktiviert';
      document.body.appendChild(announcement);
      
      setTimeout(() => announcement.remove(), 1000);
    }
  };
  
  ClassroomMode.init();
}

// Expose functions globally for inline handlers
window.updateCertificate = updateCertificate;
window.printCertificate = printCertificate;
window.downloadCertificate = downloadCertificate;
window.supportPLU = supportPLU;
