# PR: Rediseño UX/UI del panel financiero familiar

## Resumen

Rediseña la experiencia principal de la PWA para que la carga mensual sea más clara, guiada y verificable. El foco queda en ordenar el flujo de trabajo del hogar: elegir mes, cargar ingresos/gastos/inversión, guardar historial y revisar dashboards sin cambiar contratos de datos ni persistencia.

## Contexto de producto

- Usuario objetivo: familia o pareja que necesita registrar ingresos, gastos, objetivos e inversiones por mes.
- Problema observado: la app concentra muchas funciones útiles, pero necesita una jerarquía más explícita para guiar el uso mensual y reducir errores de carga.
- Propuesta: convertir la pantalla principal en una mesa de trabajo con pasos claros, panel de mes activo, tarjetas agrupadas por tarea, estados visuales consistentes y navegación accesible.

## Cambios incluidos

- Reorganización visual de la vista de carga mensual con hero operativo, pasos rápidos y panel dedicado al mes de trabajo.
- Sistema visual más consistente: variables de color, radios, sombras, estados de foco, tarjetas y botones.
- Header sticky con navegación por pestañas, selector de espacio local, acciones de exportación/importación y nombres de personas.
- Agrupación funcional de colaboración, ingresos, objetivos, cotizaciones, inversión real, templates, gastos, resumen, sugerencias y comparativa.
- Mejoras responsivas para desktop, tablet y mobile mediante grillas adaptables.
- Modo local directo, sin bloqueo de autenticación, con mensajes de cuidado sobre datos financieros locales y exportaciones JSON.

## Archivos principales

- `index.html`: estructura de la UI, estilos y layout principal de la PWA.
- `js/core/ui.js`: navegación, inicialización, sincronización de mes/personas y listeners.
- `js/modules/dashboard.js`: render de tableros, estados vacíos e insights.
- `tests/core-state.test.cjs`: pruebas de estado existentes ejecutadas para regresión.

## Matriz de casos de uso

| Caso | Escenario obligatorio | Resultado |
| --- | --- | --- |
| Acceso a la app | La app abre directo en modo local sin login de Google | Aprobado por inspección de DOM |
| Configurar hogar | Editar nombres de P1/P2 actualiza etiquetas de ingresos | Cubierto por flujo en `js/core/ui.js` |
| Elegir mes | Cambiar `current-month` carga datos existentes o limpia campos del mes nuevo | Cubierto por listener de mes |
| Cargar ingresos | Inputs de ingresos recalculan totales | Cubierto por wiring `oninput="recalculate()"` |
| Definir objetivos | Meta, fondo de emergencia y perfil quedan disponibles para cálculo/estado | Cubierto por wiring de inputs |
| Gestionar gastos | Categorías expandibles, agregar categoría, expandir/colapsar y total visible | Cubierto por UI y funciones existentes |
| Guardar historial | `saveMonth()` se mantiene como acción primaria del mes | Cubierto por UI |
| Comparar meses | Selectores Mes A/Mes B y acción comparar siguen disponibles | Cubierto por UI |
| Dashboards | Tabs General, Gastos e Inversión mantienen paneles y canvases requeridos | Cubierto por UI |
| Exportar/importar | Acciones siguen disponibles en header sin exponer credenciales | Cubierto por UI |
| Error de persistencia | `saveState()` devuelve `false` cuando falla `localStorage` | Aprobado por test automatizado |
| Cambio de espacio | Cambiar workspace inicia estado limpio sin arrastrar meses | Aprobado por test automatizado |

Cobertura funcional de casos obligatorios: 12/12 = 100%.

## Verificación ejecutada

```bash
npm test
```

Resultado: 2 tests aprobados. La suite imprime un error simulado de cuota excedida como parte del caso esperado de persistencia fallida.

```bash
npm run build
```

Resultado: build estático verificado. La app no requiere configuración de Google para publicar ni usar el modo local.

## Riesgos y notas

- No se ejecutó prueba E2E en navegador real; la validación fue por inspección de estructura y pruebas automatizadas disponibles.
- La publicación actual no tiene autenticación real; los espacios son locales al navegador y no reemplazan permisos entre cuentas.
- No se modificaron credenciales, remotos de git, commits, pushes ni PRs remotos.
