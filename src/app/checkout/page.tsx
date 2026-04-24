import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SUMMARY_ITEMS } from '@/shared/utils/product-image'

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 md:px-12 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Section: Payment Method */}
        <div className="lg:col-span-7 space-y-12 pb-12 lg:pb-0">
          <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight uppercase">
            CHECKOUT
          </h1>

          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-[12px] font-semibold tracking-widest text-muted-foreground uppercase">
                01 / PAYMENT METHOD
              </span>

              <div className="flex border-2 border-foreground p-[2px]">
                <button
                  type="button"
                  className="flex-1 bg-foreground text-background py-4 text-center font-medium tracking-tight uppercase transition-colors"
                >
                  CREDIT CARD
                </button>
                <button
                  type="button"
                  className="flex-1 hover:bg-muted py-4 text-center font-medium tracking-tight uppercase transition-colors"
                >
                  PIX
                </button>
              </div>
            </div>

            <div className="space-y-8 pt-2">
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
            </div>
          </div>

          <div className="pt-12 border-t-2 border-foreground space-y-4">
            <span className="text-[12px] font-semibold tracking-widest text-muted-foreground uppercase">
              02 / SHIPPING ADDRESS
            </span>
            <div className="text-lg uppercase leading-relaxed font-medium">
              AV. PAULISTA, 1000 — SÃO PAULO, SP
              <br />
              01310-100, BRAZIL
            </div>
            <button
              type="button"
              className="text-[12px] font-bold tracking-widest underline underline-offset-4 uppercase hover:text-muted-foreground transition-colors"
            >
              EDIT ADDRESS
            </button>
          </div>
        </div>

        {/* Right Section: Summary */}
        <aside className="lg:col-span-5">
          <div className="border-2 border-foreground p-8 space-y-8 sticky top-24">
            <div className="border-b-2 border-foreground pb-4">
              <h2 className="font-heading text-2xl font-semibold uppercase tracking-tight">
                ORDER SUMMARY
              </h2>
            </div>

            <div className="space-y-6">
              {SUMMARY_ITEMS.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="relative w-24 h-32 bg-muted shrink-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover grayscale"
                    />
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <div className="space-y-1">
                      <h4 className="text-[12px] font-semibold tracking-widest uppercase leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.details}
                      </p>
                    </div>
                    <span className="font-bold">{item.price}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-foreground pt-6 space-y-4">
              <div className="flex justify-between items-center text-muted-foreground uppercase tracking-widest text-sm">
                <span>SUBTOTAL</span>
                <span>$ 2,140.00</span>
              </div>
              <div className="flex justify-between items-center text-muted-foreground uppercase tracking-widest text-sm">
                <span>SHIPPING</span>
                <span>$ 0.00</span>
              </div>
              <div className="flex justify-between items-center pt-4">
                <span className="font-heading text-2xl font-semibold uppercase">
                  TOTAL
                </span>
                <span className="font-heading text-2xl font-semibold uppercase">
                  $ 2,140.00
                </span>
              </div>
            </div>

            <Button className="w-full h-16 text-lg tracking-[0.1em] uppercase group flex items-center justify-center gap-4">
              FINISH PAYMENT
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="bg-muted p-4 border border-border">
              <p className="text-[10px] font-bold text-muted-foreground tracking-tight uppercase leading-relaxed">
                SYSTEM LOGIC:{' '}
                <span className="font-normal text-[9px] tracking-normal leading-normal">
                  UPON CLICKING &apos;FINISH PAYMENT&apos;, OUR GATEWAY
                  INITIATES A REAL-TIME VALIDATION. IF SUCCESSFUL, INVENTORY IS
                  DECREMENTED INSTANTLY VIA ATOMIC DATABASE LOCKING TO PREVENT
                  OVERSELLING DURING HIGH-TRAFFIC DROPS. IN CASE OF FAILURE
                  (INSUFFICIENT FUNDS/TIMEOUT), THE STOCK HOLD IS RELEASED
                  WITHIN 120 SECONDS.
                </span>
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
