/**
 * Gallery & Lightbox Module
 * Simple image viewer with lightbox, prev/next, keyboard nav
 */

const GALLERY_DATA = {
  de: {
    title: 'Galerie',
    subtitle: 'Inspirierende Bilder aus allen Bereichen der Fotografie',
    filters: ['Alle', 'Landschaft', 'Portrait', 'Makro', 'Street', 'Architektur'],
    items: [
      { id: 1, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/landscape-01.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/landscape-01.jpg', category: 'Landschaft', title: 'Goldene Stunde mit Baum', desc: 'Einzelner Baum auf Hügeln im Abendlicht' },
      { id: 2, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/portrait-01.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/portrait-01.jpg', category: 'Portrait', title: 'Naturlicht-Portrait', desc: 'Fensterlicht-Studie mit weichem Schatten' },
      { id: 3, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/macro-01.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/macro-01.jpg', category: 'Makro', title: 'Tautropfen', desc: 'Makro-Aufnahme mit 1:1 Abbildungsmaßstab' },
      { id: 4, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/street-01.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/street-01.jpg', category: 'Street', title: 'Großstadt-Pulse', desc: 'Street Photography in der Blauen Stunde' },
      { id: 5, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/architecture-01.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/architecture-01.jpg', category: 'Architektur', title: 'Moderne Linien', desc: 'Symmetrie und Führungslinien' },
      { id: 6, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/landscape-02.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/landscape-02.jpg', category: 'Landschaft', title: 'Berggipfel im Nebel', desc: 'Atmosphärische Perspektive' },
      { id: 7, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/portrait-02.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/portrait-02.jpg', category: 'Portrait', title: 'Rembrandt-Licht', desc: 'Klassisches Seitenlicht-Porträt' },
      { id: 8, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/macro-02.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/macro-02.jpg', category: 'Makro', title: 'Insekten-Detail', desc: 'Flügelstruktur unter dem Mikroskop' },
      { id: 9, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/street-02.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/street-02.jpg', category: 'Street', title: 'Markttag', desc: 'Farben und Bewegung' },
      { id: 10, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/landscape-03.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/landscape-03.jpg', category: 'Landschaft', title: 'Isländischer Schwarzstrand', desc: 'Dramatische Basaltsäulen und stürmischer Himmel' },
      { id: 11, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/landscape-04.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/landscape-04.jpg', category: 'Landschaft', title: 'Olivenhain in der Toskana', desc: 'Erstes Licht über nebligen Reihen' },
      { id: 12, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/portrait-03.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/portrait-03.jpg', category: 'Portrait', title: 'Der Handwerker', desc: 'Umweltportrait in der Werkstatt' },
      { id: 13, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/portrait-04.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/portrait-04.jpg', category: 'Portrait', title: 'Tänzerin im Sprung', desc: 'Dynamische Bewegung im Industrie-Setting' },
      { id: 14, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/macro-03.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/macro-03.jpg', category: 'Makro', title: 'Eiskristalle auf Spinnwebe', desc: 'Prismatische Lichtbrechung im Winter' },
      { id: 15, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/macro-04.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/macro-04.jpg', category: 'Makro', title: 'Das menschliche Auge', desc: 'Extreme Detailaufnahme der Iris' },
      { id: 16, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/street-03.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/street-03.jpg', category: 'Street', title: 'Tokio bei Nacht', desc: 'Radfahrer im Regen mit Neonreflexionen' },
      { id: 17, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/street-04.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/street-04.jpg', category: 'Street', title: 'Gassen von Lissabon', desc: 'Altes Paar zwischen Azulejo-Fliesen' },
      { id: 18, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/architecture-02.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/architecture-02.jpg', category: 'Architektur', title: 'Steinbrücke bei Nacht', desc: 'Spiegelung in stillem Wasser' },
      { id: 19, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/architecture-03.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/architecture-03.jpg', category: 'Architektur', title: 'Leuchtturm-Wendeltreppe', desc: 'Geometrische Spirale von oben' },
    ]
  },
  en: {
    title: 'Gallery',
    subtitle: 'Inspiring images from all areas of photography',
    filters: ['All', 'Landscape', 'Portrait', 'Macro', 'Street', 'Architecture'],
    items: [
      { id: 1, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/landscape-01.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/landscape-01.jpg', category: 'Landscape', title: 'Golden Hour with Tree', desc: 'Lone tree on rolling hills at dusk' },
      { id: 2, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/portrait-01.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/portrait-01.jpg', category: 'Portrait', title: 'Natural Light Portrait', desc: 'Window light study with soft shadow' },
      { id: 3, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/macro-01.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/macro-01.jpg', category: 'Macro', title: 'Dew Drops', desc: 'Macro shot with 1:1 reproduction ratio' },
      { id: 4, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/street-01.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/street-01.jpg', category: 'Street', title: 'Urban Pulse', desc: 'Street photography in the blue hour' },
      { id: 5, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/architecture-01.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/architecture-01.jpg', category: 'Architecture', title: 'Modern Lines', desc: 'Symmetry and leading lines' },
      { id: 6, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/landscape-02.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/landscape-02.jpg', category: 'Landscape', title: 'Mountain Peaks in Fog', desc: 'Atmospheric perspective' },
      { id: 7, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/portrait-02.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/portrait-02.jpg', category: 'Portrait', title: 'Rembrandt Light', desc: 'Classic side-light portrait' },
      { id: 8, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/macro-02.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/macro-02.jpg', category: 'Macro', title: 'Insect Detail', desc: 'Wing structure under magnification' },
      { id: 9, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/street-02.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/street-02.jpg', category: 'Street', title: 'Market Day', desc: 'Colors and motion' },
      { id: 10, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/landscape-03.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/landscape-03.jpg', category: 'Landscape', title: 'Icelandic Black Beach', desc: 'Dramatic basalt columns and stormy sky' },
      { id: 11, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/landscape-04.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/landscape-04.jpg', category: 'Landscape', title: 'Tuscan Olive Grove', desc: 'First light over misty rows' },
      { id: 12, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/portrait-03.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/portrait-03.jpg', category: 'Portrait', title: 'The Craftsman', desc: 'Environmental portrait in workshop' },
      { id: 13, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/portrait-04.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/portrait-04.jpg', category: 'Portrait', title: 'Dancer in Mid-Air', desc: 'Dynamic movement in industrial setting' },
      { id: 14, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/macro-03.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/macro-03.jpg', category: 'Macro', title: 'Ice Crystals on Spider Web', desc: 'Prismatic light refraction in winter' },
      { id: 15, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/macro-04.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/macro-04.jpg', category: 'Macro', title: 'The Human Eye', desc: 'Extreme detail shot of the iris' },
      { id: 16, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/street-03.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/street-03.jpg', category: 'Street', title: 'Tokyo at Night', desc: 'Cyclist in rain with neon reflections' },
      { id: 17, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/street-04.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/street-04.jpg', category: 'Street', title: 'Lisbon Alleyways', desc: 'Elderly couple among azulejo tiles' },
      { id: 18, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/architecture-02.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/architecture-02.jpg', category: 'Architecture', title: 'Stone Bridge at Night', desc: 'Reflection in still water' },
      { id: 19, webp: '/tutorials/pansonic-photo-lab/assets/images/gallery/architecture-03.webp', jpg: '/tutorials/pansonic-photo-lab/assets/images/gallery/architecture-03.jpg', category: 'Architecture', title: 'Lighthouse Spiral Staircase', desc: 'Geometric spiral from above' },
    ]
  }
};

export function initGallery() {
  const container = document.getElementById('galleryContainer');
  if (!container) return;

  const isEn = document.documentElement.lang === 'en';
  const lang = isEn ? 'en' : 'de';
  const data = GALLERY_DATA[lang];

  let activeFilter = data.filters[0];
  let currentIndex = 0;
  let filteredItems = [...data.items];
  let uploadedImageUrl = null;
  let isUploadedImage = false;

  // Inline Viewer elements
  const viewerImage = document.getElementById('viewerImage');
  const viewerTitle = document.getElementById('viewerTitle');
  const viewerDesc = document.getElementById('viewerDesc');
  const viewerFrame = document.getElementById('viewerFrame');

  function updateViewer(index) {
    currentIndex = index;
    isUploadedImage = false;
    const item = filteredItems[currentIndex];
    if (!item) return;
    if (viewerImage) {
      viewerImage.src = item.jpg;
      viewerImage.alt = item.title;
    }
    if (viewerTitle) viewerTitle.textContent = item.title;
    if (viewerDesc) viewerDesc.textContent = item.desc;
    // Reset overlays
    resetViewerOverlays();
  }

  function resetViewerOverlays() {
    viewerOverlayToggles?.forEach(toggle => {
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-pressed', 'false');
    });
    viewerFrame?.querySelectorAll('.photo-gallery__viewer-overlay').forEach(overlay => {
      overlay.classList.remove('is-visible');
      overlay.setAttribute('aria-hidden', 'true');
    });
    removeGoldenSpiral(viewerFrame);
  }

  // Render filters
  const filtersEl = document.getElementById('galleryFilters');
  if (filtersEl) {
    filtersEl.innerHTML = data.filters.map(f => `
      <button class="photo-gallery__filter ${f === activeFilter ? 'is-active' : ''}" data-filter="${f}">${f}</button>
    `).join('');

    filtersEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('photo-gallery__filter')) {
        activeFilter = e.target.dataset.filter;
        filteredItems = activeFilter === data.filters[0]
          ? [...data.items]
          : data.items.filter(item => item.category === activeFilter);

        filtersEl.querySelectorAll('.photo-gallery__filter').forEach(btn => {
          btn.classList.toggle('is-active', btn.dataset.filter === activeFilter);
        });
        renderGrid();
        // Update viewer to first item of new filter
        updateViewer(0);
      }
    });
  }

  // Render grid
  function renderGrid() {
    container.innerHTML = filteredItems.map((item, index) => `
      <div class="photo-gallery__item" data-index="${index}" role="button" tabindex="0" aria-label="${item.title}">
        <picture>
          <source srcset="${item.webp}" type="image/webp">
          <img src="${item.jpg}" alt="${item.title}" loading="lazy" onerror="this.parentElement.style.display='none'">
        </picture>
        <div class="photo-gallery__item-overlay">
          <div class="photo-gallery__item-title">${item.title}</div>
          <div class="photo-gallery__item-meta">${item.category}</div>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.photo-gallery__item').forEach(item => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.dataset.index);
        updateViewer(idx);
        openLightbox(idx);
      });
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const idx = parseInt(item.dataset.index);
          updateViewer(idx);
          openLightbox(idx);
        }
      });
    });
  }

  // Lightbox
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxCounter = document.getElementById('lightboxCounter');

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    if (isUploadedImage && uploadedImageUrl) {
      lightboxImg.src = uploadedImageUrl;
      lightboxImg.alt = isEn ? 'Your Image' : 'Dein Bild';
      lightboxTitle.textContent = isEn ? 'Your Image' : 'Dein Bild';
      lightboxDesc.textContent = '';
      lightboxCounter.textContent = '-';
      return;
    }
    const item = filteredItems[currentIndex];
    if (!item) return;

    lightboxImg.src = item.jpg;
    lightboxImg.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxDesc.textContent = item.desc;
    lightboxCounter.textContent = `${currentIndex + 1} / ${filteredItems.length}`;
  }

  function resetOverlays() {
    overlayToggles?.forEach(toggle => {
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-pressed', 'false');
    });
    overlayFrame?.querySelectorAll('.photo-lightbox__overlay').forEach(overlay => {
      overlay.classList.remove('is-visible');
      overlay.setAttribute('aria-hidden', 'true');
    });
    removeGoldenSpiral(overlayFrame);
  }

  // ── Dynamic Golden Spiral ────────────────────────────────
  const SPIRAL_CLASS = 'photo-spiral-svg';

  function generateGoldenSpiralSVG(container) {
    if (!container) return;
    removeGoldenSpiral(container);

    const rect = container.getBoundingClientRect();
    const W = Math.round(rect.width);
    const H = Math.round(rect.height);
    if (W < 10 || H < 10) return;

    const phi = 1.618033988749895;
    const b = Math.log(phi) / (Math.PI / 2);
    const cx = 0.618 * W;
    const cy = 0.618 * H;

    // Start from top edge at golden ratio
    const thetaStart = 3 * Math.PI / 2;
    const rStart = cy;
    const A = rStart / Math.exp(b * thetaStart);

    // Generate points: from outside winding inward
    const points = [];
    const steps = 250;
    const thetaEnd = thetaStart - 6 * Math.PI; // 3 full turns inward

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const theta = thetaStart + t * (thetaEnd - thetaStart);
      const r = A * Math.exp(b * theta);
      const x = cx + r * Math.cos(theta);
      const y = cy + r * Math.sin(theta);
      points.push([x, y]);
    }

    // Build SVG path
    let d = `M ${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
    for (let i = 1; i < points.length; i++) {
      d += ` L ${points[i][0].toFixed(1)} ${points[i][1].toFixed(1)}`;
    }

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', SPIRAL_CLASS);
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.pointerEvents = 'none';
    svg.style.overflow = 'visible';
    svg.style.zIndex = '2';

    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', d);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', 'white');
    path.setAttribute('stroke-width', '1.2');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('opacity', '0.7');

    svg.appendChild(path);
    container.appendChild(svg);
  }

  function removeGoldenSpiral(container) {
    container?.querySelectorAll('.' + SPIRAL_CLASS).forEach(el => el.remove());
  }

  // Resize observer to regenerate spiral when container size changes
  let spiralResizeObserver = null;
  function initSpiralResizeObserver(targetContainer) {
    if (spiralResizeObserver) {
      spiralResizeObserver.disconnect();
    }
    if (!targetContainer || !window.ResizeObserver) return;
    spiralResizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const container = entry.target;
        if (container.querySelector('.' + SPIRAL_CLASS)) {
          generateGoldenSpiralSVG(container);
        }
      }
    });
    spiralResizeObserver.observe(targetContainer);
  }

  function nextImage() {
    resetOverlays();
    currentIndex = (currentIndex + 1) % filteredItems.length;
    updateLightbox();
  }

  function prevImage() {
    resetOverlays();
    currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    updateLightbox();
  }

  // Lightbox controls
  document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
  document.getElementById('lightboxPrev')?.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });
  document.getElementById('lightboxNext')?.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });

  // Fullscreen
  document.getElementById('lightboxFullscreen')?.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      lightbox.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-active')) return;
    switch (e.key) {
      case 'Escape': closeLightbox(); break;
      case 'ArrowRight': nextImage(); break;
      case 'ArrowLeft': prevImage(); break;
    }
  });

  // Click backdrop to close
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // ── Composition Overlays (Lightbox) ────────────────────────
  const overlayToggles = lightbox?.querySelectorAll('[data-lightbox-overlay]');
  const overlayFrame = document.getElementById('lightboxImageFrame');

  if (overlayToggles && overlayFrame) {
    overlayToggles.forEach(toggle => {
      toggle.setAttribute('aria-pressed', 'false');
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const key = toggle.dataset.lightboxOverlay;
        const overlay = overlayFrame.querySelector(`.photo-lightbox__overlay--${key}`);
        const isActive = toggle.classList.contains('is-active');

        if (isActive) {
          toggle.classList.remove('is-active');
          toggle.setAttribute('aria-pressed', 'false');
          overlay?.classList.remove('is-visible');
          overlay?.setAttribute('aria-hidden', 'true');
          if (key === 'golden') removeGoldenSpiral(overlayFrame);
        } else {
          toggle.classList.add('is-active');
          toggle.setAttribute('aria-pressed', 'true');
          overlay?.classList.add('is-visible');
          overlay?.setAttribute('aria-hidden', 'false');
          if (key === 'golden') {
            generateGoldenSpiralSVG(overlayFrame);
            initSpiralResizeObserver(overlayFrame);
          }
        }
      });
    });
  }

  // ── Composition Overlays (Inline Viewer) ───────────────────
  const viewerOverlayToggles = document.querySelectorAll('[data-viewer-overlay]');

  if (viewerOverlayToggles && viewerFrame) {
    viewerOverlayToggles.forEach(toggle => {
      toggle.setAttribute('aria-pressed', 'false');
      toggle.addEventListener('click', () => {
        const key = toggle.dataset.viewerOverlay;
        const overlay = viewerFrame.querySelector(`.photo-gallery__viewer-overlay--${key}`);
        const isActive = toggle.classList.contains('is-active');

        if (isActive) {
          toggle.classList.remove('is-active');
          toggle.setAttribute('aria-pressed', 'false');
          overlay?.classList.remove('is-visible');
          overlay?.setAttribute('aria-hidden', 'true');
          if (key === 'golden') removeGoldenSpiral(viewerFrame);
        } else {
          toggle.classList.add('is-active');
          toggle.setAttribute('aria-pressed', 'true');
          overlay?.classList.add('is-visible');
          overlay?.setAttribute('aria-hidden', 'false');
          if (key === 'golden') {
            generateGoldenSpiralSVG(viewerFrame);
            initSpiralResizeObserver(viewerFrame);
          }
        }
      });
    });
  }

  // Viewer fullscreen opens lightbox
  document.getElementById('viewerFullscreen')?.addEventListener('click', () => {
    openLightbox(currentIndex);
  });

  // Upload own image
  const uploadBtn = document.getElementById('viewerUpload');
  const fileInput = document.getElementById('viewerFileInput');

  if (uploadBtn && fileInput) {
    uploadBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Validate: max 10MB, must be image
      if (!file.type.startsWith('image/')) {
        alert(isEn ? 'Please select an image file.' : 'Bitte wähle eine Bilddatei aus.');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert(isEn ? 'Image must be smaller than 10 MB.' : 'Das Bild darf maximal 10 MB groß sein.');
        return;
      }

      const objectUrl = URL.createObjectURL(file);
      if (viewerImage) {
        viewerImage.src = objectUrl;
        viewerImage.alt = file.name;
      }
      if (viewerTitle) viewerTitle.textContent = isEn ? 'Your Image' : 'Dein Bild';
      if (viewerDesc) viewerDesc.textContent = file.name;
      resetViewerOverlays();

      // Store for lightbox compatibility
      uploadedImageUrl = objectUrl;
      isUploadedImage = true;
    });
  }

  renderGrid();
  // Initialize viewer with first image
  updateViewer(0);
}
