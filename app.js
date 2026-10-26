/**
 * EL CASO DEL COLLAR BOMBA: MEMORIA, VERDAD Y DIGNIDAD
 * Motor de Interactividad, Cartografía, Visualización Forense y Memoria
 * Versión 2.0 Premium — Arquitectura Vanilla ES6+
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialización de subsistemas
  initPaperScrollDynamics();
  initPremiumParticles();
  initReadingProgressBar();
  initHeaderScrollSpy();
  initScrollReveal();
  initMobileDrawer();
  initFontSizeToggle();
  initSynchronizedTimelineAndMap();
  initForensicSchematic();
  initMemorialSanctuary();
  initComparisonSlider();
  initHemerotecaSearch();
  initJudicialTabs();
  initAccordion();
  initAcademicBibliography();
  initMediaModal();
  initRippleEffect();
  initToastSystem();
});

/* ========================================================================
   1. SISTEMA GLOBAL DE NOTIFICACIONES TOAST (Accesible)
   ======================================================================== */
let showToast = (message, duration = 3500) => {
  const toast = document.getElementById('global-toast');
  const msgEl = document.getElementById('toast-message-text');
  if (!toast || !msgEl) return;
  msgEl.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('visible');
  }, duration);
};

function initToastSystem() {
  window.showToast = showToast;
}

/* ========================================================================
   2. DINÁMICA DE PAPEL KRAFT EDITORIAL Y EVOLUCIÓN ORGÁNICA DE ARRUGAS
   Emula un auténtico pliego histórico de periódico cuyas arrugas, pliegues
   y sombras de relieve evolucionan dinámicamente con el desplazamiento.
   ======================================================================== */
function initPaperScrollDynamics() {
  // Garantizar modo único: Pliego Editorial de Prensa Histórica
  document.body.classList.remove('theme-dark');
  document.body.classList.add('theme-light');
  document.documentElement.classList.remove('theme-dark');
  document.documentElement.classList.add('theme-light');
  try {
    localStorage.removeItem('cb_theme');
  } catch (e) {}

  // Si existe algún botón residual de cambio de tema, retirarlo
  const oldThemeBtn = document.getElementById('btn-theme-toggle');
  if (oldThemeBtn) {
    oldThemeBtn.remove();
  }

  // Desplazamiento dinámico de iluminación y sombras de arrugas
  let ticking = false;
  const root = document.documentElement;

  const updatePaperDynamics = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const scrollPercent = Math.min(1, Math.max(0, scrollY / docHeight));

    // Modulación sutil de posición de pliegues para sensación de textura viva y física
    root.style.setProperty('--scroll-paper-shift', `${(scrollY * 0.08).toFixed(1)}px`);
    root.style.setProperty('--scroll-crease-angle', `${(120 + scrollPercent * 35).toFixed(1)}deg`);
    root.style.setProperty('--scroll-crease-opacity', `${(0.32 + Math.sin(scrollPercent * Math.PI * 4) * 0.08).toFixed(2)}`);

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updatePaperDynamics);
      ticking = true;
    }
  }, { passive: true });

  updatePaperDynamics();
}

/* ========================================================================
   3. SISTEMA DE PARTÍCULAS AMBIENTALES (Optimizado con Pause en Viewport)
   ======================================================================== */
let triggerEmberBurst = null;

function initPremiumParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  let isVisible = true;
  let isDocumentVisible = !document.hidden;

  const handleResize = () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', handleResize, { passive: true });

  // Pausar si el usuario cambia de pestaña para no malgastar batería
  document.addEventListener('visibilitychange', () => {
    isDocumentVisible = !document.hidden;
    if (isDocumentVisible && isVisible) {
      requestAnimationFrame(animate);
    }
  });

  // Pausar si no hay movimiento o si el usuario prefiere movimiento reducido
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const particles = [];
  const MAX_AMBIENT = 12; // Cantidad moderada y no invasiva

  class Ember {
    constructor(options = {}) {
      this.burst = options.burst || false;
      this.x = options.x !== undefined ? options.x : Math.random() * W;
      this.y = options.y !== undefined ? options.y : H + 10 + Math.random() * 40;
      this.size = this.burst ? Math.random() * 2.5 + 1.2 : Math.random() * 1.5 + 0.8;
      this.speedY = this.burst ? -(Math.random() * 3.5 + 1.5) : -(Math.random() * 0.45 + 0.2);
      this.speedX = this.burst ? (Math.random() - 0.5) * 2.8 : (Math.random() - 0.5) * 0.12;
      this.alpha = this.burst ? 1 : Math.random() * 0.35 + 0.1;
      this.decay = this.burst ? Math.random() * 0.02 + 0.014 : 0.0016;
      this.hue = Math.random() * 15 + 38; // Tonos ámbar dorado
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.alpha -= this.decay;
      return (this.alpha > 0 && this.y >= -15);
    }

    draw() {
      ctx.save();
      const isLight = document.body.classList.contains('theme-light');
      const currentAlpha = Math.max(0, this.alpha * (isLight ? 0.2 : 0.65));
      ctx.globalAlpha = currentAlpha;
      ctx.fillStyle = isLight ? `hsl(${this.hue}, 60%, 45%)` : `hsl(${this.hue}, 85%, 65%)`;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < MAX_AMBIENT; i++) {
    particles.push(new Ember({ x: Math.random() * W, y: Math.random() * H }));
  }

  triggerEmberBurst = (originX, originY, count = 24) => {
    for (let i = 0; i < count; i++) {
      particles.push(new Ember({ x: originX, y: originY, burst: true }));
    }
  };
  window.triggerEmberBurst = triggerEmberBurst;

  let frameCount = 0;
  function animate() {
    if (!isVisible || !isDocumentVisible) return;
    ctx.clearRect(0, 0, W, H);

    for (let i = particles.length - 1; i >= 0; i--) {
      if (particles[i].update()) {
        particles[i].draw();
      } else {
        particles.splice(i, 1);
      }
    }

    frameCount++;
    if (particles.length < MAX_AMBIENT && frameCount % 10 === 0) {
      particles.push(new Ember());
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ========================================================================
   4. BARRA DE PROGRESO DE LECTURA
   ======================================================================== */
function initReadingProgressBar() {
  const bar = document.getElementById('reading-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (total <= 0) return;
    const pct = Math.min(100, Math.max(0, Math.round((window.scrollY / total) * 100)));
    bar.style.width = `${pct}%`;
    bar.setAttribute('aria-valuenow', pct.toString());
  }, { passive: true });
}

/* ========================================================================
   5. HEADER SCROLL SPY + ESTADO SCROLLED
   ======================================================================== */
function initHeaderScrollSpy() {
  const header = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('.module-section');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const match = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('active', match);
          if (match) link.setAttribute('aria-current', 'page');
          else link.removeAttribute('aria-current');
        });
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  sections.forEach(s => observer.observe(s));

  const brand = document.querySelector('.site-brand');
  brand?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ========================================================================
   6. SCROLL REVEAL SUAVE
   ======================================================================== */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal-on-scroll, .reveal-scale');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

/* ========================================================================
   7. MENÚ MÓVIL DESLIZABLE (DRAWER)
   ======================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('btn-mobile-menu');
  const closeBtn = document.getElementById('btn-close-drawer');
  const drawer = document.getElementById('mobile-drawer');
  const navLinks = document.querySelectorAll('.drawer-nav-item');

  if (!toggleBtn || !drawer) return;

  let overlay = null;

  function openDrawer() {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    overlay = document.createElement('div');
    overlay.className = 'mobile-drawer-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(2,4,8,0.75);backdrop-filter:blur(4px);z-index:1999;';
    overlay.addEventListener('click', closeDrawer);
    document.body.appendChild(overlay);
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (overlay) { overlay.remove(); overlay = null; }
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  navLinks.forEach(link => link.addEventListener('click', closeDrawer));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
  });
}

/* ========================================================================
   8. TAMAÑO DE FUENTE ACCESIBLE
   ======================================================================== */
function initFontSizeToggle() {
  const btn = document.getElementById('btn-font-size');
  if (!btn) return;

  if (localStorage.getItem('cb_font_size') === 'large') {
    document.body.classList.add('font-large');
  }

  btn.addEventListener('click', () => {
    const isLarge = document.body.classList.toggle('font-large');
    localStorage.setItem('cb_font_size', isLarge ? 'large' : 'normal');
    showToast(isLarge ? 'Tamaño de fuente aumentado (A+)' : 'Tamaño de fuente estándar restablecido');
  });
}

/* ========================================================================
   9. WOW 1 & 2: CRONOLOGÍA Y MAPA TERRITORIAL SINCRONIZADOS
   ======================================================================== */
const TIMELINE_DATA = [
  {
    step: 1,
    tag: 'MADRUGADA DEL 15 DE MAYO DE 2000',
    geoPoint: 'simijaca',
    geoLabel: 'Finca rural en Simijaca',
    title: 'Invasión armada e intimidación en vivienda rural',
    desc: 'Hombres armados irrumpen por la fuerza en la vivienda rural de Ana Elvia Cortés de Pachón y su esposo en Simijaca, Cundinamarca. Intimidan violentamente a la pareja exigiendo 15 millones de pesos en efectivo, amenazando con segarles la vida.',
    source: 'Corte Suprema de Justicia, Sala de Casación Penal (Proceso 21285 · 2005)',
    imgSrc: 'images/finca.jpg',
    imgAlt: 'Vivienda rural en Simijaca, Cundinamarca',
    caption: 'Finca rural · Simijaca, Cundinamarca'
  },
  {
    step: 2,
    tag: 'MAÑANA DEL 15 DE MAYO DE 2000',
    geoPoint: 'simijaca',
    geoLabel: 'Finca rural en Simijaca',
    title: 'Fijación coactiva del artefacto explosivo cervical',
    desc: 'Los asaltantes aseguran un collar rectangular de tubos de PVC con carga de dinamita e indugel alrededor del cuello de Ana Elvia Cortés. Sellado con adhesivo para tubería y dotado de un temporizador de 24 horas y sensor de alivio trampa, sin candado mecánico, advierten que detonará si no pagan.',
    source: 'Archivo periodístico El Tiempo — «Collar de dinamita» (Juanita León, 2000)',
    imgSrc: 'images/collar-sin-fondo.jpg',
    imgAlt: 'Reconstrucción forense del collar rectangular de tubos PVC y dinamita',
    caption: 'Morfología rectangular del collar de tubos PVC (sin candado)'
  },
  {
    step: 3,
    tag: 'MEDIODÍA · OPERATIVO POLICIAL DE RESCATE',
    geoPoint: 'chiquinquira',
    geoLabel: 'Corredor Chiquinquirá – Simijaca',
    title: 'Intervención heroica del Subintendente Jairo H. López',
    desc: 'El esposo da aviso en Chiquinquirá. El técnico antiexplosivos Jairo Hernando López arriba con traje EOD de protección. Conociendo el riesgo del lazo trampa anti-corte, asume la maniobra directa cuerpo a cuerpo junto a doña Ana Elvia para salvarle la vida.',
    source: 'Crónica El Espectador (Carranza Muñoz, 2016) · Policía Nacional',
    imgSrc: 'images/jairo-lopez.jpg',
    imgAlt: 'Subintendente Jairo Hernando López con traje de protección EOD',
    caption: 'Subintendente Jairo H. López con traje antiexplosivos EOD'
  },
  {
    step: 4,
    tag: '12:45 P. M. – 1:30 P. M. · DETONACIÓN TRÁGICA',
    geoPoint: 'bogota',
    geoLabel: 'Evacuación aérea hacia Bogotá D.C.',
    title: 'La explosión cobra la vida de Ana Elvia y hiere de muerte a López',
    desc: 'El mecanismo de alivio de tensión se activa durante la intervención. Ana Elvia Cortés fallece de forma instantánea. El subintendente López queda herido críticamente y fallece valerosamente durante su evacuación en helicóptero hacia Bogotá.',
    source: 'Providencia CSJ, Sala Penal (Proceso 21285 · 2005)',
    imgSrc: 'images/explosion.jpg',
    imgAlt: 'Detonación del artefacto explosivo',
    caption: 'Detonación trágica del artefacto explosivo'
  },
  {
    step: 5,
    tag: '2001 – 2005 – REVISIONES ACTUALES',
    geoPoint: 'simijaca',
    geoLabel: 'Tribunales y Corte Suprema de Justicia',
    title: 'Condena judicial por delincuencia común y verdad histórica',
    desc: 'La justicia descarta la autoría de las FARC y condena a José Miguel Suárez a 32 años de prisión por delincuencia común extorsiva. La Corte Suprema ratifica en casación la sentencia. Verificadores confirman que atribuir el collar a la guerrilla es una falsedad electoral.',
    source: 'CSJ Proceso 21285 · ColombiaCheck · La Silla Vacía · AFP Factual',
    imgSrc: 'images/Juicio.jpg',
    imgAlt: 'Audiencia judicial y condena penal',
    caption: 'Juicio penal · Condena a 32 años por delincuencia común'
  }
];

const GEO_WAYPOINTS = {
  'simijaca': {
    id: 'simijaca',
    badge: '1. Escenario Probado del Crimen (Simijaca, Cundinamarca)',
    desc: 'Predio rural donde ocurrió la incursión armada extorsiva a las 5:00 a.m. del 15 de mayo de 2000 y el despliegue del auxilio policial. La providencia penal 21285 de la Corte Suprema radicó allí la competencia jurisdiccional oficial (Altitud: 2.559 msnm).',
    source: 'Corte Suprema de Justicia, Sala de Casación Penal (2005)',
    stepNum: 1
  },
  'chiquinquira': {
    id: 'chiquinquira',
    badge: '2. Epicentro Asistencial y Foco Mediático (Chiquinquirá, Boyacá)',
    desc: 'Cabecera municipal a 15.2 km al norte por la Ruta 45A. Allí acudió el esposo a solicitar auxilio policial y se concentraron los corresponsales de prensa y el Hospital San Salvador. Por esta cercanía, la prensa contemporánea acuñó el término «Collar bomba de Chiquinquirá».',
    source: 'El Tiempo (17 de mayo de 2000) · Situr Boyacá',
    stepNum: 3
  },
  'limite': {
    id: 'limite',
    badge: '3. Zona Limítrofe Veredal (Vereda Palestina)',
    desc: 'Corredor rural interdepartamental entre Simijaca y Chiquinquirá. Las divergencias testimoniales sobre los linderos de las fincas suscitaron confusión inicial sobre la jurisdicción, aclarada formalmente por el tribunal y la Corte Suprema.',
    source: 'Expediente penal CSJ n.º 21285',
    stepNum: 2
  },
  'bogota': {
    id: 'bogota',
    badge: '4. Trayectoria de Evacuación Aérea (Hacia Bogotá D.C.)',
    desc: 'Tras la detonación a la 1:30 p.m., el subintendente Jairo Hernando López fue evacuado de urgencia por vía aérea hacia el Hospital Central de la Policía en Bogotá (128 km al sur). Falleció valerosamente en el trayecto debido a la gravedad de las heridas.',
    source: 'Crónica El Espectador (Carranza Muñoz, 2016)',
    stepNum: 4
  }
};

function initSynchronizedTimelineAndMap() {
  const stepPills = document.querySelectorAll('.timeline-step-pills .step-pill');
  const tagEl = document.getElementById('t-step-tag');
  const numEl = document.getElementById('t-step-num');
  const geoLinkEl = document.getElementById('t-step-geo');
  const titleEl = document.getElementById('t-step-title');
  const descEl = document.getElementById('t-step-desc');
  const sourceEl = document.getElementById('t-step-source');
  const btnPrev = document.getElementById('btn-t-prev');
  const btnNext = document.getElementById('btn-t-next');
  const dynamicCard = document.getElementById('timeline-dynamic-display');
  const imgEl = document.getElementById('t-step-img');
  const captionEl = document.getElementById('t-step-caption');
  const autoplayBtn = document.getElementById('t-autoplay-btn');
  const autoplayLabel = document.getElementById('t-autoplay-label');

  // Panel del mapa (sincronización)
  const geoPills = document.querySelectorAll('.geo-nav-pills .geo-pill-btn');
  const geoBadge = document.getElementById('geo-badge-tag');
  const geoDesc = document.getElementById('geo-desc-text');
  const geoSource = document.getElementById('geo-source-text');
  const btnSyncToTimeline = document.getElementById('btn-sync-to-timeline');

  let currentStepIdx = 0;

  // ----------------------------------------------------------------
  // REPRODUCCIÓN AUTOMÁTICA (5 SEGUNDOS CÍCLICA 1 -> 5 -> 1)
  // ----------------------------------------------------------------
  let autoplayInterval = null;
  let isAutoplayPaused = false;
  let manualPause = false;
  const AUTOPLAY_DELAY_MS = 5000;

  function updateAutoplayUI() {
    if (!autoplayBtn) return;
    const isPaused = isAutoplayPaused || manualPause;
    autoplayBtn.classList.toggle('is-paused', isPaused);
    if (autoplayLabel) {
      autoplayLabel.textContent = isPaused ? 'PAUSA' : '5s AUTO';
    }
  }

  function advanceStepAutomatically() {
    if (isAutoplayPaused || manualPause) return;
    const nextIdx = (currentStepIdx + 1) % TIMELINE_DATA.length;
    setStep(nextIdx, 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(advanceStepAutomatically, AUTOPLAY_DELAY_MS);
    updateAutoplayUI();
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    if (!manualPause) {
      startAutoplay();
    }
  }

  // ----------------------------------------------------------------
  // LEAFLET MAP — Coordenadas reales Colombia (CartoDB Dark Matter)
  // ----------------------------------------------------------------
  const LEAFLET_WAYPOINTS = {
    simijaca:    { lat: 5.5330, lng: -73.9167, label: '1. Finca Simijaca', color: '#dc2626', num: '1' },
    chiquinquira:{ lat: 5.6150, lng: -73.8190, label: '2. Chiquinquirá',   color: '#d4a820', num: '2' },
    limite:      { lat: 5.5750, lng: -73.8700, label: '3. Límite Veredal', color: '#a855f7', num: '3' },
    bogota:      { lat: 4.6097, lng: -74.0817, label: '4. Bogotá D.C.',    color: '#2563eb', num: '4' }
  };

  let leafletMap = null;
  let leafletMarkers = {};
  let currentActiveKey = 'simijaca';

  function initLeafletMap() {
    const mapEl = document.getElementById('leaflet-map-main');
    if (!mapEl || typeof L === 'undefined') return;

    // Inicializa mapa centrado en el corredor Boyacá-Cundinamarca
    leafletMap = L.map('leaflet-map-main', {
      center: [5.25, -73.90],
      zoom: 9,
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: true
    });

    // Tile layer: OpenStreetMap oficial con estilo oscuro conmemorativo (100% libre, sin requerir API key)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
      maxZoom: 18,
      className: 'osm-custom-dark-tiles'
    }).addTo(leafletMap);

    // Ruta histórica (polilínea entre los 4 puntos)
    const routeCoords = [
      [LEAFLET_WAYPOINTS.simijaca.lat,    LEAFLET_WAYPOINTS.simijaca.lng],
      [LEAFLET_WAYPOINTS.limite.lat,      LEAFLET_WAYPOINTS.limite.lng],
      [LEAFLET_WAYPOINTS.chiquinquira.lat,LEAFLET_WAYPOINTS.chiquinquira.lng],
      [LEAFLET_WAYPOINTS.bogota.lat,      LEAFLET_WAYPOINTS.bogota.lng]
    ];
    L.polyline(routeCoords, {
      color: '#f59e0b',
      weight: 2.5,
      opacity: 0.8,
      dashArray: '6, 5'
    }).addTo(leafletMap);

    // Crear marcadores personalizados con popup de diseño editorial histórico
    Object.entries(LEAFLET_WAYPOINTS).forEach(([key, wp]) => {
      const icon = L.divIcon({
        className: 'lf-marker-icon',
        html: `<div class="lf-marker-pin" style="background:${wp.color}; transform:rotate(-45deg);">
                 <span style="transform:rotate(45deg);color:#fff;font-size:10px;font-weight:800;">${wp.num}</span>
               </div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -18]
      });

      const geoData = GEO_WAYPOINTS[key];
      const popupContent = `
        <div class="vintage-popup-body">
          <h4>${geoData.badge}</h4>
          <p>${geoData.desc}</p>
          <div class="popup-source">${geoData.source}</div>
        </div>
      `;

      const popupOptions = {
        maxWidth: 320,
        minWidth: 260,
        autoPan: false, // Evita conflictos con flyTo y garantiza el centrado exacto
        closeButton: true,
        closeOnClick: false,
        offset: [0, -18],
        className: 'leaflet-vintage-popup'
      };

      const marker = L.marker([wp.lat, wp.lng], { icon, title: wp.label })
        .addTo(leafletMap)
        .bindPopup(popupContent, popupOptions);

      marker.on('click', () => highlightMapWaypoint(key, true));
      leafletMarkers[key] = marker;
    });

    // ResizeObserver para adaptar el mapa en tiempo real si cambia el alto de la tarjeta
    if (window.ResizeObserver && mapEl) {
      const ro = new ResizeObserver(() => {
        if (leafletMap) leafletMap.invalidateSize();
      });
      ro.observe(mapEl);
    }

    // Mostrar popup del punto inicial centrado
    setTimeout(() => {
      if (leafletMap) leafletMap.invalidateSize();
      highlightLeafletMarker('simijaca');
    }, 450);
  }

  // Calcula las coordenadas del mapa para que TANTO EL POPUP COMO EL MARCADOR
  // queden simétricamente centrados en el visor del mapa
  function getPopupCenterLatLng(wpLatLng, zoom, popupPixelOffsetY = 92) {
    if (!leafletMap) return wpLatLng;
    const pt = leafletMap.project(wpLatLng, zoom);
    // En el plano de píxeles, restar a Y traslada el centro hacia el norte,
    // equilibrando el centro visual exactamente a mitad del conjunto popup-marcador
    const centeredPt = L.point(pt.x, pt.y - popupPixelOffsetY);
    return leafletMap.unproject(centeredPt, zoom);
  }

  function highlightLeafletMarker(key) {
    // Resalta el marcador seleccionado y atenúa los demás
    Object.entries(leafletMarkers).forEach(([k, m]) => {
      const el = m.getElement();
      if (el) {
        const pin = el.querySelector('.lf-marker-pin');
        if (pin) {
          pin.style.boxShadow = (k === key)
            ? `0 0 16px 5px ${LEAFLET_WAYPOINTS[k]?.color || '#d4a820'}, 0 3px 8px rgba(0,0,0,0.6)`
            : '0 3px 10px rgba(0,0,0,0.4)';
        }
      }
    });

    if (leafletMarkers[key] && leafletMap) {
      leafletMap.invalidateSize();
      const wp = LEAFLET_WAYPOINTS[key];
      if (wp) {
        const targetZoom = (key === 'bogota') ? 10 : 11;
        const targetCenter = getPopupCenterLatLng([wp.lat, wp.lng], targetZoom, 92);

        leafletMap.flyTo(targetCenter, targetZoom, {
          duration: 0.75,
          easeLinearity: 0.25
        });

        // Abre el popup una vez orientado el visor
        setTimeout(() => {
          leafletMarkers[key]?.openPopup();
        }, 220);
      }
    }
  }

  function setStep(idx, dir = 1) {
    // Soporte cíclico de 1 a 5 y de 5 a 1
    const validIdx = (idx % TIMELINE_DATA.length + TIMELINE_DATA.length) % TIMELINE_DATA.length;
    currentStepIdx = validIdx;
    const data = TIMELINE_DATA[validIdx];

    if (dynamicCard) {
      dynamicCard.style.opacity = '0';
      dynamicCard.style.transform = `translateX(${dir * 18}px)`;
      setTimeout(() => {
        if (tagEl) tagEl.textContent = data.tag;
        if (numEl) numEl.textContent = `PASO ${data.step} DE ${TIMELINE_DATA.length}`;
        if (geoLinkEl) geoLinkEl.innerHTML = `<svg class="step-geo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> ${data.geoLabel}`;
        if (imgEl) {
          imgEl.src = data.imgSrc;
          imgEl.alt = data.imgAlt;
          if (data.imgSrc && data.imgSrc.includes('collar')) {
            imgEl.classList.add('contain-fit');
          } else {
            imgEl.classList.remove('contain-fit');
          }
        }
        if (captionEl) captionEl.textContent = data.caption;
        if (titleEl) titleEl.textContent = data.title;
        if (descEl) descEl.textContent = data.desc;
        if (sourceEl) sourceEl.textContent = `Fuente: ${data.source}`;
        dynamicCard.style.transition = 'opacity 0.28s ease, transform 0.28s cubic-bezier(0.16,1,0.3,1)';
        dynamicCard.style.opacity = '1';
        dynamicCard.style.transform = 'translateX(0)';
      }, 140);
    }

    stepPills.forEach((p, i) => {
      const active = (i === validIdx);
      p.classList.toggle('active', active);
      p.setAttribute('aria-selected', active.toString());
    });

    if (btnPrev) btnPrev.disabled = false;
    if (btnNext) btnNext.disabled = false;

    highlightMapWaypoint(data.geoPoint, false);
  }

  function highlightMapWaypoint(pointKey, syncTimeline = true) {
    const data = GEO_WAYPOINTS[pointKey];
    if (!data) return;
    currentActiveKey = pointKey;

    // Actualizar píldoras del mapa
    geoPills.forEach(pill => {
      const p = pill.getAttribute('data-point');
      const active = (p === pointKey);
      pill.classList.toggle('active', active);
      pill.setAttribute('aria-selected', active.toString());
    });

    // Actualizar panel contextual
    if (geoBadge) geoBadge.textContent = data.badge;
    if (geoDesc) geoDesc.textContent = data.desc;
    if (geoSource) geoSource.textContent = `Fuente: ${data.source}`;

    if (btnSyncToTimeline) {
      btnSyncToTimeline.querySelector('span').textContent = `Ver en Cronología (Paso ${data.stepNum})`;
      btnSyncToTimeline.setAttribute('data-target-step', data.stepNum.toString());
    }

    // Mover cámara Leaflet al punto
    highlightLeafletMarker(pointKey);

    if (syncTimeline && data.stepNum !== (currentStepIdx + 1)) {
      setStep(data.stepNum - 1, 1);
      resetAutoplay();
    }
  }

  // Event Listeners Timeline (con reinicio de los 5 segundos de autoplay)
  stepPills.forEach((pill, i) => {
    pill.addEventListener('click', () => {
      setStep(i, i >= currentStepIdx ? 1 : -1);
      resetAutoplay();
    });
  });

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      const prevIdx = (currentStepIdx - 1 + TIMELINE_DATA.length) % TIMELINE_DATA.length;
      setStep(prevIdx, -1);
      resetAutoplay();
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      const nextIdx = (currentStepIdx + 1) % TIMELINE_DATA.length;
      setStep(nextIdx, 1);
      resetAutoplay();
    });
  }

  // Pausa por hover sobre la tarjeta para facilitar la lectura del visitante
  if (dynamicCard) {
    dynamicCard.addEventListener('mouseenter', () => {
      isAutoplayPaused = true;
      updateAutoplayUI();
    });
    dynamicCard.addEventListener('mouseleave', () => {
      isAutoplayPaused = false;
      updateAutoplayUI();
    });
  }

  // Control manual del autoplay
  if (autoplayBtn) {
    autoplayBtn.addEventListener('click', () => {
      manualPause = !manualPause;
      if (!manualPause) {
        startAutoplay();
      } else {
        stopAutoplay();
      }
      updateAutoplayUI();
    });
    autoplayBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        autoplayBtn.click();
      }
    });
  }

  // Event Listeners Mapa (píldoras)
  geoPills.forEach(pill => {
    pill.addEventListener('click', () => {
      highlightMapWaypoint(pill.getAttribute('data-point'), true);
    });
  });

  if (btnSyncToTimeline) {
    btnSyncToTimeline.addEventListener('click', () => {
      const target = parseInt(btnSyncToTimeline.getAttribute('data-target-step') || '1', 10);
      setStep(target - 1, 1);
      resetAutoplay();
      const timelineBlock = document.querySelector('.timeline-interactive-block');
      timelineBlock?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // Iniciar
  initLeafletMap();
  setStep(0, 1);
  startAutoplay();
}

/* ========================================================================
   10. WOW 1: ESQUEMA FORENSE ILUSTRATIVO (Respetuoso y No Operativo)
   ======================================================================== */
function initForensicSchematic() {
  const btnAssembled = document.getElementById('btn-schematic-assembled');
  const btnExploded = document.getElementById('btn-schematic-exploded');
  const svgDiagram = document.getElementById('collar-diagram');
  const partBtns = document.querySelectorAll('.forensic-parts-nav .part-btn');
  const svgParts = document.querySelectorAll('.diagram-interactive-part');
  const titleEl = document.getElementById('detail-title');
  const textEl = document.getElementById('detail-text');

  const PART_DETAILS = {
    explosivo: {
      title: '1. Sección de Carga Explosiva (Indugel / Dinamita)',
      text: 'El tubo lateral izquierdo de PVC sanitario (50 mm) alojaba cartuchos de dinamita comercial e Indugel. Confinada rígidamente dentro de la sección rectangular recta, la onda expansiva quedaba orientada de forma letal contra la zona cervical de la víctima.',
      citation: 'Dictamen pericial balístico y forense · Expediente CSJ Proceso n.º 21285.'
    },
    temporizador: {
      title: '2. Módulo Temporizador de 24 Horas y Batería 9V',
      text: 'En el tramo superior horizontal se alojaba el circuito temporizador electromecánico calibrado con un ciclo de cuenta regresiva de 24 horas (plazo extorsivo fijado por los criminales), alimentado por una batería prismática alcalina de 9V para energizar el detonador eléctrico.',
      citation: 'Acta de inspección criminalística EOD · Policía Nacional de Colombia (2000).'
    },
    trampa: {
      title: '3. Mecanismo Sensor de Alivio de Tensión (Anti-Corte)',
      text: 'El tubo lateral derecho integraba el elemento trampa: un sensor de alivio de tensión conectado al conector circular multipin inferior. Si los técnicos intentaban cortar los conductores o forzar el collar sin neutralizar el circuito cerrado primario, el sistema liberaba el contacto disparando la ignición inmediata.',
      citation: 'Providencia CSJ Sala Casación Penal 21285 (M.P. Yesid Ramírez Bastidas).'
    },
    candado: {
      title: '4. Unión Adhesiva con Cemento PVC (Sin Candado Mecánico)',
      text: 'A diferencia de mitos sobre candados metálicos, el collar no poseía candado cervical ni cerrojos. Los asaltantes ensamblaron el marco rectangular directamente sobre el cuello de la víctima, uniendo los tubos de PVC con soldadura adhesiva para fontanería. El perímetro interno rectangular (≈14.5 × 12 cm) impedía extraer la cabeza sin cortar la tubería.',
      citation: 'Acta de inspección técnica al cadáver · Simijaca, Cundinamarca (15 de mayo de 2000).'
    }
  };

  // Toggle de vistas
  if (btnExploded) {
    btnExploded.addEventListener('click', () => {
      svgDiagram?.classList.add('exploded');
      btnExploded.classList.add('active');
      btnExploded.setAttribute('aria-pressed', 'true');
      btnAssembled?.classList.remove('active');
      btnAssembled?.setAttribute('aria-pressed', 'false');
    });
  }

  if (btnAssembled) {
    btnAssembled.addEventListener('click', () => {
      svgDiagram?.classList.remove('exploded');
      btnAssembled.classList.add('active');
      btnAssembled.setAttribute('aria-pressed', 'true');
      btnExploded?.classList.remove('active');
      btnExploded?.setAttribute('aria-pressed', 'false');
    });
  }

  function highlightPart(partKey) {
    const detail = PART_DETAILS[partKey];
    if (!detail) return;

    partBtns.forEach(btn => {
      const match = (btn.getAttribute('data-part') === partKey);
      btn.classList.toggle('active', match);
      btn.setAttribute('aria-selected', match.toString());
    });

    svgParts.forEach(part => {
      const match = (part.getAttribute('data-part') === partKey);
      part.classList.toggle('active', match);
    });

    const colorMap = {
      explosivo: '#ef4444',
      temporizador: '#f59e0b',
      trampa: '#00e5ff',
      candado: '#a855f7'
    };
    const detailBox = document.getElementById('forensic-detail');
    if (detailBox && colorMap[partKey]) {
      detailBox.style.borderLeftColor = colorMap[partKey];
    }

    if (titleEl) {
      titleEl.style.opacity = '0';
      setTimeout(() => {
        titleEl.textContent = detail.title;
        titleEl.style.transition = 'opacity 0.22s ease';
        titleEl.style.opacity = '1';
      }, 100);
    }

    if (textEl) {
      textEl.style.opacity = '0';
      setTimeout(() => {
        textEl.textContent = detail.text;
        const citEl = document.querySelector('.forensic-detail-box .detail-citation');
        if (citEl && detail.citation) citEl.textContent = detail.citation;
        textEl.style.transition = 'opacity 0.22s ease';
        textEl.style.opacity = '1';
      }, 120);
    }
  }

  partBtns.forEach(btn => {
    btn.addEventListener('click', () => highlightPart(btn.getAttribute('data-part')));
  });

  svgParts.forEach(svg => {
    svg.addEventListener('click', () => highlightPart(svg.getAttribute('data-part')));
    svg.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        highlightPart(svg.getAttribute('data-part'));
      }
    });
  });

  // Selección por defecto
  highlightPart('explosivo');
}

