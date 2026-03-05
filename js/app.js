/* ─────────────────────────────────────────────
   Hack Your Body: Fact vs Myth — app.js
───────────────────────────────────────────── */

// ─── Myth data (embedded for local-file compatibility) ───────
const MYTHS_DATA = [
  {
    id: 1,
    myth: "Exercising after a heart attack is too risky and could cause another one.",
    fact: "Supervised exercise in cardiac rehab is safe and is one of the most effective treatments after a heart attack. Your team monitors you closely at every session.",
    whyMatters: "People who complete CR are significantly less likely to be re-admitted to hospital or die from heart disease.",
    whatToDo: "Attend your CR assessment and let the team guide you — they will start you at exactly the right level.",
    tags: ["Exercise safety"],
    evidence: [
      "Anderson, L. et al. (2016) 'Exercise-based cardiac rehabilitation for coronary heart disease', Cochrane Database of Systematic Reviews, Issue 1. doi:10.1002/14651858.CD001800.pub3.",
      "NICE (2020) Cardiac rehabilitation for adults: NG185. London: National Institute for Health and Care Excellence."
    ]
  },
  {
    id: 2,
    myth: "I need to be fit and active before I can start cardiac rehab.",
    fact: "CR starts at whatever level you are at right now. The programme is designed for people who have just had a heart event — no fitness required.",
    whyMatters: "Starting slowly and building gradually is the whole point of CR. You will never be pushed beyond what is safe for you.",
    whatToDo: "Book your first appointment — the team will assess you on the day and tailor everything to your current ability.",
    tags: ["Getting started", "Exercise safety"],
    evidence: [
      "NICE (2013) MI — Secondary prevention: CG172. London: National Institute for Health and Care Excellence.",
      "Anderson, L. et al. (2016) 'Exercise-based cardiac rehabilitation for coronary heart disease', Cochrane Database of Systematic Reviews, Issue 1."
    ]
  },
  {
    id: 3,
    myth: "If I miss a few sessions, the whole programme is pointless and I should give up.",
    fact: "Every session you attend has real benefit. Research shows even partial attendance improves outcomes. Life gets in the way — the team understand.",
    whyMatters: "Partial engagement is far better than no engagement. Missing sessions does not cancel out the progress you have made.",
    whatToDo: "Contact your CR team if you have missed sessions — you can often re-join or catch up without starting from scratch.",
    tags: ["Attendance"],
    evidence: [
      "Doll, J.A. et al. (2015) 'Completion of cardiac rehabilitation and long-term mortality', European Journal of Preventive Cardiology, 22(8), pp.1033–1040.",
      "Anderson, L. et al. (2016) Cochrane Database of Systematic Reviews, Issue 1."
    ]
  },
  {
    id: 4,
    myth: "Cardiac rehab is only for people who have had a heart attack.",
    fact: "CR is offered to people with a wide range of heart conditions — including heart failure, angina, valve surgery, and after procedures like angioplasty.",
    whyMatters: "The benefits of structured exercise, education, and support apply to many cardiac conditions, not just heart attacks.",
    whatToDo: "Ask your GP or cardiologist whether CR is suitable for your specific diagnosis — the answer is often yes.",
    tags: ["Getting started"],
    evidence: [
      "NICE (2020) Cardiac rehabilitation for adults: NG185. London: National Institute for Health and Care Excellence.",
      "British Association for Cardiovascular Prevention and Rehabilitation (2017) BACPR Standards and Core Components. 3rd edn. London: BACPR."
    ]
  },
  {
    id: 5,
    myth: "At my age, exercise won't make any real difference to my heart.",
    fact: "Older adults benefit just as much — sometimes more — from CR than younger people. Age is not a barrier to rehabilitation.",
    whyMatters: "Studies consistently show CR reduces hospital admissions and improves quality of life regardless of age.",
    whatToDo: "Attend your referral appointment and share any concerns with the team — they have experience supporting people of all ages.",
    tags: ["Exercise safety"],
    evidence: [
      "Balady, G.J. et al. (2011) 'Referral, enrolment, and delivery of cardiac rehabilitation', Circulation, 124(21), pp.2951–2960.",
      "Anderson, L. et al. (2016) Cochrane Database of Systematic Reviews, Issue 1."
    ]
  },
  {
    id: 6,
    myth: "Cardiac rehab is just about resting and taking it easy.",
    fact: "CR includes structured, supervised exercise sessions as well as education about your condition and emotional support. You will be active.",
    whyMatters: "The exercise component is one of the most powerful parts of CR — it strengthens your heart and reduces future risk.",
    whatToDo: "Come prepared to be active — wear comfortable clothing and trainers to your sessions.",
    tags: ["Getting started", "Exercise safety"],
    evidence: [
      "Anderson, L. et al. (2016) 'Exercise-based cardiac rehabilitation for coronary heart disease', Cochrane Database of Systematic Reviews, Issue 1.",
      "NICE (2020) Cardiac rehabilitation for adults: NG185."
    ]
  },
  {
    id: 7,
    myth: "My heart is too weak or damaged — exercise will only make things worse.",
    fact: "Even people with significant heart damage benefit from supervised exercise. Your programme is carefully tailored to your individual test results.",
    whyMatters: "Exercise training helps the heart and blood vessels adapt and become more efficient over time, even after serious events.",
    whatToDo: "Talk to your CR physiotherapist about your specific diagnosis and any concerns — they will adjust your programme accordingly.",
    tags: ["Exercise safety"],
    evidence: [
      "Taylor, R.S. et al. (2014) 'Exercise-based rehabilitation for heart failure', European Heart Journal, 35(33), pp.2213–2221.",
      "NICE (2020) Cardiac rehabilitation for adults: NG185."
    ]
  },
  {
    id: 8,
    myth: "Because I take heart medication like beta-blockers, I shouldn't exercise.",
    fact: "Most heart medications are safe alongside exercise. Beta-blockers may lower your maximum heart rate, but the CR team knows how to account for this.",
    whyMatters: "Exercise and medication together give the best results. Neither replaces the other.",
    whatToDo: "Bring your full medication list to your first CR appointment so the team can plan your sessions safely.",
    tags: ["Medication", "Exercise safety"],
    evidence: [
      "NICE (2020) Cardiac rehabilitation for adults: NG185. London: National Institute for Health and Care Excellence.",
      "NICE (2013) MI — Secondary prevention: CG172."
    ]
  },
  {
    id: 9,
    myth: "Stress and anxiety are just mental problems — they don't affect my heart.",
    fact: "Chronic stress and anxiety are recognised risk factors for heart disease and can significantly slow recovery after a cardiac event.",
    whyMatters: "CR programmes include psychological support specifically because mental wellbeing directly affects heart health.",
    whatToDo: "Tell your CR team how you are feeling emotionally — they are trained to help and will not judge you.",
    tags: ["Anxiety", "Mental health"],
    evidence: [
      "Pogosova, N. et al. (2015) 'Psychosocial aspects in cardiac rehabilitation', European Journal of Preventive Cardiology, 22(10), pp.1290–1306.",
      "NICE (2020) Cardiac rehabilitation for adults: NG185."
    ]
  },
  {
    id: 10,
    myth: "Once I feel back to normal, I can reduce or stop my heart medication.",
    fact: "Feeling well is often a sign that your medication is working — not that you no longer need it. Never stop or reduce without medical advice.",
    whyMatters: "Stopping medication suddenly can be dangerous and significantly increase your risk of another heart event.",
    whatToDo: "If you have questions about your medication, speak to your GP or pharmacist — never adjust doses yourself.",
    tags: ["Medication"],
    evidence: [
      "NICE (2013) MI — Secondary prevention: CG172. London: National Institute for Health and Care Excellence.",
      "British Heart Foundation (2022) Medicines after a heart attack. London: BHF."
    ]
  },
  {
    id: 11,
    myth: "I had a stent fitted, so my heart is fixed and I don't need cardiac rehab.",
    fact: "A stent opens a blocked artery but does not treat the underlying heart disease. CR helps address the causes and prevents future events.",
    whyMatters: "People who attend CR after a stent procedure have significantly lower risk of another cardiac event.",
    whatToDo: "Ask your cardiologist to refer you to CR, even if they haven't already mentioned it — it is recommended for most stent patients.",
    tags: ["Getting started"],
    evidence: [
      "NICE (2020) Cardiac rehabilitation for adults: NG185. London: National Institute for Health and Care Excellence.",
      "Jolliffe, J.A. et al. (2017) 'Exercise-based rehabilitation for coronary heart disease', Cochrane Database of Systematic Reviews."
    ]
  },
  {
    id: 12,
    myth: "I can't afford cardiac rehab — I'll need a gym membership or special equipment.",
    fact: "CR is provided completely free on the NHS and takes place in community or hospital settings. No membership or equipment required.",
    whyMatters: "Removing cost barriers is important — CR is a health right, not a luxury, and you should not have to pay for it.",
    whatToDo: "Ask your GP or hospital team for a referral to your local NHS cardiac rehab programme.",
    tags: ["Access", "Getting started"],
    evidence: [
      "NHS England (2023) National Audit of Cardiac Rehabilitation: Annual Quality Report. London: NHS England.",
      "NICE (2020) Cardiac rehabilitation for adults: NG185."
    ]
  },
  {
    id: 13,
    myth: "I can't attend CR because I don't drive and the venue is too far away.",
    fact: "Many CR programmes can help with transport advice. Community transport schemes may be available, and your team can help you plan your journey.",
    whyMatters: "Transport is one of the most common reasons people miss CR — and it is often one of the easiest barriers to solve with the right support.",
    whatToDo: "Tell your CR team about your transport concerns before your first session — do not assume it cannot be solved.",
    tags: ["Transport", "Access"],
    evidence: [
      "Doll, J.A. et al. (2015) 'Completion of cardiac rehabilitation and long-term mortality', European Journal of Preventive Cardiology, 22(8), pp.1033–1040.",
      "NHS England (2023) National Audit of Cardiac Rehabilitation: Annual Quality Report."
    ]
  },
  {
    id: 14,
    myth: "Feeling out of breath during exercise means something is wrong and I should stop immediately.",
    fact: "Mild breathlessness during exercise is completely normal and expected. The CR team uses the Borg scale to help you exercise at exactly the right level.",
    whyMatters: "Learning to tell the difference between normal exertion breathlessness and warning signs is a key skill you will develop in CR.",
    whatToDo: "Ask your CR physiotherapist to explain the Borg breathlessness scale at your first session.",
    tags: ["Exercise safety"],
    evidence: [
      "Fletcher, G.F. et al. (2001) 'Exercise standards for testing and training', Circulation, 104(14), pp.1694–1740.",
      "Anderson, L. et al. (2016) Cochrane Database of Systematic Reviews, Issue 1."
    ]
  },
  {
    id: 15,
    myth: "After a heart event, I'll have to follow a strict, miserable diet for the rest of my life.",
    fact: "Heart-healthy eating is about balance, variety, and small sustainable changes — not perfection. Most foods can still be enjoyed in moderation.",
    whyMatters: "Enjoyable, realistic eating habits are far more effective long-term than strict diets people cannot stick to.",
    whatToDo: "Ask your CR team for a referral to a dietitian for personalised, practical advice that suits your lifestyle.",
    tags: ["Diet"],
    evidence: [
      "Rees, K. et al. (2013) 'Mediterranean dietary pattern for the primary prevention of cardiovascular disease', Cochrane Database of Systematic Reviews, Issue 8.",
      "NICE (2013) MI — Secondary prevention: CG172."
    ]
  },
  {
    id: 16,
    myth: "I'm so anxious about my heart that I can't face exercise — CR won't understand.",
    fact: "Anxiety about exercising after a heart event is extremely common. CR teams are specifically trained to support people who feel this way.",
    whyMatters: "Gradually overcoming exercise fear in a safe, supervised setting is one of CR's most powerful and life-changing outcomes.",
    whatToDo: "Tell your CR team about your anxiety at your very first appointment — they will go at your pace, without pressure.",
    tags: ["Anxiety", "Exercise safety"],
    evidence: [
      "Lavie, C.J., Milani, R.V. and Mehra, M.R. (2009) 'Cardiac rehabilitation and exercise training', Journal of the American College of Cardiology, 54(1), pp.1–11.",
      "Pogosova, N. et al. (2015) European Journal of Preventive Cardiology, 22(10), pp.1290–1306."
    ]
  },
  {
    id: 17,
    myth: "Cardiac rehab only focuses on physical fitness — emotions and mental health aren't part of it.",
    fact: "CR addresses mental health, emotional wellbeing, and confidence as core parts of the programme, not optional extras.",
    whyMatters: "Depression and anxiety are very common after a cardiac event and directly affect physical recovery — which is why CR treats both together.",
    whatToDo: "Don't wait until you feel emotionally ready before attending — the support is there from day one.",
    tags: ["Anxiety", "Mental health"],
    evidence: [
      "Pogosova, N. et al. (2015) 'Psychosocial aspects in cardiac rehabilitation', European Journal of Preventive Cardiology, 22(10), pp.1290–1306.",
      "NICE (2020) Cardiac rehabilitation for adults: NG185."
    ]
  },
  {
    id: 18,
    myth: "I still smoke, so it's too dangerous for me to do cardiac rehab — I should wait until I've quit.",
    fact: "CR accepts you as you are. Stopping smoking is a goal the team will help you work towards, not a condition of joining.",
    whyMatters: "Attending CR even while smoking provides significant benefit — and CR itself is one of the best settings to get stop-smoking support.",
    whatToDo: "Be honest with your CR team about smoking. They offer non-judgemental, practical support to help you quit.",
    tags: ["Lifestyle", "Getting started"],
    evidence: [
      "NICE (2020) Cardiac rehabilitation for adults: NG185. London: National Institute for Health and Care Excellence.",
      "NICE (2013) MI — Secondary prevention: CG172."
    ]
  },
  {
    id: 19,
    myth: "CR is a one-size-fits-all group class — I'll be forced to do things I can't manage.",
    fact: "CR is personalised to your diagnosis, fitness level, and goals. You have an individual assessment before any exercise begins.",
    whyMatters: "Personalisation is what makes CR safe and effective for such a wide range of people and conditions.",
    whatToDo: "At your assessment, be completely honest about what you can and cannot do — the team will design your programme around you.",
    tags: ["Getting started", "Exercise safety"],
    evidence: [
      "NICE (2020) Cardiac rehabilitation for adults: NG185. London: National Institute for Health and Care Excellence.",
      "British Association for Cardiovascular Prevention and Rehabilitation (2017) BACPR Standards and Core Components. 3rd edn."
    ]
  },
  {
    id: 20,
    myth: "Once cardiac rehab ends, the benefits quickly fade and I'll be back where I started.",
    fact: "CR equips you with lifelong skills, habits, and confidence. Research shows benefits persist for years when people stay active after graduating.",
    whyMatters: "CR is not just a treatment — it is a foundation. The knowledge and habits you build last long after sessions end.",
    whatToDo: "Ask your CR team about community exercise programmes and maintenance options before your final session.",
    tags: ["Lifestyle", "Exercise safety"],
    evidence: [
      "Taylor, R.S. et al. (2014) 'Exercise-based rehabilitation for heart failure', European Heart Journal, 35(33), pp.2213–2221.",
      "Anderson, L. et al. (2016) Cochrane Database of Systematic Reviews, Issue 1."
    ]
  }
];

