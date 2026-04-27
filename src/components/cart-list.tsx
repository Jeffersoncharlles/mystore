'use client'

import { ArrowRight } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import { useCart } from '@/hooks/use-cart'
import { Button } from './ui/button'

export const CardList = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { cart, isLoading, updateItem } = useCart()

  if (cart?.cartItems.items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Nao ha itens no seu carrinho</p>
      </div>
    )
  }

  const checkoutPathname = pathname.includes('/checkout')

  const handleFinishPayment = (e: React.MouseEvent) => {
    e.preventDefault()

    router.push('/checkout')
  }

  return (
    <>
      <div className="space-y-6">
        {cart?.cartItems.items.map((item) => (
          <div key={item.productId} className="flex flex-col">
            <div className="flex gap-4">
              <div className="relative w-26 h-36 bg-muted shrink-0 overflow-hidden">
                {/** biome-ignore lint/performance/noImgElement: <explanation> */}
                <img
                  src={item.products.imageUrl || '/default-shirt.svg'}
                  alt={item.products.name}
                  className="object-cover grayscale"
                />
              </div>
              <div className="flex flex-col justify-between py-1">
                <div className="space-y-2">
                  <h4 className="text-[12px] font-semibold tracking-widest uppercase leading-tight">
                    {item.products.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {item.products.description.length > 100
                      ? `${item.products.description.slice(0, 100)}...`
                      : item.products.description}
                  </p>
                </div>
                <span className="font-bold">
                  ${(item.priceAtAdditionInCents / 100).toFixed(2)}
                </span>
                <span className="text-xs text-muted-foreground">
                  Qty: {item.quantity}
                </span>
              </div>
            </div>
            <Button
              variant={'destructive'}
              size={'sm'}
              onClick={() =>
                updateItem({
                  itemId: item.productId,
                  quantity: item.quantity - 1,
                })
              }
            >
              <span className="text-sm">Remove</span>
            </Button>
          </div>
        ))}
      </div>

      <div className="border-t-2 border-foreground pt-6 space-y-4">
        {cart?.cartItems.totalInCents && (
          <>
            <div className="flex justify-between items-center text-muted-foreground uppercase tracking-widest text-sm">
              <span>SUBTOTAL</span>
              <span>${(cart?.cartItems.totalInCents / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-muted-foreground uppercase tracking-widest text-sm">
              <span>SHIPPING</span>
              <span>$ 0.00</span>
            </div>
            <div className="flex justify-between items-center pt-4">
              <span className="font-heading text-2xl font-semibold uppercase">
                TOTAL
              </span>
              <span className="font-heading text-2xl font-semibold uppercase">
                ${(cart?.cartItems.totalInCents / 100).toFixed(2)}
              </span>
            </div>
          </>
        )}
      </div>

      {checkoutPathname ? (
        <Button
          onClick={() => {}}
          className="w-full h-16 text-lg tracking-[0.1em] uppercase group flex items-center justify-center gap-4 cursor-pointer"
        >
          FINALIZAR COMPRA
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      ) : (
        <Button
          onClick={handleFinishPayment}
          className="w-full h-16 text-lg tracking-[0.1em] uppercase group flex items-center justify-center gap-4 cursor-pointer"
        >
          FINALIZAR COMPRA
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      )}
    </>
  )
}
