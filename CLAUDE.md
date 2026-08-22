# CLAUDE.md — Julian Camargo Portfolio

## Stack

- **React 18** + **React Router v6** (client-side routing)
- **Create React App** (react-scripts v5) — build con `npm run build`, dev con `npm start`
- **Vanilla CSS** — sin Tailwind, sin preprocesadores
- **JavaScript** — sin TypeScript
- `react-icons` para íconos, **Web Audio API** para efectos de sonido

## Arquitectura

### Navegación por paneles
El diseño imita una consola de videojuego (estilo CMR2). Hay 4 paneles horizontales: Home, Highlights, Projects, Contact. La navegación funciona por teclado (flechas + Enter + Escape) y swipe táctil.

El estado completo de navegación vive en `NavigationContext.js` via `useReducer`. Todos los componentes lo consumen con el hook `useNavigation()`. El provider se monta en `Mainpage.js`.

### Bilingüismo (EN / ES)
El idioma se determina por ruta: `/` → inglés, `/es/` → español.

**Cada componente está duplicado:**
```
src/components/Header.js          ← inglés
src/components/es/Header.js       ← español

src/components/Highlights.js      ← inglés
src/components/es/Highlights.js   ← español
... (ídem para Intro, Projects, Contact)
```

**Regla crítica:** cualquier cambio funcional en un componente debe replicarse en su par `es/`. Los archivos de datos también están duplicados: `list-project.json` + `es/list-project.json`, `list-highlights.json` + `es/list-highlights.json`.

### Árbol de componentes
```
App.js (rutas)
├── English.js → Mainpage.js (HeaderComponent=Header)
└── Spanish.js → Mainpage.js (HeaderComponent=es/Header)
         └── NavigationProvider
               ├── Header / es/Header
               ├── BackgroundMusic
               ├── MorphingTextPath
               ├── ErrorBoundary
               │     └── PanelContainer
               │           └── [Intro, Highlights, Projects, Contact]
               └── KeyboardHints
```

## Comandos

```bash
npm start        # servidor de desarrollo
npm run build    # build de producción (output en /build)
npm test         # tests (Jest + React Testing Library)
```

## Convenciones del código

- **Estilos:** cada componente tiene su CSS en `src/components/styles/NombreComponente.css`
- **CSS variables** definidas en `App.css`: `--bg-main`, `--text-primary`, `--text-secondary`, `--mono`, `--sans`, `--nav-height`, `--hints-height`
- **Paleta:** fondo `#57667d`, superficie `#4a5a70`, texto `#f9f9f8`, texto secundario `#b2b6b8`
- **Fuentes:** `Inter` (sans) + `Share Tech Mono` (mono) — cargadas desde Google Fonts CDN
- `memo()` en componentes presentacionales puros (BackgroundMusic, KeyboardHints, FocusableItem)
- `useMemo` para arrays costosos (circularTabs en Header, panels en Mainpage)
- Datos de proyectos y experiencia en archivos JSON — no en el JSX

## Estructura de datos

`list-project.json` — campos por proyecto:
```json
{
  "title": "...",
  "name": "...",
  "description": "...",
  "image": { "url": "images/archivo.webp", "alt": "..." },
  "embed": "https://...",   // alternativa a image (iframe)
  "repo": "https://...",
  "demo": "https://...",    // puede ser "" si no hay demo
  "tech": ["...", "..."]
}
```

`list-highlights.json` — campos por experiencia:
```json
{
  "title": "...",
  "company": { "name": "...", "desc": "...", "url": "..." },
  "time_interval": "...",
  "description": [{ "summary": "...", "tech": ["..."] }]
}
```

## Assets públicos

| Archivo | Notas |
|---------|-------|
| `public/images/logo.png` | Logo principal (500×500px) |
| `public/images/boya.png` | Proyecto Smart Float — PNG 900px max |
| `public/images/odontointegral-cover.png` | Proyecto Aura — PNG 900px max |
| `public/images/reactflix.webp` | Proyecto ReactFlix — ya optimizado |
| `public/images/SSPA.webp` | Proyecto SPA — ya optimizado |
| `public/images/og-cover.png` | **Pendiente de crear** — imagen 1200×630px para OG/Twitter |
| `public/audio/main-theme.mp3` | Música de fondo (4.5MB) — `preload="none"` |
| `public/sitemap.xml` | Apunta a `julian87nicolas.github.io/julian-camargo-portfolio/` |

## Trabajo pendiente

### Crítico (detectado en code review del branch `refactor-cc`)
1. **Bug CSS:** `color: inherit` en `.breadcrumb-link` (Header.css línea ~122) sobreescribe el color dim `#293e53` de `.breadcrumb-dim` por cascada — los botones del breadcrumb aparecen en color incorrecto. **Fix:** eliminar `color: inherit` de la regla `.breadcrumb-link`.
2. **OG image rota:** `public/images/og-cover.png` no existe. Las meta tags de OG/Twitter apuntan a ese archivo. Crear una imagen 1200×630px y colocarla ahí. Además, la URL debe ser **absoluta** — setear `homepage` en `package.json` o hardcodear la URL de producción.
3. **`og:url` faltante:** agregar `<meta property="og:url" content="https://[dominio]/" />` en `index.html`.

### Deuda técnica (baja urgencia)
- **i18n refactor:** eliminar la duplicación `es/` creando `src/i18n/en.js`, `src/i18n/es.js` y un hook `useTranslation()`. Es el cambio más grande pendiente.
- **ErrorBoundary:** usa inline styles (inconsistente), no tiene `componentDidCatch` para logging, y el mensaje de error es solo en inglés.
- **Imágenes a WebP:** `boya.png` y `odontointegral-cover.png` son PNG — convertirlos a WebP daría ~30-50% de ahorro adicional. Requiere instalar `cwebp` (`brew install webp`).

## Deployment

El proyecto se despliega como sitio estático. La URL de producción es `julian87nicolas.github.io/julian-camargo-portfolio/`. El CV está alojado en Supabase CDN (URLs hardcodeadas en Header.js y es/Header.js).
