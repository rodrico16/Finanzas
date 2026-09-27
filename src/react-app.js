/* React shell: nueva capa de experiencia sobre el dominio existente. */
(function () {
  const h = React.createElement;
  const css = `
    #react-shell-root{position:relative}#app-header{display:none}.dash-tabs{display:none}
    .rx-forms{max-width:1280px;margin:14px auto 0;padding:0 20px 24px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.rx-form-card{background:#fff;border:1px solid #dbe9e7;border-radius:14px;padding:16px;color:#173841}.rx-form-card h3{margin:0 0 14px;font-size:1rem}.rx-form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.rx-field label{display:block;color:#58716f;font-size:.72rem;margin-bottom:4px}.rx-field input,.rx-field select{box-sizing:border-box;width:100%;border:1px solid #c9dcd9;border-radius:7px;padding:8px;background:#fff;color:#173841}.rx-form-actions{display:flex;gap:7px;align-items:center;flex-wrap:wrap}.rx-form-actions button{border:1px solid #bed6d2;background:#edf7f5;color:#173841;border-radius:8px;padding:8px 10px;font-weight:600;cursor:pointer}.rx-form-actions button.primary{background:#247866;color:#fff;border-color:#247866}.rx-form-wide{grid-column:1/-1}.rx-form-note{color:#718886;font-size:.76rem;margin:8px 0 0}@media(max-width:800px){.rx-forms{grid-template-columns:1fr;padding:0 12px 18px}.rx-form-wide{grid-column:auto}}@media(max-width:480px){.rx-form-grid{grid-template-columns:1fr}}
    .rx-shell{position:sticky;top:0;z-index:110;background:#0d2630;color:#f4fbfa;box-shadow:0 10px 30px #0d263033;max-width:1280px;margin:auto;padding:16px 20px 14px}.rx-top{display:flex;align-items:center;justify-content:space-between;gap:20px}
    .rx-brand{display:flex;align-items:center;gap:11px}.rx-mark{display:grid;place-items:center;width:36px;height:36px;border-radius:12px;background:#42c7aa;color:#09262c;font-weight:900}.rx-brand strong{display:block;font-size:1rem}.rx-brand small{color:#a8c7c4;font-size:.72rem}
    .rx-nav{display:flex;gap:5px;background:#173841;border-radius:12px;padding:4px}.rx-nav button{border:0;background:transparent;color:#b7d1cf;border-radius:9px;padding:8px 14px;font:600 .82rem inherit;cursor:pointer}.rx-nav button.active,.rx-nav button:hover{background:#42c7aa;color:#09262c}
    .rx-actions{display:flex;align-items:center;gap:8px}.rx-month{font-size:.78rem;color:#b7d1cf}.rx-action{border:1px solid #41616a;background:transparent;color:#e6f4f2;border-radius:9px;padding:8px 11px;cursor:pointer}.rx-action:hover{background:#234c56}
    .rx-summary{display:grid;grid-template-columns:1.6fr repeat(3,1fr);gap:10px;margin-top:18px}.rx-card{background:#153a44;border:1px solid #285460;border-radius:14px;padding:13px 15px}.rx-card span{display:block;color:#9fc1bd;font-size:.72rem}.rx-card strong{display:block;margin-top:3px;font-size:1.15rem}.rx-card.hero{background:linear-gradient(135deg,#247866,#164f58)}.rx-card.hero strong{font-size:1.45rem;color:#fff}.rx-card.hero span{color:#c6eeea}
    .rx-workbench{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:12px;padding:10px 12px;background:#102f38;border:1px solid #285460;border-radius:12px}.rx-workbench label{color:#b7d1cf;font-size:.75rem;display:block}.rx-workbench input{margin-top:3px;background:#f4fbfa;color:#102f38;border:0;border-radius:7px;padding:7px 8px}.rx-workbench-actions{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.rx-workbench-actions button{border:1px solid #41616a;background:transparent;color:#e6f4f2;border-radius:8px;padding:7px 9px;font:600 .76rem inherit;cursor:pointer}.rx-workbench-actions button.primary{background:#42c7aa;color:#09262c;border-color:#42c7aa}.rx-workbench-actions button.danger{color:#ffc7c2;border-color:#80514e}.rx-workbench-actions button:hover{filter:brightness(1.1)}.rx-subnav{display:flex;gap:6px;margin-top:12px;padding:4px;background:#173841;border-radius:10px;width:max-content}.rx-subnav button{border:0;background:transparent;color:#b7d1cf;border-radius:7px;padding:7px 11px;font:600 .76rem inherit;cursor:pointer}.rx-subnav button.active,.rx-subnav button:hover{background:#42c7aa;color:#09262c}
    @media(max-width:800px){.rx-top{flex-wrap:wrap}.rx-nav{order:3;width:100%;justify-content:center}.rx-summary{grid-template-columns:1fr 1fr}.rx-card.hero{grid-column:1/-1}.rx-actions{margin-left:auto}.rx-workbench{align-items:stretch;flex-direction:column}.rx-workbench-actions{justify-content:flex-start}}
    @media(max-width:480px){.rx-shell{padding:12px}.rx-actions .rx-action{display:none}.rx-month{display:none}.rx-nav button{flex:1;padding:8px 7px}}
    #view-carga>.workbench-hero,#view-carga>.grid-2>.card:has(#income-p1),#view-carga>.grid-2>.card:has(#inv-goal),#view-carga>.card:has(#currency-selector),#view-carga>.card:has(#inv-real),#view-carga>.card:has(#template-name),#view-carga>.card:has(.legacy-collaboration){display:none}
    .rx-collab{grid-column:1/-1}.rx-collab-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.rx-collab textarea{box-sizing:border-box;width:100%;resize:vertical;border:1px solid #c9dcd9;border-radius:7px;padding:8px;font:inherit}.rx-collab .rx-muted{color:#718886;font-size:.82rem;margin:.35rem 0 1rem}.rx-auth-screen{min-height:100vh;display:grid;place-items:center;padding:24px;background:#f4fbfa;color:#173841}.rx-auth-card{width:min(440px,100%);box-sizing:border-box;background:#fff;border:1px solid #dbe9e7;border-radius:16px;padding:24px;text-align:center;box-shadow:0 15px 40px #17384118}.rx-auth-card h2{margin:0 0 8px}.rx-auth-card p{color:#58716f}.rx-auth-card .auth-help{font-size:.8rem;color:#718886;margin-top:14px}.rx-auth-card .auth-error{color:#a33b35;min-height:1.1rem}.rx-auth-card .email-login-form{text-align:left;max-width:none}.rx-auth-card .email-login-row{display:flex;gap:7px}.rx-auth-card input{box-sizing:border-box;flex:1;min-width:0;padding:9px;border:1px solid #c9dcd9;border-radius:7px}.rx-auth-card button{border:1px solid #247866;background:#247866;color:#fff;border-radius:7px;padding:9px 12px;cursor:pointer}.rx-auth-card #google-login-btn{min-height:42px;align-items:center}.rx-auth-card .auth-divider{color:#718886;font-size:.82rem;margin:12px 0}
    @media(max-width:600px){.rx-collab-grid{grid-template-columns:1fr}.rx-auth-screen{padding:14px}.rx-auth-card{padding:18px}}
  `;
  const style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  function money(value) { return '$ ' + Math.round(Number(value) || 0).toLocaleString('es-AR'); }
  function metrics() {
    const month = window.state && state.months && state.months[state.currentMonth];
    const income = Number(month?.incomeP1 || 0) + Number(month?.incomeP2 || 0) + Number(month?.incomeOther || 0);
    const expenses = (month?.categories || []).reduce((sum, category) => sum + (category.items || []).reduce((subtotal, item) => subtotal + Number(item.amount || 0), 0), 0);
    const available = income - expenses;
    return { income, expenses, available };
  }
  const legacyValue = (id) => document.getElementById(id)?.value || '';
  function syncLegacy(id, value, eventName = 'input') {
    const field = document.getElementById(id);
    if (!field) return;
    field.value = value;
    field.dispatchEvent(new Event(eventName, { bubbles: true }));
  }
  function Field({ label, id, type = 'number', min, step, placeholder, onChange }) {
    return h('div', { className: 'rx-field' }, h('label', { htmlFor: `rx-${id}` }, label), h('input', { id:`rx-${id}`, type, min, step, placeholder, value: legacyValue(id), onChange: e => { syncLegacy(id, e.target.value); onChange?.(); } }));
  }
  function Forms({ refresh }) {
    const invoke = (name) => { if (typeof window[name] === 'function') window[name](); refresh(); };
    return h('div',{className:'rx-forms'},
      h('section',{className:'rx-form-card rx-collab'},h('h3',null,'🤝 Espacio compartido'),h('div',{className:'rx-collab-grid'},
        h('div',null,h('div',{className:'rx-muted'},'Usuario logueado'),h('div',{id:'collab-current-user',className:'rx-muted'},'-'),h('div',{className:'rx-muted'},'Espacio activo'),h('div',{id:'collab-workspace-meta',className:'rx-muted'},'-'),h('button',{className:'primary',id:'btn-generate-invite',onClick:()=>invoke('generateInviteCode')},'Generar invitación'),h('label',{htmlFor:'collab-invite-code'},'Código para compartir'),h('textarea',{id:'collab-invite-code',rows:2,readOnly:true,placeholder:'Generá un código y compartilo'})),
        h('div',null,h('label',{htmlFor:'collab-join-code'},'Unirme con invitación'),h('textarea',{id:'collab-join-code',rows:4,placeholder:'Pegá el código de invitación'}),h('button',{onClick:()=>invoke('joinWorkspaceByInvite')},'Unirme al espacio')))),
      h('section',{className:'rx-form-card'},h('h3',null,'💵 Ingresos'),h('div',{className:'rx-form-grid'},
        h(Field,{label:'Ingreso Persona 1',id:'income-p1',placeholder:'0',onChange:refresh}),h(Field,{label:'Ingreso Persona 2',id:'income-p2',placeholder:'0',onChange:refresh}),h(Field,{label:'Otros ingresos',id:'income-other',placeholder:'0',onChange:refresh})),h('p',{className:'rx-form-note'},`Total: ${money(Number(legacyValue('income-p1'))+Number(legacyValue('income-p2'))+Number(legacyValue('income-other')))}`)),
      h('section',{className:'rx-form-card'},h('h3',null,'🎯 Objetivos'),h('div',{className:'rx-form-grid'},
        h(Field,{label:'Inversión mensual mínima',id:'inv-goal',placeholder:'0',onChange:refresh}),h(Field,{label:'Nombre de meta',id:'meta-name',type:'text',placeholder:'Ej: Departamento propio',onChange:refresh}),h(Field,{label:'Meses de emergencia',id:'emergency-months',placeholder:'6',min:1,max:24,onChange:refresh}),h(Field,{label:'Fondo acumulado',id:'emergency-current',placeholder:'0',onChange:refresh}),h('div',{className:'rx-field'},h('label',{htmlFor:'rx-inv-profile'},'Perfil de inversión'),h('select',{id:'rx-inv-profile',value:legacyValue('inv-profile'),onChange:e=>syncLegacy('inv-profile',e.target.value,'change')},h('option',{value:'conservador'},'Conservador'),h('option',{value:'moderado'},'Moderado'),h('option',{value:'agresivo'},'Agresivo'))))),
      h('section',{className:'rx-form-card'},h('h3',null,'💱 Cotización de monedas'),h('div',{className:'rx-form-grid'},h('div',{className:'rx-field'},h('label',{htmlFor:'rx-currency-selector'},'Moneda'),h('select',{id:'rx-currency-selector',value:legacyValue('currency-selector'),onChange:e=>syncLegacy('currency-selector',e.target.value,'change')},['USD','EUR','BRL','UYU','CLP'].map(v=>h('option',{key:v,value:v},v)))),h(Field,{label:'Cotización manual (ARS)',id:'currency-manual-rate',onChange:refresh})),h('div',{className:'rx-form-actions'},h('button',{className:'primary',onClick:()=>invoke('saveManualRate')},'Guardar cotización'),h('button',{onClick:()=>invoke('fetchRateFromAPI')},'Consultar API'))),
      h('section',{className:'rx-form-card'},h('h3',null,'📈 Inversión del mes'),h('div',{className:'rx-form-grid'},h(Field,{label:'Monto invertido',id:'inv-real',onChange:refresh}),h(Field,{label:'Tipo de inversión',id:'inv-type',type:'text',placeholder:'Plazo fijo, FCI...',onChange:refresh}),h(Field,{label:'Rendimiento estimado %',id:'inv-yield',step:'0.1',onChange:refresh}))),
      h('section',{className:'rx-form-card rx-form-wide'},h('h3',null,'📋 Plantillas'),h('div',{className:'rx-form-actions'},h('input',{id:'rx-template-name',placeholder:'Nombre del template...',value:legacyValue('template-name'),onChange:e=>syncLegacy('template-name',e.target.value)}),h('button',{className:'primary',onClick:()=>invoke('saveTemplate')},'Guardar template'),h('select',{value:legacyValue('template-selector'),onChange:e=>syncLegacy('template-selector',e.target.value,'change')},h('option',{value:''},'Seleccionar template')),h('button',{onClick:()=>invoke('applyTemplate')},'Aplicar'),h('button',{onClick:()=>invoke('deleteTemplate')},'Borrar')))
    );
  }
  function Shell() {
    const [view, setView] = React.useState('carga');
    const [tick, setTick] = React.useState(0);
    const [dashboardTab, setDashboardTab] = React.useState('general');
    const [, refresh] = React.useState(0);
    const m = metrics();
    const go = (next) => { setView(next); if (typeof switchView === 'function') switchView(next); };
    const goDashboardTab = (next) => { setDashboardTab(next); const legacyButton = document.querySelector(`.dash-tab[onclick*="'${next}'"]`); if (typeof switchDashTab === 'function') switchDashTab(next, legacyButton); };
    const month = window.state?.currentMonth || '';
    const changeMonth = (event) => {
      const field = document.getElementById('current-month');
      if (field) { field.value = event.target.value; field.dispatchEvent(new Event('change', { bubbles: true })); }
    };
    const invoke = (name) => { if (typeof window[name] === 'function') window[name](); };
    React.useEffect(() => { const timer = setInterval(() => setTick(v => v + 1), 1200); return () => clearInterval(timer); }, []);
    return h('div', { className:'rx-shell' },
      h('div', { className:'rx-top' },
        h('div', { className:'rx-brand' }, h('div',{className:'rx-mark'},'◆'), h('div',null,h('strong',null,'Finanzas Familiares'),h('small',null,'Tu dinero, más claro'))),
        h('nav',{className:'rx-nav'},[['carga','Este mes'],['dashboard','Historial']].map(([id,label]) => h('button',{key:id,className:view===id?'active':'',onClick:()=>go(id)},label))),
        h('div',{className:'rx-actions'},h('span',{className:'rx-month'},window.state?.currentMonth || 'Mes actual'),h('button',{className:'rx-action',onClick:()=>window.exportJSON?.()},'Exportar'))
      ),
      h('div',{className:'rx-workbench'},
        h('div',null,h('label',{htmlFor:'rx-month-picker'},'Mes activo'),h('input',{id:'rx-month-picker',type:'month',value:month,onChange:changeMonth, 'aria-label':'Seleccionar mes activo'})),
        h('div',{className:'rx-workbench-actions'},
          h('button',{className:'primary',onClick:()=>invoke('saveMonth')},'Guardar cierre'),
          h('button',{onClick:()=>invoke('loadMonthData')},'Cargar mes'),
          h('button',{onClick:()=>document.getElementById('import-file')?.click()},'Importar'),
          h('button',{className:'danger',onClick:()=>invoke('deleteCurrentMonth')},'Eliminar')
        )
      ),
      view === 'dashboard' && h('div',{className:'rx-subnav','aria-label':'Subsecciones del historial'},[['general','General'],['gastos','Gastos'],['inversion','Inversión']].map(([id,label]) => h('button',{key:id,className:dashboardTab===id?'active':'',onClick:()=>goDashboardTab(id)},label))),
      h('div',{className:'rx-summary'},
        h('div',{className:'rx-card hero'},h('span',null,'Disponible este mes'),h('strong',null,money(m.available)),h('span',null,'Ingresos menos gastos registrados')),
        h('div',{className:'rx-card'},h('span',null,'Ingresos'),h('strong',null,money(m.income))),
        h('div',{className:'rx-card'},h('span',null,'Gastos'),h('strong',null,money(m.expenses))),
        h('div',{className:'rx-card'},h('span',null,'Estado'),h('strong',null,m.available >= 0 ? 'En equilibrio' : 'A revisar'))
      ), view === 'carga' && h(Forms,{refresh:()=>refresh(v=>v+1)})
    );
  }
  function AuthScreen() { return h('div',{className:'rx-auth-screen'},h('div',{className:'rx-auth-card'},h('h2',{id:'auth-title'},'Acceso a tu panel financiero'),h('p',{id:'auth-subtitle'},'Iniciá sesión para abrir este panel.'),h('div',{id:'google-login-btn'}),h('div',{className:'auth-divider'},'o ingresá con tu email en este dispositivo'),h('form',{id:'email-login-form',className:'email-login-form',onSubmit:e=>window.onEmailLogin?.(e)},h('label',{htmlFor:'email-login-input'},'Email'),h('div',{className:'email-login-row'},h('input',{id:'email-login-input',type:'email',autoComplete:'email',required:true,placeholder:'tu@email.com'}),h('button',{type:'submit'},'Ingresar'))),h('p',{className:'auth-error',id:'auth-error'}),h('div',{className:'auth-help',id:'auth-help-text'}))) }
  function mount() { const root = document.getElementById('react-shell-root'); if (root && window.ReactDOM) ReactDOM.createRoot(root).render(h(Shell)); const auth = document.getElementById('auth-screen'); if (auth && window.ReactDOM) { ReactDOM.createRoot(auth).render(h(AuthScreen)); window.dispatchEvent(new Event('react-auth-mounted')); } }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
