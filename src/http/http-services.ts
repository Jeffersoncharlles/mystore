import type { ProductResponseDTO } from '@/core/domain/dtos/product-dto'

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
