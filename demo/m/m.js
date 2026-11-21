/* Nika Med — мобильный сайт для фото документов.
 * Открывается по QR-коду из окна «Файлы» карточки пациента:
 * m/#s=<сессия>&e=<№ профосмотра>&y=<год>&st=<исследование>.
 * Камера фотографирует анализ, фото сжимается и уходит на компьютер врача. */

const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));
const today = () => new Date().toLocaleDateString('ru-RU');
const fmtSize = b => b < 1024 * 1024 ? `${Math.max(1, Math.round(b / 1024))} КБ` : `${(b / 1024 / 1024).toFixed(1)} МБ`;

const q = Object.fromEntries(new URLSearchParams(location.hash.slice(1)));
// В прототипе одна подробная карта пациента — берём её из data.js
const patient = q.s && PATIENT.num === q.e ? PATIENT : null;
const year = +(q.y || 2026);
const DOC_KINDS = [...PATIENT.funcDiag.map(f => f.n).filter(n => n !== 'Базовые показатели'),
  'Заключение специалиста', 'Прочее'];
const studyType = k => k === 'КДЛ' ? 'Анализ'
  : ['Заключение специалиста', 'Прочее'].includes(k) ? k : 'Функциональная диагностика';

const st = {
  kind: DOC_KINDS.includes(q.st) ? q.st : '',
  pages: [],       // { data, size }
  clinic: 'МЦ «Денсаулық»',
  screen: 'main',  // main | sending | done | error
  sent: 0, err: ''
};

const ic = {
  cam: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2.2l1.5-2h5.6l1.5 2h2.2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z"/><circle cx="12" cy="12.8" r="3.4"/></svg>',
  plus: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  ok: '<svg viewBox="0 0 48 48" width="64" height="64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="20"/><path d="m15 24.5 6 6 12-13"/></svg>',
  qr: '<svg viewBox="0 0 48 48" width="64" height="64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="7" width="12" height="12" rx="1.5"/><rect x="29" y="7" width="12" height="12" rx="1.5"/><rect x="7" y="29" width="12" height="12" rx="1.5"/><path d="M29 29h5v5h-5zM36 36h5v5M29 41h3M41 29v3"/></svg>'
};

const header = `
  <header class="top">
    <span class="logo">N</span>
    <div><div class="brand">Nika Med</div><div class="sub">Фото документов для профосмотра</div></div>
  </header>`;

function render() {
  $('#app').innerHTML = header + (!patient ? viewNoSession()
    : st.screen === 'done' ? viewDone()
    : st.screen === 'error' ? viewError()
    : viewMain());
}

function viewNoSession() {
  return `<main class="center">
    <div class="big-ic">${ic.qr}</div>
    <h1>Отсканируйте QR-код</h1>
    <p class="muted">Откройте карточку пациента на компьютере, нажмите «Файлы» и наведите камеру телефона на QR-код.</p>
  </main>`;
}

function viewMain() {
  const n = st.pages.length;
  const sending = st.screen === 'sending';
  return `<main>
    <section class="card pt">
      <div class="pt-n">${esc(patient.fio)}</div>
      <div class="muted">Профосмотр № ${esc(patient.num)} · ${year}</div>
      <div class="muted">${esc(patient.org)}</div>
    </section>

    <h2>Что фотографируем</h2>
    <div class="chips">${DOC_KINDS.map(k => `
      <button class="chip ${k === st.kind ? 'on' : ''}" ${sending ? 'disabled' : ''} onclick="st.kind='${k}';render()">${k}</button>`).join('')}
    </div>

    <h2>Страницы${n ? ` · ${n}` : ''}</h2>
    ${n ? `<div class="pages">${st.pages.map((p, i) => `
      <figure class="page"><img src="${p.data}" alt="Страница ${i + 1}">
        <figcaption>${i + 1}</figcaption>
        ${sending ? '' : `<button class="del" aria-label="Удалить страницу" onclick="st.pages.splice(${i},1);render()">×</button>`}
      </figure>`).join('')}
      ${sending ? '' : `<label class="page add">${ic.plus}<span>Ещё страница</span>${camInput()}</label>`}
    </div>` : `
    <label class="shoot">${ic.cam}<span>Сфотографировать документ</span>${camInput()}</label>
    <p class="hint">Положите лист на ровную поверхность при хорошем свете, чтобы текст был резким и попал в кадр целиком.</p>`}

    ${n ? `<h2>Клиника</h2>
    <input class="ctl" value="${esc(st.clinic)}" placeholder="Кем выдан документ" oninput="st.clinic=this.value" ${sending ? 'disabled' : ''}>` : ''}
  </main>
  ${n ? `<footer class="bar">
    ${!st.kind ? '<div class="warn">Выберите, что фотографируете</div>' : ''}
    <button class="btn" ${!st.kind || sending ? 'disabled' : ''} onclick="send()">
      ${sending ? `Отправка ${st.sent + 1} из ${n}…` : `Отправить ${n} ${plural(n, 'фото', 'фото', 'фото')} на компьютер`}</button>
    ${sending ? `<div class="prog"><span style="width:${Math.round(st.sent / n * 100)}%"></span></div>` : ''}
  </footer>` : ''}`;
}

