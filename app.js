/**
 * EL CASO DEL COLLAR BOMBA: MEMORIA, VERDAD Y DIGNIDAD
 * Motor de Interactividad, Accesibilidad y Experiencia Editorial
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicialización de submódulos
  initReadingProgressBar();
  initHeaderScrollSpy();
  initMobileDrawer();
  initFontSizeToggle();
  initTimelineFilters();
  initForensicSchematic();
  initInteractiveMap();
  initHemerotecaSearch();
  initMemorialCandle();
  initAccordion();
  initMediaModal();
  initAmbientAudio();
});

/* ==========================================================================
   1. Barra de Progreso de Lectura
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
   2. Scroll Spy y Header Dinámico
   ========================================================================== */
function initHeaderScrollSpy() {
  const header = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('.module-section');

  window.addEventListener('scroll', () => {
    // Sombra del header al hacer scroll
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Identificar sección visible
    let currentId = '';
    const scrollPos = window.scrollY + 180;

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
   3. Menú Móvil Deslizable (Drawer)
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
   4. Conmutador de Tamaño de Fuente (Accesibilidad)
   ========================================================================== */
function initFontSizeToggle() {
  const btnFont = document.getElementById('btn-font-size');
  if (!btnFont) return;

  // Cargar estado previo
  if (localStorage.getItem('cb_font_size') === 'large') {
    document.body.classList.add('font-large');
  }

  btnFont.addEventListener('click', () => {
    const isLarge = document.body.classList.toggle('font-large');
    localStorage.setItem('cb_font_size', isLarge ? 'large' : 'normal');
    btnFont.title = isLarge ? 'Volver a tamaño estándar' : 'Aumentar tamaño de texto';
  });
}

/* ==========================================================================
   5. Filtros de la Línea de Tiempo (Módulo 2)
   ========================================================================== */
function initTimelineFilters() {
  const filterBtns = document.querySelectorAll('.t-filter');
  const events = document.querySelectorAll('.timeline-event');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      events.forEach(evt => {
        const stage = evt.getAttribute('data-stage');
        if (filter === 'all' || stage === filter) {
          evt.classList.remove('hidden');
          evt.style.opacity = '0';
          setTimeout(() => {
            evt.style.opacity = '1';
          }, 50);
        } else {
          evt.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   6. Esquema Forense Documental Interactivo (Módulo 2)
   ========================================================================== */
function initForensicSchematic() {
  const partButtons = document.querySelectorAll('.forensic-parts-nav .part-btn');
  const svgParts = document.querySelectorAll('.diagram-part');
  const titleEl = document.getElementById('detail-title');
  const textEl = document.getElementById('detail-text');

  const forensicData = {
    explosivo: {
      title: '1. Carga Explosiva (Tubo de PVC)',
      text: 'El artefacto constaba de tres secciones de tubo de PVC acopladas en semicírculo para rodear el cuello. Uno de los cilindros contenía dinamita y metralla, con suficiente poder destructivo letal a quemarropa.',
      stroke: '#c0392b'
    },
    temporizador: {
      title: '2. Temporizador y Fuente de Alimentación',
      text: 'El segundo cilindro contenía una batería conectada a un reloj despertador modificado como cuenta regresiva analógica, programado para cerrar el circuito si expiraba el plazo extorsivo.',
      stroke: '#d4af37'
    },
    trampa: {
      title: '3. Circuito Trampa Anti-manipulación',
      text: 'El dispositivo incorporaba un sistema trampa (alivio de tensión): si se intentaba cortar o abrir los cierres mecánicos sin neutralizar previamente los cables maestros, el percutor detonaba de inmediato.',
      stroke: '#2980b9'
    },
    candado: {
      title: '4. Mecanismo de Cierre de Seguridad',
      text: 'Un candado y pasador metálico fijaban los tubos alrededor del cuello de la víctima, impidiendo cualquier intento de retirarlo manualmente sin intervención de cerrajería especializada.',
      stroke: '#8c7853'
    }
  };

  function selectPart(partKey) {
    if (!forensicData[partKey]) return;

    // Actualizar botones
    partButtons.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-part') === partKey);
    });

    // Actualizar SVG
    svgParts.forEach(svgPart => {
      svgPart.classList.toggle('active', svgPart.getAttribute('data-part') === partKey);
    });

    // Actualizar texto explicativo
    if (titleEl && textEl) {
      titleEl.textContent = forensicData[partKey].title;
      textEl.textContent = forensicData[partKey].text;
    }
  }

  partButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      selectPart(btn.getAttribute('data-part'));
    });
  });

  svgParts.forEach(part => {
    part.addEventListener('click', () => {
      selectPart(part.getAttribute('data-part'));
    });
  });
}

/* ==========================================================================
   7. Mapa Cartográfico Interactivo (Módulo 2)
   ========================================================================== */
function initInteractiveMap() {
  const points = document.querySelectorAll('.map-point');
  points.forEach(pt => {
    pt.addEventListener('mouseenter', () => {
      pt.style.cursor = 'pointer';
      pt.style.transform = `${pt.getAttribute('transform')} scale(1.15)`;
    });
    pt.addEventListener('mouseleave', () => {
      pt.style.transform = pt.getAttribute('transform');
    });
  });
}

/* ==========================================================================
   8. Buscador y Filtro de la Hemeroteca Digital (Módulo 5)
   ========================================================================== */
function initHemerotecaSearch() {
  const searchInput = document.getElementById('hemeroteca-search');
  const catPills = document.querySelectorAll('.tag-filter-pills .h-pill');
  const cards = document.querySelectorAll('#hemeroteca-cards-container .h-card');

  let activeCategory = 'all';
  let searchTerm = '';

  function filterCards() {
    cards.forEach(card => {
      const cardCat = card.getAttribute('data-cat');
      const textContent = card.innerText.toLowerCase();

      const matchesCat = (activeCategory === 'all' || cardCat === activeCategory);
      const matchesSearch = (!searchTerm || textContent.includes(searchTerm));

      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
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
      activeCategory = pill.getAttribute('data-cat');
      filterCards();
    });
  });
}

