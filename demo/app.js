/* Прототип Nika Med — рендеринг экранов. Состояние задаётся через hash-роут. */

const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));

/* ---------- Иконки ---------- */
const I = {
  exams: '<svg class="ico" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h6v3H7zM6 4.5H4.5A1.5 1.5 0 0 0 3 6v10a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 17 16V6a1.5 1.5 0 0 0-1.5-1.5H14"/><path d="M6.5 10h7M6.5 13.5h4.5"/></svg>',
  search:'<svg class="ico" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="9" cy="9" r="5.5"/><path d="M13.2 13.2 17 17"/></svg>',
  reports:'<svg class="ico" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17h14"/><rect x="4.5" y="9" width="3" height="5.5" rx=".6"/><rect x="9" y="5.5" width="3" height="9" rx=".6"/><rect x="13.5" y="11.5" width="3" height="3" rx=".6"/></svg>',
  admin: '<svg class="ico" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="2.6"/><path d="M10 2.6v2M10 15.4v2M17.4 10h-2M4.6 10h-2M15.2 4.8l-1.4 1.4M6.2 13.8l-1.4 1.4M15.2 15.2l-1.4-1.4M6.2 6.2 4.8 4.8"/></svg>',
  org:   '<svg viewBox="0 0 20 20" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17h14M4.5 17V4.5A1.5 1.5 0 0 1 6 3h5a1.5 1.5 0 0 1 1.5 1.5V17M12.5 8H15a1.5 1.5 0 0 1 1.5 1.5V17"/><path d="M7 6.5h2.5M7 9.5h2.5M7 12.5h2.5"/></svg>',
  doc:   '<svg viewBox="0 0 20 20" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="7" r="3"/><path d="M4 16.5c0-2.8 2.7-4.5 6-4.5s6 1.7 6 4.5"/></svg>',
  shield:'<svg viewBox="0 0 20 20" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2.8 4.6 5v4.6c0 3.4 2.2 6.4 5.4 7.6 3.2-1.2 5.4-4.2 5.4-7.6V5z"/><path d="m7.8 9.8 1.6 1.6 3-3.2"/></svg>',
  book:  '<svg viewBox="0 0 20 20" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 4.6A1.6 1.6 0 0 1 5.1 3H9v13H5.1a1.6 1.6 0 0 0-1.6 1.6zM16.5 4.6A1.6 1.6 0 0 0 14.9 3H11v13h3.9a1.6 1.6 0 0 1 1.6 1.6z"/></svg>',
  home:  '<svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 8.6 10 3.5l6.5 5.1V16a1 1 0 0 1-1 1h-3.3v-4.5H7.8V17H4.5a1 1 0 0 1-1-1z"/></svg>',
  bell:  '<svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13.5V9a5 5 0 0 1 10 0v4.5l1.5 1.5h-13zM8.2 17a2 2 0 0 0 3.6 0"/></svg>',
  logout:'<svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3M12.5 13.5 16 10l-3.5-3.5M16 10H8"/></svg>',
  users: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="7" r="2.8"/><path d="M2.5 16c0-2.6 2.2-4.2 5-4.2s5 1.6 5 4.2M13 4.6a2.6 2.6 0 0 1 0 5M14.5 11.9c1.8.4 3 1.8 3 4.1"/></svg>',
  pulse: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 10h3.2l2-4.5 3.4 9 2-4.5h4.4"/></svg>',
  check: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="7"/><path d="m7 10.2 2 2 4-4.2"/></svg>',
  clock: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="7"/><path d="M10 6v4.2l2.8 1.8"/></svg>',
  alert: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3.2 17.4 16H2.6z"/><path d="M10 8.2v3.6M10 14h.01"/></svg>',
  clip:  '<svg viewBox="0 0 20 20" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m15.5 9.3-5.9 5.9a3.8 3.8 0 0 1-5.4-5.4l6.3-6.3a2.6 2.6 0 0 1 3.6 3.6l-6.2 6.2a1.3 1.3 0 0 1-1.9-1.9l5.6-5.6"/></svg>',
  tpl:   '<svg viewBox="0 0 20 20" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="3" width="13" height="14" rx="1.5"/><path d="M6.5 7h7M6.5 10h7M6.5 13h4"/></svg>',
  ext:   '<svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h4v4M13 3 7.5 8.5"/><path d="M11.5 9.6V12A1.5 1.5 0 0 1 10 13.5H4A1.5 1.5 0 0 1 2.5 12V6A1.5 1.5 0 0 1 4 4.5h2.4"/></svg>'
};

