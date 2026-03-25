'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useTheme } from "next-themes";
import { useCartStore } from "@/store/useCartStore";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount] = useState(2);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const { theme, setTheme } = useTheme();
  const { toggleCart, items } = useCartStore();
  const [mounted, setMounted] = useState(false);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => setMounted(true), []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > 150 && latest > previous) {
      setHidden(true); // scrolling down
    } else {
      setHidden(false); // scrolling up
    }
  });

  return (
    <motion.header 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 inset-x-0 z-50 border-b border-[var(--color-surface-border)] bg-[var(--color-surface-card)]" 
      style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110 bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              HB
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-xl tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                Halal<span style={{ color: 'var(--color-brand-gold)' }}>Bay</span>
              </span>
              <span className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)', fontFamily: 'serif' }}>بَيْع • Trade with Trust</span>
            </div>
          </Link>

          {/* Search — center */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full group">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors group-focus-within:text-[var(--color-brand-green)]" style={{ color: 'var(--color-text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="search"
                placeholder="Search verified products..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm outline-none transition-all duration-300"
                style={{
                  background: 'var(--color-surface-3)',
                  border: '1px solid var(--color-surface-border)',
                  color: 'var(--color-text-primary)',
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'var(--color-brand-green)';
                  e.target.style.boxShadow = '0 0 20px rgba(10,110,78,0.15)';
                  e.target.style.background = 'var(--color-surface-2)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'var(--color-surface-border)';
                  e.target.style.boxShadow = 'none';
                  e.target.style.background = 'var(--color-surface-3)';
                }}
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Trust Badge */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold cursor-default"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--color-text-primary)' }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              100% Verified
            </motion.div>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-6">
              {[
                { label: "Products", href: "/products" },
                { label: "Our Story", href: "#how-it-works" },
              ].map(link => (
                <Link key={link.href} href={link.href}
                  className="text-sm font-semibold transition-all duration-300 hover:text-[var(--color-brand-gold)] relative group"
                  style={{ color: 'var(--color-text-primary)' }}>
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-brand-gold)] transition-all duration-300 group-hover:w-full rounded-full" />
                </Link>
              ))}
            </nav>

            {/* Cart */}
            <motion.button 
              whileHover={{ scale: 1.05, background: 'var(--color-surface-4)' }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2.5 rounded-xl transition-colors"
              style={{ background: 'var(--color-surface-3)' }}
              aria-label="Shopping cart">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--color-text-primary)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center shadow-[0_0_10px_rgba(201,168,76,0.5)]"
                  style={{ background: 'var(--color-brand-gold)', color: '#000' }}>
                  {cartCount}
                </span>
              )}
            </motion.button>

            {/* Desktop Theme Toggle and Sign In */}
            <div className="hidden md:flex items-center gap-4">
              {mounted && (
                <button 
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--color-surface-border)] bg-[var(--color-surface-card)] hover:bg-[var(--color-surface-2)] transition-colors text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] relative glass-card"
                  aria-label="Toggle Theme"
                >
                  {theme === 'dark' ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <title>Switch to Light Mode</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <title>Switch to Dark Mode</title>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
              )}

              <button 
                onClick={toggleCart}
                className="relative p-2 rounded-full glass-card border border-[var(--color-surface-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-brand-gold)] transition-colors"
                aria-label="View Cart"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                {mounted && totalItems > 0 && (
                  <span className=" абсолюt absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-brand-gold)] text-[10px] font-bold text-black border-[1.5px] border-[var(--color-surface-2)]">
                    {totalItems}
                  </span>
                )}
              </button>

              <button className="px-5 py-2.5 rounded-full text-sm font-bold border border-[var(--color-surface-border)] bg-[var(--color-surface-2)] text-[var(--color-text-primary)] hover:border-[var(--color-brand-gold)] hover:text-[var(--color-brand-gold)] transition-all duration-300">
                Sign In
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              {mounted && (
                <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="w-10 h-10 rounded-full flex items-center justify-center glass-card text-[var(--color-text-secondary)]">
                  {theme === 'dark' ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
              )}
              <button className="p-2.5 rounded-xl" style={{ background: 'var(--color-surface-3)' }}
                onClick={() => setMobileOpen(o => !o)} aria-label="Toggle menu">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: 'var(--color-text-primary)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-5 border-t" style={{ borderColor: 'var(--color-surface-border)' }}>
            <div className="pt-4">
              <input
                type="search"
                placeholder="Search verified products..."
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: 'var(--color-surface-3)', border: '1px solid var(--color-surface-border)', color: 'var(--color-text-primary)' }}
              />
            </div>
            <nav className="flex flex-col gap-2 mt-4">
              {[
                { label: "Products", href: "/products" },
                { label: "Our Story", href: "#how-it-works" },
              ].map(link => (
                <Link key={link.href} href={link.href}
                  className="px-4 py-3 rounded-xl text-sm font-semibold transition-colors bg-[var(--color-surface-2)] active:bg-[var(--color-surface-3)]"
                  style={{ color: 'var(--color-text-primary)' }}
                  onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
