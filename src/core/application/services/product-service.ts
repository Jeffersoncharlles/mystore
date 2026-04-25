import type { CreateProductDTO } from '@/core/domain/dtos/product-dto'
import type { Product } from '@/core/domain/entities/product'
import type { IProductRepository } from '@/core/domain/repositories/product-repository.interface'

export class ProductService {
  constructor(private productRepository: IProductRepository) {}

  async createProduct(data: CreateProductDTO) {
    const productEntity: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
      priceInCents: Math.round(data.priceInCents * 100),
      stock: data.stock,
      isActive: true,
    }

    const savedProduct = await this.productRepository.create(productEntity)
    return savedProduct
  }

  async getAllProducts({ perPage, page }: { perPage?: number; page?: number }) {
    return await this.productRepository.findAll(perPage, page)
  }
}
