import type { ICartRepository } from '@/core/domain/repositories/cart-repository.interface'
import type { IOrderRepository } from '@/core/domain/repositories/order-repository.interface'

export class OrderService {
  constructor(
    private orderRepository: IOrderRepository,
    private cartRepository: ICartRepository,
  ) {}

  async checkout(userId: string) {
    const cart = await this.cartRepository.findByUserId(userId)
    if (!cart || cart.items.length === 0) {
      throw new Error('O carrinho está vazio.')
    }

    const order = await this.orderRepository.create({
      userId,
      items: cart.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        priceAtPurchaseInCents: item.priceAtAdditionInCents,
      })),
    })

    // await this.cartRepository.clearCart(userId)

    return order
  }
}
