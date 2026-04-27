'use client'

import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { Badge } from '../ui/badge'

export const StoreBadge = () => {
  const { cart } = useCart()

  return (
    <span className="relative">
      <span className="absolute -top-4 -right-4">
        {cart && (
          <Badge
            variant="destructive"
            className="rounded-full h-6 w-6 p-0 flex items-center justify-center"
          >
            {cart ? cart.cartItems.items.length : 0}
          </Badge>
        )}
      </span>
      <ShoppingBag className="h-5 w-5" />
    </span>
  )
}
