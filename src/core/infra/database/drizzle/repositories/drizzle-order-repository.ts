import { and, eq, gte, sql } from 'drizzle-orm'
import type { CreateOrderDTO } from '@/core/domain/dtos/order-dto'

import type { IOrderRepository } from '@/core/domain/repositories/order-repository.interface'
import type { DrizzleDB } from '..'
import { orderItems, orders, products } from '../schema'

export class DrizzleOrderRepository implements IOrderRepository {
  constructor(private readonly db: DrizzleDB) {}

  async create(data: CreateOrderDTO) {
    return await this.db.transaction(async (tx) => {
      const [order] = await tx
        .insert(orders)
        .values({
          userId: data.userId,
          status: 'pending',
          totalInCents: data.items.reduce(
            (acc, i) => acc + i.priceAtPurchaseInCents * i.quantity,
            0,
          ),
        })
        .returning()

      for (const item of data.items) {
        const [product] = await tx
          .update(products)
          .set({ stock: sql`${products.stock} - ${item.quantity}` })
          .where(
            and(
              eq(products.id, item.productId),
              gte(products.stock, item.quantity),
            ),
          )
          .returning()

        if (!product) {
          throw new Error(
            `Estoque insuficiente para o produto ${item.productId}`,
          )
        }

        await tx.insert(orderItems).values({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          priceAtPurchaseInCents: item.priceAtPurchaseInCents,
        })
      }

      return order
    })
  }
}
