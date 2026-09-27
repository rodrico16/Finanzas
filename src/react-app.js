/* React shell: nueva capa de experiencia sobre el dominio existente. */
(function () {
  const h = React.createElement;
  const css = `
    #react-shell-root{position:sticky;top:0;z-index:110;background:#0d2630;color:#f4fbfa;box-shadow:0 10px 30px #0d263033}#app-header{display:none}
    .rx-shell{max-width:1280px;margin:auto;padding:16px 20px 14px}.rx-top{display:flex;align-items:center;justify-content:space-between;gap:20px}
    .rx-brand{display:flex;align-items:center;gap:11px}.rx-mark{display:grid;place-items:center;width:36px;height:36px;border-radius:12px;background:#42c7aa;color:#09262c;font-weight:900}.rx-brand strong{display:block;font-size:1rem}.rx-brand small{color:#a8c7c4;font-size:.72rem}
    .rx-nav{display:flex;gap:5px;background:#173841;border-radius:12px;padding:4px}.rx-nav button{border:0;background:transparent;color:#b7d1cf;border-radius:9px;padding:8px 14px;font:600 .82rem inherit;cursor:pointer}.rx-nav button.active,.rx-nav button:hover{background:#42c7aa;color:#09262c}
    .rx-actions{display:flex;align-items:center;gap:8px}.rx-month{font-size:.78rem;color:#b7d1cf}.rx-action{border:1px solid #41616a;background:transparent;color:#e6f4f2;border-radius:9px;padding:8px 11px;cursor:pointer}.rx-action:hover{background:#234c56}
    .rx-summary{display:grid;grid-template-columns:1.6fr repeat(3,1fr);gap:10px;margin-top:18px}.rx-card{background:#153a44;border:1px solid #285460;border-radius:14px;padding:13px 15px}.rx-card span{display:block;color:#9fc1bd;font-size:.72rem}.rx-card strong{display:block;margin-top:3px;font-size:1.15rem}.rx-card.hero{background:linear-gradient(135deg,#247866,#164f58)}.rx-card.hero strong{font-size:1.45rem;color:#fff}.rx-card.hero span{color:#c6eeea}
    @media(max-width:800px){.rx-top{flex-wrap:wrap}.rx-nav{order:3;width:100%;justify-content:center}.rx-summary{grid-template-columns:1fr 1fr}.rx-card.hero{grid-column:1/-1}.rx-actions{margin-left:auto}}
    @media(max-width:480px){.rx-shell{padding:12px}.rx-actions .rx-action{display:none}.rx-month{display:none}.rx-nav button{flex:1;padding:8px 7px}}
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
  function Shell() {
    const [view, setView] = React.useState('carga');
    const [tick, setTick] = React.useState(0);
    const m = metrics();
    const go = (next) => { setView(next); if (typeof switchView === 'function') switchView(next); };
    React.useEffect(() => { const timer = setInterval(() => setTick(v => v + 1), 1200); return () => clearInterval(timer); }, []);
    return h('div', { className:'rx-shell' },
      h('div', { className:'rx-top' },
        h('div', { className:'rx-brand' }, h('div',{className:'rx-mark'},'◆'), h('div',null,h('strong',null,'Finanzas Familiares'),h('small',null,'Tu dinero, más claro'))),
        h('nav',{className:'rx-nav'},[['carga','Este mes'],['dashboard','Historial']].map(([id,label]) => h('button',{key:id,className:view===id?'active':'',onClick:()=>go(id)},label))),
        h('div',{className:'rx-actions'},h('span',{className:'rx-month'},window.state?.currentMonth || 'Mes actual'),h('button',{className:'rx-action',onClick:()=>window.exportJSON?.()},'Exportar'))
      ),
      h('div',{className:'rx-summary'},
        h('div',{className:'rx-card hero'},h('span',null,'Disponible este mes'),h('strong',null,money(m.available)),h('span',null,'Ingresos menos gastos registrados')),
        h('div',{className:'rx-card'},h('span',null,'Ingresos'),h('strong',null,money(m.income))),
        h('div',{className:'rx-card'},h('span',null,'Gastos'),h('strong',null,money(m.expenses))),
        h('div',{className:'rx-card'},h('span',null,'Estado'),h('strong',null,m.available >= 0 ? 'En equilibrio' : 'A revisar'))
      )
    );
  }
  function mount() { const root = document.getElementById('react-shell-root'); if (root && window.ReactDOM) ReactDOM.createRoot(root).render(h(Shell)); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
