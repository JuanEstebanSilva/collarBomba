/**
 * EL CASO DEL COLLAR BOMBA: MEMORIA, VERDAD Y DIGNIDAD
 * Motor de Interactividad Cinematográfica — Edición Premium
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initPremiumParticles();
  initReadingProgressBar();
  initHeaderScrollSpy();
  initScrollReveal();
  initMobileDrawer();
  initFontSizeToggle();
  initStepTimeline();
  initForensicExplodedSchematic();
  initInteractiveRouteMap();
  initJudicialTabs();
  initMemorialSanctuary();
  initHemerotecaSearch();
  initAccordion();
  initMediaModal();
  initAmbientAudio();
  initRippleEffect();
  initParallaxHero();
  initCountUpAnimations();
  initCardTiltEffect();
  markHeroImageLoaded();
});

/* ========================================================================
   2. TEMA CLARO / OSCURO (oscuro por defecto)
   ======================================================================== */
function initThemeToggle() {
  const btnTheme = document.getElementById('btn-theme-toggle');
  if (!btnTheme) return;

  const sunIcon = btnTheme.querySelector('.icon-sun');
  const moonIcon = btnTheme.querySelector('.icon-moon');
  const themeText = btnTheme.querySelector('.btn-theme-text');

  const savedTheme = localStorage.getItem('cb_theme') || 'dark';
  applyTheme(savedTheme);

  btnTheme.addEventListener('click', () => {
    const isDark = document.body.classList.contains('theme-dark');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('cb_theme', newTheme);
  });

  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
      document.documentElement.classList.remove('theme-dark');
      document.documentElement.classList.add('theme-light');
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'inline';
      if (themeText) themeText.textContent = 'Claro';
    } else {
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
      document.documentElement.classList.remove('theme-light');
      document.documentElement.classList.add('theme-dark');
      if (sunIcon) sunIcon.style.display = 'inline';
      if (moonIcon) moonIcon.style.display = 'none';
      if (themeText) themeText.textContent = 'Oscuro';
    }
  }
}

/* ========================================================================
   3. SISTEMA DE PARTÍCULAS PREMIUM (ascuas doradas)
   ======================================================================== */
let triggerEmberBurst = null;

function initPremiumParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  let animRunning = true;

  const handleResize = () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', handleResize, { passive: true });

  // Pool de partículas de alto rendimiento (ascuas solemnes)
  const particles = [];
  const MAX_AMBIENT = 14; // Reducido para máxima fluidez y evitar saturación visual

  class Ember {
    constructor(options = {}) {
      this.burst = options.burst || false;
      this.x = options.x !== undefined ? options.x : Math.random() * W;
      this.y = options.y !== undefined ? options.y : H + 10 + Math.random() * 60;
      this.size = this.burst ? Math.random() * 2.5 + 1.2 : Math.random() * 1.6 + 0.8;
      this.speedY = this.burst ? -(Math.random() * 4 + 2) : -(Math.random() * 0.5 + 0.25);
      this.speedX = this.burst ? (Math.random() - 0.5) * 3 : (Math.random() - 0.5) * 0.15; // Trayectoria recta suave sin oscilación lateral
      this.alpha = this.burst ? 1 : Math.random() * 0.35 + 0.1;
      this.decay = this.burst ? Math.random() * 0.02 + 0.012 : 0.0018;
      this.hue = Math.random() * 20 + 35; // 35-55: tonos dorados sobrios
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX; // Movimiento vertical sutil, cero oscilación de lado a lado
      this.alpha -= this.decay;
      return (this.alpha > 0 && this.y >= -15);
    }

    draw() {
      ctx.save();
      const isLight = document.body.classList.contains('theme-light');
      const currentAlpha = Math.max(0, this.alpha * (isLight ? 0.2 : 0.7));
      ctx.globalAlpha = currentAlpha;
      ctx.fillStyle = isLight ? `hsl(${this.hue}, 65%, 45%)` : `hsl(${this.hue}, 85%, 65%)`;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();

      // Halo sutil sin usar ctx.shadowBlur (GPU friendly)
      ctx.globalAlpha = currentAlpha * 0.3;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  // Partículas iniciales distribuidas
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
    if (!animRunning) return;
    ctx.clearRect(0, 0, W, H);

    for (let i = particles.length - 1; i >= 0; i--) {
      if (particles[i].update()) {
        particles[i].draw();
      } else {
        particles.splice(i, 1);
      }
    }

    frameCount++;
    if (particles.length < MAX_AMBIENT && frameCount % 8 === 0) {
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
    const pct = Math.min(100, Math.max(0, (window.scrollY / total) * 100));
    bar.style.width = `${pct}%`;
  }, { passive: true });
}

