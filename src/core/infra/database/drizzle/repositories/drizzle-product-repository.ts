import { eq } from 'drizzle-orm'
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
  async findAll(): Promise<Product[]> {
    return await this.db.select().from(products)
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
