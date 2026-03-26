'use client';

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signInWithEmail, signUpWithEmail, signInWithGoogle } from "@/lib/auth";

export default function AuthPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'signin') {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password, name);
      }
      window.location.href = '/';
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.';
      setError(msg.replace('Firebase: ', '').replace(/\(auth\/.*\)\.?/, '').trim());
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithGoogle();
      window.location.href = '/';
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.';
      setError(msg.replace('Firebase: ', '').replace(/\(auth\/.*\)\.?/, '').trim());
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: 'var(--color-surface-3)',
    border: '1.5px solid var(--color-surface-border)',
    color: 'var(--color-text-primary)',
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-12 relative overflow-hidden bg-[var(--color-surface-1)]">
      <div className="bg-noise" />

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-[var(--color-brand-gold)] opacity-[0.04] blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black bg-[var(--color-text-primary)] text-[var(--color-text-invert)]">HB</div>
            <span className="font-bold text-2xl text-[var(--color-text-primary)]">
              Halal<span className="text-[var(--color-brand-gold)]">Bay</span>
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)] tracking-tight">
            {mode === 'signin' ? 'Welcome back' : 'Create account'}
          </h1>
          <p className="text-[var(--color-text-secondary)] mt-2 text-sm">
            {mode === 'signin'
              ? 'Sign in to your HalalBay account'
              : 'Join the verified commerce revolution'}
          </p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-3xl p-8 border border-[var(--color-surface-border)]">

          {/* Mode Toggle */}
          <div className="flex bg-[var(--color-surface-3)] rounded-2xl p-1 mb-7 border border-[var(--color-surface-border)]">
            {(['signin', 'signup'] as const).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); }}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 relative"
              >
                {mode === m && (
                  <motion.div
                    layoutId="authTab"
                    className="absolute inset-0 bg-[var(--color-brand-gold)] rounded-xl"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 transition-colors ${mode === m ? 'text-black' : 'text-[var(--color-text-muted)]'}`}>
                  {m === 'signin' ? 'Sign In' : 'Sign Up'}
                </span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <AnimatePresence mode="wait">
              {mode === 'signup' && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your full name"
                    required={mode === 'signup'}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = 'var(--color-brand-gold)'; e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.12)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--color-surface-border)'; e.target.style.boxShadow = 'none'; }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = 'var(--color-brand-gold)'; e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.12)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--color-surface-border)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = 'var(--color-brand-gold)'; e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.12)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--color-surface-border)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            <AnimatePresence mode="wait">
              {mode === 'signup' && (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-1.5">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required={mode === 'signup'}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = 'var(--color-brand-gold)'; e.target.style.boxShadow = '0 0 0 3px rgba(212,175,55,0.12)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--color-surface-border)'; e.target.style.boxShadow = 'none'; }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error */}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm font-medium px-1"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-[var(--color-text-primary)] text-[var(--color-text-invert)] hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50 disabled:pointer-events-none mt-2"
            >
              {loading ? 'Please wait…' : mode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[var(--color-surface-border)]" />
            <span className="text-xs text-[var(--color-text-muted)] font-medium">or continue with</span>
            <div className="flex-1 h-px bg-[var(--color-surface-border)]" />
          </div>

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-3 border border-[var(--color-surface-border)] bg-[var(--color-surface-2)] text-[var(--color-text-primary)] hover:border-[var(--color-brand-gold)] hover:bg-[var(--color-surface-3)] transition-all duration-200 disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <p className="text-center text-xs text-[var(--color-text-muted)] mt-6">
          By continuing, you agree to HalalBay&apos;s Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}
