import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/app/providers/SmoothScrollProvider";
import { Header } from "@/components/header/Header";
import { AnnouncementBanner } from "@/components/header/AnnouncementBanner";
import { TagDrop } from "@/components/footer/TagDrop";
import { Footer } from "@/components/footer/Footer";
import { DemoModalProvider } from "@/components/cta/DemoModal";

export const metadata: Metadata = {
  title: "Spine: Replace your broker and your PEO",
  description:
    "Spine is a PEO-replacement platform covering Benefits, Compliance, and People Ops. Lower premiums, real compliance, and 24/7 support from an in-house team plus AI.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Neue Haas Grotesk — Adobe Fonts (Typekit kit qyt7ipl, shared with image-web).
            KEPT loaded so we can flip back to it instantly (see globals.css fonts). */}
        <link rel="preconnect" href="https://use.typekit.net" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="" />
        <link rel="stylesheet" href="https://use.typekit.net/qyt7ipl.css" />
        {/* Google Fonts (Inter + Schibsted Grotesk). Active family set in globals.css. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
        />
        {/* TRYING: Schibsted Grotesk — currently the active family via globals.css. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700;800&display=swap"
        />
        {/* Always load the pinned hero at the top (INTRO), even on reload. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if (typeof window !== 'undefined') { window.history.scrollRestoration = 'manual'; window.scrollTo(0, 0); }`,
          }}
        />
      </head>
      <body className="min-h-full antialiased">
        <SmoothScrollProvider>
          <DemoModalProvider>
            <AnnouncementBanner />
            <Header />
            {children}
            <TagDrop />
            <Footer />
          </DemoModalProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
