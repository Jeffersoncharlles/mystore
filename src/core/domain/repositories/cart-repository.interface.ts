export interface ICartRepository {
  create(): Promise<void>
  update(cartId: string, productId: string, quantity: number): Promise<void>
  delete(cartId: string): Promise<void>
  get(cartId: string): Promise<{ productId: string; quantity: number }[]>
}
