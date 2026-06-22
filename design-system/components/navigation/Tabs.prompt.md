Underline tab bar for switching views within a page (e.g. Todos / Activos / Vencidos).

```jsx
<Tabs value={tab} onChange={setTab}
  tabs={[
    { value: 'todos', label: 'Todos', count: 124 },
    { value: 'activos', label: 'Activos', icon: 'circle-check', count: 88 },
    { value: 'vencidos', label: 'Vencidos', icon: 'clock', count: 6 },
  ]} />
```

- Active tab: orange underline, heading-ink label, semibold.
- Optional `icon` (Lucide) and `count` (mono pill) per tab.
- Sits on a `--border` bottom rule; pull content up by 1px to align.
