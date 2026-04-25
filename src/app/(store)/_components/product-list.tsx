'use client'

import { useEffect, useState } from 'react'
import { ProductCard } from '@/components/product-card'
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
  const [page, setPage] = useState(1)
  const [product, setProduct] = useState<ProductResponseDTO['data'] | null>(
    null,
  )
  const [meta, setMeta] = useState<ProductResponseDTO['meta'] | null>(null)

  useEffect(() => {
    getAllProducts({ page, limit: 10 }).then((response) => {
      setProduct(response.data)
      setMeta(response.meta)
    })
  }, [page])

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (meta?.totalPages || 1)) {
      setPage(newPage)
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
            isActive={pageNum === currentPage}
            className="cursor-pointer"
          >
            {String(pageNum).padStart(2, '0')}
          </PaginationLink>
        </PaginationItem>
      ),
    )
  }

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-24">
        {product?.map((product) => (
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
