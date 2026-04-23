import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GigLedger — Taxes for the 1099 life.",
  description:
    "Track income, expenses, and estimated taxes for rideshare, freelance, and every side hustle in between.",
  openGraph: {
    title: "GigLedger — Taxes for the 1099 life.",
    description:
      "Track income, expenses, and estimated taxes for rideshare, freelance, and every side hustle in between.",
    images: [
      {
        url: "https://waitlist-api-sigma.vercel.app/api/og?title=GigLedger&accent=green&category=Personal%20finance",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://waitlist-api-sigma.vercel.app/api/og?title=GigLedger&accent=green&category=Personal%20finance",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white text-neutral-900 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