/* ========================================================================
   11. WOW 3: SANTUARIO VIRTUAL DE MEMORIA (Persistencia Real en LocalStorage)
   ======================================================================== */
const BASE_MEMORIAL_THOUGHTS = [
  {
    id: 'base-1',
    author: 'Visitante desde Bogotá D.C.',
    date: 'Conmemoración Documental',
    text: 'Por la dignidad de doña Ana Elvia y el heroísmo del Subintendente Jairo. La verdad prevalece sobre las mentiras políticas.'
  },
  {
    id: 'base-2',
    author: 'Colectivo de Memoria Histórica',
    date: 'Homenaje a las Víctimas',
    text: 'Recordar con responsabilidad y rigor ético para que hechos tan atroces no se repitan jamás en el campo colombiano.'
  },
  {
    id: 'base-3',
    author: 'Estudiante de Derecho y Periodismo',
    date: 'Memoria y Verdad',
    text: 'El deber ético de la memoria frente a la desinformación es un compromiso ciudadano innegociable.'
  }
];

function initMemorialSanctuary() {
  const btnLight = document.getElementById('btn-light-candle');
  const counterEl = document.getElementById('candle-counter');
  const flameEl = document.getElementById('candle-flame');
  const form = document.getElementById('form-memorial-dedication');
  const inputText = document.getElementById('dedication-input-text');
  const inputAuthor = document.getElementById('dedication-input-author');
  const charCounter = document.getElementById('char-counter');
  const quickPills = document.querySelectorAll('.tribute-quick-pill');
  const stream = document.getElementById('tribute-cards-stream');

  if (!btnLight || !counterEl || !stream) return;

  // Cargar pensamientos guardados en localStorage
  let savedThoughts = [];
  try {
    savedThoughts = JSON.parse(localStorage.getItem('cb_user_dedications') || '[]');
  } catch (e) {
    savedThoughts = [];
  }

  // Comprobar si ya encendió la vela en esta sesión/navegador
  let userHasLit = localStorage.getItem('cb_candle_lit') === 'true';

  function updateCounter() {
    const totalCount = BASE_MEMORIAL_THOUGHTS.length + savedThoughts.length + (userHasLit ? 1 : 0);
    counterEl.textContent = totalCount.toLocaleString('es-CO');
  }
  updateCounter();

  function updateCandleUI(isLit, animate = false) {
    if (isLit) {
      btnLight.classList.add('lit');
      btnLight.disabled = false;
      btnLight.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true"><path d="M12 2c-.5 2-2 3.5-2 5.5 0 1.5 1 2.5 2 2.5s2-1 2-2.5c0-2-1.5-3.5-2-5.5zm-5 9v11h10V11H7z"/></svg>
        <span>Luz Encendida · Clic para apagar</span>
      `;
      if (flameEl) {
        flameEl.classList.add('ignited');
        if (animate) {
          flameEl.style.transform = 'scale(1.4)';
          setTimeout(() => { flameEl.style.transform = ''; }, 600);
        }
      }
    } else {
      btnLight.classList.remove('lit');
      btnLight.disabled = false;
      btnLight.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20" aria-hidden="true"><path d="M12 2c-.5 2-2 3.5-2 5.5 0 1.5 1 2.5 2 2.5s2-1 2-2.5c0-2-1.5-3.5-2-5.5zm-5 9v11h10V11H7z"/></svg>
        <span>Encender una Luz en Memoria</span>
      `;
      if (flameEl) {
        flameEl.classList.remove('ignited');
      }
    }
    updateCounter();
  }

  // Inicializar estado UI de la vela
  updateCandleUI(userHasLit, false);

  // Función interactiva de conmutación (Permite encender y apagar cuantas veces desee)
  function toggleCandle() {
    userHasLit = !userHasLit;
    localStorage.setItem('cb_candle_lit', userHasLit ? 'true' : 'false');
    updateCandleUI(userHasLit, true);

    if (userHasLit) {
      if (window.triggerEmberBurst) {
        const rect = btnLight.getBoundingClientRect();
        window.triggerEmberBurst(rect.left + rect.width / 2, rect.top, 35);
      }
      showToast('Has encendido una luz en homenaje a Ana Elvia Cortés y Jairo H. López');
      inputText?.focus();
    } else {
      showToast('Has apagado la llama. Puedes volver a encenderla en cualquier momento.');
    }
  }

  btnLight.addEventListener('click', toggleCandle);

  // También se puede hacer clic directamente sobre la vela completa para encender/apagar
  const candleVisualEl = document.querySelector('.candle-visual');
  if (candleVisualEl) {
    candleVisualEl.addEventListener('click', toggleCandle);
  } else if (flameEl) {
    flameEl.addEventListener('click', toggleCandle);
  }

  // Desplegable del Cuaderno de Pensamientos
  const btnToggleTributes = document.getElementById('btn-toggle-tributes');
  const tributesWrapper = document.getElementById('tribute-cards-wrapper');
  const toggleText = document.getElementById('toggle-tributes-text');
  const toggleCount = document.getElementById('toggle-tributes-count');
  const tributeHeader = document.getElementById('tribute-wall-header');

  function updateTributesCount() {
    const total = savedThoughts.length + BASE_MEMORIAL_THOUGHTS.length;
    if (toggleCount) toggleCount.textContent = total.toString();
  }

  function setTributesOpen(isOpen) {
    if (!tributesWrapper || !btnToggleTributes) return;
    tributesWrapper.classList.toggle('is-open', isOpen);
    tributesWrapper.classList.toggle('is-collapsed', !isOpen);
    btnToggleTributes.setAttribute('aria-expanded', isOpen.toString());
    if (tributeHeader) tributeHeader.setAttribute('aria-expanded', isOpen.toString());
    if (toggleText) {
      toggleText.textContent = isOpen ? 'Ocultar pensamientos' : 'Ver pensamientos';
    }
  }

  if (btnToggleTributes) {
    btnToggleTributes.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = tributesWrapper ? tributesWrapper.classList.contains('is-open') : false;
      setTributesOpen(!isOpen);
    });
  }

  if (tributeHeader) {
    tributeHeader.addEventListener('click', () => {
      const isOpen = tributesWrapper ? tributesWrapper.classList.contains('is-open') : false;
      setTributesOpen(!isOpen);
    });
  }

  // Renderizar pensamientos combinados
  function renderAllThoughts() {
    stream.innerHTML = '';
    const all = [...savedThoughts, ...BASE_MEMORIAL_THOUGHTS];

    all.forEach(item => {
      const card = document.createElement('article');
      card.className = 't-stream-card';
      const cleanAuthor = escapeHTML(item.author || 'Visitante anónimo');
      const cleanText = escapeHTML(item.text);
      const cleanDate = escapeHTML(item.date || 'Reciente');

      card.innerHTML = `
        <span class="t-stream-date">${cleanDate}</span>
        <p>«${cleanText}»</p>
        <span class="t-stream-author">— ${cleanAuthor}</span>
      `;
      stream.appendChild(card);
    });
    updateTributesCount();
  }

  renderAllThoughts();

  // Contador de caracteres
  if (inputText && charCounter) {
    inputText.addEventListener('input', () => {
      const left = 240 - inputText.value.length;
      charCounter.textContent = `${left} caracteres disponibles`;
      charCounter.style.color = left < 20 ? 'var(--red-primary)' : 'var(--text-muted)';
    });
  }

  // Envío de dedicatoria
  if (form && inputText) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = inputText.value.trim();
      if (!text || text.length < 5) {
        showToast('Por favor escribe un mensaje de al menos 5 caracteres');
        inputText.focus();
        return;
      }

      const author = (inputAuthor?.value.trim()) || 'Visitante conmemorativo';
      const today = new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' });

      const newThought = {
        id: 'user-' + Date.now(),
        author: author,
        date: `Hoy (${today})`,
        text: text
      };

      savedThoughts.unshift(newThought);
      try {
        localStorage.setItem('cb_user_dedications', JSON.stringify(savedThoughts));
      } catch (err) {
        console.warn('LocalStorage lleno o deshabilitado');
      }

      inputText.value = '';
      if (inputAuthor) inputAuthor.value = '';
      if (charCounter) charCounter.textContent = '240 caracteres disponibles';

      renderAllThoughts();
      updateCounter();
      setTributesOpen(true);

      if (window.triggerEmberBurst) {
        const rect = form.getBoundingClientRect();
        window.triggerEmberBurst(rect.left + rect.width / 2, rect.top + 20, 25);
      }

      showToast('Tu dedicatoria ha sido guardada con respeto en tu dispositivo');
    });
  }

  // Píldoras de dedicatoria rápida
  quickPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const txt = pill.getAttribute('data-text');
      if (inputText && txt) {
        inputText.value = txt;
        inputText.focus();
        if (charCounter) {
          charCounter.textContent = `${240 - txt.length} caracteres disponibles`;
        }
      }
    });
  });
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/* ========================================================================
   12. MÓDULO 5: COMPARADOR DESLIZANTE (FICCIÓN PVC-1 VS REALIDAD)
   ======================================================================== */
