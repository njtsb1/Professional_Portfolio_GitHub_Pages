const DEFAULT_LANG = 'en';
const LANGS = ['en','pt-BR','es-ES'];

const el = id => document.getElementById(id);
const qs = sel => document.querySelector(sel);

async function fetchProfile(){
  try{
    const res = await fetch('profile.json');
    if(!res.ok) throw new Error('profile.json not found');
    return await res.json();
  }catch(e){
    console.error(e);
    return null;
  }
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

function safeText(t){ return t || '' }

function renderAll(profile, lang){
  // Simple translations map (expandable)
  const i18n = {
    'en': {
      intro: `Hi, I'm ${profile.name}. ${profile.job}`,
      skills: 'Skills',
      languages: 'Languages',
      portfolio: 'Portfolio',
      experience: 'Professional Experience',
      contact: `${profile.location} • ${profile.phone} • ${profile.email}`,
      projectsTitle: 'Projects'
    },
    'pt-BR': {
      intro: `Olá, sou ${profile.name}. ${profile.job}`,
      skills: 'Habilidades',
      languages: 'Idiomas',
      portfolio: 'Portfólio',
      experience: 'Experiência Profissional',
      contact: `${profile.location} • ${profile.phone} • ${profile.email}`,
      projectsTitle: 'Projetos'
    },
    'es-ES': {
      intro: `Hola, soy ${profile.name}. ${profile.job}`,
      skills: 'Habilidades',
      languages: 'Idiomas',
      portfolio: 'Portafolio',
      experience: 'Experiencia Profesional',
      contact: `${profile.location} • ${profile.phone} • ${profile.email}`,
      projectsTitle: 'Proyectos'
    }
  };

  const t = i18n[lang] || i18n.en;

  el('avatar').src = profile.photo || '';
  el('avatar').alt = `${profile.name} photo`;
  el('profileName').textContent = profile.name;
  el('job').textContent = profile.job;
  el('location').textContent = profile.location;
  el('contact').textContent = `${profile.phone} • ${profile.email}`;
  el('intro').textContent = t.intro;
  el('year').textContent = new Date().getFullYear();
  el('footerName').textContent = profile.name;

  // Skills
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
  // Soft skills
  if(profile.skills && profile.skills.softSkills){
    const p = document.createElement('p');
    p.textContent = profile.skills.softSkills.join(' • ');
    p.style.marginTop='8px';
    skillsNode.appendChild(p);
  }

  // Languages
  const langNode = el('languages');
  langNode.innerHTML = '';
  if(profile.languages){
    const list = document.createElement('ul');
    list.style.listStyle='none'; list.style.padding=0; list.style.margin=0;
    profile.languages.forEach(l=>{
      const li = document.createElement('li');
      li.textContent = l;
      list.appendChild(li);
    });
    langNode.appendChild(list);
  }

  // Portfolio
  const portNode = el('portfolio');
  portNode.innerHTML = '';
  if(profile.portfolio){
    profile.portfolio.forEach(p=>{
      const a = document.createElement('a');
      a.href = p.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = p.name;
      a.style.display='block';
      a.style.marginBottom='8px';
      portNode.appendChild(a);
    });
  }

  // Experience
  const expNode = el('experience');
  expNode.innerHTML = '';
  if(profile.professionalExperience){
    profile.professionalExperience.forEach(e=>{
      const d = document.createElement('div');
      d.style.marginBottom='10px';
      const h = document.createElement('strong');
      h.textContent = `${e.name} — ${e.period}`;
      const p = document.createElement('p');
      p.textContent = e.description;
      p.style.margin='6px 0 0 0';
      d.append(h,p);
      expNode.appendChild(d);
    });
  }

  // Projects list
  const projectsList = el('projectsList');
  projectsList.innerHTML = '';
  if(profile.portfolio){
    profile.portfolio.forEach(p=>{
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = p.url; a.target='_blank'; a.rel='noopener noreferrer';
      a.textContent = p.name;
      li.appendChild(a);
      projectsList.appendChild(li);
    });
  }
}

// Accordion behavior
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

// Keyboard accessibility for accordion
function initKeyboard(){
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape'){
      document.querySelectorAll('.panel').forEach(p=>p.hidden=true);
      document.querySelectorAll('.accordion-btn').forEach(b=>b.setAttribute('aria-expanded','false'));
    }
  });
}

async function boot(){
  initTheme();
  initAccordion();
  initKeyboard();
  const profile = await fetchProfile();
  if(!profile){
    document.getElementById('intro').textContent = 'Profile not found. Place profile.json in the same folder.';
    return;
  }
  initLang(profile);
}

document.addEventListener('DOMContentLoaded', boot);
