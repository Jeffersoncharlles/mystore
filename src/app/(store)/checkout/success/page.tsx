import { Check } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function SuccessPage() {
  return (
    <div className="flex flex-col justify-center items-center h-90 space-y-4">
      <h1 className="text-4xl text-green-500">Checkout Success</h1>
      <Check className="h-10 w-10 text-green-500" />
      <p>Your payment was successful!</p>
      <Link href="/">
        <Button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Continue Shopping
        </Button>
      </Link>
    </div>
  )
}
