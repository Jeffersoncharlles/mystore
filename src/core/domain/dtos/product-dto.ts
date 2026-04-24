import z from 'zod'

export const CreateProductDTO = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(5, 'Description is required'),
  priceInCents: z.number().int().positive('Price must be a positive integer'),
  stock: z.number().int().min(0, 'Stock must be a non-negative integer'),
})

export type CreateProductDTO = z.infer<typeof CreateProductDTO>

export const ProductResponseDTO = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  isActive: z.boolean(),
})

export type ProductResponseDTO = z.infer<typeof ProductResponseDTO>
