# Finanzas Familiares

Aplicacion web local para planificar ingresos, gastos, metas e inversiones mensuales.

## Probar en Netlify

1. En Netlify, elegi **Add new site** y luego **Import an existing project**.
2. Conecta `Hop20232/Finanzas` desde GitHub.
3. Usa estos valores:
   - Build command: `npm run build`
   - Publish directory: `.`
4. Publica el sitio. La configuracion equivalente queda versionada en `netlify.toml`.

Netlify ejecutara automaticamente `npm run build`, publicara la raiz del repositorio y usara Node 18.

La app guarda los datos localmente en el navegador y abre directo, sin login. No debe interpretarse como autenticacion real ni como colaboracion entre cuentas: OAuth, Google Sheets, invitaciones verificables y sincronizacion quedan fuera de esta publicacion y documentadas en `docs/PRODUCT_BACKLOG_PWA.md`.

## Uso local sin login

La publicacion actual no usa Google Identity Services, `GOOGLE_CLIENT_ID`, tokens ni Google Drive. El selector de espacio permite separar datos locales dentro del mismo navegador y el boton **Espacio principal** vuelve al workspace local base.

## Desarrollo local

```bash
npm run build
npm test
```

Tambien se puede abrir `index.html` directamente, aunque para probar el service worker hace falta servirlo por HTTPS o desde un servidor local.
