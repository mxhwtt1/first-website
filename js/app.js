/* ─────────────────────────────────────────────
   Hack Your Body: Fact vs Myth — app.js
───────────────────────────────────────────── */

// ─── Myth data (embedded for local-file compatibility) ───────
const MYTHS_DATA = [];

// ─── All unique tags ──────────────────────────────────────────
const ALL_TAGS = [];

// ─── State ────────────────────────────────────────────────────
let activeTag    = null;
let searchQuery  = '';

// ─── Build a myth card HTML string ───────────────────────────
function buildCard(myth) {
  const tagChips = myth.tags
    .map(t => `<span class="tag-chip">${t}</span>`)
    .join('');

  const evidenceItems = myth.evidence
    .map(e => `<li>${e}</li>`)
    .join('');

  return `
    <article class="myth-card" data-id="${myth.id}" data-tags="${myth.tags.join(',')}">
      <div class="card-myth">
        <span class="label label-myth">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          Myth
        </span>
        <p>${myth.myth}</p>
      </div>
      <div class="card-fact">
        <span class="label label-fact">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M1.5 5l3 3 4-5.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Fact
        </span>
        <p>${myth.fact}</p>
        <div class="card-detail" aria-hidden="true">
          <div class="detail-item">
            <strong>Why this matters</strong>
            ${myth.whyMatters}
          </div>
          <div class="detail-item">
            <strong>What to do next</strong>
            ${myth.whatToDo}
          </div>
          <div>
            <button class="evidence-toggle" aria-expanded="false">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/>
                <path d="M12 8v4M12 16h.01"/>
              </svg>
              View evidence
              <svg class="chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            <div class="evidence-content" role="region" aria-label="Evidence citations">
              <ul>${evidenceItems}</ul>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">${tagChips}</div>
    </article>`;
}

// ─── Filter myths ─────────────────────────────────────────────
function getFiltered() {
  return MYTHS_DATA.filter(m => {
    const matchesTag   = !activeTag || m.tags.includes(activeTag);
    const searchable   = (m.myth + ' ' + m.fact + ' ' + m.tags.join(' ')).toLowerCase();
    const matchesSearch = !searchQuery || searchable.includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });
}

// ─── Render cards into a grid element ────────────────────────
function renderCards(container, myths) {
  if (!container) return;
  if (myths.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
        </svg>
        <h3>No myths found</h3>
        <p>Try a different search term or clear your filter.</p>
      </div>`;
    return;
  }
  container.innerHTML = myths.map(buildCard).join('');
  attachCardEvents(container);
}

// ─── Attach per-card events ───────────────────────────────────
function attachCardEvents(container) {
  container.querySelectorAll('.evidence-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      content.classList.toggle('open', !expanded);
    });
  });
}


// ─── Tag filter buttons ───────────────────────────────────────
function buildTagFilters(container, onFilterChange) {
  if (!container) return;
  const allBtn = `<button class="tag-filter-btn active" data-tag="">All</button>`;
  const tagBtns = ALL_TAGS.map(t =>
    `<button class="tag-filter-btn" data-tag="${t}">${t}</button>`
  ).join('');
  container.innerHTML = allBtn + tagBtns;

  container.querySelectorAll('.tag-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.tag-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTag = btn.dataset.tag || null;
      onFilterChange();
    });
  });
}

// ─── Search input ─────────────────────────────────────────────
function initSearch(inputId, onSearch) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.addEventListener('input', () => {
    searchQuery = input.value.trim();
    onSearch();
  });
}


// ─── FAQ accordion ────────────────────────────────────────────
function initFaqAccordions() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      // Close all
      document.querySelectorAll('.faq-question').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        b.nextElementSibling.classList.remove('open');
      });
      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });
}

// ─── Share button ─────────────────────────────────────────────
function initShareBtn() {
  document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        btn.classList.add('copied');
        btn.textContent = 'Link copied!';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/>
            </svg>
            Share this page`;
        }, 2000);
      });
    });
  });
}

// ─── Mark active nav link ────────────────────────────────────
function markActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-header nav a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ─── Homepage init ────────────────────────────────────────────
function initHomepage() {
  const grid = document.getElementById('featured-grid');
  const tagStrip = document.getElementById('hero-tag-strip');
  if (!grid) return;

  const update = () => {
    const filtered = getFiltered().slice(0, 6);
    renderCards(grid, filtered);
  };

  buildTagFilters(tagStrip, update);
  initSearch('search-input', update);
  update();
}

// ─── Library page init ───────────────────────────────────────
function initLibrary() {
  const grid = document.getElementById('library-grid');
  const tagStrip = document.getElementById('lib-tag-strip');
  const countEl = document.getElementById('result-count');
  if (!grid) return;

  const update = () => {
    const filtered = getFiltered();
    if (countEl) countEl.textContent = `${filtered.length} myth${filtered.length !== 1 ? 's' : ''}`;
    renderCards(grid, filtered);
  };

  buildTagFilters(tagStrip, update);
  initSearch('search-input', update);
  update();
}


// ─── Abbreviation tap toggles (mobile) ───────────────────────
function initAbbrExpanders() {
  const items = document.querySelectorAll('.abbr-item');
  items.forEach(item => {
    let lastTouch = 0;
    function toggle() {
      const isOpen = item.classList.contains('tapped');
      items.forEach(i => i.classList.remove('tapped'));
      if (!isOpen) item.classList.add('tapped');
    }
    item.addEventListener('touchend', e => {
      e.preventDefault();
      lastTouch = Date.now();
      toggle();
    });
    item.addEventListener('click', () => {
      if (Date.now() - lastTouch < 500) return;
      toggle();
    });
  });
}

