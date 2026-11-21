/* Проверка демо-данных: запуск `node check-iin.js`
 *
 * Все ИИН в data.js должны быть СТРУКТУРНО правильными (12 цифр, дата рождения
 * в первых 6 цифрах, корректный признак века/пола) и одновременно проваливать
 * проверку контрольной цифры — тогда ИИН гарантированно не принадлежит
 * реальному человеку. Скрипт падает с кодом 1, если это не так.
 */
const fs = require('fs');
const src = fs.readFileSync(__dirname + '/data.js', 'utf8');
eval(src.replace(/^const /gm, 'var '));

const W1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const W2 = [3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 2];

// Контрольная цифра ИИН РК. null — комбинация недопустима.
function controlDigit(iin) {
  const d = [...iin].map(Number);
  const sum = w => w.reduce((a, wi, i) => a + wi * d[i], 0) % 11;
  let c = sum(W1);
  if (c === 10) { c = sum(W2); if (c === 10) return null; }
  return c;
}

function checkFormat(iin, dob, sex) {
  if (!/^\d{12}$/.test(iin)) return 'не 12 цифр';
  const [dd, mm, yyyy] = dob.split('.');
  if (iin.slice(0, 6) !== yyyy.slice(2) + mm + dd) return `первые 6 цифр != дате рождения ${dob}`;
  const century = +iin[6];
  const expect = yyyy < 2000 ? (sex === 'ж' ? 4 : 3) : (sex === 'ж' ? 6 : 5);
  if (century !== expect) return `признак века/пола ${century}, ожидался ${expect}`;
  return null;
}

// Пол выводим из 7-й цифры, поэтому здесь проверяем только согласованность с датой.
const people = new Map();
for (const e of EXAMS) people.set(e.iin, { iin: e.iin, dob: e.dob, fio: e.fio });
people.set(PATIENT.iin, { iin: PATIENT.iin, dob: PATIENT.dob, fio: PATIENT.fio });
for (const e of EMPLOYEES) people.set(e.iin, { iin: e.iin, dob: e.dob, fio: e.fio });

let bad = 0;
for (const p of people.values()) {
  const sex = [4, 6].includes(+p.iin[6]) ? 'ж' : 'м';
  const fmt = checkFormat(p.iin, p.dob, sex);
  const ctrl = controlDigit(p.iin);
  const valid = ctrl !== null && ctrl === +p.iin[11];
  if (fmt) { console.log(`ФОРМАТ  ${p.iin}  ${p.fio} — ${fmt}`); bad++; }
  if (valid) { console.log(`ОПАСНО  ${p.iin}  ${p.fio} — контрольная цифра ВЕРНА, ИИН может быть реальным`); bad++; }
}

console.log(`\nПроверено ИИН: ${people.size}`);
if (bad) { console.log(`Проблем: ${bad}`); process.exit(1); }
console.log('Все ИИН структурно корректны и заведомо недействительны. OK');
