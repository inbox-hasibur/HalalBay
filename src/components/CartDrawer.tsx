'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';

const EMOJI_MAP: Record<string, string> = {
  Smartwatches: '⌚',
  Footwear: '👟',
  Fragrances: '🧴',
  Sunglasses: '🕶️',
  Bags: '👜',
  Smartphones: '📱',
};

const GRADE_COLORS: Record<string, string> = {
  A: '#D4AF37',
  B: '#C0C0C0',
  C: '#CD7F32',
};

export default function CartDrawer() {
  const { items, isOpen, toggleCart, updateQuantity, removeItem, getCartTotal } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm glass-card border-l border-[var(--color-surface-border)] shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-surface-border)]">
              <div>
                <h2 className="text-xl font-bold text-[var(--color-text-primary)] tracking-tight">Cart</h2>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  {items.length === 0 ? 'Empty' : `${items.reduce((a, i) => a + i.quantity, 0)} item(s)`}
                </p>
              </div>
              <button
                onClick={toggleCart}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-3)] transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-12 opacity-60">
                  <svg className="w-14 h-14 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <div>
                    <p className="font-bold text-[var(--color-text-secondary)]">Your cart is empty</p>
                    <p className="text-sm text-[var(--color-text-muted)] mt-1">Add some verified products</p>
                  </div>
                  <button onClick={toggleCart}>
                    <Link href="/products" className="text-sm font-bold text-[var(--color-brand-gold)] hover:underline" onClick={toggleCart}>
                      Browse Vault →
                    </Link>
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30, height: 0 }}
                      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                      className="flex gap-3 p-4 rounded-2xl border border-[var(--color-surface-border)] bg-[var(--color-surface-2)]"
                    >
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-[var(--color-surface-3)] flex items-center justify-center text-3xl flex-shrink-0 border border-[var(--color-surface-border)]">
                        {EMOJI_MAP[item.product.category] ?? '🛍️'}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: GRADE_COLORS[item.grade.label] ?? '#999' }}>
                            Grade {item.grade.label} · {item.grade.name}
                          </p>
                          <h3 className="text-sm font-bold text-[var(--color-text-primary)] leading-snug line-clamp-1">
                            {item.product.name}
                          </h3>
                          <p className="text-sm font-black text-[var(--color-text-primary)] mt-1">
                            ৳{(item.grade.price * item.quantity).toLocaleString('en-BD')}
                          </p>
                        </div>

                        {/* Qty + Remove */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1.5 bg-[var(--color-surface-3)] rounded-full px-2 py-1 border border-[var(--color-surface-border)]">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] font-bold text-base"
                            >−</button>
                            <span className="text-sm font-black w-4 text-center text-[var(--color-text-primary)]">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] font-bold text-base"
                            >+</button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-xs text-[var(--color-text-muted)] hover:text-red-500 transition-colors flex items-center gap-1"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-5 py-5 border-t border-[var(--color-surface-border)] bg-[var(--color-surface-2)] flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--color-text-secondary)] font-medium">Subtotal</span>
                  <span className="text-2xl font-black text-[var(--color-text-primary)] tracking-tighter">
                    ৳{getCartTotal().toLocaleString('en-BD')}
                  </span>
                </div>
                <Link href="/checkout" onClick={toggleCart}>
                  <button className="w-full py-3.5 rounded-xl font-bold text-sm bg-[var(--color-text-primary)] text-[var(--color-text-invert)] hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg">
                    Proceed to Checkout →
                  </button>
                </Link>
                <button
                  onClick={toggleCart}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
