/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "three",
      "zustand",
      "@react-three/fiber",
      "@react-three/drei"
    ]
  },
  // Prefer SWC; in unsupported environments Next falls back to @next/swc-wasm-nodejs if installed
  swcMinify: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: []
  }
};

export default nextConfig;
