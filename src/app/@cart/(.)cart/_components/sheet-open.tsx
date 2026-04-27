'use client'

import { useRouter } from 'next/navigation'
import { Sheet } from '@/components/ui/sheet'

export const SheetOpen = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const router = useRouter()

  return (
    <Sheet
      defaultOpen
      onOpenChange={(open) => {
        if (!open) {
          router.back()
        }
      }}
    >
      {children}
    </Sheet>
  )
}
