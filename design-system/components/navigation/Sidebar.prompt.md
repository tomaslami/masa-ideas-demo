The app's dark navigation shell — used by every Masa Ideas module. Charcoal background, cream text, orange active state with a left bar.

```jsx
<Sidebar
  logoSrc="assets/logo_mark.png"
  brand="Masa Ideas"
  product="Gestión interna"
  active={view}
  onSelect={setView}
  items={[
    { section: 'Operación' },
    { id: 'inventario', label: 'Inventario', icon: 'map-pin', badge: 124 },
    { id: 'pipeline', label: 'Pipeline', icon: 'kanban', badge: 18 },
    { id: 'propuestas', label: 'Propuestas', icon: 'file-text' },
    { divider: true },
    { id: 'clientes', label: 'Clientes', icon: 'users' },
  ]}
  user={{ name: 'Lucía Fernández', role: 'Ejecutiva comercial' }}
/>
```

- Items can be a nav entry `{id,label,icon,badge?}`, a `{section:'LABEL'}` header, or `{divider:true}`.
- `collapsed` shrinks to a 64px icon rail (labels become tooltips).
- Pass `logoSrc` the **mark** PNG; the wordmark is typeset in cream so it reads on the dark background.
- 248px wide; sits at `height:100%` inside a full-height flex row with the page content.
