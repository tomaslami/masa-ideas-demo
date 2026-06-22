Lucide stroke icon sized in px, inheriting `currentColor` — use anywhere the UI needs an icon.

```jsx
<Icon name="map-pin" size={20} />
<button style={{ color: 'var(--accent)' }}><Icon name="plus" /></button>
```

- `name` is the kebab-case Lucide id (e.g. `map-pin`, `chevron-down`, `building-2`).
- Default size 18px, stroke 2 — matches the system's clean B2B weight.
- Requires `window.lucide` (CDN script `https://unpkg.com/lucide@latest`) loaded on the page.
- Color comes from the parent's `color`; size from the `size` prop.