function initComparisonSlider() {
  const container = document.getElementById('pvc1-slider-container');
  const layerOver = document.getElementById('slider-layer-over');
  const handle = document.getElementById('slider-handle');
  const btnComp = document.getElementById('btn-show-comparison');
  const btnFict = document.getElementById('btn-show-fiction');
  const btnDebunk = document.getElementById('btn-show-debunk');

  if (!container || !layerOver || !handle) return;

  let isDragging = false;

  function updateSlider(pct) {
    const clamped = Math.max(0, Math.min(100, pct));
    container.style.setProperty('--slider-pct', `${clamped}%`);
    layerOver.style.clipPath = `inset(0 calc(100% - ${clamped}%) 0 0)`;
    layerOver.style.webkitClipPath = `inset(0 calc(100% - ${clamped}%) 0 0)`;
    handle.style.left = `${clamped}%`;
    handle.setAttribute('aria-valuenow', Math.round(clamped).toString());

    // Badges opacidades si el slider se acerca a los bordes
    const tagReal = container.querySelector('.slider-tag-real');
    const tagFiction = container.querySelector('.slider-tag-fiction');
    if (tagReal) {
      tagReal.style.opacity = clamped <= 10 ? '0' : '1';
    }
    if (tagFiction) {
      tagFiction.style.opacity = clamped >= 90 ? '0' : '1';
    }
  }

  // Inicializar al 50%
  updateSlider(50);

  function getPercentFromEvent(e) {
    const rect = container.getBoundingClientRect();
    const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    return (x / rect.width) * 100;
  }

  // Permitir clic directo en cualquier parte del contenedor para posicionar el deslizador
  container.addEventListener('click', (e) => {
    if (e.target.closest('.slider-handle') || e.target.closest('.btn-slider-mode')) return;
    updateSlider(getPercentFromEvent(e));
  });

  function handleMove(e) {
    if (!isDragging) return;
    updateSlider(getPercentFromEvent(e));
  }

  handle.addEventListener('mousedown', () => { isDragging = true; });
  handle.addEventListener('touchstart', () => { isDragging = true; }, { passive: true });

  window.addEventListener('mousemove', handleMove);
  window.addEventListener('touchmove', handleMove, { passive: true });

  window.addEventListener('mouseup', () => { isDragging = false; });
  window.addEventListener('touchend', () => { isDragging = false; });

  // Control por teclado (Accesibilidad)
  handle.addEventListener('keydown', (e) => {
    let current = parseFloat(handle.getAttribute('aria-valuenow') || '50');
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      updateSlider(current - 5);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      updateSlider(current + 5);
    }
  });

  // Botones de modo
  if (btnComp) {
    btnComp.addEventListener('click', () => {
      updateSlider(50);
      setActiveButton(btnComp);
    });
  }

  if (btnFict) {
    btnFict.addEventListener('click', () => {
      updateSlider(0);
      setActiveButton(btnFict);
    });
  }

  if (btnDebunk) {
    btnDebunk.addEventListener('click', () => {
      updateSlider(100);
      setActiveButton(btnDebunk);
    });
  }

  function setActiveButton(activeBtn) {
    [btnComp, btnFict, btnDebunk].forEach(b => b?.classList.remove('active'));
    activeBtn?.classList.add('active');
  }
}

