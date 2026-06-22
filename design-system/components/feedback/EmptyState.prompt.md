No-data / empty state with a clean, simple SVG line illustration (warm, accent used sparingly).

```jsx
<EmptyState art="search" title="Sin resultados"
  description="Probá con otro código o limpiá los filtros."
  action={<Button variant="secondary" size="sm">Limpiar filtros</Button>} />
<EmptyState art="board" compact title="Arrastrá una oportunidad acá" />
```

- `art`: `search` (no results), `map` (no pins), `inbox` (nothing yet), `document` (no proposal items), `board` (empty kanban column).
- `compact` shrinks it for tight spots like a kanban column.
- Use instead of bare "no hay datos" text — it carries the brand's clean iconographic style.