/* ---------- Роутер ---------- */
function route() {
  const h = location.hash.replace(/^#\/?/, '') || 'exams';
  const [path, qs] = h.split('?');
  const seg = path.split('/');
  const q = {};
  new URLSearchParams(qs || '').forEach((v, k) => q[k] = v);
  return { view: seg[0] || 'exams', id: seg[1] || '', q };
}

/* ---------- Оболочка ---------- */
function shell(active, title, crumbs, body, sub) {
  const nav = [
    { k:'exams',   n:'Профосмотры',      d:'Список и статусы',        i:I.exams,   b:'1 284' },
    { k:'search',  n:'Поиск пациента',   d:'По ФИО или ИИН',          i:I.search },
    { k:'reports', n:'Отчеты',           d:'Сводки и выгрузки',       i:I.reports },
    { k:'admin',   n:'Администрирование',d:'Организации, врачи',      i:I.admin }
  ];
  const nested = /<a /.test(crumbs || '');
  const isAdmin = ['admin','orgs','doctors','admins','icd10'].includes(active);
  const subLinks = [
    { k:'orgs',    n:'Организации для профосмотра' },
    { k:'doctors', n:'Врачи' },
    { k:'admins',  n:'Администраторы' },
    { k:'icd10',   n:'МКБ-10' }
  ];

  // «⌂ Главная › …» — хлебные крошки с иконкой дома, как в референсе
  const rest = (crumbs || '').replace(/^Главная\s*(<b>\/<\/b>)?\s*/, '').replace(/<b>\/<\/b>/g, '<b>›</b>');
  const crumbsHtml = `<a class="home" href="#/exams">${I.home}Главная</a>${rest ? ` <b>›</b> ${rest}` : ''}`;
  // Формы врачей показывают свой заголовок в .form-head — второй не нужен
  const isForm = /class="form-head"/.test(body);
  const header = isForm ? '' : `
      <div class="ph"><div><h1 class="page-title">${title}</h1>${sub ? `<div class="ph-sub">${sub}</div>` : ''}</div></div>`;

  return `
<div class="app">
  <aside class="sidebar">
    <div class="brand">
      <div class="brand-mark">N</div>
      <div><div class="brand-name">Nika Med</div><div class="brand-sub">Медицинские профосмотры</div></div>
    </div>
    <nav class="nav">
      ${nav.map(n => `
        <a href="#/${n.k}" class="${active === n.k || (n.k === 'admin' && isAdmin) ? 'active' : ''}">
          ${n.i}<span class="n-txt">${n.n}<span class="n-d">${n.d}</span></span>${n.b ? `<span class="badge">${n.b}</span>` : ''}
        </a>
        ${n.k === 'admin' && isAdmin ? `<div class="sub-nav">${subLinks.map(s =>
          `<a href="#/${s.k}" class="${active === s.k ? 'active' : ''}">${s.n}</a>`).join('')}</div>` : ''}
      `).join('')}
    </nav>
    <div class="side-foot"><a href="#/exams">${I.logout}Выйти</a></div>
  </aside>

  <div class="main">
    <header class="topbar">
      ${nested ? `<button class="btn back" onclick="history.length > 1 ? history.back() : location.hash='#/exams'" title="Вернуться на предыдущую страницу">← Назад</button><span class="tb-sep"></span>` : ''}
      <div class="crumbs">${crumbsHtml}</div>
      <div class="topbar-search">
        <button class="icon-btn" title="Уведомления">${I.bell}<span class="pip"></span></button>
        <a class="user-chip ${active === 'profile' ? 'on' : ''}" href="#/profile" title="Профиль и шаблоны">
          <div class="avatar">${CURRENT_USER.initials}</div>
          <div><div class="u-name">${CURRENT_USER.short}</div><div class="u-role">${CURRENT_USER.role}</div></div>
        </a>
      </div>
    </header>
    <main class="content${isForm ? ' tight' : ''}">
      ${header}
      ${body}</main>
  </div>
</div>`;
}

const badge = (m, k) => `<span class="badge ${m[k].cls}"><span class="dot"></span>${m[k].label}</span>`;
/* Полоса прогресса по специалистам. Жёлтый сегмент — только у идущих осмотров. */
const docbar = (d, t, status) => {
  const live = status === 'active';
  let s = '';
  for (let i = 0; i < t; i++) s += `<i class="${i < d ? 'done' : (live && i === d ? 'wait' : '')}"></i>`;
  return `<span class="docbar">${s}<span>${d} из ${t}</span></span>`;
};

/* Точечный мини-график динамики за 30 дней (декоративный, детерминированный) */
function spark(seed, color) {
  const cols = 30, rows = 5;
  let dots = '';
  for (let c = 0; c < cols; c++) {
    const v = Math.round(1 + (rows - 1) * (0.5 + 0.35 * Math.sin(c * 0.55 + seed * 1.7) + 0.15 * Math.sin(c * 1.9 + seed)));
    for (let r = 0; r < rows; r++)
      dots += `<circle cx="${c * 10 + 5}" cy="${(rows - 1 - r) * 8 + 4}" r="2.3" fill="${r < v ? color : '#dfe3e8'}"/>`;
  }
  return `<svg class="spark" viewBox="0 0 300 40" preserveAspectRatio="none" aria-hidden="true">${dots}</svg>`;
}

/* ============ 1. ПРОФОСМОТРЫ ============ */
function viewExams(q) {
  const fStatus = q.status || '';
  const rows = EXAMS.filter(e => !fStatus || e.status === fStatus);
  const cnt = k => EXAMS.filter(e => e.status === k).length;

  const kpi = (k, label, val, delta, ic, color, bg, seed) => `
    <button class="kpi ${fStatus === k ? 'on' : ''}" onclick="location.hash='#/exams${k ? '?status=' + k : ''}'">
      <span class="k-ic" style="background:${bg};color:${color}">${ic}</span>
      <span><span class="k-lbl">${label}</span><span class="k-delta">${delta}</span></span>
      <span class="k-val">${val}</span>
      ${spark(seed, color)}
    </button>`;

  const today = new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const greet = `Добрый день, ${CURRENT_USER.fio.split(' ').slice(1).join(' ')} · ${today}`;

  return shell('exams', 'Профосмотры', 'Главная', `
  <div class="kpis">
    ${kpi('', 'Всего за 2026', '1 284', 'план 2 140 · 60%', I.users, '#111418', '#eceef1', 1)}
    ${kpi('active', 'Действует', '312', 'в работе у врачей', I.pulse, '#3b5ea6', '#ebeff6', 2)}
    ${kpi('closed', 'Закрыт', '868', 'заключение выдано', I.check, '#5a9a73', '#e7f0ea', 3)}
    ${kpi('notStarted', 'Не начат', '61', 'ожидают явки', I.clock, '#7b828c', '#eceef1', 4)}
    ${kpi('noShow', 'Неявка', '43', 'нужна новая запись', I.alert, '#b8914a', '#f5eee0', 5)}
  </div>

  <div class="filters">
    <div class="filter-grid">
      <div class="f"><label>Статус</label><select class="ctl">
        <option>Все</option><option ${fStatus==='active'?'selected':''}>Действует</option>
        <option>Закрыт</option><option>Не начат</option><option>Неявка</option></select></div>
      <div class="f"><label>Год профосмотра</label><select class="ctl">
        ${[2026,2025,2024,2023,2022,2021,2020,2019,2018,2017,2016].map((y,i)=>`<option ${i===0?'selected':''}>${y}</option>`).join('')}
      </select></div>
      <div class="f"><label>ИИН</label><input class="ctl" placeholder="12 цифр" inputmode="numeric"></div>
      <div class="f"><label>Организация</label><select class="ctl">
        <option>Все организации</option>${ORGS.map(o=>`<option>${o}</option>`).join('')}</select></div>
      <div class="f"><label>Заключение о допуске</label><select class="ctl">
        <option>Все</option>${Object.values(VERDICT).map(v=>`<option>${v.label}</option>`).join('')}</select></div>
    </div>
    <div class="chips">
      <span class="lbl">Активные фильтры:</span>
      <span class="chip">Год: <b>2026</b><span class="x">×</span></span>
      ${fStatus ? `<span class="chip">Статус: <b>${STATUS[fStatus].label}</b><span class="x">×</span></span>` : ''}
      <span class="chip">Организация: <b>${ORGS[0]}</b><span class="x">×</span></span>
      <button class="btn btn-ghost btn-sm">Сбросить всё</button>
    </div>
  </div>

  <div class="tbl-wrap">
    <div class="tbl-top">
      <span class="cnt">Найдено <b>${rows.length}</b> из 1 284 · строка открывается в новой вкладке</span>
    </div>
    <table>
      <thead><tr>
        <th class="sortable">Сотрудник <span class="arr">↓</span></th>
        <th>ИИН · № осмотра</th><th>Должность · Организация</th>
        <th title="Для закрытых — итоговое заключение профпатолога">Статус · Заключение</th>
        <th>Врачи пройдены</th><th>Сроки</th><th></th>
      </tr></thead>
      <tbody>
        ${rows.map((e, i) => `
        <tr class="${i === 0 ? 'sel' : ''}" onclick="location.hash='#/patient/${e.id}'">
          <td><div class="t-name trunc" style="max-width:210px">${esc(e.fio)}</div>
              <div class="t-sub trunc" style="max-width:210px">${esc(e.dept)}</div></td>
          <td><div class="mono">${e.iin}</div><div class="t-sub mono">№ ${e.num}</div></td>
          <td><div class="trunc" style="max-width:180px">${esc(e.pos)}</div>
              <div class="t-sub trunc" style="max-width:180px">${esc(ORGS[e.org])}</div></td>
          <td title="${VERDICT[e.verdict].label}">${e.verdict === 'none' ? badge(STATUS, e.status)
            : `<span class="badge ${VERDICT[e.verdict].cls}"><span class="dot"></span>${VERDICT[e.verdict].short}</span>`}</td>
          <td>${docbar(e.done, e.total, e.status)}</td>
          <td class="mono">${e.start ? `${e.start}<div class="t-sub">${e.end ? 'по ' + e.end : 'идёт'}</div>` : '—'}</td>
          <td class="go">›</td>
        </tr>`).join('')}
      </tbody>
    </table>
    <div class="pager">
      <span class="cnt small muted">Показаны 1–${rows.length} из 1 284</span>
      <span class="spacer"></span>
      <button class="pg">‹</button><button class="pg on">1</button><button class="pg">2</button>
      <button class="pg">3</button><button class="pg">…</button><button class="pg">58</button><button class="pg">›</button>
    </div>
  </div>`, greet);
}

/* ============ 2. ПОИСК ПАЦИЕНТА ============ */
function viewSearch() {
  const res = [EXAMS[0], EXAMS[17]];
  return shell('search', 'Поиск пациента', 'Главная', `
  <div class="search-hero">
    <div class="filters">
      <div class="search-grid">
        <div class="f"><label>Имя</label><input class="ctl" value="${PATIENT.fio.split(' ')[1]}"></div>
        <div class="f"><label>Фамилия</label><input class="ctl" value="${PATIENT.fio.split(' ')[0]}"></div>
        <div class="f"><label>ИИН</label><input class="ctl mono" placeholder="${PATIENT.iin}" inputmode="numeric"></div>
        <div class="f"><label>Дата рождения</label>
          <span class="date-ctl"><input class="ctl mono" value="${PATIENT.dob}" placeholder="дд.мм.гггг">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
              <rect x="3.2" y="4.6" width="13.6" height="12.2" rx="1.6"/><path d="M3.2 8.4h13.6M7 3.2v2.6M13 3.2v2.6"/>
            </svg></span></div>
        <div class="f"><label>&nbsp;</label><button class="btn btn-primary" style="height:34px">Найти</button></div>
      </div>
      <div class="chips">
        <span class="lbl">Достаточно одного поля. Поиск по ИИН даёт точное совпадение.</span>
      </div>
    </div>

    <div class="page-head">
      <div><h3 style="font-size:14.5px">Результаты поиска</h3>
        <div class="sub">Найден 1 пациент · 2 профосмотра</div></div>
    </div>

    <div class="res-card" onclick="location.hash='#/patient/1'">
      <div class="res-ava">${PATIENT.initials}</div>
      <div class="res-main">
        <div class="res-name">${esc(PATIENT.fio)}</div>
        <div class="res-meta">
          <span>ИИН <b class="mono">${PATIENT.iin}</b></span>
          <span>Дата рождения <b>${PATIENT.dob}</b> (${PATIENT.age} лет)</span>
          <span>Пол <b>${PATIENT.sex}</b></span>
        </div>
        <div class="res-meta">
          <span>Должность <b>${esc(PATIENT.pos)}</b></span>
          <span>Организация <b>${esc(PATIENT.org)}</b></span>
          <span>Подразделение <b>${esc(PATIENT.dept)}</b></span>
        </div>
        <div class="hist">
          <span class="hist-y"><span class="dot" style="background:#6784bd"></span>2026 · Действует · 4 из 7</span>
          <span class="hist-y"><span class="dot" style="background:#5a9a73"></span>2025 · Закрыт · Профпригоден</span>
          <span class="hist-y"><span class="dot" style="background:#5a9a73"></span>2024 · Закрыт · Профпригоден</span>
          <span class="hist-y"><span class="dot" style="background:#5a9a73"></span>2023 · Закрыт · Постоянно профпригоден</span>
          <span class="hist-y"><span class="dot" style="background:#b8914a"></span>2022 · Неявка</span>
        </div>
      </div>
      <div class="res-side">
        ${badge(STATUS, 'active')}
        <div class="small muted">Текущий профосмотр</div>
        <div class="mono small">№ ${PATIENT.num}</div>
        <button class="btn btn-primary btn-sm">Открыть карту</button>
      </div>
    </div>
  </div>`);
}

/* ============ 3. КАРТА ПАЦИЕНТА ============ */
function viewPatient(q) {
  const year = +(q.year || 2026);
  const p = PATIENT;
  const yd = p.years.find(y => y.y === year) || p.years[0];
  const docs = p.doctors[year] || p.doctors[2025];
  const closed = yd.status === 'closed';

  const docLink = s => s === FINAL_SPEC ? '#/report/eye?doc=pathologist'
    : s === 'Терапевт' ? '#/report/eye?doc=therapist' : '#/report/eye';
  const docCard = d => {
    const fin = d.spec === FINAL_SPEC;
    return `
    <div class="doc ${d.state === 'na' ? 'na' : ''} ${fin ? 'final' : ''}" ${d.state !== 'na' ? `onclick="location.hash='${docLink(d.spec)}'"` : ''}>
      <div class="doc-ic ${d.state}">${d.state === 'done' ? '✓' : d.state === 'wait' ? I.clock : '–'}</div>
      <div>
        <div class="doc-t">${d.spec}${fin ? ' <span class="badge b-accent">Итоговое заключение</span>' : ''}</div>
        <div class="doc-s">${d.state === 'done' ? `${esc(d.who)} · ${d.at}` : esc(d.at)}</div>
      </div>
      ${fin && d.state === 'done' ? `<span class="mark ${d.res === 'Годен' ? 'ok' : 'bad'}">${d.res}</span>` : ''}
      <div class="doc-go" ${fin && d.state === 'done' ? 'style="margin-left:12px"' : ''}>${d.state === 'done' ? '' : '›'}</div>
    </div>`;
  };

  const GEN = { 'Невропатолог':'невропатолога', 'Терапевт':'терапевта', 'Офтальмолог':'офтальмолога',
    'Хирург':'хирурга', 'Дерматовенеролог':'дерматовенеролога', 'Оториноларинголог':'оториноларинголога' };
  const pending = docs.filter(d => d.state === 'wait' && d.spec !== FINAL_SPEC).map(d => GEN[d.spec] || d.spec.toLowerCase());
  const pathologist = docs.find(d => d.spec === FINAL_SPEC);
  const oblig = docs.filter(d => SPECIALTIES.includes(d.spec));
  const obligDone = oblig.filter(d => d.state === 'done').length;
  const extraDone = docs.filter(d => !SPECIALTIES.includes(d.spec) && d.state === 'done').length;

  const visitsCard = `
      <div class="card">
        <div class="card-head"><h3>Приемы врача за период</h3>
          <span class="spacer"></span><span class="small muted">01.01.${year - 1} — ${year}</span></div>
        <table class="wrap">
          <thead><tr><th style="width:110px">Дата</th><th style="width:190px">Вид обращения</th>
            <th style="width:96px">Код МКБ-10</th><th>Предварительный диагноз</th></tr></thead>
          <tbody>${p.visits.map(v => `
            <tr><td class="mono">${v.d}</td><td>${v.t}</td>
              <td><span class="mono" style="color:var(--accent-dk);font-weight:600">${v.code}</span></td>
              <td>${esc(v.dx)}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>`;

  return shell('exams', `Профосмотр № ${p.num}`,
    `<a href="#/exams">Профосмотры</a> <b>/</b> ${esc(p.fio)}`, `

  <div class="pt-head">
    <div class="pt-top">
      <div class="pt-ava">${p.initials}</div>
      <div>
        <div class="pt-name">${esc(p.fio)} ${badge(STATUS, yd.status)}</div>
        <div class="pt-facts">
          <span>ИИН <b class="mono">${p.iin}</b></span>
          <span>Дата рождения <b>${p.dob}</b> (${p.age} лет)</span>
          <span>Должность <b>${esc(p.pos)}</b></span>
        </div>
        <div class="pt-facts">
          <span>Организация <b>${esc(p.org)}</b></span>
          <span>Подразделение <b>${esc(p.dept)}</b></span>
          <span>Стаж общий <b>${p.totalExp}</b> · по должности <b>${p.posExp}</b></span>
        </div>
      </div>
      <div class="pt-actions">
        <button class="btn btn-sm" onclick="location.hash='${filesHash(year, true)}'">${I.clip}Файлы (${p.fileList.length})</button>
        <button class="btn btn-primary btn-sm">+ Моё заключение</button>
      </div>
    </div>
  </div>

  <!-- Профосмотр за выбранный год: вкладки годов, врачи, заключение о допуске -->
  <div class="card exam-sec">
    <div class="years" role="tablist">
      <span class="lbl">Год профосмотра:</span>
      ${p.years.map(y => `
        <button role="tab" class="yr ${y.y === year ? 'on' : ''}" onclick="location.hash='#/patient/1?year=${y.y}'">
          <span class="y">${y.y}</span>
          <span class="m">${y.status === 'noShow' ? 'Неявка' : (y.verdict === 'none' ? `${y.done}/${y.total} врачей` : VERDICT[y.verdict].short)}</span>
        </button>`).join('')}
    </div>
    <div class="exam-body">
      <div class="exam-docs">
        <div class="card-head">
          <h3>Врачи-специалисты</h3>
          <span class="badge ${obligDone === oblig.length ? 'b-ok' : 'b-accent'}">${obligDone} из ${oblig.length} обязательных</span>
          ${extraDone ? `<span class="badge b-neutral">+${extraDone} доп.</span>` : ''}
        </div>
        <div class="doc-list">${docs.map(docCard).join('')}</div>
        <div class="card-head" style="border-top:1px solid var(--line-soft);border-bottom:0">
          <h3>Функциональная диагностика</h3>
        </div>
        <div class="fd">${p.funcDiag.map(f => { const c = studyFiles(f.n, year).length;
          return `<a href="${filesHash(year, true, f.n)}" title="Загрузить или посмотреть">${f.n}${c ? ` <b>(${c})</b>` : ''}</a>`; }).join('')}</div>
      </div>
      <div class="exam-verdict">
        <div class="card-head"><h3>Заключение о допуске</h3><span class="spacer"></span>
          <span class="small muted">выносит профпатолог</span></div>
        <div class="card-body">
          ${yd.status === 'noShow' ? `
            <div class="alert warn"><span class="ai">!</span><div>Работник не прошёл осмотр в ${year} году.
              Причина: <b>${yd.reason || 'не указана'}</b>. Учитывается в заключительном акте организации.</div></div>` : ''}
          ${closed ? `
            <div class="verdict-big ${VERDICT[yd.verdict].mark === 'Годен' ? 'ok' : 'bad'}">
              <div class="vb-mark">${VERDICT[yd.verdict].mark}</div>
              <div class="vb-l">${VERDICT[yd.verdict].label}</div>
            </div>
            <div class="kv"><span class="k">Группа здоровья</span><span class="v">${yd.group ? `${yd.group} — ${HEALTH_GROUPS[yd.group - 1].toLowerCase()}` : '—'}</span></div>
            <div class="kv" style="margin-bottom:12px"><span class="k">Рекомендации</span><span class="v">${yd.refs && yd.refs.length ? yd.refs.join(', ') : 'нет'}</span></div>
            <div class="alert ok"><span class="ai">✓</span><div>Профосмотр закрыт ${year === 2025 ? '11.08.2025' : ''}.
              Итоговое заключение подписано профпатологом <b>${pathologist && pathologist.who ? esc(pathologist.who) : 'Есенова Б. Н.'}</b></div></div>
          ` : `
            <div class="verdict-big none"><div class="vb-mark">Годен / Негоден</div>
              <div class="vb-l">Отметку ставит профпатолог</div></div>
            <div class="alert warn"><span class="ai">!</span><div>
              ${pending.length ? `Профпатолог сможет вынести заключение после: <b>${pending.join(', ')}</b>.`
                : 'Все специалисты внесли заключения — ожидается профпатолог.'}
            </div></div>`}

          <div class="f" style="margin-bottom:11px">
            <label>Результат заключения</label>
            <select class="ctl" disabled>
              <option>${VERDICT[closed ? yd.verdict : 'none'].label}</option>
            </select>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-bottom:11px">
            <div class="f"><label>Годен на</label><select class="ctl" disabled><option>${closed ? 'Год' : '—'}</option></select></div>
            <div class="f"><label>Допущен до</label><input class="ctl mono" value="${closed ? '11.08.2026' : ''}" placeholder="дд.мм.гггг" disabled></div>
          </div>
          <div class="f" style="margin-bottom:13px"><label>Профпатолог</label>
            <input class="ctl" value="${closed ? 'Есенова Б. Н.' : ''}" placeholder="не назначен" disabled></div>
          ${closed ? `<button class="btn" style="width:100%" disabled>Профосмотр закрыт</button>` :
            `<button class="btn btn-primary" style="width:100%" onclick="location.hash='#/report/eye?doc=pathologist'">Форма профпатолога</button>`}
          <div class="inline-note" style="margin-top:8px;text-align:center">
            ${closed ? 'Повторное открытие — через главного врача' : `Осталось заключений специалистов: ${pending.length}`}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="two-col">
    <div>
      <div class="card" style="margin-bottom:14px">
        <div class="card-head"><h3>Условия труда и вредность</h3>
          <span class="spacer"></span><span class="badge b-neutral">Класс: ${p.condClass}</span></div>
        <div class="card-body">
          <div class="kv"><span class="k">Код условий труда</span><span class="v mono">${p.conditions}</span></div>
          <div class="kv"><span class="k">Профессиональная вредность</span><span class="v" style="max-width:62%">${esc(p.hazards)}</span></div>
          <div class="kv"><span class="k">Место прохождения</span><span class="v">По месту работы</span></div>
          <div class="kv"><span class="k">Периодичность</span><span class="v">1 раз в год</span></div>
        </div>
      </div>

      ${visitsCard}
    </div>

    <div>
      <div class="card">
        <div class="card-head"><h3>История изменений</h3></div>
        <div class="card-body">
          <div class="tl">${p.history.map(h => `
            <div class="tl-i"><div class="tl-t">${esc(h.t)}</div><div class="tl-m">${esc(h.m)}</div></div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>`);
}

/* Файлы пациента: заключения, осмотры и анализы из других клиник */
const FILE_TYPES = ['Заключение специалиста', 'Результат осмотра', 'Анализ', 'Функциональная диагностика', 'Прочее'];
let pf = null; // выбранный, но ещё не прикреплённый файл
const filesHash = (year, open, study) =>
  `#/patient/1?year=${year}${open ? '&modal=files' : ''}${study ? `&study=${encodeURIComponent(study)}` : ''}`;
// Файлы исследования (ЭКГ, КДЛ, флюорография…) за год профосмотра
const studyFiles = (study, year) => PATIENT.fileList.filter(f => f.study === study && f.year === year);
// Анализы — КДЛ, остальное — функциональная диагностика
const studyType = study => study === 'КДЛ' ? 'Анализ' : 'Функциональная диагностика';
const fmtSize = b => b < 1024 * 1024 ? `${Math.max(1, Math.round(b / 1024))} КБ` : `${(b / 1024 / 1024).toFixed(1)} МБ`;
const today = () => new Date().toLocaleDateString('ru-RU');

function closeFiles(year) { pf = null; stopPhone(); location.hash = filesHash(year, false); }
function pickFile(f) {
  const study = route().q.study || '';
  pf = { name: f.name, size: fmtSize(f.size), url: URL.createObjectURL(f), mime: f.type, study,
    type: study ? studyType(study) : FILE_TYPES[0], what: study, clinic: study ? 'МЦ «Денсаулық»' : '', date: '' };
  render();
}
function onFilesDrop(ev) {
  ev.preventDefault();
  ev.currentTarget.classList.remove('over');
  const f = ev.dataTransfer.files[0];
  if (f) pickFile(f);
}
function attachFile() {
  const fd = new FormData(document.getElementById('pf-form'));
  ['type', 'study', 'what', 'clinic', 'date'].forEach(k => pf[k] = fd.get(k).trim());
  if (!pf.clinic) { pf.err = 'Укажите клинику, выдавшую документ'; return render(); }
  const d = pf.date ? pf.date.split('-').reverse().join('.') : '—';
  PATIENT.fileList.unshift({ name: pf.name, size: pf.size, url: pf.url, mime: pf.mime, type: pf.type,
    what: pf.what || pf.study, study: pf.study || undefined, year: +(route().q.year || 2026),
    clinic: pf.clinic, date: d, by: CURRENT_USER.short, at: today() });
  pf = null;
  flash = 'Файл прикреплён';
  render();
}
function removeFile(i) {
  PATIENT.fileList.splice(i, 1);
  flash = 'Файл удалён';
  render();
}

/* Загрузка с телефона: QR-код ведёт на мобильный сайт m/, телефон фотографирует
 * документ и отправляет его; окно «Файлы» опрашивает сессию и добавляет фото в список. */
const QR_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js';
let phone = null; // { key, token, url, svg, got, timer }
function loadQr() {
  if (window.qrcode) return Promise.resolve();
  return new Promise((ok, fail) => {
    const s = document.createElement('script');
    s.src = QR_SRC; s.onload = ok; s.onerror = () => fail(new Error('Не удалось загрузить генератор QR-кода'));
    document.head.appendChild(s);
  });
}
// Телефон не откроет localhost — подставляем адрес компьютера в Wi-Fi сети от server.js
async function lanOrigin() {
  if (!/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) return location.origin;
  try { return (await (await fetch('api/info')).json()).lan || location.origin; } catch { return location.origin; }
}
function ensurePhone(study, year) {
  const key = `${year}|${study}`;
  if (phone && phone.key === key) return;
  stopPhone();
  const token = Math.random().toString(36).slice(2, 10);
  phone = { key, token, url: '', svg: '', got: 0, timer: setInterval(pollPhone, 2000) };
  (async () => {
    const st = study ? `&st=${encodeURIComponent(study)}` : '';
    const url = `${await lanOrigin()}${location.pathname.replace(/[^/]*$/, '')}m/#s=${token}&e=${PATIENT.num}&y=${year}${st}`;
    try {
      await loadQr();
      const qr = qrcode(0, 'M');
      qr.addData(url); qr.make();
      if (phone && phone.token === token) Object.assign(phone, { url, svg: qr.createSvgTag({ cellSize: 4, margin: 0, scalable: true }) });
    } catch (e) {
      if (phone && phone.token === token) Object.assign(phone, { url, err: e.message });
    }
    render();
  })();
}
function stopPhone() { if (phone) clearInterval(phone.timer); phone = null; }
async function pollPhone() {
  const { view, q } = route();
  if (view !== 'patient' || q.modal !== 'files') return stopPhone();
  const { token, got } = phone;
  let items = [];
  try {
    const r = await fetch(`api/uploads?s=${token}&since=${got}`);
    if (r.ok) items = await r.json();
  } catch {}
  // Без server.js телефон кладёт фото в localStorage (страницы в одном браузере)
  if (!items.length) try { items = JSON.parse(localStorage.getItem(`nikamed-up-${token}`) || '[]').slice(got); } catch {}
  if (!items.length || !phone || phone.token !== token) return;
  phone.got += items.length;
  PATIENT.fileList.unshift(...items.map(f => ({ name: f.name, size: f.size, url: f.data, mime: 'image/jpeg',
    type: f.type, what: f.what, study: f.study || undefined, year: f.year, clinic: f.clinic, date: f.date,
    by: CURRENT_USER.short, at: `${today()} · с телефона` })));
  flash = `Получено с телефона: ${items.length} фото`;
  render();
}
function phonePanel(study, year) {
  ensurePhone(study, year);
  return `
    <div class="phone-up">
      <div class="qr">${phone.svg || `<span class="small muted">${phone.err ? esc(phone.err) : 'Создаём QR-код…'}</span>`}</div>
      <div>
        <div class="dz-t">С телефона — без сканера</div>
        <ol>
          <li>Наведите камеру телефона на QR-код</li>
          <li>Сфотографируйте ${study ? esc(study) : 'документ'} — можно несколько страниц</li>
          <li>Нажмите «Отправить» — фото появятся в списке ниже</li>
        </ol>
        <div class="phone-st"><span class="pulse-dot"></span>${phone.got ? `Получено фото: ${phone.got}. Ждём ещё…` : 'Ждём фото с телефона…'}</div>
        ${phone.url ? `<a class="small" href="${phone.url}" target="_blank">Открыть ссылку на этом компьютере</a>` : ''}
      </div>
    </div>`;
}

function modalFiles(q) {
  const year = +(q.year || 2026);
  const study = q.study || '';
  const p = PATIENT;
  const fileIc = '<svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M11.5 2.5H5.5a1.5 1.5 0 0 0-1.5 1.5v12a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5V7z"/><path d="M11.5 2.5V7H16"/></svg>';
  // Индексы в fileList: для исследования — только его файлы за год
  const ids = p.fileList.map((f, i) => i).filter(i => !study || (p.fileList[i].study === study && p.fileList[i].year === year));
  const base = filesHash(year, true, study);

  const drop = `
    <label class="dropzone" ondragover="event.preventDefault();this.classList.add('over')"
      ondragleave="this.classList.remove('over')" ondrop="onFilesDrop(event)">
      <input type="file" accept=".pdf,.jpg,.jpeg,.png,.svg,.doc,.docx" hidden onchange="this.files[0]&&pickFile(this.files[0])">
      <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M12 17v-6M9.5 13.5 12 11l2.5 2.5"/></svg>
      <div class="dz-t">${study ? `Загрузите результат: ${esc(study)}` : 'Перетащите файл сюда'}</div>
      <div class="dz-s">${study ? 'перетащите файл или ' : 'или '}<span class="dz-link">выберите файл на компьютере</span> · PDF, JPG, PNG, DOC</div>
      <div class="dz-s">${study ? `Файл попадёт в профосмотр ${year} года` : 'Заключения, результаты осмотров, анализы, ЭКГ, флюорография'}</div>
    </label>`;

  const form = pf && `
    <div class="pf-new">
      <div class="imp-file"><span class="muted">${fileIc}</span><b>${esc(pf.name)}</b><span class="muted">${pf.size}</span>
        <span class="spacer"></span><button class="btn btn-sm btn-ghost" onclick="pf=null;render()">Отмена</button></div>
      <form id="pf-form" class="form-grid two" onsubmit="event.preventDefault();attachFile()">
        <div class="f"><label>Тип документа</label>
          <select class="ctl" name="type">${FILE_TYPES.map(t => `<option ${t === pf.type ? 'selected' : ''}>${t}</option>`).join('')}</select></div>
        <div class="f"><label>Исследование</label>
          <select class="ctl" name="study"><option value="">—</option>${p.funcDiag.map(f => `<option ${f.n === pf.study ? 'selected' : ''}>${f.n}</option>`).join('')}</select></div>
        <div class="f"><label>Специалист или исследование</label>
          <input class="ctl" name="what" value="${esc(pf.what)}" placeholder="Например, кардиолог или ОАК"></div>
        <div class="f"><label>Клиника *</label>
          <input class="ctl" name="clinic" value="${esc(pf.clinic)}" placeholder="Кем выдан документ"></div>
        <div class="f"><label>Дата документа</label>
          <input class="ctl" type="date" name="date" value="${pf.date}"></div>
      </form>
      ${pf.err ? `<div class="form-err">${pf.err}</div>` : ''}
      <div class="pf-act"><button class="btn btn-primary" type="submit" form="pf-form">Прикрепить файл</button></div>
    </div>`;

  const list = ids.length ? `
    <div class="tbl-wrap files-tbl" style="box-shadow:none">
      <table class="wrap">
        <thead><tr><th>Документ</th><th>Клиника · специалист / исследование</th><th>Дата док.</th><th>Загружен</th><th></th></tr></thead>
        <tbody>${ids.map(i => { const f = p.fileList[i]; return `<tr>
          <td><div class="file-n"><span class="muted">${fileIc}</span><div>
            <a href="${base}&file=${i}">${esc(f.name)}</a>
            <div class="t-sub">${f.type} · ${f.size}</div></div></div></td>
          <td>${esc(f.clinic)}<div class="t-sub">${esc(f.what) || '—'}</div></td>
          <td class="mono">${f.date}</td>
          <td>${esc(f.by)}<div class="t-sub">${f.at}</div></td>
          <td class="f-del"><button class="icon-btn" title="Удалить файл" onclick="removeFile(${i})">×</button></td>
        </tr>`; }).join('')}</tbody>
      </table>
    </div>` : `<div class="empty">${study ? `Нет файлов «${esc(study)}» за ${year} год` : 'Файлов пока нет'}</div>`;

  return `
  <div class="overlay" onclick="if(event.target===this)closeFiles(${year})">
    <div class="modal wide">
      <div class="modal-h"><h3>${study ? `${esc(study)} · ${year}` : 'Файлы пациента'}</h3>
        <span class="small muted">${esc(p.shortFio)} · профосмотр № ${p.num}</span>
        <span class="x" onclick="closeFiles(${year})">×</span></div>
      <div class="modal-b">
        ${form || `<div class="up-grid">${drop}${phonePanel(study, year)}</div>`}
        <div class="files-h">${study ? 'Результаты' : 'Прикреплённые файлы'} · ${ids.length}</div>
        ${list}
      </div>
      <div class="modal-f">
        ${study ? `<button class="btn btn-ghost" onclick="pf=null;stopPhone();location.hash='${filesHash(year, true)}'">Все файлы пациента (${p.fileList.length})</button>` : ''}
        <span class="spacer"></span>
        <button class="btn" onclick="closeFiles(${year})">Закрыть</button></div>
    </div>
  </div>${p.fileList[q.file] ? fileViewer(ids, +q.file, base) : ''}${toast()}`;
}

/* Просмотр файла: изображения и PDF — в окне, остальное — скачать */
function fileViewer(ids, fi, base) {
  const f = PATIENT.fileList[fi];
  const ext = (f.name.split('.').pop() || '').toLowerCase();
  const isImg = /^image\//.test(f.mime || '') || ['svg', 'png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext);
  const isPdf = f.mime === 'application/pdf' || ext === 'pdf';
  const pos = ids.indexOf(fi);
  const nav = d => ids[pos + d] !== undefined ? `location.hash='${base}&file=${ids[pos + d]}'` : '';
  const close = `location.hash='${base}'`;
  const body = !f.url ? '<div class="empty">Файл недоступен для просмотра</div>'
    : isImg ? `<img src="${f.url}" alt="${esc(f.name)}">`
    : isPdf ? `<iframe src="${f.url}" title="${esc(f.name)}"></iframe>`
    : `<div class="empty">Просмотр этого формата недоступен.<br><a href="${f.url}" download="${esc(f.name)}">Скачать файл</a></div>`;
  return `
  <div class="overlay viewer" onclick="if(event.target===this)${close}">
    <div class="modal wide">
      <div class="modal-h"><h3>${esc(f.name)}</h3>
        <span class="small muted">${esc(f.what || f.type)} · ${esc(f.clinic)} · ${f.date}</span>
        <span class="x" onclick="${close}">×</span></div>
      <div class="viewer-b">${body}</div>
      <div class="modal-f">
        ${ids.length > 1 ? `<button class="btn" ${nav(-1) ? `onclick="${nav(-1)}"` : 'disabled'}>‹ Предыдущий</button>
          <span class="small muted">${pos + 1} из ${ids.length}</span>
          <button class="btn" ${nav(1) ? `onclick="${nav(1)}"` : 'disabled'}>Следующий ›</button>` : ''}
        <span class="spacer"></span>
        ${f.url ? `<a class="btn" href="${f.url}" target="_blank">Открыть в новой вкладке</a>
          <a class="btn" href="${f.url}" download="${esc(f.name)}">Скачать</a>` : ''}
        <button class="btn btn-primary" onclick="${close}">Закрыть</button></div>
    </div>
  </div>`;
}

/* ============ 4. ФОРМЫ ВРАЧЕЙ ============ */
const chk = (l, on) => `<label class="chk"><input type="checkbox" ${on ? 'checked' : ''}>${l}</label>`;
const seg = (opts, on) => `<span class="seg">${opts.map(o => `<button type="button" class="${o === on ? 'on' : ''}">${o}</button>`).join('')}</span>`;

// Выбор варианта в сегментированной кнопке
document.addEventListener('click', e => {
  const b = e.target.closest('.seg button');
  if (!b) return;
  b.parentElement.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
});
const txt = (v, ph, norm) => `<input class="ctl" style="max-width:280px" value="${v || ''}" placeholder="${ph || ''}"${norm !== undefined ? ` data-norm="${norm}"` : ''}>`;

/* ---------- Шаблоны комментариев ---------- */
// Шаблоны врача: правки из профиля хранятся в браузере, без них — стандартный набор
const TPL_KEY = 'nikamed-templates';
let templates = (() => {
  try { return JSON.parse(localStorage.getItem(TPL_KEY)) || DEFAULT_TEMPLATES; } catch { return DEFAULT_TEMPLATES; }
})().map(t => ({ ...t }));
function saveTemplates() { try { localStorage.setItem(TPL_KEY, JSON.stringify(templates)); } catch {} }

// Поле комментария с кнопкой «Шаблоны». Меню живёт в DOM без render(), чтобы не терять набранный текст
let cmSeq = 0;
function commentBox(ph, style = '') {
  const id = `cm-${++cmSeq}`;
  return `<div class="cm-box">
    <textarea id="${id}" class="ctl" style="${style}" placeholder="${ph}" onfocus="this.dataset.f=1"></textarea>
    <div class="cm-bar"><button type="button" class="btn btn-sm btn-ghost" onclick="openTplMenu(this,'${id}')">${I.tpl}Шаблоны</button></div>
  </div>`;
}
function closeTplMenu() {
  document.querySelector('.tpl-menu')?.remove();
  document.removeEventListener('mousedown', tplOutside, true);
  removeEventListener('scroll', tplScroll, true);
}
function tplOutside(e) { if (!e.target.closest('.tpl-menu, .cm-bar')) closeTplMenu(); }
// Меню привязано к экрану: при прокрутке страницы следует за кнопкой; прокрутку самого списка пропускаем
function tplScroll(e) {
  const m = document.querySelector('.tpl-menu');
  if (m && !(e.target instanceof Element && e.target.closest('.tpl-menu'))) placeTplMenu(m, m.parentElement.querySelector('button'));
}
function openTplMenu(btn, id) {
  const open = document.querySelector('.tpl-menu');
  closeTplMenu();
  if (open && open.dataset.for === id) return;
  const m = document.createElement('div');
  m.className = 'tpl-menu';
  m.dataset.for = id;
  m.innerHTML = `<input class="ctl" placeholder="Поиск по шаблонам" oninput="fillTplMenu(this.value)"
      onkeydown="if(event.key==='Escape')closeTplMenu();if(event.key==='Enter'){event.preventDefault();this.parentElement.querySelector('.tpl-item')?.click()}">
    <div class="tpl-items"></div>
    <a class="tpl-foot" href="#/profile">Настроить шаблоны</a>`;
  btn.parentElement.appendChild(m);
  fillTplMenu('');
  placeTplMenu(m, btn);
  m.querySelector('input').focus({ preventScroll: true });
  document.addEventListener('mousedown', tplOutside, true);
  addEventListener('scroll', tplScroll, true);
}
// Слева от кнопки: верх по кнопке, если хватает места вниз, иначе низ по кнопке; высоту подрезаем под экран
function placeTplMenu(m, btn) {
  const r = btn.getBoundingClientRect(), gap = 12, items = m.querySelector('.tpl-items');
  const below = innerHeight - r.top - gap, above = r.bottom - gap;
  const up = m.offsetHeight > below && above > below;
  items.style.maxHeight = `${Math.max(120, Math.min(300, (up ? above : below) - (m.offsetHeight - items.offsetHeight)))}px`;
  m.style.left = `${Math.max(gap, r.left - m.offsetWidth - 8)}px`;
  m.style.top = `${up ? r.bottom - m.offsetHeight : r.top}px`;
}
function fillTplMenu(qs) {
  const s = qs.trim().toLowerCase();
  const list = templates.filter(t => !s || `${t.title} ${t.text}`.toLowerCase().includes(s));
  const m = document.querySelector('.tpl-menu');
  m.querySelector('.tpl-items').innerHTML = list.length
    ? list.map(t => `<button type="button" class="tpl-item" onclick="insertTpl(${t.id})"><b>${esc(t.title)}</b><span>${esc(t.text)}</span></button>`).join('')
    : `<div class="tpl-none">${templates.length ? 'Ничего не найдено' : 'Шаблонов пока нет'}</div>`;
  if (m.style.top) placeTplMenu(m, m.parentElement.querySelector('button')); // высота изменилась — не отрываемся от кнопки
}
// Вставка в позицию курсора; если в поле ещё не ставили курсор — в конец
function insertTpl(tid) {
  const ta = document.getElementById(document.querySelector('.tpl-menu').dataset.for);
  const t = templates.find(x => x.id === tid);
  const [a, b] = ta.dataset.f ? [ta.selectionStart, ta.selectionEnd] : [ta.value.length, ta.value.length];
  const sep = a > 0 && !/\s$/.test(ta.value.slice(0, a)) ? ' ' : '';
  ta.setRangeText(sep + t.text, a, b, 'end');
  closeTplMenu();
  ta.focus();
}

// «Заполнить «Норма»»: выбирает «Норма»/«Нет», снимает отметки патологий, ставит нормальные значения полей
const NORM = ['Норма', 'Нет'];
function fillNorm(btn) {
  const card = btn.closest('.card');
  card.querySelectorAll('.seg').forEach(sg => {
    const bs = [...sg.querySelectorAll('button')];
    const n = bs.find(b => NORM.includes(b.textContent.trim()));
    if (n) bs.forEach(b => b.classList.toggle('on', b === n));
  });
  new Set([...card.querySelectorAll('.chk')].map(l => l.parentElement)).forEach(box => {
    const ls = [...box.querySelectorAll(':scope > .chk')];
    const n = ls.find(l => NORM.includes(l.textContent.trim()));
    // В таблице глаз ячейка без «Норма»/«Нет» — это только патологии
    if (n || box.closest('.eye-tbl')) ls.forEach(l => l.querySelector('input').checked = l === n);
  });
  card.querySelectorAll('input[data-norm]').forEach(i => i.value = i.dataset.norm);
}

// Поле выбора диагноза: ввод кода или текста, подсказки из ICD_DX
const dxPick = () => `<div class="dx-pick"><input class="ctl" placeholder="Код или название, например H52.1 или миопия"
  autocomplete="off" role="combobox" aria-expanded="false"><div class="dx-list" role="listbox"></div></div>`;

function dxRender(inp) {
  const box = inp.nextElementSibling;
  const q = inp.value.trim().toLowerCase();
  const hits = ICD_DX.filter(d => !q || d.code.toLowerCase().startsWith(q) || d.name.toLowerCase().includes(q)).slice(0, 8);
  const mark = s => {
    const i = q ? s.toLowerCase().indexOf(q) : -1;
    return i < 0 ? esc(s) : esc(s.slice(0, i)) + `<b>${esc(s.slice(i, i + q.length))}</b>` + esc(s.slice(i + q.length));
  };
  box.innerHTML = hits.length
    ? hits.map((d, i) => `<div class="dx-opt${i === 0 ? ' on' : ''}" role="option" data-v="${d.code} — ${esc(d.name)}">
        <span class="mono">${mark(d.code)}</span><span>${mark(d.name)}</span></div>`).join('')
    : '<div class="dx-empty">Ничего не найдено</div>';
  box.classList.add('open');
  inp.setAttribute('aria-expanded', 'true');
}
function dxClose(inp) {
  inp.nextElementSibling.classList.remove('open');
  inp.setAttribute('aria-expanded', 'false');
}
document.addEventListener('focusin', e => { if (e.target.matches('.dx-pick input')) dxRender(e.target); });
document.addEventListener('input', e => { if (e.target.matches('.dx-pick input')) dxRender(e.target); });
document.addEventListener('focusout', e => { if (e.target.matches('.dx-pick input')) dxClose(e.target); });
// mousedown, чтобы выбор сработал до потери фокуса
document.addEventListener('mousedown', e => {
  const o = e.target.closest('.dx-opt');
  if (!o) return;
  e.preventDefault();
  const inp = o.closest('.dx-pick').querySelector('input');
  inp.value = o.dataset.v;
  dxClose(inp);
});
document.addEventListener('keydown', e => {
  if (!e.target.matches('.dx-pick input')) return;
  const inp = e.target, box = inp.nextElementSibling;
  const opts = [...box.querySelectorAll('.dx-opt')];
  const i = opts.findIndex(o => o.classList.contains('on'));
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    if (!box.classList.contains('open')) return dxRender(inp);
    e.preventDefault();
    const n = opts[(i + (e.key === 'ArrowDown' ? 1 : -1) + opts.length) % opts.length];
    opts.forEach(o => o.classList.toggle('on', o === n));
    n && n.scrollIntoView({ block: 'nearest' });
  } else if (e.key === 'Enter' && box.classList.contains('open') && opts[i]) {
    e.preventDefault();
    inp.value = opts[i].dataset.v;
    dxClose(inp);
  } else if (e.key === 'Escape') dxClose(inp);
});

function formShell(title, tabs, activeTab, bodyHtml, footNote) {
  return `
  <div class="form-head">
    <div>
      <div class="ttl">${title}</div>
      <div class="meta">Профосмотр <a href="#/patient/1">№ ${PATIENT.num}</a> от ${PATIENT.date} · год медосмотра 2026 ·
        <b>${esc(PATIENT.fio)}</b> · ${esc(PATIENT.pos)}</div>
    </div>
  </div>

  <div class="card">
    ${tabs.length ? `<div class="tabs">${tabs.map((t, i) => `<button class="tab ${i === activeTab ? 'on' : ''}">${t}</button>`).join('')}</div>` : ''}
    ${bodyHtml}
    <div class="form-foot">
      <button class="btn btn-sm" onclick="fillNorm(this)">Заполнить «Норма»</button>
      <span class="inline-note">${footNote}</span>
      <span class="spacer"></span>
      <button class="btn btn-primary">Подписать заключение</button>
    </div>
  </div>`;
}

function viewReportEye() {
  // Таблица «показатель × левый/правый глаз»; шапка повторяется в каждом разделе
  const eyeRow = (label, l, r) =>
    `<tr><th scope="row">${label}</th><td>${l}</td><td>${r}</td></tr>`;
  const eyeHead = '<table class="eye-tbl"><colgroup><col class="c-lbl"><col><col></colgroup>' +
    '<thead><tr><th>Показатель</th><th>Левый глаз, OS</th><th>Правый глаз, OD</th></tr></thead><tbody>';
  const body = `
  <div class="fs">
    <div class="fs-t">Острота зрения</div>
    ${eyeHead}
      ${eyeRow('Без коррекции', txt('1.0', '', '1.0'), txt('1.0', '', '1.0'))}
      ${eyeRow('С коррекцией', txt('', 'не требуется', ''), txt('', 'не требуется', ''))}
      ${eyeRow('Орбита, положение глаз, двигательный аппарат', txt('Норма', '', 'Норма'), txt('Норма', '', 'Норма'))}
    </tbody></table>
  </div>

  <div class="fs">
    <div class="fs-t">Веки</div>
    ${eyeHead}
      ${eyeRow('Состояние век', chk('Норма', true), chk('Норма', true))}
      ${eyeRow('Ресничный край',
        `${chk('Утолщен')} ${chk('Чешуйки')} ${chk('Язвочки')} ${chk('Трихиаз')}`,
        `${chk('Утолщен')} ${chk('Чешуйки')} ${chk('Язвочки')} ${chk('Трихиаз')}`)}
      ${eyeRow('Конъюнктива век', seg(['Норма','Гиперемирована'],'Норма'), seg(['Норма','Гиперемирована'],'Норма'))}
      ${eyeRow('Отделяемое',
        `${chk('Нет', true)} ${chk('Немного')} ${chk('Слизистое')} ${chk('Гнойное')}`,
        `${chk('Нет', true)} ${chk('Немного')} ${chk('Слизистое')} ${chk('Гнойное')}`)}
    </tbody></table>
  </div>

  <div class="fs">
    <div class="fs-t">Слезные органы · Роговица</div>
    ${eyeHead}
      ${eyeRow('Проходимость', seg(['Норма','Активная','Пассивная'],'Норма'), seg(['Норма','Активная','Пассивная'],'Норма'))}
      ${eyeRow('Роговица', seg(['Норма','Прозрачная','Помутнение','Прочее'],'Норма'), seg(['Норма','Прозрачная','Помутнение','Прочее'],'Норма'))}
    </tbody></table>
  </div>

  <div class="fs">
    <div class="fs-t">Офтальмоскопия</div>
    ${eyeHead}
      ${eyeRow('Хрусталик', seg(['Норма','Помутнение','Артифакия'],'Норма'), seg(['Норма','Помутнение','Артифакия'],'Норма'))}
      ${eyeRow('Стекловидное тело', seg(['Норма','Деструкция','Помутнение'],'Норма'), seg(['Норма','Деструкция','Помутнение'],'Норма'))}
      ${eyeRow('Диск зрительного нерва', seg(['Норма','Бледный','Отёк','Экскавация'],'Норма'), seg(['Норма','Бледный','Отёк','Экскавация'],'Норма'))}
      ${eyeRow('Сосуды сетчатки', seg(['Норма','Сужены','Расширены','Извиты'],'Норма'), seg(['Норма','Сужены','Расширены','Извиты'],'Норма'))}
      ${eyeRow('Макулярная зона', seg(['Норма','Дистрофия','Отёк'],'Норма'), seg(['Норма','Дистрофия','Отёк'],'Норма'))}
      ${eyeRow('Периферия сетчатки', seg(['Норма','Дистрофия','Разрыв'],'Норма'), seg(['Норма','Дистрофия','Разрыв'],'Норма'))}
      ${eyeRow('Внутриглазное давление, мм рт. ст.', txt('18'), txt('18'))}
    </tbody></table>
  </div>

  <div class="fs">
    <div class="fs-t">Прочее</div>
    <div class="row"><span class="rl">Тест на дальтонизм</span>${chk('Норма', true)}${txt('', 'комментарий')}</div>
  </div>

  <div class="fs">
    <div class="fs-t">Заключение</div>
    <div class="row"><span class="rl">Диагноз (МКБ-10)</span>${dxPick()}</div>
    <div class="row" style="align-items:flex-start"><span class="rl" style="padding-top:10px">Комментарий</span>
      ${commentBox('Рекомендации, особенности осмотра', 'min-height:84px')}</div>
    <div class="row" style="align-items:flex-start"><span class="rl" style="padding-top:10px">Заключение по профилю</span>
      <div class="hg-list" style="padding-top:10px">${Object.values(SPEC_FIT).map(v => `<label class="hg"><input type="radio" name="spec-fit">${v.label}</label>`).join('')}</div></div>
    <div class="inline-note" style="margin-top:6px">Противопоказания — по прил. 3 к приказу № ҚР ДСМ-131/2020.
      Итоговое заключение о профпригодности выносит профпатолог.</div>
  </div>`;
  return shell('exams', 'Профосмотр офтальмолога',
    `<a href="#/exams">Профосмотры</a> <b>/</b> <a href="#/patient/1">${esc(PATIENT.shortFio)}</a> <b>/</b> Офтальмолог`,
    formShell('Профосмотр офтальмолога', [], 0, body,
      'Заполнено 19 из 21 поля'));
}

function viewReportTherapist() {
  const body = `
  <div class="fs">
    <div class="fs-t">Дыхательная система</div>
    <div class="row">
      <span class="rl">Дыхание</span>
      ${chk('Свободное', true)}${chk('Затруднённое')}${chk('Шумное')}${chk('Приступы удушья')}
    </div>
    <div class="row"><span class="rl">Хрипы</span>${chk('Нет', true)}${chk('Сухие')}${chk('Влажные')}
      ${chk('В нижнебоковых отделах')}${chk('В верхних отделах')}</div>
    <div class="row"><span class="rl">В лёгких</span>${seg(['Везикулярное','Жесткое','Ослабленное'],'Везикулярное')}</div>
  </div>

  <div class="fs">
    <div class="fs-t">Сердечно-сосудистая система</div>
    <div class="row"><span class="rl">Тоны сердца</span>${seg(['Ясные','Приглушенные','Глухие'],'Ясные')}</div>
    <div class="row"><span class="rl">Шумы</span>${chk('Нет', true)}${chk('Систолические')}${chk('Диастолические')}</div>
    <div class="row"><span class="rl">Артериальное давление</span>
      <input class="ctl mono" style="width:76px" value="122"> <span class="muted">/</span>
      <input class="ctl mono" style="width:76px" value="78"> <span class="muted">мм рт. ст.</span></div>
    <div class="row"><span class="rl">Пульс</span>
      <input class="ctl mono" style="width:76px" value="68"> <span class="muted">уд./мин</span>
      <span class="badge b-ok"><span class="dot"></span>Давление и пульс в пределах нормы</span></div>
    <div class="row"><span class="rl">ЭКГ заключение</span>${chk('Норма', true)}${txt('Ритм синусовый, ЧСС 68')}</div>
  </div>

  <div class="fs">
    <div class="fs-t">Пищеварительная система</div>
    <div class="row"><span class="rl">Язык</span>${chk('Влажный', true)}${chk('Сухой')}${chk('Обложен налетом')}</div>
    <div class="row"><span class="rl">Печень</span>${seg(['У края реберной дуги','Выступает'],'У края реберной дуги')}</div>
    <div class="row"><span class="rl">Живот</span>${chk('Мягкий безболезненный', true)}${chk('Напряженный')}${chk('Болезненный')}</div>
    <div class="row"><span class="rl">Стул</span>${chk('Оформленный', true)}${chk('Жидкий')}${chk('Склонный к запорам')}${chk('Регулярный', true)}</div>
  </div>

  <div class="fs">
    <div class="fs-t">Мочевыделительная · Костно-мышечная система</div>
    <div class="row"><span class="rl">Симптом поколачивания слева</span>${seg(['Положительный','Отрицательный'],'Отрицательный')}</div>
    <div class="row"><span class="rl">Симптом поколачивания справа</span>${seg(['Положительный','Отрицательный'],'Отрицательный')}</div>
    <div class="row"><span class="rl">Суставы</span>${chk('Без особенностей', true)}${chk('Деформированные')}${txt('', 'прочее')}</div>
  </div>

  <div class="fs">
    <div class="fs-t">Заключение</div>
    <div class="row" style="align-items:flex-start"><span class="rl" style="padding-top:10px">Комментарий</span>
      ${commentBox('Рекомендации, особенности осмотра', 'min-height:84px')}</div>
  </div>`;
  return shell('exams', 'Профосмотр терапевта',
    `<a href="#/exams">Профосмотры</a> <b>/</b> <a href="#/patient/1">${esc(PATIENT.shortFio)}</a> <b>/</b> Терапевт`,
    formShell('Профосмотр терапевта', ['Общий осмотр','Осмотр по системам','Диагноз'], 1, body,
      'Заполнено 18 из 20 полей'));
}

function viewReportDx() {
  const body = `
  <div class="fs">
    <div class="row" style="margin-bottom:14px">
      ${chk('Здоров — диагнозы отсутствуют', false)}
      <span class="spacer" style="margin-left:auto"></span>
      <button class="btn btn-sm btn-primary" onclick="location.hash='#/report/dx?modal=1'">+ Добавить диагноз МКБ-10</button>
    </div>
    <div class="tbl-wrap" style="box-shadow:none">
      <table>
        <thead><tr><th style="width:110px">Код МКБ-10</th><th>Диагноз</th><th style="width:150px">Выявлен впервые</th><th style="width:130px">Динамика</th><th style="width:44px"></th></tr></thead>
        <tbody>
          <tr><td><span class="mono" style="color:var(--accent-dk);font-weight:600">H52.1</span></td>
            <td>Миопия слабой степени обоих глаз</td>
            <td>${chk('Да', false)}</td>
            <td><span class="badge b-neutral">Без изменений</span></td><td class="ext">×</td></tr>
          <tr><td><span class="mono" style="color:var(--accent-dk);font-weight:600">H52.2</span></td>
            <td>Астигматизм</td>
            <td>${chk('Да', true)}</td>
            <td><span class="badge b-warn"><span class="dot"></span>Новый в 2026</span></td><td class="ext">×</td></tr>
        </tbody>
      </table>
    </div>
    <div class="alert info" style="margin-top:14px"><span class="ai">i</span><div>
      Диагнозы из прошлых лет подтягиваются автоматически — отметьте, сохранилась ли динамика.
      В 2025 году у пациента был зафиксирован <b>H52.1 Миопия</b>.</div></div>
  </div>`;
  return shell('exams', 'Профосмотр офтальмолога — Диагноз',
    `<a href="#/exams">Профосмотры</a> <b>/</b> <a href="#/patient/1">${esc(PATIENT.shortFio)}</a> <b>/</b> Офтальмолог`,
    formShell('Профосмотр офтальмолога', [], 0, body,
      'Диагнозов: 2'));
}

/* Форма профпатолога: итоговое «годен / негоден» по заключениям всех специалистов */
const ui = { mark: '', kind: '', group: 0, refs: [] };
// Вид заключения — без выбора по умолчанию, врач выбирает сам
const kindPick = keys => `<div class="kind-list">${keys.map(k => `<label class="hg"><input type="radio" name="kind"
  ${ui.kind === k ? 'checked' : ''} onchange="ui.kind='${k}';render()">${VERDICT[k].short}</label>`).join('')}</div>`;
function toggleRef(r, on) { ui.refs = on ? [...ui.refs, r] : ui.refs.filter(x => x !== r); }
function setMark(m) { ui.mark = m; ui.kind = ''; render(); }

function viewReportPathologist() {
  const docs = PATIENT.doctors[2026].filter(d => d.spec !== FINAL_SPEC);
  const waiting = docs.filter(d => d.state === 'wait');
  // Диагнозы специалиста; без заключения — статус
  const dxCell = d => d.state === 'done'
    ? (d.dx.length ? d.dx.map(([c, n]) => `<div><span class="mono" style="color:var(--accent-dk);font-weight:600">${c}</span> ${esc(n)}</div>`).join('')
      : '<span class="muted">Без патологии</span>')
    : d.state === 'wait' ? '<span class="badge b-warn"><span class="dot"></span>Ожидается</span>'
    : '<span class="badge b-neutral">Не требуется</span>';
  const fitCell = d => d.fit
    ? `<span class="badge ${SPEC_FIT[d.fit].cls}"><span class="dot"></span>${SPEC_FIT[d.fit].short}</span>`
    : '<span class="muted">—</span>';
  const m = ui.mark;

  const body = `
  <div class="fs">
    <div class="fs-t">Заключения специалистов</div>
    <div class="tbl-wrap" style="box-shadow:none">
      <table>
        <thead><tr><th>Специальность</th><th>Врач</th><th>Дата</th><th>Диагноз (МКБ-10)</th><th>Заключение</th></tr></thead>
        <tbody>${docs.map(d => `<tr>
          <td class="t-name">${d.spec}</td><td>${esc(d.who) || '<span class="muted">—</span>'}</td>
          <td class="mono">${d.state === 'done' ? d.at : '—'}</td><td>${dxCell(d)}</td><td>${fitCell(d)}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
    ${waiting.length ? `<div class="alert warn" style="margin:12px 0 0"><span class="ai">!</span><div>
      Нет заключений: <b>${waiting.map(d => d.spec.toLowerCase()).join(', ')}</b>.
      Подписать итоговое заключение можно только после всех обязательных специалистов.</div></div>` : ''}
  </div>

  <div class="fs">
    <div class="fs-t">Диагнозы и функциональная диагностика</div>
    <div class="row"><span class="rl">Диагнозы МКБ-10</span>
      <span><span class="mono" style="color:var(--accent-dk);font-weight:600">H52.1</span> Миопия слабой степени</span>
      <span><span class="mono" style="color:var(--accent-dk);font-weight:600">H52.2</span> Астигматизм
        <span class="badge b-warn" style="margin-left:4px">впервые</span></span></div>
    <div class="row"><span class="rl">Функц. диагностика</span>
      ${PATIENT.funcDiag.filter(f => studyFiles(f.n, 2026).length).map(f =>
        `<a class="badge b-neutral" href="${filesHash(2026, true, f.n)}">${f.n}</a>`).join('')}</div>
    <div class="row"><span class="rl">Профессиональная вредность</span><span>${esc(PATIENT.hazards)} · класс «${PATIENT.condClass}»</span></div>
  </div>

  <div class="fs">
    <div class="fs-t">Итоговое заключение о профпригодности</div>
    <div class="mark-pick">
      <button class="mp ok ${m === 'fit' ? 'on' : ''}" onclick="setMark('fit')">
        <span class="mp-t">Годен</span><span class="mp-s">профпригоден к работам</span></button>
      <button class="mp bad ${m === 'unfit' ? 'on' : ''}" onclick="setMark('unfit')">
        <span class="mp-t">Негоден</span><span class="mp-s">профнепригоден к работам</span></button>
    </div>
    ${m === 'fit' ? `
    <div class="form-grid" style="margin-top:14px">
      <div class="f"><label>Вид заключения</label>${kindPick(['fit', 'permFit'])}</div>
      <div class="f"><label>Годен на</label><select class="ctl"><option>1 год</option><option>2 года</option></select></div>
      <div class="f"><label>Допущен до</label><input class="ctl mono" value="27.07.2027" placeholder="дд.мм.гггг"></div>
    </div>` : m === 'unfit' ? `
    <div class="form-grid" style="margin-top:14px">
      <div class="f"><label>Вид заключения</label>${kindPick(['tempUnfit', 'permUnfit'])}</div>
      <div class="f"><label>Причина (МКБ-10)</label><input class="ctl" placeholder="код или диагноз"></div>
      <div class="f"><label>Повторный осмотр</label><input class="ctl mono" placeholder="дд.мм.гггг"></div>
    </div>` : '<div class="inline-note" style="margin-top:10px">Выберите отметку: годен или негоден.</div>'}
  </div>

  <div class="fs">
    <div class="fs-t">Группа здоровья <span class="small muted" style="font-weight:400">п. 21 Правил, приказ № ҚР ДСМ-131/2020</span></div>
    <div class="hg-list">${HEALTH_GROUPS.map((g, i) => `
      <label class="hg"><input type="radio" name="hg" ${ui.group === i + 1 ? 'checked' : ''}
        onchange="ui.group=${i + 1};render()">${g}</label>`).join('')}
    </div>
    ${ui.group === 6 ? `<div class="alert warn" style="margin:12px 0 0"><span class="ai">!</span><div>
      При признаках профессионального заболевания работник направляется в организацию, оказывающую помощь по профпатологии.</div></div>` : ''}
  </div>

  <div class="fs">
    <div class="fs-t">Рекомендации <span class="small muted" style="font-weight:400">попадают в поименные списки заключительного акта</span></div>
    <div class="ref-list">${REFERRALS.map(r => `<label class="chk"><input type="checkbox" ${ui.refs.includes(r) || (r === 'Направление в центр профпатологии' && ui.group === 6) ? 'checked' : ''}
      onchange="toggleRef('${r}', this.checked)">${r}</label>`).join('')}</div>
    <div class="f" style="margin-top:12px;max-width:760px"><label>Ограничения и комментарии</label>
      ${commentBox('необязательно', 'height:64px;resize:vertical')}</div>
  </div>`;

  return shell('exams', 'Итоговое заключение профпатолога',
    `<a href="#/exams">Профосмотры</a> <b>/</b> <a href="#/patient/1">${esc(PATIENT.shortFio)}</a> <b>/</b> Профпатолог`, `
  <div class="form-head">
    <div>
      <div class="ttl">Итоговое заключение профпатолога</div>
      <div class="meta">Профосмотр <a href="#/patient/1">№ ${PATIENT.num}</a> от ${PATIENT.date} · год медосмотра 2026 ·
        <b>${esc(PATIENT.fio)}</b> · ${esc(PATIENT.pos)}</div>
    </div>
    <span class="spacer" style="margin-left:auto"></span>
    <span class="badge b-accent">Решение о допуске к работе</span>
  </div>
  <div class="card">
    ${body}
    <div class="form-foot">
      <span class="inline-note">${waiting.length ? `Ожидается заключений: ${waiting.length}` : 'Все специалисты внесли заключения'}${m && !ui.kind ? ' · выберите вид заключения' : ''}${ui.group ? '' : ' · укажите группу здоровья'}</span>
      <span class="spacer"></span>
      <button class="btn btn-primary" ${waiting.length || !m || !ui.kind || !ui.group ? 'disabled' : ''}>Подписать и закрыть профосмотр</button>
    </div>
  </div>`);
}

/* Модальное окно выбора МКБ-10 */
function modalIcd() {
  return `
  <div class="overlay">
    <div class="modal">
      <div class="modal-h"><h3>Выбор диагноза МКБ-10</h3><span class="x">×</span></div>
      <div class="modal-b">
        <div class="f" style="margin-bottom:12px">
          <input class="ctl" value="миопия" placeholder="Код или название диагноза">
        </div>
        <div class="small muted" style="margin-bottom:6px">Частые диагнозы специальности «Офтальмолог»</div>
        ${ICD_SEARCH.map((d, i) => `
          <div class="pick ${i === 0 ? 'on' : ''}">
            <span class="code">${d.code}</span><span class="nm">${esc(d.name)}</span>
            <span class="tag">${d.fav ? '★ частый · ' : ''}${d.tag}</span>
          </div>`).join('')}
      </div>
      <div class="modal-f">
        <label class="chk"><input type="checkbox">Выявлен впервые</label>
        <span class="spacer"></span>
        <button class="btn">Отмена</button>
        <button class="btn btn-primary">Добавить H52.1</button>
      </div>
    </div>
  </div>`;
}

/* ============ 5. АДМИНИСТРИРОВАНИЕ ============ */
function viewAdmin() {
  const cards = [
    { k:'orgs',    i:I.org,    t:'Организации для профосмотра', d:'Договоры, подразделения, планы и списки лиц, подлежащих осмотру.', n:`${ORG_ROWS.length} организаций · ${ORG_ROWS.reduce((a, o) => a + o.staff, 0).toLocaleString('ru')} сотрудников` },
    { k:'doctors', i:I.doc,    t:'Врачи',                        d:'Специальности, сертификаты, доступ к формам заключений.',         n:`${DOCTOR_ROWS.length} врачей · 1 сертификат истекает` },
    { k:'admins',  i:I.shield, t:'Администраторы',               d:'Учётные записи, роли и области видимости данных.',                n:`${ADMIN_ROWS.length} учётных записей` },
    { k:'icd10',   i:I.book,   t:'МКБ-10',                       d:'Справочник диагнозов, архивные коды, частые диагнозы.',           n:'14 400 кодов · ред. 2025' }
  ];
  return shell('admin', 'Администрирование', 'Главная <b>/</b> Администрирование', `
  <div class="adm">
    ${cards.map(c => `
      <a class="adm-c" href="#/${c.k}">
        <div class="adm-ic">${c.i}</div>
        <div class="adm-t">${c.t}</div>
        <div class="adm-d">${c.d}</div>
        <div class="adm-n">${c.n}</div>
      </a>`).join('')}
  </div>`);
}

/* ---------- Роль просмотра (демо): администратор МЦ или HR конкретной организации ---------- */
let role = { kind: 'admin' };
function setRole(v) { role = v === 'admin' ? { kind: 'admin' } : { kind: 'hr', org: +v }; render(); }
const canSeeOrg = i => role.kind === 'admin' || role.org === i;

function roleSwitch() {
  const hrs = ADMIN_ROWS.filter(a => a.role === 'HR организации');
  const cur = role.kind === 'admin' ? 'admin' : String(role.org);
  return `<div class="role-switch" title="Переключатель только для прототипа">
    <span>Смотреть как</span>
    <select class="ctl" onchange="setRole(this.value)">
      <option value="admin" ${cur === 'admin' ? 'selected' : ''}>Администратор МЦ</option>
      ${hrs.map(h => `<option value="${h.org}" ${cur === String(h.org) ? 'selected' : ''}>HR · ${esc(ORG_ROWS[h.org].name)}</option>`).join('')}
    </select></div>`;
}

let flash = '';
const toast = () => { if (!flash) return ''; const t = flash; flash = ''; return `<div class="toast">${esc(t)}</div>`; };

function viewOrgs() {
  const list = ORG_ROWS.map((o, i) => ({ o, i })).filter(r => canSeeOrg(r.i));
  return shell('orgs', 'Организации для профосмотра',
    'Главная <b>/</b> <a href="#/admin">Администрирование</a>', `
  <div class="page-head">
    <div class="sub">Организации, с которыми заключён договор на проведение обязательных медицинских осмотров.
      ${role.kind === 'hr' ? '<br>Вы HR организации — видна только ваша организация.' : 'Нажмите на организацию, чтобы открыть список сотрудников.'}</div>
    <span class="spacer"></span>
    ${roleSwitch()}
    ${role.kind === 'admin' ? '<button class="btn btn-primary btn-sm">+ Добавить организацию</button>' : ''}
  </div>
  <div class="tbl-wrap">
    <table>
      <thead><tr><th>Организация</th><th>БИН</th><th>Город</th><th class="num">Подразд.</th>
        <th class="num">Сотрудников</th><th style="width:190px">План 2026 / выполнено</th>
        <th>Договор</th><th>Действует до</th><th></th></tr></thead>
      <tbody>${list.map(({ o, i }) => {
        const pct = Math.round(o.done / o.plan * 100);
        return `<tr onclick="location.hash='#/orgs/${i}'">
          <td class="t-name">${esc(o.name)}</td>
          <td class="mono">${esc(o.bin)}</td><td>${esc(o.city)}</td>
          <td class="num mono">${o.depts}</td><td class="num mono">${o.staff.toLocaleString('ru')}</td>
          <td><div class="small"><b>${o.done.toLocaleString('ru')}</b> <span class="muted">из ${o.plan.toLocaleString('ru')} · ${pct}%</span></div>
            <div class="prog"><i style="width:${pct}%;background:${pct >= 70 ? 'var(--ok)' : pct >= 50 ? 'var(--accent)' : 'var(--warn)'}"></i></div></td>
          <td class="mono">${esc(o.contract)}</td><td class="mono">${esc(o.till)}</td>
          <td class="go">›</td></tr>`;
      }).join('')}</tbody>
    </table>
  </div>`);
}

/* ---------- Организация: сотрудники ---------- */
const lastExam = iin => EXAMS.filter(e => e.iin === iin).sort((a, b) => b.year - a.year)[0];

function viewOrg(oi, q) {
  const o = ORG_ROWS[oi];
  if (!o) return viewOrgs();
  const crumbs = 'Главная <b>/</b> <a href="#/admin">Администрирование</a> <b>/</b> <a href="#/orgs">Организации</a>';

  if (!canSeeOrg(oi)) return shell('orgs', esc(o.name), crumbs, `
  <div class="page-head"><span class="spacer"></span>${roleSwitch()}</div>
  <div class="card" style="max-width:640px"><div class="card-body">
    <div class="alert warn" style="margin:0"><span class="ai">!</span><div>
      <b>Нет доступа.</b> Список сотрудников «${esc(o.name)}» доступен только администраторам МЦ и HR этой организации.</div></div>
  </div></div>`);

  const emps = EMPLOYEES.map((e, i) => ({ e, i })).filter(r => r.e.org === oi);
  const depts = [...new Set(emps.map(r => r.e.dept))].sort();
  const access = [
    ...ADMIN_ROWS.filter(a => a.active && a.role !== 'HR организации' && (a.orgs === 'Все организации' || a.orgs === o.name)),
    ...ADMIN_ROWS.filter(a => a.role === 'HR организации' && a.org === oi)
  ];
  const pct = Math.round(o.done / o.plan * 100);

  const examCell = e => {
    const x = lastExam(e.iin);
    if (!x) return '<span class="muted small">нет данных</span>';
    return x.verdict !== 'none' ? `${badge(VERDICT, x.verdict)} <span class="small muted">${x.year}</span>`
      : `${badge(STATUS, x.status)} <span class="small muted">${x.year}</span>`;
  };

  let modal = '';
  if (q.modal === 'emp') modal = modalEmp(oi, q.e === 'new' ? -1 : +q.e);
  if (q.modal === 'org') modal = modalOrg(oi);
  if (q.modal === 'import') modal = modalImport(oi);
  if (q.modal === 'act') modal = modalAct(oi);

  return shell('orgs', esc(o.name), crumbs, `
  <div class="page-head">
    <div class="sub">Список лиц, подлежащих обязательному медосмотру. Данные можно редактировать и загружать из Excel.
      <div class="small muted" style="margin-top:2px">Работодатель передаёт список в медицинскую организацию не позднее 1 декабря.</div></div>
    <span class="spacer"></span>
    ${roleSwitch()}
  </div>

  <div class="org-top">
    <div class="card">
      <div class="card-head"><h3>Реквизиты и договор</h3><span class="spacer"></span>
        <button class="btn btn-sm" onclick="location.hash='#/orgs/${oi}?modal=act'">Заключительный акт</button>
        <button class="btn btn-sm" onclick="location.hash='#/orgs/${oi}?modal=org'">Редактировать</button></div>
      <div class="card-body org-kv">
        <div class="kv"><span class="k">БИН</span><span class="v mono">${esc(o.bin)}</span></div>
        <div class="kv"><span class="k">Город</span><span class="v">${esc(o.city)}</span></div>
        <div class="kv"><span class="k">Договор</span><span class="v mono">${esc(o.contract)}</span></div>
        <div class="kv"><span class="k">Действует до</span><span class="v mono">${esc(o.till)}</span></div>
        <div class="kv"><span class="k">Подразделений</span><span class="v">${o.depts}</span></div>
        <div class="kv"><span class="k">Сотрудников</span><span class="v">${o.staff.toLocaleString('ru')}</span></div>
        <div class="kv" style="grid-column:1/-1"><span class="k">План 2026 / выполнено</span>
          <span class="v">${o.done.toLocaleString('ru')} из ${o.plan.toLocaleString('ru')} · ${pct}%</span></div>
      </div>
    </div>
    <div class="card">
      <div class="card-head"><h3>Доступ к странице</h3></div>
      <div class="card-body" style="padding-top:6px">
        <div class="small muted" style="margin-bottom:6px">Только администраторы МЦ и HR этой организации.</div>
        ${access.map(a => `<div class="kv"><span class="k"><b style="color:var(--text);font-weight:550">${esc(a.fio)}</b></span>
          <span class="v"><span class="badge ${a.role === 'HR организации' ? 'b-accent' : 'b-neutral'}">${a.role === 'HR организации' ? 'HR' : esc(a.role)}</span></span></div>`).join('')}
      </div>
    </div>
  </div>

  <div class="tbl-wrap">
    <div class="tbl-top">
      <div class="qsearch" style="width:300px">${I.search}<input id="emp-q" placeholder="ФИО, ИИН или табельный №" oninput="filterEmp()"></div>
      <select class="ctl" id="emp-dept" style="width:240px" onchange="filterEmp()">
        <option value="">Все подразделения</option>${depts.map(d => `<option>${esc(d)}</option>`).join('')}</select>
      <span class="cnt">Найдено <b id="emp-cnt">${emps.length}</b></span>
      <span class="spacer"></span>
      <button class="btn btn-sm" onclick="openImport(${oi})">Импорт из Excel</button>
      <button class="btn btn-primary btn-sm" onclick="location.hash='#/orgs/${oi}?modal=emp&e=new'">+ Добавить сотрудника</button>
    </div>
    <table>
      <thead><tr><th>Таб. №</th><th>Сотрудник</th><th>ИИН</th><th>Дата рожд.</th><th>Должность</th>
        <th>Код усл. труда</th><th>Вредность</th><th>Последний профосмотр</th><th></th></tr></thead>
      <tbody>${emps.map(({ e, i }) => `
        <tr class="emp-row" data-s="${esc((e.fio + ' ' + e.iin + ' ' + e.tab).toLowerCase())}" data-d="${esc(e.dept)}"
          onclick="location.hash='#/orgs/${oi}?modal=emp&e=${i}'">
          <td class="mono">${esc(e.tab)}</td>
          <td><div class="t-name trunc" style="max-width:230px">${esc(e.fio)}</div>
            <div class="t-sub trunc" style="max-width:230px">${esc(e.dept)}</div></td>
          <td class="mono">${esc(e.iin)}</td><td class="mono">${esc(e.dob)}</td>
          <td class="trunc" style="max-width:200px">${esc(e.pos)}</td>
          <td class="mono">${esc(e.cond)}</td>
          <td class="trunc small" style="max-width:170px">${esc(e.hazards)}</td>
          <td>${examCell(e)}</td>
          <td class="ext" title="Редактировать">✎</td>
        </tr>`).join('')}
      </tbody>
    </table>
    ${emps.length ? '' : '<div class="empty">Сотрудников пока нет — добавьте вручную или импортируйте из Excel.</div>'}
  </div>
  ${modal}${toast()}`);
}

function filterEmp() {
  const s = $('#emp-q').value.trim().toLowerCase(), d = $('#emp-dept').value;
  let n = 0;
  document.querySelectorAll('.emp-row').forEach(tr => {
    const show = (!s || tr.dataset.s.includes(s)) && (!d || tr.dataset.d === d);
    tr.hidden = !show; if (show) n++;
  });
  $('#emp-cnt').textContent = n;
}

/* Поля сотрудника: [ключ, подпись, placeholder, класс] */
const EMP_FIELDS = [
  ['fio', 'ФИО', 'Фамилия Имя Отчество', 'wide'], ['iin', 'ИИН', '12 цифр', 'mono'],
  ['tab', 'Табельный №', '', 'mono'], ['dob', 'Дата рождения', 'дд.мм.гггг', 'mono'], ['sex', 'Пол', '', ''],
  ['dept', 'Подразделение', '', ''], ['pos', 'Должность', '', ''], ['hired', 'Дата приёма', 'дд.мм.гггг', 'mono'],
  ['cond', 'Код условий труда', '', 'mono'], ['hazards', 'Профвредность (пункты Прил. 4)', '', 'wide'], ['phone', 'Телефон', '+7', 'mono']
];

function modalEmp(oi, idx) {
  const e = idx >= 0 ? EMPLOYEES[idx] : { org: oi, sex: 'м' };
  const fld = ([k, l, ph, cls]) => `<div class="f ${cls === 'wide' ? 'span2' : ''}"><label>${l}</label>${k === 'sex'
    ? `<select class="ctl" name="sex"><option value="м" ${e.sex !== 'ж' ? 'selected' : ''}>Мужской</option><option value="ж" ${e.sex === 'ж' ? 'selected' : ''}>Женский</option></select>`
    : `<input class="ctl ${cls === 'mono' ? 'mono' : ''}" name="${k}" value="${esc(e[k] || '')}" placeholder="${ph}">`}</div>`;
  return `
  <div class="overlay" onclick="if(event.target===this)location.hash='#/orgs/${oi}'">
    <div class="modal sm">
      <div class="modal-h"><h3>${idx >= 0 ? 'Редактирование сотрудника' : 'Новый сотрудник'}</h3>
        <span class="x" onclick="location.hash='#/orgs/${oi}'">×</span></div>
      <div class="modal-b"><form id="emp-form" class="form-grid two" onsubmit="event.preventDefault();saveEmp(${oi},${idx})">
        ${EMP_FIELDS.map(fld).join('')}</form>
        <div id="form-err" class="form-err" hidden></div></div>
      <div class="modal-f">
        ${idx >= 0 ? `<button class="btn btn-ghost" style="color:var(--danger)" onclick="delEmp(this,${oi},${idx})">Удалить из списка</button>` : ''}
        <span class="spacer"></span>
        <button class="btn" onclick="location.hash='#/orgs/${oi}'">Отмена</button>
        <button class="btn btn-primary" onclick="saveEmp(${oi},${idx})">Сохранить</button>
      </div>
    </div>
  </div>`;
}

function formErr(msg) { const el = $('#form-err'); el.textContent = msg; el.hidden = false; }

function saveEmp(oi, idx) {
  const d = Object.fromEntries(new FormData($('#emp-form')).entries());
  for (const k in d) d[k] = d[k].trim();
  if (!d.fio) return formErr('Укажите ФИО.');
  if (!/^\d{12}$/.test(d.iin)) return formErr('ИИН должен состоять из 12 цифр.');
  if (EMPLOYEES.some((x, i) => i !== idx && x.org === oi && x.iin === d.iin)) return formErr('Сотрудник с таким ИИН уже есть в списке.');
  if (d.dob && !/^\d{2}\.\d{2}\.\d{4}$/.test(d.dob)) return formErr('Дата рождения в формате дд.мм.гггг.');
  if (idx >= 0) Object.assign(EMPLOYEES[idx], d);
  else { EMPLOYEES.push({ org: oi, ...d, dob: d.dob || dobFromIin(d.iin) }); ORG_ROWS[oi].staff++; }
  flash = idx >= 0 ? 'Данные сотрудника сохранены' : 'Сотрудник добавлен';
  location.hash = `#/orgs/${oi}`;
}

function delEmp(btn, oi, idx) {
  if (!btn.dataset.sure) { btn.dataset.sure = 1; btn.textContent = 'Нажмите ещё раз для удаления'; return; }
  EMPLOYEES.splice(idx, 1); ORG_ROWS[oi].staff--;
  flash = 'Сотрудник удалён из списка';
  location.hash = `#/orgs/${oi}`;
}

const ORG_FIELDS = [['name', 'Наименование', 'span2'], ['bin', 'БИН', 'mono'], ['city', 'Город', ''],
  ['contract', 'Номер договора', 'mono'], ['till', 'Договор действует до', 'mono'],
  ['depts', 'Подразделений', 'mono'], ['plan', 'План осмотров 2026', 'mono']];

/* Заключительный акт по итогам периодического осмотра (п. 15 Правил). Цифры в прототипе — расчётные. */
function modalAct(oi) {
  const o = ORG_ROWS[oi];
  const share = (n, parts) => { const r = parts.map(p => Math.round(n * p)); r[0] += n - r.reduce((a, b) => a + b, 0); return r; };
  const women = Math.round(o.staff * 0.18), womenDone = Math.round(o.done * 0.17);
  const missed = o.plan - o.done;
  const reasons = share(missed, [0.38, 0.22, 0.27, 0.08, 0.05]);
  const groups = share(o.done, [0.41, 0.27, 0.17, 0.08, 0.05, 0.02]);
  const refs = [Math.round(o.done * 0.004), Math.round(o.done * 0.012), Math.round(o.done * 0.06),
    Math.round(o.done * 0.15), groups[2] + groups[3], groups[5]];
  const names = EMPLOYEES.filter(e => e.org === oi);
  const pct = (n, of) => of ? (n / of * 100).toFixed(1).replace('.', ',') + '%' : '—';
  const n = v => v.toLocaleString('ru');

  return `
  <div class="overlay" onclick="if(event.target===this)location.hash='#/orgs/${oi}'">
    <div class="modal wide">
      <div class="modal-h"><h3>Заключительный акт · 2026</h3>
        <span class="small muted">${esc(o.name)} · периодический медосмотр</span>
        <span class="x" onclick="location.hash='#/orgs/${oi}'">×</span></div>
      <div class="modal-b">
        <div class="alert info"><span class="ai">i</span><div>
          Составляется в течение <b>30 календарных дней</b> после окончания осмотра, в 4 экземплярах.
          Подписывает председатель врачебной комиссии — профпатолог. Приказ № ҚР ДСМ-131/2020, прил. 2.</div></div>

        <div class="act-kpis">
          <div><span>Работников всего</span><b>${n(o.staff)}</b><i>в т. ч. женщин ${n(women)}</i></div>
          <div><span>Подлежали осмотру</span><b>${n(o.plan)}</b><i>по списку работодателя</i></div>
          <div><span>Прошли осмотр</span><b>${n(o.done)}</b><i>в т. ч. женщин ${n(womenDone)}</i></div>
          <div><span>Охват</span><b>${pct(o.done, o.plan)}</b><i>не прошли: ${n(missed)}</i></div>
        </div>

        <div class="act-grid">
          <div>
            <div class="files-h">Распределение по группам здоровья</div>
            <table class="wrap act-tbl"><tbody>${HEALTH_GROUPS.map((g, i) => `
              <tr><td class="mono muted" style="width:28px">${i + 1}</td><td>${g}</td>
                <td class="num">${n(groups[i])}</td><td class="num muted" style="width:70px">${pct(groups[i], o.done)}</td></tr>`).join('')}
            </tbody></table>
          </div>
          <div>
            <div class="files-h">Не прошли осмотр по причинам</div>
            <table class="wrap act-tbl"><tbody>${NO_SHOW_REASONS.map((r, i) => `
              <tr><td>${r}</td><td class="num">${n(reasons[i])}</td></tr>`).join('')}
              <tr><td><b>Всего</b></td><td class="num"><b>${n(missed)}</b></td></tr>
            </tbody></table>
          </div>
        </div>

        <div class="files-h">Поименные списки по рекомендациям</div>
        <table class="wrap act-tbl"><tbody>${REFERRALS.map((r, i) => `
          <tr><td style="width:300px">${r}</td><td class="num" style="width:70px">${n(refs[i])}</td>
            <td class="small muted">${refs[i] ? names.slice(i * 2, i * 2 + 2).map(e => esc(e.fio)).join(', ') + (refs[i] > 2 ? ` и ещё ${n(refs[i] - 2)}` : '') : '—'}</td></tr>`).join('')}
        </tbody></table>
      </div>
      <div class="modal-f">
        <span class="small muted">Председатель врачебной комиссии: <b>Есенова Б. Н.</b>, профпатолог</span>
        <span class="spacer"></span>
        <button class="btn" onclick="location.hash='#/orgs/${oi}'">Закрыть</button>
        <button class="btn btn-primary" title="В прототипе недоступно">Сформировать PDF</button>
      </div>
    </div>
  </div>`;
}

function modalOrg(oi) {
  const o = ORG_ROWS[oi];
  return `
  <div class="overlay" onclick="if(event.target===this)location.hash='#/orgs/${oi}'">
    <div class="modal sm">
      <div class="modal-h"><h3>Реквизиты организации</h3><span class="x" onclick="location.hash='#/orgs/${oi}'">×</span></div>
      <div class="modal-b"><form id="org-form" class="form-grid two" onsubmit="event.preventDefault();saveOrg(${oi})">
        ${ORG_FIELDS.map(([k, l, cls]) => `<div class="f ${cls === 'span2' ? 'span2' : ''}"><label>${l}</label>
          <input class="ctl ${cls === 'mono' ? 'mono' : ''}" name="${k}" value="${esc(o[k])}"></div>`).join('')}
      </form><div id="form-err" class="form-err" hidden></div></div>
      <div class="modal-f"><span class="spacer"></span>
        <button class="btn" onclick="location.hash='#/orgs/${oi}'">Отмена</button>
        <button class="btn btn-primary" onclick="saveOrg(${oi})">Сохранить</button></div>
    </div>
  </div>`;
}

function saveOrg(oi) {
  const d = Object.fromEntries(new FormData($('#org-form')).entries());
  for (const k in d) d[k] = d[k].trim();
  if (!d.name) return formErr('Укажите наименование.');
  if (!/^\d{12}$/.test(d.bin)) return formErr('БИН должен состоять из 12 цифр.');
  if (!(+d.depts >= 0) || !(+d.plan > 0)) return formErr('Подразделения и план — числа.');
  const o = ORG_ROWS[oi], old = o.name;
  Object.assign(o, d, { depts: +d.depts, plan: +d.plan });
  if (ORGS[oi] === old) ORGS[oi] = o.name;
  ADMIN_ROWS.forEach(a => { if (a.orgs === old) a.orgs = o.name; });
  flash = 'Реквизиты организации сохранены';
  location.hash = `#/orgs/${oi}`;
}

/* ---------- Импорт сотрудников из Excel ---------- */
const XLSX_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
let imp = null; // { org, file, rows, busy, error }

function loadXlsx() {
  if (window.XLSX) return Promise.resolve();
  return new Promise((ok, fail) => {
    const s = document.createElement('script');
    s.src = XLSX_SRC; s.onload = ok; s.onerror = () => fail(new Error('Не удалось загрузить модуль чтения Excel. Проверьте подключение к интернету.'));
    document.head.appendChild(s);
  });
}

function openImport(oi) { imp = { org: oi }; location.hash = `#/orgs/${oi}?modal=import`; }
function closeImport(oi) { imp = null; location.hash = `#/orgs/${oi}`; }

/* Заголовок столбца → поле сотрудника */
const COLS = {
  fio: ['фио', 'фамилияимяотчество', 'сотрудник', 'работник'], last: ['фамилия'], first: ['имя'], mid: ['отчество'],
  iin: ['иин'], dob: ['датарождения'], sex: ['пол'], tab: ['табельныйномер', 'табельный', 'табномер', 'таб'],
  dept: ['подразделение', 'цех', 'участок'], pos: ['должность', 'профессия'], hired: ['датаприема', 'датаприёма'],
  cond: ['кодусловийтруда', 'кодусловий'], hazards: ['профвредность', 'вредность', 'вредныефакторы'], phone: ['телефон']
};
const normHead = h => String(h).toLowerCase().replace(/[^a-zа-яёәіңғүұқөһ]/g, '');
const pad2 = n => String(n).padStart(2, '0');
const fmtDate = v => v instanceof Date ? `${pad2(v.getDate())}.${pad2(v.getMonth() + 1)}.${v.getFullYear()}` : String(v ?? '').trim();

function dobFromIin(iin) {
  const c = +iin[6];
  const cent = c <= 2 ? 1800 : c <= 4 ? 1900 : 2000;
  return `${iin.slice(4, 6)}.${iin.slice(2, 4)}.${cent + +iin.slice(0, 2)}`;
}

function parseRows(raw, oi) {
  const heads = Object.keys(raw[0] || {});
  const map = {};
  for (const h of heads) {
    const n = normHead(h);
    for (const [k, al] of Object.entries(COLS)) if (!map[k] && al.includes(n)) map[k] = h;
  }
  if (!map.iin || !(map.fio || map.last)) throw new Error('В файле не найдены обязательные столбцы «ФИО» и «ИИН». Скачайте шаблон и проверьте заголовки.');
  const existing = new Map(EMPLOYEES.filter(e => e.org === oi).map(e => [e.iin, e]));
  const seen = new Set();
  return raw.map((r, n) => {
    const get = k => map[k] ? fmtDate(r[map[k]]) : '';
    let iin = get('iin').replace(/\s/g, '');
    if (/^\d{11}$/.test(iin)) iin = '0' + iin; // Excel теряет ведущий ноль
    const e = {
      fio: get('fio') || [get('last'), get('first'), get('mid')].filter(Boolean).join(' '),
      iin, dob: get('dob'), tab: get('tab'), dept: get('dept'), pos: get('pos'), hired: get('hired'),
      cond: get('cond'), hazards: get('hazards'), phone: get('phone'),
      sex: /^ж/i.test(get('sex')) ? 'ж' : /^м/i.test(get('sex')) ? 'м' : ''
    };
    let err = '';
    if (!e.fio) err = 'нет ФИО';
    else if (!/^\d{12}$/.test(iin)) err = 'ИИН не 12 цифр';
    else if (seen.has(iin)) err = 'ИИН повторяется в файле';
    if (!err) {
      seen.add(iin);
      if (!e.dob) e.dob = dobFromIin(iin);
      if (!e.sex) e.sex = [4, 6].includes(+iin[6]) ? 'ж' : 'м';
    }
    return { line: n + 2, e, err, upd: !err && existing.has(iin) };
  }).filter(r => r.e.fio || r.e.iin);
}

async function readImportFile(file) {
  if (!imp) return;
  if (!/\.(xlsx|xls|csv)$/i.test(file.name)) { imp.error = 'Поддерживаются файлы .xlsx, .xls и .csv'; imp.rows = null; return render(); }
  Object.assign(imp, { file: file.name, busy: true, error: '', rows: null });
  render();
  try {
    await loadXlsx();
    const wb = /\.csv$/i.test(file.name) // CSV читаем как текст, чтобы не сломать кириллицу
      ? XLSX.read(await file.text(), { type: 'string', cellDates: true })
      : XLSX.read(await file.arrayBuffer(), { type: 'array', cellDates: true });
    const raw = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { defval: '', raw: true });
    if (!raw.length) throw new Error('Файл пуст — на первом листе нет строк с данными.');
    imp.rows = parseRows(raw, imp.org);
  } catch (e) { imp.error = e.message; }
  imp.busy = false;
  render();
}

