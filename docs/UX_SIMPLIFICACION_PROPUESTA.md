# Propuesta UX: experiencia mas simple y clara

## Coordinacion del equipo

Solicitud: analizar la UX actual y proponer una experiencia mas simple y clara para Finanzas Familiares.

Delegacion aplicada:

- Supervisor: definir oportunidad, alcance y prioridad.
- UX: ordenar recorridos, jerarquia de pantalla y estados.
- Product Owner: convertir la propuesta en requisitos y backlog.
- QA: definir escenarios criticos y riesgos de regresion.

## Evidencia observada

- La pantalla principal `Carga Mensual` concentra muchas tareas en una sola pagina: colaboracion, personas, mes, ingresos, objetivos, cotizaciones, inversion, templates, gastos, resumen, sugerencias y comparativa.
- La navegacion primaria tiene solo dos destinos: `Carga Mensual` y `Dashboards`, pero dentro de `Carga Mensual` conviven tareas de frecuencia distinta.
- El encabezado mezcla identidad del hogar, selector de espacio, sesion, exportacion/importacion y navegacion, lo que compite con la tarea principal del mes.
- El hero actual explica tres pasos utiles, pero debajo no hay una progresion real por etapas: todas las secciones quedan visibles con el mismo peso.
- La colaboracion y cotizaciones son soporte/configuracion; hoy aparecen antes que ingresos y gastos, aunque no son acciones mensuales principales para todos los usuarios.
- La comparativa mensual aparece dentro de la carga mensual, aunque su intencion pertenece mas a revision y aprendizaje.

## Problema UX

La app ofrece funciones valiosas, pero exige que la persona entienda toda la estructura antes de completar la tarea mas frecuente: cerrar un mes confiable. Esto aumenta carga cognitiva, vuelve menos claro que falta completar y hace que acciones de soporte parezcan tan importantes como cargar ingresos, gastos y revisar el resultado.

## Usuario y necesidad

Usuario principal: persona, pareja o familia que quiere organizar sus finanzas del mes sin operar una planilla compleja.

Necesidad principal: saber rapidamente que mes esta editando, que datos faltan, cuanto queda disponible y que accion conviene tomar antes de guardar.

Hipotesis: si la experiencia se organiza por momentos de trabajo, mas personas podran completar un cierre mensual sin abandonar ni guardar datos incompletos.

## Experiencia propuesta

Reemplazar la estructura actual por cuatro momentos claros:

1. Preparar
   - Elegir mes y espacio.
   - Confirmar integrantes del hogar.
   - Aplicar un template o empezar vacio.
   - Mostrar estado del mes: nuevo, en progreso o guardado.

2. Cargar
   - Ingresos del hogar.
   - Gastos por categoria.
   - Inversion real del mes.
   - Objetivo minimo de inversion visible como referencia, no como bloque largo.

3. Revisar y guardar
   - Resumen del mes.
   - Alertas accionables.
   - Validaciones antes de guardar.
   - Guardar cierre mensual como accion primaria.

4. Aprender
   - Comparativa mensual.
   - Dashboards.
   - Tendencias e insights.

## Navegacion propuesta

Navegacion primaria:

- `Mes`: preparar, cargar, revisar y guardar el mes activo.
- `Historial`: comparar meses y ver cierres guardados.
- `Ajustes`: espacios, integrantes, colaboracion, importacion/exportacion, cotizaciones y templates.

La vista `Dashboard` puede integrarse dentro de `Historial` como pestañas secundarias:

- `Resumen`
- `Gastos`
- `Inversion`
- `Comparar`

## Pantalla principal propuesta: Mes

La primera pantalla debe responder tres preguntas sin scrollear demasiado:

- Que mes estoy trabajando.
- Como voy respecto del presupuesto.
- Que me falta hacer para cerrar.

Jerarquia sugerida:

1. Barra de contexto
   - Mes activo.
   - Espacio activo.
   - Estado: `Nuevo`, `Sin guardar`, `Guardado`, `Datos incompletos`.
   - Accion primaria: `Guardar cierre`.

2. Resumen inmediato
   - Ingresos.
   - Gastos.
   - Disponible.
   - Inversion real vs objetivo.