/* ========================================================================
   5. SCROLL SPY + HEADER SCROLLED
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
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(s => observer.observe(s));

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ========================================================================
   6. SCROLL REVEAL CON INTERSECTION OBSERVER
   ======================================================================== */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale');

  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

/* ========================================================================
   7. MOBILE DRAWER
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

    // Overlay oscuro
    overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:1999;backdrop-filter:blur(4px);animation:fadeInBg 0.3s ease;';
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
   8. TAMAÑO DE FUENTE
   ======================================================================== */
function initFontSizeToggle() {
  const btn = document.getElementById('btn-font-size');
  if (!btn) return;
  if (localStorage.getItem('cb_font_size') === 'large') document.body.classList.add('font-large');
  btn.addEventListener('click', () => {
    const large = document.body.classList.toggle('font-large');
    localStorage.setItem('cb_font_size', large ? 'large' : 'normal');
  });
}

/* ========================================================================
   9. LÍNEA DE TIEMPO PASO A PASO
   ======================================================================== */
function initStepTimeline() {
  const stepPills = document.querySelectorAll('.timeline-step-pills .step-pill');
  const tagEl = document.getElementById('t-step-tag');
  const numEl = document.getElementById('t-step-num');
  const titleEl = document.getElementById('t-step-title');
  const descEl = document.getElementById('t-step-desc');
  const sourceEl = document.getElementById('t-step-source');
  const btnPrev = document.getElementById('btn-t-prev');
  const btnNext = document.getElementById('btn-t-next');
  const card = document.getElementById('timeline-dynamic-display');

  const stepsData = [
    {
      step: 1,
      tag: 'MADRUGADA DEL 15 DE MAYO DE 2000',
      borderColor: '#d4a820',
      title: 'Invasión armada e intimidación a la vivienda rural',
      desc: 'Hombres armados irrumpen por la fuerza en la pequeña vivienda rural de Ana Elvia Cortés de Pachón y su esposo en Simijaca, Cundinamarca. Intimidan violentamente a la pareja exigiendo 15 millones de pesos en efectivo, amenazando con quitarles la vida si no cumplen.',
      source: 'Fuente: Corte Suprema de Justicia, Sala de Casación Penal (Proceso 21285 · 2005)'
    },
    {
      step: 2,
      tag: 'DURANTE LA MAÑANA DEL 15 DE MAYO',
      borderColor: '#d4a820',
      title: 'Colocación del artefacto explosivo artesanal en el cuello',
      desc: 'Los delincuentes aseguran tres cilindros de tubo de PVC con dinamita alrededor del cuello de Ana Elvia Cortés y activan un reloj despertador modificado como detonador. Alertan a las autoridades: si el pago no llega a tiempo, el artefacto estallará.',
      source: 'Fuente: Archivo periodístico El Tiempo — «Collar de dinamita» (Juanita León, 2000)'
    },
    {
      step: 3,
      tag: 'MEDIODÍA · OPERATIVO POLICIAL DE RESCATE',
      borderColor: '#3b82f6',
      title: 'Intervención heroica del Subintendente Jairo Hernando López',
      desc: 'El técnico antiexplosivos Jairo Hernando López arriba con traje EOD de protección. Conociendo la letalidad de la trampa anti-corte incorporada en el circuito, asume el altísimo riesgo y trabaja directamente cuerpo a cuerpo junto a la víctima para intentar desactivarlo con herramientas de precisión.',
      source: 'Fuente: El Espectador (Carranza Muñoz, 2016)'
    },
    {
      step: 4,
      tag: '12:45 P. M. · DETONACIÓN TRÁGICA',
      borderColor: '#e03040',
      title: 'La explosión cobra la vida de Ana Elvia y hiere mortalmente a López',
      desc: 'El mecanismo trampa de alivio de tensión se activa durante las maniobras de desactivación. Ana Elvia Cortés fallece en el acto. Jairo Hernando López queda gravemente herido, consciente pero crítico. Fallece durante el traslado médico aéreo de emergencia a Bogotá, dejando a su esposa e hijo recién nacido.',
      source: 'Fuente: Providencia judicial CSJ, Sala Penal (2005) — Proceso 21285'
    },
    {
      step: 5,
      tag: '2001 – 2005 – 2016 · INVESTIGACIÓN Y VERDAD',
      borderColor: '#22c55e',
      title: 'Condena judicial por delincuencia común y desmentidos definitivos',
      desc: 'La Fiscalía descarta la autoría de las FARC. José Miguel Suárez es condenado a 32 años de prisión por delincuencia común extorsiva. La Corte Suprema de Justicia ratifica la condena en casación (2005). Años después, ColombiaCheck y La Silla Vacía desmienten versiones electorales que reviven la falsa imputación política.',
      source: 'Fuente: CSJ (2005) · ColombiaCheck · La Silla Vacía · El Espectador'
    }
  ];

  let currentIdx = 0;

  function renderStep(idx, dir = 1) {
    currentIdx = idx;
    const data = stepsData[idx];

    // Animación de salida/entrada
    if (card) {
      card.style.opacity = '0';
      card.style.transform = `translateX(${dir * 20}px)`;
      setTimeout(() => {
        updateContent(data);
        card.style.transition = 'opacity 0.3s ease, transform 0.3s var(--ease-out), border-left-color 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateX(0)';
        card.style.borderLeftColor = data.borderColor;
      }, 150);
    } else {
      updateContent(data);
    }

    stepPills.forEach((pill, i) => pill.classList.toggle('active', i === idx));
    if (btnPrev) btnPrev.disabled = (idx === 0);
    if (btnNext) btnNext.disabled = (idx === stepsData.length - 1);
  }

  function updateContent(data) {
    if (tagEl) tagEl.textContent = data.tag;
    if (numEl) numEl.textContent = `PASO ${data.step} DE ${stepsData.length}`;
    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;
    if (sourceEl) sourceEl.textContent = data.source;
  }

  stepPills.forEach((pill, i) => pill.addEventListener('click', () => renderStep(i, i > currentIdx ? 1 : -1)));
  if (btnPrev) btnPrev.addEventListener('click', () => { if (currentIdx > 0) renderStep(currentIdx - 1, -1); });
  if (btnNext) btnNext.addEventListener('click', () => { if (currentIdx < stepsData.length - 1) renderStep(currentIdx + 1, 1); });
}

