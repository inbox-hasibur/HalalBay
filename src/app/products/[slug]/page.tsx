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
    <div className="flex flex-col min-h-screen pt-24 pb-20 px-4 bg-[var(--color-surface-1)] overflow-hidden relative">
      <div className="bg-noise" />
      <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full pointer-events-none opacity-[0.05] blur-[150px] bg-[var(--color-text-primary)]" />
      <div className="absolute bottom-[10%] right-[-10%] w-[60vw] h-[60vw] rounded-full pointer-events-none opacity-[0.10] blur-[150px] bg-[var(--color-brand-gold)]" />
      
      <div className="max-w-6xl mx-auto w-full relative z-10">
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
            <div className="relative aspect-square rounded-[2.5rem] overflow-hidden glass-card flex flex-col items-center justify-center p-8 group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="absolute top-6 left-6 z-10 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold glass-card text-[var(--color-text-primary)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-brand-green)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-brand-green)]"></span>
                </span>
                Verified Authentic Source
              </div>
              
              <div className="text-[14rem] sm:text-[18rem] opacity-90 drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_40px_60px_rgba(0,0,0,0.8)] filter transition-all duration-700 scale-95 group-hover:scale-105 group-hover:rotate-12 group-hover:drop-shadow-[0_20px_40px_rgba(201,168,76,0.3)]">
                {icon}
              </div>
            </div>

            <div className="p-8 rounded-[2rem] glass-card transition-colors">
              <h3 className="font-bold text-xl text-[var(--color-text-primary)] mb-3 flex items-center gap-3">
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
            <div className="mb-12">
              <h2 className="text-xs font-bold text-[var(--color-text-secondary)] tracking-[0.3em] uppercase mb-4">
                {product.brand}
              </h2>
              <h1 className="text-6xl md:text-8xl font-bold text-[var(--color-text-primary)] leading-[0.9] tracking-tighter mb-8 uppercase drop-shadow-sm">
                {product.name}
              </h1>
              <div className="flex items-center gap-6 text-sm font-bold glass-card inline-flex px-6 py-3 rounded-2xl">
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
            <div className="mb-4 relative z-20">
              <div id="grade-explainer" className="scroll-mt-32" />
              <GradeSelector product={product} grades={product.grades} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
