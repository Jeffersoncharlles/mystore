'use client'

import Image from 'next/image'
import type { ProductResponseDTO } from '@/core/domain/dtos/product-dto'

type ProductCardProps = {
  props: ProductResponseDTO['data'][number]
}

export function ProductCard({ props }: ProductCardProps) {
  const imageUrl = props.imageUrl || '/default-shirt.svg'

  return (
    <div className="flex flex-col gap-2 group cursor-pointer">
      <div className="aspect-3/4 overflow-hidden bg-muted relative">
        <Image
          src={imageUrl}
          alt={props.name}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="flex justify-between items-start pt-2">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-foreground uppercase tracking-tight">
            {props.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
          <h3 className="font-heading text-xl font-bold tracking-tight uppercase leading-none">
            {props.name}
          </h3>
        </div>
        <span className="text-sm font-semibold text-foreground">
          ${(props.priceInCents / 100).toFixed(2)}
        </span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {props.description}
      </p>
    </div>
  )
}
