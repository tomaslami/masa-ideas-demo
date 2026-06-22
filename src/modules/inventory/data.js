// Masa Ideas — inventario de ejemplo (carteles de vía pública en CABA)
// x/y = posición en % sobre el mapa estilizado (ba-map.png)
export const MI_INVENTORY = [
  { id: 'MI-0428', dir: 'Av. Corrientes 3200', barrio: 'Balvanera', zona: 'Centro', tipo: 'Frente', medida: '8 × 4 m', estado: 'disponible', precio: 480000, ilum: true,  x: 38, y: 52, cliente: null, vence: null },
  { id: 'MI-1097', dir: 'Au. 25 de Mayo km 4', barrio: 'San Cristóbal', zona: 'Sur', tipo: 'Cartelera', medida: '12 × 5 m', estado: 'ocupado', precio: 1250000, ilum: true, x: 46, y: 64, cliente: 'Cervecería del Plata', vence: '2026-09-30' },
  { id: 'MI-0533', dir: 'Av. Cabildo 2100', barrio: 'Belgrano', zona: 'Norte', tipo: 'Frente', medida: '6 × 3 m', estado: 'disponible', precio: 390000, ilum: false, x: 30, y: 24, cliente: null, vence: null },
  { id: 'MI-0781', dir: 'Av. Santa Fe 1850', barrio: 'Recoleta', zona: 'Norte', tipo: 'Medianera', medida: '10 × 8 m', estado: 'reservado', precio: 920000, ilum: true, x: 44, y: 38, cliente: 'Banco Sur', vence: '2026-07-15' },
  { id: 'MI-1320', dir: 'Au. Perito Moreno km 7', barrio: 'Flores', zona: 'Oeste', tipo: 'Cartelera', medida: '12 × 5 m', estado: 'disponible', precio: 1100000, ilum: true, x: 20, y: 70, cliente: null, vence: null },
  { id: 'MI-0245', dir: 'Av. del Libertador 4400', barrio: 'Palermo', zona: 'Norte', tipo: 'LED', medida: '6 × 4 m', estado: 'ocupado', precio: 1850000, ilum: true, x: 52, y: 30, cliente: 'AutoNova', vence: '2026-11-20' },
  { id: 'MI-0902', dir: 'Av. Rivadavia 7600', barrio: 'Flores', zona: 'Oeste', tipo: 'Frente', medida: '8 × 4 m', estado: 'mantenimiento', precio: 420000, ilum: true, x: 24, y: 58, cliente: null, vence: null },
  { id: 'MI-1450', dir: 'Av. Juan B. Justo 3100', barrio: 'Villa Crespo', zona: 'Centro', tipo: 'Medianera', medida: '9 × 6 m', estado: 'disponible', precio: 680000, ilum: false, x: 36, y: 44, cliente: null, vence: null },
  { id: 'MI-0067', dir: 'Au. Illia km 2', barrio: 'Retiro', zona: 'Norte', tipo: 'Cartelera', medida: '14 × 5 m', estado: 'ocupado', precio: 1600000, ilum: true, x: 56, y: 22, cliente: 'TelCo Móvil', vence: '2026-08-31' },
  { id: 'MI-1188', dir: 'Av. Pueyrredón 900', barrio: 'Once', zona: 'Centro', tipo: 'Frente', medida: '7 × 4 m', estado: 'disponible', precio: 520000, ilum: true, x: 40, y: 48, cliente: null, vence: null },
  { id: 'MI-0619', dir: 'Av. Córdoba 5200', barrio: 'Palermo', zona: 'Norte', tipo: 'LED', medida: '5 × 3 m', estado: 'reservado', precio: 1400000, ilum: true, x: 48, y: 40, cliente: 'Farma+', vence: '2026-07-01' },
  { id: 'MI-1502', dir: 'Av. Directorio 2400', barrio: 'Caballito', zona: 'Centro', tipo: 'Frente', medida: '8 × 4 m', estado: 'disponible', precio: 450000, ilum: false, x: 32, y: 62, cliente: null, vence: null },
  { id: 'MI-0354', dir: 'Au. Dellepiane km 3', barrio: 'Liniers', zona: 'Oeste', tipo: 'Cartelera', medida: '12 × 5 m', estado: 'ocupado', precio: 1150000, ilum: true, x: 16, y: 66, cliente: 'Hiper Norte', vence: '2026-10-12' },
  { id: 'MI-0810', dir: 'Av. Las Heras 2600', barrio: 'Recoleta', zona: 'Norte', tipo: 'Medianera', medida: '10 × 7 m', estado: 'disponible', precio: 870000, ilum: true, x: 46, y: 34, cliente: null, vence: null },
  { id: 'MI-1271', dir: 'Av. Triunvirato 4200', barrio: 'Villa Urquiza', zona: 'Norte', tipo: 'Frente', medida: '6 × 3 m', estado: 'mantenimiento', precio: 360000, ilum: false, x: 28, y: 16, cliente: null, vence: null },
  { id: 'MI-0488', dir: 'Av. Boedo 1200', barrio: 'Boedo', zona: 'Sur', tipo: 'Frente', medida: '8 × 4 m', estado: 'disponible', precio: 470000, ilum: true, x: 42, y: 58, cliente: null, vence: null },
];

// Localidades de CABA agrupadas por zona (para el filtro de localidad)
export const MI_ZONAS = ['Norte', 'Centro', 'Sur', 'Oeste'];

export const MI_FMT = {
  money: (n) => '$' + n.toLocaleString('es-AR'),
  moneyShort: (n) => n >= 1e6 ? '$' + (n / 1e6).toLocaleString('es-AR', { maximumFractionDigits: 1 }) + 'M' : '$' + (n / 1e3).toFixed(0) + 'k',
  date: (s) => s ? new Date(s + 'T00:00').toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' }) : '—',
};
export const MI_STATUS_LABEL = { disponible: 'Disponible', reservado: 'Reservado', ocupado: 'Ocupado', mantenimiento: 'Mantenimiento' };
