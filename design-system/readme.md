# Masa Ideas — Design System

Sistema de diseño para la **herramienta de gestión interna de Masa Ideas**, empresa de vía pública (alquiler de carteles publicitarios) en Buenos Aires. Es un producto **B2B / herramienta de trabajo**, no un sitio de marketing: prioriza densidad de datos, legibilidad y rapidez por encima del impacto visual.

La estética es **cálida y profesional**: fondo crema, sidebar oscuro (carbón), un único acento naranja tomado del logo, y tipografía con personalidad (serif editorial para títulos) pero impecablemente legible para datos.

## Producto

Tres módulos centrales, cada uno con su UI kit en `ui_kits/`:

1. **Inventario con mapa** — mapa a pantalla completa de Buenos Aires con pines por cartel, popups con info breve, y panel lateral derecho para filtrar y abrir cada cartel.
2. **Pipeline comercial (CRM)** — tablero tipo kanban de oportunidades por etapa, con vista de lista y ficha de oportunidad.
3. **Generador de propuestas comerciales** — armado de propuestas (selección de carteles, precios, vista previa imprimible para el cliente).

## Fuentes / materiales recibidos

- `uploads/logo_masa_ideas.png` — logo original (266×51, fondo blanco). Procesado a versiones transparentes en `assets/` (ver abajo).
- Brief del producto (descripción de la empresa, estética y módulos) provisto por el equipo.
- **No se recibió** codebase ni Figma. Las pantallas de los UI kits son recreaciones de alta fidelidad basadas en el brief y en convenciones de herramientas B2B; **no replican una UI existente** porque no había una de referencia. Si existe una app o diseños previos, adjuntarlos para alinear.

---

## CONTENT FUNDAMENTALS — cómo se escribe

Es una herramienta interna, así que el tono es **directo, claro y operativo**. Español rioplatense (Argentina).

- **Idioma:** español de Argentina. Voseo cuando hay que dirigirse al usuario ("Cargá un cartel", "Guardá los cambios", "Sumá a la propuesta"). Nunca "tú".
- **Tono:** profesional pero cercano y sin solemnidad. Como un colega competente, no un manual corporativo. Sin jerga de marketing ("solución 360", "potenciá tu marca") — eso es para el cliente final, no para la herramienta.
- **Persona:** el sistema le habla al usuario con imperativos amables ("Elegí un estado", "Filtrá por zona"). Evitar primera persona del sistema ("Yo voy a…").
- **Casing:** títulos y encabezados en **sentence case** ("Inventario de carteles"), nunca Title Case. Las **eyebrows/labels** van en MAYÚSCULAS con tracking (ej. `OCUPACIÓN`, `PRÓXIMOS VENCIMIENTOS`).
- **Números y dinero:** formato AR — separador de miles con punto, decimales con coma (`$480.000`, `14,2M`). Códigos de cartel en mono con prefijo `MI-` (`MI-0428`). Medidas en metros (`8 × 4 m`).
- **Botones:** verbo + objeto, corto. "Nuevo cartel", "Agregar a propuesta", "Ver ficha", "Exportar PDF". Cancelar siempre es "Cancelar".
- **Estados (vocabulario fijo):** Disponible · Reservado · Ocupado · Mantenimiento · Vencido. Etapas del pipeline: Prospecto · Contactado · Propuesta enviada · Negociación · Ganado · Perdido.
- **Vacíos / ayudas:** frases breves y accionables ("Todavía no hay oportunidades en esta etapa. Arrastrá una tarjeta acá."). Sin signos de exclamación de más.
- **Emoji:** **no se usan**. La iconografía es Lucide (ver ICONOGRAPHY).

Ejemplos de microcopy:
- Tooltip: "Ver en el mapa"
- Confirmación destructiva: "¿Eliminar el cartel MI-0428? Esta acción no se puede deshacer."
- Toast de éxito: "Propuesta enviada a Cervecería del Plata."

---

## VISUAL FOUNDATIONS

**Vibe general:** papel cálido + tinta. Mucho espacio en blanco-crema, datos nítidos en negro cálido, y el naranja reservado para lo accionable (botón primario, estado activo, selección). El naranja **nunca** se usa como relleno decorativo grande; es puntual.

