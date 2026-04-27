'use client'

import { useQueryClient } from '@tanstack/react-query'
import { finishCheckoutAction } from '@/app/actions/checkout.action'

export const PixForm = () => {
  const queryClient = useQueryClient()

  const handlePixPayment = async () => {
    const mockData = {
      cardNumber: '0000000000000000',
      cardholderName: 'PIX PAYMENT',
      expiration: '00/00',
      cvv: '000',
    }

    await finishCheckoutAction(mockData as any)
    queryClient.invalidateQueries({ queryKey: ['cart'] })
    alert('Pagamento via PIX nao foi finalizado! tente novamente')
  }

  return (
    <div className="space-y-4">
      <span className="text-sm text-muted-foreground">
        To pay with PIX, please scan the QR code below using your banking app.
      </span>

      <div className="w-full h-auto bg-muted rounded-lg flex items-center justify-center p-8">
        <span className="text-sm text-muted-foreground">
          [QR Code Placeholder]
        </span>
      </div>
      <form
        id="checkout-form"
        onSubmit={(e) => {
          e.preventDefault()
          handlePixPayment()
        }}
      />
    </div>
  )
}
