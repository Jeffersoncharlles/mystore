import { type NextRequest, NextResponse } from 'next/server'
import z from 'zod'
import { makeProductService } from '@/core/infra/factories/product-factory'

const schemaRequestParams = z.object({
  page: z.coerce.number().optional().default(1),
  perPage: z.coerce.number().optional().default(10),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const queryParams = Object.fromEntries(searchParams.entries())
    console.log('Received query parameters:', queryParams)
    const result = schemaRequestParams.safeParse(queryParams)

    if (!result.success) {
      return new Response(
        JSON.stringify({ error: 'Invalid query parameters' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }
    const { page, perPage } = result.data

    const productService = makeProductService()
    const products = await productService.getAllProducts({ perPage, page })

    return NextResponse.json(products)
  } catch (_error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch products' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
