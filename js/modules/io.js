/* =================================================
   EXPORT / IMPORT
================================================= */
function exportJSON() {
  const data = JSON.stringify(state, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `finanzas_${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(url); document.body.removeChild(a); }, 1000);
  toast('Exportado correctamente', 'success');
}

function isPlainObject(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function isValidMoney(value) {
  return typeof value === 'number' || (typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value)));
}

function isSafeIdentifier(value) {
  return typeof value === 'string' && /^[A-Za-z0-9_-]+$/.test(value);
}

function validateImportedState(candidate) {
  if (!isPlainObject(candidate) || !isPlainObject(candidate.months)) return false;
  if (candidate.names !== undefined && !isPlainObject(candidate.names)) return false;
  if (candidate.currencies !== undefined && !isPlainObject(candidate.currencies)) return false;

  return Object.entries(candidate.months).every(([month, data]) => {
    if (!/^\d{4}-\d{2}$/.test(month) || !isPlainObject(data)) return false;
    if (data.categories !== undefined && !Array.isArray(data.categories)) return false;
    return (data.categories || []).every(category =>
      isPlainObject(category) &&
      isSafeIdentifier(category.id) &&
      typeof category.name === 'string' &&
      Array.isArray(category.items) &&
      category.items.every(item =>
        isPlainObject(item) &&
        isSafeIdentifier(item.id) &&
        typeof item.name === 'string' &&
        typeof item.currency === 'string' &&
        isValidMoney(item.amount)
      )
    );
  });
}

function normalizeImportedState(imported) {
  const next = createDefaultState();
  next.names = imported.names || next.names;
  next.currentMonth = typeof imported.currentMonth === 'string' ? imported.currentMonth : '';
  next.months = imported.months;
  next.currencies = { ...next.currencies, ...(imported.currencies || {}) };
  next.currencySources = isPlainObject(imported.currencySources) ? imported.currencySources : {};
  next.apiUrl = typeof imported.apiUrl === 'string' ? imported.apiUrl : DEFAULT_API_URL;
  next.expenseTypes = Array.isArray(imported.expenseTypes) ? imported.expenseTypes : [];
  next.invTypes = Array.isArray(imported.invTypes) ? imported.invTypes : [];
  next.templates = isPlainObject(imported.templates) ? imported.templates : {};
  return next;
}

function getImportSummary(imported) {
  const months = Object.keys(imported.months || {});
  const categories = months.reduce((total, month) => {
    const data = imported.months[month];
    return total + (Array.isArray(data.categories) ? data.categories.length : 0);
  }, 0);
  return `${months.length} ${months.length === 1 ? 'mes' : 'meses'} y ${categories} ${categories === 1 ? 'categoría' : 'categorías'}`;
}

function confirmImport(imported, fileName) {
  const summary = getImportSummary(imported);
  const source = fileName ? ` desde «${fileName}»` : '';
  return window.confirm(`Vas a reemplazar los datos del espacio activo${source}.\n\nEl archivo contiene ${summary}.\n\n¿Continuar con la importación?`);
}

function importJSON(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();

  reader.onload = async function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (!validateImportedState(imported)) throw new Error('Formato inválido');
      if (!confirmImport(imported, file.name)) {
        toast('Importación cancelada. Tus datos no cambiaron.', 'info');
        return;
      }

      const previous = state;
      state = normalizeImportedState(imported);
      if (!await saveState()) {
        state = previous;
        return;
      }
      initApp();
      toast('Importado correctamente', 'success');
    } catch (err) {
      toast('Error al importar: archivo inválido', 'error');
    }
  };

  reader.onerror = function() {
    toast('Error al leer el archivo.', 'error');
  };
  reader.readAsText(file);
  event.target.value = '';
}