/* ========================================================================
   10. ESQUEMA FORENSE INTERACTIVO (EXPLODED VIEW)
   ======================================================================== */
function initForensicExplodedSchematic() {
  const container = document.getElementById('forensic-explorer');
  const btnAssembled = document.getElementById('btn-schematic-assembled');
  const btnExploded = document.getElementById('btn-schematic-exploded');
  const partBtns = document.querySelectorAll('.forensic-parts-nav .part-btn');
  const svgParts = document.querySelectorAll('.diagram-interactive-part');
  const titleEl = document.getElementById('detail-title');
  const textEl = document.getElementById('detail-text');
  const svgDiagram = document.getElementById('collar-diagram');

  const partDetails = {
    explosivo: {
      title: '1. Dinamita e Indugel Comercial (Carga Primaria)',
      text: 'El compartimento izquierdo alojaba cartuchos de dinamita e Indugel comercial (~250-300g) acompañados de metralla pericialmente calculada para causar una onda expansiva devastadora a quemarropa. En su interior se encontraba insertado un estopín eléctrico de cobre conectado a la línea de disparo maestro.',
      citation: 'Dictamen pericial balístico · Expediente CSJ Proceso 21285.',
      color: '#dc2626'
    },
    temporizador: {
      title: '2. Reloj Despertador Modificado y Batería 9V',
      text: 'El compartimento central integraba un reloj despertador adaptado electromecánicamente. La aguja horaria estaba calibrada para hacer contacto eléctrico a las 15:00 horas (hora fatal de la extorsión de 15 millones de pesos). Estaba energizado por una pila prismática alcalina de 9V para garantizar el cierre del circuito.',
      citation: 'Acta de inspección técnica EOD · Policía Nacional de Colombia.',
      color: '#d97706'
    },
    trampa: {
      title: '3. Circuito Trampa Mortal de Alivio de Tensión (Anti-Corte)',
      text: 'El compartimento derecho contenía el elemento fatal: un microinterruptor de descompresión conectado en lazo trampa ("booby-trap"). Si los técnicos intentaban cortar los conductores o forzar el collar sin neutralizar el circuito cerrado primario, el resorte liberaba la masa disparando la ignición inmediata. Este sistema causó la detonación durante el intento de auxilio.',
      citation: 'Providencia CSJ Sala Casación Penal 21285 (M.P. Yesid Ramírez Bastidas).',
      color: '#2563eb'
    },
    candado: {
      title: '4. Candado de Latón y Pletina de Bloqueo Cervical',
      text: 'En la nuca de la víctima, dos pletinas de acero con bisagras aseguraban el cierre anatómico mediante un candado de latón macizo con arco templado. El cerrojo estaba interconectado físicamente con el lazo trampa para impedir que la víctima o su familia pudieran retirarlo manualmente.',
      citation: 'Registro forense de criminalística · Simijaca, Cundinamarca.',
      color: '#f59e0b'
    }
  };

  let isExploded = false;

  if (btnExploded) {
    btnExploded.addEventListener('click', () => {
      isExploded = true;
      svgDiagram?.classList.add('exploded');
      btnExploded.classList.add('active');
      if (btnAssembled) btnAssembled.classList.remove('active');
    });
  }

  if (btnAssembled) {
    btnAssembled.addEventListener('click', () => {
      isExploded = false;
      svgDiagram?.classList.remove('exploded');
      btnAssembled.classList.add('active');
      if (btnExploded) btnExploded.classList.remove('active');
    });
  }

  function highlightPart(partKey) {
    if (!partDetails[partKey]) return;
    const detail = partDetails[partKey];

    partBtns.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-part') === partKey));
    svgParts.forEach(svg => svg.classList.toggle('active', svg.getAttribute('data-part') === partKey));

    if (titleEl) {
      titleEl.style.opacity = '0';
      titleEl.style.transform = 'translateY(-6px)';
      setTimeout(() => {
        titleEl.textContent = detail.title;
        titleEl.style.transition = 'opacity 0.22s ease, transform 0.22s ease';
        titleEl.style.opacity = '1';
        titleEl.style.transform = 'none';
      }, 120);
    }
    if (textEl) {
      textEl.style.opacity = '0';
      setTimeout(() => {
        textEl.textContent = detail.text;
        const citEl = document.querySelector('.forensic-detail-box .detail-citation');
        if (citEl && detail.citation) citEl.textContent = detail.citation;
        textEl.style.transition = 'opacity 0.22s ease 0.04s';
        textEl.style.opacity = '1';
      }, 160);
    }
  }

  partBtns.forEach(btn => btn.addEventListener('click', () => highlightPart(btn.getAttribute('data-part'))));
  svgParts.forEach(svg => {
    svg.addEventListener('click', () => highlightPart(svg.getAttribute('data-part')));
    svg.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        highlightPart(svg.getAttribute('data-part'));
      }
    });
  });

  // Activar explosivo por defecto
  setTimeout(() => highlightPart('explosivo'), 300);
}

