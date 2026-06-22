---
name: masa-ideas-design
description: Use this skill to generate well-branded interfaces and assets for Masa Ideas (herramienta de gestión interna de vía pública en Buenos Aires), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation

- **Producto:** herramienta interna B2B (no marketing). Tres módulos: inventario con mapa, pipeline/CRM, generador de propuestas.
- **Vibe:** cálido y profesional — fondo crema, sidebar carbón, **un solo acento naranja** (`#F06010`), serif editorial (Spectral) para títulos, IBM Plex Sans/Mono para UI y datos.
- **Reglas no negociables:** botones/inputs apenas redondeados (3px); naranja solo para lo accionable; grises **cálidos** (nunca azulados); sin gradientes/texturas/emoji; español rioplatense con voseo.

## Cómo construir

- **CSS:** enlazá solo `styles.css`. Usá los tokens (`--accent`, `--bg-page`, `--sidebar-bg`, `--text-heading`, estados de inventario, etc.). No inventes colores nuevos.
- **Componentes (React):** se exponen en `window.DesignSystem_27db72` una vez cargado `_ds_bundle.js`. Mirá cada `*.prompt.md` para uso. Íconos = Lucide vía el componente `Icon`.
- **Pantallas completas:** mirá `ui_kits/<modulo>/` como referencia de composición.
- **Fuentes:** Spectral + IBM Plex Sans + IBM Plex Mono (Google Fonts; ver `tokens/fonts.css`).

Para artefactos estáticos sin React, podés escribir HTML que enlace `styles.css`, usar las clases utilitarias (`.eyebrow`, `.tnum`) y los tokens directamente, y `<i data-lucide="…">` + `lucide.createIcons()` para íconos.
