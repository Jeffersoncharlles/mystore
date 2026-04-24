import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-border bg-background py-12 px-4 md:px-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center">
          <Link href="/" className="font-heading text-xl font-black uppercase">
            MYSTORE
          </Link>
        </div>

        <nav className="flex flex-wrap justify-center gap-8">
          <Link
            href="/privacy"
            className="text-[12px] font-bold tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            PRIVACY
          </Link>
          <Link
            href="/terms"
            className="text-[12px] font-bold tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            TERMS
          </Link>
          <Link
            href="/shipping"
            className="text-[12px] font-bold tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            SHIPPING
          </Link>
          <Link
            href="/contact"
            className="text-[12px] font-bold tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            CONTACT
          </Link>
        </nav>

        <div className="text-[12px] font-bold tracking-widest uppercase text-muted-foreground">
          © 2024 MYSTORE. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  )
}
