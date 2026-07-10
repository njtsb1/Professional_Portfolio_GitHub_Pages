/**
 * script.js
 * English-first static portfolio (no external JSON)
 *
 * - Dark / Light toggle (dark default) with moon/sun icons
 * - Multilanguage UI: en (default), pt-BR, es-ES
 * - All profile data embedded in this file
 * - Skills include icons (remote URLs)
 * - Accessible accordion and keyboard support (Esc closes panels)
 * - Responsive and semantic markup
 */

/* Configuration */
const DEFAULT_LANG = 'en';
const LANGS = ['en', 'pt-BR', 'es-ES'];

/* Embedded profile data (edit here) */
const PROFILE = {
  name: "Nivaldo J T S Beirão",
  photo: "https://avatars.githubusercontent.com/u/95108889?v=4",
  job: "Multimedia Editor and Digital Asset Manager - Freelance work on Audacity",
  location: "Registro - SP, Brazil",
  phone: "+55 13 99721-3207",
  email: "njtsb1@gmail.com",
  skills: {
    hardSkills: [
      {"name":"HTML","logo":"https://raw.githubusercontent.com/digitalinnovationone/js-developer-portfolio/main/data/imgs/html.png"},
      {"name":"CSS","logo":"https://raw.githubusercontent.com/digitalinnovationone/js-developer-portfolio/main/data/imgs/css.png"},
      {"name":"JavaScript","logo":"https://raw.githubusercontent.com/digitalinnovationone/js-developer-portfolio/main/data/imgs/js.png"},
      {"name":"React","logo":"https://raw.githubusercontent.com/digitalinnovationone/js-developer-portfolio/main/data/imgs/react.png"},
      {"name":"Angular","logo":"https://raw.githubusercontent.com/digitalinnovationone/js-developer-portfolio/main/data/imgs/angular.png"},
      {"name":"Python","logo":"https://raw.githubusercontent.com/digitalinnovationone/js-developer-portfolio/main/data/imgs/python.png"},
      {"name":"Java","logo":"https://raw.githubusercontent.com/digitalinnovationone/js-developer-portfolio/main/data/imgs/java.png"},
      {"name":"MySQL","logo":"https://raw.githubusercontent.com/digitalinnovationone/js-developer-portfolio/main/data/imgs/mysql.png"},
      {"name":"MongoDB","logo":"https://raw.githubusercontent.com/digitalinnovationone/js-developer-portfolio/main/data/imgs/mongodb.png"},
      {"name":"PostgreSQL","logo":"https://raw.githubusercontent.com/digitalinnovationone/js-developer-portfolio/main/data/imgs/postgresql.png"}
    ],
    softSkills: [
      "Critical Thinking", "Analytical Thinking", "Teamwork", "Flexibility", "Organization"
    ],
    translations: {
      "pt-BR": {
        softSkills: ["Pensamento Crítico","Raciocínio Analítico","Trabalho em Equipe","Flexibilidade","Organização"]
      },
      "es-ES": {
        softSkills: ["Pensamiento Crítico","Razonamiento Analítico","Trabajo en Equipo","Flexibilidad","Organización"]
      }
    }
  },
  languages: ["Brazilian Portuguese", "English (beginner)", "Spanish (beginner)"],
  languages_translations: {
    "pt-BR": ["Português Brasileiro","Inglês (iniciante)","Espanhol (iniciante)"],
    "es-ES": ["Portugués Brasileño","Inglés (principiante)","Español (principiante)"]
  },
  portfolio: [
    { name: "Creating a Pokédex with JavaScript", url: "https://github.com/njtsb1/Building_Pok-dex_with-_JS" },
    { name: "How to Create Your Online Resume with HTML and GitHub Pages", url: "https://github.com/njtsb1/CV_HTML_GitHub_Pages" }
  ],
  professionalExperience: [
    {
      "name":"Multimedia Editor and Digital Asset Manager / Freelance work on Audacity",
      "period":"2023 - present",
      "description":"Grateful for the opportunity to refine my skills in digital process management, data governance, and strategic use of artificial intelligence.",
      "translations": {
        "pt-BR": {
          "name":"Editor Multimídia e Gerente de Ativos Digitais / Trabalho Freelance no Audacity",
          "description":"Agradeço a oportunidade de aprimorar minhas habilidades em gestão de processos digitais, governança de dados e uso estratégico de inteligência artificial."
        },
        "es-ES": {
          "name":"Editor Multimedia y Gestor de Activos Digitales / Trabajo Freelance en Audacity",
          "description":"Agradezco la oportunidad de perfeccionar mis habilidades en gestión de procesos digitales, gobernanza de datos y uso estratégico de inteligencia artificial."
        }
      }
    },
    {
      "name":"Risk Analyst and Market Intelligence / Freelance work on Betfair",
      "period":"2021",
      "description":"Thankful for the opportunity to develop strong skills in statistical analysis, GRC, and risk management in volatile markets.",
      "translations": {
        "pt-BR": {
          "name":"Analista de Risco e Inteligência de Mercado / Trabalho Freelance na Betfair",
          "description":"Agradeço a oportunidade de desenvolver fortes habilidades em análise estatística, GRC e gestão de risco em mercados voláteis."
        },
        "es-ES": {
          "name":"Analista de Riesgos e Inteligencia de Mercado / Trabajo Freelance en Betfair",
          "description":"Agradezco la oportunidad de desarrollar sólidas habilidades en análisis estadístico, GRC y gestión de riesgos en mercados volátiles."
        }
      }
    },
    {
      "name":"Administrative Assistant / Vale Do Ribeira University Center (Univr)",
      "period":"2016 - 2019",
      "description":"Grateful for the opportunity to improve competencies in educational data governance, technical support, and process management.",
      "translations": {
        "pt-BR": {
          "name":"Assistente Administrativo / Univr",
          "description":"Agradeço a oportunidade de aprimorar competências em governança de dados educacionais, suporte técnico e gestão de processos."
        },
        "es-ES": {
          "name":"Asistente Administrativo / Univr",
          "description":"Agradezco la oportunidad de mejorar competencias en gobernanza de datos educativos, soporte técnico y gestión de procesos."
        }
      }
    },
    {
      "name":"Business Administration Intern - Regional Education Unit of Registro / FDE",
      "period":"2014 - 2016",
      "description":"It was a privilege to spend incredible years alongside wonderful people, dedicating myself to supporting students, interns, and volunteers across several school units.",
      "translations": {
        "pt-BR": {
          "name":"Estagiário em Administração - Unidade Regional de Registro / FDE",
          "description":"Foi um privilégio passar anos incríveis ao lado de pessoas maravilhosas, dedicando-me a apoiar estudantes, estagiários e voluntários em várias unidades escolares."
        },
        "es-ES": {
          "name":"Practicante en Administración - Unidad Regional de Registro / FDE",
          "description":"Fue un privilegio pasar años increíbles junto a personas maravillosas, dedicándome a apoyar a estudiantes, pasantes y voluntarios en varias unidades escolares."
        }
      }
    },
    {
      "name":"Business Administration Intern - Regional Education Unit of Miracatu / FDE",
      "period":"2011 - 2013",
      "description":"Grateful for the opportunity to be part of this fantastic team and to have contributed to transforming many lives, an experience I keep as one of the most remarkable in my career.",
      "translations": {
        "pt-BR": {
          "name":"Estagiário em Administração - Unidade Regional de Miracatu / FDE",
          "description":"Agradeço a oportunidade de fazer parte desta equipe fantástica e de ter contribuído para transformar muitas vidas, uma experiência que guardo como uma das mais marcantes da minha carreira."
        },
        "es-ES": {
          "name":"Practicante en Administración - Unidad Regional de Miracatu / FDE",
          "description":"Agradezco la oportunidad de ser parte de este equipo fantástico y de haber contribuido a transformar muchas vidas, una experiencia que guardo como una de las más notables de mi carrera."
        }
      }
    },
    {
      "name":"Clerk - Cashier / Bradesco Bank",
      "period":"2009 - 2011",
      "description":"Grateful for the opportunity to improve skills in financial management, GRC, and operational excellence.",
      "translations": {
        "pt-BR": {
          "name":"Caixa / Bradesco",
          "description":"Agradeço a oportunidade de aprimorar habilidades em gestão financeira, GRC e excelência operacional."
        },
        "es-ES": {
          "name":"Cajero / Bradesco",
          "description":"Agradezco la oportunidad de mejorar habilidades en gestión financiera, GRC y excelencia operacional."
        }
      }
    },
    {
      "name":"Operations and Sales Assistant (Retail) / Tio Beba Supermarkets",
      "period":"2009 - 2011",
      "description":"Grateful for the opportunity to develop valuable skills in operational management and customer service.",
      "translations": {
        "pt-BR": {
          "name":"Assistente de Operações e Vendas / Supermercados Tio Beba",
          "description":"Agradeço a oportunidade de desenvolver habilidades valiosas em gestão operacional e atendimento ao cliente."
        },
        "es-ES": {
          "name":"Asistente de Operaciones y Ventas / Supermercados Tio Beba",
          "description":"Agradezco la oportunidad de desarrollar habilidades valiosas en gestión operativa y atención al cliente."
        }
      }
    }
  ]
};

