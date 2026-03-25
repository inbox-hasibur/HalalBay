'use client';

import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-surface-2)', borderTop: '1px solid var(--color-surface-border)' }}>
      {/* Mission strip */}
      <div className="py-10 px-4 border-b border-[var(--color-surface-border)]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
            We don&apos;t just sell products.
          </p>
          <p className="text-3xl font-bold gradient-text-gold">We sell Trust.</p>
          <p className="mt-4 max-w-xl mx-auto text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            HalalBay was born out of frustration with fake products in Bangladesh&apos;s e-commerce space.
            Every item we sell is sourced, verified, and graded by us — no third-party sellers, ever.
          </p>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                HB
              </div>
              <span className="font-bold text-lg">
                Halal<span style={{ color: 'var(--color-brand-gold)' }}>Bay</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              From the Arabic word <span style={{ color: 'var(--color-brand-gold)', fontFamily: 'serif' }}>بَيْع</span> (Bay) — meaning trade.
              Our mission: transparent commerce for Bangladesh.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Shop</h3>
            <ul className="space-y-2.5">
              {["All Products", "Smartwatches", "Footwear", "Fragrances", "Bags", "Sunglasses"].map(item => (
                <li key={item}>
                  <Link href="/products" className="text-sm transition-colors"
                    style={{ color: 'var(--color-text-secondary)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-brand-gold)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Our Promise</h3>
            <ul className="space-y-2.5">
              {["How Grading Works", "Verification Process", "Return Policy", "Warranty Info", "FAQs"].map(item => (
                <li key={item}>
                  <Link href="#" className="text-sm transition-colors"
                    style={{ color: 'var(--color-text-secondary)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-brand-gold)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust pillars */}
          <div>
            <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Why HalalBay</h3>
            <ul className="space-y-3">
              {[
                { icon: "🛡️", text: "Zero fake listings" },
                { icon: "✅", text: "In-house verification" },
                { icon: "📦", text: "Grade transparency" },
                { icon: "🔄", text: "Easy returns" },
              ].map(item => (
                <li key={item.text} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--color-surface-border)' }}>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            © 2026 HalalBay. All rights reserved. Built for honest commerce in Bangladesh.
          </p>
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--color-text-primary)' }}>
            <span className="opacity-80">✦</span>
            <span>Halal • Honest • Transparent</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
