const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.join(__dirname, '..');
const runtimeFiles = [
  'index.html',
  'js/core/state.js',
  'js/core/ui.js',
  'js/modules/auth.js',
  'scripts/build.cjs',
  'sw.js',
];

test('la app no carga ni configura login de Google en runtime', () => {
  const forbidden = [
    /accounts\.google/,
    /GOOGLE_CLIENT_ID/,
    /google-config/,
    /googleapis/,
    /drive\/v3/,
    /oauth2/,
    /google\.accounts/,
    /Inici[aá] sesi[oó]n/,
    /Cerrar sesi[oó]n/,
  ];

  for (const file of runtimeFiles) {
    const source = fs.readFileSync(path.join(root, file), 'utf8');
    for (const pattern of forbidden) {
      assert.equal(pattern.test(source), false, `${file} contiene ${pattern}`);
    }
  }
});
