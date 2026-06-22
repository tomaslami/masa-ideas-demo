White surface container for grouping content. Pairs with Avatar (people) and Stat (KPIs).

```jsx
<Card header={<><strong>Cartel MI-0428</strong><Badge tone="success">Disponible</Badge></>}
      footer={<Button size="sm" variant="secondary" fullWidth>Ver ficha</Button>}>
  Av. Corrientes 3200 · Frente 8×4 m · Iluminado
</Card>
<Avatar name="Lucía Fernández" />
<Stat label="Ocupación" value="78" unit="%" delta="+4 pts" icon="layout-grid" />
```

- **Card** `elevation` flat/sm/md, `padding` none/sm/md/lg, `interactive` for hover lift. 4px corners, warm 1px border + soft shadow.
- **Avatar** initials from `name` with a deterministic warm color, or `src` image; `square` option.
- **Stat** uses mono tabular figures for the value; delta sign sets color/arrow (`invertDelta` for cost-like metrics).