/* ========================================================================
   11. RUTA GEOGRÁFICA INTERACTIVA (BOYACÁ - CUNDINAMARCA)
   ======================================================================== */
function initInteractiveRouteMap() {
  const nodes = document.querySelectorAll('.interactive-map-node');
  const pills = document.querySelectorAll('.geo-pill-btn');
  const infoBox = document.getElementById('geo-info-box');

  const geoData = {
    'simijaca': {
      tag: '1. Escenario Probado del Crimen (Simijaca, Cundinamarca)',
      desc: 'Finca rural donde ocurrió la incursión de los delincuentes a las 5:00 a.m. del 15 de mayo de 2000, la colocación coercitiva del artefacto sobre doña Ana Elvia Cortés y la fatídica intervención antiexplosivos. La providencia penal 21285 de la Corte Suprema radicó allí la competencia jurisdiccional oficial (Altitud: 2.559 msnm).'
    },
    'chiquinquira': {
      tag: '2. Epicentro Asistencial y Foco Mediático (Chiquinquirá, Boyacá)',
      desc: 'Cabecera municipal a solo 15.2 km al norte por la Ruta 45A. Allí acudió el esposo de la víctima a dar aviso a la Policía y se congregaron los medios de comunicación y el hospital regional San Salvador. Por esta proximidad informativa, los titulares bautizaron popularmente el caso como «collar bomba de Chiquinquirá».'
    },
    'limite': {
      tag: '3. Zona Limítrofe Veredal (Vereda Palestina)',
      desc: 'Corredor rural interdepartamental entre Simijaca y Chiquinquirá. Las divergencias en los testimonios vecinales sobre los linderos de las fincas suscitaron confusión inicial entre despachos judiciales y coberturas de prensa, aclarada posteriormente en la sentencia de casación.'
    },
    'bogota': {
      tag: '4. Trayectoria de Evacuación Aérea (Hacia Bogotá D.C.)',
      desc: 'Tras la detonación a la 1:30 p.m., el subintendente Jairo Hernando López fue evacuado de urgencia por vía aérea hacia el Hospital Central de la Policía en Bogotá (128 km al sur). Falleció valerosamente en el trayecto debido a la gravedad de las heridas. Su hijo recién nacido lo esperaba en casa.'
    }
  };

  function selectGeoPoint(pointKey) {
    if (!geoData[pointKey]) return;
    const data = geoData[pointKey];

    // Actualizar nodos SVG
    nodes.forEach(node => {
      const p = node.getAttribute('data-point') || node.id.replace('node-', '');
      node.classList.toggle('active', p === pointKey);
    });

    // Actualizar píldoras
    pills.forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-point') === pointKey);
    });

    // Animar caja de información
    if (infoBox) {
      infoBox.style.opacity = '0';
      infoBox.style.transform = 'translateY(6px)';
      setTimeout(() => {
        infoBox.innerHTML = `
          <span class="geo-tag-badge gold">${data.tag}</span>
          <p>${data.desc}</p>
        `;
        infoBox.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        infoBox.style.opacity = '1';
        infoBox.style.transform = 'none';
      }, 120);
    }
  }

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const point = node.getAttribute('data-point') || node.id.replace('node-', '');
      selectGeoPoint(point);
    });
    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const point = node.getAttribute('data-point') || node.id.replace('node-', '');
        selectGeoPoint(point);
      }
    });
  });

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      selectGeoPoint(pill.getAttribute('data-point'));
    });
  });
}

