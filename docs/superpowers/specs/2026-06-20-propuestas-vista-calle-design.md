# Propuestas con "Vista en calle real" — Diseño

**Fecha:** 2026-06-20
**Feature:** Generador de propuestas (Fase 1, Masa Ideas)
**Branch:** `feat/propuestas-vista-calle`
**Estado:** Aprobado para implementación

---

## 1. Problema

Hoy el generador de propuestas muestra el cartel sobre una **escena SVG sintética**
(`src/lib/billboard.ts` → `sceneFor`): cielo, edificios y un panel dibujados por
código. El arte del anunciante se superpone con un transform **plano** (posición,
ancho, rotación, opacidad) — **sin perspectiva**.

Esto está muy lejos del resultado real. Masa Ideas le **envía estas propuestas a sus
clientes**: la propuesta ES la promesa de cómo va a quedar el cartel en la calle. Un
mockup de maqueta no le pega al dolor comercial (que el documento de diagnóstico marca
como el dolor #1 de la empresa).

**Objetivo:** que la propuesta muestre el aviso del anunciante como se vería **real en
la calle**, sobre imagen street-level real, con un editor **interactivo** (para grabar
la demo) y export a **PDF** (el entregable que recibe el anunciante).

## 2. Decisiones tomadas (contexto del brainstorming)

| Decisión | Elección | Motivo |
|---|---|---|
| Fuente de imagen | **Mapillary** (street view gratis) | Imágenes reales sin billing/tarjeta |
| API paga de Google | **Descartada** | Street View Static/JS requiere key con facturación |
| Entregable al cliente | **PDF estático** | Fácil de mandar por mail/WhatsApp |
| Experiencia de demo | **Interactiva** | El "wow" se graba en video; el comercial mueve/calza el banner en vivo |
| Alcance de esta iteración | **4-6 carteles hero impecables** | Demo primero; reusable/escalable después |
| Nivel de wow | **C — Híbrido** | Base impecable garantizada + momento 3D para el clímax |

> Cambio de alcance consciente: el documento de Fulk cataloga "fotos tipo Street View"
> como **Fase 3 / Roadmap**. Esta feature **sube Street View a Fase 1** dentro del
> generador de propuestas, porque es lo que más diferencia y lo que le pega al dolor.

## 3. Enfoque elegido: C — Híbrido

- **Modo B (base, todos los hero):** el viewer queda parado en el mejor encuadre y el
  banner es un **quad de 4 esquinas** calzado pixel-perfect sobre la cara del cartel.
  Siempre se ve impecable y es lo que se captura para el PDF.
- **Modo A (clímax, 1-2 hero):** el banner es un **plano texturizado geo-anclado en 3D**
  (Three.js custom renderer de MapillaryJS). Queda clavado a la pared mientras se navega
  la calle. Es el golpe de efecto del video.

## 4. Modelo de datos

Se agrega un campo **opcional** a `Cartel` (en `src/lib/types.ts`). Los carteles sin
`vistaCalle` siguen funcionando exactamente como hoy (escena sintética).

```ts
/** 4 esquinas en porcentaje (0..1) relativas al frame, orden TL, TR, BR, BL. */
interface Quad {
  tl: { x: number; y: number };
  tr: { x: number; y: number };
  br: { x: number; y: number };
  bl: { x: number; y: number };
}

interface VistaCalle {
  /** id del frame canónico de Mapillary */
  mapillaryImageId: string;
  /** encuadre inicial del viewer */
  pov: { bearing: number; tilt: number; zoom: number };
  /** colocación 2D del banner sobre el frame — Modo B */
  placement2D: Quad;
  /** geo-anclaje 3D opcional — Modo A */
  placement3D?: {
    lng: number;
    lat: number;
    alt: number;
    rotation: [number, number, number];
    anchoM: number;
    altoM: number;
  };
  /** still pre-capturado (dataURL o ruta a asset) para fallback sin red */
  capturaFallback?: string;
}

interface Cartel {
  // ...campos actuales...
  vistaCalle?: VistaCalle;
}
```

Se seedea `vistaCalle` en **4-6 carteles existentes** del inventario (los que ya tienen
dirección y lat/lng reales en CABA), buscando el frame Mapillary más cercano a esa
dirección. Así la propuesta queda consistente con inventario y CRM.

## 5. Componentes

Todos nuevos bajo `src/components/proposals/street/` salvo la integración en `Builder`.

### 5.1 `StreetMockupViewer` (cliente)
Envuelve MapillaryJS. Se carga con `dynamic(() => ..., { ssr: false })` porque es WebGL
client-only.
- **Modo B:** renderiza el arte como quad de 4 esquinas (CSS `matrix3d` o canvas) locked
  a `placement2D` sobre el frame parado.
- **Modo A:** registra un `ICustomRenderer` (Three.js) que ubica un plano texturizado en
  `placement3D` usando `geodeticToEnu`; re-calcula en `onReference`.
- Controles: mover/escalar/esquinas, opacidad, **día/noche** (tint), **antes/después**
  (toggle visibilidad del banner), cambiar arte, "explorar la calle" (libera navegación).

### 5.2 `StreetMockupEditor` (autoría/calibración)
Permite elegir el frame Mapillary y calzar el arte → genera/edita `vistaCalle`.
Resuelve dos cosas: (a) el comercial elige qué se muestra, (b) el momento demo
"Masa Ideas arma el cartel en vivo sobre la calle". Es la base que escala a los 250.

### 5.3 Captura → PDF
Botón "capturar vista" que toma un still del canvas (calle + banner) → dataURL → se
inyecta como imagen del mockup en el flujo PDF actual (`src/lib/pdf.ts`). El PDF
muestra la foto real con el arte aplicado.

### 5.4 Integración en `Builder` (paso 3 — Mockups)
`src/components/proposals/Builder.tsx`, `Step3Mockups`: si el cartel activo tiene
`vistaCalle`, usa `StreetMockupViewer/Editor`; si no, usa el `MockupEditor` actual.
No se rompe nada del flujo existente.

## 6. Flujo de datos

```
Cartel.vistaCalle (seed/autoría)
   → StreetMockupViewer (Mapillary + banner)
   → editor ajusta placement2D/placement3D
   → captura still
   → Mockup.artUrl + capturaUrl
   → pdf.ts (entregable)
```

## 7. Robustez (la demo no se puede romper en cámara)

Cascada de fallback en `StreetMockupViewer`:
1. Mapillary en vivo (token + red + WebGL OK).
2. `capturaFallback` (still pre-capturado guardado como asset).
3. Escena sintética actual (`sceneFor`).

## 8. Dependencias y setup

- `mapillary-js` y `three` (peer para el custom renderer).
- **Token gratuito de Mapillary** en `NEXT_PUBLIC_MAPILLARY_TOKEN` (`.env.local`, no se
  commitea). Cuenta gratis, sin tarjeta.
- **Next 16 tiene breaking changes** (ver `AGENTS.md`): antes de codear, leer la guía de
  `dynamic` / client components en `node_modules/next/dist/docs`.

## 9. Testing

Demo visual con datos mock → testeo principalmente manual:
- El viewer carga el frame y setea el POV.
- El banner calza en la cara (Modo B) y queda anclado al navegar (Modo A).
- La captura genera el still y el PDF lo incluye.
- La cascada de fallback funciona sin red / sin token / sin WebGL.

Unit tests acotados para utilidades puras: cálculo del `matrix3d` desde un `Quad`, y el
wrapper de `geodeticToEnu` (conversión geodésica → topocéntrica).

## 10. Fuera de alcance (YAGNI)

Backend/persistencia real, calibrar los 250 carteles, IA generativa, multi-ángulo
complejo, panorama multi-imagen. Eso es el "después lo hacemos escalable".
