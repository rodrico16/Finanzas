# Cinco mejoras de UX para Finanzas Familiares

Estado: propuestas priorizadas; no implementadas. Revisión estática del repositorio: 2026-10-03.

Objetivo: facilitar la carga y revisión del mes, con información consistente y acciones comprensibles. Hipótesis pendiente de validación con usuarios: esta es la tarea principal del hogar. El pedido se interpreta como proponer cinco mejoras, sin rediseñar ni modificar la aplicación.

La interfaz React ya usa «Este mes», «Historial» y «Guardar cierre»; el HTML conserva un resumen y checklist. Las propuestas parten de ese estado, no de la navegación anterior.

## 1. P0 — Mostrar el mismo saldo mientras se edita

- **Problema y evidencia:** el resumen React lee `state.months` y suma importes directamente ([src/react-app.js:22](../src/react-app.js#L22)); el cálculo del formulario usa valores actuales y totales de categorías ([js/modules/calculations.js:4](../js/modules/calculations.js#L4)). Son dos fuentes distintas; existe riesgo de mostrar un saldo anterior al guardado o discrepancias con monedas extranjeras.
- **Cambio propuesto:** alimentar todos los resúmenes con el mismo cálculo del formulario, incluidas las conversiones existentes. Mostrar «Sin datos» cuando el mes esté vacío, en lugar de concluir «En equilibrio» únicamente porque el saldo es cero ([src/react-app.js:89](../src/react-app.js#L89)).
- **Flujo:** editar ingreso o gasto → actualizar el resumen → revisar → guardar. Si falta una cotización, señalar el importe pendiente de conversión y ofrecer completar la tasa; no presentarlo como saldo definitivo.
- **Beneficio esperado:** permitir decidir con cifras consistentes antes de guardar.
- **Criterio verificable:** con ingreso de 1000 y gasto de 200, todos los resúmenes muestran 800 sin guardar; repetir con una moneda extranjera y tasa conocida. Un mes vacío muestra «Sin datos».

## 2. P0 — Recuperar el acceso a las plantillas guardadas

- **Problema y evidencia:** el selector visible React solo renderiza una opción vacía y carece de etiqueta asociada ([src/react-app.js:51](../src/react-app.js#L51)); la función que carga las plantillas actualiza únicamente el selector HTML oculto ([js/modules/templates.js:37](../js/modules/templates.js#L37), [src/react-app.js:15](../src/react-app.js#L15)).
- **Cambio propuesto:** presentar las plantillas existentes en el selector visible, con etiqueta «Plantilla de gastos»; mantener «Guardar», «Aplicar» y «Eliminar» disponibles sin código. Usar «plantilla» de forma consistente.
- **Flujo:** crear plantilla → seleccionarla → revisar que reemplazará las categorías → confirmar o cancelar. Conservar la confirmación existente ([js/modules/templates.js:19](../js/modules/templates.js#L19)); mostrar «Todavía no tenés plantillas» en vacío y deshabilitar las acciones sin selección. Si falla el guardado, conservar el nombre y permitir reintentar.
- **Beneficio esperado:** reutilizar gastos sin tener que volver a cargarlos.
- **Criterio verificable:** guardar una plantilla la incorpora al selector visible; aplicarla reproduce sus categorías; cancelar conserva el formulario; eliminarla actualiza la lista; el selector tiene nombre accesible.

## 3. P1 — Dar prioridad a la tarea mensual y reducir el encabezado fijo

- **Problema y evidencia:** `.rx-shell` es fijo durante el desplazamiento ([src/react-app.js:7](../src/react-app.js#L7)) e incluye todos los formularios ([src/react-app.js:90](../src/react-app.js#L90)). «Espacio compartido» aparece antes que ingresos ([src/react-app.js:42](../src/react-app.js#L42)). Esto puede dificultar alcanzar los gastos en pantallas pequeñas; requiere comprobación visual.
- **Cambio propuesto:** dejar fija únicamente una barra compacta de mes, estado y guardado; ubicar el formulario en el flujo normal. Ordenar ingresos → gastos → inversión → revisión. Llevar colaboración, objetivos y cotizaciones a una sección plegable de ajustes, con acceso contextual cuando se necesiten.
- **Flujo:** elegir mes → completar datos → revisar checklist existente → guardar. El acceso a ajustes debe seguir disponible por teclado, mostrar si está expandido y conservar los datos al plegarse. Las invitaciones deben respetar los permisos existentes y explicar cualquier acción no disponible.
- **Beneficio esperado:** reducir pasos de navegación ajenos a la carga mensual.
- **Criterio verificable:** a 360 × 800 y con zoom de 200%, alcanzar y editar el último gasto sin que la barra tape el campo enfocado; completar todo el recorrido por teclado. No duplicar el checklist ya presente ([index.html:1140](../index.html#L1140)).

## 4. P1 — Hacer visible el resultado del guardado y su recuperación

- **Problema y evidencia:** el botón React invoca el guardado asíncrono sin reflejar espera ni resultado ([src/react-app.js:67](../src/react-app.js#L67), [src/react-app.js:78](../src/react-app.js#L78)). `saveMonth` ya devuelve un resultado y condiciona el aviso de éxito ([js/core/state.js:161](../js/core/state.js#L161)); los avisos desaparecen tras tres segundos ([js/core/ui.js:50](../js/core/ui.js#L50)).
- **Cambio propuesto:** vincular la barra al resultado real: «Sin guardar» → «Guardando…» → «Guardado» o «No se pudo guardar · Reintentar». Diferenciar persistencia local y sincronización cuando corresponda. Reutilizar el estado mensual existente, sin confundir saldo positivo con cierre guardado.
- **Flujo:** guardar una vez → impedir envíos duplicados mientras espera → confirmar persistencia. Ante error, mantener los datos y una acción de reintento; ante falta de permiso, explicar cómo recuperar acceso sin anunciar éxito. No exigir importes positivos para considerar válido un mes sin actividad.
- **Beneficio esperado:** saber si el trabajo quedó guardado y cómo recuperarse.
- **Criterio verificable:** simular éxito, demora, fallo de persistencia y rechazo de autorización; confirmar un único envío durante la espera, datos conservados y ausencia de falso éxito. Editar tras guardar vuelve a marcar cambios pendientes.

## 5. P1 — Hacer comprensibles la navegación y los avisos con lector de pantalla

- **Problema y evidencia:** la navegación React indica selección mediante clase CSS, sin estado accesible ([src/react-app.js:72](../src/react-app.js#L72), [src/react-app.js:84](../src/react-app.js#L84)). El contenedor de avisos no declara región viva ([index.html:1467](../index.html#L1467)).
- **Cambio propuesto:** exponer la sección activa y asociar controles con paneles; adoptar navegación convencional o implementar completamente el patrón de pestañas, incluidos sus atajos. Anunciar confirmaciones mediante una región de estado y errores relevantes mediante alerta, sin mover el foco inesperadamente. Mantener los errores recuperables visibles junto a la acción afectada.
- **Flujo:** navegar con teclado → reconocer sección activa → ejecutar acción → escuchar resultado → continuar o corregir. En vacío, el mensaje debe indicar qué acción habilita contenido, conservando los estados vacíos ya existentes del historial.
- **Beneficio esperado:** completar las mismas tareas sin depender del color ni de leer un aviso fugaz.
- **Criterio verificable:** con teclado y lector de pantalla, identificar sección y subsección activas, escuchar una confirmación una sola vez y recuperar un error sin perder el foco. Verificar foco visible y orden coherente en ambas vistas.

## Evaluación y límites

Verificación realizada: lectura del código y comprobación de las referencias citadas. No se ejecutaron pruebas de interfaz, sesiones con usuarios ni mediciones de accesibilidad; los efectos sobre la experiencia son hipótesis. Este documento no acredita software construido ni cobertura de casos de uso.

Validación propuesta: pedir a usuarios representativos cargar y guardar un mes, reutilizar una plantilla y recuperarse de un fallo. Registrar éxito de tarea, tiempo y errores; comparar con una línea base todavía no medida. Si se instrumenta la aplicación, registrar solo eventos de inicio, finalización y fallo por tipo de tarea, sin importes, emails ni códigos de invitación. Pendiente: implementar las propuestas y ejecutar sus escenarios, incluidos los críticos de consistencia de saldo, guardado y recuperación.
