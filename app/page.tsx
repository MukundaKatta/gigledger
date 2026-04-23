"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    setSubmitted(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
    } catch {
      // swallow — user already sees success state
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500" />
          GigLedger
        </a>
        <div className="flex items-center gap-4 text-sm">
          <a href="#demo" className="hidden sm:inline hover:opacity-70">
            See a demo
          </a>
          <Link
            href="/try"
            className="hidden sm:inline hover:opacity-70"
          >
            Try it
          </Link>
          <a
            href="#waitlist"
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Get early access
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-gradient-to-b from-green-100 via-green-50 to-transparent opacity-60" />
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-20 text-center sm:pt-28">
          <p className="mb-5 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-green-700">
            Personal finance
          </p>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-7xl">
            Taxes for the 1099 life.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
            Track income, expenses, and estimated taxes for rideshare, freelance,
            and every side hustle in between.
          </p>

          {!submitted ? (
            <form
              id="waitlist"
              onSubmit={handleSubmit}
              className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
                className="w-full rounded-full border border-neutral-300 bg-white px-5 py-3.5 text-base placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10 sm:w-80"
              />
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700 disabled:opacity-60"
              >
                Join the waitlist
              </button>
            </form>
          ) : (
            <p
              id="waitlist"
              className="mt-12 text-sm font-medium text-green-700"
            >
              Thanks. We will ping you the day we launch.
            </p>
          )}

          <p className="mt-6 text-xs text-neutral-400">
            Early access list is open. First 100 get in free forever.
          </p>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="border-y border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-600">
              Live preview
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              See it in action
            </h2>
          </div>
          <div className="mt-12">
            <div className="mx-auto max-w-2xl rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wider text-green-600">
                Q1 2026 summary
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <div className="text-4xl font-bold">$4,281.50</div>
                <div className="text-sm text-neutral-500">est. quarterly tax owed</div>
              </div>
              <div className="mt-6 space-y-2 text-sm">
                <div className="flex items-center justify-between rounded-lg bg-green-50 p-3">
                  <span>🚗 Uber / rideshare</span>
                  <span className="font-medium text-green-700">+$12,420.00</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-green-50 p-3">
                  <span>💻 Upwork contracts</span>
                  <span className="font-medium text-green-700">+$5,860.00</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-red-50 p-3">
                  <span>⛽ Gas (deductible)</span>
                  <span className="font-medium text-red-700">−$1,842.00</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-red-50 p-3">
                  <span>🍽️ Business meals (50%)</span>
                  <span className="font-medium text-red-700">−$314.50</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-neutral-100 p-3 border-t border-neutral-200">
                  <span className="font-semibold">Net taxable income</span>
                  <span className="font-bold">$16,123.50</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What you get
            </h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            <div>
              <div className="text-3xl">💰</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                Auto-categorized
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Connects to your bank and labels every expense in the correct IRS
                bucket.
              </p>
            </div>
            <div>
              <div className="text-3xl">📅</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                Quarterly reminders
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Know what you owe the IRS before they come knocking at your door.
              </p>
            </div>
            <div>
              <div className="text-3xl">🧾</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                Filed in one click
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Export to TurboTax or let us file for you. No spreadsheets
                required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-green-600">
              How it works
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Three steps. No learning curve.
            </h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            <div className="relative">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                1
              </div>
              <h3 className="text-lg font-semibold tracking-tight">
                Connect your bank
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Plaid does the heavy lifting. Read-only, bank-grade security.
              </p>
            </div>
            <div className="relative">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                2
              </div>
              <h3 className="text-lg font-semibold tracking-tight">
                We categorize everything
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Every ride, every delivery, every deductible meal. All sorted
                automatically.
              </p>
            </div>
            <div className="relative">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                3
              </div>
              <h3 className="text-lg font-semibold tracking-tight">
                File quarterly, stress-free
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Export to TurboTax or let us file. No more April panic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-4xl px-6 py-28 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Be the first in line.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-neutral-600">
          Early access starts soon. Get on the list and we will reach out the
          moment we open the doors.
        </p>
        <a
          href="#waitlist"
          className="mt-8 inline-block rounded-full bg-green-600 px-7 py-3.5 font-medium text-white transition hover:bg-green-700"
        >
          Reserve my spot
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-neutral-500">
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
            GigLedger
          </p>
          <p>© 2026</p>
        </div>
      </footer>
    </>
  );
}
