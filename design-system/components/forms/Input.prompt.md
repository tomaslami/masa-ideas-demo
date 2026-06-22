Form controls — inputs, selects, toggles. White fields, warm borders, orange focus ring, near-square 3px corners.

```jsx
<Input label="Cliente" icon="search" placeholder="Buscar…" />
<Input label="Precio mensual" prefix="$" suffix="ARS" />
<Input label="Email" error="Email inválido" defaultValue="x@" />
<Select label="Estado" options={['Disponible','Reservado','Ocupado']} placeholder="Elegir…" />
<Textarea label="Notas" rows={3} />
<Checkbox label="Solo disponibles" checked />
<Switch checked={on} onChange={setOn} label="Mostrar vencidos" />
<SegmentedControl value={v} onChange={setV}
  options={[{value:'mapa',label:'Mapa',icon:'map'},{value:'lista',label:'Lista',icon:'list'}]} />
```

- All fields: white surface, `--border-strong`, orange border + soft ring on focus.
- `error` turns the border red and shows a hint with an alert icon.
- Use `prefix`/`suffix` (mono) for currency and units in pricing forms.
