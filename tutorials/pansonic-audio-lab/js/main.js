/**
 * Sonic Lab v3 - Main JavaScript
 * THE NEW PLU STANDARD
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================
  // THEME TOGGLE (Dark/Light)
  // ==========================================
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  
  // Check saved preference or system preference
  const savedTheme = localStorage.getItem('sonicLabTheme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  } else if (!systemPrefersDark) {
    html.setAttribute('data-theme', 'dark');
  }
  
  themeToggle.addEventListener('click', function() {
    const currentTheme = html.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('sonicLabTheme', newTheme);
    updateThemeIcon(newTheme);
  });
  
  function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('data-tooltip', theme === 'dark' ? 'Hellmodus' : 'Dunkelmodus');
  }
  
  // ==========================================
  // CLASSROOM MODE
  // ==========================================
  const classroomToggle = document.getElementById('classroomToggle');
  
  const savedClassroom = localStorage.getItem('sonicLabClassroom');
  if (savedClassroom === 'true') {
    html.setAttribute('data-classroom', 'true');
    classroomToggle.classList.add('active');
  }
  
  classroomToggle.addEventListener('click', function() {
    const isClassroom = html.getAttribute('data-classroom') === 'true';
    
    if (isClassroom) {
      html.removeAttribute('data-classroom');
      localStorage.setItem('sonicLabClassroom', 'false');
      classroomToggle.classList.remove('active');
    } else {
      html.setAttribute('data-classroom', 'true');
      localStorage.setItem('sonicLabClassroom', 'true');
      classroomToggle.classList.add('active');
    }
  });
  
  // ==========================================
  // BACK TO TOP
  // ==========================================
  const backToTop = document.getElementById('backToTop');
  
  backToTop.style.opacity = '0';
  backToTop.style.visibility = 'hidden';
  backToTop.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 500) {
      backToTop.style.opacity = '1';
      backToTop.style.visibility = 'visible';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.visibility = 'hidden';
    }
  });
  
  backToTop.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    return false;
  });
  
  // ==========================================
  // LANGUAGE SWITCH (via FAB)
  // ==========================================
  const langToggle = document.getElementById('langToggle');
  
  langToggle.addEventListener('click', function() {
    const currentLang = document.documentElement.lang;
    const newLang = currentLang === 'de' ? 'en' : 'de';
    
    // Simple redirect logic - assumes EN version has -en suffix
    if (newLang === 'en') {
      window.location.href = 'index-en.html';
    } else {
      window.location.href = 'index.html';
    }
  });
  
  // Update FAB based on current page
  const currentPage = window.location.pathname;
  if (currentPage.includes('-en')) {
    langToggle.textContent = 'DE';
    langToggle.setAttribute('data-tooltip', 'Deutsch');
    document.documentElement.lang = 'en';
  }
  
  // ==========================================
  // AUDIO WIDGET - TABS (GENERATOR + PLAYER)
  // ==========================================
  const audioWidget = document.getElementById('audioWidget');
  const audioWidgetToggle = document.getElementById('audioWidgetToggle');
  
  // Initialize widget state
  if (audioWidget && !audioWidget.classList.contains('collapsed')) {
    audioWidget.classList.add('expanded');
  }
  
  // Tabs
  const audioTabs = document.querySelectorAll('.audio-tab');
  const tabContents = document.querySelectorAll('.audio-tab-content');
  
  audioTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetTab = this.dataset.tab;
      
      audioTabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      this.classList.add('active');
      document.getElementById(targetTab + 'Tab').classList.add('active');
    });
  });
  
  // --- GENERATOR TAB ---
  const freqSlider = document.getElementById('freqSlider');
  const freqValue = document.getElementById('freqValue');
  const waveformCanvas = document.getElementById('waveformCanvas');
  const playBtn = document.getElementById('playBtn');
  const waveButtons = document.querySelectorAll('.gen-btn[data-wave]');
  
  let audioContext = null;
  let oscillator = null;
  let gainNode = null;
  let isPlaying = false;
  let currentWaveform = 'sine';
  let currentFrequency = 440;
  let animationId = null;
  
  // Canvas setup
  const ctx = waveformCanvas.getContext('2d');
  let canvasWidth, canvasHeight;
  
  function resizeCanvas() {
    const rect = waveformCanvas.parentElement.getBoundingClientRect();
    canvasWidth = rect.width;
    canvasHeight = rect.height;
    waveformCanvas.width = canvasWidth * window.devicePixelRatio;
    waveformCanvas.height = canvasHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Draw waveform
  function drawWaveform() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    const centerY = canvasHeight / 2;
    const amplitude = canvasHeight * 0.35;
    
    ctx.beginPath();
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-teal').trim() || '#00d4aa';
    ctx.lineWidth = 2;
    
    for (let x = 0; x < canvasWidth; x++) {
      const t = x / canvasWidth;
      let y = centerY;
      
      if (currentWaveform === 'sine') {
        y += Math.sin(t * Math.PI * 4) * amplitude;
      } else if (currentWaveform === 'square') {
        y += (Math.sin(t * Math.PI * 4) > 0 ? 1 : -1) * amplitude;
      } else if (currentWaveform === 'sawtooth') {
        y += ((t * 4) % 2 - 1) * amplitude;
      }
      
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
    
    // Draw center line
    ctx.beginPath();
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border-subtle').trim();
    ctx.lineWidth = 1;
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvasWidth, centerY);
    ctx.stroke();
    
    animationId = requestAnimationFrame(drawWaveform);
  }
  
  drawWaveform();
  
  // Audio Context for Generator
  function initAudio() {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }
  
  function playTone() {
    initAudio();
    
    if (oscillator) {
      oscillator.stop();
      oscillator.disconnect();
    }
    
    oscillator = audioContext.createOscillator();
    gainNode = audioContext.createGain();
    
    oscillator.type = currentWaveform;
    oscillator.frequency.value = currentFrequency;
    
    gainNode.gain.value = 0.1;
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    isPlaying = true;
    playBtn.textContent = '⏸ Pause Tone';
    playBtn.classList.add('playing');
  }
  
  function stopTone() {
    if (oscillator) {
      oscillator.stop();
      oscillator.disconnect();
      oscillator = null;
    }
    isPlaying = false;
    playBtn.textContent = '▶ Play Tone';
    playBtn.classList.remove('playing');
  }
  
  playBtn.addEventListener('click', function() {
    if (isPlaying) {
      stopTone();
    } else {
      playTone();
    }
  });
  
  freqSlider.addEventListener('input', function() {
    currentFrequency = parseInt(this.value);
    freqValue.textContent = currentFrequency + ' Hz';
    
    if (oscillator) {
      oscillator.frequency.value = currentFrequency;
    }
  });
  
  waveButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      waveButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentWaveform = this.dataset.wave;
      
      if (isPlaying && oscillator) {
        oscillator.type = currentWaveform;
      }
    });
  });
  
  // --- PLAYER TAB ---
  const playerUpload = document.getElementById('playerUpload');
  const audioFileInput = document.getElementById('audioFileInput');
  const playerTrackInfo = document.getElementById('playerTrackInfo');
  const trackName = document.getElementById('trackName');
  const currentTimeEl = document.getElementById('currentTime');
  const totalTimeEl = document.getElementById('totalTime');
  const progressContainer = document.getElementById('progressContainer');
  const progressBar = document.getElementById('progressBar');
  const playerControls = document.getElementById('playerControls');
  const playerPlayBtn = document.getElementById('playerPlayBtn');
  const volumeControl = document.getElementById('volumeControl');
  const volumeSlider = document.getElementById('volumeSlider');
  
  let playerAudio = null;
  let isPlayerPlaying = false;
  let playerAnimationId = null;
  
  // File Upload
  playerUpload.addEventListener('click', () => audioFileInput.click());
  
  audioFileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      loadAudioFile(file);
    }
  });
  
  // Drag & Drop
  playerUpload.addEventListener('dragover', (e) => {
    e.preventDefault();
    playerUpload.style.borderColor = 'var(--accent-teal)';
  });
  
  playerUpload.addEventListener('dragleave', () => {
    playerUpload.style.borderColor = '';
  });
  
  playerUpload.addEventListener('drop', (e) => {
    e.preventDefault();
    playerUpload.style.borderColor = '';
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('audio/')) {
      loadAudioFile(file);
    }
  });
  
  function loadAudioFile(file) {
    if (playerAudio) {
      playerAudio.pause();
      playerAudio = null;
    }
    
    const url = URL.createObjectURL(file);
    playerAudio = new Audio(url);
    playerAudio.volume = 0.8;
    
    trackName.textContent = file.name;
    
    playerAudio.addEventListener('loadedmetadata', () => {
      totalTimeEl.textContent = formatTime(playerAudio.duration);
      currentTimeEl.textContent = '0:00';
      
      playerUpload.style.display = 'none';
      playerTrackInfo.style.display = 'block';
      progressContainer.style.display = 'block';
      playerControls.style.display = 'flex';
      volumeControl.style.display = 'flex';
    });
    
    playerAudio.addEventListener('ended', () => {
      isPlayerPlaying = false;
      playerPlayBtn.textContent = '▶';
    });
    
    playerAudio.addEventListener('error', () => {
      alert('Fehler beim Laden der Audio-Datei');
    });
  }
  
  function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
  
  function updateProgress() {
    if (playerAudio && isPlayerPlaying) {
      const progress = (playerAudio.currentTime / playerAudio.duration) * 100;
      progressBar.style.width = progress + '%';
      currentTimeEl.textContent = formatTime(playerAudio.currentTime);
      playerAnimationId = requestAnimationFrame(updateProgress);
    }
  }
  
  playerPlayBtn.addEventListener('click', function() {
    if (!playerAudio) return;
    
    if (isPlayerPlaying) {
      playerAudio.pause();
      isPlayerPlaying = false;
      this.textContent = '▶';
      cancelAnimationFrame(playerAnimationId);
    } else {
      playerAudio.play();
      isPlayerPlaying = true;
      this.textContent = '⏸';
      updateProgress();
    }
  });
  
  progressContainer.addEventListener('click', function(e) {
    if (!playerAudio) return;
    const rect = this.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    playerAudio.currentTime = percentage * playerAudio.duration;
  });
  
  volumeSlider.addEventListener('input', function() {
    if (playerAudio) {
      playerAudio.volume = this.value / 100;
    }
  });
  
  document.getElementById('prevBtn').addEventListener('click', () => {
    if (playerAudio) {
      playerAudio.currentTime = 0;
    }
  });
  
  document.getElementById('nextBtn').addEventListener('click', () => {
    if (playerAudio) {
      playerAudio.currentTime = Math.min(playerAudio.currentTime + 10, playerAudio.duration);
    }
  });
  
  // --- AUDIO EFFECTS (Filter + Delay) ---
  const audioEffects = document.getElementById('audioEffects');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const filterFreqSlider = document.getElementById('filterFreqSlider');
  const filterFreqValue = document.getElementById('filterFreqValue');
  const filterDesc = document.getElementById('filterDesc');
  const filterHint = document.getElementById('filterHint');
  const delaySlider = document.getElementById('delaySlider');
  const delayValue = document.getElementById('delayValue');
  
  let audioContextPlayer = null;
  let sourceNode = null;
  let filterNode = null;
  let delayNode = null;
  let gainNodeDelay = null;
  let currentFilterType = 'none';
  let isEffectsInitialized = false;
  
  // Detect language
  const isGerman = !window.location.pathname.includes('-en');
  
  // Filter descriptions
  const filterDescriptions = isGerman ? {
    'none': { desc: 'Kein Filter aktiv', hint: 'Original-Sound ohne Filterung' },
    'lowpass': { desc: 'Nur Bässe durchlassen', hint: 'Tiefe Frequenzen passieren, Höhen werden gedämpft' },
    'highpass': { desc: 'Nur Höhen durchlassen', hint: 'Hohe Frequenzen passieren, Bässe werden gedämpft' },
    'bandpass': { desc: 'Mittlere Frequenzen durchlassen', hint: 'Nur ein Frequenzbereich um die Filterfrequenz' }
  } : {
    'none': { desc: 'No filter active', hint: 'Original sound without filtering' },
    'lowpass': { desc: 'Let bass through', hint: 'Low frequencies pass, highs are dampened' },
    'highpass': { desc: 'Let highs through', hint: 'High frequencies pass, bass is dampened' },
    'bandpass': { desc: 'Mid frequencies only', hint: 'Only a frequency range around the filter frequency' }
  };
  
  function initAudioEffects() {
    if (isEffectsInitialized) return;
    if (!playerAudio) return;
    
    try {
      // Create audio context
      audioContextPlayer = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create source from audio element
      sourceNode = audioContextPlayer.createMediaElementSource(playerAudio);
      
      // Create filter node
      filterNode = audioContextPlayer.createBiquadFilter();
      filterNode.type = 'lowpass';
      filterNode.frequency.value = 1000;
      filterNode.Q.value = 1;
      
      // Create delay node
      delayNode = audioContextPlayer.createDelay(2.0);
      delayNode.delayTime.value = 0;
      
      // Create gain node for delay (wet/dry mix)
      gainNodeDelay = audioContextPlayer.createGain();
      gainNodeDelay.gain.value = 0.3;
      
      // Connect nodes: source -> filter -> destination (dry)
      //                         -> delay -> gain -> destination (wet)
      sourceNode.connect(filterNode);
      filterNode.connect(audioContextPlayer.destination);
      
      sourceNode.connect(delayNode);
      delayNode.connect(gainNodeDelay);
      gainNodeDelay.connect(audioContextPlayer.destination);
      
      // Initially bypass filter
      filterNode.type = 'allpass';
      
      isEffectsInitialized = true;
      audioEffects.style.display = 'block';
      
    } catch (e) {
      console.warn('Web Audio API Effects nicht verfügbar:', e);
    }
  }
  
  // Initialize effects when audio is loaded
  const origLoadAudioFile = loadAudioFile;
  loadAudioFile = function(file) {
    // Reset effects state
    isEffectsInitialized = false;
    audioContextPlayer = null;
    sourceNode = null;
    filterNode = null;
    delayNode = null;
    gainNodeDelay = null;
    
    // Call original function
    origLoadAudioFile(file);
    
    // Initialize effects after audio is loaded
    playerAudio.addEventListener('play', function onPlay() {
      initAudioEffects();
      playerAudio.removeEventListener('play', onPlay);
    }, { once: true });
  };
  
  // Filter type buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const filterType = this.dataset.filter;
      currentFilterType = filterType;
      
      // Update description
      const info = filterDescriptions[filterType];
      filterDesc.textContent = info.desc;
      filterHint.textContent = info.hint;
      
      // Apply filter
      if (filterNode) {
        if (filterType === 'none') {
          filterNode.type = 'allpass';
        } else {
          filterNode.type = filterType;
        }
      }
    });
  });
  
  // Filter frequency slider
  filterFreqSlider.addEventListener('input', function() {
    const freq = parseInt(this.value);
    filterFreqValue.textContent = freq + ' Hz';
    
    if (filterNode && currentFilterType !== 'none') {
      filterNode.frequency.value = freq;
    }
  });
  
  // Delay slider
  delaySlider.addEventListener('input', function() {
    const delayMs = parseInt(this.value);
    const delaySec = delayMs / 1000;
    delayValue.textContent = delaySec.toFixed(1) + ' s';
    
    if (delayNode) {
      delayNode.delayTime.value = delaySec;
    }
  });
  
  // Widget minimize
  audioWidgetToggle.addEventListener('click', function() {
    audioWidget.classList.toggle('collapsed');
    audioWidget.classList.toggle('expanded');
    this.textContent = audioWidget.classList.contains('collapsed') ? '+' : '−';
  });
  
  // Stop audio when leaving page
  window.addEventListener('beforeunload', () => {
    stopTone();
    if (playerAudio) playerAudio.pause();
  });
  
  // ==========================================
  // MOBILE NAVIGATION
  // ==========================================
  const mobileToggle = document.querySelector('.mobile-toggle');
  const headerNav = document.querySelector('.header-nav');
  
  if (mobileToggle && headerNav) {
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
            <a href="index.html">Start</a>
            <a href="tools/audacity.html">Audacity</a>
            <a href="tools/suno.html">Suno AI</a>
            <a href="tools/elevenlabs.html">Stimmen-KI</a>
            <a href="tools/daw.html">DAW Guide</a>
            <a href="bibliothek.html">Bibliothek</a>
            <a href="../index.html">PLU Hub</a>
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
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // ==========================================
  const moduleCards = document.querySelectorAll('.module-card');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 50);
        }
      });
    }, { threshold: 0.1 });
    
    moduleCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
      observer.observe(card);
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
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    }
    
    // T for Theme toggle
    if (e.key === 't' && !e.ctrlKey && !e.metaKey && e.target.tagName !== 'INPUT') {
      themeToggle.click();
    }
    
    // C for Classroom mode
    if (e.key === 'c' && !e.ctrlKey && !e.metaKey && e.target.tagName !== 'INPUT') {
      classroomToggle.click();
    }
  });
  
  console.log('🎵 Sonic Lab v3 loaded - THE NEW PLU STANDARD');
});