function onImpDrop(ev) {
  ev.preventDefault();
  ev.currentTarget.classList.remove('over');
  const f = ev.dataTransfer.files[0];
  if (f) readImportFile(f);
}

async function downloadTemplate() {
  try { await loadXlsx(); } catch (e) { imp.error = e.message; return render(); }
  const ws = XLSX.utils.aoa_to_sheet([
    ['Табельный №', 'ФИО', 'ИИН', 'Дата рождения', 'Пол', 'Подразделение', 'Должность', 'Дата приёма', 'Код условий труда', 'Профвредность', 'Телефон'],
    ['01201', 'Иванов Иван Иванович', '850101300001', '01.01.1985', 'м', 'Цех №1', 'Слесарь 5р', '10.03.2015', '00842', 'Прил. 4, разд. 1 п. 87', '+7 701 000 00 00']
  ]);
  ws['!cols'] = [10, 34, 16, 14, 6, 26, 26, 14, 16, 26, 18].map(w => ({ wch: w }));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Сотрудники');
  XLSX.writeFile(wb, 'Шаблон импорта сотрудников.xlsx');
}

function applyImport() {
  const ok = imp.rows.filter(r => !r.err);
  let added = 0, updated = 0;
  for (const { e, upd } of ok) {
    const cur = EMPLOYEES.find(x => x.org === imp.org && x.iin === e.iin);
    if (upd && cur) { for (const k in e) if (e[k]) cur[k] = e[k]; updated++; }
    else { EMPLOYEES.push({ org: imp.org, ...e }); added++; }
  }
  ORG_ROWS[imp.org].staff += added;
  flash = `Импорт завершён: добавлено ${added}, обновлено ${updated}`;
  closeImport(imp.org);
}

