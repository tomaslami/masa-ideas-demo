Excel/CSV import flow as a modal — the brand's standard way to bulk-load data. Mock only (no real parsing), but the full UX: dropzone → detected file + auto column-mapping → progress → success.

```jsx
const [open, setOpen] = React.useState(false);
<Button variant="secondary" icon="file-up" onClick={() => setOpen(true)}>Importar</Button>
<ImportDialog open={open} onClose={() => setOpen(false)} entity="carteles" rows={16}
  onImported={(n) => toast(`${n} carteles importados`)} />
```

- `entity`: `carteles` | `oportunidades` | `clientes` — changes copy and the column map shown.
- Always pair an **"Importar"** button (secondary, `file-up` icon) with the primary "Nuevo…" action in module toolbars — Masa Ideas works largely from spreadsheets.
- Includes a "Descargar plantilla" action so users export with matching columns.
