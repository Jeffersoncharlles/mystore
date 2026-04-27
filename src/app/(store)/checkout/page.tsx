import { CardList } from '@/components/cart-list'
import { CreditCardForm } from './_components/credit-card-form'

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
              <CreditCardForm />
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

            <CardList />

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
