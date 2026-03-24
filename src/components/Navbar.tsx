'use client'

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount] = useState(2);

  return (
    <header className="sticky top-0 z-50 border-b" style={{ background: 'rgba(11,15,14,0.92)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderColor: 'var(--color-surface-border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base transition-transform group-hover:scale-105"
              style={{ background: 'linear-gradient(135deg, var(--color-brand-green), var(--color-brand-green-light))', color: '#fff', boxShadow: '0 0 20px rgba(10,110,78,0.35)' }}>
              HB
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-lg tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                Halal<span style={{ color: 'var(--color-brand-gold)' }}>Bay</span>
              </span>
              <span className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'serif' }}>بَيْع • Trade with Trust</span>
            </div>
          </Link>

          {/* Search — center */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="search"
                placeholder="Search verified products..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: 'var(--color-surface-3)',
                  border: '1px solid var(--color-surface-border)',
                  color: 'var(--color-text-primary)',
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'var(--color-brand-green)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(10,110,78,0.15)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'var(--color-surface-border)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Trust Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ background: 'rgba(10,110,78,0.15)', border: '1px solid rgba(10,110,78,0.3)', color: 'var(--color-brand-green-light)' }}>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 1l2.39 6.26L19 8.27l-5 4.86 1.18 6.87L10 16.77l-5.18 3.23L6 13.13 1 8.27l6.61-1.01L10 1z" clipRule="evenodd" />
              </svg>
              100% Verified
            </div>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-5">
              {[
                { label: "Products", href: "/products" },
                { label: "How It Works", href: "#how-it-works" },
              ].map(link => (
                <Link key={link.href} href={link.href}
                  className="text-sm font-medium transition-colors"
                  style={{ color: 'var(--color-text-secondary)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-brand-gold)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}>
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Cart */}
            <button className="relative p-2 rounded-xl transition-colors"
              style={{ background: 'var(--color-surface-3)' }}
              aria-label="Shopping cart">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--color-text-primary)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs font-bold flex items-center justify-center"
                  style={{ background: 'var(--color-brand-gold)', color: '#000' }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button className="md:hidden p-2 rounded-xl" style={{ background: 'var(--color-surface-3)' }}
              onClick={() => setMobileOpen(o => !o)} aria-label="Toggle menu">
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--color-text-primary)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--color-text-primary)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t" style={{ borderColor: 'var(--color-surface-border)' }}>
            <div className="pt-3">
              <input
                type="search"
                placeholder="Search verified products..."
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: 'var(--color-surface-3)', border: '1px solid var(--color-surface-border)', color: 'var(--color-text-primary)' }}
              />
            </div>
            <nav className="flex flex-col gap-1 mt-3">
              {[
                { label: "Products", href: "/products" },
                { label: "How It Works", href: "#how-it-works" },
              ].map(link => (
                <Link key={link.href} href={link.href}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                  style={{ color: 'var(--color-text-secondary)' }}
                  onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
