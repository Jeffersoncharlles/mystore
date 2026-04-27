import { type NextRequest, NextResponse } from 'next/server'
import { makeProductService } from '@/core/infra/factories/product-factory'

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params
    const productService = makeProductService()
    const product = await productService.getProductById(id)

    if (!product) {
      return new Response(JSON.stringify({ error: 'Product not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    return NextResponse.json(product)
  } catch (_error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch product' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
