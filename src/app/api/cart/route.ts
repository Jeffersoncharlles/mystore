import { type NextRequest, NextResponse } from 'next/server'
import z from 'zod'
import { makeCartService } from '@/core/infra/factories/cart-factory'
import { mockUserId } from '@/shared/mock/checkout-mock'

export async function GET(_request: NextRequest) {
  try {
    const userId = mockUserId
    const cartService = makeCartService()
    const cartItems = await cartService.getCartItemsByUserId(userId)

    return NextResponse.json({ cartItems })
  } catch (_error) {
    return new Response(JSON.stringify({ error: 'Failed to get cart items' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

const addToCartSchema = z.object({
  productId: z.string(),
  quantity: z.number().optional().default(1),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, quantity } = addToCartSchema.parse(body)

    const userId = mockUserId

    const cartService = makeCartService().addItemToCart(
      productId,
      quantity,
      userId,
    )

    return NextResponse.json(cartService)
  } catch (_error) {
    return new Response(
      JSON.stringify({ error: 'Failed to add item to cart' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}
