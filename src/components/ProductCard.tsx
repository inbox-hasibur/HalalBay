'use client';

import Link from "next/link";
import { Product } from "@/lib/mockData";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function formatPrice(n: number) {
  return "৳" + n.toLocaleString("en-BD");
}

const GRADE_STYLES: Record<string, { color: string; bg: string; border: string; label: string }> = {
  A: { color: "#c9a84c", bg: "rgba(201,168,76,0.12)", border: "rgba(201,168,76,0.35)", label: "Grade A" },
  B: { color: "#9ea3ae", bg: "rgba(158,163,174,0.12)", border: "rgba(158,163,174,0.35)", label: "Grade B" },
  C: { color: "#a0522d", bg: "rgba(160,82,45,0.12)", border: "rgba(160,82,45,0.35)", label: "Grade C" },
};

export default function ProductCard({ product }: { product: Product }) {
  const lowestGrade = product.grades.find(g => g.inStock) || product.grades[0];
  const style = GRADE_STYLES[lowestGrade.label] || GRADE_STYLES["C"];
  
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Link href={`/products/${product.slug}`} className="block block-outline-none perspective-1000">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="rounded-3xl overflow-hidden h-full flex flex-col transition-shadow duration-300 relative group"
      >
        {/* Glow effect that follows mouse conceptually via CSS hover */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[rgba(201,168,76,0.15)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <article
          className="relative z-10 rounded-3xl overflow-hidden h-full flex flex-col bg-[var(--color-surface-card)] border border-[var(--color-surface-border)] group-hover:border-[rgba(201,168,76,0.3)] transition-colors duration-500"
          style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
        >
          {/* Image area */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[var(--color-surface-3)] to-[var(--color-surface-4)] group-hover:scale-[1.03] transition-transform duration-500">
            {/* Placeholder visual */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-60 transform transition-transform duration-500 group-hover:scale-110" style={{ transform: "translateZ(40px)" }}>
              <span className="text-6xl drop-shadow-2xl filter">
                {product.category === "Smartwatches" ? "⌚" :
                 product.category === "Footwear" ? "👟" :
                 product.category === "Fragrances" ? "🧴" :
                 product.category === "Sunglasses" ? "🕶️" :
                 product.category === "Bags" ? "👜" : "📱"}
              </span>
              <span className="text-sm font-black tracking-widest uppercase text-[var(--color-text-muted)]">{product.brand}</span>
            </div>

            {/* Verified badge */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{ background: 'rgba(10,110,78,0.9)', color: '#fff', backdropFilter: 'blur(12px)', transform: "translateZ(50px)" }}>
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              HalalBay Verified
            </div>

            {/* Grade pills */}
            <div className="absolute top-4 right-4 flex flex-col gap-1.5" style={{ transform: "translateZ(50px)" }}>
              {product.grades.map(g => {
                const gs = GRADE_STYLES[g.label];
                if (!gs) return null;
                return (
                  <span key={g.label}
                    className="px-2 py-1 rounded-md text-xs font-black shadow-lg"
                    style={{ background: gs.bg, border: `1px solid ${gs.border}`, color: gs.color, backdropFilter: 'blur(8px)' }}>
                    {g.label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-1 gap-4" style={{ transform: "translateZ(20px)" }}>
            {/* Category + brand */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-[var(--color-surface-3)] text-[var(--color-text-muted)]">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-xs text-[var(--color-brand-gold)] font-bold">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{product.rating}</span>
                <span className="text-[var(--color-text-muted)]">({product.reviewCount})</span>
              </div>
            </div>

            {/* Name */}
            <div>
              <p className="text-xs font-bold text-[var(--color-text-muted)] mb-1 uppercase tracking-widest">{product.brand}</p>
              <h3 className="font-bold text-[1.1rem] leading-tight line-clamp-2 text-[var(--color-text-primary)]">
                {product.name}
              </h3>
            </div>

            {/* Grade price preview */}
            <div className="flex flex-col gap-2 flex-1 mt-2">
              {product.grades.slice(0, 3).map(g => {
                const gs = GRADE_STYLES[g.label];
                if (!gs) return null;
                return (
                  <div key={g.label} className="flex items-center justify-between text-xs px-3 py-2 rounded-xl"
                    style={{ background: gs.bg, border: `1px solid ${gs.border}` }}>
                    <span className="font-bold tracking-wide" style={{ color: gs.color }}>
                      GRADE {g.label} <span className="text-[var(--color-text-muted)] mx-1">•</span> {g.name.split(" ")[0]}
                    </span>
                    <span className="font-black text-[var(--color-text-primary)] tracking-tight">
                      {formatPrice(g.price)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <button
              className="w-full py-3.5 rounded-xl text-sm font-bold mt-2 transition-all duration-300 relative overflow-hidden group/btn border border-transparent hover:border-[var(--color-brand-green-light)]"
              style={{ background: 'var(--color-surface-3)', color: 'var(--color-text-primary)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-green)] to-[var(--color-brand-green-light)] transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-300 ease-out z-0" />
              <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-white">Select Grade & Buy</span>
            </button>
          </div>
        </article>
      </motion.div>
    </Link>
  );
}
