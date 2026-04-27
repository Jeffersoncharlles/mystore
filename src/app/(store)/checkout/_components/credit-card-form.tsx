'use client'

import { Input } from '@/components/ui/input'

export const CreditCardForm = () => {
  return (
    <>
      <div className="space-y-2">
        <label
          htmlFor="card-number"
          className="text-[12px] font-semibold tracking-widest text-muted-foreground uppercase"
        >
          CARD NUMBER
        </label>
        <Input
          id="card-number"
          placeholder="0000 0000 0000 0000"
          className="border-0 border-b-2 border-border rounded-none px-0 py-6 text-lg focus-visible:ring-0 focus-visible:border-foreground bg-transparent"
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
          />
        </div>
      </div>
    </>
  )
}