**Color**
- **Fondo:** crema muy sutil, casi blanco roto (`--bg-page #FBFAF7`). Las tarjetas son blanco puro (`#FFFFFF`) — se separan del fondo por contraste sutil + sombra cálida, no por bordes pesados.
- **Sidebar:** carbón casi negro, levemente cálido (`#1C1B1A`). Texto crema, ítem activo con barra/realce naranja.
- **Acento único:** naranja `#F06010` (del "ideas" del logo). Escala 50–900. Texto naranja legible sobre crema = `--accent-text #B5430A` (700). El granate del emblema (`--ember-500 #A01020`) existe pero es de uso rarísimo (profundidad/sellos), no parte de la paleta operativa.
- **Grises:** neutros **cálidos** (tienen una pizca de marrón/amarillo), nunca grises azulados. Bordes `#E7E2D8`.
- **Semánticos restringidos:** verde, ámbar, rojo, azul — desaturados y cálidos para no competir con el naranja. El ámbar de advertencia (`#C98A12`) se mantiene más amarillo a propósito para distinguirse del acento.

**Tipografía**
- **Display / títulos:** `Spectral` (serif editorial). Da el aire de "propuesta comercial" sin ser anticuado. Pesos 400/500/600 + itálica. Sentence case, tracking levemente negativo.
- **UI / cuerpo / tablas:** `IBM Plex Sans`. Legible a tamaños chicos, con carácter técnico. 400–700.
- **Datos / códigos / cifras:** `IBM Plex Mono` con **cifras tabulares** (`font-variant-numeric: tabular-nums`) para que las columnas de precios alineen.
- Tamaño mínimo de UI: 13–14px. Eyebrows a 11px en mayúsculas con tracking `0.08em`.

**Espaciado & layout**
- Grilla base **4px**. Sidebar fijo de 248px (colapsable a 64px), topbar 56px. Contenido máx. ~1280px en vistas de formulario; el inventario y el mapa van a pantalla completa.
- Densidad media-alta (es una herramienta de datos), pero con aire: padding de tarjeta 20–24px, filas de tabla ~40px.

**Radios — "apenas redondeado"**
- Controles (botones, inputs, chips) a **3px**. Tarjetas a 4px, modales a 6px. Nada de esquinas blandas/pill salvo dots, avatares y switches. Es una decisión deliberada del cliente: se siente preciso, no "appy".

**Bordes & sombras**
- Bordes de 1px (1.5px en inputs/checkbox para definición). Sombras **suaves, cálidas y de poca difusión** (tinte marrón `rgba(40,30,16,…)`), nunca negras puras ni grandes blurs azulados. Las tarjetas usan `--shadow-sm`; al hacer hover suben a `--shadow-md` con un `translateY(-1px)`.

**Fondos**
- Planos. **Sin** gradientes decorativos, sin texturas, sin ilustraciones de relleno. El único "fondo rico" es el **mapa** (módulo de inventario), que ocupa toda la pantalla. La calidez viene del color crema, no de imágenes.

**Movimiento**
- Rápido y funcional. Transiciones de 120–180ms con easing `cubic-bezier(0.22,0.61,0.36,1)` (out, sin rebote). Hover = cambio de relleno; press = `translateY(0.5px)` (botón) o leve oscurecimiento. **Sin** bounces, sin animaciones decorativas en loop. Respeta `prefers-reduced-motion`.

**Estados**
- **Hover:** oscurece el relleno (primario → `--accent-hover`), o aparece un relleno crema (`--surface-hover`) en ghosts/filas.
- **Press:** se oscurece un paso más y baja 0.5px. No hay escalado.
- **Focus (teclado):** anillo naranja suave de 3px (`--shadow-focus`), nunca outline azul del navegador.
- **Selected/active:** relleno `--accent-soft` + texto/ícono naranja, o barra naranja a la izquierda en navegación.

**Transparencia & blur**
- Uso mínimo. Popups del mapa y overlays pueden tener una sombra fuerte sobre el mapa; no se abusa de glassmorphism. Sin blurs de fondo salvo, eventualmente, el scrim de un modal (oscurecimiento, no blur fuerte).

**Imágenes**
- Casi no hay fotografía en la herramienta. Si aparece (foto del cartel en la ficha), va con esquinas a 4px y un borde de 1px; tono cálido, sin filtros.

---

## ICONOGRAPHY

