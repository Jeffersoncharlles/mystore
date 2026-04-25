import type { ICartRepository } from '@/core/domain/repositories/cart-repository.interface'

export class DrizzleCartRepository implements ICartRepository {
  update(cartId: string, productId: string, quantity: number): Promise<void> {
    throw new Error('Method not implemented.')
  }
  delete(cartId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
  get(cartId: string): Promise<{ productId: string; quantity: number }[]> {
    throw new Error('Method not implemented.')
  }
  async create(): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
