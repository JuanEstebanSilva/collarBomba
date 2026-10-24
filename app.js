/**
 * EL CASO DEL COLLAR BOMBA: MEMORIA, VERDAD Y DIGNIDAD
 * Motor de Interactividad, Experiencia Editorial & Efectos Visuales
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initParticlesEmbers();
  initReadingProgressBar();
  initHeaderScrollSpy();
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
});

/* ==========================================================================
   1. Conmutador de Tema Claro / Oscuro (Claro por Defecto)
   ========================================================================== */
function initThemeToggle() {
  const btnTheme = document.getElementById('btn-theme-toggle');
  if (!btnTheme) return;

  const sunIcon = btnTheme.querySelector('.icon-sun');
  const moonIcon = btnTheme.querySelector('.icon-moon');
  const themeText = btnTheme.querySelector('.btn-theme-text');

  // Recuperar preferencia previa o usar claro por defecto
  const savedTheme = localStorage.getItem('cb_theme') || 'light';
  applyTheme(savedTheme);

  btnTheme.addEventListener('click', () => {
    const isDark = document.body.classList.contains('theme-dark');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('cb_theme', newTheme);
  });

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
      document.documentElement.classList.remove('theme-light');
      document.documentElement.classList.add('theme-dark');
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'inline';
      if (themeText) themeText.textContent = 'Oscuro';
    } else {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
      document.documentElement.classList.remove('theme-dark');
      document.documentElement.classList.add('theme-light');
      if (sunIcon) sunIcon.style.display = 'inline';
      if (moonIcon) moonIcon.style.display = 'none';
      if (themeText) themeText.textContent = 'Claro';
    }
  }
}

/* ==========================================================================
   2. Canvas de Partículas Doradas / Embers (Efecto Wow de Memoria)
   ========================================================================== */
let triggerEmberBurst = null;

