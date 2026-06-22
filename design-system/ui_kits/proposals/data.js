// Masa Ideas — datos para el generador de propuestas
window.MI_PROP_BILLBOARDS = [
  { id: 'MI-0245', dir: 'Av. del Libertador 4400', barrio: 'Palermo', tipo: 'LED', medida: '6 × 4 m', precio: 1850000, ilum: true, alcance: '420k' },
  { id: 'MI-0781', dir: 'Av. Santa Fe 1850', barrio: 'Recoleta', tipo: 'Medianera', medida: '10 × 8 m', precio: 920000, ilum: true, alcance: '310k' },
  { id: 'MI-0428', dir: 'Av. Corrientes 3200', barrio: 'Balvanera', tipo: 'Frente', medida: '8 × 4 m', precio: 480000, ilum: true, alcance: '180k' },
  { id: 'MI-0067', dir: 'Au. Illia km 2', barrio: 'Retiro', tipo: 'Cartelera', medida: '14 × 5 m', precio: 1600000, ilum: true, alcance: '520k' },
  { id: 'MI-0619', dir: 'Av. Córdoba 5200', barrio: 'Palermo', tipo: 'LED', medida: '5 × 3 m', precio: 1400000, ilum: true, alcance: '290k' },
  { id: 'MI-1188', dir: 'Av. Pueyrredón 900', barrio: 'Once', tipo: 'Frente', medida: '7 × 4 m', precio: 520000, ilum: true, alcance: '210k' },
  { id: 'MI-0810', dir: 'Av. Las Heras 2600', barrio: 'Recoleta', tipo: 'Medianera', medida: '10 × 7 m', precio: 870000, ilum: true, alcance: '270k' },
  { id: 'MI-1320', dir: 'Au. Perito Moreno km 7', barrio: 'Flores', tipo: 'Cartelera', medida: '12 × 5 m', precio: 1100000, ilum: true, alcance: '350k' },
];

window.MI_PROP_FMT = {
  money: (n) => '$' + Math.round(n).toLocaleString('es-AR'),
  moneyShort: (n) => n >= 1e6 ? '$' + (n / 1e6).toLocaleString('es-AR', { maximumFractionDigits: 1 }) + 'M' : '$' + (n / 1e3).toFixed(0) + 'k',
};
