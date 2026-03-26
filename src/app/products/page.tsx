'use client';

import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/mockData";
import { useState } from "react";
import RequestModal from "@/components/RequestModal";

export default function ProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-20 px-4 bg-[var(--color-surface-1)] relative overflow-hidden">
      <div className="bg-noise" />
      <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full pointer-events-none opacity-10 blur-[150px] bg-[var(--color-brand-gold)]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full pointer-events-none opacity-[0.05] blur-[150px] bg-white" />
      
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold text-[var(--color-text-primary)] tracking-tight mb-4 uppercase drop-shadow-sm">
              The <span className="opacity-40">Vault</span>
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl font-medium">
              Every item here is strictly sourced and verified by HalalBay. Navigate with absolute trust.
            </p>
          </div>
          
          {/* MVP Filter Pills */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 z-20 relative">
            <button 
              onClick={() => setActiveCategory("All")}
              className={`px-5 py-2.5 rounded-full text-sm font-bold shadow-[0_4px_14px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-transform duration-300 ${activeCategory === 'All' ? 'bg-[var(--color-text-primary)] text-[var(--color-text-invert)] scale-105' : 'bg-[var(--color-surface-2)] text-[var(--color-text-secondary)] hover:scale-105 border border-[var(--color-surface-border)]'}`}
            >
              All Artifacts
            </button>
            {categories.map((cat) => (
              <button 
                key={cat.id} 
                onClick={() => setActiveCategory(cat.name)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-transform duration-300 ${activeCategory === cat.name ? 'bg-[var(--color-text-primary)] text-[var(--color-text-invert)] scale-105 shadow-[0_4px_14px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'bg-[var(--color-surface-2)] text-[var(--color-text-secondary)] hover:scale-105 border border-[var(--color-surface-border)]'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--color-surface-border)]">
          <span className="text-[var(--color-text-secondary)] font-medium">
            Showing <span className="text-[var(--color-text-primary)] font-bold">{filteredProducts.length}</span> trusted products
          </span>
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <span>Sort by:</span>
            <span className="font-semibold text-[var(--color-text-primary)]">Most Trusted</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Trust Banner Bottom */}
        <div className="mt-32 p-8 md:p-16 rounded-[2rem] text-center relative overflow-hidden glass-card">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.02),rgba(212,175,55,0.05))] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.03),rgba(212,175,55,0.02))] -z-10" />
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-6 uppercase tracking-tight drop-shadow-sm">
            Didn&apos;t find what you were looking for?
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8 font-medium">
            We prioritize quality and authenticity over an endless catalog. We only list products we can physically verify and stand behind.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-10 py-4 rounded-full font-bold border border-[var(--color-surface-border)] bg-[rgba(0,0,0,0.05)] dark:bg-[rgba(255,255,255,0.05)] text-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-text-invert)] hover:scale-105 transition-all duration-300 relative z-20"
          >
            Request an Artifact
          </button>
        </div>
      </div>
      
      <RequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
