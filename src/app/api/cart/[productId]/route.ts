import { type NextRequest, NextResponse } from 'next/server'
import z from 'zod'
import { makeCartService } from '@/core/infra/factories/cart-factory'
import { mockUserId } from '@/shared/mock/checkout-mock'

const updateCartSchema = z.object({
  quantity: z.number().min(0).nonnegative(),
})

const updateParamsSchema = z.object({
  productId: z.string(),
})

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
  try {
    const body = await request.json()

    const productIdParams = await params
    const productId = updateParamsSchema.parse(productIdParams).productId

    const { quantity } = updateCartSchema.parse(body)

    const userId = mockUserId
    const cartService = makeCartService()
    await cartService.updateCartItemQuantity(userId, productId, quantity)

    return NextResponse.json({ message: 'Updated successfully!' })
  } catch (_error) {
    return new Response(
      JSON.stringify({ error: 'Failed to update cart item' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  }
}
