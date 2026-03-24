'use client';

import Link from "next/link";
import { Product } from "@/lib/mockData";

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

  return (
    <Link href={`/products/${product.slug}`} className="block group shimmer-hover">
      <article
        className="rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300"
        style={{
          background: 'var(--color-surface-card)',
          border: '1px solid var(--color-surface-border)',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.3)';
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-surface-border)';
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        }}>

        {/* Image area */}
        <div className="relative aspect-square overflow-hidden"
          style={{ background: 'linear-gradient(135deg, var(--color-surface-3), var(--color-surface-4))' }}>

          {/* Placeholder visual */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-60">
            <span className="text-5xl">
              {product.category === "Smartwatches" ? "⌚" :
               product.category === "Footwear" ? "👟" :
               product.category === "Fragrances" ? "🧴" :
               product.category === "Sunglasses" ? "🕶️" :
               product.category === "Bags" ? "👜" : "📱"}
            </span>
            <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>{product.brand}</span>
          </div>

          {/* Verified badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(10,110,78,0.9)', color: '#fff', backdropFilter: 'blur(8px)' }}>
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            HalalBay Verified
          </div>

          {/* Grade pills */}
          <div className="absolute top-3 right-3 flex flex-col gap-1">
            {product.grades.map(g => {
              const gs = GRADE_STYLES[g.label];
              if (!gs) return null;
              return (
                <span key={g.label}
                  className="px-2 py-0.5 rounded-full text-xs font-bold"
                  style={{ background: gs.bg, border: `1px solid ${gs.border}`, color: gs.color }}>
                  {g.label}
                </span>
              );
            })}
          </div>

          {/* Out of stock overlay for Grade A */}
          {!product.grades.some(g => g.inStock) && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
              <span className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>Out of Stock</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1 gap-3">
          {/* Category + brand */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ background: 'var(--color-surface-3)', color: 'var(--color-text-muted)' }}>
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-brand-gold)' }}>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{product.rating}</span>
              <span style={{ color: 'var(--color-text-muted)' }}>({product.reviewCount})</span>
            </div>
          </div>

          {/* Name */}
          <div>
            <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--color-text-muted)' }}>{product.brand}</p>
            <h3 className="font-semibold text-sm leading-tight line-clamp-2" style={{ color: 'var(--color-text-primary)' }}>
              {product.name}
            </h3>
          </div>

          {/* Grade price preview */}
          <div className="flex flex-col gap-1.5 flex-1">
            {product.grades.slice(0, 3).map(g => {
              const gs = GRADE_STYLES[g.label];
              if (!gs) return null;
              return (
                <div key={g.label} className="flex items-center justify-between text-xs px-2 py-1.5 rounded-lg"
                  style={{ background: gs.bg, border: `1px solid ${gs.border}` }}>
                  <span className="font-bold" style={{ color: gs.color }}>
                    Grade {g.label} · {g.name.split(" ")[0]}
                  </span>
                  <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {formatPrice(g.price)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <button
            className="w-full py-2.5 rounded-xl text-sm font-semibold mt-1 transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, var(--color-brand-green), var(--color-brand-green-light))',
              color: '#fff',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.opacity = '0.9';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(10,110,78,0.4)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.opacity = '1';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}>
            Select Grade & Buy
          </button>
        </div>
      </article>
    </Link>
  );
}
