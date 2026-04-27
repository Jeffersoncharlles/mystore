import { ShoppingBag, User } from 'lucide-react'
import Link from 'next/link'
import { ThemeToggle } from './theme-toogle'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-12">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-heading text-2xl font-black tracking-tighter uppercase">
              MYSTORE
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-bold tracking-tight uppercase line-through decoration-2"
          >
            SHOP
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          <ThemeToggle />

          <button
            type="button"
            className="text-foreground hover:opacity-70 transition-opacity"
          >
            <User className="h-5 w-5" />
          </button>

          <Link
            href="/cart"
            className="text-foreground hover:opacity-70 transition-opacity"
          >
            <ShoppingBag className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  )
}
