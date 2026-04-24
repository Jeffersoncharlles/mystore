import Image from 'next/image'

interface ProductCardProps {
  sku: string
  title: string
  price: number
  description: string
  image: string
}

export function ProductCard({
  sku,
  title,
  price,
  description,
  image,
}: ProductCardProps) {
  return (
    <div className="flex flex-col gap-2 group cursor-pointer">
      <div className="aspect-3/4 overflow-hidden bg-muted relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="flex justify-between items-start pt-2">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-foreground uppercase tracking-tight">
            {sku}
          </span>
          <h3 className="font-heading text-xl font-bold tracking-tight uppercase leading-none">
            {title}
          </h3>
        </div>
        <span className="text-sm font-semibold text-foreground">{price}</span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )
}
