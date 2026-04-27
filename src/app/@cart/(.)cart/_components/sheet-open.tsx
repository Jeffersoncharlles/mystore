'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Sheet } from '@/components/ui/sheet'

export const SheetOpen = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Sheet
      defaultOpen
      onOpenChange={(open) => {
        if (!open && pathname.includes('/cart')) {
          router.back()
        }
      }}
    >
      {children}
    </Sheet>
  )
}