// ─── Carousel rows ────────────────────────────────────────────
function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach(row => {
    const track   = row.querySelector('.carousel-track');
    const cards   = track.querySelectorAll('.nav-hub-card');
    const prevBtn = row.querySelector('.carousel-prev');
    const nextBtn = row.querySelector('.carousel-next');
    const visible = window.innerWidth <= 700 ? 1 : 3;
    let index = 0;
    const max = Math.max(0, cards.length - visible);

    function update() {
      const cardW = cards[0].getBoundingClientRect().width;
      const gap   = 20;
      track.style.transform = `translateX(-${index * (cardW + gap)}px)`;
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index >= max;
    }

    prevBtn.addEventListener('click', () => { if (index > 0)   { index--; update(); } });
    nextBtn.addEventListener('click', () => { if (index < max) { index++; update(); } });
    window.addEventListener('resize', update);
    update();
  });
}

// ─── Hamburger slide-out menu ─────────────────────────────────
function initHamburgerMenu() {
  const header = document.querySelector('.site-header .container');
  if (!header) return;

  const page = window.location.pathname.split('/').pop() || 'index.html';

  // Build burger button
  const burger = document.createElement('button');
  burger.className = 'burger-btn';
  burger.setAttribute('aria-label', 'Open menu');
  burger.setAttribute('aria-expanded', 'false');
  burger.innerHTML = '<span></span><span></span><span></span>';
  header.appendChild(burger);

  // Build backdrop
  const backdrop = document.createElement('div');
  backdrop.className = 'menu-backdrop';
  document.body.appendChild(backdrop);

  // Build slide-out menu
  const menu = document.createElement('nav');
  menu.className = 'slide-menu';
  menu.setAttribute('aria-label', 'Site menu');
  menu.innerHTML = `
    <div class="slide-menu-header">
      <span class="slide-menu-title">Menu</span>
      <button class="slide-menu-close" aria-label="Close menu">&#10005;</button>
    </div>

    <div class="menu-section">
      <div class="menu-section-label">Home</div>
      <a href="index.html" class="menu-link ${page === 'index.html' || page === '' ? 'active' : ''}">
        <span class="menu-link-icon">🏠</span> Home
      </a>
    </div>

    <div class="menu-divider"></div>

    <div class="menu-section">
      <div class="menu-section-label">Games</div>
      <a href="game.html" class="menu-link ${page === 'game.html' ? 'active' : ''}">
        <span class="menu-link-icon">🚀</span> Asteroid Blaster
      </a>
      <a href="minesweeper.html" class="menu-link ${page === 'minesweeper.html' ? 'active' : ''}">
        <span class="menu-link-icon">💣</span> Myth Sweeper
      </a>
    </div>

    <div class="menu-divider"></div>

    <div class="menu-section">
      <div class="menu-section-label">Revision</div>
      <a href="practice.html" class="menu-link ${page === 'practice.html' ? 'active' : ''}">
        <span class="menu-link-icon">📇</span> Practice Flashcards
      </a>
      <a href="faq.html" class="menu-link ${page === 'faq.html' ? 'active' : ''}">
        <span class="menu-link-icon">❓</span> FAQ
      </a>
    </div>

    <div class="menu-divider"></div>

    <div class="menu-section">
      <div class="menu-section-label">Techniques</div>
      <a href="pnf.html" class="menu-link ${page === 'pnf.html' ? 'active' : ''}">
        <span class="menu-link-icon">🤸</span> PNF Stretching
      </a>
      <a href="pap.html" class="menu-link ${page === 'pap.html' ? 'active' : ''}">
        <span class="menu-link-icon">💪</span> Post-Activation Potentiation
      </a>
      <a href="ems.html" class="menu-link ${page === 'ems.html' ? 'active' : ''}">
        <span class="menu-link-icon">⚡</span> Electrical Muscle Stimulation
      </a>
    </div>

    <div class="menu-divider"></div>

    <div class="menu-section">
      <div class="menu-section-label">Info</div>
      <a href="about.html" class="menu-link ${page === 'about.html' ? 'active' : ''}">
        <span class="menu-link-icon">ℹ️</span> About the Programme
      </a>
      <a href="contact.html" class="menu-link ${page === 'contact.html' ? 'active' : ''}">
        <span class="menu-link-icon">📞</span> Contact &amp; Referral
      </a>
    </div>`;
  document.body.appendChild(menu);

  function openMenu() {
    menu.classList.add('open');
    backdrop.classList.add('open');
    burger.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    menu.classList.remove('open');
    backdrop.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }

  burger.addEventListener('click', () => menu.classList.contains('open') ? closeMenu() : openMenu());
  backdrop.addEventListener('click', closeMenu);
  menu.querySelector('.slide-menu-close').addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
}

// ─── Mobile nav toggle ────────────────────────────────────────
function initMobileNavToggle() {
  const nav = document.querySelector('.mobile-nav');
  if (!nav) return;
  const btn = document.createElement('button');
  btn.className = 'mobile-nav-toggle';
  btn.setAttribute('aria-label', 'Toggle navigation bar');
  const chevron = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>`;
  btn.innerHTML = chevron + `<span>Hide nav</span>`;
  document.body.appendChild(btn);
  btn.addEventListener('click', () => {
    const hidden = nav.classList.toggle('hidden');
    btn.classList.toggle('nav-hidden', hidden);
    btn.querySelector('span').textContent = hidden ? 'Show nav' : 'Hide nav';
  });
}

// ─── Boot ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  markActiveNav();
  initFaqAccordions();
  initShareBtn();
  initAbbrExpanders();
  initCarousels();
  initMobileNavToggle();
  initHamburgerMenu();

  const page = window.location.pathname.split('/').pop() || 'index.html';
  if (page === '' || page === 'index.html') initHomepage();
  if (page === 'library.html') initLibrary();
});
