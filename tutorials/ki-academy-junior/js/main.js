/**
 * KI Co-Pilot Academy - Main JavaScript
 * Professional Implementation - Pansonic Audio Lab Style
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // THEME TOGGLE (Dark/Light)
  // ==========================================
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  
  // Check saved preference or system preference
  const savedTheme = localStorage.getItem('kiAcademyTheme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  } else if (!systemPrefersDark) {
    // Default to dark for this academy
    html.setAttribute('data-theme', 'dark');
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = html.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('kiAcademyTheme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
  
  function updateThemeIcon(theme) {
    if (themeToggle) {
      themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
      themeToggle.setAttribute('data-tooltip', theme === 'dark' ? 'Hellmodus' : 'Dunkelmodus');
    }
  }
  
  // ==========================================
  // CLASSROOM MODE
  // ==========================================
  const classroomToggle = document.getElementById('classroomToggle');
  
  const savedClassroom = localStorage.getItem('kiAcademyClassroom');
  if (savedClassroom === 'true') {
    html.setAttribute('data-classroom', 'true');
    if (classroomToggle) classroomToggle.classList.add('active');
  }
  
  if (classroomToggle) {
    classroomToggle.addEventListener('click', function() {
      const isClassroom = html.getAttribute('data-classroom') === 'true';
      
      if (isClassroom) {
        html.removeAttribute('data-classroom');
        localStorage.setItem('kiAcademyClassroom', 'false');
        classroomToggle.classList.remove('active');
      } else {
        html.setAttribute('data-classroom', 'true');
        localStorage.setItem('kiAcademyClassroom', 'true');
        classroomToggle.classList.add('active');
      }
    });
  }
  
  // ==========================================
  // BACK TO TOP
  // ==========================================
  const backToTop = document.getElementById('backToTop');
  
  if (backToTop) {
    backToTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });
  }
  
  // ==========================================
  // SCROLL PROGRESS BAR
  // ==========================================
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  
  if (scrollProgressBar) {
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgressBar.style.width = scrollPercent + '%';
    }, { passive: true });
  }
  
  // ==========================================
  // MOBILE MENU
  // ==========================================
  const mobileToggle = document.querySelector('.mobile-toggle');
  const headerNav = document.querySelector('.header-nav');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      
      // Create mobile menu if doesn't exist
      let mobileMenu = document.querySelector('.mobile-menu');
      
      if (!mobileMenu) {
        mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.innerHTML = `
          <nav class="mobile-nav">
            <a href="index.html">🏠 Start</a>
            <a href="missions/mission-01.html">🎯 Mission 1</a>
            <a href="missions/mission-02.html">🎯 Mission 2</a>
            <a href="missions/mission-03.html">🎯 Mission 3</a>
            <a href="missions/mission-04.html">🎯 Mission 4</a>
            <a href="#rules">📋 Die 5 Regeln</a>
            <a href="../index.html">⬅️ PLU Hub</a>
            <a href="../pages/spenden.html" style="color: var(--accent-pink);">❤️ Support</a>
          </nav>
        `;
        document.body.appendChild(mobileMenu);
        
        // Add mobile menu styles
        const style = document.createElement('style');
        style.textContent = `
          .mobile-menu {
            position: fixed;
            top: 64px;
            left: 0;
            right: 0;
            bottom: 0;
            background: var(--bg-primary);
            z-index: 999;
            padding: 24px;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }
          .mobile-menu.active {
            transform: translateX(0);
          }
          .mobile-nav {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .mobile-nav a {
            padding: 16px;
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 1.1rem;
            font-weight: 600;
            border-radius: 8px;
            transition: all 0.2s ease;
          }
          .mobile-nav a:hover {
            background: var(--bg-tertiary);
            color: var(--text-primary);
          }
        `;
        document.head.appendChild(style);
      }
      
      mobileMenu.classList.toggle('active');
    });
  }
  
  // ==========================================
  // PROGRESS MANAGER
  // ==========================================
  const ProgressManager = {
    storageKey: 'ki-academy-progress',
    totalMissions: 8,
    
    load() {
      try {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn('Could not load progress:', e);
      }
      return {
        completedMissions: [],
        currentMission: 1,
        xp: 0,
        achievements: []
      };
    },
    
    save(progress) {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(progress));
      } catch (e) {
        console.warn('Could not save progress:', e);
      }
    },
    
    completeMission(missionNum) {
      const progress = this.load();
      if (!progress.completedMissions.includes(missionNum)) {
        progress.completedMissions.push(missionNum);
        // Finale Mission gibt 500 XP, alle anderen 100 XP
        progress.xp += (missionNum === 8) ? 500 : 100;
        
        if (missionNum < this.totalMissions) {
          progress.currentMission = Math.max(progress.currentMission, missionNum + 1);
        }
        
        this.save(progress);
        this.updateUI();
        this.checkAchievements();
        
        // Spezielle Toast-Nachricht für finale Mission
        if (missionNum === 8) {
          showToast('🏆 GRATULATION! Du bist jetzt ein KI-Meister! +500 XP');
        }
      }
    },
    
    getPercentage() {
      const progress = this.load();
      return Math.round((progress.completedMissions.length / this.totalMissions) * 100);
    },
    
    getLevel(xp) {
      // Level up every 200 XP
      return Math.floor(xp / 200) + 1;
    },
    
    getXpToNextLevel(xp) {
      const currentLevel = this.getLevel(xp);
      const xpForNext = currentLevel * 200;
      return xpForNext - xp;
    },
    
    reset() {
      // Alle Keys löschen
      localStorage.removeItem(this.storageKey);
      for (let i = 1; i <= this.totalMissions; i++) {
        localStorage.removeItem(`mission-${i}-progress`);
      }
      
      // WICHTIG: Default-Werte laden statt alter Daten
      this.progress = {
        completedMissions: [],
        currentMission: 1,
        xp: 0,
        achievements: []
      };
      
      // UI sofort zurücksetzen
      this.updateUI();
      
      // Seite neu laden um sicherzustellen, dass alle Zustände zurückgesetzt sind
      window.location.reload();
    },
    
    updateUI() {
      const progress = this.load();
      const percentage = this.getPercentage();
      
      // Update progress bar
      const progressFill = document.getElementById('progress-fill');
      const progressPercent = document.getElementById('progress-percent');
      
      if (progressFill) progressFill.style.width = percentage + '%';
      if (progressPercent) progressPercent.textContent = percentage + '%';
      
      // Update dashboard
      const userLevel = document.getElementById('user-level');
      const userXp = document.getElementById('user-xp');
      const userAchievements = document.getElementById('user-achievements');
      const xpToNext = document.getElementById('xp-to-next');
      
      if (userLevel) userLevel.textContent = this.getLevel(progress.xp);
      if (userXp) userXp.textContent = progress.xp;
      if (userAchievements) userAchievements.textContent = `${progress.achievements.length}/${this.totalMissions}`;
      if (xpToNext) xpToNext.textContent = `${this.getXpToNextLevel(progress.xp)} XP`;
      
      // Update mission nodes
      document.querySelectorAll('.mission-node').forEach(node => {
        const missionNum = parseInt(node.dataset.mission);
        
        if (progress.completedMissions.includes(missionNum)) {
          node.classList.remove('locked');
          node.classList.add('completed');
          const status = node.querySelector('.node-status');
          if (status) {
            status.textContent = '✅ Abgeschlossen';
            status.style.color = 'var(--accent-cyan)';
          }
        } else if (missionNum <= progress.currentMission) {
          node.classList.remove('locked');
          const status = node.querySelector('.node-status');
          if (status) {
            status.textContent = '🎯 Bereit';
            status.style.color = 'var(--accent-cyan)';
          }
        }
      });
    },
    
    checkAchievements() {
      const progress = this.load();
      const achievements = [
        { mission: 1, id: 'first-steps', nameDE: 'First Steps', nameEN: 'First Steps' },
        { mission: 2, id: 'smooth-talker', nameDE: 'Smooth Talker', nameEN: 'Smooth Talker' },
        { mission: 3, id: 'context-king', nameDE: 'Context King', nameEN: 'Context King' },
        { mission: 4, id: 'structure-pro', nameDE: 'Structure Pro', nameEN: 'Structure Pro' },
        { mission: 5, id: 'persona-master', nameDE: 'Persona Master', nameEN: 'Persona Master' },
        { mission: 6, id: 'chain-master', nameDE: 'Chain Master', nameEN: 'Chain Master' },
        { mission: 7, id: 'few-shot-expert', nameDE: 'Few-Shot Expert', nameEN: 'Few-Shot Expert' },
        { mission: 8, id: 'ki-master', nameDE: 'KI Master', nameEN: 'AI Master' }
      ];
      
      achievements.forEach(ach => {
        if (progress.completedMissions.includes(ach.mission) && !progress.achievements.includes(ach.id)) {
          progress.achievements.push(ach.id);
          this.save(progress);
          const lang = document.documentElement.lang;
          const name = lang === 'de' ? ach.nameDE : ach.nameEN;
          showToast(`🏆 Achievement unlocked: ${name}!`);
        }
      });
    }
  };
  
  // Toast notification
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--bg-card);
      color: var(--text-primary);
      padding: 16px 24px;
      border-radius: var(--radius-lg);
      border: 1px solid var(--accent-cyan);
      box-shadow: var(--shadow-lg);
      z-index: 10000;
      font-weight: 600;
      animation: slideUp 0.3s ease;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideDown 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
  
  // Initialize progress on page load
  ProgressManager.updateUI();
  
  // Expose to global for mission pages
  window.KIAcademy = { 
    ProgressManager,
    
    // Reset Funktionen
    resetProgress: function() {
      if (confirm('Möchtest du wirklich ALLE Fortschritte zurücksetzen?\n\nDas löscht:\n- Alle abgeschlossenen Missionen\n- Alle XP\n- Alle Achievements\n- Alle Lernziele\n\nDies kann nicht rückgängig gemacht werden!')) {
        ProgressManager.reset();
        showToast('🗑️ Alle Fortschritte wurden zurückgesetzt');
        setTimeout(() => window.location.reload(), 1500);
      }
    },
    
    resetMission: function(missionNum) {
      if (confirm(`Mission ${missionNum} zurücksetzen?`)) {
        localStorage.removeItem(`mission-${missionNum}-progress`);
        showToast(`🗑️ Mission ${missionNum} zurückgesetzt`);
        setTimeout(() => window.location.reload(), 1000);
      }
    },
    
    // Hilfsfunktion für Entwickler
    showProgress: function() {
      const progress = ProgressManager.load();
      console.table({
        'Level': ProgressManager.getLevel(progress.xp),
        'XP': progress.xp,
        'Abgeschlossene Missionen': progress.completedMissions.join(', ') || 'Keine',
        'Achievements': progress.achievements.join(', ') || 'Keine',
        'Aktuelle Mission': progress.currentMission
      });
      return progress;
    }
  };
  
  // ==========================================
  // MISSION COMPLETION (only handles completion section visibility)
  // Button state is managed by mission.js
  // ==========================================
  const missionCompleteSection = document.querySelector('.mission-complete');
  
  if (missionCompleteSection) {
    // Get mission number from the section or from URL
    const pathMatch = window.location.pathname.match(/mission-(\d+)/);
    const missionNum = pathMatch ? parseInt(pathMatch[1]) : null;
    
    if (missionNum) {
      // Check if mission is already completed
      const progress = ProgressManager.load();
      const isCompleted = progress.completedMissions.includes(missionNum);
      
      if (isCompleted) {
        // Show completion section
        missionCompleteSection.style.display = 'block';
        
        // Enable next mission button
        const nextBtn = document.querySelector('.next-mission-btn');
        if (nextBtn) {
          nextBtn.classList.remove('disabled');
          nextBtn.removeAttribute('disabled');
        }
      } else {
        // Mission not completed yet - hide the completion section
        missionCompleteSection.style.display = 'none';
      }
    }
  }
  
  // ==========================================
  // SMOOTH SCROLL
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // ==========================================
  // ANIMATION ON SCROLL
  // ==========================================
  const animatedElements = document.querySelectorAll('.feature-card, .use-case-card, .rule-item');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 50);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
      observer.observe(el);
    });
  }
  
  // ==========================================
  // KEYBOARD SHORTCUTS
  // ==========================================
  document.addEventListener('keydown', function(e) {
    // ESC to close mobile menu
    if (e.key === 'Escape') {
      const mobileMenu = document.querySelector('.mobile-menu');
      if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        if (mobileToggle) {
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      }
    }
    
    // T for Theme toggle
    if (e.key === 't' && !e.ctrlKey && !e.metaKey && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      if (themeToggle) themeToggle.click();
    }
    
    // C for Classroom mode
    if (e.key === 'c' && !e.ctrlKey && !e.metaKey && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      if (classroomToggle) classroomToggle.click();
    }
  });
  
  console.log('🤖 KI Co-Pilot Academy loaded - Ready for takeoff!');
});
