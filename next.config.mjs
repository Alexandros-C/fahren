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
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: []
  }
};

export default nextConfig;
