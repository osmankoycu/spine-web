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
      <div className="mx-auto max-w-[760px] px-5 pb-24 pt-[132px] sm:px-6 sm:pb-28 sm:pt-[164px]">
        <h1 className="font-display text-[36px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[46px]">
          {title}
        </h1>
        <p className="mt-4 text-[14px] font-medium text-grey-text">{updated}</p>
        <div className="mt-10 space-y-9 sm:mt-12">{children}</div>
      </div>
    </main>
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-[20px] font-bold tracking-[-0.01em] text-ink sm:text-[22px]">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-[16px] leading-[1.7] text-[#54534d]">{children}</div>
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
