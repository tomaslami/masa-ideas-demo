Centered dialog shell — scrim, Esc + scrim-click close, optional icon chip, header and footer slots.

```jsx
<Modal open={open} onClose={close}
  icon="trash-2" iconTone="neutral"
  title="¿Eliminar cartel MI-0428?"
  subtitle="Esta acción no se puede deshacer."
  footer={<>
    <Button variant="secondary" onClick={close}>Cancelar</Button>
    <Button variant="danger">Eliminar</Button>
  </>}>
  El cartel saldrá del inventario y de toda propuesta activa.
</Modal>
```

- `open` controls visibility; returns null when closed.
- `footer` is usually right-aligned `Button`s.
- 6px corners (modal radius), warm scrim `rgba(28,27,26,0.38)`, soft pop-in.
