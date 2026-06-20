import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El proyecto vive en su propia carpeta; fijamos el root para Turbopack
  // y evitamos que detecte lockfiles de carpetas superiores.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