/* ========================================================================
   13. MÓDULO 5: HEMEROTECA DIGITAL (Búsqueda y Filtro)
   ======================================================================== */
function initHemerotecaSearch() {
  const searchInput = document.getElementById('hemeroteca-search');
  const catPills = document.querySelectorAll('.tag-filter-pills .h-pill');
  const cards = document.querySelectorAll('#hemeroteca-cards-container .h-card');
  const countEl = document.getElementById('hemeroteca-count');

  let activeCat = 'all';
  let searchTerm = '';

  function filterHemeroteca() {
    let visibleCount = 0;
    cards.forEach(card => {
      const cat = card.getAttribute('data-cat');
      const text = card.innerText.toLowerCase();
      const matchesCat = (activeCat === 'all' || cat === activeCat);
      const matchesSearch = !searchTerm || text.includes(searchTerm);
      const isVisible = matchesCat && matchesSearch;

      card.style.display = isVisible ? '' : 'none';
      if (isVisible) visibleCount++;
    });

    if (countEl) {
      countEl.textContent = `Mostrando ${visibleCount} de ${cards.length} crónicas y artículos indexados`;
    }
  }

  if (searchInput) {
    let timer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        searchTerm = e.target.value.toLowerCase().trim();
        filterHemeroteca();
      }, 150);
    });
  }

  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCat = pill.getAttribute('data-cat') || 'all';
      filterHemeroteca();
    });
  });
}