3. Checklist de cierre
   - Ingresos cargados.
   - Gastos revisados.
   - Inversion cargada.
   - Alertas revisadas.

4. Secciones de carga progresiva
   - Ingresos.
   - Gastos.
   - Inversion.
   - Objetivos avanzados, colapsado por defecto.

5. Alertas y recomendaciones
   - Solo mostrar las 2 o 3 mas importantes.
   - Cada alerta debe decir que pasa y que accion tomar.

## Reubicacion de funcionalidades actuales

| Funcionalidad actual | Ubicacion propuesta | Motivo |
| --- | --- | --- |
| Colaboracion | Ajustes > Espacio compartido | No es una accion mensual frecuente. |
| Nombres P1/P2 | Ajustes > Integrantes, con resumen editable en Mes | Reduce ruido permanente en el header. |
| Cotizaciones | Ajustes > Cotizaciones, con aviso compacto en Mes si falta tasa | Es soporte tecnico para gastos en moneda extranjera. |
| Templates | Mes > Preparar o Ajustes > Templates | Deben ayudar al inicio, no competir con gastos. |
| Comparativa mensual | Historial > Comparar | Pertenece a aprendizaje posterior al cierre. |
| Sugerencias automaticas | Mes > Revisar | Se entienden mejor al lado del resumen. |
| Exportar/importar | Ajustes > Datos | Acciones sensibles, no tarea diaria. |

## Estados necesarios

### Mes nuevo

- Mostrar CTA principal: `Empezar con template` y alternativa `Empezar vacio`.
- Explicar que no hay datos guardados para ese periodo.

### Mes en progreso

- Mostrar cambios pendientes y fecha/hora de ultimo guardado local si esta disponible.
- Mantener `Guardar cierre` como accion principal.

### Mes guardado

- Mostrar confirmacion discreta y acceso a `Ver en historial`.
- Permitir seguir editando, marcando cambios pendientes si se modifica algo.

### Datos incompletos

- Permitir guardar borrador local.
- Para cierre mensual, pedir confirmacion si faltan ingresos, gastos o inversion real.

### Error

- Si falla persistencia, no anunciar exito.
- Mostrar mensaje recuperable: que paso, que dato sigue en pantalla y que puede intentar la persona.

### Vacio de dashboard

- Mostrar el requisito concreto: guardar al menos un mes para graficos generales, dos meses para comparativa.

## Copy sugerido

- `Carga Mensual` -> `Mes`
- `Dashboards` -> `Historial`
- `Guardar mes` -> `Guardar cierre`
- `Cierre Real de Inversion del Mes` -> `Inversion del mes`
- `Sugerencias Automaticas` -> `Alertas y proximos pasos`
- `Cotizacion de Monedas` -> `Cotizaciones`
- `Templates de Gastos` -> `Plantillas`

## Backlog priorizado

### P0 - Simplificar el recorrido mensual

- Crear vista `Mes` con resumen superior, checklist y carga progresiva.
- Mover comparativa fuera de la vista de carga.
- Convertir colaboracion, cotizaciones, importacion/exportacion y templates en ajustes o paneles secundarios.
- Distinguir visualmente `Guardar borrador` de `Guardar cierre` si ambos comportamientos existen.

Criterios de aceptacion:

- La persona puede identificar mes activo, disponible y accion principal en el primer viewport.
- La persona puede cargar ingresos, gastos e inversion sin pasar por colaboracion ni cotizaciones.
- La comparativa no aparece antes del cierre del mes.
- Las acciones sensibles de datos no quedan junto a la navegacion principal.

Casos trazados: UC-001 seleccionar mes, UC-002 completar carga mensual guiada, UC-003 guardar mes, UC-004 revisar resumen mensual, UC-007 navegar hacia analisis sin perder contexto.

### P1 - Mejorar comprension y recuperacion

- Agregar checklist de cierre con estado por bloque.
- Agregar estados vacios claros para mes nuevo, historial y dashboards.
- Reducir sugerencias a alertas priorizadas.
- Mostrar cambios pendientes y ultimo guardado cuando el modelo de datos lo permita.

Criterios de aceptacion:

- Cada bloque principal comunica si esta completo, incompleto o requiere revision.
- Un error de guardado mantiene los datos visibles y ofrece reintento.
- Dashboard vacio indica exactamente como generar datos.

