import { CartService } from '@/core/application/services/cart-service'
import { db } from '../database/drizzle'
import { DrizzleCartRepository } from '../database/drizzle/repositories/drizzle-cart-repository'
import { DrizzleProductRepository } from '../database/drizzle/repositories/drizzle-product-repository'

export function makeCartService() {
  const repositoryCart = new DrizzleCartRepository(db)
  const productRepository = new DrizzleProductRepository(db)
  const result = new CartService(repositoryCart, productRepository)
  return result
}
