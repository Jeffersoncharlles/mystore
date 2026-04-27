import z from 'zod'

export const CreateProductDTO = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(5, 'Description is required'),
  imageUrl: z.string().url('Image URL must be a valid URL').nullable(),
  priceInCents: z.number().int().positive('Price must be a positive integer'),
  stock: z.number().int().min(0, 'Stock must be a non-negative integer'),
})

export type CreateProductDTO = z.infer<typeof CreateProductDTO>

export const ProductResponseDTO = z.object({
  data: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      description: z.string(),
      imageUrl: z.string().url().optional(),
      priceInCents: z.number().int().positive(),
      stock: z.number().int().min(0),
      isActive: z.boolean(),
    }),
  ),
  meta: z.object({
    totalItems: z.number().int().nonnegative(),
    totalPages: z.number().int().nonnegative(),
    currentPage: z.number().int().nonnegative(),
    perPage: z.number().int().positive(),
  }),
})

export type ProductResponseDTO = z.infer<typeof ProductResponseDTO>

export const UpdateProductDTO = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  description: z.string().min(5, 'Description is required').optional(),
  imageUrl: z
    .string()
    .url('Image URL must be a valid URL')
    .nullable()
    .optional(),
  priceInCents: z
    .number()
    .int()
    .positive('Price must be a positive integer')
    .optional(),
  stock: z
    .number()
    .int()
    .min(0, 'Stock must be a non-negative integer')
    .optional(),
  isActive: z.boolean().optional(),
})

export type UpdateProductDTO = z.infer<typeof UpdateProductDTO>
