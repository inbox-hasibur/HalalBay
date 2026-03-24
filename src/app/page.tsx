import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/mockData";

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden flex flex-col items-center text-center">
        {/* Background effects */}
        <div className="absolute top-0 inset-x-0 h-full overflow-hidden -z-10">
          <div className="absolute -top-[40%] -left-[10%] w-[70%] h-[70%] rounded-full bg-[var(--color-brand-green)] opacity-[0.05] blur-[120px]" />
          <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[var(--color-brand-gold)] opacity-[0.04] blur-[100px]" />
          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-[var(--color-surface-1)] to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto flex flex-col items-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-surface-border)] bg-[var(--color-surface-2)] text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-[var(--color-brand-green-light)] animate-pulse" />
            <span className="text-[var(--color-text-secondary)]">Bangladesh&apos;s 1st Transparent Marketplace</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[var(--color-text-primary)] mb-6 leading-tight">
            We don&apos;t just sell products.<br />
            <span className="gradient-text-gold">We sell Trust.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mb-10 leading-relaxed">
            Every product is exclusively sourced, verified, and graded by our in-house experts. 
            No third-party sellers. No fake reviews. Zero scams.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link href="/products"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(10,110,78,0.4)]"
              style={{ background: 'linear-gradient(135deg, var(--color-brand-green), var(--color-brand-green-light))', color: '#fff' }}>
              Shop Verified Products
            </Link>
            <Link href="#how-it-works"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 border border-[var(--color-surface-border)] bg-[var(--color-surface-3)] text-[var(--color-text-primary)] hover:border-[var(--color-brand-gold)] hover:bg-[var(--color-surface-card)]">
              See How Grading Works
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="py-20 px-4 bg-[var(--color-surface-2)] border-y border-[var(--color-surface-border)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🛡️",
                title: "100% In-House Sourcing",
                desc: "No third-party sellers allowed. Every item is verified and stocked in our own warehouse."
              },
              {
                icon: "📑",
                title: "Transparent Grading",
                desc: "Original or Master Copy? We tell you the absolute truth with our transparent grading system."
              },
              {
                icon: "🚫",
                title: "Zero Fake Listings",
                desc: "No confusing duplicate listings. One product page, select the grade you prefer and afford."
              }
            ].map((pillar, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl flex flex-col items-start gap-4 transform transition-transform hover:-translate-y-2">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: 'linear-gradient(135deg, rgba(10,110,78,0.2), rgba(201,168,76,0.1))', border: '1px solid rgba(201,168,76,0.2)' }}>
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{pillar.title}</h3>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Grading Works */}
      <section id="how-it-works" className="py-24 px-4 scroll-mt-16 relative">
        <div className="absolute top-[20%] left-[10%] w-[30%] h-[40%] rounded-full bg-[var(--color-brand-gold)] opacity-[0.03] blur-[100px] -z-10" />
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
              The <span className="gradient-text-gold">HalalBay</span> Grading System
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              We eliminated the chaos of multiple fake listings. We show you exactly what you're buying.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Grade A */}
            <div className="relative p-8 rounded-3xl overflow-hidden glass-card group">
              <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-brand-gold)]" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black bg-[rgba(201,168,76,0.15)] text-[var(--color-brand-gold)] border border-[rgba(201,168,76,0.3)]">
                  A
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-brand-gold)]">Authentic Original</h3>
                  <p className="text-sm text-[var(--color-text-muted)]">100% Genuine product</p>
                </div>
              </div>
              <ul className="space-y-4 text-[var(--color-text-secondary)]">
                <li className="flex items-start gap-3"><span className="text-[var(--color-brand-gold)]">✓</span> Verified through official channels</li>
                <li className="flex items-start gap-3"><span className="text-[var(--color-brand-gold)]">✓</span> Includes original box and warranty</li>
                <li className="flex items-start gap-3"><span className="text-[var(--color-brand-gold)]">✓</span> Uncompromised premium quality</li>
              </ul>
              <div className="absolute -bottom-10 -right-10 text-[12rem] font-black text-[rgba(201,168,76,0.03)] group-hover:text-[rgba(201,168,76,0.06)] transition-colors pointer-events-none">A</div>
            </div>

            {/* Grade B */}
            <div className="relative p-8 rounded-3xl overflow-hidden glass-card group">
              <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-brand-silver)]" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black bg-[rgba(158,163,174,0.15)] text-[var(--color-brand-silver)] border border-[rgba(158,163,174,0.3)]">
                  B
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-brand-silver)]">Master Copy</h3>
                  <p className="text-sm text-[var(--color-text-muted)]">Premium 1:1 replica</p>
                </div>
              </div>
              <ul className="space-y-4 text-[var(--color-text-secondary)]">
                <li className="flex items-start gap-3"><span className="text-[var(--color-brand-silver)]">✓</span> Identical aesthetics & materials</li>
                <li className="flex items-start gap-3"><span className="text-[var(--color-brand-silver)]">✓</span> Highly durable and reliable</li>
                <li className="flex items-start gap-3"><span className="text-[var(--color-brand-silver)]">✓</span> The smartest value for money</li>
              </ul>
              <div className="absolute -bottom-10 -right-10 text-[12rem] font-black text-[rgba(158,163,174,0.03)] group-hover:text-[rgba(158,163,174,0.06)] transition-colors pointer-events-none">B</div>
            </div>

            {/* Grade C */}
            <div className="relative p-8 rounded-3xl overflow-hidden glass-card group">
              <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-brand-bronze)]" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black bg-[rgba(160,82,45,0.15)] text-[var(--color-brand-bronze)] border border-[rgba(160,82,45,0.3)]">
                  C
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--color-brand-bronze)]">Standard Quality</h3>
                  <p className="text-sm text-[var(--color-text-muted)]">Budget-friendly alternatives</p>
                </div>
              </div>
              <ul className="space-y-4 text-[var(--color-text-secondary)]">
                <li className="flex items-start gap-3"><span className="text-[var(--color-brand-bronze)]">✓</span> Inspired designs & standard materials</li>
                <li className="flex items-start gap-3"><span className="text-[var(--color-brand-bronze)]">✓</span> Ideal for casual daily use</li>
                <li className="flex items-start gap-3"><span className="text-[var(--color-brand-bronze)]">✓</span> Most accessible price points</li>
              </ul>
              <div className="absolute -bottom-10 -right-10 text-[12rem] font-black text-[rgba(160,82,45,0.03)] group-hover:text-[rgba(160,82,45,0.06)] transition-colors pointer-events-none">C</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 px-4 bg-[var(--color-surface-2)] border-y border-[var(--color-surface-border)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Verified Categories</h2>
              <p className="text-[var(--color-text-secondary)]">Explore our curated selection</p>
            </div>
            <Link href="/products" className="text-sm font-semibold text-[var(--color-brand-gold)] hover:underline underline-offset-4">
              View All
            </Link>
          </div>

          <div className="flex overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 gap-4 snap-x hide-scrollbar">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/products?category=${cat.slug}`} className="flex-none w-[280px] snap-start group">
                <div className="glass-card p-6 rounded-2xl h-full transition-all duration-300 group-hover:border-[var(--color-brand-gold)] group-hover:shadow-[0_8px_30px_rgba(201,168,76,0.1)]">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-surface-3)] flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </div>
                  <h3 className="font-bold text-[var(--color-text-primary)] mb-1">{cat.name}</h3>
                  <p className="text-xs text-[var(--color-text-muted)] mb-3">{cat.productCount} products</p>
                  <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-2">
                Trending <span className="gradient-text-green">Verified</span> Goods
              </h2>
              <p className="text-[var(--color-text-secondary)]">Most trusted products this week</p>
            </div>
            <Link href="/products" className="hidden sm:block text-sm font-semibold text-[var(--color-brand-gold)] hover:underline underline-offset-4">
              Browse All Products
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-10 sm:hidden text-center">
            <Link href="/products" className="inline-block border border-[var(--color-surface-border)] bg-[var(--color-surface-3)] rounded-xl px-6 py-3 font-semibold text-[var(--color-text-primary)] w-full">
              Browse All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,110,78,0.08),rgba(201,168,76,0.05))] -z-10" />
        <div className="max-w-4xl mx-auto text-center glass-card p-12 rounded-[2rem] border border-[rgba(201,168,76,0.2)]">
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-6">
            Stop Getting Scammed.<br />Start Shopping with <span className="gradient-text-gold">Transparency.</span>
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto">
            Join thousands of Bangladeshis who have discovered the peace of mind that comes with 100% verified, graded products.
          </p>
          <Link href="/products"
            className="inline-block px-10 py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(201,168,76,0.3)] hover:shadow-[0_0_60px_rgba(201,168,76,0.5)]"
            style={{ background: 'linear-gradient(135deg, var(--color-brand-gold), var(--color-brand-gold-dark))', color: '#000' }}>
            Experience HalalBay Today
          </Link>
        </div>
      </section>
    </div>
  );
}
