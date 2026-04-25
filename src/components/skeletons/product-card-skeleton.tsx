import { Skeleton } from '../ui/skeleton'

export const ProductCardSkeleton = () => {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-24">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index.toString()}
            className="flex flex-col gap-2 group cursor-pointer"
          >
            <div className="aspect-3/4 overflow-hidden bg-muted relative">
              <Skeleton className="w-full h-full" />
            </div>

            <div className="flex justify-between items-start pt-2">
              <div className="flex flex-col gap-1">
                <Skeleton className="w-16 h-4" />

                <Skeleton className="w-32 h-6" />
              </div>

              <Skeleton className="w-12 h-4" />
            </div>

            <Skeleton className="w-full h-12" />
          </div>
        ))}
      </section>

      <section className="border-t-2 border-foreground pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm font-medium tracking-widest uppercase">
          <Skeleton className="w-40 h-4" />
        </div>

        <nav className="mx-auto flex w-full justify-center">
          <div className="flex items-center gap-6">
            <Skeleton className="w-24 h-10" />
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index.toString()} className="w-10 h-10" />
              ))}
            </div>
            <Skeleton className="w-16 h-10" />
          </div>
        </nav>
      </section>
    </>
  )
}
