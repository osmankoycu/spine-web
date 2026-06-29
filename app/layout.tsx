import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/app/providers/SmoothScrollProvider";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Spine — Replace your broker and your PEO",
  description:
    "Spine is a PEO-replacement platform covering Benefits, Compliance, and People Ops. Lower premiums, real compliance, and 24/7 support from an in-house team plus AI.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Neue Haas Grotesk — Adobe Fonts (Typekit kit qyt7ipl, shared with image-web) */}
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="" />
        <link rel="stylesheet" href="https://use.typekit.net/qyt7ipl.css" />
        {/* Always load the pinned hero at the top (INTRO), even on reload. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if (typeof window !== 'undefined') { window.history.scrollRestoration = 'manual'; window.scrollTo(0, 0); }`,
          }}
        />
      </head>
      <body className="min-h-full antialiased">
        <SmoothScrollProvider>
          <Header />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
