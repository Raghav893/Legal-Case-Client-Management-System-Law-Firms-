"use client";

import { useMemo, useState } from "react";

export default function DashboardView() {
  const [searchValue, setSearchValue] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const kpiCards = useMemo(
    () => [
      {
        label: "Open Cases",
        value: "126",
        delta: "+8 this week",
        tone: "text-[var(--accent)]",
      },
      {
        label: "Upcoming Hearings",
        value: "19",
        delta: "6 in next 72h",
        tone: "text-[var(--warning)]",
      },
      {
        label: "Unpaid Invoices",
        value: "24",
        delta: "Rs 8.4L pending",
        tone: "text-[var(--danger)]",
      },
      {
        label: "Tasks Due Today",
        value: "11",
        delta: "4 high priority",
        tone: "text-[var(--success)]",
      },
    ],
    [],
  );

  const quickResults = useMemo(
    () => [
      "Client: Arjun Mehta",
      "Case: CR-2026-118 State vs Raman",
      "Case: CIV-2026-041 Property dispute",
      "Client: Kavya Narang",
    ],
    [],
  );

  const filteredResults = quickResults.filter((item) =>
    item.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <div className="min-h-screen">
      <aside
        className={`fixed top-0 right-0 z-20 h-full w-full max-w-md border-l border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl transition-transform duration-300 sm:w-[26rem] ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-[var(--accent)]">Document Drawer</h2>
            <p className="text-sm text-slate-600">Quick access to active case files</p>
          </div>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="rounded-md border border-[var(--border)] px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-[var(--muted-surface)]"
          >
            Close
          </button>
        </div>

        <div className="space-y-3">
          {[
            "Engagement Letter - Mehta.pdf",
            "Bail Petition Draft v3.docx",
            "Hearing Notes 17-Mar-2026.txt",
            "Invoice INV-2026-044.pdf",
          ].map((document) => (
            <div
              key={document}
              className="rounded-lg border border-[var(--border)] bg-[var(--muted-surface)] p-3"
            >
              <p className="font-semibold text-slate-800">{document}</p>
              <p className="mt-1 text-xs text-slate-600">Updated 2h ago - Private</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="mt-5 w-full rounded-lg bg-[var(--accent)] px-4 py-3 font-semibold text-white hover:opacity-95"
        >
          Upload New Document
        </button>
      </aside>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-10">
        <header className="mb-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-slate-500">
                LEGAL OPERATIONS COMMAND CENTER
              </p>
              <h1 className="text-3xl font-semibold text-[var(--accent)] sm:text-4xl">
                Firm Dashboard
              </h1>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
              >
                Open Document Drawer
              </button>
              <button
                type="button"
                className="rounded-md border border-[var(--border)] px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-[var(--muted-surface)]"
              >
                New Case
              </button>
            </div>
          </div>
        </header>

        <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpiCards.map((card) => (
            <article
              key={card.label}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm"
            >
              <p className="text-sm font-semibold text-slate-600">{card.label}</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{card.value}</p>
              <p className={`mt-1 text-sm font-semibold ${card.tone}`}>{card.delta}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
            <h2 className="text-2xl font-semibold text-[var(--accent)]">Global Search</h2>
            <p className="mt-1 text-sm text-slate-600">
              Search clients, case numbers, invoices, and documents from one place.
            </p>

            <input
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search: client name, case id, phone, invoice"
              className="mt-4 w-full rounded-lg border border-[var(--border)] bg-[var(--muted-surface)] px-4 py-3 text-sm outline-none ring-[var(--accent)] placeholder:text-slate-500 focus:ring-2"
            />

            <div className="mt-4 space-y-2">
              {(searchValue ? filteredResults : quickResults).map((result) => (
                <button
                  key={result}
                  type="button"
                  className="flex w-full items-center justify-between rounded-lg border border-[var(--border)] bg-white px-3 py-2 text-left text-sm text-slate-700 hover:bg-[var(--muted-surface)]"
                >
                  <span>{result}</span>
                  <span className="text-xs font-semibold text-slate-500">Open</span>
                </button>
              ))}

              {searchValue && filteredResults.length === 0 && (
                <p className="rounded-lg border border-dashed border-[var(--border)] p-4 text-sm text-slate-500">
                  No matches found for &quot;{searchValue}&quot;.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
            <h2 className="text-2xl font-semibold text-[var(--accent)]">Today&apos;s Focus</h2>
            <div className="mt-4 space-y-3">
              {[
                "10:30 AM - District Court Hearing (CR-2026-118)",
                "12:00 PM - Client consultation with K. Narang",
                "03:15 PM - Finalize affidavit for CIV-2026-041",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-[var(--border)] bg-[var(--muted-surface)] p-3 text-sm text-slate-700"
                >
                  {item}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="mt-5 w-full rounded-lg border border-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)]"
            >
              Review Active Documents
            </button>
          </div>
        </section>
      </main>

      {drawerOpen && (
        <button
          type="button"
          aria-label="Close document drawer backdrop"
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 z-10 bg-slate-900/20"
        />
      )}
    </div>
  );
}
