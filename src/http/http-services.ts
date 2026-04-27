import type { ProductResponseDTO } from '@/core/domain/dtos/product-dto'
import type { Product } from '@/core/domain/entities/product'

export const getAllProducts = async ({
  page,
  limit = 10,
}: {
  page?: number
  limit: number
}): Promise<ProductResponseDTO> => {
  if (page) {
    const response = await fetch(`/api/products?page=${page}&limit=${limit}`, {
      method: 'GET',
    })
    const data: ProductResponseDTO = await response.json()
    return data
  }

  const response = await fetch(`/api/products`, {
    method: 'GET',
  })
  const data: ProductResponseDTO = await response.json()
  return data
}

export const getProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`/api/products/${id}`, {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch product')
  }

  const data: Product = await response.json()
  return data
}
