'use client';

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/mockData";
import { Canvas } from "@react-three/fiber";
import TrustToken from "@/components/TrustToken";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const [gradeFilter, setGradeFilter] = useState<'all'|'A'|'B'|'C'>('all');
  const [sortBy, setSortBy] = useState<'rating'|'price'>('rating');
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  const displayedProducts = featuredProducts
    .filter(p => gradeFilter === 'all' || p.grades.some(g => g.label === gradeFilter))
    .sort((a, b) => {
      if (sortBy === 'price') {
        const aMin = Math.min(...a.grades.map(g => g.price));
        const bMin = Math.min(...b.grades.map(g => g.price));
        return aMin - bMin;
      }
      return b.rating - a.rating;
    });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: parallaxProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const parallaxY = useTransform(parallaxProgress, [0, 1], ["-20%", "20%"]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-[var(--color-surface-1)] selection:bg-[var(--color-brand-gold)] selection:text-black relative">
      <div className="bg-noise" />
      
      {/* Ambient Gradient Orbs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-[20%] -left-[15%] w-[60vw] h-[60vw] rounded-full opacity-[0.06] dark:opacity-[0.04] blur-[120px]"
          style={{ background: 'radial-gradient(circle, var(--color-brand-gold) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-[20%] -right-[15%] w-[70vw] h-[70vw] rounded-full opacity-[0.05] dark:opacity-[0.04] blur-[120px]"
          style={{ background: 'radial-gradient(circle, #f97316 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-[40%] left-[40%] w-[40vw] h-[40vw] rounded-full opacity-[0.03] dark:opacity-[0.02] blur-[100px]"
          style={{ background: 'radial-gradient(circle, #0d9488 0%, transparent 70%)' }}
        />
      </div>

      {/* Hero Section with 3D Canvas */}
      <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Subtle glowing orb for depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-[var(--color-brand-gold)] opacity-[0.08] blur-[120px] rounded-full pointer-events-none" />

        {/* 3D Background */}
        <div className="absolute inset-x-0 h-[100%] top-0 z-0 pointer-events-none opacity-90 transition-all duration-500">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <TrustToken />
          </Canvas>
        </div>

        {/* Floating Abstract Shapes */}
        <motion.div 
          className="absolute top-[20%] right-[10%] w-24 h-24 border border-[var(--color-brand-gold)] rounded-full opacity-10 pointer-events-none animate-float"
          style={{ animationDelay: '0.5s' }}
        />
        <motion.div 
          className="absolute bottom-[30%] left-[10%] w-32 h-32 border border-white rounded-lg rotate-45 opacity-[0.03] pointer-events-none animate-float"
          style={{ animationDelay: '2s' }}
        />

        {/* Hero Content */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center mt-auto mb-20 px-4 sm:px-8"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[var(--color-surface-border)] glass-card mb-8 overflow-hidden relative text-xs sm:text-sm"
          >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] w-[200%] animate-sweep dark:opacity-100 opacity-20" />
            <span className="w-2 h-2 rounded-full bg-[var(--color-brand-gold)] animate-pulse-glow" />
            <span className="text-[var(--color-text-primary)] font-medium tracking-widest text-xs uppercase opacity-90 relative z-10">The New Standard of Trust</span>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 80, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative text-[2.4rem] sm:text-[3.5rem] md:text-[6rem] lg:text-[8rem] font-bold tracking-[-0.04em] text-[var(--color-text-primary)] mb-4 sm:mb-6 leading-[1.05] uppercase opacity-90 mix-blend-multiply dark:mix-blend-normal"
          >
            <span className="absolute -inset-4 bg-[var(--color-brand-gold)] opacity-[0.03] blur-3xl rounded-full" />
            We <br className="md:hidden" /> verify. <br />
            <span className="opacity-70 text-[3rem] md:text-[6rem] lg:text-[7rem] block mt-2 tracking-[-0.02em] font-medium normal-case bg-clip-text text-transparent bg-gradient-to-r dark:from-white dark:to-white/40 from-black/80 to-black/30">We don&apos;t just sell.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-2xl text-[var(--color-text-secondary)] max-w-3xl mb-12 font-light leading-relaxed"
          >
            Every product exclusively sourced, graded, and verified by our experts. 
            <span className="text-[var(--color-text-primary)] font-normal dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"> Zero third-party sellers. Zero fakes.</span>
          </motion.p>

          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col sm:flex-row items-center sm:justify-center gap-4"
          >
            <Link href="/products"
              className="w-full sm:w-auto text-center relative px-8 sm:px-12 py-4 rounded-full text-base sm:text-lg font-medium overflow-hidden group bg-[var(--color-text-primary)] text-[var(--color-surface-1)] hover:scale-105 transition-transform duration-500 ease-[0.16,1,0.3,1]">
              <span className="relative z-10 transition-colors duration-500 group-hover:text-[var(--color-text-primary)]">Enter The Vault</span>
              <div className="absolute inset-0 bg-[var(--color-surface-2)] transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-500 ease-[0.16,1,0.3,1]" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <div className="w-px h-24 bg-gradient-to-b from-[var(--color-text-primary)] to-transparent opacity-50" />
        </motion.div>
      </section>

      {/* Trust Pillars - Bento Grid */}
      <section className="py-40 px-4 relative">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,var(--color-surface-2),transparent)] opacity-10 -z-10" />
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 sm:mb-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-[var(--color-text-primary)] uppercase leading-none">
              Absolute <br />
              <span className="text-[var(--color-text-secondary)]">Truth.</span>
            </h2>
            <div className="text-right max-w-full sm:max-w-sm text-sm sm:text-base text-[var(--color-text-secondary)]">
              No noise. No scams. Just pure transparency built on a foundation of rigorous verification.
            </div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Large Pillar */}
            <motion.div variants={fadeInUp} className="md:col-span-8 group relative p-[1px] rounded-[2rem] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative h-[400px] glass-card p-12 rounded-[2rem] flex flex-col justify-between overflow-hidden">
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-500">
                  🛡️
                </div>
                <div>
                  <h3 className="text-3xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4 tracking-tight">In-House Vault</h3>
                  <p className="text-xl text-[var(--color-text-secondary)] max-w-md">No third-party sellers. Every item is verified, authenticated, and stocked in our own secure vault before reaching you.</p>
                </div>
                {/* Decorative element */}
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[var(--color-brand-gold)] opacity-[0.03] rounded-full blur-3xl group-hover:opacity-[0.08] transition-opacity duration-700" />
              </div>
            </motion.div>

            {/* Side Pillars */}
            <motion.div variants={fadeInUp} className="md:col-span-4 flex flex-col gap-6">
              <div className="h-[calc(50%-12px)] group relative p-[1px] rounded-[2rem] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative h-full glass-card p-8 rounded-[2rem] flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Clear Quality & Price Tiers</h3>
                  <p className="text-[var(--color-text-secondary)]">We tell you the absolute truth with our transparent grading.</p>
                </div>
              </div>
              <div className="h-[calc(50%-12px)] group relative p-[1px] rounded-[2rem] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative h-full glass-card p-8 rounded-[2rem] flex flex-col justify-end group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors duration-500">
                  <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Zero Noise</h3>
                  <p className="text-[var(--color-text-secondary)]">No duplicate listings. One product page, select the grade you prefer.</p>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Parallax Image / Video Break */}
      <section ref={parallaxRef} className="h-[60vh] sm:h-[75vh] md:h-[80vh] relative overflow-hidden flex items-center justify-center bg-[var(--color-surface-2)]/30 backdrop-blur-[40px] border-y border-[var(--color-surface-border)]">
        <motion.div 
          style={{ y: parallaxY }}
          className="absolute inset-0 w-full h-[140%] -top-[20%]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
          <div className="absolute inset-0 opacity-[0.14] dark:opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="relative z-10 text-[3rem] sm:text-[5rem] md:text-[8rem] font-bold text-[var(--color-text-primary)] text-center tracking-tighter opacity-30 leading-none">
          PURITY IN <br /> COMMERCE
        </motion.h2>
      </section>

      {/* How Grading Works - Aesthetic Cards */}
      <section id="how-it-works" className="py-40 overflow-hidden relative border-y border-[var(--color-surface-border)] bg-[var(--color-surface-1)]/30 backdrop-blur-3xl">
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-brand-gold)] opacity-[0.02] blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="mb-24">
            <h2 className="text-5xl md:text-8xl font-bold text-[var(--color-text-primary)] mb-6 tracking-tight uppercase">
              The Matrix.
            </h2>
            <p className="text-2xl text-[var(--color-text-secondary)] max-w-2xl font-light">
              We eliminated the chaos. Choose your tier with complete transparency.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { grade: "A", title: "Pristine Original", subtitle: "100% Genuine product", class: "grade-a", items: ["Verified through official channels", "Includes original packaging & warranty", "Uncompromised premium quality"] },
              { grade: "B", title: "Premium Equivalent", subtitle: "Slight quality drop for savings", class: "grade-b", items: ["Near-identical aesthetics & materials", "Highly durable & reliable", "Perfect balance of price and quality"] },
              { grade: "C", title: "Standard Equivalent", subtitle: "Noticeable drop, budget-friendly", class: "grade-c", items: ["Inspired designs & standard materials", "Ideal for casual daily use", "Most accessible price points"] },
            ].map((tier, idx) => (
              <motion.div 
                key={tier.grade}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-50px" }}
                className={`relative p-10 rounded-[2rem] overflow-hidden glass-card group transition-all duration-700 hover:-translate-y-2 ${tier.class}`}
                style={{ 
                  borderColor: 'var(--grade-border)', 
                  background: 'var(--grade-bg)' 
                }}>
                
                <div className="absolute -bottom-10 -right-10 text-[18rem] font-black opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none" style={{ color: 'var(--grade-color)' }}>{tier.grade}</div>
                
                <div className="flex flex-col gap-6 mb-12 relative z-10">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl font-bold border glass-card"
                    style={{ color: 'var(--grade-color)', borderColor: 'var(--grade-border)' }}>
                    {tier.grade}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold mb-1 text-[var(--color-text-primary)]">{tier.title}</h3>
                    <p className="text-lg opacity-80" style={{ color: 'var(--grade-color)' }}>{tier.subtitle}</p>
                  </div>
                </div>
                
                <ul className="space-y-6 text-lg text-[var(--color-text-secondary)] relative z-10">
                  {tier.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="mt-1" style={{ color: 'var(--grade-color)' }}>✦</span> 
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-40 px-4 relative bg-[var(--color-surface-2)]/40 backdrop-blur-[60px] border-y border-[var(--color-surface-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--color-text-primary)] tracking-tight mb-2 uppercase">
                Artifacts.
              </h2>
              <p className="text-base sm:text-lg text-[var(--color-text-secondary)] font-light">The most sought-after goods, verified and now filterable.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}>
              <Link href="/products" className="inline-flex items-center gap-3 text-sm sm:text-lg font-medium text-[var(--color-text-primary)] hover:text-[var(--color-brand-gold)] transition-colors group">
                Explore Vault 
                <span className="w-10 h-px bg-[var(--color-text-primary)] group-hover:bg-[var(--color-brand-gold)] transition-colors" />
              </Link>
            </motion.div>
          </div>

          <div className="flex flex-wrap justify-between gap-2 md:gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {['all', 'A', 'B', 'C'].map(level => (
                <button
                  key={level}
                  onClick={() => setGradeFilter(level as 'all'|'A'|'B'|'C')}
                  className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${gradeFilter === level ? 'bg-[var(--color-brand-gold)] text-black' : 'bg-[var(--color-surface-3)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)]'}`}>
                  {level === 'all' ? 'All Grades' : `Grade ${level}`}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-[var(--color-text-secondary)]">Sort by</span>
              {['rating', 'price'].map(key => (
                <button
                  key={key}
                  onClick={() => setSortBy(key as 'rating'|'price')}
                  className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${sortBy === key ? 'bg-[var(--color-brand-gold)] text-black' : 'bg-[var(--color-surface-3)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)]'}`}>
                  {key === 'rating' ? 'Rating' : 'Price'}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProducts.map(product => (
              <motion.div key={product.id} variants={fadeInUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Epic Footer CTA */}
      <section className="min-h-[70vh] md:h-screen py-28 md:py-40 px-4 relative overflow-hidden bg-[var(--color-surface-1)]/20 backdrop-blur-3xl flex items-center justify-center border-y border-[var(--color-surface-border)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-surface-2)_0%,transparent_70%)] opacity-30" />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-10 text-center flex flex-col items-center">
          <h2 className="text-[4rem] md:text-[9rem] font-bold text-[var(--color-text-primary)] mb-12 tracking-[-0.04em] uppercase leading-none">
            ENTER THE <br /> <span className="opacity-40">VAULT.</span>
          </h2>
          <Link href="/products"
            className="px-14 py-6 rounded-full text-xl font-medium bg-[var(--color-text-primary)] text-[var(--color-surface-1)] hover:scale-105 transition-transform duration-500 ease-[0.16,1,0.3,1] shadow-[0_0_40px_rgba(0,0,0,0.1)] hover:shadow-[0_0_60px_rgba(0,0,0,0.2)] dark:shadow-[0_0_40px_rgba(255,255,255,0.1)] dark:hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]">
            Begin Your Journey
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