/* ========================================================================
   12. PESTAÑAS JUDICIALES
   ======================================================================== */
function initJudicialTabs() {
  const tabBtns = document.querySelectorAll('.judicial-tab-bar .j-tab-btn');
  const panes = document.querySelectorAll('.j-tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.getAttribute('data-tab');
      panes.forEach(pane => {
        pane.style.display = pane.id === `pane-${tab}` ? 'block' : 'none';
      });
    });
  });
}

/* ========================================================================
   13. MEMORIAL CANDLE + PARTÍCULAS DE FUEGO
   ======================================================================== */
function initMemorialSanctuary() {
  const btnLight = document.getElementById('btn-light-candle');
  const counterEl = document.getElementById('candle-counter');
  const flameEl = document.getElementById('candle-flame');
  const quickPills = document.querySelectorAll('.tribute-quick-pill');
  const streamContainer = document.getElementById('tribute-cards-stream');

  if (!btnLight || !counterEl) return;

  const baseCount = 1402;
  const storedExtra = parseInt(localStorage.getItem('cb_candle_extra') || '0', 10);
  let hasLit = localStorage.getItem('cb_user_lit_candle') === 'true';

  // Animación de contador
  animateCounter(counterEl, baseCount + storedExtra, 0);

  if (hasLit) {
    btnLight.disabled = true;
    btnLight.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" width="18"><path d="M12 2c-.5 2-2 3.5-2 5.5 0 1.5 1 2.5 2 2.5s2-1 2-2.5c0-2-1.5-3.5-2-5.5zm-5 9v11h10V11H7z"/></svg><span>Luz encendida ✓</span>';
  }

  btnLight.addEventListener('click', (e) => {
    if (hasLit) return;
    hasLit = true;

    const newExtra = storedExtra + 1;
    localStorage.setItem('cb_candle_extra', newExtra.toString());
    localStorage.setItem('cb_user_lit_candle', 'true');

    // Animación del contador
    animateCounter(counterEl, baseCount + newExtra, 800);

    // Llama reactiva
    if (flameEl) {
      flameEl.style.transform = 'scale(2) rotate(-5deg)';
      flameEl.style.filter = 'brightness(1.5)';
      setTimeout(() => {
        flameEl.style.transition = 'transform 0.5s var(--ease-out), filter 0.5s ease';
        flameEl.style.transform = 'scale(1)';
        flameEl.style.filter = '';
      }, 500);
    }

    btnLight.disabled = true;
    btnLight.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" width="18"><path d="M12 2c-.5 2-2 3.5-2 5.5 0 1.5 1 2.5 2 2.5s2-1 2-2.5c0-2-1.5-3.5-2-5.5zm-5 9v11h10V11H7z"/></svg><span>Luz encendida ✓</span>';

    // RÁFAGA ÉPICA de partículas
    if (window.triggerEmberBurst) {
      const rect = btnLight.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      window.triggerEmberBurst(cx, cy, 60);

      // Ráfagas múltiples escalonadas
      setTimeout(() => window.triggerEmberBurst(cx - 20, cy, 30), 200);
      setTimeout(() => window.triggerEmberBurst(cx + 20, cy, 30), 400);
    }
  });

  quickPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const text = pill.getAttribute('data-text');
      if (!text || !streamContainer) return;

      const newCard = document.createElement('div');
      newCard.className = 't-stream-card';
      newCard.innerHTML = `
        <span class="t-stream-date">Ahora mismo</span>
        <p>«${text}»</p>
        <span class="t-stream-author">— Tu pensamiento de memoria</span>
      `;
      streamContainer.prepend(newCard);

      if (window.triggerEmberBurst) {
        const rect = pill.getBoundingClientRect();
        window.triggerEmberBurst(rect.left + rect.width / 2, rect.top, 20);
      }

      pill.disabled = true;
      pill.style.opacity = '0.5';
    });
  });
}

