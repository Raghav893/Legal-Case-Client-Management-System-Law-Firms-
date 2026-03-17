import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
          <p className="text-sm font-bold tracking-wide text-[var(--accent)]">LexFlow</p>
          <nav className="hidden gap-5 text-sm font-semibold text-slate-600 md:flex">
            <a href="#features" className="hover:text-[var(--accent)]">
              Features
            </a>
            <a href="#workflow" className="hover:text-[var(--accent)]">
              Workflow
            </a>
            <a href="#plans" className="hover:text-[var(--accent)]">
              Plans
            </a>
            <a href="#faq" className="hover:text-[var(--accent)]">
              FAQ
            </a>
          </nav>
          <Link
            href="/dashboard"
            className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
          >
            Dashboard
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-14">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">LEGAL CASE CLIENT MANAGEMENT SYSTEM</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-[var(--accent)] sm:text-5xl">
            One platform for legal teams, clients, and case operations
          </h1>
          <p className="mt-4 max-w-xl text-base text-slate-600 sm:text-lg">
            Manage matters from intake to closure with clear visibility across hearings, documents, tasks, and invoices.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="rounded-md bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
            >
              Get Started
            </Link>
            <a
              href="#features"
              className="rounded-md border border-[var(--border)] px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-[var(--muted-surface)]"
            >
              Explore Features
            </a>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Centralized client and case records",
              "Global search across legal data",
              "Secure document workflow and previews",
              "Dashboard insights for daily operations",
            ].map((point) => (
              <div key={point} className="rounded-lg border border-[var(--border)] bg-[var(--muted-surface)] px-4 py-3 text-sm text-slate-700">
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
              <article key={feature.title} className="rounded-xl border border-[var(--border)] p-4">
                <h3 className="text-lg font-semibold text-slate-800">
                  {feature.title}
                </h3>
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

      <section id="features" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-[0.18em] text-slate-500">FEATURES</p>
          <h2 className="text-3xl font-semibold text-[var(--accent)] sm:text-4xl">Everything needed for day-to-day legal operations</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            "Client intake and profile management",
            "Case status board and hearing tracking",
            "Document drawer and upload center",
            "Global search for clients, cases, invoices",
            "Task assignment with due dates",
            "Billing and payment summaries",
          ].map((item) => (
            <article key={item} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800">{item}</h3>
              <p className="mt-2 text-sm text-slate-600">
                Designed to reduce manual follow-ups and keep legal teams aligned.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="workflow" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-slate-500">WORKFLOW</p>
          <h2 className="mt-2 text-3xl font-semibold text-[var(--accent)]">Simple 4-step flow</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              ["1", "Onboard Client"],
              ["2", "Create Case"],
              ["3", "Track Tasks and Hearings"],
              ["4", "Close with Billing Summary"],
            ].map(([step, label]) => (
              <div key={step} className="rounded-xl border border-[var(--border)] bg-[var(--muted-surface)] p-4">
                <p className="text-sm font-bold text-[var(--accent)]">Step {step}</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="plans" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-[0.18em] text-slate-500">PLANS</p>
          <h2 className="text-3xl font-semibold text-[var(--accent)]">Basic SaaS style pricing section</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              name: "Starter",
              price: "Rs 0",
              blurb: "For college demos and small teams",
            },
            {
              name: "Professional",
              price: "Rs 2,499",
              blurb: "For active legal teams with multiple matters",
            },
            {
              name: "Enterprise",
              price: "Contact",
              blurb: "For large firms needing advanced controls",
            },
          ].map((plan) => (
            <article key={plan.name} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">{plan.name}</h3>
              <p className="mt-2 text-3xl font-semibold text-[var(--accent)]">{plan.price}</p>
              <p className="mt-2 text-sm text-slate-600">{plan.blurb}</p>
              <button
                type="button"
                className="mt-5 w-full rounded-md border border-[var(--border)] px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-[var(--muted-surface)]"
              >
                Select Plan
              </button>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold tracking-[0.18em] text-slate-500">FAQ</p>
          <h2 className="mt-2 text-3xl font-semibold text-[var(--accent)]">Frequently asked questions</h2>
          <div className="mt-6 space-y-3">
            {[
              {
                q: "Is this suitable for a college project demo?",
                a: "Yes, the current modules are ideal for demonstrating real-world legal operations workflows.",
              },
              {
                q: "Can we connect this with Spring Boot APIs?",
                a: "Yes, the frontend structure is ready to consume backend endpoints using fetch or axios.",
              },
              {
                q: "Does it support role-based access?",
                a: "The architecture is planned for role-based authentication with Admin, Lawyer, and staff roles.",
              },
            ].map((item) => (
              <article key={item.q} className="rounded-lg border border-[var(--border)] bg-[var(--muted-surface)] p-4">
                <h3 className="text-sm font-semibold text-slate-800">{item.q}</h3>
                <p className="mt-1 text-sm text-slate-600">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <p className="text-lg font-semibold text-[var(--accent)]">Ready to manage cases better?</p>
            <p className="text-sm text-slate-600">Open your workspace and continue building the platform.</p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex rounded-md bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white hover:opacity-95"
          >
            Launch Dashboard
          </Link>
        </div>
      </footer>
    </main>
  );
}
