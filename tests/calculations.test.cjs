const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

function loadCalculationsModule({ currentData, savedData, getCurrentMonthDataThrows = false }) {
  const context = {
    state: {
      currentMonth: '2026-09',
      months: {
        '2026-09': savedData,
      },
    },
    getCurrentMonthData() {
      if (getCurrentMonthDataThrows) throw new Error('missing form');
      return currentData;
    },
  };

  const source = fs.readFileSync(path.join(__dirname, '..', 'js', 'modules', 'calculations.js'), 'utf8');
  vm.createContext(context);
  vm.runInContext(`${source}\nglobalThis.__isCurrentMonthSaved = isCurrentMonthSaved;`, context);
  return context;
}

test('isCurrentMonthSaved compara datos equivalentes aunque cambie el orden de claves', () => {
  const app = loadCalculationsModule({
    currentData: {
      month: '2026-09',
      names: { p1: 'Ana', p2: 'Bruno' },
      categories: [
        { id: 'alimentos', name: 'Alimentos', items: [{ amount: 100, currency: 'ARS', name: 'Super' }] },
      ],
    },
    savedData: {
      categories: [
        { items: [{ name: 'Super', currency: 'ARS', amount: 100 }], name: 'Alimentos', id: 'alimentos' },
      ],
      names: { p2: 'Bruno', p1: 'Ana' },
      month: '2026-09',
    },
  });

  assert.equal(app.__isCurrentMonthSaved(), true);
});

test('isCurrentMonthSaved queda pendiente si no puede leer los datos actuales', () => {
  const app = loadCalculationsModule({
    currentData: {},
    savedData: { month: '2026-09' },
    getCurrentMonthDataThrows: true,
  });

  assert.equal(app.__isCurrentMonthSaved(), false);
});
