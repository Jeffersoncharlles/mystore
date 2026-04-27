import { OrderService } from '@/core/application/services/order-service'
import { db } from '../database/drizzle'
import { DrizzleCartRepository } from '../database/drizzle/repositories/drizzle-cart-repository'
import { DrizzleOrderRepository } from '../database/drizzle/repositories/drizzle-order-repository'

export function makeOrderService() {
  const repositoryOrder = new DrizzleOrderRepository(db)
  const repositoryCart = new DrizzleCartRepository(db)

  const result = new OrderService(repositoryOrder, repositoryCart)
  return result
}