// ─── All unique tags ──────────────────────────────────────────
const ALL_TAGS = [
  "Getting started", "Attendance",
  "Medication", "Anxiety", "Mental health",
  "Diet", "Transport", "Access", "Lifestyle"
];

// ─── State ────────────────────────────────────────────────────
let activeTag    = null;
let searchQuery  = '';
let detailMode   = false;

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
  applyDetailMode(container);
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

// ─── Apply / remove detail mode ───────────────────────────────
function applyDetailMode(container) {
  if (!container) return;
  container.querySelectorAll('.card-detail').forEach(d => {
    d.style.display = detailMode ? 'flex' : 'none';
    d.setAttribute('aria-hidden', String(!detailMode));
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

// ─── Detail mode toggle ───────────────────────────────────────
function initDetailToggle(toggleId, onToggle) {
  const toggle = document.getElementById(toggleId);
  if (!toggle) return;
  toggle.addEventListener('change', () => {
    detailMode = toggle.checked;
    onToggle();
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
  initDetailToggle('detail-toggle', () => {
    applyDetailMode(document.getElementById('featured-grid'));
  });

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
  initDetailToggle('detail-toggle', () => {
    applyDetailMode(document.getElementById('library-grid'));
  });

  update();
}

// ─── Boot ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  markActiveNav();
  initFaqAccordions();
  initShareBtn();

  const page = window.location.pathname.split('/').pop() || 'index.html';
  if (page === '' || page === 'index.html') initHomepage();
  if (page === 'library.html') initLibrary();
});
