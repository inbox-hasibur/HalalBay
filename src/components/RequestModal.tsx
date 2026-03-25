'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RequestModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[var(--color-surface-1)] border border-[var(--color-surface-border)] rounded-3xl p-8 shadow-2xl glass-card overflow-hidden"
          >
            {submitted ? (
              <div className="text-center py-12">
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="w-20 h-20 mx-auto bg-[var(--color-brand-green)]/20 text-[var(--color-brand-green)] rounded-full flex items-center justify-center mb-6 border border-[var(--color-brand-green)]/40"
                >
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Request Received</h3>
                <p className="text-[var(--color-text-secondary)]">Our sourcing team has been notified. We will reach out within 24 hours.</p>
              </div>
            ) : (
              <>
                <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-[var(--color-surface-3)] text-[var(--color-text-secondary)] transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] mb-2">Request an Artifact</h2>
                <p className="text-[var(--color-text-secondary)] mb-8 font-medium">Looking for something specific? We will source, verify, and deliver it securely.</p>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-sm font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wide">Artifact Details</label>
                    <input required type="text" placeholder="e.g. Rolex Submariner 114060 or Air Jordan 1 Chicago" className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-surface-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-brand-gold)] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wide">Your Email</label>
                    <input required type="email" placeholder="client@example.com" className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-surface-border)] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-brand-gold)] transition-colors" />
                  </div>
                  <button type="submit" className="mt-4 w-full py-4 rounded-xl font-bold bg-[var(--color-text-primary)] text-[var(--color-text-invert)] hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[0_4px_14px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    Submit Request
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
