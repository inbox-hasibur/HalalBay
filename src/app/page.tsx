'use client';

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/mockData";
import { Canvas } from "@react-three/fiber";
import TrustToken from "@/components/TrustToken";
import { Environment } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-[var(--color-surface-1)]">
      {/* Hero Section with 3D Canvas */}
      <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden pt-20">
        {/* 3D Background */}
        <div className="absolute inset-x-0 h-[120%] top-[-10%] z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Environment preset="city" />
            <TrustToken />
          </Canvas>
        </div>

        {/* Hero Content */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center mt-auto mb-32"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.05)] backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-[var(--color-brand-gold)] animate-pulse" />
            <span className="text-[var(--color-brand-gold)] font-medium tracking-wide text-sm uppercase">The New Standard of Trust</span>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter text-[var(--color-text-primary)] mb-6 leading-[0.9]">
            We don't just sell. <br />
            <span className="gradient-text-gold inline-block mt-2">We verify.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-2xl text-[var(--color-text-secondary)] max-w-2xl mb-12 font-light">
            Every product exclusively sourced, graded, and 3D-verified by our experts. 
            Zero third-party sellers. Zero fakes.
          </motion.p>

          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-6">
            <Link href="/products"
              className="relative px-10 py-5 rounded-full text-lg font-bold overflow-hidden group bg-[var(--color-text-primary)] text-[var(--color-surface-1)]">
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Shop Collection</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-gold)] to-[var(--color-brand-green)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">Scroll to explore</span>
          <div className="w-px h-16 bg-gradient-to-b from-[var(--color-brand-gold)] to-transparent" />
        </motion.div>
      </section>

      {/* Parallax Image / Video Break */}
      <section className="h-[60vh] relative overflow-hidden flex items-center justify-center">
        <motion.div 
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute inset-0 bg-[#0d1512]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.1)_0%,transparent_60%)]" />
          <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative z-10 text-4xl md:text-6xl font-black text-white text-center tracking-tighter mix-blend-overlay">
          PURITY IN COMMERCE.
        </motion.h2>
      </section>

      {/* Trust Pillars */}
      <section className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🛡️", title: "In-House Vault", desc: "No third-party sellers. Every item is verified and stocked in our own secure vault." },
              { icon: "📑", title: "Absolute Truth", desc: "Original or Master Copy? We tell you the absolute truth with our transparent grading." },
              { icon: "🚫", title: "Zero Noise", desc: "No duplicate listings. One product page, select the grade you prefer and afford." }
            ].map((pillar, i) => (
              <motion.div key={i} variants={fadeInUp} className="group relative p-1 rounded-3xl bg-gradient-to-b from-[var(--color-surface-3)] to-transparent overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-gold)] to-[var(--color-brand-green)] opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                <div className="relative h-full bg-[var(--color-surface-2)] p-10 rounded-[22px] flex flex-col items-start gap-6 transform transition-transform duration-500 group-hover:scale-[0.98]">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-[var(--color-surface-1)] border border-[var(--color-surface-border)] shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)]">
                    {pillar.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">{pillar.title}</h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How Grading Works - Horizontal Scroll Layout */}
      <section id="how-it-works" className="py-32 overflow-hidden relative border-y border-[var(--color-surface-border)] bg-[var(--color-surface-2)]">
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-brand-green)] opacity-[0.03] blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20">
            <h2 className="text-5xl md:text-7xl font-black text-[var(--color-text-primary)] mb-6 tracking-tighter">
              The <span className="gradient-text-gold">Grading</span> Matrix.
            </h2>
            <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl">
              We eliminated the chaos. We show you exactly what you're buying. Choose your tier.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { grade: "A", title: "Authentic Original", subtitle: "100% Genuine product", color: "var(--color-brand-gold)", border: "rgba(201,168,76,0.3)", bg: "rgba(201,168,76,0.05)", items: ["Verified through official channels", "Includes original box and warranty", "Uncompromised premium quality"] },
              { grade: "B", title: "Master Copy", subtitle: "Premium 1:1 replica", color: "var(--color-brand-silver)", border: "rgba(158,163,174,0.3)", bg: "rgba(158,163,174,0.05)", items: ["Identical aesthetics & materials", "Highly durable and reliable", "The smartest value for money"] },
              { grade: "C", title: "Standard Quality", subtitle: "Budget-friendly alternatives", color: "var(--color-brand-bronze)", border: "rgba(160,82,45,0.3)", bg: "rgba(160,82,45,0.05)", items: ["Inspired designs & standard materials", "Ideal for casual daily use", "Most accessible price points"] },
            ].map((tier, idx) => (
              <motion.div 
                key={tier.grade}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative p-10 rounded-[2rem] overflow-hidden glass-card group hover:border-transparent transition-colors duration-500"
                style={{ borderColor: tier.border, background: tier.bg }}>
                
                <div className="absolute -bottom-10 -right-10 text-[16rem] font-black opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" style={{ color: tier.color }}>{tier.grade}</div>
                
                <div className="flex items-center gap-6 mb-8 relative z-10">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black border"
                    style={{ color: tier.color, borderColor: tier.border, background: 'var(--color-surface-1)' }}>
                    {tier.grade}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold" style={{ color: tier.color }}>{tier.title}</h3>
                    <p className="text-sm text-[var(--color-text-muted)]">{tier.subtitle}</p>
                  </div>
                </div>
                
                <ul className="space-y-5 text-lg text-[var(--color-text-secondary)] relative z-10">
                  {tier.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="mt-1" style={{ color: tier.color }}>✦</span> 
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
      <section className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}>
              <h2 className="text-4xl md:text-6xl font-bold text-[var(--color-text-primary)] tracking-tighter mb-4">
                Curated <span className="gradient-text-green">Artifacts</span>.
              </h2>
              <p className="text-xl text-[var(--color-text-secondary)]">The most sought-after goods, verified.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}>
              <Link href="/products" className="inline-flex items-center gap-2 text-lg font-semibold text-[var(--color-brand-gold)] hover:text-white transition-colors group">
                Explore Vault 
                <span className="transform transition-transform group-hover:translate-x-2">→</span>
              </Link>
            </motion.div>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <motion.div key={product.id} variants={fadeInUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Epic Footer CTA */}
      <section className="py-40 px-4 relative overflow-hidden bg-black flex items-center justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-surface-1),#000)]" />
        <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="relative z-10 text-center">
          <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter">
            ENTER THE <span className="gradient-text-gold">VAULT.</span>
          </h2>
          <Link href="/products"
            className="inline-flex items-center justify-center px-12 py-5 rounded-full text-xl font-bold transition-all duration-500 hover:scale-110 shadow-[0_0_60px_rgba(201,168,76,0.2)] hover:shadow-[0_0_100px_rgba(201,168,76,0.4)]"
            style={{ background: 'linear-gradient(135deg, var(--color-brand-gold), var(--color-brand-gold-dark))', color: '#000' }}>
            Begin Your Journey
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