/* Animación de contador numérico */
function animateCounter(el, target, delay = 0) {
  if (!el) return;
  setTimeout(() => {
    const start = parseInt(el.textContent.replace(/,/g, '')) || 0;
    const duration = 1500;
    const startTime = performance.now();
    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (target - start) * eased);
      el.textContent = current.toLocaleString('es-CO');
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }, delay);
}

/* ========================================================================
   14. HEMEROTECA: BÚSQUEDA Y FILTROS
   ======================================================================== */
function initHemerotecaSearch() {
  const searchInput = document.getElementById('hemeroteca-search');
  const catPills = document.querySelectorAll('.tag-filter-pills .h-pill');
  const cards = document.querySelectorAll('#hemeroteca-cards-container .h-card');

  let activeCat = 'all';
  let searchTerm = '';

  function filterCards() {
    let visibleCount = 0;
    cards.forEach(card => {
      const cat = card.getAttribute('data-cat');
      const text = card.innerText.toLowerCase();
      const matchesCat = activeCat === 'all' || cat === activeCat;
      const matchesSearch = !searchTerm || text.includes(searchTerm);
      const visible = matchesCat && matchesSearch;

      card.style.display = visible ? '' : 'none';
      if (visible) {
        card.style.animation = 'none';
        card.offsetHeight; // Reflow
        card.style.animation = 'tabFade 0.35s ease both';
        visibleCount++;
      }
    });
  }

  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchTerm = e.target.value.toLowerCase().trim();
        filterCards();
      }, 200);
    });
  }

  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCat = pill.getAttribute('data-cat');
      filterCards();
    });
  });
}

