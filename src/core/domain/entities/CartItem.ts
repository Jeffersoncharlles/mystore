import z from 'zod'

export const CartSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
  priceAtAdditionInCents: z.number().int().nonnegative(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type CartItem = z.infer<typeof CartSchema>
