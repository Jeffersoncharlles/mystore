import z from 'zod'

export const CreateOrderDTO = z.object({
  userId: z.string().uuid(),
  items: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number().int().positive(),
      priceAtPurchaseInCents: z.number().int().nonnegative(),
    }),
  ),
})

export type CreateOrderDTO = z.infer<typeof CreateOrderDTO>