/* ========================================================================
   15. ACORDEÓN DE REFLEXIÓN
   ======================================================================== */
function initAccordion() {
  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('active');
      const collapse = item.querySelector('.accordion-collapse');

      // Cerrar todos los demás
      document.querySelectorAll('.accordion-item').forEach(other => {
        if (other !== item && other.classList.contains('active')) {
          other.classList.remove('active');
          const otherCollapse = other.querySelector('.accordion-collapse');
          if (otherCollapse) otherCollapse.style.maxHeight = '0px';
          const otherHeader = other.querySelector('.accordion-header');
          if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
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
   16. MODAL LIGHTBOX
   ======================================================================== */
function initMediaModal() {
  const modal = document.getElementById('media-modal');
  const modalImg = document.getElementById('modal-image');
  const modalCaption = document.getElementById('modal-caption-text');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal || !modalImg) return;

  function openModal(src, alt, caption) {
    modalImg.src = '';
    modalImg.alt = alt;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const tempImg = new Image();
    tempImg.onload = () => {
      modalImg.src = src;
      if (modalCaption) modalCaption.textContent = caption || alt;
    };
    tempImg.src = src;
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    setTimeout(() => { modalImg.src = ''; }, 300);
    document.body.style.overflow = '';
  }

  const clickableImages = document.querySelectorAll(
    '.curated-thumb, .context-figure, .strip-item, .visual-debunk-frame, .h-card-img-wrap'
  );
  clickableImages.forEach(wrapper => {
    wrapper.style.cursor = 'zoom-in';
    wrapper.addEventListener('click', () => {
      const img = wrapper.querySelector('img');
      const caption = wrapper.getAttribute('data-caption') ||
                      wrapper.querySelector('figcaption')?.innerText;
      if (img) openModal(img.src, img.alt, caption);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.classList.contains('modal-backdrop')) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}

/* ========================================================================
   17. AUDIO AMBIENTAL SOLEMNE
   ======================================================================== */
function initAmbientAudio() {
  const btnToggle = document.getElementById('btn-ambient-audio');
  const waveBar = document.getElementById('audio-wave-bar');
  const muteBtn = document.getElementById('btn-audio-mute');
  const canvas = document.getElementById('soundwave-canvas');
  if (!btnToggle) return;

  let audioCtx = null, isPlaying = false, masterGain = null;
  let oscs = [], animFrameId = null;

  function startAudio() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.07, audioCtx.currentTime + 4);

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, audioCtx.currentTime);
    filter.Q.setValueAtTime(0.7, audioCtx.currentTime);

    const reverb = audioCtx.createConvolver();
    const freqs = [110, 138.6, 164.8, 220];
    oscs = freqs.map(freq => {
      const osc = audioCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      const gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0.5 / freqs.length, audioCtx.currentTime);
      osc.connect(gainNode);
      gainNode.connect(filter);
      osc.start();
      return osc;
    });

    filter.connect(masterGain);
    masterGain.connect(audioCtx.destination);
    isPlaying = true;

    btnToggle.classList.add('playing');
    updateBtnState(true);
    if (waveBar) waveBar.classList.add('visible');
    drawWave();
  }

  function stopAudio() {
    if (!isPlaying) return;
    if (masterGain) {
      masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2);
    }
    setTimeout(() => {
      oscs.forEach(osc => { try { osc.stop(); osc.disconnect(); } catch(e) {} });
      oscs = [];
      isPlaying = false;
    }, 2000);
    btnToggle.classList.remove('playing');
    updateBtnState(false);
    if (waveBar) waveBar.classList.remove('visible');
    if (animFrameId) cancelAnimationFrame(animFrameId);
  }

  function updateBtnState(playing) {
    const iconOn = btnToggle.querySelector('.icon-sound.on');
    const iconOff = btnToggle.querySelector('.icon-sound.off');
    const txt = btnToggle.querySelector('.btn-sound-text');
    if (iconOn) iconOn.style.display = playing ? 'none' : 'inline';
    if (iconOff) iconOff.style.display = playing ? 'inline' : 'none';
    if (txt) txt.textContent = playing ? 'Silenciar' : 'Voz Solemne';
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

      // Onda dorada con gradiente
      const grad = ctx2d.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, 'rgba(212,168,32,0.4)');
      grad.addColorStop(0.5, 'rgba(212,168,32,1)');
      grad.addColorStop(1, 'rgba(212,168,32,0.4)');
      ctx2d.strokeStyle = grad;
      ctx2d.shadowBlur = 6;
      ctx2d.shadowColor = '#d4a820';
      ctx2d.beginPath();
      for (let x = 0; x < w; x++) {
        const y = (h / 2) + Math.sin(x * 0.09 + t) * 7 * Math.sin(x * 0.025 + t * 0.4);
        if (x === 0) ctx2d.moveTo(x, y);
        else ctx2d.lineTo(x, y);
      }
      ctx2d.stroke();
      t += 0.05;
      animFrameId = requestAnimationFrame(render);
    }
    render();
  }

  btnToggle.addEventListener('click', () => isPlaying ? stopAudio() : startAudio());
  if (muteBtn) muteBtn.addEventListener('click', stopAudio);
}

