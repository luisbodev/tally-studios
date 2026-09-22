import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Miniaturas de YouTube para el portafolio
    remotePatterns: [new URL("https://i.ytimg.com/vi/**")],
  },
};

export default nextConfig;
