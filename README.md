# bcentorbi.com — Portfolio de Bautista Centorbi

Portfolio personal de **Bautista Centorbi** (Infinite Graphics) — diseñador
gráfico y desarrollador web en Mendoza, Argentina. Sitio en producción:
**[bcentorbi.com](https://bcentorbi.com)**.

Construido con Next.js (App Router), TypeScript y Tailwind CSS v4, con
animaciones en Framer Motion y scroll suave con Lenis. Todo el contenido
(proyectos de cliente, side projects, experiencia, educación) vive tipado en
`app/lib/` y `app/data/`, separado de los componentes visuales.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- **Estilos:** Tailwind CSS v4 (`@tailwindcss/postcss`)
- **Animación:** Framer Motion (reveals, transiciones de página, marquees) +
  Lenis (scroll suave, ver `app/providers/ScrollProvider.tsx`)
- **Formulario de contacto:** Resend (envío de mail) + Google reCAPTCHA v2
  (anti-spam) + Zod (validación)
- **SEO / Analytics:** metadata nativa de Next.js, JSON-LD (`StructuredData.tsx`),
  sitemap dinámico (`next-sitemap` + `app/sitemap.ts`), Google Analytics 4
  (`gtag.js`) con Consent Mode (denegado por defecto, ver `CookiesBanner.tsx`)
- **Deploy:** Vercel (proyecto `bauudesigner-portfolio`, cuenta `bauticentorbi`)

## Estructura del proyecto

```
app/
├─ page.tsx                  # Home: compone todas las secciones en orden
├─ layout.tsx                # Metadata global, fonts, GA4, providers
├─ globals.css                # Tokens de diseño y estilos base (Tailwind v4)
│
├─ components/
│  ├─ sections/               # Una sección de la home = un componente
│  │  ├─ Hero.tsx
│  │  ├─ Projects.tsx         # Grilla de case studies de cliente (carrusel)
│  │  ├─ SideProjects.tsx     # Proyectos propios en curso (CM-Suite, etc.)
│  │  ├─ LogoGallery.tsx / LogosRow.tsx
│  │  ├─ Clients.tsx          # Marquee de logos de clientes
│  │  ├─ About.tsx            # Bio, capacidades, experiencia
│  │  ├─ Education.tsx
│  │  └─ ContactForm.tsx
│  ├─ projects/                # Render de un case study individual
│  │  ├─ ProjectCase.tsx       # Hero del case study (cliente, tags, CTA)
│  │  └─ ProjectBlock.tsx      # Sistema de bloques modulares (ver abajo)
│  ├─ clients/ClientMarquee.tsx  # Marquee genérico reusado en 2 lugares
│  └─ shared/                  # NavBar, Footer, PageTransition, etc.
│
├─ lib/
│  ├─ projects.ts              # Datos + tipos de los case studies de cliente
│  ├─ sideProjects.ts          # Datos + tipos de los proyectos propios
│  ├─ nav.ts                   # Items del nav (ids de anchor + label)
│  ├─ animationEffects.ts      # Variants de Framer Motion compartidas
│  ├─ validateFormFields.ts / sanitize.ts  # Validación del form de contacto
│  └─ loadRecaptcha.ts
│
├─ data/                       # Contenido estático (about, educación)
├─ hooks/                      # useActiveSection (nav), useRecaptchaConsent
├─ providers/ScrollProvider.tsx # Contexto de Lenis (scroll suave)
├─ api/send/route.ts           # Endpoint del form de contacto (Resend + reCAPTCHA)
└─ projects/[slug]/page.tsx    # Ruta dinámica de cada case study
```

## El sistema de "bloques" de proyectos

Cada case study de cliente (`app/lib/projects.ts`) no es HTML a mano: es un
array de **bloques tipados** (`ProjectBlock`, unión discriminada por `kind`)
que `ProjectBlock.tsx` sabe renderizar. Tipos de bloque disponibles:

| `kind`         | Uso                                                          |
| -------------- | ------------------------------------------------------------- |
| `richText`     | Párrafo de texto, con tono claro/oscuro y alineación          |
| `mediaGrid`    | Grilla de imágenes (varios layouts: `twoUp`, `oneFull`, etc.) |
| `sectionTitle` | Separador con título ("Web", "Identidad", etc.)               |
| `video`        | Video demo autoplay/loop                                      |
| `highlights`   | Tarjetas de resumen (rol, objetivo, entrega)                  |
| `stack`        | Pills de tecnologías usadas                                   |
| `deliverables` | Lista de entregables                                          |
| `closing`      | Cierre del case study (texto + tags)                          |
| `crosslink`    | Tarjeta de link cruzado a otro proyecto/sección del sitio      |

Para agregar un nuevo case study: sumar una entrada a `PROJECTS` en
`app/lib/projects.ts` con su propio `slug`, armar el array de `blocks` con
los tipos de arriba, y la ruta `/projects/[slug]` lo renderiza solo — no hace
falta tocar componentes.

## Proyectos de cliente vs. Side Projects

El sitio distingue dos categorías de trabajo, con datos y componentes
separados a propósito:

- **`app/lib/projects.ts` + sección "Proyectos"**: case studies de clientes
  reales, cerrados, con identidad completa y sitio en vivo. Cada uno tiene su
  propia página en `/projects/[slug]`.
- **`app/lib/sideProjects.ts` + sección "Side Projects"**: proyectos propios
  en curso (ej. CM-Suite, Blindaje Digital), sin la estructura de case study
  completa — card liviana con estado (`active`/`concept`), tags y link a
  repo o a un case study relacionado. No tienen página propia.

## Componentes reutilizables destacados

- **`ClientMarquee.tsx`**: marquee infinito genérico (loop sin costuras,
  pausa en hover, respeta `prefers-reduced-motion`, se pausa si la pestaña
  está oculta o el marquee no está en viewport). Soporta `direction: "left" |
  "right"` — se usa dos veces en el sitio: logos de clientes (izquierda) y el
  logo de Infinite Graphics en "Sobre Mí" (derecha, sentido opuesto a
  propósito).
- **`useActiveSection.ts`**: detecta qué sección está en viewport para
  resaltar el item activo del nav.
- **`ScrollProvider.tsx`**: envuelve la app en un contexto de Lenis para
  scroll suave y expone `scrollTo` a cualquier componente.

## Variables de entorno

Copiar a `.env.local` (nunca commitear valores reales — `.env*` está en
`.gitignore`):

```bash
# Resend (envío del formulario de contacto)
RESEND_API_KEY=
RESEND_TO_EMAIL=

# Google reCAPTCHA v2 (anti-spam del formulario)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_PRIVATE_KEY=
```

## Desarrollo local

```bash
npm install
npm run dev       # http://localhost:3000, Turbopack + hot reload
npm run lint       # ESLint (eslint-config-next, core-web-vitals + TS)
npm run build      # build de producción
npm run start      # sirve el build de producción
npx tsc --noEmit   # type-check sin emitir archivos
```

No hay test runner configurado todavía — si se agrega uno, documentarlo acá
y en `AGENTS.md`.

## Deploy

Deploy en **Vercel**, proyecto `bauticentorbis-projects/bauudesigner-portfolio`,
aliaseado a `bcentorbi.com`. Flujo normal: push/merge a `master` dispara
deploy vía integración de GitHub.

**Gotcha conocido:** si un PR se mergea desde la web de GitHub, el commit de
merge queda con el email `noreply.github.com` de la cuenta que lo mergeó.
Vercel puede bloquear el deploy con *"Deployment Blocked — commit email could
not be matched to a GitHub account"* si esa dirección no matchea ninguna
cuenta reconocida. Solución: crear un commit nuevo en `master` con el
`user.email` de git correctamente configurado (`git commit --allow-empty`) y
pushear — dispara un deploy nuevo que sí pasa la verificación.

Para deployar a mano:

```bash
npx vercel link --project bauudesigner-portfolio --scope bauticentorbis-projects
npx vercel --prod
```

## Convenciones

Ver [`AGENTS.md`](./AGENTS.md) para estilo de código, convenciones de commits
y estructura esperada al agregar archivos nuevos.
