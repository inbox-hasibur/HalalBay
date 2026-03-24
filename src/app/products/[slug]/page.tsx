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

  // Determine placeholder emoji
  const icon = 
    product.category === "Smartwatches" ? "⌚" :
    product.category === "Footwear" ? "👟" :
    product.category === "Fragrances" ? "🧴" :
    product.category === "Sunglasses" ? "🕶️" :
    product.category === "Bags" ? "👜" : "📱";

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-20 px-4 bg-[var(--color-surface-1)]">
      <div className="max-w-6xl mx-auto w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] mb-8">
          <Link href="/products" className="hover:text-[var(--color-brand-gold)] transition-colors">Products</Link>
          <span>/</span>
          <span className="text-[var(--color-text-secondary)]">{product.category}</span>
          <span>/</span>
          <span className="text-[var(--color-text-primary)] font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden glass-card flex flex-col items-center justify-center p-8 border border-[var(--color-surface-border)]">
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{ background: 'rgba(10,110,78,0.15)', border: '1px solid rgba(10,110,78,0.3)', color: 'var(--color-brand-green-light)' }}>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 1l2.39 6.26L19 8.27l-5 4.86 1.18 6.87L10 16.77l-5.18 3.23L6 13.13 1 8.27l6.61-1.01L10 1z" clipRule="evenodd" />
                </svg>
                Verified Authentic Source
              </div>
              <div className="text-[12rem] opacity-80 filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-500">
                {icon}
              </div>
            </div>
            {/* Thumbnails placeholder */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(idx => (
                <div key={idx} className="aspect-square rounded-xl glass-card border border-[var(--color-surface-border)] flex items-center justify-center text-3xl opacity-50 hover:opacity-100 cursor-pointer transition-opacity">
                  {icon}
                </div>
              ))}
            </div>
            
            {/* Guarantee Box */}
            <div className="mt-4 p-6 rounded-2xl border border-[rgba(201,168,76,0.3)] bg-[rgba(201,168,76,0.05)]">
              <h3 className="font-bold text-[var(--color-brand-gold)] mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                The HalalBay Guarantee
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                If the grade you receive does not match our exact description, we will refund you 100% of the price along with compensation for breaking your trust.
              </p>
            </div>
          </div>

          {/* Right: Product Details & Grade Selector */}
          <div className="flex flex-col pb-10">
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-[var(--color-text-muted)] tracking-wider uppercase mb-2">
                {product.brand}
              </h2>
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] leading-tight mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 text-sm font-medium">
                <div className="flex items-center gap-1 text-[var(--color-brand-gold)]">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{product.rating}</span>
                </div>
                <span className="text-[var(--color-text-muted)] border-l border-[var(--color-surface-border)] pl-4">
                  Reviewed by {product.reviewCount} trusted buyers
                </span>
              </div>
            </div>

            <p className="text-base text-[var(--color-text-secondary)] leading-relaxed mb-10">
              {product.description}
            </p>

            {/* Core Grading UI */}
            <div className="mb-10 relative">
              <div id="grade-explainer" className="scroll-mt-32"></div>
              <GradeSelector grades={product.grades} />
            </div>

            {/* Add to Cart CTA */}
            <div className="mt-auto flex flex-col sm:flex-row items-center gap-4 fixed bottom-0 left-0 right-0 p-4 sm:p-0 sm:relative sm:bg-transparent z-40 bg-[rgba(11,15,14,0.9)] sm:backdrop-filter-none backdrop-blur-md border-t border-[var(--color-surface-border)] sm:border-0">
              <button className="flex-1 w-full py-4 rounded-xl text-lg font-bold transition-all duration-300 shadow-[0_4px_20px_rgba(10,110,78,0.3)] hover:shadow-[0_8px_30px_rgba(10,110,78,0.5)] transform hover:-translate-y-1"
                style={{ background: 'linear-gradient(135deg, var(--color-brand-green), var(--color-brand-green-light))', color: '#fff' }}>
                Add to Cart
              </button>
              <button className="sm:w-16 w-full py-4 rounded-xl flex items-center justify-center shrink-0 border border-[var(--color-surface-border)] bg-[var(--color-surface-3)] text-[var(--color-text-primary)] hover:border-[var(--color-brand-gold)] hover:text-[var(--color-brand-gold)] transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            
            {/* Extra Info Accordion */}
            <div className="mt-12 space-y-4 pt-10 border-t border-[var(--color-surface-border)]">
              {["Product Specifications", "Shipping & Delivery", "Returns Policy"].map((title, i) => (
                <details key={i} className="group glass-card rounded-xl border border-[var(--color-surface-border)] overflow-hidden">
                  <summary className="flex items-center justify-between p-5 font-semibold cursor-pointer text-[var(--color-text-primary)] list-none">
                    {title}
                    <span className="transition-transform group-open:rotate-180">
                      <svg className="w-5 h-5 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="p-5 pt-0 text-sm text-[var(--color-text-secondary)] leading-relaxed border-t border-[var(--color-surface-border)]">
                    {i === 0 && "Detailed specifications depend on the selected grade. Authentic grades come with original manufacturer specs. Master copies will have minor dimensional weight differences but feature 1:1 aesthetics."}
                    {i === 1 && "Standard delivery across Bangladesh within 3-5 business days. Express next-day delivery available for Dhaka metro."}
                    {i === 2 && "If the product does not match the described grade exactly, you can return it within 7 days for a full refund."}
                  </div>
                </details>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
