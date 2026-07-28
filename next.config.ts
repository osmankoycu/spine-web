import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Blog hero + inline images are served from Sanity's image CDN.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
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