/* Helpers */
const el = id => document.getElementById(id);

/* Theme functions */
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
  if (toggle) toggle.addEventListener('click', () => setTheme(!document.body.classList.contains('theme-dark')));
}

/* I18n templates for layout labels (English-first) */
function getI18nTemplates(profile) {
  const base = {
    en: {
      skills: 'Skills',
      languages: 'Languages',
      portfolio: 'Portfolio',
      experience: 'Professional Experience',
      projectsTitle: 'Projects',
      noProfile: 'Profile data not available.'
    },
    'pt-BR': {
      skills: 'Habilidades',
      languages: 'Idiomas',
      portfolio: 'Portfólio',
      experience: 'Experiência Profissional',
      projectsTitle: 'Projetos',
      noProfile: 'Dados do perfil não disponíveis.'
    },
    'es-ES': {
      skills: 'Habilidades',
      languages: 'Idiomas',
      portfolio: 'Portafolio',
      experience: 'Experiencia Profesional',
      projectsTitle: 'Proyectos',
      noProfile: 'Datos del perfil no disponibles.'
    }
  };

  // dynamic intro strings
  base.en.intro = `Hi, I'm ${profile.name}. ${profile.job}`;
  base['pt-BR'].intro = `Olá, sou ${profile.name}. ${profile.job}`;
  base['es-ES'].intro = `Hola, soy ${profile.name}. ${profile.job}`;

  base.en.contact = `${profile.location} • ${profile.phone} • ${profile.email}`;
  base['pt-BR'].contact = base.en.contact;
  base['es-ES'].contact = base.en.contact;

  return base;
}

