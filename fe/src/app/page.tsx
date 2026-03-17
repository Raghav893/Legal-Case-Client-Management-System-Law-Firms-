import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-10">
      <section className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">
            LEGAL CASE CLIENT MANAGEMENT SYSTEM
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-[var(--accent)] sm:text-5xl">
            Professional legal operations for modern law firms
          </h1>
          <p className="mt-4 max-w-xl text-base text-slate-600 sm:text-lg">
            Manage clients, cases, documents, hearings, and billing from a
            unified platform designed for daily law-firm workflows.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="rounded-md bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
            >
              Open Dashboard
            </Link>
            <button
              type="button"
              className="rounded-md border border-[var(--border)] px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-[var(--muted-surface)]"
            >
              View Modules
            </button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Centralized client and case records",
              "Global search across legal data",
              "Secure document workflow and previews",
              "Dashboard insights for daily operations",
            ].map((point) => (
              <div
                key={point}
                className="rounded-lg border border-[var(--border)] bg-[var(--muted-surface)] px-4 py-3 text-sm text-slate-700"
              >
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm sm:p-8">
          <h2 className="text-3xl font-semibold text-[var(--accent)]">Platform Snapshot</h2>
          <div className="mt-5 space-y-4">
            {[
              {
                title: "Client Management",
                desc: "Track profiles, contacts, and all linked matters in one timeline.",
              },
              {
                title: "Case Operations",
                desc: "Monitor hearing schedules, status updates, and legal actions.",
              },
              {
                title: "Document Center",
                desc: "Store drafts, filings, and signed letters with secure access control.",
              },
              {
                title: "Billing and Invoices",
                desc: "Follow outstanding amounts, collections, and monthly billing activity.",
              },
            ].map((feature) => (
              <article
                key={feature.title}
                className="rounded-xl border border-[var(--border)] p-4"
              >
                <h3 className="text-lg font-semibold text-slate-800">{feature.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{feature.desc}</p>
              </article>
            ))}
          </div>

          <Link
            href="/dashboard"
            className="mt-6 inline-flex rounded-md border border-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)]"
          >
            Continue to Workspace
          </Link>
        </div>
      </section>
    </main>
  );
}
