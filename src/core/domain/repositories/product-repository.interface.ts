import type { Product } from '../entities/product'

export interface IProductRepository {
  create(
    product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Product>
  findById(id: string): Promise<Product | null>
  findAll(
    perPage?: number,
    page?: number,
  ): Promise<{
    data: Product[]
    meta: {
      totalItems: number
      totalPages: number
      currentPage: number
      perPage: number
    }
  }>
  update(id: string, product: Partial<Omit<Product, 'id'>>): Promise<void>
  delete(id: string): Promise<void>
}
