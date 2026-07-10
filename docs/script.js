const DEFAULT_LANG = 'en';
const LANGS = ['en', 'pt-BR', 'es-ES'];

/* Global holder for loaded profile so language changes always use the same data */
let PROFILE_DATA = null;

/* Short helpers */
const el = id => document.getElementById(id);
const qs = sel => document.querySelector(sel);

/* Try multiple likely locations for profile.json so the same build works in different repo layouts */
async function fetchProfile() {
  const candidates = [
    './profile.json',
    './public/profile.json',
    '/profile.json',
    '../profile.json'
  ];

  for (const path of candidates) {
    try {
      console.info('Trying to load profile from', path);
      const res = await fetch(path, { cache: 'no-store' });
      if (!res.ok) {
        console.info('Not found at', path, 'status', res.status);
        continue;
      }
      const json = await res.json();
      console.info('Loaded profile from', path);
      return json;
    } catch (err) {
      console.warn('Error fetching', path, err);
      // try next path
    }
  }

  console.error('profile.json not found in expected locations');
  return null;
}

/* Theme handling */
function setTheme(isDark) {
  document.body.classList.toggle('theme-dark', isDark);
  document.body.classList.toggle('theme-light', !isDark);
  document.documentElement.classList.toggle('light', !isDark);

  const icon = el('themeIcon');
  if (icon) icon.textContent = isDark ? '🌙' : '☀️';

  const btn = el('themeToggle');
  if (btn) btn.setAttribute('aria-pressed', String(isDark));

  localStorage.setItem('pref-theme-dark', String(isDark));
}

function initTheme() {
  const saved = localStorage.getItem('pref-theme-dark');
  const prefersDark = saved === null ? true : saved === 'true';
  setTheme(prefersDark);

  const toggle = el('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const nowDark = document.body.classList.contains('theme-dark');
      setTheme(!nowDark);
    });
  }
}

/* Base UI labels in English (used when switching languages for layout labels) */
function getBaseI18n() {
  return {
    en: {
      skills: 'Skills',
      languages: 'Languages',
      portfolio: 'Portfolio',
      experience: 'Professional Experience',
      projectsTitle: 'Projects',
      noProfile: 'Profile not found. Place profile.json in the repository root or public folder.'
    },
    'pt-BR': {
      skills: 'Habilidades',
      languages: 'Idiomas',
      portfolio: 'Portfólio',
      experience: 'Experiência Profissional',
      projectsTitle: 'Projetos',
      noProfile: 'Perfil não encontrado. Coloque profile.json na raiz do repositório ou na pasta public.'
    },
    'es-ES': {
      skills: 'Habilidades',
      languages: 'Idiomas',
      portfolio: 'Portafolio',
      experience: 'Experiencia Profesional',
      projectsTitle: 'Proyectos',
      noProfile: 'Perfil no encontrado. Coloca profile.json en la raíz del repositorio o en la carpeta public.'
    }
  };
}

/* Merge translations for a single item if available */
function translateItem(item, lang) {
  if (!item) return item;
  if (item.translations && item.translations[lang]) {
    return { ...item, ...item.translations[lang] };
  }
  return item;
}

/* Translate simple arrays (like languages) using a translations object if present */
function translateArrayWithFallback(originalArray, translationsObj, lang) {
  if (!originalArray) return [];
  if (translationsObj && translationsObj[lang]) return translationsObj[lang];
  return originalArray;
}

