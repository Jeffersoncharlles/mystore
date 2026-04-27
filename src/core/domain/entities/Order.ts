import z from 'zod'

export const OrderSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  totalInCents: z.number().int().default(0).nonoptional(),
  status: z.enum(['pending', 'paid', 'failed']),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type Order = z.infer<typeof OrderSchema>
