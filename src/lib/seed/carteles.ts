import type { Cartel, CartelEstado, CartelTipo, Permiso, Zona } from "../types";

// Datos de ejemplo — carteles geolocalizados en CABA (coordenadas reales por barrio).
// Marcas y permisos son ficticios. Precios mensuales en ARS (lista).

type Seed = {
  codigo: string;
  zona: Zona;
  lat: number;
  lng: number;
  direccion: string;
  tipo: CartelTipo;
  m: [number, number];
  caras: number;
  iluminado: boolean;
  permiso: Permiso;
  trafico: number;
  orientacion: string;
  estado: CartelEstado;
  precio: number;
  notas?: string;
};

const S: Seed[] = [
  { codigo: "MI-PAL-001", zona: "Palermo", lat: -34.5778, lng: -58.4242, direccion: "Av. Santa Fe 3850", tipo: "Frontal", m: [8, 4], caras: 1, iluminado: true, permiso: "vigente", trafico: 86000, orientacion: "Sentido al centro", estado: "ocupado", precio: 720000 },
  { codigo: "MI-PAL-002", zona: "Palermo", lat: -34.5811, lng: -58.4304, direccion: "Av. Juan B. Justo 1920", tipo: "LED / Digital", m: [10, 5], caras: 1, iluminado: true, permiso: "vigente", trafico: 112000, orientacion: "Doble sentido", estado: "ocupado", precio: 2350000, notas: "Pantalla LED 6 spots rotativos. Premium." },
  { codigo: "MI-PAL-003", zona: "Palermo", lat: -34.5749, lng: -58.4198, direccion: "Av. Coronel Díaz 2100", tipo: "Medianera", m: [12, 9], caras: 1, iluminado: true, permiso: "vigente", trafico: 64000, orientacion: "Vista a Av. Las Heras", estado: "libre", precio: 1680000 },
  { codigo: "MI-PAL-004", zona: "Palermo", lat: -34.5832, lng: -58.4256, direccion: "Av. Córdoba 5400", tipo: "Séxtuple", m: [4, 3], caras: 2, iluminado: false, permiso: "en trámite", trafico: 41000, orientacion: "Sentido a Chacarita", estado: "libre", precio: 240000 },
  { codigo: "MI-REC-001", zona: "Recoleta", lat: -34.5875, lng: -58.3962, direccion: "Av. Pueyrredón 1100", tipo: "Frontal", m: [8, 4], caras: 1, iluminado: true, permiso: "vigente", trafico: 95000, orientacion: "Sentido al río", estado: "ocupado", precio: 810000 },
  { codigo: "MI-REC-002", zona: "Recoleta", lat: -34.5901, lng: -58.3924, direccion: "Av. Callao 1450", tipo: "Medianera", m: [14, 10], caras: 1, iluminado: true, permiso: "vigente", trafico: 78000, orientacion: "Vista a Plaza Vicente López", estado: "reservado", precio: 1950000, notas: "Reservado — propuesta en negociación." },
  { codigo: "MI-REC-003", zona: "Recoleta", lat: -34.5856, lng: -58.3998, direccion: "Av. Las Heras 2200", tipo: "Columna", m: [3, 6], caras: 2, iluminado: true, permiso: "vigente", trafico: 52000, orientacion: "Doble sentido", estado: "libre", precio: 430000 },
  { codigo: "MI-BEL-001", zona: "Belgrano", lat: -34.5627, lng: -58.4561, direccion: "Av. Cabildo 2500", tipo: "LED / Digital", m: [9, 5], caras: 1, iluminado: true, permiso: "vigente", trafico: 124000, orientacion: "Sentido a Núñez", estado: "ocupado", precio: 2480000, notas: "El de mayor tránsito del corredor Cabildo." },
  { codigo: "MI-BEL-002", zona: "Belgrano", lat: -34.5598, lng: -58.4588, direccion: "Av. Cabildo 3100", tipo: "Frontal", m: [8, 4], caras: 2, iluminado: true, permiso: "vigente", trafico: 98000, orientacion: "Doble sentido", estado: "libre", precio: 760000 },
  { codigo: "MI-BEL-003", zona: "Belgrano", lat: -34.5662, lng: -58.4519, direccion: "Av. del Libertador 6400", tipo: "Medianera", m: [15, 11], caras: 1, iluminado: true, permiso: "vigente", trafico: 88000, orientacion: "Vista a Barrancas", estado: "ocupado", precio: 2100000 },
  { codigo: "MI-BEL-004", zona: "Belgrano", lat: -34.5571, lng: -58.4543, direccion: "Av. Juramento 2200", tipo: "Cartelera", m: [6, 3], caras: 1, iluminado: false, permiso: "en trámite", trafico: 36000, orientacion: "Sentido a Cabildo", estado: "mantenimiento", precio: 320000, notas: "En mantenimiento — cambio de estructura." },
  { codigo: "MI-NUN-001", zona: "Núñez", lat: -34.5461, lng: -58.4622, direccion: "Av. Cabildo 4200", tipo: "Frontal", m: [8, 4], caras: 1, iluminado: true, permiso: "vigente", trafico: 91000, orientacion: "Sentido a Gral. Paz", estado: "libre", precio: 690000 },
  { codigo: "MI-NUN-002", zona: "Núñez", lat: -34.5438, lng: -58.4659, direccion: "Av. del Libertador 7600", tipo: "LED / Digital", m: [10, 5], caras: 1, iluminado: true, permiso: "vigente", trafico: 105000, orientacion: "Sentido al centro", estado: "ocupado", precio: 2200000 },
  { codigo: "MI-CAB-001", zona: "Caballito", lat: -34.6188, lng: -58.4402, direccion: "Av. Rivadavia 5200", tipo: "Frontal", m: [8, 4], caras: 2, iluminado: true, permiso: "vigente", trafico: 102000, orientacion: "Doble sentido", estado: "ocupado", precio: 740000 },
  { codigo: "MI-CAB-002", zona: "Caballito", lat: -34.6157, lng: -58.4361, direccion: "Av. Acoyte 500", tipo: "Medianera", m: [12, 8], caras: 1, iluminado: true, permiso: "vigente", trafico: 67000, orientacion: "Vista a Primera Junta", estado: "libre", precio: 1480000 },
  { codigo: "MI-CAB-003", zona: "Caballito", lat: -34.6211, lng: -58.4438, direccion: "Av. Directorio 1800", tipo: "Séxtuple", m: [4, 3], caras: 2, iluminado: false, permiso: "vigente", trafico: 38000, orientacion: "Sentido a Flores", estado: "libre", precio: 220000 },
  { codigo: "MI-VCR-001", zona: "Villa Crespo", lat: -34.5993, lng: -58.4381, direccion: "Av. Corrientes 5400", tipo: "Frontal", m: [8, 4], caras: 1, iluminado: true, permiso: "vigente", trafico: 84000, orientacion: "Sentido a Chacarita", estado: "ocupado", precio: 700000 },
  { codigo: "MI-VCR-002", zona: "Villa Crespo", lat: -34.5961, lng: -58.4422, direccion: "Av. Warnes 300", tipo: "Cartelera", m: [6, 3], caras: 1, iluminado: false, permiso: "en trámite", trafico: 44000, orientacion: "Sentido al centro", estado: "libre", precio: 310000 },
  { codigo: "MI-ALM-001", zona: "Almagro", lat: -34.6099, lng: -58.4203, direccion: "Av. Corrientes 3600", tipo: "LED / Digital", m: [8, 4], caras: 1, iluminado: true, permiso: "vigente", trafico: 96000, orientacion: "Sentido al centro", estado: "ocupado", precio: 1980000 },
  { codigo: "MI-ALM-002", zona: "Almagro", lat: -34.6068, lng: -58.4241, direccion: "Av. Medrano 200", tipo: "Frontal", m: [8, 4], caras: 2, iluminado: true, permiso: "vigente", trafico: 58000, orientacion: "Doble sentido", estado: "libre", precio: 620000 },
  { codigo: "MI-FLO-001", zona: "Flores", lat: -34.6281, lng: -58.4639, direccion: "Av. Rivadavia 6800", tipo: "Frontal", m: [8, 4], caras: 1, iluminado: true, permiso: "vigente", trafico: 89000, orientacion: "Sentido a Liniers", estado: "libre", precio: 660000 },
  { codigo: "MI-FLO-002", zona: "Flores", lat: -34.6312, lng: -58.4601, direccion: "Av. Nazca 100", tipo: "Medianera", m: [11, 8], caras: 1, iluminado: false, permiso: "vigente", trafico: 49000, orientacion: "Vista a Av. Rivadavia", estado: "libre", precio: 1280000 },
  { codigo: "MI-PMA-001", zona: "Puerto Madero", lat: -34.6109, lng: -58.3631, direccion: "Av. Alicia M. de Justo 1100", tipo: "LED / Digital", m: [12, 6], caras: 1, iluminado: true, permiso: "vigente", trafico: 73000, orientacion: "Vista a dique 4", estado: "ocupado", precio: 2300000, notas: "Zona premium, público ABC1." },
  { codigo: "MI-PMA-002", zona: "Puerto Madero", lat: -34.6082, lng: -58.3658, direccion: "Juana Manso 1500", tipo: "Columna", m: [3, 6], caras: 2, iluminado: true, permiso: "vigente", trafico: 41000, orientacion: "Doble sentido", estado: "libre", precio: 540000 },
  { codigo: "MI-MIC-001", zona: "Microcentro", lat: -34.6037, lng: -58.3816, direccion: "Av. 9 de Julio y Corrientes", tipo: "Medianera", m: [18, 14], caras: 1, iluminado: true, permiso: "vigente", trafico: 145000, orientacion: "Vista al Obelisco", estado: "ocupado", precio: 2500000, notas: "Icónico. Vista directa al Obelisco." },
  { codigo: "MI-MIC-002", zona: "Microcentro", lat: -34.6051, lng: -58.3789, direccion: "Av. Corrientes 800", tipo: "Frontal", m: [8, 4], caras: 1, iluminado: true, permiso: "vigente", trafico: 121000, orientacion: "Sentido al Obelisco", estado: "libre", precio: 880000 },
  { codigo: "MI-BAR-001", zona: "Barracas", lat: -34.6441, lng: -58.3792, direccion: "Av. Montes de Oca 1200", tipo: "Frontal", m: [8, 4], caras: 2, iluminado: false, permiso: "vigente", trafico: 54000, orientacion: "Doble sentido", estado: "libre", precio: 480000 },
  { codigo: "MI-BAR-002", zona: "Barracas", lat: -34.6478, lng: -58.3751, direccion: "Av. Regimiento de Patricios 900", tipo: "Cartelera", m: [6, 3], caras: 1, iluminado: false, permiso: "en trámite", trafico: 33000, orientacion: "Sentido al sur", estado: "libre", precio: 290000 },
  { codigo: "MI-VUR-001", zona: "Villa Urquiza", lat: -34.5723, lng: -58.4901, direccion: "Av. Triunvirato 4500", tipo: "Frontal", m: [8, 4], caras: 1, iluminado: true, permiso: "vigente", trafico: 71000, orientacion: "Sentido a Saavedra", estado: "ocupado", precio: 600000 },
  { codigo: "MI-VUR-002", zona: "Villa Urquiza", lat: -34.5689, lng: -58.4872, direccion: "Av. Monroe 4200", tipo: "Séxtuple", m: [4, 3], caras: 2, iluminado: false, permiso: "vigente", trafico: 35000, orientacion: "Doble sentido", estado: "libre", precio: 210000 },
  { codigo: "MI-LGP-001", zona: "Liniers / Gral. Paz", lat: -34.6431, lng: -58.5232, direccion: "Av. Gral. Paz y Rivadavia", tipo: "Medianera", m: [16, 12], caras: 1, iluminado: true, permiso: "vigente", trafico: 138000, orientacion: "Vista a autopista", estado: "libre", precio: 2250000, notas: "Acceso a CABA, altísimo tránsito vehicular." },
  { codigo: "MI-SAA-001", zona: "Saavedra", lat: -34.5541, lng: -58.4873, direccion: "Av. García del Río 2600", tipo: "Frontal", m: [8, 4], caras: 1, iluminado: true, permiso: "vigente", trafico: 62000, orientacion: "Sentido a Núñez", estado: "libre", precio: 560000 },
];

export const cartelesSeed: Cartel[] = S.map((s) => ({
  id: s.codigo.toLowerCase(),
  codigo: s.codigo,
  lat: s.lat,
  lng: s.lng,
  direccion: s.direccion,
  zona: s.zona,
  tipo: s.tipo,
  anchoM: s.m[0],
  altoM: s.m[1],
  caras: s.caras,
  iluminado: s.iluminado,
  permiso: s.permiso,
  traficoDiario: s.trafico,
  orientacion: s.orientacion,
  foto: "",
  estado: s.estado,
  precioMensual: s.precio,
  notas: s.notas,
}));
