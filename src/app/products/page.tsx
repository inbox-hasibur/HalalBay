import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/mockData";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-20 px-4 bg-[var(--color-surface-1)]">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
              Verified <span className="gradient-text-green">Collection</span>
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl">
              Every item here is strictly sourced and verified by HalalBay. Navigate with absolute trust.
            </p>
          </div>
          
          {/* MVP Filter Pills */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
            <Link href="/products" className="px-4 py-2 rounded-full text-sm font-medium bg-[var(--color-brand-green)] text-white shadow-[0_0_15px_rgba(10,110,78,0.4)]">
              All Items
            </Link>
            {categories.slice(0, 3).map((cat) => (
              <span key={cat.id} className="px-4 py-2 rounded-full text-sm font-medium border border-[var(--color-surface-border)] bg-[var(--color-surface-2)] text-[var(--color-text-secondary)] opacity-60 cursor-not-allowed">
                {cat.name}
              </span>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--color-surface-border)]">
          <span className="text-[var(--color-text-secondary)] font-medium">
            Showing <span className="text-[var(--color-text-primary)] font-bold">{products.length}</span> trusted products
          </span>
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <span>Sort by:</span>
            <span className="font-semibold text-[var(--color-text-primary)]">Most Trusted</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Trust Banner Bottom */}
        <div className="mt-20 p-8 md:p-12 rounded-3xl text-center relative overflow-hidden glass-card border-[rgba(201,168,76,0.2)]">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,110,78,0.05),rgba(201,168,76,0.05))] -z-10" />
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-4">
            Didn't find what you were looking for?
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8">
            We prioritize quality and authenticity over an endless catalog. We only list products we can physically verify and stand behind.
          </p>
          <button className="px-8 py-3 rounded-xl font-semibold border border-[var(--color-surface-border)] bg-[var(--color-surface-3)] text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-brand-green-light)]">
            Request a Product
          </button>
        </div>
      </div>
    </div>
  );
}
