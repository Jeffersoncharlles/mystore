import type { ResponseCartItemDTO } from '@/core/domain/dtos/cart-dto'
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

export const getCartItems = async (): Promise<ResponseCartItemDTO> => {
  const response = await fetch(`/api/cart`, {
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch cart items')
  }

  const data: ResponseCartItemDTO = await response.json()
  return data
}

export const addToCart = async (productId: string): Promise<void> => {
  const response = await fetch(`/api/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId }),
  })

  if (!response.ok) {
    throw new Error('Failed to add item to cart')
  }
}

export const updateCartItem = async ({
  productId,
  quantity,
}: {
  productId: string
  quantity: number
}): Promise<void> => {
  const response = await fetch(`/api/cart/${productId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity }),
  })

  if (!response.ok) {
    throw new Error('Failed to update cart item')
  }
}
