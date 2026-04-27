import { eq, sql } from 'drizzle-orm'
import type { CreateCartItemDTO } from '@/core/domain/dtos/cart-dto'
import type { ICartRepository } from '@/core/domain/repositories/cart-repository.interface'
import type { DrizzleDB } from '..'
import { cartItems, products } from '../schema'

export class DrizzleCartRepository implements ICartRepository {
  constructor(private readonly db: DrizzleDB) {}

  async create(item: CreateCartItemDTO): Promise<void> {
    await this.db
      .insert(cartItems)
      .values({
        userId: item.userId,
        productId: item.productId,
        quantity: item.quantity,
        priceAtAdditionInCents: item.priceAtAdditionInCents,
      })
      .onConflictDoUpdate({
        target: [cartItems.userId, cartItems.productId],
        set: {
          quantity: sql`${cartItems.quantity} + ${item.quantity}`,
          priceAtAdditionInCents: item.priceAtAdditionInCents,
          updatedAt: new Date(),
        },
      })
  }

  async findByUserId(userId: string) {
    const items = await this.db
      .select({
        productId: cartItems.productId,
        quantity: cartItems.quantity,
        priceAtAdditionInCents: cartItems.priceAtAdditionInCents,
        productName: products.name,
        productImageUrl: products.imageUrl,
        productsDescription: products.description,
      })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.userId, userId))

    if (items.length === 0) {
      return null
    }

    const totalInCents = items.reduce(
      (acc, item) => acc + item.priceAtAdditionInCents * item.quantity,
      0,
    )

    return {
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        priceAtAdditionInCents: item.priceAtAdditionInCents,
        products: {
          name: item.productName,
          imageUrl: item.productImageUrl,
          description: item.productsDescription,
        },
      })),
      totalInCents,
    }
  }

  async clearCart(userId: string): Promise<void> {
    await this.db.delete(cartItems).where(eq(cartItems.userId, userId))
  }

  async update(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<void> {
    await this.db
      .update(cartItems)
      .set({ quantity, updatedAt: new Date() })
      .where(
        sql`${cartItems.userId} = ${userId} AND ${cartItems.productId} = ${productId}`,
      )
  }

  async delete(userId: string, productId: string): Promise<void> {
    await this.db
      .delete(cartItems)
      .where(
        sql`${cartItems.userId} = ${userId} AND ${cartItems.productId} = ${productId}`,
      )
  }

  async get(userId: string) {
    const res = await this.findByUserId(userId)
    return res?.items || []
  }
}
