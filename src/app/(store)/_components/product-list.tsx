'use client'

import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ProductCard } from '@/components/product-card'
import { ProductCardSkeleton } from '@/components/skeletons/product-card-skeleton'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import type { ProductResponseDTO } from '@/core/domain/dtos/product-dto'
import { getAllProducts } from '@/http/http-services'

export const ProductList = () => {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()

  const currentPageFromUrl = Number(searchParams.get('page')) || 1

  const { data: product, isLoading } = useQuery<ProductResponseDTO>({
    queryKey: ['products', currentPageFromUrl],
    queryFn: async () =>
      getAllProducts({ page: currentPageFromUrl, limit: 12 }),
  })

  const meta = product?.meta

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (meta?.totalPages || 1)) {
      const params = new URLSearchParams(searchParams)
      params.set('page', newPage.toString())

      replace(`${pathName}?${params.toString()}`, { scroll: false })

      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const renderPageNumbers = () => {
    if (!meta) return null

    const pages: (number | string)[] = []
    const { currentPage, totalPages } = meta
    const maxPagesToShow = 4

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= 3; i++) {
          pages.push(i)
        }
        pages.push('ellipsis-end')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 1) {
        pages.push(1)
        pages.push('ellipsis-start')
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('ellipsis-start')
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push('ellipsis-end')
        pages.push(totalPages)
      }
    }

    return pages.map((pageNum) =>
      typeof pageNum === 'string' ? (
        <PaginationItem key={pageNum}>
          <PaginationEllipsis />
        </PaginationItem>
      ) : (
        <PaginationItem key={`page-${pageNum}`}>
          <PaginationLink
            onClick={() => handlePageChange(pageNum)}
            isActive={pageNum === currentPageFromUrl}
            className="cursor-pointer"
          >
            {String(pageNum).padStart(2, '0')}
          </PaginationLink>
        </PaginationItem>
      ),
    )
  }

  if (isLoading && !product) {
    return <ProductCardSkeleton />
  }

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-24">
        {product?.data.map((product) => (
          <ProductCard key={product.id} props={product} />
        ))}
      </section>

      <section className="border-t-2 border-foreground pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {meta && (
          <div className="text-sm font-medium tracking-widest uppercase">
            PAGE {String(meta.currentPage).padStart(2, '0')} OF{' '}
            {String(meta.totalPages).padStart(2, '0')}
          </div>
        )}

        <Pagination>
          <PaginationContent className="flex items-center gap-6">
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange((meta?.currentPage || 1) - 1)}
                className={
                  !meta || meta.currentPage === 1
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
                text="PREVIOUS"
              />
            </PaginationItem>

            {renderPageNumbers()}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange((meta?.currentPage || 1) + 1)}
                className={
                  !meta || meta.currentPage === meta.totalPages
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
                text="NEXT"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </>
  )
}