Casos trazados: UC-005 acceso autenticado, UC-006 importar/exportar JSON, UC-008 estados vacios, UC-009 mobile, UC-010 mensajes de alcance local.

### P2 - Pulir configuracion y aprendizaje

- Crear `Ajustes` con secciones de integrantes, espacios, datos, cotizaciones y plantillas.
- Reorganizar `Historial` con tabs de resumen, gastos, inversion y comparar.
- Agregar eventos de producto para medir finalizacion del flujo mensual.

Criterios de aceptacion:

- Un usuario recurrente no necesita abrir ajustes para cerrar un mes comun.
- Historial permite comparar despues de guardar sin volver a la carga.
- Los eventos no registran importes ni datos financieros sensibles.

Casos trazados: UC-011 eventos no sensibles, UC-012 personalizar vista, UC-013 preparar permisos futuros.

## Matriz QA propuesta

| Caso | Escenario critico | Resultado esperado |
| --- | --- | --- |
| Mes nuevo | Elegir un mes sin datos | Se muestra estado vacio y opciones empezar vacio/template. |
| Carga basica | Completar ingresos y gastos | Resumen superior actualiza ingresos, gastos y disponible. |
| Cierre incompleto | Guardar cierre sin ingresos o gastos | La app advierte faltantes y permite decidir. |
| Cierre completo | Guardar con ingresos, gastos e inversion | Estado cambia a guardado y el mes aparece en historial. |
| Recuperacion | Falla `localStorage` durante guardado | No se muestra exito; los datos quedan en pantalla. |
| Historial vacio | Abrir historial sin meses guardados | Se informa que debe guardar al menos un mes. |
| Comparativa | Comparar con menos de dos meses | Se explica que faltan dos cierres. |
| Cotizacion historica | Guardar gasto en moneda extranjera y luego cambiar tasa actual | El historico no cambia por una tasa nueva. |
| Ajustes | Exportar/importar datos | Accion queda fuera del flujo mensual y mantiene validaciones actuales. |
| Responsive | Usar en mobile | Mes, resumen y CTA principal no se pisan ni obligan a entender toda la app. |
| Accesibilidad | Navegar con teclado | Tabs, botones y formularios mantienen foco visible y orden logico. |

Cobertura funcional propuesta: 11/11 escenarios definidos. No ejecutada sobre software nuevo porque este documento es una propuesta de rediseño, no una implementacion visual.

## Metricas de exito

- Porcentaje de meses iniciados que terminan con cierre guardado.
- Tiempo hasta primer cierre mensual.
- Cantidad de errores de guardado/importacion recuperados.
- Uso de comparativa despues de guardar dos o mas meses.
- Abandono antes de completar ingresos, gastos e inversion.

## Riesgos y decisiones pendientes

- Definir si `Guardar mes` hoy debe representar borrador automatico, cierre historico o ambas cosas.
- Confirmar si colaboracion sera real entre cuentas o solo invitacion local; la UX deberia evitar prometer sincronizacion no disponible.
- Decidir si cotizaciones por API pertenecen al MVP visible o si deben quedar como configuracion avanzada.
- Revisar la regla tecnica de cotizacion historica antes de simplificar `Historial`: QA detecto riesgo si la comparativa usa tasas actuales para gastos guardados.
- Validar con usuarios reales si la palabra `cierre` es clara para el hogar objetivo o si conviene `Guardar foto del mes`.

## Verificacion realizada

- `npm test`: 2/2 tests aprobados. La salida incluye un error `quota exceeded` simulado por la prueba de fallo de persistencia.
- `npm run build`: build estatico verificado. Advertencia esperada en local: `GOOGLE_CLIENT_ID` no definido, por lo que el deploy quedaria sin boton de inicio de sesion hasta configurar esa variable publica.

## Recomendacion de implementacion

Implementar en dos pasos:

1. Reorganizacion sin cambiar contratos de datos: mover secciones, renombrar textos y crear estados vacios/checklist usando las funciones actuales.
2. Mejora de estado: diferenciar borrador/cierre, ultimo guardado y validaciones previas a cierre.

Este orden reduce riesgo tecnico y permite verificar la claridad del recorrido antes de tocar persistencia o calculos.
