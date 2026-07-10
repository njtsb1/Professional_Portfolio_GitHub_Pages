const DEFAULT_LANG = 'en';
const LANGS = ['en','pt-BR','es-ES'];

const el = id => document.getElementById(id);

async function fetchProfile(){
  const candidates = [
    './profile.json',
    '../profile.json',
    '/profile.json',
    './public/profile.json',
    '../public/profile.json'
  ];
  for(const path of candidates){
    try{
      const res = await fetch(path, {cache: "no-store"});
      if(!res.ok) continue;
      const json = await res.json();
      console.info('Loaded profile from', path);
      return json;
    }catch(e){
      // try next
    }
  }
  console.error('profile.json not found in expected locations');
  return null;
}

function setTheme(isDark){
  document.body.classList.toggle('theme-dark', isDark);
  document.body.classList.toggle('theme-light', !isDark);
  document.documentElement.classList.toggle('light', !isDark);
  const icon = el('themeIcon');
  icon.textContent = isDark ? '🌙' : '☀️';
  el('themeToggle').setAttribute('aria-pressed', String(isDark));
  localStorage.setItem('pref-theme-dark', String(isDark));
}

function initTheme(){
  const saved = localStorage.getItem('pref-theme-dark');
  const prefersDark = saved === null ? true : saved === 'true';
  setTheme(prefersDark);
  el('themeToggle').addEventListener('click', () => {
    const now = document.body.classList.contains('theme-dark');
    setTheme(!now);
  });
}