/* ========================================================================
   14. MÓDULO 6: PESTAÑAS JUDICIALES ACCESIBLES
   ======================================================================== */
function initJudicialTabs() {
  const tabBtns = document.querySelectorAll('.judicial-tab-bar .j-tab-btn');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const targetHref = btn.getAttribute('href');
      if (targetHref && targetHref.startsWith('#')) {
        const targetEl = document.querySelector(targetHref);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

/* ========================================================================
   15. MÓDULO 7: ACORDEÓN PEDAGÓGICO DE REFLEXIÓN
   ======================================================================== */
function initAccordion() {
  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('active');
      const collapse = item.querySelector('.accordion-collapse');

      // Cerrar otros
      document.querySelectorAll('.accordion-item').forEach(other => {
        if (other !== item && other.classList.contains('active')) {
          other.classList.remove('active');
          const otherCollapse = other.querySelector('.accordion-collapse');
          if (otherCollapse) otherCollapse.style.maxHeight = '0px';
          other.querySelector('.accordion-header')?.setAttribute('aria-expanded', 'false');
        }
      });

      if (!isOpen) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
        if (collapse) collapse.style.maxHeight = `${collapse.scrollHeight + 32}px`;
      } else {
        item.classList.remove('active');
        header.setAttribute('aria-expanded', 'false');
        if (collapse) collapse.style.maxHeight = '0px';
      }
    });
  });
}