function modalImport(oi) {
  if (!imp || imp.org !== oi) imp = { org: oi };
  const rows = imp.rows;
  const ok = rows ? rows.filter(r => !r.err) : [];
  const cnt = rows ? { add: ok.filter(r => !r.upd).length, upd: ok.filter(r => r.upd).length, err: rows.length - ok.length } : null;

  const drop = `
    <label class="dropzone ${imp.busy ? 'busy' : ''}" ondragover="event.preventDefault();this.classList.add('over')"
      ondragleave="this.classList.remove('over')" ondrop="onImpDrop(event)">
      <input type="file" accept=".xlsx,.xls,.csv" hidden onchange="this.files[0]&&readImportFile(this.files[0])">
      <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M12 17v-6M9.5 13.5 12 11l2.5 2.5"/></svg>
      <div class="dz-t">${imp.busy ? `Читаем файл «${esc(imp.file)}»…` : 'Перетащите файл Excel сюда'}</div>
      <div class="dz-s">или <span class="dz-link">выберите файл на компьютере</span> · .xlsx, .xls, .csv</div>
    </label>`;

  const preview = rows ? `
    <div class="imp-file">
      <span>Файл: <b>${esc(imp.file)}</b> · строк: ${rows.length}</span>
      <span class="spacer"></span>
      <label class="btn btn-sm">Выбрать другой файл
        <input type="file" accept=".xlsx,.xls,.csv" hidden onchange="this.files[0]&&readImportFile(this.files[0])"></label>
    </div>
    <div class="imp-sum">
      <span class="badge b-ok"><span class="dot"></span>Новых: ${cnt.add}</span>
      <span class="badge b-info"><span class="dot"></span>Обновятся: ${cnt.upd}</span>
      <span class="badge ${cnt.err ? 'b-danger' : 'b-neutral'}"><span class="dot"></span>С ошибками: ${cnt.err}</span>
    </div>
    <div class="tbl-wrap imp-tbl" style="box-shadow:none">
      <table>
        <thead><tr><th>Стр.</th><th>ФИО</th><th>ИИН</th><th>Подразделение</th><th>Должность</th><th>Статус</th></tr></thead>
        <tbody>${rows.map(r => `<tr>
          <td class="mono muted">${r.line}</td><td>${esc(r.e.fio) || '—'}</td><td class="mono">${esc(r.e.iin) || '—'}</td>
          <td>${esc(r.e.dept) || '—'}</td><td>${esc(r.e.pos) || '—'}</td>
          <td>${r.err ? `<span class="badge b-danger">${r.err}</span>` : r.upd ? '<span class="badge b-info">обновление</span>' : '<span class="badge b-ok">новый</span>'}</td>
        </tr>`).join('')}</tbody>
      </table>
    </div>` : '';

  return `
  <div class="overlay" onclick="if(event.target===this)closeImport(${oi})">
    <div class="modal">
      <div class="modal-h"><h3>Импорт сотрудников из Excel</h3>
        <span class="small muted">${esc(ORG_ROWS[oi].name)}</span>
        <span class="x" onclick="closeImport(${oi})">×</span></div>
      <div class="modal-b">
        ${imp.error ? `<div class="alert warn"><span class="ai">!</span><div>${esc(imp.error)}</div></div>` : ''}
        ${rows ? preview : drop}
        ${rows ? '' : `
        <div class="tpl">
          <div class="tpl-ic">XLSX</div>
          <div class="tpl-txt">
            <div class="tpl-t">Шаблон для импорта</div>
            <div class="tpl-s">Скачайте, заполните и загрузите — столбцы уже названы правильно.</div>
          </div>
          <button class="btn tpl-btn" onclick="downloadTemplate()">
            <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 3v10M5.5 8.5 10 13l4.5-4.5M4 16.5h12"/></svg>
            Скачать шаблон</button>
        </div>
        <div class="imp-help">
          Обязательные столбцы: <b>ФИО</b> (или Фамилия, Имя, Отчество) и <b>ИИН</b>.
          Необязательные: табельный №, дата рождения, пол, подразделение, должность, дата приёма, код условий труда, профвредность, телефон.
          Сотрудники с уже существующим ИИН будут обновлены.</div>`}
      </div>
      <div class="modal-f"><span class="spacer"></span>
        <button class="btn" onclick="closeImport(${oi})">Отмена</button>
        <button class="btn btn-primary" onclick="applyImport()" ${ok.length ? '' : 'disabled'}>Импортировать${ok.length ? ` (${ok.length})` : ''}</button>
      </div>
    </div>
  </div>`;
}

