"use client";

import { useState } from "react";
import Link from "next/link";

interface Entry {
  label: string;
  amount: string;
}

interface Result {
  income: number;
  expense: number;
  netIncome: number;
  quarterlyTax: number;
  ytdNet: number;
}

const QUARTER_LABELS = ["Q1", "Q2", "Q3", "Q4"] as const;
const CURRENT_QUARTER = 1; // Q1 shown as complete, rest projected

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export default function TryPage() {
  const [income, setIncome] = useState<Entry>({ label: "Uber / rideshare", amount: "" });
  const [expense, setExpense] = useState<Entry>({ label: "Gas (deductible)", amount: "" });
  const [result, setResult] = useState<Result | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const inc = parseFloat(income.amount.replace(/,/g, "")) || 0;
    const exp = parseFloat(expense.amount.replace(/,/g, "")) || 0;
    const netIncome = Math.max(0, inc - exp);
    const quarterlyTax = netIncome * 0.30;
    const ytdNet = netIncome; // one quarter entered
    setResult({ income: inc, expense: exp, netIncome, quarterlyTax, ytdNet });
  }

  function handleReset() {
    setResult(null);
    setIncome({ label: "Uber / rideshare", amount: "" });
    setExpense({ label: "Gas (deductible)", amount: "" });
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500" />
          GigLedger
        </Link>
        <Link
          href="/#waitlist"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Get early access
        </Link>
      </nav>

      <main className="mx-auto max-w-2xl px-6 py-16">
        <div className="text-center mb-12">
          <p className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-green-700">
            Tax estimator
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
            See what you owe.
          </h1>
          <p className="mt-3 text-neutral-600">
            Enter one income source and one expense. We&apos;ll show your quarterly
            tax estimate using the 30% rule.
          </p>
        </div>

        {!result ? (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm space-y-6"
          >
            {/* Income row */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-green-600">
                Income
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={income.label}
                  onChange={(e) => setIncome((p) => ({ ...p, label: e.target.value }))}
                  placeholder="Source (e.g. Uber)"
                  className="flex-1 rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">$</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={income.amount}
                    onChange={(e) => setIncome((p) => ({ ...p, amount: e.target.value }))}
                    placeholder="0.00"
                    required
                    className="w-36 rounded-xl border border-neutral-300 pl-7 pr-4 py-3 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>
              </div>
            </div>

            {/* Expense row */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-red-500">
                Expense
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={expense.label}
                  onChange={(e) => setExpense((p) => ({ ...p, label: e.target.value }))}
                  placeholder="Expense (e.g. Gas)"
                  className="flex-1 rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                />
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">$</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={expense.amount}
                    onChange={(e) => setExpense((p) => ({ ...p, amount: e.target.value }))}
                    placeholder="0.00"
                    className="w-36 rounded-xl border border-neutral-300 pl-7 pr-4 py-3 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-neutral-900 py-3.5 font-medium text-white transition hover:bg-neutral-700"
            >
              Calculate my estimate →
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            {/* Quarterly tax card */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wider text-green-600">
                Q{CURRENT_QUARTER} 2026 estimate
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <div className="text-4xl font-bold">{fmt(result.quarterlyTax)}</div>
                <div className="text-sm text-neutral-500">est. quarterly tax owed</div>
              </div>
              <p className="mt-2 text-xs text-neutral-400">Based on 30% of net taxable income</p>

              <div className="mt-6 space-y-2 text-sm">
                <div className="flex items-center justify-between rounded-lg bg-green-50 p-3">
                  <span>
                    {income.label || "Income"}
                  </span>
                  <span className="font-medium text-green-700">+{fmt(result.income)}</span>
                </div>
                {result.expense > 0 && (
                  <div className="flex items-center justify-between rounded-lg bg-red-50 p-3">
                    <span>{expense.label || "Expense"}</span>
                    <span className="font-medium text-red-700">−{fmt(result.expense)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between rounded-lg bg-neutral-100 p-3 border-t border-neutral-200">
                  <span className="font-semibold">Net taxable income</span>
                  <span className="font-bold">{fmt(result.netIncome)}</span>
                </div>
              </div>
            </div>

            {/* YTD net table */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-4">
                YTD overview (2026)
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-neutral-400 border-b border-neutral-100">
                    <th className="pb-2 font-medium">Quarter</th>
                    <th className="pb-2 font-medium text-right">Net income</th>
                    <th className="pb-2 font-medium text-right">Est. tax (30%)</th>
                    <th className="pb-2 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {QUARTER_LABELS.map((q, i) => {
                    const isCurrentQ = i === CURRENT_QUARTER - 1;
                    const isFuture = i > CURRENT_QUARTER - 1;
                    return (
                      <tr key={q} className={isFuture ? "opacity-40" : ""}>
                        <td className="py-3 font-medium">{q} 2026</td>
                        <td className="py-3 text-right">
                          {isFuture ? "—" : fmt(result.ytdNet)}
                        </td>
                        <td className="py-3 text-right">
                          {isFuture ? "—" : fmt(result.quarterlyTax)}
                        </td>
                        <td className="py-3 text-right">
                          {isFuture ? (
                            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-400">
                              upcoming
                            </span>
                          ) : isCurrentQ ? (
                            <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700">
                              due soon
                            </span>
                          ) : (
                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                              paid
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t border-neutral-200 font-semibold">
                    <td className="pt-3">YTD total</td>
                    <td className="pt-3 text-right">{fmt(result.ytdNet)}</td>
                    <td className="pt-3 text-right">{fmt(result.quarterlyTax)}</td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 rounded-full border border-neutral-300 py-3.5 text-sm font-medium transition hover:bg-neutral-100"
              >
                Try again
              </button>
              <Link
                href="/#waitlist"
                className="flex-1 rounded-full bg-green-600 py-3.5 text-center text-sm font-medium text-white transition hover:bg-green-700"
              >
                Get early access
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
