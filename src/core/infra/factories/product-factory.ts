import { ProductService } from '@/core/application/services/product-service'
import { db } from '../database/drizzle'
import { DrizzleProductRepository } from '../database/drizzle/repositories/drizzle-product-repository'

export function makeProductService() {
  const repository = new DrizzleProductRepository(db)
  const result = new ProductService(repository)
  return result
}
