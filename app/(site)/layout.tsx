import { Header } from "@/components/header/Header";
import { AnnouncementBanner } from "@/components/header/AnnouncementBanner";
import { TagDrop } from "@/components/footer/TagDrop";
import { Footer } from "@/components/footer/Footer";
import { DemoModalProvider } from "@/components/cta/DemoModal";

// The marketing-site chrome, moved here from the root layout so the funnel
// route group can opt out of it. Every marketing page renders inside this.
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <DemoModalProvider>
      <AnnouncementBanner />
      <Header />
      {children}
      <TagDrop />
      <Footer />
    </DemoModalProvider>
  );
}
