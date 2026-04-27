'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useCart } from '@/hooks/use-cart'
import { SUMMARY_ITEMS } from '@/shared/utils/product-image'
import { Button } from './ui/button'

export const CardList = () => {
  const { cart, isLoading } = useCart()

  return (
    <>
      <div className="space-y-6">
        {SUMMARY_ITEMS.map((item) => (
          <div key={item.title} className="flex gap-4">
            <div className="relative w-24 h-32 bg-muted shrink-0 overflow-hidden">
              {/** biome-ignore lint/performance/noImgElement: <explanation> */}
              <img
                src={item.image}
                alt={item.title}
                className="object-cover grayscale"
              />
            </div>
            <div className="flex flex-col justify-between py-1">
              <div className="space-y-1">
                <h4 className="text-[12px] font-semibold tracking-widest uppercase leading-tight">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground">{item.details}</p>
              </div>
              <span className="font-bold">{item.price}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t-2 border-foreground pt-6 space-y-4">
        <div className="flex justify-between items-center text-muted-foreground uppercase tracking-widest text-sm">
          <span>SUBTOTAL</span>
          <span>$ 2,140.00</span>
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
            $ 2,140.00
          </span>
        </div>
      </div>

      <Button
        asChild
        className="w-full h-16 text-lg tracking-[0.1em] uppercase group flex items-center justify-center gap-4 cursor-pointer"
      >
        <Link href="/checkout" className="block mt-6">
          FINISH PAYMENT
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Button>
    </>
  )
}
