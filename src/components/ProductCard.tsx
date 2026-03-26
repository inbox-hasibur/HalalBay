'use client';

import Link from "next/link";
import { Product } from "@/lib/mockData";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";

function formatPrice(n: number) {
  return "৳" + n.toLocaleString("en-BD");
}

const EMOJI_MAP: Record<string, string> = {
  Smartwatches: "⌚",
  Footwear: "👟",
  Fragrances: "🧴",
  Sunglasses: "🕶️",
  Bags: "👜",
  Smartphones: "📱",
};

const GRADE_STYLES: Record<string, { color: string; bg: string; border: string }> = {
  A: { color: "#c9a84c", bg: "rgba(201,168,76,0.10)", border: "rgba(201,168,76,0.30)" },
  B: { color: "#9ea3ae", bg: "rgba(158,163,174,0.10)", border: "rgba(158,163,174,0.30)" },
  C: { color: "#a0522d", bg: "rgba(160,82,45,0.10)",  border: "rgba(160,82,45,0.30)"  },
};

export default function ProductCard({ product }: { product: Product }) {
  const productGrades = product.grades || [];
  const defaultGrade = productGrades.find(g => g.inStock) || productGrades[0];
  const topGrade = productGrades[0]?.label || "C";
  const addItem = useCartStore(state => state.addItem);
  const icon = EMOJI_MAP[product.category] ?? "🛍️";

  return (
    <Link href={`/products/${product.slug}`} className="block outline-none">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl overflow-hidden h-full flex flex-col glass-card border border-[var(--color-surface-border)] hover:border-[var(--color-brand-gold)] transition-colors duration-500 group shimmer-hover"
      >
        {/* ── Image / Icon Area ── */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[var(--color-surface-3)] to-[var(--color-surface-4)]">
          {/* Glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(212,175,55,0.08)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

          {/* Icon */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-70 group-hover:opacity-90 transition-opacity duration-300">
            <span className="text-6xl drop-shadow-2xl group-hover:scale-110 transition-transform duration-500">
              {icon}
            </span>
            <span className="text-xs font-black tracking-widest uppercase text-[var(--color-text-muted)]">
              {product.brand}
            </span>
          </div>

          {/* Verified badge */}
          <div
            className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold z-10"
            style={{ background: 'rgba(0,0,0,0.6)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified
          </div>

          {/* Grade pills */}
          <div className="absolute top-4 right-4 flex flex-col gap-1.5 z-10">
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

        {/* ── Content ── */}
        <div className="p-5 flex flex-col flex-1 gap-4">
          {/* Category + rating */}
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
            <h3 className="font-bold text-[1.05rem] leading-snug line-clamp-2 text-[var(--color-text-primary)]">
              {product.name}
            </h3>
          </div>

          {/* Grade price tiers */}
          <div className="flex flex-col gap-1.5 flex-1 mt-1">
            {product.grades.slice(0, 3).map(g => {
              const gs = GRADE_STYLES[g.label];
              if (!gs) return null;
              return (
                <div key={g.label} className="flex items-center justify-between text-xs px-3 py-2 rounded-xl"
                  style={{ background: gs.bg, border: `1px solid ${gs.border}` }}>
                  <span className="font-bold tracking-wide" style={{ color: gs.color }}>
                    {g.label} <span className="text-[var(--color-text-muted)] mx-1">·</span> {g.name.split(" ")[0]}
                  </span>
                  <span className="font-black text-[var(--color-text-primary)]">
                    {formatPrice(g.price)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-2 mt-1">
            <button
              className="w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 relative overflow-hidden group/btn border border-transparent"
              style={{ background: 'var(--color-surface-3)', color: 'var(--color-text-primary)' }}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                if (defaultGrade) addItem(product, defaultGrade);
              }}
            >
              <div className="absolute inset-0 bg-[var(--color-brand-gold)] transform scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-300 ease-out z-0 opacity-90" />
              <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-black">
                Add Grade {defaultGrade?.label ?? 'A'} to Cart
              </span>
            </button>

            <button
              className="w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 relative overflow-hidden group/btn2 border border-[var(--color-surface-border)] hover:border-[var(--color-brand-gold)]"
              style={{ background: 'transparent', color: 'var(--color-text-secondary)' }}
            >
              <span className="relative z-10 group-hover/btn2:text-[var(--color-brand-gold)] transition-colors">
                View All Grades →
              </span>
            </button>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
