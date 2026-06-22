# Masa Ideas — herramienta de gestión interna

App web (Next.js 16 + React 19) construida **desde cero sobre el design system de Masa Ideas**
(empresa de vía pública en Buenos Aires). Es una herramienta interna B2B: prioriza densidad de
datos, legibilidad y rapidez. Estética cálida y profesional — fondo crema, sidebar carbón, un
único acento naranja y tipografía editorial (Spectral) para títulos.

## Módulos

- **Inventario con mapa** (`/inventario`) — mapa full-screen de CABA con pines por cartel,
  popups, búsqueda y panel lateral con filtros (estado, localidad, tipo, iluminación).
- **Pipeline comercial / CRM** (`/pipeline`) — tablero kanban con drag & drop entre etapas,
  vista de lista, KPIs y ficha de oportunidad.
- **Generador de propuestas** (`/propuestas`) — asistente de 5 pasos (cliente → carteles →
  creatividad → condiciones → revisión) con preview imprimible del documento comercial.

`/clientes`, `/reportes` y `/configuracion` quedan como placeholders ("en construcción").

## Cómo correr

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build && pnpm start
```

> Los íconos (Lucide) se cargan desde CDN (`unpkg.com/lucide`), tal como define el design
> system. Hace falta conexión a internet para que se rendericen.

## Estructura

```
design-system/      Design system entregado, verbatim (referencia canónica):
                    tokens, componentes, guidelines, ui_kits, assets, readme.md, SKILL.md.
src/
  app/              App Router: layout (carga fuentes + Lucide), globals.css, una ruta por módulo.
  ds/               Design system integrado a la app:
    tokens/         CSS de colores, tipografía, espaciado, fuentes y base.
    components/     Componentes React (Button, Sidebar, Modal, Input, Card, …) + barrel `index.js`.
  modules/          Pantallas de cada módulo, portadas de `design-system/ui_kits/` a Next.js.
public/
  brand/            Logos (emblema + wordmark).
  inventory/        Mapa estilizado de Buenos Aires.
```

## Decisiones de diseño técnico

- **Tokens primero:** todo el estilo sale de las variables CSS en `src/ds/tokens` (importadas por
  `src/app/globals.css`). No hay Tailwind ni colores inventados — solo los tokens del sistema.
- **Componentes del DS** portados verbatim del zip; se les agregó `'use client'` y se reemplazó el
  namespace global `window.DesignSystem_*` por imports ES (`@/ds`).
- **Apps client-only:** cada módulo es interactivo (mapa, drag, FileReader, íconos por CDN), así
  que se montan con `next/dynamic({ ssr: false })`.
- El sidebar navega entre módulos vía el router de Next (`src/modules/nav.js`).
