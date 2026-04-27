'use client'

import { useState } from 'react'
import { CreditCardForm } from './credit-card-form'
import { PixForm } from './pix-form'

export const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('card')

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <span className="text-[12px] font-semibold tracking-widest text-muted-foreground uppercase">
          01 / PAYMENT METHOD
        </span>

        <div className="flex border-2 border-foreground p-0.5">
          <button
            type="button"
            className={`flex-1 py-4 text-center font-medium tracking-tight uppercase transition-colors ${
              paymentMethod === 'card'
                ? 'bg-foreground text-background'
                : 'hover:bg-muted'
            }`}
            onClick={() => setPaymentMethod('card')}
          >
            CREDIT CARD
          </button>
          <button
            type="button"
            className={`flex-1 py-4 text-center font-medium tracking-tight uppercase transition-colors ${
              paymentMethod === 'pix'
                ? 'bg-foreground text-background'
                : 'hover:bg-muted'
            }`}
            onClick={() => setPaymentMethod('pix')}
          >
            PIX
          </button>
        </div>
      </div>

      <div className="space-y-8 pt-2">
        {paymentMethod === 'card' ? <CreditCardForm /> : <PixForm />}
      </div>
    </div>
  )
}