/* Файл, брошенный мимо зоны загрузки, браузер не должен открывать */
window.addEventListener('dragover', e => e.preventDefault());
window.addEventListener('drop', e => e.preventDefault());

function viewDoctors() {
  return shell('doctors', 'Врачи', 'Главная <b>/</b> <a href="#/admin">Администрирование</a>', `
  <div class="page-head">
    <div class="sub">Врачи, допущенные к внесению заключений. Специальность определяет доступную форму осмотра.</div>
    <span class="spacer"></span><button class="btn btn-primary btn-sm">+ Добавить врача</button>
  </div>
  <div class="tbl-wrap">
    <table>
      <thead><tr><th>ФИО</th><th>Специальность</th><th>Сертификат</th><th>Действует до</th>
        <th>Мед. центр</th><th class="num">Осмотров за месяц</th><th>Доступ</th></tr></thead>
      <tbody>${DOCTOR_ROWS.map(d => {
        const soon = ['11.12.2026', '07.02.2026'].includes(d.till);
        return `<tr>
          <td class="t-name">${esc(d.fio)}</td>
          <td>${d.spec}</td><td class="mono">${d.cert}</td>
          <td class="mono">${d.till} ${soon ? '<span class="badge b-warn" style="margin-left:6px"><span class="dot"></span>истекает</span>' : ''}</td>
          <td>${d.org}</td><td class="num mono">${d.load}</td>
          <td>${d.active ? '<span class="badge b-ok"><span class="dot"></span>Активен</span>'
                         : '<span class="badge b-neutral"><span class="dot"></span>Заблокирован</span>'}</td>
        </tr>`;
      }).join('')}</tbody>
    </table>
  </div>`);
}

