import type { ICartRepository } from '@/core/domain/repositories/cart-repository.interface'
import type { IProductRepository } from '@/core/domain/repositories/product-repository.interface'
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error'

export class CartService {
  constructor(
    private cartRepository: ICartRepository,
    private productRepository: IProductRepository,
  ) {}

  async addItemToCart(productId: string, quantity: number, userId: string) {
    const product = await this.productRepository.findById(productId)

    if (!product) {
      throw new ResourceNotFoundError()
    }

    if (product.stock < quantity) {
      throw new Error('Estoque insuficiente para esta operação.')
    }

    const cartItem = {
      userId,
      productId,
      quantity,
      priceAtAdditionInCents: product.priceInCents,
    }
    return await this.cartRepository.create(cartItem)
  }

  async getCartItemsByUserId(userId: string) {
    const cart = await this.cartRepository.findByUserId(userId)

    if (!cart) {
      return { items: [], totalInCents: 0 }
    }

    return {
      ...cart,
    }
  }
}
