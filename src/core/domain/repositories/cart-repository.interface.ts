import type { CreateCartItemDTO } from '../dtos/cart-dto'

export interface ICartRepository {
  create(item: CreateCartItemDTO): Promise<void>
  findByUserId(userId: string): Promise<{
    items: {
      productId: string
      quantity: number
      priceAtAdditionInCents: number
    }[]
    totalInCents: number
  } | null>
  clearCart(userId: string): Promise<void>
  update(userId: string, productId: string, quantity: number): Promise<void>
  delete(userId: string, productId: string): Promise<void>
}