function getI18nTemplates(profile){
  // base UI labels (layout) — translated
  const base = {
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

  // If profile exists, we can build intro/contact strings dynamically later
  return base;
}

function translateItem(item, lang){
  // item may have a "translations" object with keys 'pt-BR' and/or 'es-ES'
  if(!item) return item;
  if(item.translations && item.translations[lang]){
    // merge translated fields over original
    return {...item, ...item.translations[lang]};
  }
  return item;
}

function translateArrayWithFallback(arr, translationsObj, lang){
  // arr: original array of strings
  // translationsObj: object like languages_translations in profile.json
  if(!arr) return [];
  if(translationsObj && translationsObj[lang]) return translationsObj[lang];
  return arr;
}

function renderAll(profile, lang){
  const i18n = getI18nTemplates(profile);
  const t = i18n[lang] || i18n.en;

  // Update accordion button labels
  const btnSkills = el('btnSkills');
  const btnLanguages = el('btnLanguages');
  const btnPortfolio = el('btnPortfolio');
  const btnExperience = el('btnExperience');
  if(btnSkills) btnSkills.textContent = t.skills;
  if(btnLanguages) btnLanguages.textContent = t.languages;
  if(btnPortfolio) btnPortfolio.textContent = t.portfolio;
  if(btnExperience) btnExperience.textContent = t.experience;

  // Update projects title
  const projectsTitle = el('projectsTitle');
  if(projectsTitle) projectsTitle.textContent = t.projectsTitle;

  if(!profile){
    el('intro').textContent = t.noProfile;
    el('year').textContent = new Date().getFullYear();
    return;
  }

  // Intro and contact
  el('avatar').src = profile.photo || '../public/profile.png';
  el('avatar').alt = `${profile.name} photo`;
  el('profileName').textContent = profile.name;
  el('job').textContent = profile.job;
  el('location').textContent = profile.location;
  el('contact').textContent = `${profile.phone} • ${profile.email}`;
  // intro uses name + job (keeps english job if not translated)
  el('intro').textContent = {
    en: `Hi, I'm ${profile.name}. ${profile.job}`,
    'pt-BR': `Olá, sou ${profile.name}. ${profile.job}`,
    'es-ES': `Hola, soy ${profile.name}. ${profile.job}`
  }[lang] || `Hi, I'm ${profile.name}. ${profile.job}`;

  el('year').textContent = new Date().getFullYear();
  el('footerName').textContent = profile.name;

  // Skills (hardSkills unchanged; softSkills may have translations)
  const skillsNode = el('skills');
  skillsNode.innerHTML = '';
  if(profile.skills && profile.skills.hardSkills){
    const ul = document.createElement('ul');
    ul.style.listStyle='none'; ul.style.padding=0; ul.style.margin=0;
    profile.skills.hardSkills.forEach(s=>{
      const li = document.createElement('li');
      li.style.display='flex'; li.style.alignItems='center'; li.style.gap='8px';
      const img = document.createElement('img');
      img.src = s.logo || '';
      img.alt = s.name;
      img.width = 28; img.height = 28;
      img.style.borderRadius='6px';
      const span = document.createElement('span');
      span.textContent = s.name;
      li.append(img, span);
      ul.appendChild(li);
    });
    skillsNode.appendChild(ul);
  }
  // softSkills translations
  const soft = (profile.skills && profile.skills.translations && profile.skills.translations[lang] && profile.skills.translations[lang].softSkills)
    ? profile.skills.translations[lang].softSkills
    : profile.skills && profile.skills.softSkills ? profile.skills.softSkills : [];
  if(soft.length){
    const p = document.createElement('p');
    p.textContent = soft.join(' • ');
    p.style.marginTop='8px';
    skillsNode.appendChild(p);
  }

  // Languages (array translations)
  const langNode = el('languages');
  langNode.innerHTML = '';
  const langs = translateArrayWithFallback(profile.languages, profile.languages_translations, lang);
  if(langs && langs.length){
    const list = document.createElement('ul');
    list.style.listStyle='none'; list.style.padding=0; list.style.margin=0;
    langs.forEach(l=>{
      const li = document.createElement('li');
      li.textContent = l;
      list.appendChild(li);
    });
    langNode.appendChild(list);
  }

  // Portfolio (per-item translations)
  const portNode = el('portfolio');
  portNode.innerHTML = '';
  if(profile.portfolio){
    profile.portfolio.forEach(p=>{
      const translated = translateItem(p, lang);
      const a = document.createElement('a');
      a.href = p.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = translated.name || p.name;
      a.style.display='block';
      a.style.marginBottom='8px';
      portNode.appendChild(a);
    });
  }

  // Experience (per-item translations)
  const expNode = el('experience');
  expNode.innerHTML = '';
  if(profile.professionalExperience){
    profile.professionalExperience.forEach(e=>{
      const translated = translateItem(e, lang);
      const d = document.createElement('div');
      d.style.marginBottom='10px';
      const h = document.createElement('strong');
      h.textContent = `${translated.name || e.name} — ${translated.period || e.period}`;
      const p = document.createElement('p');
      p.textContent = translated.description || e.description;
      p.style.margin='6px 0 0 0';
      d.append(h,p);
      expNode.appendChild(d);
    });
  }

  // Projects list (same as portfolio)
  const projectsList = el('projectsList');
  projectsList.innerHTML = '';
  if(profile.portfolio){
    profile.portfolio.forEach(p=>{
      const translated = translateItem(p, lang);
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = p.url; a.target='_blank'; a.rel='noopener noreferrer';
      a.textContent = translated.name || p.name;
      li.appendChild(a);
      projectsList.appendChild(li);
    });
  }
}

function initAccordion(){
  document.querySelectorAll('.accordion-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const target = btn.dataset.target;
      const panel = document.getElementById(target);
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if(expanded){
        panel.hidden = true;
      } else {
        panel.hidden = false;
        panel.focus && panel.focus();
      }
    });
  });
}

function initKeyboard(){
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){
      document.querySelectorAll('.panel').forEach(p=>p.hidden=true);
      document.querySelectorAll('.accordion-btn').forEach(b=>b.setAttribute('aria-expanded','false'));
    }
  });
}

function initLang(profile){
  const select = el('langSelect');
  const saved = localStorage.getItem('pref-lang') || DEFAULT_LANG;
  select.value = LANGS.includes(saved) ? saved : DEFAULT_LANG;
  document.body.setAttribute('data-lang', select.value);
  renderAll(profile, select.value);

  select.addEventListener('change', () => {
    const v = select.value;
    localStorage.setItem('pref-lang', v);
    document.body.setAttribute('data-lang', v);
    renderAll(profile, v);
  });
}

async function boot(){
  initTheme();
  initAccordion();
  initKeyboard();
  const profile = await fetchProfile();
  if(!profile){
    // still initialize language selector so user can see message in chosen language
    initLang(null);
    return;
  }
  initLang(profile);
}

document.addEventListener('DOMContentLoaded', boot);