/* ========================================================================
   16. MÓDULO 8: BIBLIOGRAFÍA COMPACTA Y HERRAMIENTAS ACADÉMICAS
   ======================================================================== */
const ALL_APA_CITATIONS = [
  `AFP Factual. (2026, 7 de abril). El caso del “collar bomba” en Colombia no fue atribuido a las FARC; y la foto viral es de una actriz. https://factual.afp.com/doc.afp.com.A6ZK7ZQ`,
  `Carranza Muñoz, D. L. (2016, 14 de mayo). El otro muerto del collar bomba. El Espectador. https://www.elespectador.com/colombia/mas-regiones/el-otro-muerto-del-collar-bomba-article-632293/`,
  `ColombiaCheck. (2016, 27 de septiembre). Lo del collar bomba, otra explosiva mentira. https://colombiacheck.com/chequeos/lo-del-collar-bomba-otra-explosiva-mentira`,
  `ColombiaCheck. (2022, 27 de enero). Collar bomba fue un acto de la delincuencia común, pero aún se lo atribuyen falsamente a las FARC. https://colombiacheck.com/chequeos/collar-bomba-fue-un-acto-de-la-delincuencia-comun-pero-aun-se-lo-atribuyen-falsamente-las`,
  `ColombiaCheck. (2026, 15 de abril). Vieja desinformación sobre el collar bomba se usa para cuestionar campaña de Cepeda. https://colombiacheck.com/chequeos/vieja-desinformacion-sobre-el-collar-bomba-se-usa-para-cuestionar-campana-de-cepeda`,
  `Corte Suprema de Justicia, Sala de Casación Penal. (2005, 25 de octubre). Providencia, proceso n.º 21285 (M.P. Yesid Ramírez Bastidas). vLex Colombia. https://vlex.com.co/vid/providencia-corte-suprema-justicia-874010134`,
  `El Tiempo. (2000, 17 de mayo). El collar explosivo, peor que el secuestro. Archivo de El Tiempo. https://www.eltiempo.com/archivo/documento/mam-1255427`,
  `El Tiempo. (2000, 28 de mayo). Collar bomba, acto de bandas. Archivo de El Tiempo. https://www.eltiempo.com/archivo/documento/mam-1226570`,
  `El Tiempo. (2002, 24 de septiembre). Collar bomba: un solo condenado. Archivo de El Tiempo. https://www.eltiempo.com/archivo/documento/mam-1333136`,
  `El Tiempo. (2003, 7 de febrero). Confirman pena por collar bomba. Archivo de El Tiempo. https://www.eltiempo.com/archivo/documento/mam-980725`,
  `El Tiempo. (2008, 13 de noviembre). Historia de la tragedia del collar bomba. Archivo de El Tiempo. https://www.eltiempo.com/archivo/documento/CMS-4664634`,
  `La Silla Vacía. (2023, 30 de junio). Detector: ninguna guerrilla fue responsable del caso del collar bomba. https://www.lasillavacia.com/detector-de-mentiras/falso/detector-ninguna-guerrilla-fue-responsable-del-caso-del-collar-bomba/`,
  `La Silla Vacía. (2026, 21 de octubre). Collar bomba: la justicia probó que fueron delincuentes comunes, no las Farc. https://www.lasillavacia.com/detector-de-mentiras/falso/collar-bomba-la-justicia-probo-que-fueron-delincuentes-comunes-no-las-farc/`,
  `Proimágenes Colombia. (s. f.). PVC-1. Cine colombiano. https://www.proimagenescolombia.com/secciones/cine_colombiano/peliculas_colombianas/pelicula_plantilla.php?id_pelicula=1796`,
  `Proimágenes Colombia. (2007, 30 de noviembre). El largometraje colombiano PVC-1 gana en el Festival de Cine de Tesalónica. Pantalla Colombia. https://www.proimagenescolombia.com/secciones/pantalla_colombia/breves_plantilla.php?id_noticia=652`
];

const BIBTEX_ENTRIES = `@jurisdiction{csj2005_21285,
  author = {{Corte Suprema de Justicia de Colombia}},
  title = {Providencia, Proceso Penal N.º 21285},
  year = {2005},
  month = {octubre},
  url = {https://vlex.com.co/vid/providencia-corte-suprema-justicia-874010134},
  note = {Sala de Casación Penal. M.P. Yesid Ramírez Bastidas}
}

@article{carranza2016,
  author = {Carranza Muñoz, Diana Lucía},
  title = {El otro muerto del collar bomba},
  journal = {El Espectador},
  year = {2016},
  month = {mayo},
  url = {https://www.elespectador.com/colombia/mas-regiones/el-otro-muerto-del-collar-bomba-article-632293/}
}

@misc{colombiacheck2022,
  author = {{ColombiaCheck}},
  title = {Collar bomba fue un acto de la delincuencia común, pero aún se lo atribuyen falsamente a las FARC},
  year = {2022},
  month = {enero},
  url = {https://colombiacheck.com/chequeos/collar-bomba-fue-un-acto-de-la-delincuencia-comun-pero-aun-se-lo-atribuyen-falsamente-las}
}

@misc{afp_factual_2026,
  author = {{AFP Factual}},
  title = {El caso del "collar bomba" en Colombia no fue atribuido a las FARC; y la foto viral es de una actriz},
  year = {2026},
  month = {abril},
  url = {https://factual.afp.com/doc.afp.com.A6ZK7ZQ}
}

@misc{lasillavacia2026,
  author = {{La Silla Vacía}},
  title = {Collar bomba: la justicia probó que fueron delincuentes comunes, no las Farc},
  year = {2026},
  month = {octubre},
  url = {https://www.lasillavacia.com/detector-de-mentiras/falso/collar-bomba-la-justicia-probo-que-fueron-delincuentes-comunes-no-las-farc/}
}

@article{eltiempo2000_1,
  author = {{El Tiempo}},
  title = {El collar explosivo, peor que el secuestro},
  journal = {El Tiempo},
  year = {2000},
  month = {mayo},
  url = {https://www.eltiempo.com/archivo/documento/mam-1255427}
}

@article{eltiempo2000_2,
  author = {{El Tiempo}},
  title = {Collar bomba, acto de bandas},
  journal = {El Tiempo},
  year = {2000},
  month = {mayo},
  url = {https://www.eltiempo.com/archivo/documento/mam-1226570}
}
`;

