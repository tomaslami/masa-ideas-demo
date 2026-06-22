Status & metadata indicators. Badges for labels/counts, StatusPill for inventory/pipeline state, Tooltip for hover hints.

```jsx
<Badge tone="accent">Premium</Badge>
<Badge tone="success" icon="check">Firmado</Badge>
<Badge tone="warning" variant="outline">Por vencer</Badge>
<StatusPill status="disponible" />
<StatusPill status="ocupado" solid />
<Tooltip label="Ver en el mapa"><IconButton icon="map-pin" /></Tooltip>
```

- **Badge** tones: neutral, accent, success, warning, danger, info × variants soft/solid/outline.
- **StatusPill** presets: disponible (verde), reservado (ámbar), ocupado (naranja), mantenimiento (azul), vencido (rojo). Dot + text by default; `solid` for a filled chip.
- Keep corners near-square (2px) like the rest of the system.
