import { ProductList } from './_components/product-list'

export default async function Home() {
  return (
    <div className="container mx-auto px-4 md:px-12 py-16 space-y-24">
      {/* Editorial Header */}
      <section className="space-y-6">
        <h1 className="font-heading text-6xl md:text-8xl font-black tracking-tight leading-[0.9] uppercase">
          Novidades
          <br />
          Coleção 2026
        </h1>
        <div className="h-0.5 bg-foreground w-full" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
            Explore as últimas adições à nossa coleção. Roupas de alta qualidade
            e estilo incomparável, perfeitas para renovar seu guarda-roupa.
          </p>
          <div className="flex gap-4 text-sm font-medium tracking-tight uppercase">
            <span>FILTER: ALL</span>
            <span className="text-muted-foreground">SORT: NEWEST</span>
          </div>
        </div>
      </section>

      {/* Product Grid */}

      <ProductList />
    </div>
  )
}
