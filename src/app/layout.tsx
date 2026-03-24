import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HalalBay — We Don't Just Sell Products. We Sell Trust.",
  description:
    "HalalBay is Bangladesh's first transparent e-commerce platform. Every product is sourced, graded, and verified by us. No scams. No fakes. Just trust.",
  keywords: ["halal", "e-commerce", "transparent", "trusted", "bangladesh", "verified products"],
  openGraph: {
    title: "HalalBay — Transparent E-commerce",
    description: "Every product graded. Every claim verified. Shop with trust.",
    siteName: "HalalBay",
  },
};

import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-surface-1 text-text-primary antialiased selection:bg-[var(--color-brand-green)] selection:text-white">
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
