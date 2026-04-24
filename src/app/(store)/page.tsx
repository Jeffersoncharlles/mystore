import { ProductCard } from '@/components/product-card'
import { PRODUCTS } from '@/shared/utils/product-image'

export default function Home() {
  return (
    <div className="container mx-auto px-4 md:px-12 py-16 space-y-24">
      {/* Editorial Header */}
      <section className="space-y-6">
        <h1 className="font-heading text-6xl md:text-8xl font-black tracking-tight leading-[0.9] uppercase">
          CURRENT
          <br />
          SELECTION
        </h1>
        <div className="h-[2px] bg-foreground w-full" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
            An architectural approach to modern dressing. High-contrast
            silhouettes and premium textiles curated for the avant-garde
            aesthetic.
          </p>
          <div className="flex gap-4 text-sm font-medium tracking-tight uppercase">
            <span>FILTER: ALL</span>
            <span className="text-muted-foreground">SORT: NEWEST</span>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-24">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.sku} {...product} />
        ))}
      </section>

      {/* Pagination */}
      <section className="border-t-2 border-foreground pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm font-medium tracking-widest uppercase">
          PAGE 01 OF 04
        </div>

        <div className="flex items-center gap-12">
          <button
            type="button"
            className="text-sm font-medium tracking-widest uppercase text-muted-foreground/30 cursor-not-allowed"
          >
            PREVIOUS
          </button>
          <div className="flex gap-6">
            <button
              type="button"
              className="text-sm font-medium tracking-widest uppercase underline decoration-2 underline-offset-8"
            >
              01
            </button>
            <button
              type="button"
              className="text-sm font-medium tracking-widest uppercase text-muted-foreground"
            >
              02
            </button>
            <button
              type="button"
              className="text-sm font-medium tracking-widest uppercase text-muted-foreground"
            >
              03
            </button>
            <button
              type="button"
              className="text-sm font-medium tracking-widest uppercase text-muted-foreground"
            >
              04
            </button>
          </div>
          <button
            type="button"
            className="text-sm font-medium tracking-widest uppercase hover:underline underline-offset-8 transition-all"
          >
            NEXT
          </button>
        </div>
      </section>
    </div>
  )
}