/* Translate per-item if translations exist */
function translateItem(item, lang) {
  if (!item) return item;
  if (item.translations && item.translations[lang]) {
    return { ...item, ...item.translations[lang] };
  }
  return item;
}

/* Render UI */
function renderAll(profile, lang) {
  const i18n = getI18nTemplates(profile);
  const t = i18n[lang] || i18n.en;

  // update layout labels
  const btnSkills = el('btnSkills');
  const btnLanguages = el('btnLanguages');
  const btnPortfolio = el('btnPortfolio');
  const btnExperience = el('btnExperience');
  if (btnSkills) btnSkills.textContent = t.skills;
  if (btnLanguages) btnLanguages.textContent = t.languages;
  if (btnPortfolio) btnPortfolio.textContent = t.portfolio;
  if (btnExperience) btnExperience.textContent = t.experience;

  const projectsTitle = el('projectsTitle');
  if (projectsTitle) projectsTitle.textContent = t.projectsTitle;

  // profile header
  const avatar = el('avatar');
  if (avatar) { avatar.src = profile.photo; avatar.alt = `${profile.name} photo`; }
  el('profileName').textContent = profile.name;
  el('job').textContent = profile.job;
  el('location').textContent = profile.location;
  el('contact').textContent = `${profile.phone} • ${profile.email}`;
  el('intro').textContent = t.intro;
  el('year').textContent = new Date().getFullYear();
  el('footerName').textContent = profile.name;

  // skills (with icons)
  const skillsNode = el('skills');
  skillsNode.innerHTML = '';
  if (profile.skills && profile.skills.hardSkills) {
    const ul = document.createElement('ul');
    ul.style.listStyle = 'none';
    ul.style.padding = 0;
    ul.style.margin = 0;
    ul.style.display = 'grid';
    ul.style.gridTemplateColumns = 'repeat(2, minmax(0,1fr))';
    ul.style.gap = '8px';

    profile.skills.hardSkills.forEach(s => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.alignItems = 'center';
      li.style.gap = '10px';
      li.style.padding = '6px 4px';
      li.style.borderRadius = '8px';

      const img = document.createElement('img');
      img.src = s.logo || '';
      img.alt = s.name || '';
      img.width = 28;
      img.height = 28;
      img.style.borderRadius = '6px';
      img.style.objectFit = 'cover';
      img.style.flex = '0 0 28px';

      const span = document.createElement('span');
      span.textContent = s.name || '';
      span.style.fontSize = '0.95rem';
      span.style.color = 'var(--text)';

      li.appendChild(img);
      li.appendChild(span);
      ul.appendChild(li);
    });

    skillsNode.appendChild(ul);
  }

  // soft skills (translated if available)
  const soft = (profile.skills && profile.skills.translations && profile.skills.translations[lang] && profile.skills.translations[lang].softSkills)
    ? profile.skills.translations[lang].softSkills
    : profile.skills.softSkills;
  if (soft && soft.length) {
    const p = document.createElement('p');
    p.textContent = soft.join(' • ');
    p.style.marginTop = '8px';
    skillsNode.appendChild(p);
  }

  // languages
  const langNode = el('languages');
  langNode.innerHTML = '';
  const langs = (profile.languages_translations && profile.languages_translations[lang]) ? profile.languages_translations[lang] : profile.languages;
  if (langs && langs.length) {
    const list = document.createElement('ul');
    list.style.listStyle = 'none';
    list.style.padding = 0;
    list.style.margin = 0;
    langs.forEach(l => {
      const li = document.createElement('li');
      li.textContent = l;
      list.appendChild(li);
    });
    langNode.appendChild(list);
  }

  // portfolio
  const portNode = el('portfolio');
  portNode.innerHTML = '';
  if (profile.portfolio) {
    profile.portfolio.forEach(p => {
      const a = document.createElement('a');
      a.href = p.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = p.name;
      a.style.display = 'block';
      a.style.marginBottom = '8px';
      portNode.appendChild(a);
    });
  }

  // experience
  const expNode = el('experience');
  expNode.innerHTML = '';
  if (profile.professionalExperience) {
    profile.professionalExperience.forEach(e => {
      const translated = translateItem(e, lang);
      const d = document.createElement('div');
      d.style.marginBottom = '10px';
      const h = document.createElement('strong');
      h.textContent = `${translated.name} — ${translated.period}`;
      const p = document.createElement('p');
      p.textContent = translated.description;
      p.style.margin = '6px 0 0 0';
      d.append(h, p);
      expNode.appendChild(d);
    });
  }

  // projects list
  const projectsList = el('projectsList');
  projectsList.innerHTML = '';
  if (profile.portfolio) {
    profile.portfolio.forEach(p => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = p.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = p.name;
      li.appendChild(a);
      projectsList.appendChild(li);
    });
  }
}

/* Accordion */
function initAccordion() {
  document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      const panel = document.getElementById(target);
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (panel) panel.hidden = expanded;
    });
  });
}

/* Keyboard support */
function initKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.panel').forEach(p => p.hidden = true);
      document.querySelectorAll('.accordion-btn').forEach(b => b.setAttribute('aria-expanded', 'false'));
    }
  });
}

/* Language selector */
function initLang(profile) {
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

/* Boot */
function boot() {
  initTheme();
  initAccordion();
  initKeyboard();
  initLang(PROFILE);
}

/* Start */
document.addEventListener('DOMContentLoaded', boot);
