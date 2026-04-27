'use client'

import { useQuery } from '@tanstack/react-query'
import { ChevronDown, Truck } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { getAllProducts, getProductById } from '@/http/http-services'

const ProductDetailPage = () => {
  const { id } = useParams()
  const [selectedColor, setSelectedColor] = useState('black')
  const [selectedSize, setSelectedSize] = useState('M')

  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id as string),
    enabled: !!id,
  })

  const { data: relatedProducts, isLoading: isLoadingRelated } = useQuery({
    queryKey: ['related-products'],
    queryFn: async () => getAllProducts({ limit: 4 }),
  })

  if (isLoadingProduct) {
    return (
      <div className="container mx-auto px-4 py-12 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7 space-y-4">
            <Skeleton className="aspect-3/4 w-full" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="aspect-square w-full" />
            </div>
          </div>
          <div className="md:col-span-5 space-y-6">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-32 w-full" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-1/4" />
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-8 w-8 rounded-full" />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-4 w-1/4" />
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            </div>
            <Skeleton className="h-14 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Produto não encontrado</h1>
        <Button className="mt-4" onClick={() => window.history.back()}>
          Voltar
        </Button>
      </div>
    )
  }

  const priceFormatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.priceInCents / 100)

  return (
    <div className="flex flex-col gap-24 py-12">
      <div className="container mx-auto px-4 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Section - Left Side: Product Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="aspect-[3/4] relative bg-muted overflow-hidden">
              <Image
                src={product.imageUrl || '/default-shirt.svg'}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="aspect-square relative bg-muted overflow-hidden">
                <Image
                  src={product.imageUrl || '/default-shirt.svg'}
                  alt={`${product.name} preview 1`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="aspect-square relative bg-muted overflow-hidden">
                <Image
                  src={product.imageUrl || '/default-shirt.svg'}
                  alt={`${product.name} preview 2`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Section - Right Side: Product Details */}
          <div className="lg:col-span-5 flex flex-col gap-8 lg:pt-10">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                NEW COLLECTION / {product.name.split(' ')[0]}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground uppercase font-heading">
                {product.name}
              </h1>
              <span className="text-2xl font-semibold text-foreground">
                {priceFormatted}
              </span>
            </div>

            <div className="py-8 border-y border-border">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Color Selector */}
            <div className="flex flex-col gap-4">
              <span className="text-xs font-semibold tracking-[0.1em] text-foreground uppercase">
                SELECIONE A COR
              </span>
              <div className="flex gap-4">
                {[
                  { id: 'black', color: 'bg-black' },
                  { id: 'gray', color: 'bg-gray-200' },
                  { id: 'brown', color: 'bg-amber-900' },
                ].map((item) => (
                  <Button
                    key={item.id}
                    onClick={() => setSelectedColor(item.id)}
                    className={`size-8 rounded-full border-2 p-1 transition-all ${
                      selectedColor === item.id
                        ? 'border-foreground'
                        : 'border-transparent'
                    }`}
                  >
                    <div className={`size-full rounded-full ${item.color}`} />
                  </Button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-[0.1em] text-foreground uppercase">
                  TAMANHO
                </span>
                <Button className="text-[10px] underline uppercase tracking-wider hover:text-muted-foreground transition-colors">
                  Guia de Medidas
                </Button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {['P', 'M', 'G', 'GG'].map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? 'default' : 'outline'}
                    className={`h-12 rounded-none font-semibold tracking-widest ${
                      size === 'GG' ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={() => size !== 'GG' && setSelectedSize(size)}
                    disabled={size === 'GG'}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="flex flex-col gap-4 pt-4">
              <Button className="w-full h-16 rounded-none text-base tracking-[0.2em] uppercase font-normal">
                ADICIONAR AO CARRINHO
              </Button>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Truck className="size-4" />
                <span className="text-[10px] tracking-wider">
                  Frete Grátis e Devolução em 30 dias
                </span>
              </div>
            </div>

            {/* Accordions (Simulated with plain structure as per Figma) */}
            <div className="flex flex-col mt-4">
              <div className="py-4 border-b border-border flex items-center justify-between group cursor-pointer">
                <span className="text-xs font-semibold tracking-[0.1em] text-foreground uppercase">
                  DETALHES DO PRODUTO
                </span>
                <ChevronDown className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <div className="py-4 border-b border-border flex items-center justify-between group cursor-pointer">
                <span className="text-xs font-semibold tracking-[0.1em] text-foreground uppercase">
                  CUIDADOS
                </span>
                <ChevronDown className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="container mx-auto px-4 lg:px-24 flex flex-col gap-8">
        <div className="flex items-end justify-between border-b-2 border-foreground pb-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground uppercase font-heading">
            VOCÊ TAMBÉM PODE GOSTAR
          </h2>
          <Button className="text-xs font-semibold tracking-[0.1em] underline uppercase hover:text-muted-foreground transition-colors">
            Ver todos
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {isLoadingRelated
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i.toString()} className="flex flex-col gap-4">
                  <Skeleton className="aspect-3/4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              ))
            : relatedProducts?.data.map((product) => (
                <ProductCard key={product.id} props={product} />
              ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