function viewAdmins() {
  return shell('admins', 'Администраторы', 'Главная <b>/</b> <a href="#/admin">Администрирование</a>', `
  <div class="page-head">
    <div class="sub">Учётные записи с административным доступом и областью видимости организаций.</div>
    <span class="spacer"></span><button class="btn btn-primary btn-sm">+ Добавить администратора</button>
  </div>
  <div class="tbl-wrap">
    <table>
      <thead><tr><th>ФИО</th><th>Роль</th><th>Логин</th><th>Область видимости</th><th>Последний вход</th><th>Статус</th></tr></thead>
      <tbody>${ADMIN_ROWS.map(a => `<tr>
        <td class="t-name">${esc(a.fio)}</td><td>${a.role}</td><td class="mono">${a.login}</td>
        <td>${esc(a.orgs)}</td><td class="mono">${a.last}</td>
        <td>${a.active ? '<span class="badge b-ok"><span class="dot"></span>Активен</span>'
                       : '<span class="badge b-neutral"><span class="dot"></span>Отключен</span>'}</td></tr>`).join('')}
      </tbody>
    </table>
  </div>`);
}

function viewIcd() {
  return shell('icd10', 'МКБ-10', 'Главная <b>/</b> <a href="#/admin">Администрирование</a>', `
  <div class="page-head">
    <div class="sub">Международная классификация болезней, 10-й пересмотр. Редакция 2025 · 14 400 кодов.</div>
    <span class="spacer"></span>
    <div class="qsearch" style="width:280px">${I.search}<input placeholder="Код или название диагноза"></div>
    <button class="btn btn-sm">Показать архивные</button>
  </div>
  <div class="tbl-wrap">
    <table class="tree">
      <thead><tr><th style="width:280px">Код МКБ-10</th><th>Наименование</th><th style="width:120px">В архиве</th></tr></thead>
      <tbody>${ICD_TREE.map(n => `
        <tr class="${n.sel ? 'sel' : ''}">
          <td class="ind-${n.lvl}"><span class="tw">
            <span class="caret">${n.leaf ? '' : `<svg viewBox="0 0 12 12" style="transform:rotate(${n.open ? 90 : 0}deg)">
              <path d="M4.5 2.5 8 6l-3.5 3.5" fill="none" stroke="currentColor" stroke-width="1.6"
                stroke-linecap="round" stroke-linejoin="round"/></svg>`}</span>
            <span class="${n.leaf ? 'leaf' : 'fold'}">${n.leaf
              ? `<svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="2.2" fill="currentColor"/></svg>`
              : `<svg viewBox="0 0 16 14" fill="none" stroke="currentColor" stroke-width="1.4"><path
                 d="M1.6 12V2.6A1 1 0 0 1 2.6 1.6h3.1l1.5 1.8h5.2a1 1 0 0 1 1 1V12a1 1 0 0 1-1 1H2.6a1 1 0 0 1-1-1z"
                 stroke-linejoin="round"/></svg>`}</span>
            <span class="mono" style="font-weight:${n.lvl < 2 ? 600 : 500};color:${n.lvl < 2 ? 'var(--text)' : 'var(--accent-dk)'}">${n.code}</span>
          </span></td>
          <td style="${n.lvl < 2 ? 'font-weight:550' : ''}">${esc(n.name)}</td>
          <td class="muted small">—</td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>`);
}

/* ============ 6. ОТЧЕТЫ ============ */
function viewReports() {
  const months = [
    { m:'Янв', c:64, a:18, n:6 }, { m:'Фев', c:78, a:22, n:5 }, { m:'Мар', c:96, a:26, n:8 },
    { m:'Апр', c:88, a:24, n:7 }, { m:'Май', c:104, a:30, n:9 }, { m:'Июн', c:142, a:38, n:12 },
    { m:'Июл', c:168, a:44, n:11 }, { m:'Авг', c:154, a:41, n:10 }, { m:'Сен', c:74, a:69, n:4 }
  ];
  const max = 230;
  const px = v => Math.round(v / max * 150);

  return shell('reports', 'Отчеты', 'Главная', `
  <div class="filters">
    <div class="filter-grid">
      <div class="f"><label>Период</label><select class="ctl"><option>2026 год</option><option>I полугодие 2026</option></select></div>
      <div class="f"><label>Организация</label><select class="ctl"><option>Все организации</option>${ORGS.map(o=>`<option>${o}</option>`).join('')}</select></div>
      <div class="f"><label>Подразделение</label><select class="ctl"><option>Все</option></select></div>
      <div class="f"><label>Специальность</label><select class="ctl"><option>Все</option>${SPECIALTIES.map(s=>`<option>${s}</option>`).join('')}</select></div>
      <div class="f"><label>&nbsp;</label><button class="btn btn-primary" style="height:34px">Сформировать</button></div>
    </div>
  </div>

  <div class="rep-grid">
    <div class="card"><div class="card-body">
      <div class="small muted">Охвачено профосмотром</div>
      <div class="big">1 284</div>
      <div class="small muted">из плана 2 140 · 60%</div>
      <div class="prog"><i style="width:60%"></i></div>
    </div></div>
    <div class="card"><div class="card-body">
      <div class="small muted">Профнепригодны (временно)</div>
      <div class="big" style="color:var(--danger)">37</div>
      <div class="small muted">2,9% от закрытых · +6 к 2025</div>
      <div class="prog"><i style="width:29%;background:var(--danger)"></i></div>
    </div></div>
    <div class="card"><div class="card-body">
      <div class="small muted">Неявка</div>
      <div class="big" style="color:var(--warn)">43</div>
      <div class="small muted">3,3% · требуют повторной записи</div>
      <div class="prog"><i style="width:33%;background:var(--warn)"></i></div>
    </div></div>
  </div>

  <div class="two-col">
    <div class="card">
      <div class="card-head"><h3>Динамика профосмотров по месяцам</h3>
        <span class="spacer"></span><span class="small muted">2026 год</span></div>
      <div class="card-body">
        <div class="chart">
          ${months.map(m => `
            <div class="bar">
              <div class="stack" style="height:${px(m.c + m.a + m.n)}px">
                <i style="height:${px(m.n)}px;background:#d2b377"></i>
                <i style="height:${px(m.a)}px;background:#6784bd"></i>
                <i style="height:${px(m.c)}px;background:#5a9a73"></i>
              </div>
            </div>`).join('')}
        </div>
        <div class="xaxis">${months.map(m => `<span>${m.m}</span>`).join('')}</div>
        <div class="legend">
          <span><i style="background:#5a9a73"></i>Закрыт</span>
          <span><i style="background:#6784bd"></i>Действует</span>
          <span><i style="background:#d2b377"></i>Неявка</span>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-head"><h3>Готовые отчеты</h3></div>
      <div class="card-body" style="padding-top:8px">
        ${[
          ['Форма 025-у — Заключение по профосмотру','PDF · по сотруднику'],
          ['Сводный акт по организации','XLSX · по организации и подразделениям'],
          ['Список лиц, не прошедших осмотр','XLSX · неявки и незавершённые'],
          ['Реестр профнепригодных','XLSX · с кодами МКБ-10'],
          ['Нагрузка врачей за период','XLSX · по специальностям'],
          ['Выявлено впервые (диагнозы)','XLSX · МКБ-10, динамика по годам']
        ].map(r => `
          <div class="kv"><span class="k"><b style="color:var(--text);font-weight:550">${r[0]}</b>
            <div class="t-sub">${r[1]}</div></span>
            <span class="v"><button class="btn btn-sm">Выгрузить</button></span></div>`).join('')}
      </div>
    </div>
  </div>`);
}

/* ---------- Рендер ---------- */
const protoBanner = () =>
  `<div class="proto-banner">Это прототип и не является реальным ПО. Функционал может поменяться.</div>`;

/* ============ ПРОФИЛЬ ВРАЧА ============ */
let tplEdit = null; // шаблон в редактировании: { id, title, text, err }; id 0 — новый
function editTpl(id) {
  const t = templates.find(x => x.id === id);
  tplEdit = t ? { ...t } : { id: 0, title: '', text: '' };
  render();
  document.querySelector('.tpl-edit input')?.focus();
}
function saveTpl() {
  const fd = new FormData(document.querySelector('.tpl-edit'));
  const title = fd.get('title').trim(), text = fd.get('text').trim();
  if (!title || !text) { Object.assign(tplEdit, { title, text, err: 'Заполните название и текст шаблона' }); return render(); }
  if (tplEdit.id) Object.assign(templates.find(x => x.id === tplEdit.id), { title, text });
  else templates.push({ id: Math.max(0, ...templates.map(x => x.id)) + 1, title, text });
  saveTemplates();
  tplEdit = null;
  flash = 'Шаблон сохранён';
  render();
}
function delTpl(id) {
  const t = templates.find(x => x.id === id);
  if (!confirm(`Удалить шаблон «${t.title}»?`)) return;
  templates = templates.filter(x => x.id !== id);
  saveTemplates();
  flash = 'Шаблон удалён';
  render();
}
function resetTpls() {
  if (!confirm('Вернуть стандартный набор шаблонов? Ваши шаблоны будут удалены.')) return;
  templates = DEFAULT_TEMPLATES.map(t => ({ ...t }));
  saveTemplates();
  tplEdit = null;
  flash = 'Восстановлены стандартные шаблоны';
  render();
}

function viewProfile() {
  const [spec, center] = CURRENT_USER.role.split(' · ');
  const editor = t => `
    <form class="tpl-edit" onsubmit="event.preventDefault();saveTpl()">
      <div class="f"><label>Название</label>
        <input class="ctl" name="title" value="${esc(t.title)}" maxlength="60" placeholder="Например, Без патологии"></div>
      <div class="f"><label>Текст</label>
        <textarea class="ctl" name="text" rows="4" placeholder="Текст, который вставится в комментарий">${esc(t.text)}</textarea></div>
      ${t.err ? `<div class="form-err">${t.err}</div>` : ''}
      <div class="tpl-act"><button type="button" class="btn" onclick="tplEdit=null;render()">Отмена</button>
        <button class="btn btn-primary">Сохранить</button></div>
    </form>`;
  const row = t => tplEdit && tplEdit.id === t.id ? `<li>${editor(tplEdit)}</li>` : `
    <li class="tpl-row">
      <div><div class="ctpl-t">${esc(t.title)}</div><div class="ctpl-x">${esc(t.text)}</div></div>
      <button class="btn btn-sm" onclick="editTpl(${t.id})">Изменить</button>
      <button class="icon-btn" title="Удалить шаблон" onclick="delTpl(${t.id})">×</button>
    </li>`;

  return shell('profile', 'Профиль врача', 'Главная <b>/</b> Профиль', `
  <div class="card" style="margin-bottom:16px">
    <div class="card-body prof">
      <div class="pt-ava">${CURRENT_USER.initials}</div>
      <div><div class="pt-name">${esc(CURRENT_USER.fio)}</div>
        <div class="pt-facts"><span>Специальность <b>${esc(spec)}</b></span><span>Медицинский центр <b>${esc(center)}</b></span></div></div>
    </div>
  </div>
  <div class="card">
    <div class="card-head"><h3>Шаблоны комментариев</h3>
      <span class="small muted">вставляются кнопкой «Шаблоны» у полей комментариев в формах осмотра</span>
      <span class="spacer"></span>
      <button class="btn btn-sm btn-ghost" onclick="resetTpls()">Стандартный набор</button>
      <button class="btn btn-sm btn-primary" onclick="editTpl(0)" ${tplEdit ? 'disabled' : ''}>+ Новый шаблон</button></div>
    <ul class="tpl-list">
      ${tplEdit && !tplEdit.id ? `<li>${editor(tplEdit)}</li>` : ''}
      ${templates.map(row).join('')}
      ${!templates.length && !tplEdit ? '<li class="empty">Шаблонов пока нет</li>' : ''}
    </ul>
  </div>${toast()}`);
}

function render() {
  const { view, id, q } = route();
  const map = {
    exams: () => viewExams(q),
    search: viewSearch,
    patient: () => viewPatient(q),
    report: () => q.tab === 'dx' ? viewReportDx() : q.doc === 'therapist' ? viewReportTherapist()
      : q.doc === 'pathologist' ? viewReportPathologist() : viewReportEye(),
    admin: viewAdmin, orgs: () => id !== '' ? viewOrg(+id, q) : viewOrgs(), doctors: viewDoctors, admins: viewAdmins,
    icd10: viewIcd, reports: viewReports, profile: viewProfile
  };
  let html = (map[view] || map.exams)();
  if (q.modal === '1') html += modalIcd();
  if (view === 'patient' && q.modal === 'files') html += modalFiles(q);
  document.body.innerHTML = protoBanner() + html;
}

window.addEventListener('hashchange', render);
render();
