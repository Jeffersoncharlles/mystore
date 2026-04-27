'use server'

import z from 'zod'
import { makeOrderService } from '@/core/infra/factories/order-factory'
import { mockUserId } from '@/shared/mock/checkout-mock'

const creditCardSchema = z.object({
  cardNumber: z.number().min(16, 'Numero do cartão é obrigatório'),
  cardholderName: z.string().min(4, 'Nome do titular é obrigatório'),
  expiration: z.string().min(4, 'Data de validade é obrigatória'),
  cvv: z.string().min(3, 'CVV é obrigatório'),
})

type CreditCardFormData = z.infer<typeof creditCardSchema>

export const finishCheckoutAction = async (data: CreditCardFormData) => {
  console.log('Dados do cartão recebidos no servidor:', data)
  const validated = creditCardSchema.safeParse(data)

  if (!validated.success) {
    const { fieldErrors } = z.flattenError(validated.error)
    return {
      success: false,
      errors: fieldErrors,
      msg: 'Dados de cartão inválidos',
    }
  }
  const userId = mockUserId

  try {
    await makeOrderService().checkout(userId)

    return { success: true }
  } catch (error) {
    console.error('Erro ao finalizar checkout:', error)
  }
}
