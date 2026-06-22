Buttons and icon-buttons — the system's action elements. One orange accent, near-square 3px corners, IBM Plex Sans semibold labels.

```jsx
<Button variant="primary" icon="plus">Nuevo cartel</Button>
<Button variant="secondary">Cancelar</Button>
<Button variant="ghost" iconRight="chevron-down">Filtros</Button>
<Button variant="danger">Eliminar</Button>
<IconButton icon="pencil" title="Editar" />
```

- **Button** variants: `primary` (orange), `secondary` (white + border), `ghost` (transparent), `danger` (red). Sizes `sm | md | lg`. Props: `icon`, `iconRight`, `loading`, `fullWidth`, `disabled`.
- **IconButton** variants: `ghost` (default), `secondary`, `primary`, `danger`; `active` shows an accent-soft fill for toggles.
- Hover darkens the fill; press nudges 0.5px down. No bounce — functional tool feel.
