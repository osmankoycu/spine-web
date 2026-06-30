import Link from "next/link";

// Lightweight placeholder for scaffolded inner routes (Platform, Customers, …).
// Real pages are built out later (Section 1 / Section 9.9).
export function RouteStub({
  title,
  blurb,
}: {
  title: string;
  blurb?: string;
}) {
  return (
    <main className="page-gutter flex min-h-screen flex-col justify-center pt-[var(--header-h)]">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-grey-text">
        Spine
      </p>
      <h1 className="font-display mt-3 text-6xl font-bold leading-none text-ink">
        {title}
      </h1>
      <p className="mt-5 max-w-xl text-grey-text">
        {blurb ?? "This page is scaffolded, content coming soon."}
      </p>
      <Link
        href="/"
        className="mt-9 inline-block text-[15px] font-medium text-orange hover:text-orange-600"
      >
        ← Back to home
      </Link>
    </main>
  );
}
