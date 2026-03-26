'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useTheme } from "next-themes";
import { useCartStore } from "@/store/useCartStore";
import { useAuthUser } from "@/lib/auth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { theme, setTheme } = useTheme();
  const { toggleCart, items } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const user = useAuthUser();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => setMounted(true), []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > 150 && latest > previous);
  });

  const handleSignOut = async () => {
    await signOut(auth);
    setUserMenuOpen(false);
  };

  const initials = user?.displayName
    ? user.displayName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase() ?? "HB";

  return (
    <motion.header
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 inset-x-0 z-50 border-b border-[var(--color-surface-border)] glass-card"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4" style={{ height: '72px' }}>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110 bg-[var(--color-text-primary)] text-[var(--color-text-invert)] shadow-sm">
              HB
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-lg tracking-tight text-[var(--color-text-primary)]">
                Halal<span className="text-[var(--color-brand-gold)]">Bay</span>
              </span>
              <span className="text-[10px] text-[var(--color-text-muted)]" style={{ fontFamily: 'serif' }}>
                بَيْع · Trade with Trust
              </span>
            </div>
          </Link>

          {/* Search — center desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full group">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)] group-focus-within:text-[var(--color-brand-gold)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="search"
                placeholder="Search verified products..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
                style={{
                  background: 'var(--color-surface-3)',
                  border: '1.5px solid var(--color-surface-border)',
                  color: 'var(--color-text-primary)',
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'var(--color-brand-gold)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.12)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'var(--color-surface-border)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Trust Badge — desktop only */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold glass-card text-[var(--color-text-primary)] border border-[var(--color-surface-border)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-brand-gold)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-brand-gold)]" />
              </span>
              100% Verified
            </div>

            {/* Nav links — desktop */}
            <nav className="hidden md:flex items-center gap-5">
              {[
                { label: "Products", href: "/products" },
                { label: "Our Story", href: "#how-it-works" },
              ].map(link => (
                <Link key={link.href} href={link.href}
                  className="text-sm font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-brand-gold)] transition-colors duration-200 relative group">
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[var(--color-brand-gold)] transition-all duration-300 group-hover:w-full rounded-full" />
                </Link>
              ))}
            </nav>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-9 h-9 rounded-full flex items-center justify-center glass-card border border-[var(--color-surface-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-brand-gold)] hover:border-[var(--color-brand-gold)] transition-all duration-200"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <title>Switch to Light Mode</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <title>Switch to Dark Mode</title>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            )}

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative w-9 h-9 rounded-full flex items-center justify-center glass-card border border-[var(--color-surface-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-brand-gold)] hover:border-[var(--color-brand-gold)] transition-all duration-200"
              aria-label="View Cart"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-brand-gold)] text-[10px] font-black text-black">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Auth — desktop */}
            <div className="hidden md:block relative">
              {mounted && user ? (
                <>
                  <button
                    onClick={() => setUserMenuOpen(o => !o)}
                    className="w-9 h-9 rounded-full font-black text-sm flex items-center justify-center bg-[var(--color-brand-gold)] text-black hover:scale-105 transition-transform"
                    aria-label="User menu"
                  >
                    {initials}
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-11 w-44 glass-card rounded-xl border border-[var(--color-surface-border)] shadow-2xl p-1 z-50">
                      <p className="px-3 py-2 text-xs text-[var(--color-text-muted)] truncate border-b border-[var(--color-surface-border)] mb-1">
                        {user.email}
                      </p>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-3 py-2 text-sm rounded-lg text-[var(--color-text-primary)] hover:bg-[var(--color-surface-3)] transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href="/auth"
                  className="px-4 py-2 rounded-full text-sm font-bold border border-[var(--color-brand-gold)] text-[var(--color-brand-gold)] hover:bg-[var(--color-brand-gold)] hover:text-black transition-all duration-200"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-xl glass-card border border-[var(--color-surface-border)]"
              onClick={() => setMobileOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5 text-[var(--color-text-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-5 border-t border-[var(--color-surface-border)]"
          >
            <div className="pt-4">
              <input
                type="search"
                placeholder="Search verified products..."
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: 'var(--color-surface-3)', border: '1.5px solid var(--color-surface-border)', color: 'var(--color-text-primary)' }}
              />
            </div>
            <nav className="flex flex-col gap-1 mt-3">
              {[
                { label: "Products", href: "/products" },
                { label: "Our Story", href: "#how-it-works" },
              ].map(link => (
                <Link key={link.href} href={link.href}
                  className="px-4 py-3 rounded-xl text-sm font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-surface-3)] transition-colors"
                  onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
              {mounted && (
                user ? (
                  <button
                    onClick={() => { handleSignOut(); setMobileOpen(false); }}
                    className="px-4 py-3 rounded-xl text-sm font-semibold text-left text-[var(--color-text-primary)] hover:bg-[var(--color-surface-3)] transition-colors"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link href="/auth"
                    className="px-4 py-3 rounded-xl text-sm font-semibold text-[var(--color-brand-gold)] hover:bg-[var(--color-surface-3)] transition-colors"
                    onClick={() => setMobileOpen(false)}>
                    Sign In
                  </Link>
                )
              )}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
