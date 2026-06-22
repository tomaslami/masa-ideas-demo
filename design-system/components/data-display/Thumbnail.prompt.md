Image thumbnail that falls back to a clean SVG placeholder when no photo is loaded — for billboard photos in fichas and proposals.

```jsx
<Thumbnail kind="billboard" width={72} label="Foto del cartel" />
<Thumbnail src="/cartel-0428.jpg" ratio="16 / 9" />
```

- `kind`: `billboard` (panel on legs), `image` (generic), `map` (pin). Shown only when `src` is absent.
- Placeholder uses a faint warm hatch + line glyph, matching the system's iconography.
- Set `height` for a fixed box, or leave it and use `ratio`.
