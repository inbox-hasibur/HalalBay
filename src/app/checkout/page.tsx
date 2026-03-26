'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';

const EMOJI_MAP: Record<string, string> = {
  Smartwatches: '⌚', Footwear: '👟', Fragrances: '🧴',
  Sunglasses: '🕶️', Bags: '👜', Smartphones: '📱',
};
const GRADE_COLORS: Record<string, string> = { A: '#D4AF37', B: '#C0C0C0', C: '#CD7F32' };

const inputClass = "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200";
const inputStyle = {
  background: 'var(--color-surface-3)',
  border: '1.5px solid var(--color-surface-border)',
  color: 'var(--color-text-primary)',
};
const focusIn = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.target.style.borderColor = 'var(--color-brand-gold)';
  e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.12)';
};
const focusOut = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.target.style.borderColor = 'var(--color-surface-border)';
  e.target.style.boxShadow = 'none';
};

export default function CheckoutPage() {
  const { items, getCartTotal, removeItem } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash'>('cod');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const total = getCartTotal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 bg-[var(--color-surface-1)]">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-md"
        >
          <div className="text-7xl mb-6">✅</div>
          <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-4">Order Placed!</h1>
          <p className="text-[var(--color-text-secondary)] mb-8 leading-relaxed">
            Your request has been received. Our team will contact you within 24 hours to confirm the order and arrange delivery.
          </p>
          <Link href="/products"
            className="px-8 py-3.5 rounded-full font-bold text-sm bg-[var(--color-text-primary)] text-[var(--color-text-invert)] hover:scale-105 transition-transform inline-block">
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 bg-[var(--color-surface-1)]">
        <p className="text-[var(--color-text-secondary)] mb-6 text-lg">Your cart is empty.</p>
        <Link href="/products" className="px-6 py-3 rounded-full font-bold text-sm bg-[var(--color-text-primary)] text-[var(--color-text-invert)]">
          Browse Vault
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-[var(--color-surface-1)] relative overflow-hidden">
      <div className="bg-noise" />
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-[var(--color-brand-gold)] opacity-[0.04] blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8">
          <Link href="/" className="hover:text-[var(--color-brand-gold)] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[var(--color-brand-gold)] transition-colors">Vault</Link>
          <span>/</span>
          <span className="text-[var(--color-text-primary)] font-semibold">Checkout</span>
        </nav>

        <h1 className="text-4xl sm:text-5xl font-bold text-[var(--color-text-primary)] tracking-tight mb-10 uppercase">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left: Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 flex flex-col gap-6">

            {/* Contact */}
            <div className="glass-card rounded-3xl p-6 border border-[var(--color-surface-border)]">
              <h2 className="font-bold text-lg text-[var(--color-text-primary)] mb-5 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[var(--color-brand-gold)] text-black text-xs font-black flex items-center justify-center">1</span>
                Contact Info
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5">Full Name</label>
                  <input type="text" required placeholder="Your name" className={inputClass} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5">Phone Number</label>
                  <input type="tel" required placeholder="01XXXXXXXXX" className={inputClass} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5">Email (optional)</label>
                  <input type="email" placeholder="you@example.com" className={inputClass} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="glass-card rounded-3xl p-6 border border-[var(--color-surface-border)]">
              <h2 className="font-bold text-lg text-[var(--color-text-primary)] mb-5 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[var(--color-brand-gold)] text-black text-xs font-black flex items-center justify-center">2</span>
                Delivery Address
              </h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5">Street Address</label>
                  <input type="text" required placeholder="House, Road, Area" className={inputClass} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5">City</label>
                    <input type="text" required placeholder="Dhaka" className={inputClass} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5">District</label>
                    <input type="text" required placeholder="Dhaka" className={inputClass} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5">Delivery Notes (optional)</label>
                  <input type="text" placeholder="Any special instructions..." className={inputClass} style={inputStyle} onFocus={focusIn} onBlur={focusOut} />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="glass-card rounded-3xl p-6 border border-[var(--color-surface-border)]">
              <h2 className="font-bold text-lg text-[var(--color-text-primary)] mb-5 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[var(--color-brand-gold)] text-black text-xs font-black flex items-center justify-center">3</span>
                Payment Method
              </h2>
              <div className="flex flex-col gap-3">
                {[
                  { value: 'cod', label: '💵 Cash on Delivery', sub: 'Pay when your order arrives' },
                  { value: 'bkash', label: '📱 bKash / Nagad', sub: 'Mobile financial service' },
                ].map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setPaymentMethod(opt.value as 'cod' | 'bkash')}
                    className="w-full text-left p-4 rounded-2xl border-2 transition-all duration-200"
                    style={{
                      borderColor: paymentMethod === opt.value ? 'var(--color-brand-gold)' : 'var(--color-surface-border)',
                      background: paymentMethod === opt.value ? 'rgba(212,175,55,0.06)' : 'var(--color-surface-2)',
                    }}
                  >
                    <div className="font-bold text-sm text-[var(--color-text-primary)]">{opt.label}</div>
                    <div className="text-xs text-[var(--color-text-muted)] mt-0.5">{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl font-bold text-base bg-[var(--color-text-primary)] text-[var(--color-text-invert)] hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-60 shadow-lg"
            >
              {loading ? 'Placing Order…' : `Place Order · ৳${total.toLocaleString('en-BD')}`}
            </button>
          </form>

          {/* Right: Order Summary */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-3xl p-6 border border-[var(--color-surface-border)] sticky top-28">
              <h2 className="font-bold text-lg text-[var(--color-text-primary)] mb-5">Order Summary</h2>

              <div className="flex flex-col gap-3 mb-5">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3 p-3 rounded-2xl border border-[var(--color-surface-border)] bg-[var(--color-surface-2)]">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-surface-3)] flex items-center justify-center text-2xl flex-shrink-0">
                      {EMOJI_MAP[item.product.category] ?? '🛍️'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black" style={{ color: GRADE_COLORS[item.grade.label] ?? '#999' }}>Grade {item.grade.label}</p>
                      <p className="text-sm font-bold text-[var(--color-text-primary)] leading-snug line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-black text-[var(--color-text-primary)] flex-shrink-0">
                      ৳{(item.grade.price * item.quantity).toLocaleString('en-BD')}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-[var(--color-surface-border)] pt-4 flex flex-col gap-2">
                <div className="flex justify-between text-sm text-[var(--color-text-secondary)]">
                  <span>Subtotal</span>
                  <span>৳{total.toLocaleString('en-BD')}</span>
                </div>
                <div className="flex justify-between text-sm text-[var(--color-text-secondary)]">
                  <span>Delivery</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="flex justify-between font-black text-xl text-[var(--color-text-primary)] mt-2 pt-2 border-t border-[var(--color-surface-border)]">
                  <span>Total</span>
                  <span>৳{total.toLocaleString('en-BD')}</span>
                </div>
              </div>

              <div className="mt-5 p-3 rounded-xl bg-[var(--color-surface-3)] border border-[var(--color-surface-border)] flex items-start gap-2">
                <svg className="w-4 h-4 text-[var(--color-brand-gold)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  All items are HalalBay verified. 100% grade guarantee — mismatched grade means full refund + compensation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
