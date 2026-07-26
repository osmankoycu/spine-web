// Shared shell for the legal pages (Privacy, Terms). A clean, readable prose
// column on the site background, padded to clear the fixed header. The global
// Header / TagDrop / Footer come from the root layout.

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="bg-bg">
      <div className="mx-auto max-w-[760px] px-6 pb-24 pt-[132px] sm:pb-28 sm:pt-[164px]">
        <h1 className="font-display text-[36px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[46px]">
          {title}
        </h1>
        <p className="mt-4 text-[14px] font-medium text-grey-text">{updated}</p>
        {/* 36px between sections was not enough to signal "new section" in a
            375px column — a hairline plus real air makes a 9-section policy
            scannable with a thumb, without needing a table of contents. */}
        <div className="mt-10 space-y-10 sm:mt-12 sm:space-y-9">{children}</div>
      </div>
    </main>
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    // The h2 competed with the bold `Lead` run-ins inside the prose, so at
    // thumb-scroll speed a section heading and a lead-in read at the same
    // weight. A rule above each section (from the second on) plus a larger
    // heading restores the hierarchy.
    <section className="border-t border-black/[0.07] pt-8 first:border-0 first:pt-0">
      <h2 className="font-display text-[22px] font-bold tracking-[-0.01em] text-ink">
        {title}
      </h2>
      {/* space-y must EXCEED the 27px line spacing (16px × 1.7), or paragraphs
          pack tighter than their own lines and read as one grey slab. */}
      <div className="mt-4 space-y-5 text-[16px] leading-[1.7] text-[#54534d]">{children}</div>
    </section>
  );
}

export function P({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}

// Muted label used for the bold lead-ins (e.g. "Personal Information:").
export function Lead({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-ink">{children}</strong>;
}

export function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="ml-1 space-y-2">
      {children}
    </ul>
  );
}

export function LI({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative pl-5 before:absolute before:left-0 before:top-[10px] before:h-1.5 before:w-1.5 before:rounded-full before:bg-orange">
      {children}
    </li>
  );
}