- **Sistema:** [Lucide](https://lucide.dev) — íconos de **trazo (stroke) a 2px**, esquinas redondeadas suaves. Encajan con el aire limpio y técnico de la herramienta. Se cargan desde CDN (`https://unpkg.com/lucide@latest`) y se renderizan vía el componente `Icon` (kebab-case: `map-pin`, `building-2`, `chevron-down`).
- **Por qué Lucide (sustitución declarada):** no se recibió un set de íconos propio ni codebase. Lucide es la elección por defecto por su consistencia de trazo y cobertura. **Si Masa Ideas tiene un set propio, reemplazar** el componente `Icon` por ese set.
- **Tamaños:** 16px en línea de texto/botones chicos, 18px por defecto, 20–22px en headers/acciones destacadas. Color por `currentColor` (heredan del contexto: muted en barras, naranja cuando están activos).
- **Emoji:** no se usan en ningún caso.
- **Unicode como íconos:** no. Todo ícono es Lucide.
- **Logo / marca:** PNG en `assets/` (ver índice). El emblema circular (la "moneda" naranja) sirve de favicon/avatar de la app; el wordmark completo va en superficies claras.

---

## VISUAL ASSETS — `assets/`

| Archivo | Uso |
|---|---|
| `logo_masa_ideas.png` | Logo completo, **fondo transparente** (sobre crema/claro). |
| `logo_masa_ideas-3x.png` | Igual, 3× para pantallas densas / impresión. |
| `logo_mark.png` | Solo el emblema circular. Favicon, avatar de app, lockup en sidebar oscuro. |

> El "masa" del wordmark es oscuro: sobre el sidebar carbón conviene usar `logo_mark.png` + el wordmark tipografiado en crema (ver `guidelines/brand-logo.card.html`).

---

## ÍNDICE / MANIFEST

**Entrada global de CSS:** `styles.css` (solo `@import`s) → `tokens/fonts.css`, `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css`, `tokens/base.css`. Los consumidores enlazan **solo** `styles.css`.

**Tokens** (`tokens/`)
- `colors.css` — paleta base + alias semánticos (`--accent`, `--bg-page`, `--sidebar-bg`, estados de inventario…).
- `typography.css` — familias, pesos, escala, line-heights, cifras tabulares.
- `spacing.css` — espaciado 4px, radios, sombras, layout, motion, z-index.
- `fonts.css` — `@import` de Google Fonts (Spectral, IBM Plex Sans, IBM Plex Mono).
- `base.css` — reset + estilos de elementos (headings serif, scrollbar, focus, `.eyebrow`, `.tnum`).

**Componentes** (`components/`) — namespace en runtime: `window.DesignSystem_27db72`
- `actions/` — `Button`, `IconButton`
- `forms/` — `Input`, `Textarea`, `Select`, `Checkbox`, `Switch`, `SegmentedControl`
- `feedback/` — `Badge`, `StatusPill`, `Tooltip`, `EmptyState`
- `data-display/` — `Card`, `Avatar`, `Stat`, `Thumbnail`
- `navigation/` — `Tabs`, `Sidebar`
- `overlays/` — `Modal`, `ImportDialog`
- `icon/` — `Icon` (wrapper de Lucide)

**Ilustraciones e imágenes:** el sistema **no usa fotos ni ilustraciones de relleno**. Las imágenes que el usuario aún no cargó (foto del cartel) se muestran con `Thumbnail`, que dibuja un **placeholder SVG limpio** (silueta de cartel) y se reemplaza al subir la foto. Los estados sin datos usan `EmptyState`, con ilustraciones SVG simples (lupa, pin, documento, tablero) — trazo cálido y un toque de acento. Estos SVG son la única "imagería" del sistema; mantenerlos minimalistas e iconográficos.

**Importación por Excel:** Masa Ideas trabaja mucho con planillas. Todo módulo con carga masiva (inventario, pipeline, clientes) lleva un botón **"Importar"** (secundario, ícono `file-up`) al lado de la acción primaria "Nuevo…". Abre `ImportDialog`: dropzone → archivo detectado + mapeo automático de columnas → progreso → resumen. Incluí siempre "Descargar plantilla".

**Guidelines / specimen cards** (`guidelines/`) — tarjetas de la pestaña Design System (Colors, Type, Spacing, Brand).

**UI kits** (`ui_kits/`)
- `inventory/` — Inventario con mapa
- `pipeline/` — Pipeline comercial (CRM)
- `proposals/` — Generador de propuestas

**Otros**
- `SKILL.md` — manifiesto para usar este sistema como Agent Skill.
- `assets/` — logos.

> Generados automáticamente (no editar): `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json`.
