import { products } from "@/lib/mockData";
import { notFound } from "next/navigation";
import Link from "next/link";
import GradeSelector from "@/components/GradeSelector";

export function generateStaticParams() {
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const icon = 
    product.category === "Smartwatches" ? "⌚" :
    product.category === "Footwear" ? "👟" :
    product.category === "Fragrances" ? "🧴" :
    product.category === "Sunglasses" ? "🕶️" :
    product.category === "Bags" ? "👜" : "📱";

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-20 px-4 bg-[var(--color-surface-1)] overflow-hidden">
      <div className="max-w-6xl mx-auto w-full relative">
        <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8 animate-fade-in-up">
          <Link href="/products" className="hover:text-[var(--color-brand-gold)] transition-colors">Vault</Link>
          <span>/</span>
          <span className="text-[var(--color-text-secondary)]">{product.category}</span>
          <span>/</span>
          <span className="text-[var(--color-text-primary)] font-bold truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left: Interactive Image Area */}
          <div className="flex flex-col gap-6 sticky top-28 h-fit animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="relative aspect-square rounded-[2.5rem] overflow-hidden glass-card flex flex-col items-center justify-center p-8 border border-[var(--color-surface-border)] group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="absolute top-6 left-6 z-10 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md"
                style={{ background: 'rgba(10,110,78,0.2)', border: '1px solid rgba(10,110,78,0.4)', color: 'var(--color-brand-green-light)' }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-brand-green)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-brand-green)]"></span>
                </span>
                Verified Authentic Source
              </div>
              
              <div className="text-[14rem] sm:text-[18rem] opacity-90 drop-shadow-[0_40px_60px_rgba(0,0,0,0.8)] filter transition-all duration-700 scale-95 group-hover:scale-105 group-hover:rotate-12 group-hover:drop-shadow-[0_60px_80px_rgba(201,168,76,0.3)]">
                {icon}
              </div>
            </div>

            <div className="p-8 rounded-[2rem] border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.05)] backdrop-blur-md hover:bg-[rgba(201,168,76,0.08)] transition-colors">
              <h3 className="font-black text-xl text-[var(--color-brand-gold)] mb-3 flex items-center gap-3">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                The Absolute Guarantee
              </h3>
              <p className="text-base text-[var(--color-text-secondary)] leading-relaxed font-medium">
                If the grade you receive does not match our exact description down to the serial number, we will refund you 100% of the price along with compensation.
              </p>
            </div>
          </div>

          {/* Right: Info & Grades */}
          <div className="flex flex-col pb-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="mb-8">
              <h2 className="text-sm font-black text-[var(--color-text-muted)] tracking-[0.2em] uppercase mb-4">
                {product.brand}
              </h2>
              <h1 className="text-5xl md:text-6xl font-black text-[var(--color-text-primary)] leading-[1.1] tracking-tighter mb-6">
                {product.name}
              </h1>
              <div className="flex items-center gap-6 text-sm font-bold bg-[var(--color-surface-2)] inline-flex px-6 py-3 rounded-2xl border border-[var(--color-surface-border)]">
                <div className="flex items-center gap-2 text-[var(--color-brand-gold)]">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-lg">{product.rating}</span>
                </div>
                <div className="w-px h-6 bg-[var(--color-surface-border)]" />
                <span className="text-[var(--color-text-secondary)]">
                  {product.reviewCount} <span className="text-[var(--color-text-muted)]">Vault Members</span>
                </span>
              </div>
            </div>

            <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-12 font-medium">
              {product.description}
            </p>

            {/* Core Grading UI */}
            <div className="mb-14 relative z-20">
              <div id="grade-explainer" className="scroll-mt-32" />
              <GradeSelector grades={product.grades} />
            </div>

            {/* Sticky Add to Cart */}
            <div className="mt-auto flex flex-col sm:flex-row items-center gap-4 fixed bottom-0 left-0 right-0 p-4 sm:p-0 sm:relative sm:bg-transparent z-40 bg-[rgba(11,15,14,0.8)] sm:backdrop-filter-none backdrop-blur-2xl border-t border-[var(--color-surface-border)] sm:border-0 hover:z-50">
              <button className="flex-1 w-full py-5 rounded-2xl text-xl font-black uppercase tracking-widest transition-all duration-500 shadow-[0_10px_40px_rgba(10,110,78,0.4)] hover:shadow-[0_20px_60px_rgba(10,110,78,0.6)] transform hover:-translate-y-2 hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, var(--color-brand-green), var(--color-brand-green-light))', color: '#fff' }}>
                Acquire Now
              </button>
              <button className="sm:w-20 w-full py-5 rounded-2xl flex items-center justify-center shrink-0 border-2 border-[var(--color-surface-border)] bg-[var(--color-surface-2)] text-[var(--color-text-primary)] hover:border-[var(--color-brand-gold)] hover:bg-[rgba(201,168,76,0.1)] hover:text-[var(--color-brand-gold)] transition-colors duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
