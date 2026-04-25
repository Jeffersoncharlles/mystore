import type { ICartRepository } from '@/core/domain/repositories/cart-repository.interface'
import type { IProductRepository } from '@/core/domain/repositories/product-repository.interface'

export class CartService {
  constructor(
    private cartRepository: ICartRepository,
    private productRepository: IProductRepository,
  ) {}

  async addItemToCart(productId: string, quantity: number) {}
}
