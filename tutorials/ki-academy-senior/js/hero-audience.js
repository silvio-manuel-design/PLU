/**
 * HERO AUDIENCE SWITCHER
 * Dynamisch wechselnde Benefits basierend auf Zielgruppe
 */

const AUDIENCE_CONTENT = {
  parents: {
    benefits: {
      de: [
        'Erklären Sie komplexe Themen Ihren Kindern verständlich',
        'Organisieren Sie Familienalltag mit KI-Unterstützung',
        'Begleiten Sie Ihre Kinder sicher in der digitalen Welt'
      ],
      en: [
        'Explain complex topics to your children in an understandable way',
        'Organize family life with AI support',
        'Safely guide your children through the digital world'
      ]
    }
  },
  professionals: {
    benefits: {
      de: [
        'Schreiben Sie professionelle E-Mails in 30 Sekunden',
        'Erstellen Sie Berichte und Präsentationen effizienter',
        'Automatisieren Sie wiederkehrende Aufgaben im Büro'
      ],
      en: [
        'Write professional emails in 30 seconds',
        'Create reports and presentations more efficiently',
        'Automate recurring tasks in the office'
      ]
    }
  },
  seniors: {
    benefits: {
      de: [
        'Verstehen Sie KI ohne technisches Vorwissen',
        'Nutzen Sie KI für Gesundheit und Alltagshilfen',
        'Bleiben Sie selbstständig mit digitaler Unterstützung'
      ],
      en: [
        'Understand AI without technical knowledge',
        'Use AI for health and daily life assistance',
        'Stay independent with digital support'
      ]
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const pills = document.querySelectorAll('.audience-pill');
  const benefitsContainer = document.getElementById('hero-benefits');
  
  if (!pills.length || !benefitsContainer) return;
  
  // Detect language
  const lang = document.documentElement.lang || 'de';
  
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const audience = pill.dataset.audience;
      const content = AUDIENCE_CONTENT[audience];
      
      if (!content) return;
      
      // Update active state
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      
      // Animate benefits out
      benefitsContainer.style.opacity = '0';
      benefitsContainer.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        // Update content with correct language
        const benefits = content.benefits[lang] || content.benefits.de;
        benefitsContainer.innerHTML = benefits.map(benefit => `
          <div class="benefit-item">
            <span class="benefit-check">✓</span>
            <span>${benefit}</span>
          </div>
        `).join('');
        
        // Animate benefits in
        benefitsContainer.style.opacity = '1';
        benefitsContainer.style.transform = 'translateY(0)';
      }, 200);
    });
  });
});

// Add smooth transitions
const style = document.createElement('style');
style.textContent = `
  #hero-benefits {
    transition: opacity 0.2s ease, transform 0.2s ease;
  }
`;
document.head.appendChild(style);
