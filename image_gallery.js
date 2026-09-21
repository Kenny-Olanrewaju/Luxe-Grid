// image_gallery.js

document.addEventListener('DOMContentLoaded', function () {

  const CATEGORY_ICONS = {
    Landscape: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 18l5-7 4 5 3-4 6 6"/><circle cx="7" cy="7" r="2"/></svg>',
    Portrait: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="12" cy="9" r="4"/><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
    Abstract: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 3c4 1 7 4 7 8s-4 8-8 8-7-3-7-7c0-3 2-5 4-5s3 2 2 4"/></svg>',
    Architecture: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 21V9l8-5 8 5v12"/><path d="M9 21v-6h6v6"/></svg>',
    Street: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M6 3L4 21M18 3l2 18M12 3v3M12 10v3M12 17v3"/></svg>'
  };

  const CATEGORY_NAMES = Object.keys(CATEGORY_ICONS);

  const SPOTLIGHT_QUOTES = [
    "\"The frames that make the cut aren't the sharpest — they're the ones you keep returning to without knowing why.\"",
    "\"Half of this collection exists because I forgot to put the camera away.\"",
    "\"A good frame doesn't explain itself. It just makes you stop scrolling.\"",
    "\"I stopped chasing perfect light and started noticing the ordinary kind.\"",
    "\"Every rejected roll taught me more than the frame that made it in.\""
  ];

  // Real Unsplash photos, ordered to align with the Landscape/Portrait/Abstract/
  // Architecture/Street round-robin below (5 categories cycling across 28 frames).
  const UNSPLASH_PARAMS = "?auto=format&fit=crop&w=900&q=80";
  const sources = [
    "https://images.unsplash.com/photo-1597367624241-071ab9d6b9e5" + UNSPLASH_PARAMS,   // Landscape — silhouette of mountain at sunset
    "https://images.unsplash.com/photo-1506863530036-1efeddceb993" + UNSPLASH_PARAMS,   // Portrait — fine-art grayscale portrait
    "https://images.unsplash.com/photo-1612623753207-96465febeee7" + UNSPLASH_PARAMS,   // Abstract — water waves on black
    "https://images.unsplash.com/photo-1483366774565-c783b9f70e2c" + UNSPLASH_PARAMS,   // Architecture — worm's-eye graphic concrete study
    "https://images.unsplash.com/photo-1515963665762-77ef90e624fa" + UNSPLASH_PARAMS,   // Street — lit roadway, buildings
    "https://images.unsplash.com/photo-1594329852649-012d9528deda" + UNSPLASH_PARAMS,   // Landscape — low sun over autumn lake
    "https://images.unsplash.com/photo-1517462964-21fdcec3f25b" + UNSPLASH_PARAMS,      // Portrait — moody coat portrait
    "https://images.unsplash.com/photo-1548362851-ea052637ad64" + UNSPLASH_PARAMS,      // Abstract — blurred green/blue field
    "https://images.unsplash.com/photo-1738844153732-a485f0e78382" + UNSPLASH_PARAMS,   // Architecture — black and white building with clock
    "https://images.unsplash.com/photo-1544038659-12337883d216" + UNSPLASH_PARAMS,      // Street — crowd crossing road
    "https://images.unsplash.com/photo-1576594318754-ea902eb98133" + UNSPLASH_PARAMS,   // Landscape — pink flower field
    "https://images.unsplash.com/photo-1634510979979-4be6881d31bb" + UNSPLASH_PARAMS,   // Portrait — dark studio portrait, long hair
    "https://images.unsplash.com/photo-1599422314077-f4dfdaa4cd09" + UNSPLASH_PARAMS,   // Abstract — blue and black painting
    "https://images.unsplash.com/photo-1527576539890-dfa815648363" + UNSPLASH_PARAMS,   // Architecture — Axel Towers, Copenhagen, curved facade
    "https://images.unsplash.com/photo-1561441273-e4f0581b7770" + UNSPLASH_PARAMS,      // Street — cyclist on road
    "https://images.unsplash.com/photo-1619441207978-3d326c46e2c9" + UNSPLASH_PARAMS,   // Landscape — trees beside river
    "https://images.unsplash.com/photo-1514960919797-5ff58c52e5ba" + UNSPLASH_PARAMS,   // Portrait — natural-light artistic portrait
    "https://images.unsplash.com/photo-1500886834366-f7311927c60d" + UNSPLASH_PARAMS,   // Abstract — red/blue light on water
    "https://images.unsplash.com/photo-1665779736808-047a6bbf43a0" + UNSPLASH_PARAMS,   // Architecture — abstract close-up study
    "https://images.unsplash.com/photo-1544011527-a7914f17ef74" + UNSPLASH_PARAMS,      // Street — bird's-eye crossing
    "https://images.unsplash.com/photo-1571931264778-8ca45c9bb16d" + UNSPLASH_PARAMS,   // Landscape — brown trees, daytime
    "https://images.unsplash.com/photo-1696456254433-a03ae02443a6" + UNSPLASH_PARAMS,   // Portrait — artistic seated male portrait
    "https://images.unsplash.com/photo-1565660467558-2cc40ad3066b" + UNSPLASH_PARAMS,   // Abstract — close-up water bubbles
    "https://images.unsplash.com/photo-1564566698730-9903b9e4a08c" + UNSPLASH_PARAMS,   // Architecture — minimalist white concrete close-up
    "https://images.unsplash.com/photo-1538983062322-cdd7fc2208a1" + UNSPLASH_PARAMS,   // Street — graffiti amid leaves
    "https://images.unsplash.com/photo-1502085671122-2d218cd434e6" + UNSPLASH_PARAMS,   // Landscape — Skellig Michael, Ireland
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7" + UNSPLASH_PARAMS,   // Portrait — shallow-focus fine portrait, suit jacket
    "https://images.unsplash.com/photo-1556139930-c23fa4a4f934" + UNSPLASH_PARAMS       // Abstract — black and brown painting
  ];

  const images = sources.map((src, i) => ({
    src,
    category: CATEGORY_NAMES[i % CATEGORY_NAMES.length],
    index: i
  }));

  const categoryCounts = {};
  CATEGORY_NAMES.forEach((cat) => {
    categoryCounts[cat] = images.filter((img) => img.category === cat).length;
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hoverCapable = window.matchMedia('(hover: hover)').matches;

  const galleryEl = document.getElementById('gallery');
  const filterBar = document.getElementById('filter-bar');
  const filterIndicator = document.getElementById('filter-indicator');
  const galleryHeading = document.getElementById('gallery-heading');
  const galleryEmpty = document.getElementById('gallery-empty');
  const searchInput = document.getElementById('gallery-search');
  const categoryGrid = document.getElementById('category-grid');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scroll-progress');
  const cursorGlow = document.getElementById('cursor-glow');
  const cursorLabelEl = document.getElementById('cursor-label');
  const heroParallax = document.getElementById('hero-parallax');
  const heroContent = document.getElementById('hero-content');
  const hero = document.querySelector('.hero');
  const backToTop = document.getElementById('back-to-top');

  const favoritesToggle = document.getElementById('favorites-toggle');
  const favoritesPanel = document.getElementById('favorites-panel');
  const favoritesClose = document.getElementById('favorites-close');
  const favoritesList = document.getElementById('favorites-list');
  const favoritesEmpty = document.getElementById('favorites-empty');
  const favoritesCount = document.getElementById('favorites-count');

  const reelTrack = document.getElementById('reel-track');
  const reelPrev = document.getElementById('reel-prev');
  const reelNext = document.getElementById('reel-next');

  const spotlightImg = document.getElementById('spotlight-img');
  const spotlightQuoteEl = document.getElementById('spotlight-quote');
  const spotlightShuffleBtn = document.getElementById('spotlight-shuffle');

  const compareMedia = document.getElementById('compare-media');
  const compareAfter = document.getElementById('compare-after');
  const compareBeforeWrap = document.getElementById('compare-before-wrap');
  const compareBefore = document.getElementById('compare-before');
  const compareHandle = document.getElementById('compare-handle');

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxFavorite = document.getElementById('lightbox-favorite');
  const lightboxShare = document.getElementById('lightbox-share');
  const lightboxDownload = document.getElementById('lightbox-download');

  let currentFilter = 'All';
  let currentSearch = '';
  let currentIndex = 0;
  let visibleIndices = images.map((_, i) => i);

  // ============ CURSOR LABEL (generic helper) ============
  function attachCursorLabel(el, text) {
    if (!el || !cursorLabelEl || !hoverCapable || reduceMotion) return;
    el.addEventListener('mouseenter', () => {
      cursorLabelEl.textContent = text;
      cursorLabelEl.classList.add('active');
    });
    el.addEventListener('mousemove', (e) => {
      cursorLabelEl.style.transform = 'translate3d(' + (e.clientX + 16) + 'px,' + (e.clientY + 16) + 'px,0)';
    });
    el.addEventListener('mouseleave', () => cursorLabelEl.classList.remove('active'));
  }

  // ============ FAVORITES ============
  const FAV_KEY = 'amber-hour-favorites';
  let favorites = [];
  try { favorites = JSON.parse(localStorage.getItem(FAV_KEY)) || []; } catch (e) { favorites = []; }

  function saveFavorites() {
    try { localStorage.setItem(FAV_KEY, JSON.stringify(favorites)); } catch (e) { /* ignore */ }
  }

  function isFavorite(i) { return favorites.indexOf(i) !== -1; }

  function toggleFavorite(i, sourceEl) {
    const idx = favorites.indexOf(i);
    const added = idx === -1;
    if (added) { favorites.push(i); } else { favorites.splice(idx, 1); }
    saveFavorites();
    updateFavoriteUI();
    if (added && sourceEl) burstHeart(sourceEl);
  }

  function updateFavoriteUI() {
    if (favoritesCount) {
      favoritesCount.textContent = String(favorites.length);
      favoritesCount.classList.add('bump');
      setTimeout(() => favoritesCount.classList.remove('bump'), 250);
    }

    document.querySelectorAll('.frame-heart').forEach((btn) => {
      btn.classList.toggle('active', isFavorite(Number(btn.dataset.index)));
    });

    if (lightboxFavorite) lightboxFavorite.classList.toggle('active', isFavorite(currentIndex));

    renderFavoritesList();
  }

  function renderFavoritesList() {
    if (!favoritesList) return;
    favoritesList.innerHTML = '';
    if (favoritesEmpty) favoritesEmpty.style.display = favorites.length ? 'none' : 'block';

    favorites.forEach((i) => {
      const item = images[i];
      const row = document.createElement('div');
      row.className = 'favorite-row';
      row.innerHTML =
        '<img src="' + item.src + '" alt="">' +
        '<div class="favorite-row-info">' +
          '<span class="fr-cat">' + item.category + '</span>' +
          '<span class="fr-index">' + String(item.index + 1).padStart(2, '0') + ' / ' + images.length + '</span>' +
        '</div>' +
        '<button class="favorite-remove" aria-label="Remove from favorites">&times;</button>';

      row.querySelector('img').addEventListener('click', () => openLightbox(i));
      row.querySelector('.favorite-row-info').addEventListener('click', () => openLightbox(i));
      row.querySelector('.favorite-remove').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(i);
      });

      favoritesList.appendChild(row);
    });
  }

  function burstHeart(sourceEl) {
    if (reduceMotion) return;
    const rect = sourceEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    for (let k = 0; k < 8; k++) {
      const p = document.createElement('span');
      p.className = 'heart-burst';
      const angle = (Math.PI * 2 / 8) * k;
      const dist = 20 + Math.random() * 14;
      p.style.setProperty('--bx', Math.cos(angle) * dist + 'px');
      p.style.setProperty('--by', Math.sin(angle) * dist + 'px');
      p.style.left = cx + 'px';
      p.style.top = cy + 'px';
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 650);
    }
  }

  if (favoritesToggle && favoritesPanel) {
    favoritesToggle.addEventListener('click', () => {
      favoritesPanel.classList.add('open');
      favoritesPanel.setAttribute('aria-hidden', 'false');
    });
  }
  if (favoritesClose && favoritesPanel) {
    favoritesClose.addEventListener('click', () => {
      favoritesPanel.classList.remove('open');
      favoritesPanel.setAttribute('aria-hidden', 'true');
    });
  }

  // ============ CATEGORY SHOWCASE ============
  CATEGORY_NAMES.forEach((cat) => {
    const cover = images.find((img) => img.category === cat);
    const card = document.createElement('div');
    card.className = 'category-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'View ' + cat + ' frames');
    card.innerHTML =
      '<img src="' + cover.src + '" alt="' + cat + ' cover" loading="lazy">' +
      '<div class="category-card-body">' +
        '<div class="category-icon">' + CATEGORY_ICONS[cat] + '</div>' +
        '<h3>' + cat + '</h3>' +
        '<span class="category-count">' + categoryCounts[cat] + ' frames</span>' +
      '</div>';

    function activateFromCard() {
      goToFilter(cat);
      document.getElementById('work').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }

    card.addEventListener('click', activateFromCard);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activateFromCard(); }
    });

    categoryGrid.appendChild(card);
  });

  // ============ FILTER BAR ============
  const filterButtons = {};

  ['All', ...CATEGORY_NAMES].forEach((cat) => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (cat === 'All' ? ' active' : '');
    btn.textContent = cat === 'All' ? 'All (' + images.length + ')' : cat + ' (' + categoryCounts[cat] + ')';
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', cat === 'All' ? 'true' : 'false');
    btn.addEventListener('click', () => goToFilter(cat));
    filterBar.appendChild(btn);
    filterButtons[cat] = btn;
  });

  function moveIndicator(btn) {
    if (!btn) return;
    filterIndicator.style.width = btn.offsetWidth + 'px';
    filterIndicator.style.transform = 'translateX(' + btn.offsetLeft + 'px)';
  }

  function goToFilter(cat) {
    const hash = cat === 'All' ? '' : '#' + encodeURIComponent(cat.toLowerCase());
    history.replaceState(null, '', window.location.pathname + window.location.search + hash);
    updateGalleryView(cat);
  }

  function updateGalleryView(cat) {
    currentFilter = cat;

    Object.entries(filterButtons).forEach(([key, b]) => {
      b.classList.toggle('active', key === cat);
      b.setAttribute('aria-selected', key === cat ? 'true' : 'false');
    });
    moveIndicator(filterButtons[cat]);

    const items = Array.from(galleryEl.querySelectorAll('.gallery-item'));
    visibleIndices = [];
    let matchCount = 0;

    items.forEach((item, i) => {
      const itemCat = item.dataset.category;
      const idx = Number(item.dataset.index);
      const searchTarget = (itemCat + ' ' + (idx + 1)).toLowerCase();
      const catMatches = cat === 'All' || itemCat === cat;
      const searchMatches = !currentSearch || searchTarget.includes(currentSearch);
      const matches = catMatches && searchMatches;

      if (matches) {
        matchCount++;
        visibleIndices.push(idx);
        item.classList.remove('filtered-out');
        item.style.transitionDelay = (i % 12) * 0.03 + 's';
        requestAnimationFrame(() => item.classList.add('in-view'));
      } else {
        item.classList.remove('in-view');
        item.style.transitionDelay = '0s';
        setTimeout(() => item.classList.add('filtered-out'), 260);
      }
    });

    galleryHeading.style.opacity = '0';
    setTimeout(() => {
      galleryHeading.textContent = matchCount + (matchCount === 1 ? ' frame' : ' frames') + (cat === 'All' ? '' : ' — ' + cat);
      galleryHeading.style.opacity = '1';
    }, 150);

    if (galleryEmpty) galleryEmpty.classList.toggle('show', matchCount === 0);
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim().toLowerCase();
      updateGalleryView(currentFilter);
    });
  }

  // ============ BUILD GALLERY ============
  images.forEach((item) => {
    const fig = document.createElement('figure');
    fig.className = 'gallery-item';
    fig.dataset.category = item.category;
    fig.dataset.index = item.index;
    fig.tabIndex = 0;
    fig.setAttribute('role', 'button');
    fig.setAttribute('aria-label', item.category + ' frame ' + (item.index + 1) + ' of ' + images.length);

    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.category + ' frame ' + (item.index + 1);
    img.loading = 'lazy';

    const tag = document.createElement('div');
    tag.className = 'frame-tag';
    tag.innerHTML =
      '<span class="frame-category">' + item.category + '</span>' +
      '<span class="frame-index">' + String(item.index + 1).padStart(2, '0') + ' / ' + images.length + '</span>';

    const heart = document.createElement('button');
    heart.className = 'frame-heart';
    heart.dataset.index = item.index;
    heart.setAttribute('aria-label', 'Save to favorites');
    heart.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 20.5s-7.5-4.6-9.7-9C.7 8 2 4.5 5.4 3.7 7.7 3.2 9.9 4.3 12 6.7 14.1 4.3 16.3 3.2 18.6 3.7 22 4.5 23.3 8 21.7 11.5c-2.2 4.4-9.7 9-9.7 9z"/></svg>';
    if (isFavorite(item.index)) heart.classList.add('active');
    heart.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(item.index, heart);
    });

    fig.appendChild(img);
    fig.appendChild(tag);
    fig.appendChild(heart);
    galleryEl.appendChild(fig);

    fig.addEventListener('click', () => openLightbox(item.index));
    fig.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(item.index); }
    });
  });

  // Init filter indicator position after layout
  requestAnimationFrame(() => moveIndicator(filterButtons.All));
  window.addEventListener('resize', () => moveIndicator(filterButtons[currentFilter]));

  // Read hash on load for deep-linking
  const initialHash = decodeURIComponent(window.location.hash.replace('#', '')).toLowerCase();
  const matchedCat = CATEGORY_NAMES.find((c) => c.toLowerCase() === initialHash);
  if (matchedCat) {
    goToFilter(matchedCat);
  }

  updateFavoriteUI();

  // ============ SCROLL REVEAL (generic) ============
  const revealTargets = document.querySelectorAll(
    '.gallery-item, .category-card, .section-heading, .about-lead, .timeline-item, .spotlight, .newsletter-inner, .behind-card, .compare-media'
  );

  if ('IntersectionObserver' in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('in-view'));
  }

  // ============ STAT COUNTERS ============
  const statEls = document.querySelectorAll('.stat-number');
  if (statEls.length && !reduceMotion) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { animateCount(entry.target); statObserver.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    statEls.forEach((el) => statObserver.observe(el));
  } else {
    statEls.forEach((el) => { el.textContent = el.dataset.count; });
  }

  function animateCount(el) {
    const target = Number(el.dataset.count);
    const duration = 900;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ============ SPOTLIGHT ============
  let spotlightCurrent = Math.floor(images.length * 0.6);

  if (spotlightImg) {
    const pick = images[spotlightCurrent];
    spotlightImg.src = pick.src;
    spotlightImg.alt = pick.category + ' frame ' + (pick.index + 1);
    spotlightImg.style.transition = 'opacity 0.3s ease';
  }
  if (spotlightQuoteEl) spotlightQuoteEl.style.transition = 'opacity 0.3s ease';

  function setSpotlight(i) {
    spotlightCurrent = i;
    const pick = images[i];

    if (spotlightImg) {
      spotlightImg.style.opacity = '0';
      setTimeout(() => {
        spotlightImg.src = pick.src;
        spotlightImg.alt = pick.category + ' frame ' + (pick.index + 1);
        spotlightImg.style.opacity = '1';
      }, 300);
    }
    if (spotlightQuoteEl) {
      spotlightQuoteEl.style.opacity = '0';
      setTimeout(() => {
        spotlightQuoteEl.textContent = SPOTLIGHT_QUOTES[i % SPOTLIGHT_QUOTES.length];
        spotlightQuoteEl.style.opacity = '1';
      }, 300);
    }
  }

  if (spotlightShuffleBtn) {
    spotlightShuffleBtn.addEventListener('click', () => {
      let next = spotlightCurrent;
      while (next === spotlightCurrent) next = Math.floor(Math.random() * images.length);
      setSpotlight(next);
    });
  }

  // ============ NOW SHOWING REEL ============
  if (reelTrack) {
    images.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'reel-card';
      card.innerHTML =
        '<img src="' + item.src + '" alt="' + item.category + ' frame ' + (item.index + 1) + '" loading="lazy" draggable="false">' +
        '<span>' + item.category + ' · ' + String(item.index + 1).padStart(2, '0') + '</span>';
      card.addEventListener('click', () => { if (!reelDragged) openLightbox(item.index); });
      reelTrack.appendChild(card);
    });

    let reelDown = false, reelStartX = 0, reelScrollLeft = 0, reelDragged = false;

    reelTrack.addEventListener('pointerdown', (e) => {
      reelDown = true;
      reelDragged = false;
      reelTrack.classList.add('dragging');
      reelStartX = e.clientX;
      reelScrollLeft = reelTrack.scrollLeft;
      reelTrack.setPointerCapture(e.pointerId);
    });
    reelTrack.addEventListener('pointermove', (e) => {
      if (!reelDown) return;
      const dx = e.clientX - reelStartX;
      if (Math.abs(dx) > 5) reelDragged = true;
      reelTrack.scrollLeft = reelScrollLeft - dx;
    });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => {
      reelTrack.addEventListener(ev, () => { reelDown = false; reelTrack.classList.remove('dragging'); });
    });

    if (reelPrev) reelPrev.addEventListener('click', () => reelTrack.scrollBy({ left: -260, behavior: reduceMotion ? 'auto' : 'smooth' }));
    if (reelNext) reelNext.addEventListener('click', () => reelTrack.scrollBy({ left: 260, behavior: reduceMotion ? 'auto' : 'smooth' }));

    attachCursorLabel(reelTrack, 'Drag to explore');
  }

  // ============ BEFORE / AFTER COMPARE ============
  if (compareMedia && compareAfter && compareBefore && compareBeforeWrap && compareHandle) {
    const comparePick = images[3];
    compareAfter.src = comparePick.src;
    compareAfter.alt = comparePick.category + ' frame, after grading';
    compareBefore.src = comparePick.src;
    compareBefore.alt = comparePick.category + ' frame, before grading';

    function sizeCompareBefore() {
      compareBefore.style.width = compareMedia.offsetWidth + 'px';
    }
    sizeCompareBefore();
    window.addEventListener('resize', sizeCompareBefore);

    let compareDragging = false;

    function setComparePct(clientX) {
      const rect = compareMedia.getBoundingClientRect();
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(4, Math.min(96, pct));
      compareBeforeWrap.style.width = pct + '%';
      compareHandle.style.left = pct + '%';
    }

    compareMedia.addEventListener('pointerdown', (e) => {
      compareDragging = true;
      compareMedia.setPointerCapture(e.pointerId);
      setComparePct(e.clientX);
    });
    compareMedia.addEventListener('pointermove', (e) => {
      if (compareDragging) setComparePct(e.clientX);
    });
    ['pointerup', 'pointercancel'].forEach((ev) => {
      compareMedia.addEventListener(ev, () => { compareDragging = false; });
    });

    attachCursorLabel(compareMedia, 'Drag to compare');
  }

  // ============ BACK TO TOP ============
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  // ============ NEWSLETTER ============
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterStatus = document.getElementById('newsletter-status');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletter-email').value;
      newsletterStatus.textContent = 'You\'re on the list' + (email ? ' — see you next volume.' : '.');
      newsletterStatus.classList.add('show');
      newsletterForm.reset();
    });
  }

  // ============ MOBILE NAV ============
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('show');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ============ SCROLL: navbar invert + progress bar ============
  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('inverted', window.scrollY > 50);

    if (scrollProgress) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? window.scrollY / docHeight : 0;
      scrollProgress.style.transform = 'scaleX(' + Math.min(pct, 1) + ')';
    }

    if (backToTop) backToTop.classList.toggle('show', window.scrollY > 600);
  }, { passive: true });

  // ============ CURSOR GLOW ============
  if (cursorGlow && !reduceMotion && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.classList.add('active');
      cursorGlow.style.transform = 'translate3d(' + e.clientX + 'px,' + e.clientY + 'px,0)';
    });
    document.addEventListener('mouseleave', () => cursorGlow.classList.remove('active'));
  }

  // ============ HERO PARALLAX ============
  if (hero && heroParallax && heroContent && !reduceMotion && window.matchMedia('(hover: hover)').matches) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      heroParallax.style.transform = 'translate(' + (px * -30) + 'px,' + (py * -20) + 'px)';
      heroContent.style.transform = 'rotateX(' + (py * -2) + 'deg) rotateY(' + (px * 2) + 'deg)';
    });
    hero.addEventListener('mouseleave', () => {
      heroParallax.style.transform = '';
      heroContent.style.transform = '';
    });
  }

  // ============ LIGHTBOX ============
  function openLightbox(index) {
    currentIndex = index;
    updateLightboxImage();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function stepLightbox(direction) {
    const pool = visibleIndices.length ? visibleIndices : images.map((_, i) => i);
    const pos = pool.indexOf(currentIndex);
    const nextPos = (pos + direction + pool.length) % pool.length;
    currentIndex = pool[nextPos === -1 ? 0 : nextPos];
    updateLightboxImage();
  }

  function updateLightboxImage() {
    const item = images[currentIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.category + ' frame ' + (item.index + 1);
    lightboxCaption.textContent = item.category + ' — ' + String(item.index + 1).padStart(2, '0') + ' / ' + images.length;

    if (lightboxFavorite) lightboxFavorite.classList.toggle('active', isFavorite(currentIndex));

    if (lightboxDownload) {
      lightboxDownload.href = item.src;
      lightboxDownload.setAttribute('download', 'amber-hour-frame-' + String(item.index + 1).padStart(2, '0') + '.jpg');
    }
  }

  if (lightboxFavorite) {
    lightboxFavorite.addEventListener('click', () => toggleFavorite(currentIndex, lightboxFavorite));
  }

  if (lightboxShare) {
    lightboxShare.addEventListener('click', () => {
      const url = window.location.origin + window.location.pathname + '#frame-' + (currentIndex + 1);
      const original = lightboxShare.innerHTML;
      const done = () => {
        lightboxShare.textContent = 'Copied';
        setTimeout(() => { lightboxShare.innerHTML = original; }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done).catch(done);
      } else {
        done();
      }
    });
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', () => stepLightbox(-1));
  lightboxNext.addEventListener('click', () => stepLightbox(1));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') stepLightbox(-1);
    if (e.key === 'ArrowRight') stepLightbox(1);
  });

  // ============ HERO CANVAS: PS5-style floating bokeh glitter ============
  const canvas = document.getElementById('hero-canvas');
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let width, height, dpr, t = 0;

    // warm brass, pale gold, and a rare soft teal — matches the palette, PS5-style variety
    const PALETTE = ['230,192,127', '244,230,200', '143,184,174'];

    function pickColor() {
      const r = Math.random();
      if (r < 0.72) return PALETTE[0];
      if (r < 0.92) return PALETTE[1];
      return PALETTE[2];
    }

    // three depth layers: small sharp far specks, mid glints, large soft near bokeh
    const LAYERS = [
      { weight: 0.5, rMin: 1, rMax: 2.6, aMin: 0.35, aMax: 0.7, vMin: 0.05, vMax: 0.12, swayMin: 3, swayMax: 8 },
      { weight: 0.32, rMin: 3, rMax: 6.5, aMin: 0.2, aMax: 0.42, vMin: 0.08, vMax: 0.16, swayMin: 8, swayMax: 16 },
      { weight: 0.18, rMin: 9, rMax: 22, aMin: 0.08, aMax: 0.2, vMin: 0.02, vMax: 0.06, swayMin: 14, swayMax: 26 }
    ];

    function makeParticle(layer) {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: layer.rMin + Math.random() * (layer.rMax - layer.rMin),
        baseAlpha: layer.aMin + Math.random() * (layer.aMax - layer.aMin),
        vy: -(layer.vMin + Math.random() * (layer.vMax - layer.vMin)),
        swayAmp: layer.swayMin + Math.random() * (layer.swayMax - layer.swayMin),
        swayFreq: 0.15 + Math.random() * 0.25,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.35 + Math.random() * 0.75,
        color: pickColor()
      };
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = hero.offsetWidth;
      height = hero.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const total = Math.max(60, Math.round((width * height) / 13000));
      particles = [];
      LAYERS.forEach((layer) => {
        const count = Math.round(total * layer.weight);
        for (let i = 0; i < count; i++) particles.push(makeParticle(layer));
      });
    }

    function drawParticle(p) {
      const alpha = p.baseAlpha * (0.5 + 0.5 * Math.sin(t * p.twinkleSpeed + p.phase));
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      grad.addColorStop(0, 'rgba(' + p.color + ',' + alpha + ')');
      grad.addColorStop(0.5, 'rgba(' + p.color + ',' + (alpha * 0.4) + ')');
      grad.addColorStop(1, 'rgba(' + p.color + ',0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    function step() {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.vy;
        p.x += Math.sin(t * p.swayFreq + p.phase) * 0.06;

        if (p.y < -30) { p.y = height + 20; p.x = Math.random() * width; }
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;

        drawParticle(p);
      });

      requestAnimationFrame(step);
    }

    resize();
    window.addEventListener('resize', resize);
    requestAnimationFrame(step);
  }

});
