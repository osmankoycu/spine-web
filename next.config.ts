import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Blog hero + inline images are served from Sanity's image CDN.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async redirects() {
    return [
      // Memorable alias for the instant benefits audit. Permanent — the tool
      // lives at /audit.
      { source: "/overpaying", destination: "/audit", permanent: true },
      // Friendly alias for the 45-second setup scan.
      { source: "/setup", destination: "/scan", permanent: true },
      // YC campaign short link (Bookface). Temporary on purpose: campaign URLs
      // stay repointable. Lands on the router, which sorts by team size.
      { source: "/yc", destination: "/start?ref=yc", permanent: false },
    ];
  },
  async rewrites() {
    return [
      // The HR Console is a standalone, self-contained HTML bundle living at
      // public/admin/hr-console.html. Serve it at a clean, extensionless URL.
      { source: "/admin/hr-console", destination: "/admin/hr-console.html" },
      // The mobile app is a multi-file static export in
      // public/admin/hr-console/mobile-app/. Its assets are relative and a
      // <base> tag anchors them, so we only need to map the entry URL.
      { source: "/admin/hr-console/mobile-app", destination: "/admin/hr-console/mobile-app/index.html" },
    ];
  },
};

export default nextConfig;
