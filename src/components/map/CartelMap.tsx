"use client";

import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import type { Cartel, CartelEstado } from "@/lib/types";

const ESTADO_COLOR: Record<CartelEstado, string> = {
  libre: "#10b981",
  ocupado: "#e95d0f",
  reservado: "#f59e0b",
  mantenimiento: "#a3a3a3",
};

const ESTADO_LABEL: Record<CartelEstado, string> = {
  libre: "Libre",
  ocupado: "Ocupado",
  reservado: "Reservado",
  mantenimiento: "Mantenimiento",
};

/** Pin/gota en SVG, coloreado por estado, con realce para el seleccionado. */
function pinIcon(estado: CartelEstado, selected: boolean): L.DivIcon {
  const color = ESTADO_COLOR[estado];
  const size = selected ? 38 : 28;
  const ring = selected
    ? `<span style="position:absolute;left:50%;top:34%;transform:translate(-50%,-50%);width:${size + 16}px;height:${size + 16}px;border-radius:9999px;background:${color}33;animation:none;"></span>`
    : "";
  const html = `
    <div style="position:relative;width:${size}px;height:${size}px;">
      ${ring}
      <svg width="${size}" height="${size}" viewBox="0 0 28 28" style="position:relative;display:block;filter:drop-shadow(0 3px 5px rgba(20,18,16,0.35));">
        <path d="M14 1.5C8.2 1.5 3.5 6.1 3.5 11.8c0 7.3 9.1 14.2 9.5 14.5.6.4 1.4.4 2 0 .4-.3 9.5-7.2 9.5-14.5C24.5 6.1 19.8 1.5 14 1.5Z" fill="${color}" stroke="#ffffff" stroke-width="${selected ? 2.5 : 2}"/>
        <circle cx="14" cy="11.8" r="${selected ? 4.6 : 4}" fill="#ffffff"/>
      </svg>
    </div>`;
  return L.divIcon({
    html,
    className: "masa-pin",
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size + 4],
  });
}

/** Subcomponente que hace fly-to cuando cambia focusId. */
function FlyTo({ carteles, focusId }: { carteles: Cartel[]; focusId: string | null }) {
  const map = useMap();
  useEffect(() => {
    if (!focusId) return;
    const c = carteles.find((x) => x.id === focusId);
    if (!c) return;
    map.flyTo([c.lat, c.lng], 15, { duration: 0.9 });
  }, [focusId, carteles, map]);
  return null;
}

export interface CartelMapProps {
  carteles: Cartel[];
  selectedId: string | null;
  focusId: string | null;
  onSelect: (cartel: Cartel) => void;
}

export default function CartelMap({
  carteles,
  selectedId,
  focusId,
  onSelect,
}: CartelMapProps) {
  const icons = useMemo(() => {
    const m = new Map<string, L.DivIcon>();
    for (const c of carteles) {
      m.set(c.id, pinIcon(c.estado, c.id === selectedId));
    }
    return m;
  }, [carteles, selectedId]);

  return (
    <div className="relative size-full">
      <MapContainer
        center={[-34.61, -58.42]}
        zoom={12}
        scrollWheelZoom
        className="size-full"
        zoomControl
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />
        <FlyTo carteles={carteles} focusId={focusId} />
        {carteles.map((c) => (
          <Marker
            key={c.id}
            position={[c.lat, c.lng]}
            icon={icons.get(c.id)}
            zIndexOffset={c.id === selectedId ? 1000 : 0}
            eventHandlers={{ click: () => onSelect(c) }}
          >
            <Popup>
              <button
                type="button"
                onClick={() => onSelect(c)}
                className="block w-full cursor-pointer p-3 text-left"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-semibold text-ink-900">
                    {c.codigo}
                  </span>
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium"
                    style={{
                      color: ESTADO_COLOR[c.estado],
                      background: `${ESTADO_COLOR[c.estado]}1a`,
                    }}
                  >
                    <span
                      className="size-1.5 rounded-full"
                      style={{ background: ESTADO_COLOR[c.estado] }}
                    />
                    {ESTADO_LABEL[c.estado]}
                  </span>
                </div>
                <p className="mt-1.5 text-[13px] font-medium text-ink-800">
                  {c.direccion}
                </p>
                <p className="mt-0.5 text-xs text-[var(--muted)]">
                  {c.zona} · {c.tipo}
                </p>
                <span className="mt-2 inline-block text-xs font-semibold text-brand-600">
                  Ver ficha →
                </span>
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <MapLegend />
    </div>
  );
}

function MapLegend() {
  const items: { estado: CartelEstado }[] = [
    { estado: "libre" },
    { estado: "ocupado" },
    { estado: "reservado" },
    { estado: "mantenimiento" },
  ];
  return (
    <div className="pointer-events-none absolute bottom-4 left-4 z-[500] rounded-xl border border-[var(--border)] bg-white/95 px-3.5 py-2.5 shadow-[var(--shadow-lift)] backdrop-blur animate-fade-in">
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--muted)]">
        Estado
      </p>
      <ul className="grid grid-cols-2 gap-x-3.5 gap-y-1.5">
        {items.map(({ estado }) => (
          <li key={estado} className="flex items-center gap-1.5">
            <span
              className="size-2.5 rounded-full ring-2 ring-white"
              style={{ background: ESTADO_COLOR[estado] }}
            />
            <span className="text-xs font-medium text-ink-700">
              {ESTADO_LABEL[estado]}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