/* ========================================================================
   18. EFECTO RIPPLE EN BOTONES
   ======================================================================== */
function initRippleEffect() {
  const rippleEls = document.querySelectorAll('.btn-primary-action, .btn-secondary-action, .btn-candle-light, .step-pill');

  rippleEls.forEach(el => {
    el.classList.add('ripple-container');
    el.addEventListener('click', (e) => {
      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top: ${e.clientY - rect.top - size / 2}px;
      `;
      el.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });
}

/* ========================================================================
   19. PARALLAX HERO
   ======================================================================== */
function initParallaxHero() {
  const heroImg = document.querySelector('.hero-bg-img');
  if (!heroImg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const heroEl = document.querySelector('.module-hero');
        if (!heroEl) { ticking = false; return; }
        const heroH = heroEl.offsetHeight;
        if (scrolled < heroH) {
          const parallaxOffset = scrolled * 0.35;
          heroImg.style.transform = `scale(1.1) translateY(${parallaxOffset}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ========================================================================
   20. CONTADORES ANIMADOS (NÚMEROS GRANDES)
   ======================================================================== */
function initCountUpAnimations() {
  const countEls = document.querySelectorAll('[data-count-up]');
  if (!countEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count-up'));
        animateCounter(el, target, 0);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  countEls.forEach(el => observer.observe(el));
}

/* ========================================================================
   21. EFECTO 3D TILT EN TARJETAS
   ======================================================================== */
function initCardTiltEffect() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cards = document.querySelectorAll('.modern-card.card-3d');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.01)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s var(--ease-out)';
      card.style.transform = '';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });
}

/* ========================================================================
   22. MARCAR IMAGEN HERO COMO CARGADA (Efecto Ken Burns)
   ======================================================================== */
function markHeroImageLoaded() {
  const heroImg = document.querySelector('.hero-bg-img');
  if (!heroImg) return;

  if (heroImg.complete) {
    heroImg.classList.add('loaded');
  } else {
    heroImg.addEventListener('load', () => heroImg.classList.add('loaded'));
  }
}