/* ==========================================================================
   9. Vela de Memoria Interactiva (Módulo 4)
   ========================================================================== */
function initMemorialCandle() {
  const btnLight = document.getElementById('btn-light-candle');
  const counterEl = document.getElementById('candle-counter');
  const feedbackEl = document.getElementById('candle-feedback');
  const flameEl = document.getElementById('candle-flame');

  if (!btnLight || !counterEl) return;

  const baseCount = 1402;
  const storedExtra = parseInt(localStorage.getItem('cb_candle_extra') || '0', 10);
  let hasLit = localStorage.getItem('cb_user_lit_candle') === 'true';

  counterEl.textContent = (baseCount + storedExtra).toLocaleString();

  if (hasLit) {
    btnLight.disabled = true;
    btnLight.style.opacity = '0.75';
    btnLight.innerHTML = '<span>Luz encendida en tu memoria</span>';
    if (feedbackEl) feedbackEl.style.display = 'block';
  }

  btnLight.addEventListener('click', () => {
    if (hasLit) return;

    hasLit = true;
    const newExtra = storedExtra + 1;
    localStorage.setItem('cb_candle_extra', newExtra.toString());
    localStorage.setItem('cb_user_lit_candle', 'true');

    counterEl.textContent = (baseCount + newExtra).toLocaleString();

    // Animación de llama brillante
    if (flameEl) {
      flameEl.style.transform = 'scale(1.4)';
      setTimeout(() => {
        flameEl.style.transform = 'scale(1)';
      }, 600);
    }

    btnLight.disabled = true;
    btnLight.style.opacity = '0.75';
    btnLight.innerHTML = '<span>Luz encendida en tu memoria</span>';
    if (feedbackEl) {
      feedbackEl.style.display = 'block';
      feedbackEl.style.animation = 'fadeIn 0.5s ease-out';
    }
  });
}

/* ==========================================================================
   10. Acordeón de Preguntas Reflexivas (Módulo 7)
   ========================================================================== */
function initAccordion() {
  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('active');
      const collapse = item.querySelector('.accordion-collapse');

      // Cerrar otros acordeones abiertos
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
        if (collapse) {
          collapse.style.maxHeight = `${collapse.scrollHeight + 30}px`;
        }
      } else {
        item.classList.remove('active');
        header.setAttribute('aria-expanded', 'false');
        if (collapse) {
          collapse.style.maxHeight = '0px';
        }
      }
    });
  });
}

/* ==========================================================================
   11. Modal / Lightbox de Documentos e Imágenes
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

  // Activar en figuras y fotos clickables
  const clickableImages = document.querySelectorAll('.curated-thumb, .context-figure, .strip-item, .visual-debunk-frame');
  clickableImages.forEach(wrapper => {
    wrapper.style.cursor = 'zoom-in';
    wrapper.addEventListener('click', () => {
      const img = wrapper.querySelector('img');
      const caption = wrapper.getAttribute('data-caption') || wrapper.querySelector('figcaption')?.innerText;
      if (img) {
        openModal(img.src, img.alt, caption);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   12. Generador Acústico Solemne Ambiental (Web Audio API)
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

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Ganancia maestra con rampa suave
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 3);

    // Filtro pasa-bajas para un sonido cálido y contemplativo
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(260, audioCtx.currentTime);

    // Oscilador 1: fundamental solemne en La (110 Hz / A2)
    osc1 = audioCtx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(110, audioCtx.currentTime);

    // Oscilador 2: quinta justa contemplativa (164.8 Hz / E3 ligeramente desafinado para textura cálida)
    osc2 = audioCtx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(164.8, audioCtx.currentTime);

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
    if (iconOn && iconOff) {
      iconOn.style.display = 'none';
      iconOff.style.display = 'inline';
    }
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
    if (iconOn && iconOff) {
      iconOn.style.display = 'inline';
      iconOff.style.display = 'none';
    }
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
      ctx.strokeStyle = '#d4af37';
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

  if (muteBtn) {
    muteBtn.addEventListener('click', stopAudio);
  }
}
