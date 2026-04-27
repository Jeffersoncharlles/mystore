import type { CreateOrderDTO } from '../dtos/order-dto'
import type { Order } from '../entities/Order'

export interface IOrderRepository {
  create(data: CreateOrderDTO): Promise<Order>
}
