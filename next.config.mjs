// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // helps catch potential issues in development

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/storage/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  experimental: {
    optimizeCss: true, // automatically extracts critical CSS for faster LCP
  },

  compiler: {
    styledComponents: false, // if using styled-components, enable this
  },
};

export default nextConfig;
