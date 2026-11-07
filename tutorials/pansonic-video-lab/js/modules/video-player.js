import { getStorage, setStorage, getStorageRaw, setStorageRaw, removeStorage } from './storage.js';
import { showUndoToast } from './gamification.js';
import { trapFocus } from './focus-trap.js';
/* ============================================
   VIDEO PLAYER — Playlist, Controls, Library
   ============================================ */

export function initVideoPlayer(options = {}) {
  const lang = options.lang || 'de';

  const defaultStrings = {
    de: {
      noVideo: 'Kein Video ausgewählt',
      addVideos: 'Füge Videos aus der Bibliothek hinzu oder lade eigene hoch',
      emptyPlaylist: 'Deine Playlist ist leer',
      emptyPlaylistHint: 'Füge Videos aus der Bibliothek hinzu oder lade eigene hoch.',
      removeLabel: 'Entfernen',
      totalLabel: 'Gesamt',
      videoSingular: 'Video',
      loadingLibrary: 'Bibliothek wird geladen…',
      libraryError: 'Bibliothek konnte nicht geladen werden.',
      addLabel: 'Hinzufügen',
      pendingLabel: 'Bald verfügbar',
      addedLabel: 'Hinzugefügt',
      ownRecording: 'Eigene Aufnahme',
      repeatOff: 'Wiederholen: Aus',
      repeatAll: 'Wiederholen: Alle',
      repeatOne: 'Wiederholen: Einzeln',
      playlistCleared: 'Playlist geleert',
      undoLabel: 'Rückgängig'
    },
    en: {
      noVideo: 'No video selected',
      addVideos: 'Add videos from the library or upload your own',
      emptyPlaylist: 'Your playlist is empty',
      emptyPlaylistHint: 'Add videos from the library or upload your own.',
      removeLabel: 'Remove',
      totalLabel: 'Total',
      videoSingular: 'video',
      loadingLibrary: 'Loading library…',
      libraryError: 'Could not load library.',
      addLabel: 'Add',
      pendingLabel: 'Coming soon',
      addedLabel: 'Added',
      ownRecording: 'Own recording',
      repeatOff: 'Repeat: Off',
      repeatAll: 'Repeat: All',
      repeatOne: 'Repeat: One',
      playlistCleared: 'Playlist cleared',
      undoLabel: 'Undo'
    }
  };

  const s = { ...(defaultStrings[lang] || defaultStrings.de), ...(options.strings || {}) };
  const libraryUrl = options.libraryUrl || `/tutorials/pansonic-video-lab/assets/data/library-${lang}.json`;

  /* ── State ── */
  let playlist = [];
  let currentIndex = -1;
  let isPlaying = false;
  let isShuffle = false;
  let repeatMode = 0; // 0: off, 1: all, 2: one

  /* ── DOM ── */
  const videoEl = document.getElementById('player-video');
  const playBtn = document.getElementById('btn-play');
  const prevBtn = document.getElementById('btn-prev');
  const nextBtn = document.getElementById('btn-next');
  const shuffleBtn = document.getElementById('btn-shuffle');
  const repeatBtn = document.getElementById('btn-repeat');
  const fullscreenBtn = document.getElementById('btn-fullscreen');
  const progressBar = document.getElementById('video-progress-bar');
  const progressFill = document.getElementById('progress-fill');
  const timeCurrent = document.getElementById('time-current');
  const timeTotal = document.getElementById('time-total');
  const volumeSlider = document.getElementById('video-volume-slider');
  const volumeBtn = document.getElementById('btn-volume');
  const trackTitle = document.getElementById('track-title');
  const trackDesc = document.getElementById('track-desc');
  const playlistItems = document.getElementById('video-playlist-items');
  const playlistCount = document.getElementById('playlist-count');
  const playlistTotal = document.getElementById('video-playlist-total');
  const uploadZone = document.getElementById('video-upload-zone');
  const fileInput = document.getElementById('file-input');
  const libraryModal = document.getElementById('video-library-modal');
  const libraryOpenBtn = document.getElementById('btn-library');
  const libraryCloseBtn = document.getElementById('library-close');
  const libraryItems = document.getElementById('video-library-items');
  const libraryCategories = document.getElementById('video-library-categories');
  const btnClear = document.getElementById('btn-clear');
  const videoLoader = document.getElementById('video-loader');
  const stagePlayBtn = document.getElementById('btn-stage-play');

  /* ── Library Data (loaded from JSON) ── */
  let libraryData = [];
  let libraryReady = false;

  /* ── Helpers ── */
  function formatTime(secs) {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const sec = Math.floor(secs % 60);
    return m + ':' + String(sec).padStart(2, '0');
  }

  function generateId() {
    return 'user-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
  }

  /* ── Playlist ── */
  function loadPlaylist() {
    try {
      const saved = getStorageRaw('pansonic_video_playlist');
      if (saved) playlist = JSON.parse(saved);
    } catch (e) { playlist = []; }
    renderPlaylist();
  }

  function savePlaylist() {
    const persist = playlist.filter(t => !t.src.startsWith('blob:'));
    setStorage('pansonic_video_playlist', persist);
  }

  function addToPlaylist(track) {
    playlist.push(track);
    savePlaylist();
    renderPlaylist();
    if (playlist.length === 1) loadTrack(0);
  }

  function removeFromPlaylist(index) {
    playlist.splice(index, 1);
    if (currentIndex === index) {
      videoEl.pause();
      isPlaying = false;
      updatePlayButton();
      if (playlist.length > 0) loadTrack(Math.min(index, playlist.length - 1));
      else {
        currentIndex = -1;
        videoEl.removeAttribute('src');
        trackTitle.textContent = s.noVideo;
        trackDesc.textContent = s.addVideos;
        progressFill.style.width = '0%';
        timeCurrent.textContent = '0:00';
        timeTotal.textContent = '0:00';
      }
    } else if (currentIndex > index) {
      currentIndex--;
    }
    savePlaylist();
    renderPlaylist();
  }

  function loadTrack(index) {
    if (index < 0 || index >= playlist.length) return;
    currentIndex = index;
    const track = playlist[index];

    // Don't set videoEl.src here — lazy load on play only
    // This prevents preloading all videos in the playlist

    trackTitle.textContent = track.title;
    trackDesc.textContent = track.desc || '';
    renderPlaylist();
  }

  function playTrack(index) {
    loadTrack(index);
    const track = playlist[index];
    if (track && track.src) {
      videoEl.src = track.src;
      videoEl.load();
    }
    if (videoEl.src) {
      videoEl.play().then(() => {
        isPlaying = true;
        updatePlayButton();
      }).catch(() => {});
    }
  }

  // Loading spinner helpers
  function showLoader() {
    if (videoLoader) videoLoader.classList.add('is-visible');
  }
  function hideLoader() {
    if (videoLoader) videoLoader.classList.remove('is-visible');
  }

  function togglePlay() {
    if (currentIndex === -1 && playlist.length > 0) {
      playTrack(0);
      return;
    }
    if (videoEl.paused) {
      videoEl.play();
      isPlaying = true;
    } else {
      videoEl.pause();
      isPlaying = false;
    }
    updatePlayButton();
  }

  function updatePlayButton() {
    const icon = playBtn.querySelector('i');
    if (icon) {
      icon.className = isPlaying ? 'ph ph-pause' : 'ph ph-play';
    }
    const stageIcon = stagePlayBtn && stagePlayBtn.querySelector('i');
    if (stageIcon) {
      stageIcon.className = isPlaying ? 'ph ph-pause video-icon--offset' : 'ph ph-play video-icon--offset';
    }
    const stage = document.querySelector('.video-stage');
    if (stage) stage.classList.toggle('is-paused', !isPlaying);
  }

  function playNext() {
    if (playlist.length === 0) return;
    let next;
    if (isShuffle) {
      next = Math.floor(Math.random() * playlist.length);
    } else {
      next = currentIndex + 1;
      if (next >= playlist.length) next = repeatMode === 1 ? 0 : currentIndex;
    }
    if (next !== currentIndex || repeatMode === 2) playTrack(next);
  }

  function playPrev() {
    if (playlist.length === 0) return;
    let prev = currentIndex - 1;
    if (prev < 0) prev = repeatMode === 1 ? playlist.length - 1 : 0;
    playTrack(prev);
  }

  /* ── Render ── */
  function renderPlaylist() {
    if (!playlistItems) return;

    playlistCount.textContent = playlist.length;

    if (playlist.length === 0) {
      playlistItems.innerHTML = `
        <div class="video-playlist-empty">
          <div class="video-playlist-empty__icon"><i class="ph ph-film-strip" aria-hidden="true"></i></div>
          <p>${s.emptyPlaylist}</p>
          <p class="video-playlist-empty__hint">${s.emptyPlaylistHint}</p>
        </div>
      `;
      playlistTotal.textContent = '';
      return;
    }

    playlistItems.innerHTML = playlist.map((track, i) => `
      <div class="video-playlist-item ${i === currentIndex ? 'is-active' : ''}" data-index="${i}" draggable="true">
        <div class="video-playlist-item__drag" aria-hidden="true">
          <i class="ph ph-dots-six-vertical"></i>
        </div>
        <div class="video-playlist-item__thumb">
          ${track.thumb ? `<img src="${track.thumb}" alt="">` : `<span class="video-playlist-item__icon">${track.icon || '<i class="ph ph-film-strip" aria-hidden="true"></i>'}</span>`}
        </div>
        <div class="video-playlist-item__info">
          <div class="video-playlist-item__title">${track.title}</div>
          <div class="video-playlist-item__meta">${track.desc || ''}</div>
        </div>
        <button class="video-playlist-item__remove" data-index="${i}" aria-label="${s.removeLabel}">×</button>
      </div>
    `).join('');

    initPlaylistDragDrop();

    playlistItems.querySelectorAll('.video-playlist-item').forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target.closest('.video-playlist-item__remove') || e.target.closest('.video-playlist-item__drag')) return;
        playTrack(parseInt(item.dataset.index));
      });
    });

    playlistItems.querySelectorAll('.video-playlist-item__remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeFromPlaylist(parseInt(btn.dataset.index));
      });
    });

    let totalSec = 0;
    playlist.forEach(t => { if (t.duration) totalSec += t.duration; });
    playlistTotal.textContent = `${s.totalLabel}: ${playlist.length} ${s.videoSingular}${playlist.length !== 1 ? 's' : ''}`;
  }

  function initPlaylistDragDrop() {
    if (!playlistItems) return;
    const items = playlistItems.querySelectorAll('.video-playlist-item');
    if (items.length < 2) return;

    let dragSrcIndex = null;

    items.forEach(item => {
      item.addEventListener('dragstart', (e) => {
        dragSrcIndex = parseInt(item.dataset.index, 10);
        item.classList.add('is-dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', dragSrcIndex);
      });

      item.addEventListener('dragend', () => {
        item.classList.remove('is-dragging');
        playlistItems.querySelectorAll('.video-playlist-item').forEach(i => i.classList.remove('is-drag-over'));
        dragSrcIndex = null;
      });

      item.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        const targetIndex = parseInt(item.dataset.index, 10);
        if (targetIndex !== dragSrcIndex) {
          item.classList.add('is-drag-over');
        }
      });

      item.addEventListener('dragleave', () => {
        item.classList.remove('is-drag-over');
      });

      item.addEventListener('drop', (e) => {
        e.preventDefault();
        const targetIndex = parseInt(item.dataset.index, 10);
        item.classList.remove('is-drag-over');
        if (dragSrcIndex === null || dragSrcIndex === targetIndex) return;

        // Reorder playlist array
        const moved = playlist.splice(dragSrcIndex, 1)[0];
        playlist.splice(targetIndex, 0, moved);

        // Adjust currentIndex
        if (currentIndex === dragSrcIndex) {
          currentIndex = targetIndex;
        } else if (dragSrcIndex < currentIndex && targetIndex >= currentIndex) {
          currentIndex--;
        } else if (dragSrcIndex > currentIndex && targetIndex <= currentIndex) {
          currentIndex++;
        }

        savePlaylist();
        renderPlaylist();
      });
    });
  }

  function renderLibrary(category) {
    if (!libraryItems) return;

    if (!libraryReady) {
      libraryItems.innerHTML = '<div class="video-library-loading"><i class="ph ph-spinner ph-spin"></i> ' + s.loadingLibrary + '</div>';
      return;
    }

    const items = category === 'all'
      ? libraryData
      : libraryData.filter(item => item.category === category);

    libraryItems.innerHTML = items.map(item => {
      const visual = item.thumb
        ? `<img src="${item.thumb}" alt="${item.title}" class="video-library-item__thumb" loading="lazy">`
        : `<div class="video-library-item__icon">${item.icon}</div>`;
      const hasVideo = item.src ? '' : ' video-library-item--pending';
      const addLabel = item.src ? s.addLabel : s.pendingLabel;
      const addDisabled = item.src ? '' : ' disabled';
      return `
      <div class="video-library-item${hasVideo}" data-id="${item.id}">
        ${visual}
        <div class="video-library-item__title">${item.title}</div>
        <div class="video-library-item__desc">${item.desc}</div>
        <button class="video-library-item__add" data-id="${item.id}"${addDisabled}>
          <i class="ph ${item.src ? 'ph-plus' : 'ph-clock'}"></i> ${addLabel}
        </button>
      </div>
    `;}).join('');

    libraryItems.querySelectorAll('.video-library-item__add').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const item = libraryData.find(d => d.id === id);
        if (item) {
          addToPlaylist({ ...item });
          btn.innerHTML = '<i class="ph ph-check"></i> ' + s.addedLabel;
          btn.style.background = 'var(--video-accent-coral)';
          btn.style.color = 'white';
          btn.style.borderColor = 'var(--video-accent-coral)';
        }
      });
    });
  }

  /* ── Upload ── */
  function handleFiles(files) {
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('video/')) return;
      const url = URL.createObjectURL(file);
      addToPlaylist({
        id: generateId(),
        title: file.name.replace(/\.[^/.]+$/, ''),
        desc: s.ownRecording + ' • ' + formatTime(0),
        src: url,
        icon: '<i class="ph ph-folder" aria-hidden="true"></i>',
        type: 'user'
      });
    });
  }

  /* ── Event Listeners ── */
  function initEvents() {
    if (playBtn) playBtn.addEventListener('click', togglePlay);
    if (prevBtn) prevBtn.addEventListener('click', playPrev);
    if (nextBtn) nextBtn.addEventListener('click', playNext);

    if (shuffleBtn) {
      shuffleBtn.addEventListener('click', () => {
        isShuffle = !isShuffle;
        shuffleBtn.classList.toggle('is-active', isShuffle);
      });
    }

    if (repeatBtn) {
      repeatBtn.addEventListener('click', () => {
        repeatMode = (repeatMode + 1) % 3;
        const icons = ['ph-repeat', 'ph-repeat-once', 'ph-repeat'];
        const titles = [s.repeatOff, s.repeatAll, s.repeatOne];
        const icon = repeatBtn.querySelector('i');
        if (icon) icon.className = 'ph ' + icons[repeatMode];
        repeatBtn.title = titles[repeatMode];
        repeatBtn.classList.toggle('is-active', repeatMode !== 0);
      });
    }

    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', () => {
        const stage = document.querySelector('.video-stage');
        if (!document.fullscreenElement) {
          stage.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen();
        }
      });

      // Toggle fullscreen icon
      document.addEventListener('fullscreenchange', () => {
        const icon = fullscreenBtn.querySelector('i');
        if (icon) {
          icon.className = document.fullscreenElement ? 'ph ph-corners-in' : 'ph ph-corners-out';
        }
        fullscreenBtn.title = document.fullscreenElement ? (lang === 'en' ? 'Exit Fullscreen (F)' : 'Vollbild beenden (F)') : (lang === 'en' ? 'Fullscreen (F)' : 'Vollbild (F)');
      });
    }

    // Fullscreen idle overlay hide — hide overlay after mouse inactivity in fullscreen
    const stage = document.querySelector('.video-stage');
    let idleTimer = null;
    const IDLE_DELAY = 2500;

    function showOverlay() {
      if (stage) stage.classList.remove('is-fullscreen-idle');
    }

    function hideOverlay() {
      if (stage && !videoEl.paused) stage.classList.add('is-fullscreen-idle');
    }

    function resetIdleTimer() {
      if (!document.fullscreenElement) {
        showOverlay();
        return;
      }
      showOverlay();
      clearTimeout(idleTimer);
      idleTimer = setTimeout(hideOverlay, IDLE_DELAY);
    }

    if (stage) {
      stage.addEventListener('mousemove', resetIdleTimer);
      stage.addEventListener('click', resetIdleTimer);
      document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement) {
          clearTimeout(idleTimer);
          showOverlay();
        } else {
          resetIdleTimer();
        }
      });
    }

    if (stagePlayBtn) {
      stagePlayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlay();
      });
    }

    if (videoEl) {
      videoEl.addEventListener('timeupdate', () => {
        if (!videoEl.duration) return;
        const pct = (videoEl.currentTime / videoEl.duration) * 100;
        progressFill.style.width = pct + '%';
        timeCurrent.textContent = formatTime(videoEl.currentTime);
        timeTotal.textContent = formatTime(videoEl.duration);
      });

      videoEl.addEventListener('ended', () => {
        if (repeatMode === 2) {
          videoEl.currentTime = 0;
          videoEl.play();
        } else {
          playNext();
        }
      });

      videoEl.addEventListener('loadedmetadata', () => {
        timeTotal.textContent = formatTime(videoEl.duration);
      });

      videoEl.addEventListener('click', togglePlay);

      // Loading spinner events
      videoEl.addEventListener('waiting', showLoader);
      videoEl.addEventListener('playing', hideLoader);
      videoEl.addEventListener('canplay', hideLoader);
      videoEl.addEventListener('error', hideLoader);
    }

    // Progress bar — click + drag scrubbing
    if (progressBar) {
      let isDragging = false;

      function seekToClientX(clientX) {
        if (!videoEl.duration) return;
        const rect = progressBar.getBoundingClientRect();
        const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        videoEl.currentTime = pct * videoEl.duration;
        progressFill.style.width = (pct * 100) + '%';
      }

      progressBar.addEventListener('mousedown', (e) => {
        isDragging = true;
        seekToClientX(e.clientX);
      });

      document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        seekToClientX(e.clientX);
      });

      document.addEventListener('mouseup', () => {
        isDragging = false;
      });

      // Touch support
      progressBar.addEventListener('touchstart', (e) => {
        isDragging = true;
        seekToClientX(e.touches[0].clientX);
      }, { passive: true });

      document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        seekToClientX(e.touches[0].clientX);
      }, { passive: true });

      document.addEventListener('touchend', () => {
        isDragging = false;
      });
    }

    if (volumeSlider) {
      volumeSlider.addEventListener('input', () => {
        videoEl.volume = volumeSlider.value;
        const icon = volumeBtn.querySelector('i');
        if (icon) {
          if (videoEl.volume === 0) icon.className = 'ph ph-speaker-x';
          else if (videoEl.volume < 0.5) icon.className = 'ph ph-speaker-low';
          else icon.className = 'ph ph-speaker-high';
        }
      });
    }

    if (volumeBtn) {
      volumeBtn.addEventListener('click', () => {
        videoEl.muted = !videoEl.muted;
      });

      // Update volume icon & title on mute/volume change
      videoEl.addEventListener('volumechange', () => {
        const icon = volumeBtn.querySelector('i');
        if (icon) {
          if (videoEl.muted || videoEl.volume === 0) icon.className = 'ph ph-speaker-x';
          else if (videoEl.volume < 0.5) icon.className = 'ph ph-speaker-low';
          else icon.className = 'ph ph-speaker-high';
        }
        volumeBtn.title = videoEl.muted
          ? (lang === 'en' ? 'Unmute (M)' : 'Ton an (M)')
          : (lang === 'en' ? 'Mute (M)' : 'Stumm (M)');
      });
    }

    // Upload
    if (uploadZone && fileInput) {
      uploadZone.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

      ['dragover', 'dragenter'].forEach(evt => {
        uploadZone.addEventListener(evt, (e) => {
          e.preventDefault();
          uploadZone.classList.add('is-dragover');
        });
      });

      ['dragleave', 'drop'].forEach(evt => {
        uploadZone.addEventListener(evt, (e) => {
          e.preventDefault();
          uploadZone.classList.remove('is-dragover');
        });
      });

      uploadZone.addEventListener('drop', (e) => {
        handleFiles(e.dataTransfer.files);
      });
    }

    // Library Modal
    let deactivateLibraryFocusTrap = null;

    function openLibrary(triggerEl) {
      if (!libraryModal) return;
      libraryModal.classList.add('is-open');
      libraryModal.setAttribute('aria-hidden', 'false');
      renderLibrary('all');
      deactivateLibraryFocusTrap = trapFocus(libraryModal, { returnTo: triggerEl || libraryOpenBtn });
    }

    function closeLibrary() {
      if (!libraryModal) return;
      if (deactivateLibraryFocusTrap) {
        deactivateLibraryFocusTrap();
        deactivateLibraryFocusTrap = null;
      }
      libraryModal.classList.remove('is-open');
      libraryModal.setAttribute('aria-hidden', 'true');
    }

    if (libraryOpenBtn && libraryModal) {
      libraryOpenBtn.addEventListener('click', () => {
        openLibrary(libraryOpenBtn);
      });
    }

    if (libraryCloseBtn && libraryModal) {
      libraryCloseBtn.addEventListener('click', () => {
        closeLibrary();
      });
    }

    if (libraryModal) {
      libraryModal.addEventListener('click', (e) => {
        if (e.target === libraryModal) closeLibrary();
      });
    }

    // Library Categories
    if (libraryCategories) {
      libraryCategories.addEventListener('click', (e) => {
        const btn = e.target.closest('.video-library-category-btn');
        if (!btn) return;
        libraryCategories.querySelectorAll('.video-library-category-btn').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        renderLibrary(btn.dataset.category);
      });
    }

    // Clear playlist with undo
    if (btnClear) {
      btnClear.addEventListener('click', () => {
        const savedPlaylist = playlist.slice();
        const savedIndex = currentIndex;
        const wasPlaying = isPlaying;

        playlist = [];
        currentIndex = -1;
        videoEl.pause();
        videoEl.removeAttribute('src');
        isPlaying = false;
        updatePlayButton();
        savePlaylist();
        renderPlaylist();
        trackTitle.textContent = s.noVideo;
        trackDesc.textContent = s.addVideos;
        progressFill.style.width = '0%';
        timeCurrent.textContent = '0:00';
        timeTotal.textContent = '0:00';

        showUndoToast(s.playlistCleared, s.undoLabel, () => {
          playlist = savedPlaylist;
          currentIndex = savedIndex;
          savePlaylist();
          renderPlaylist();
          if (currentIndex >= 0) {
            loadTrack(currentIndex);
            if (wasPlaying) {
              videoEl.play().catch(() => {});
              isPlaying = true;
              updatePlayButton();
            }
          }
        });
      });
    }

    // Keyboard
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT') return;
      const key = e.key.toLowerCase();
      switch (key) {
        case ' ': e.preventDefault(); togglePlay(); break;
        case 'arrowright': if (videoEl) videoEl.currentTime += 5; break;
        case 'arrowleft': if (videoEl) videoEl.currentTime -= 5; break;
        case 'n': playNext(); break;
        case 'p': playPrev(); break;
        case 'f': fullscreenBtn && fullscreenBtn.click(); break;
        case 'm': volumeBtn && volumeBtn.click(); break;
        case 'l':
          if (libraryModal) {
            if (libraryModal.classList.contains('is-open')) {
              closeLibrary();
            } else {
              openLibrary();
            }
          }
          break;
        case 'escape':
          if (libraryModal && libraryModal.classList.contains('is-open')) {
            closeLibrary();
          }
          break;
      }
    });
  }

  /* ── Init ── */
  function init() {
    if (!videoEl) return;
    loadPlaylist();
    initEvents();

    // Set default volume
    videoEl.volume = 0.8;
    if (volumeSlider) volumeSlider.value = 0.8;

    // Update play button initially
    updatePlayButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ── Load library data ── */
  fetch(libraryUrl)
    .then(r => { if (!r.ok) throw new Error('Library load failed'); return r.json(); })
    .then(data => {
      libraryData = data;
      libraryReady = true;
      if (libraryModal && libraryModal.classList.contains('is-open')) {
        const activeBtn = libraryCategories && libraryCategories.querySelector('.video-library-category-btn.is-active');
        renderLibrary(activeBtn ? activeBtn.dataset.category : 'all');
      }
    })
    .catch(err => {
      console.error('Video Library:', err);
      libraryData = [];
      libraryReady = true;
      if (libraryModal && libraryModal.classList.contains('is-open')) {
        if (libraryItems) libraryItems.innerHTML = '<div class="video-library-loading video-library-loading--error"><i class="ph ph-warning"></i> ' + s.libraryError + '</div>';
      }
    });
}
