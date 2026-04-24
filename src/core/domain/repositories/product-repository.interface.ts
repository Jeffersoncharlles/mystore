import type { Product } from '../entities/product'

export interface IProductRepository {
  create(
    product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Product>
  findById(id: string): Promise<Product | null>
  findAll(): Promise<Product[]>
  update(id: string, product: Partial<Omit<Product, 'id'>>): Promise<void>
  delete(id: string): Promise<void>
}
