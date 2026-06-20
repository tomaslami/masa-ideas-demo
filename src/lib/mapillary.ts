// ============================================================
// Cliente liviano de Mapillary (API v4).
// Las thumb URLs son firmadas y expiran, así que guardamos solo el
// imageId (estable) y resolvemos la URL de la imagen en runtime.
// ============================================================

export const MAPILLARY_TOKEN =
  process.env.NEXT_PUBLIC_MAPILLARY_TOKEN ?? "";

const GRAPH = "https://graph.mapillary.com";

export interface MapillaryImage {
  id: string;
  thumb?: string;
  isPano?: boolean;
  compass?: number;
  lng?: number;
  lat?: number;
}

// cache en memoria por id (la URL del thumb vale ~horas, suficiente para la sesión)
const thumbCache = new Map<string, Promise<string | null>>();

/** Resuelve la mejor thumb disponible para un imageId. Cachea en memoria. */
export function getImageThumb(imageId: string): Promise<string | null> {
  if (!imageId) return Promise.resolve(null);
  const hit = thumbCache.get(imageId);
  if (hit) return hit;

  const p = (async () => {
    if (!MAPILLARY_TOKEN) return null;
    try {
      const url = `${GRAPH}/${imageId}?fields=thumb_2048_url,thumb_1024_url&access_token=${encodeURIComponent(
        MAPILLARY_TOKEN,
      )}`;
      const r = await fetch(url);
      if (!r.ok) return null;
      const j = await r.json();
      return (j.thumb_2048_url ?? j.thumb_1024_url ?? null) as string | null;
    } catch {
      return null;
    }
  })();

  thumbCache.set(imageId, p);
  // si falla, no cacheamos el null para reintentar luego
  p.then((v) => {
    if (v == null) thumbCache.delete(imageId);
  });
  return p;
}

export const hasMapillaryToken = () => MAPILLARY_TOKEN.length > 0;