function viewDone() {
  return `<main class="center">
    <div class="big-ic ok">${ic.ok}</div>
    <h1>Отправлено</h1>
    <p class="muted">${st.sent} ${plural(st.sent, 'страница', 'страницы', 'страниц')} · ${esc(st.kind)}.<br>
      Файлы уже в карточке пациента на компьютере.</p>
    <button class="btn" onclick="again()">Сфотографировать ещё документ</button>
    <p class="hint">Страницу можно закрыть.</p>
  </main>`;
}

function viewError() {
  return `<main class="center">
    <h1>Не удалось отправить</h1>
    <p class="muted">${esc(st.err)}</p>
    <button class="btn" onclick="st.screen='main';render()">Попробовать снова</button>
  </main>`;
}

// capture="environment" открывает заднюю камеру; работает и без HTTPS
const camInput = () => `<input type="file" accept="image/*" capture="environment" hidden onchange="addPhoto(this.files[0])">`;
const plural = (n, one, few, many) => n % 10 === 1 && n % 100 !== 11 ? one
  : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? few : many;

// Сжимаем до 2000 px по длинной стороне: текст анализа читается, файл ~300–600 КБ
async function addPhoto(file) {
  if (!file) return;
  const img = await new Promise((ok, fail) => {
    const im = new Image();
    im.onload = () => ok(im); im.onerror = fail;
    im.src = URL.createObjectURL(file);
  });
  const k = Math.min(1, 2000 / Math.max(img.naturalWidth, img.naturalHeight));
  const c = document.createElement('canvas');
  c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k);
  c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
  const data = c.toDataURL('image/jpeg', 0.85);
  st.pages.push({ data, size: fmtSize(data.length * 0.75) });
  render();
}

async function send() {
  st.screen = 'sending'; st.sent = 0; render();
  const n = st.pages.length;
  const stamp = today().replace(/\./g, '-');
  try {
    for (const [i, p] of st.pages.entries()) {
      await upload({
        name: `${st.kind}_${stamp}${n > 1 ? `_стр${i + 1}` : ''}.jpg`, size: p.size, data: p.data,
        type: studyType(st.kind), study: PATIENT.funcDiag.some(f => f.n === st.kind) ? st.kind : '',
        what: st.kind, clinic: st.clinic.trim() || 'МЦ «Денсаулық»', date: today(), year
      });
      st.sent = i + 1; render();
    }
    st.screen = 'done';
  } catch (e) {
    st.screen = 'error'; st.err = e.message;
  }
  render();
}

// Сервер прототипа (node server.js) принимает фото по API. Без него —
// localStorage: работает, когда обе страницы открыты в одном браузере.
async function upload(item) {
  const r = await fetch(`../api/upload?s=${encodeURIComponent(q.s)}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item)
  }).catch(() => null);
  if (r && r.ok) return;
  const key = `nikamed-up-${q.s}`;
  try {
    const list = JSON.parse(localStorage.getItem(key) || '[]');
    list.push(item);
    localStorage.setItem(key, JSON.stringify(list));
  } catch {
    throw new Error('Нет связи с компьютером. Проверьте, что телефон в той же Wi-Fi сети.');
  }
}

function again() { st.pages = []; st.sent = 0; st.screen = 'main'; render(); }

render();
