import { count, eq } from 'drizzle-orm'
import type { Product } from '@/core/domain/entities/product'
import type { IProductRepository } from '@/core/domain/repositories/product-repository.interface'
import type { DrizzleDB } from '..'
import { products } from '../schema'

export class DrizzleProductRepository implements IProductRepository {
  constructor(private readonly db: DrizzleDB) {}

  async create(
    product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Product> {
    const [result] = await this.db.insert(products).values(product).returning()

    return result
  }
  async findById(id: string): Promise<Product | null> {
    const [result] = await this.db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1)

    return result || null
  }
  async findAll(
    perPage: number = 10,
    page: number = 1,
  ): Promise<{
    data: Product[]
    meta: {
      totalItems: number
      totalPages: number
      currentPage: number
      perPage: number
    }
  }> {
    const data = await this.db
      .select()
      .from(products)
      .limit(perPage)
      .offset((page - 1) * perPage)

    const [{ count: totalItems }] = await this.db
      .select({ count: count() })
      .from(products)

    return {
      data,
      meta: {
        totalItems,
        totalPages: Math.ceil(totalItems / perPage),
        currentPage: page,
        perPage,
      },
    }
  }
  async update(
    id: string,
    product: Partial<Omit<Product, 'id'>>,
  ): Promise<void> {
    await this.db
      .update(products)
      .set({ ...product, updatedAt: new Date() })
      .where(eq(products.id, id))
  }
  async delete(id: string): Promise<void> {
    await this.db.delete(products).where(eq(products.id, id))
  }
}
