'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';

export default function CartDrawer() {
  const { items, isOpen, toggleCart, updateQuantity, getCartTotal } = useCartStore();

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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
          />

          {/* Drawer Panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[var(--color-surface-1)] border-l border-[var(--color-surface-border)] shadow-2xl z-50 flex flex-col glass-card"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-surface-border)]">
              <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">Your Request Cart</h2>
              <button 
                onClick={toggleCart}
                className="p-2 rounded-full bg-[var(--color-surface-3)] hover:bg-[var(--color-surface-4)] text-[var(--color-text-secondary)] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-50">
                  <svg className="w-16 h-16 mb-4 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p className="text-[var(--color-text-secondary)] font-medium">Your cart is empty.</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 rounded-2xl border border-[var(--color-surface-border)] bg-[var(--color-surface-2)]">
                    <div className="w-20 h-20 rounded-xl bg-[var(--color-surface-3)] relative overflow-hidden flex-shrink-0 flex items-center justify-center text-4xl">
                      {item.product.category === "Smartwatches" ? "⌚" : item.product.category === "Footwear" ? "👟" : item.product.category === "Fragrances" ? "🧴" : "📱"}
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-[var(--color-text-primary)] leading-tight">{item.product.name}</h3>
                        <p className="text-sm text-[var(--color-text-muted)] font-medium mt-1">Grade: <span style={{ color: item.grade.label === 'A' ? '#D4AF37' : item.grade.label === 'B' ? '#C0C0C0' : '#CD7F32' }}>{item.grade.label} - {item.grade.name}</span></p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-[var(--color-text-primary)]">৳{item.grade.price.toLocaleString("en-BD")}</span>
                        <div className="flex items-center gap-3 bg-[var(--color-surface-3)] rounded-full px-2 py-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">-</button>
                          <span className="text-sm font-bold w-4 text-center text-[var(--color-text-primary)]">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[var(--color-surface-border)] bg-[var(--color-surface-2)]">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[var(--color-text-secondary)] font-medium">Subtotal</span>
                  <span className="text-2xl font-black text-[var(--color-text-primary)] tracking-tight">৳{getCartTotal().toLocaleString("en-BD")}</span>
                </div>
                <button className="w-full py-4 rounded-xl font-bold bg-[var(--color-text-primary)] text-[var(--color-text-invert)] hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[0_4px_14px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  Proceed to Request
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
