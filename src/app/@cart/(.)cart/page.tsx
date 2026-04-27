import { CardList } from '@/components/cart-list'

import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { SheetOpen } from './_components/sheet-open'

const CartSheetPage = () => {
  return (
    <aside>
      <SheetOpen>
        <SheetContent className="w-100 sm:w-135">
          <SheetHeader>
            <SheetTitle>SEU CARRINHO</SheetTitle>
          </SheetHeader>
          <main className="lg:col-span-5">
            <div className=" p-8 space-y-8 sticky top-24">
              <CardList />

              <div className="bg-muted p-4 border border-border">
                <p className="text-[10px] font-bold text-muted-foreground tracking-tight uppercase leading-relaxed">
                  SYSTEM LOGIC:{' '}
                  <span className="font-normal text-[9px] tracking-normal leading-normal">
                    UPON CLICKING &apos;FINISH PAYMENT&apos;, OUR GATEWAY
                    INITIATES A REAL-TIME VALIDATION. IF SUCCESSFUL, INVENTORY
                    IS DECREMENTED INSTANTLY VIA ATOMIC DATABASE LOCKING TO
                    PREVENT OVERSELLING DURING HIGH-TRAFFIC DROPS. IN CASE OF
                    FAILURE (INSUFFICIENT FUNDS/TIMEOUT), THE STOCK HOLD IS
                    RELEASED WITHIN 120 SECONDS.
                  </span>
                </p>
              </div>
            </div>
          </main>
        </SheetContent>
      </SheetOpen>
    </aside>
  )
}

export default CartSheetPage