function initParticlesEmbers() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const maxParticles = 35;

  class Particle {
    constructor(x, y, burst = false) {
      this.reset(x, y, burst);
    }

    reset(x, y, burst = false) {
      this.x = x !== undefined ? x : Math.random() * width;
      this.y = y !== undefined ? y : height + Math.random() * 20;
      this.size = Math.random() * 2.2 + 1;
      this.speedY = burst ? -(Math.random() * 3 + 2) : -(Math.random() * 0.8 + 0.3);
      this.speedX = (Math.random() - 0.5) * (burst ? 3 : 0.6);
      this.alpha = burst ? 1 : Math.random() * 0.6 + 0.2;
      this.decay = burst ? Math.random() * 0.015 + 0.008 : 0.002;
      this.goldHue = Math.floor(Math.random() * 20 + 35); // Dorados cálidos
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.alpha -= this.decay;

      if (this.alpha <= 0 || this.y < -10) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = `hsl(${this.goldHue}, 90%, 60%)`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `hsl(${this.goldHue}, 100%, 50%)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < maxParticles; i++) {
    particles.push(new Particle());
  }

  triggerEmberBurst = (originX, originY) => {
    for (let i = 0; i < 28; i++) {
      particles.push(new Particle(originX, originY, true));
    }
  };

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    // Mantener longitud estable
    if (particles.length > maxParticles + 40) {
      particles.splice(0, particles.length - maxParticles);
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   3. Barra de Progreso de Lectura
   ========================================================================== */
function initReadingProgressBar() {
  const progressBar = document.getElementById('reading-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }, { passive: true });
}

/* ==========================================================================
   4. Scroll Spy y Header
   ========================================================================== */
function initHeaderScrollSpy() {
  const header = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('.module-section');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    let currentId = '';
    const scrollPos = window.scrollY + 160;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  }, { passive: true });
}

/* ==========================================================================
   5. Menú Móvil Deslizable (Drawer)
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('btn-mobile-menu');
  const closeBtn = document.getElementById('btn-close-drawer');
  const drawer = document.getElementById('mobile-drawer');
  const navLinks = document.querySelectorAll('.drawer-nav-item');

  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   6. Tamaño de Fuente Accesible
   ========================================================================== */
function initFontSizeToggle() {
  const btnFont = document.getElementById('btn-font-size');
  if (!btnFont) return;

  if (localStorage.getItem('cb_font_size') === 'large') {
    document.body.classList.add('font-large');
  }

  btnFont.addEventListener('click', () => {
    const isLarge = document.body.classList.toggle('font-large');
    localStorage.setItem('cb_font_size', isLarge ? 'large' : 'normal');
  });
}

/* ==========================================================================
   7. Línea de Tiempo Paso a Paso (Módulo 2)
   ========================================================================== */
function initStepTimeline() {
  const stepPills = document.querySelectorAll('.timeline-step-pills .step-pill');
  const tagEl = document.getElementById('t-step-tag');
  const numEl = document.getElementById('t-step-num');
  const titleEl = document.getElementById('t-step-title');
  const descEl = document.getElementById('t-step-desc');
  const sourceEl = document.getElementById('t-step-source');
  const btnPrev = document.getElementById('btn-t-prev');
  const btnNext = document.getElementById('btn-t-next');

  const stepsData = [
    {
      step: 1,
      tag: 'MADRUGADA DEL 15 DE MAYO DE 2000',
      title: 'Invasión armada e intimidación a la vivienda rural',
      desc: 'Hombres armados irrumpen por la fuerza en la pequeña vivienda rural de Ana Elvia Cortés de Pachón y su esposo en Simijaca. Intimidan a la pareja exigiendo 15 millones de pesos en efectivo.',
      source: 'Fuente: Corte Suprema de Justicia, Sala Penal (Proceso 21285)'
    },
    {
      step: 2,
      tag: 'DURANTE LA MAÑANA DEL 15 DE MAYO',
      title: 'Colocación del artefacto explosivo artesanal',
      desc: 'Los delincuentes aseguran tres cilindros de tubo de PVC con dinamita alrededor del cuello de Cortés y activan un reloj despertador modificado. Se alerta de inmediato a las autoridades policiales.',
      source: 'Fuente: Archivo periodístico El Tiempo (2000)'
    },
    {
      step: 3,
      tag: 'MEDIODÍA · OPERATIVO POLICIAL',
      title: 'Intervención heroica del Subintendente Jairo López',
      desc: 'El técnico antiexplosivos Jairo Hernando López arriba al lugar con traje de protección. Conociendo el inmenso riesgo de la trampa anti-corte, trabaja cuerpo a cuerpo junto a la víctima intentando desactivarlo.',
      source: 'Fuente: El Espectador (Carranza Muñoz, 2016)'
    },
    {
      step: 4,
      tag: '12:45 P. M. · DETONACIÓN TRÁGICA',
      title: 'Explosión, muerte de Ana Elvia y heridas mortales a López',
      desc: 'El mecanismo trampa estalla durante la maniobra. Ana Elvia Cortés fallece en el acto. El subintendente López queda gravemente herido y fallece durante el traslado médico de emergencia.',
      source: 'Fuente: Providencia judicial CSJ 2005'
    },
    {
      step: 5,
      tag: '2001 – 2005 – 2026 · INVESTIGACIONES Y VERDAD',
      title: 'Condena judicial por delincuencia común y desmentidos',
      desc: 'La justicia condena a José Miguel Suárez a 32 años de prisión, descartando la autoría de las FARC. Investigaciones posteriores de ColombiaCheck desmienten la desinformación política.',
      source: 'Fuente: CSJ (2005) & Chequeos de ColombiaCheck y La Silla Vacía'
    }
  ];

  let currentIdx = 0;

  function renderStep(idx) {
    currentIdx = idx;
    const data = stepsData[idx];

    stepPills.forEach((pill, i) => {
      pill.classList.toggle('active', i === idx);
    });

    if (tagEl) tagEl.textContent = data.tag;
    if (numEl) numEl.textContent = `PASO ${data.step} DE ${stepsData.length}`;
    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;
    if (sourceEl) sourceEl.textContent = data.source;

    if (btnPrev) btnPrev.disabled = (idx === 0);
    if (btnNext) btnNext.disabled = (idx === stepsData.length - 1);
  }

  stepPills.forEach((pill, i) => {
    pill.addEventListener('click', () => renderStep(i));
  });

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (currentIdx > 0) renderStep(currentIdx - 1);
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (currentIdx < stepsData.length - 1) renderStep(currentIdx + 1);
    });
  }
}

/* ==========================================================================
   8. Esquema Forense con Modo Despiece (Exploded View) (Módulo 2)
   ========================================================================== */
function initForensicExplodedSchematic() {
  const container = document.getElementById('forensic-explorer');
  const btnAssembled = document.getElementById('btn-schematic-assembled');
  const btnExploded = document.getElementById('btn-schematic-exploded');
  const partBtns = document.querySelectorAll('.forensic-parts-nav .part-btn');
  const svgParts = document.querySelectorAll('.diagram-interactive-part');
  const titleEl = document.getElementById('detail-title');
  const textEl = document.getElementById('detail-text');

  const partDetails = {
    explosivo: {
      title: '1. Dinamita y Carga Explosiva Principal',
      text: 'El collar constaba de tres secciones de tubo de PVC adaptadas anatómicamente. Uno de los compartimientos alojaba cartuchos de dinamita comercial y metralla pericialmente calculada para causar daño devastador a quemarropa.'
    },
    temporizador: {
      title: '2. Reloj Temporizador y Batería',
      text: 'El segundo cilindro alojaba una batería eléctrica conectada a un reloj despertador modificado como cuenta regresiva analógica, diseñado para cerrar el circuito si expiraba el plazo extorsivo.'
    },
    trampa: {
      title: '3. Circuito Trampa de Alivio de Tensión',
      text: 'El tercer compartimiento contenía la trampa mortal: un microinterruptor sensible a la tracción que detonaba el artefacto si se intentaba cortar o abrir los tubos sin neutralizar los cables maestros.'
    },
    candado: {
      title: '4. Candado y Pasador de Cierre Mecánico',
      text: 'Un candado aseguraba los extremos de los tubos alrededor del cuello de la víctima, imposibilitando que ella o sus familiares pudieran retirarlo sin herramientas especializadas.'
    }
  };

  if (btnExploded && container) {
    btnExploded.addEventListener('click', () => {
      container.classList.add('exploded');
      btnExploded.classList.add('active');
      btnAssembled.classList.remove('active');
    });
  }

  if (btnAssembled && container) {
    btnAssembled.addEventListener('click', () => {
      container.classList.remove('exploded');
      btnAssembled.classList.add('active');
      btnExploded.classList.remove('active');
    });
  }

  function highlightPart(partKey) {
    if (!partDetails[partKey]) return;

    partBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-part') === partKey);
    });

    svgParts.forEach(svg => {
      svg.classList.toggle('active', svg.getAttribute('data-part') === partKey);
    });

    if (titleEl && textEl) {
      titleEl.textContent = partDetails[partKey].title;
      textEl.textContent = partDetails[partKey].text;
    }
  }

  partBtns.forEach(btn => {
    btn.addEventListener('click', () => highlightPart(btn.getAttribute('data-part')));
  });

  svgParts.forEach(svg => {
    svg.addEventListener('click', () => highlightPart(svg.getAttribute('data-part')));
  });
}

/* ==========================================================================
   9. Ruta Geográfica Interactiva (Módulo 2)
   ========================================================================== */
function initInteractiveRouteMap() {
  const nodes = document.querySelectorAll('.interactive-map-node');
  const infoBox = document.getElementById('geo-info-box');

  const geoData = {
    'node-simijaca': {
      tag: '1. Escenario del Crimen (Simijaca, Cundinamarca)',
      desc: 'Finca rural donde ocurrió la extorsión inicial y el despliegue del operativo policial de rescate, según el expediente judicial oficial de la Fiscalía y la Corte Suprema.'
    },
    'node-chiquinquira': {
      tag: '2. Atención Asistencial y Foco Mediático (Chiquinquirá, Boyacá)',
      desc: 'Municipio urbano más cercano donde se concentraron los medios de comunicación y el hospital regional. Por cercanía geográfica, la prensa popularizó el caso como «collar bomba de Chiquinquirá».'
    },
    'node-bogota': {
      tag: '3. Traslado Aéreo de Urgencia (Bogotá D.C.)',
      desc: 'Ruta de evacuación en helicóptero militar para trasladar a los heridos graves al Hospital Central de la Policía en la capital, donde lamentablemente el subintendente López falleció en el trayecto.'
    }
  };

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const data = geoData[node.id];
      if (data && infoBox) {
        infoBox.innerHTML = `
          <span class="geo-tag-badge gold">${data.tag}</span>
          <p>${data.desc}</p>
        `;
      }
    });
  });
}

/* ==========================================================================
   10. Pestañas Judiciales (Módulo 6)
   ========================================================================== */
function initJudicialTabs() {
  const tabBtns = document.querySelectorAll('.judicial-tab-bar .j-tab-btn');
  const panes = document.querySelectorAll('.j-tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tab = btn.getAttribute('data-tab');
      panes.forEach(pane => {
        if (pane.id === `pane-${tab}`) {
          pane.style.display = 'block';
        } else {
          pane.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   11. Santuario de Memoria & Cuaderno de Dedicatorias (Módulo 4)
   ========================================================================== */
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

  counterEl.textContent = (baseCount + storedExtra).toLocaleString();

  if (hasLit) {
    btnLight.disabled = true;
    btnLight.innerHTML = '<span>Luz encendida en tu memoria</span>';
  }

  function igniteCandle(evt) {
    const newExtra = storedExtra + 1;
    localStorage.setItem('cb_candle_extra', newExtra.toString());
    localStorage.setItem('cb_user_lit_candle', 'true');
    counterEl.textContent = (baseCount + newExtra).toLocaleString();

    if (flameEl) {
      flameEl.style.transform = 'scale(1.5)';
      setTimeout(() => { flameEl.style.transform = 'scale(1)'; }, 700);
    }

    btnLight.disabled = true;
    btnLight.innerHTML = '<span>Luz encendida en tu memoria</span>';

    // Ráfaga de partículas doradas en el punto de clic
    if (triggerEmberBurst) {
      const rect = btnLight.getBoundingClientRect();
      triggerEmberBurst(rect.left + rect.width / 2, rect.top);
    }
  }

  btnLight.addEventListener('click', igniteCandle);

  // Agregar pensamientos al cuaderno de respeto
  quickPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      const text = pill.getAttribute('data-text');
      if (!text || !streamContainer) return;

      const newCard = document.createElement('div');
      newCard.className = 't-stream-card';
      newCard.innerHTML = `
        <span class="t-stream-date">Ahora mismo</span>
        <p>«${text}»</p>
        <span class="t-stream-author">— Tu pensamiento por la memoria</span>
      `;
      streamContainer.prepend(newCard);

      // Partículas al dejar pensamiento
      if (triggerEmberBurst) {
        const rect = pill.getBoundingClientRect();
        triggerEmberBurst(rect.left + rect.width / 2, rect.top);
      }

      pill.disabled = true;
      pill.style.opacity = '0.6';
    });
  });
}

/* ==========================================================================
   12. Buscador y Filtro de la Hemeroteca Digital (Módulo 5)
   ========================================================================== */
function initHemerotecaSearch() {
  const searchInput = document.getElementById('hemeroteca-search');
  const catPills = document.querySelectorAll('.tag-filter-pills .h-pill');
  const cards = document.querySelectorAll('#hemeroteca-cards-container .h-card');

  let activeCat = 'all';
  let searchTerm = '';

  function filterCards() {
    cards.forEach(card => {
      const cat = card.getAttribute('data-cat');
      const text = card.innerText.toLowerCase();
      const matchesCat = (activeCat === 'all' || cat === activeCat);
      const matchesSearch = (!searchTerm || text.includes(searchTerm));

      card.style.display = (matchesCat && matchesSearch) ? 'flex' : 'none';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase().trim();
      filterCards();
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

/* ==========================================================================
   13. Acordeón de Preguntas Reflexivas (Módulo 7)
   ========================================================================== */
function initAccordion() {
  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('active');
      const collapse = item.querySelector('.accordion-collapse');

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
        if (collapse) collapse.style.maxHeight = `${collapse.scrollHeight + 24}px`;
      } else {
        item.classList.remove('active');
        header.setAttribute('aria-expanded', 'false');
        if (collapse) collapse.style.maxHeight = '0px';
      }
    });
  });
}

/* ==========================================================================
   14. Modal / Lightbox de Documentos e Imágenes
   ========================================================================== */
function initMediaModal() {
  const modal = document.getElementById('media-modal');
  const modalImg = document.getElementById('modal-image');
  const modalCaption = document.getElementById('modal-caption-text');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal || !modalImg) return;

  function openModal(src, alt, caption) {
    modalImg.src = src;
    modalImg.alt = alt;
    modalCaption.textContent = caption || alt;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    modalImg.src = '';
    document.body.style.overflow = '';
  }

  const clickableImages = document.querySelectorAll('.curated-thumb, .context-figure, .strip-item, .visual-debunk-frame');
  clickableImages.forEach(wrapper => {
    wrapper.style.cursor = 'zoom-in';
    wrapper.addEventListener('click', () => {
      const img = wrapper.querySelector('img');
      const caption = wrapper.getAttribute('data-caption') || wrapper.querySelector('figcaption')?.innerText;
      if (img) openModal(img.src, img.alt, caption);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-backdrop')) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}

/* ==========================================================================
   15. Generador Acústico Solemne Ambiental (Web Audio API)
   ========================================================================== */
function initAmbientAudio() {
  const btnToggle = document.getElementById('btn-ambient-audio');
  const waveBar = document.getElementById('audio-wave-bar');
  const muteBtn = document.getElementById('btn-audio-mute');
  const canvas = document.getElementById('soundwave-canvas');
  if (!btnToggle) return;

  let audioCtx = null;
  let isPlaying = false;
  let masterGain = null;
  let osc1 = null;
  let osc2 = null;
  let animFrameId = null;

  function startAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 3);

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, audioCtx.currentTime);

    osc1 = audioCtx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(110, audioCtx.currentTime); // La (A2)

    osc2 = audioCtx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(164.8, audioCtx.currentTime); // Mi (E3)

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    osc1.start();
    osc2.start();

    isPlaying = true;
    btnToggle.classList.add('playing');
    const iconOn = btnToggle.querySelector('.icon-sound.on');
    const iconOff = btnToggle.querySelector('.icon-sound.off');
    if (iconOn && iconOff) { iconOn.style.display = 'none'; iconOff.style.display = 'inline'; }
    const txt = btnToggle.querySelector('.btn-sound-text');
    if (txt) txt.textContent = 'Silenciar';

    if (waveBar) waveBar.classList.add('visible');
    drawWave();
  }

  function stopAudio() {
    if (!audioCtx || !isPlaying) return;

    if (masterGain) {
      masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.5);
    }

    setTimeout(() => {
      if (osc1) { osc1.stop(); osc1.disconnect(); }
      if (osc2) { osc2.stop(); osc2.disconnect(); }
      isPlaying = false;
    }, 1500);

    btnToggle.classList.remove('playing');
    const iconOn = btnToggle.querySelector('.icon-sound.on');
    const iconOff = btnToggle.querySelector('.icon-sound.off');
    if (iconOn && iconOff) { iconOn.style.display = 'inline'; iconOff.style.display = 'none'; }
    const txt = btnToggle.querySelector('.btn-sound-text');
    if (txt) txt.textContent = 'Voz Solemne';

    if (waveBar) waveBar.classList.remove('visible');
    if (animFrameId) cancelAnimationFrame(animFrameId);
  }

  function drawWave() {
    if (!canvas || !isPlaying) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    let t = Date.now() * 0.003;

    function render() {
      if (!isPlaying) return;
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#c49219';
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const y = (h / 2) + Math.sin(x * 0.08 + t) * 6 * Math.sin(x * 0.03 + t * 0.5);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      t += 0.04;
      animFrameId = requestAnimationFrame(render);
    }
    render();
  }

  btnToggle.addEventListener('click', () => {
    if (!isPlaying) startAudio();
    else stopAudio();
  });

  if (muteBtn) muteBtn.addEventListener('click', stopAudio);
}