function initAcademicBibliography() {
  const cards = document.querySelectorAll('.apa-card');
  const copyBtns = document.querySelectorAll('.btn-copy-citation');
  const toggleBtns = document.querySelectorAll('.btn-toggle-apa');
  const btnCopyAll = document.getElementById('btn-copy-all-apa');
  const btnDownloadBibtex = document.getElementById('btn-download-bibtex');
  const filterInput = document.getElementById('apa-filter-input');

  // Desplegables de fichas
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.apa-card');
      const expanded = card.querySelector('.apa-card-expanded');
      const isOpen = card.classList.toggle('expanded');
      btn.setAttribute('aria-expanded', isOpen.toString());
      btn.textContent = isOpen ? 'Ocultar' : 'Detalles';
      if (expanded) {
        expanded.style.maxHeight = isOpen ? `${expanded.scrollHeight + 20}px` : '0px';
      }
    });
  });

  // Copia individual
  copyBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const citation = btn.getAttribute('data-citation');
      if (!citation) return;
      try {
        await navigator.clipboard.writeText(citation);
        showToast('Cita APA 7 copiada al portapapeles');
      } catch (err) {
        fallbackCopy(citation);
      }
    });
  });

  // Copiar todas
  if (btnCopyAll) {
    btnCopyAll.addEventListener('click', async () => {
      const allText = ALL_APA_CITATIONS.join('\n\n');
      try {
        await navigator.clipboard.writeText(allText);
        showToast('15 referencias APA 7 copiadas al portapapeles');
      } catch (err) {
        fallbackCopy(allText);
      }
    });
  }

  // Descargar BibTeX (.bib)
  if (btnDownloadBibtex) {
    btnDownloadBibtex.addEventListener('click', () => {
      const blob = new Blob([BIBTEX_ENTRIES], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'collar_bomba_bibliografia_apa7.bib';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Archivo BibTeX (.bib) descargado');
    });
  }

  // Filtrado de referencias
  if (filterInput) {
    filterInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = (!query || text.includes(query)) ? '' : 'none';
      });
    });
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast('Copiado al portapapeles');
    } catch (e) {
      showToast('No se pudo copiar automáticamente');
    }
    document.body.removeChild(ta);
  }
}

/* ========================================================================
   17. MODAL LIGHTBOX HD PARA ARCHIVOS DE PRENSA
   ======================================================================== */
function initMediaModal() {
  const modal = document.getElementById('media-modal');
  const modalImg = document.getElementById('modal-image');
  const modalCaption = document.getElementById('modal-caption-text');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal || !modalImg) return;

  function openModal(src, alt, caption) {
    modalImg.src = src;
    modalImg.alt = alt || '';
    if (modalCaption) modalCaption.textContent = caption || alt || '';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => { modalImg.src = ''; }, 250);
  }

  const clickableImages = document.querySelectorAll('.curated-thumb, .context-figure, .strip-item');
  clickableImages.forEach(item => {
    item.style.cursor = 'zoom-in';
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.getAttribute('data-caption') || item.querySelector('figcaption')?.innerText;
      if (img) openModal(img.src, img.alt, caption);
    });
  });

  closeBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-backdrop')) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}

/* ========================================================================
   18. AUDIO AMBIENTAL SOLEMNE (Web Audio API - Cero Archivos Externos)
   ======================================================================== */
function initAmbientAudio() {
  const btnToggle = document.getElementById('btn-ambient-audio');
  const waveBar = document.getElementById('audio-wave-bar');
  const muteBtn = document.getElementById('btn-audio-mute');
  const canvas = document.getElementById('soundwave-canvas');
  if (!btnToggle) return;

  let audioCtx = null, isPlaying = false, masterGain = null;
  let oscs = [], animId = null;

  function startAudio() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.06, audioCtx.currentTime + 3);

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, audioCtx.currentTime);
    filter.Q.setValueAtTime(0.7, audioCtx.currentTime);

    // Acorde solemne y sereno de fondo
    const freqs = [110, 138.6, 164.8, 220];
    oscs = freqs.map(freq => {
      const osc = audioCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.4 / freqs.length, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(filter);
      osc.start();
      return osc;
    });

    filter.connect(masterGain);
    masterGain.connect(audioCtx.destination);
    isPlaying = true;

    btnToggle.classList.add('playing');
    updateBtn(true);
    waveBar?.classList.add('visible');
    drawWave();
    showToast('Atmósfera sonora solemne activada');
  }

  function stopAudio() {
    if (!isPlaying) return;
    if (masterGain && audioCtx) {
      masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.5);
    }
    setTimeout(() => {
      oscs.forEach(osc => { try { osc.stop(); osc.disconnect(); } catch(e) {} });
      oscs = [];
      isPlaying = false;
    }, 1600);

    btnToggle.classList.remove('playing');
    updateBtn(false);
    waveBar?.classList.remove('visible');
    if (animId) cancelAnimationFrame(animId);
  }

  function updateBtn(playing) {
    const iconOn = btnToggle.querySelector('.icon-sound.on');
    const iconOff = btnToggle.querySelector('.icon-sound.off');
    const txt = btnToggle.querySelector('.btn-sound-text');
    if (iconOn) iconOn.style.display = playing ? 'none' : 'inline';
    if (iconOff) iconOff.style.display = playing ? 'inline' : 'none';
    if (txt) txt.textContent = playing ? 'Silenciar' : 'Atmósfera';
  }

  function drawWave() {
    if (!canvas || !isPlaying) return;
    const ctx2d = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    let t = 0;

    function render() {
      if (!isPlaying) return;
      ctx2d.clearRect(0, 0, w, h);
      ctx2d.lineWidth = 1.8;
      ctx2d.strokeStyle = '#d4a820';
      ctx2d.beginPath();
      for (let x = 0; x < w; x++) {
        const y = (h / 2) + Math.sin(x * 0.08 + t) * 6 * Math.sin(x * 0.02 + t * 0.3);
        if (x === 0) ctx2d.moveTo(x, y);
        else ctx2d.lineTo(x, y);
      }
      ctx2d.stroke();
      t += 0.05;
      animId = requestAnimationFrame(render);
    }
    render();
  }

  btnToggle.addEventListener('click', () => isPlaying ? stopAudio() : startAudio());
  muteBtn?.addEventListener('click', stopAudio);

  // Silenciar automáticamente si el usuario minimiza o cambia de pestaña
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && isPlaying) {
      stopAudio();
    }
  });
}

/* ========================================================================
   19. EFECTO RIPPLE EN BOTONES PRINCIPALES
   ======================================================================== */
function initRippleEffect() {
  const rippleEls = document.querySelectorAll('.btn-primary-action, .btn-secondary-action, .btn-candle-light');
  rippleEls.forEach(el => {
    el.classList.add('ripple-container');
    el.addEventListener('click', (e) => {
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.8;
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.25);
        pointer-events: none;
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top: ${e.clientY - rect.top - size / 2}px;
        transform: scale(0);
        animation: rippleAnim 0.6s linear;
      `;
      el.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });
}

/* ========================================================================
   20. EFECTO 3D TILT DESACTIVADO POR PREFERENCIA EDITORIAL
   ======================================================================== */
function initCardTiltEffect() {
  // Desactivado: las tarjetas se mantienen firmes y planas como pliego de prensa histórica sin balanceo hacia atrás
}
