'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'

import { useForm } from 'react-hook-form'
import z from 'zod'
import { finishCheckoutAction } from '@/app/actions/checkout.action'
import { Input } from '@/components/ui/input'

const creditCardSchema = z.object({
  cardNumber: z.number().min(16, 'Numero do cartão é obrigatório'),
  cardholderName: z.string().min(4, 'Nome do titular é obrigatório'),
  expiration: z.string().min(4, 'Data de validade é obrigatória'),
  cvv: z.string().min(3, 'CVV é obrigatório'),
})

export type CreditCardFormData = z.infer<typeof creditCardSchema>

export const CreditCardForm = () => {
  const queryClient = useQueryClient()
  const form = useForm<CreditCardFormData>({
    resolver: zodResolver(creditCardSchema),
    defaultValues: {
      cardNumber: 1234567890123456,
      cardholderName: 'jefferson charlles',
      expiration: '1234',
      cvv: '123',
    },
  })

  const handleOnProcessPaymentCreditCard = async (data: CreditCardFormData) => {
    try {
      const result = await finishCheckoutAction(data)
      if (result?.success) {
        queryClient.invalidateQueries({ queryKey: ['cart'] })
      }
      window.location.href = '/checkout/success'
    } catch (error) {
      console.error('Erro ao processar pagamento:', error)
    }
  }

  return (
    <form
      id="checkout-form"
      onSubmit={form.handleSubmit(handleOnProcessPaymentCreditCard)}
    >
      <div className="space-y-2">
        <label
          htmlFor="card-number"
          className="text-[12px] font-semibold tracking-widest text-muted-foreground uppercase"
        >
          CARD NUMBER
        </label>
        <Input
          id="card-number"
          type="number"
          placeholder="0000 0000 0000 0000"
          className="border-0 border-b-2 border-border rounded-none px-0 py-6 text-lg focus-visible:ring-0 focus-visible:border-foreground bg-transparent"
          {...form.register('cardNumber')}
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="cardholder-name"
          className="text-[12px] font-semibold tracking-widest text-muted-foreground uppercase"
        >
          CARDHOLDER NAME
        </label>
        <Input
          id="cardholder-name"
          placeholder="NAME AS IT APPEARS ON CARD"
          className="border-0 border-b-2 border-border rounded-none px-0 py-6 text-lg focus-visible:ring-0 focus-visible:border-foreground bg-transparent uppercase"
          {...form.register('cardholderName')}
        />
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-2">
          <label
            htmlFor="expiration"
            className="text-[12px] font-semibold tracking-widest text-muted-foreground uppercase"
          >
            EXPIRATION
          </label>
          <Input
            id="expiration"
            placeholder="MM/YY"
            className="border-0 border-b-2 border-border rounded-none px-0 py-6 text-lg focus-visible:ring-0 focus-visible:border-foreground bg-transparent"
            {...form.register('expiration')}
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="cvv"
            className="text-[12px] font-semibold tracking-widest text-muted-foreground uppercase"
          >
            CVV
          </label>
          <Input
            id="cvv"
            placeholder="123"
            className="border-0 border-b-2 border-border rounded-none px-0 py-6 text-lg focus-visible:ring-0 focus-visible:border-foreground bg-transparent"
            {...form.register('cvv')}
          />
        </div>
      </div>
    </form>
  )
}
