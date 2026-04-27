import z from 'zod'

export const CreateCartItemDTO = z.object({
  userId: z.string().min(1, 'User ID is required'),
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z.number().int().positive('Quantity must be a positive integer'),
  priceAtAdditionInCents: z
    .number()
    .int()
    .nonnegative('Price must be a non-negative integer'),
})

export type CreateCartItemDTO = z.infer<typeof CreateCartItemDTO>