/* Render everything based on profile data and selected language */
function renderAll(profile, lang) {
  const i18n = getBaseI18n();
  const t = i18n[lang] || i18n.en;

  // Update accordion button labels (layout-level labels)
  const btnSkills = el('btnSkills');
  const btnLanguages = el('btnLanguages');
  const btnPortfolio = el('btnPortfolio');
  const btnExperience = el('btnExperience');

  if (btnSkills) btnSkills.textContent = t.skills;
  if (btnLanguages) btnLanguages.textContent = t.languages;
  if (btnPortfolio) btnPortfolio.textContent = t.portfolio;
  if (btnExperience) btnExperience.textContent = t.experience;

  // Projects section title
  const projectsTitle = el('projectsTitle');
  if (projectsTitle) projectsTitle.textContent = t.projectsTitle;

  // If profile is missing, show friendly message in selected language
  if (!profile) {
    const intro = el('intro');
    if (intro) intro.textContent = t.noProfile;
    const year = el('year');
    if (year) year.textContent = new Date().getFullYear();
    return;
  }

  // Basic profile fields
  const avatar = el('avatar');
  if (avatar) {
    avatar.src = profile.photo || './public/profile.png';
    avatar.alt = `${profile.name} photo`;
  }
  const profileName = el('profileName');
  if (profileName) profileName.textContent = profile.name || '';
  const job = el('job');
  if (job) job.textContent = profile.job || '';
  const location = el('location');
  if (location) location.textContent = profile.location || '';
  const contact = el('contact');
  if (contact) contact.textContent = `${profile.phone || ''} • ${profile.email || ''}`;

  // Intro text (keeps job text as provided in profile.json)
  const intro = el('intro');
  if (intro) {
    const introText = {
      en: `Hi, I'm ${profile.name}. ${profile.job || ''}`,
      'pt-BR': `Olá, sou ${profile.name}. ${profile.job || ''}`,
      'es-ES': `Hola, soy ${profile.name}. ${profile.job || ''}`
    }[lang] || `Hi, I'm ${profile.name}. ${profile.job || ''}`;
    intro.textContent = introText;
  }

  // Footer year and name
  const year = el('year');
  if (year) year.textContent = new Date().getFullYear();
  const footerName = el('footerName');
  if (footerName) footerName.textContent = profile.name || '';

  // Skills: hardSkills (icons + names) and softSkills (translated if available)
  const skillsNode = el('skills');
  if (skillsNode) {
    skillsNode.innerHTML = '';
    if (profile.skills && profile.skills.hardSkills) {
      const ul = document.createElement('ul');
      ul.style.listStyle = 'none';
      ul.style.padding = '0';
      ul.style.margin = '0';
      profile.skills.hardSkills.forEach(s => {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.gap = '8px';
        const img = document.createElement('img');
        img.src = s.logo || '';
        img.alt = s.name || '';
        img.width = 28;
        img.height = 28;
        img.style.borderRadius = '6px';
        const span = document.createElement('span');
        span.textContent = s.name || '';
        li.append(img, span);
        ul.appendChild(li);
      });
      skillsNode.appendChild(ul);
    }

    // Soft skills: check for translations inside profile.skills.translations
    const soft = (profile.skills && profile.skills.translations && profile.skills.translations[lang] && profile.skills.translations[lang].softSkills)
      ? profile.skills.translations[lang].softSkills
      : (profile.skills && profile.skills.softSkills ? profile.skills.softSkills : []);

    if (soft && soft.length) {
      const p = document.createElement('p');
      p.textContent = soft.join(' • ');
      p.style.marginTop = '8px';
      skillsNode.appendChild(p);
    }
  }

  // Languages: support languages_translations fallback
  const langNode = el('languages');
  if (langNode) {
    langNode.innerHTML = '';
    const langs = translateArrayWithFallback(profile.languages, profile.languages_translations, lang);
    if (langs && langs.length) {
      const list = document.createElement('ul');
      list.style.listStyle = 'none';
      list.style.padding = '0';
      list.style.margin = '0';
      langs.forEach(l => {
        const li = document.createElement('li');
        li.textContent = l;
        list.appendChild(li);
      });
      langNode.appendChild(list);
    }
  }

  // Portfolio: per-item translations if available
  const portNode = el('portfolio');
  if (portNode) {
    portNode.innerHTML = '';
    if (profile.portfolio) {
      profile.portfolio.forEach(p => {
        const translated = translateItem(p, lang);
        const a = document.createElement('a');
        a.href = p.url || '#';
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = translated.name || p.name || '';
        a.style.display = 'block';
        a.style.marginBottom = '8px';
        portNode.appendChild(a);
      });
    }
  }

  // Professional Experience: per-item translations if available
  const expNode = el('experience');
  if (expNode) {
    expNode.innerHTML = '';
    if (profile.professionalExperience) {
      profile.professionalExperience.forEach(e => {
        const translated = translateItem(e, lang);
        const d = document.createElement('div');
        d.style.marginBottom = '10px';
        const h = document.createElement('strong');
        h.textContent = `${translated.name || e.name || ''} — ${translated.period || e.period || ''}`;
        const p = document.createElement('p');
        p.textContent = translated.description || e.description || '';
        p.style.margin = '6px 0 0 0';
        d.append(h, p);
        expNode.appendChild(d);
      });
    }
  }

  // Projects list (same as portfolio)
  const projectsList = el('projectsList');
  if (projectsList) {
    projectsList.innerHTML = '';
    if (profile.portfolio) {
      profile.portfolio.forEach(p => {
        const translated = translateItem(p, lang);
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = p.url || '#';
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = translated.name || p.name || '';
        li.appendChild(a);
        projectsList.appendChild(li);
      });
    }
  }
}

/* Accordion behavior for the sidebar panels */
function initAccordion() {
  document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      const panel = document.getElementById(target);
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (panel) {
        panel.hidden = expanded;
        if (!expanded) panel.focus && panel.focus();
      }
    });
  });
}

/* Keyboard accessibility: Esc closes all panels */
function initKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.panel').forEach(p => p.hidden = true);
      document.querySelectorAll('.accordion-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
    }
  });
}

/* Language selector initialization — uses global PROFILE_DATA so handler always has access */
function initLang(profile) {
  const select = el('langSelect');
  if (!select) return;

  const saved = localStorage.getItem('pref-lang') || DEFAULT_LANG;
  select.value = LANGS.includes(saved) ? saved : DEFAULT_LANG;
  document.body.setAttribute('data-lang', select.value);

  // initial render
  renderAll(profile, select.value);

  // on change, always render using the loaded PROFILE_DATA
  select.addEventListener('change', () => {
    const v = select.value;
    localStorage.setItem('pref-lang', v);
    document.body.setAttribute('data-lang', v);
    console.info('Language changed to', v);
    renderAll(PROFILE_DATA, v);
  });
}

/* Boot sequence */
async function boot() {
  initTheme();
  initAccordion();
  initKeyboard();

  const profile = await fetchProfile();
  PROFILE_DATA = profile; // keep globally available for language changes

  // initialize language controls (renderAll will handle null profile)
  initLang(profile);
}

/* Start when DOM is ready */
document.addEventListener('DOMContentLoaded', boot);
