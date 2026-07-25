/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lower peak memory during build (helps constrained CI/sandbox environments).
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
  images: {
    remotePatterns: [
      // Existing catalog media is served from the brand's public image CDNs.
      { protocol: "https", hostname: "fourthwall.com" },
      { protocol: "https", hostname: "**.fourthwall.com" },
      { protocol: "https", hostname: "fourthwall.dev" },
      { protocol: "https", hostname: "**.fourthwall.dev" },
      { protocol: "https", hostname: "storage.googleapis.com" },
      { protocol: "https", hostname: "**.cloudfront.net" },
      { protocol: "https", hostname: "**.imgix.net" },
      { protocol: "https", hostname: "airrefrigerant.com" },
      { protocol: "https", hostname: "**.airrefrigerant.com" },
    ],
  },
};

export default nextConfig;
