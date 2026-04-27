import { pbkdf2Sync, randomBytes } from 'node:crypto'
import { faker } from '@faker-js/faker'
import { db } from '@/core/infra/database/drizzle'
import {
  cartItems,
  orderItems,
  orders,
  products,
  users,
} from '@/core/infra/database/drizzle/schema'

// Tipo para status de ordens
type OrderStatus = 'pending' | 'paid' | 'failed'

// Função para buscar imagens de roupas do Unsplash
async function fetchUnsplashClothingImages(): Promise<string[]> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY
  if (!accessKey) {
    console.warn('⚠️  UNSPLASH_ACCESS_KEY não definida. Usando fallback.')
    return generateFallbackImages()
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=clothing+fashion+shirt&per_page=100&order_by=popular`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`)
    }

    const data = (await response.json()) as {
      results: Array<{ urls: { regular: string } }>
    }
    const images = data.results.map((photo) => photo.urls.regular)

    // Garantir que temos pelo menos 100 imagens (se temos menos, repetir)
    while (images.length < 100) {
      images.push(...images.slice(0, 100 - images.length))
    }

    return images.slice(0, 100)
  } catch (error) {
    console.warn('⚠️  Erro ao buscar imagens do Unsplash:', error)
    return generateFallbackImages()
  }
}

// Gerar URLs de fallback em caso de falha
function generateFallbackImages(): string[] {
  return Array.from(
    { length: 100 },
    (_, i) => `https://picsum.photos/400/600?random=${i + 1}`,
  )
}

// Estilos de camisas para geração variada
const shirtStyles = [
  'Classic Cotton',
  'Vintage Graphic',
  'Oversized Fit',
  'Slim Fit',
  'Relaxed Fit',
  'Crop Top',
  'Peplum',
  'Bodycon',
  'Loose Fit',
  'Fitted',
  'Striped',
  'Tie-Dye',
  'Ombre',
  'Holographic',
  'Sequin',
]

const shirtColors = [
  'Black',
  'White',
  'Navy Blue',
  'Sky Blue',
  'Red',
  'Burgundy',
  'Forest Green',
  'Olive',
  'Purple',
  'Pink',
  'Gray',
  'Charcoal',
  'Beige',
  'Cream',
  'Coral',
  'Turquoise',
  'Indigo',
  'Magenta',
  'Lime',
  'Orange',
]

const shirtMaterials = [
  'Cotton',
  'Polyester',
  'Cotton Blend',
  'Linen',
  'Silk',
  'Rayon',
  'Spandex Mix',
  'Organic Cotton',
]

const occasions = [
  'Casual',
  'Party',
  'Beach',
  'Office',
  'Gym',
  'Festival',
  'Streetwear',
  'Vintage',
  'Modern',
  'Bohemian',
]

async function seed() {
  try {
    console.log('🌱 Iniciando seed do banco de dados...')

    // Limpar dados existentes
    await db.delete(cartItems)
    await db.delete(orderItems)
    await db.delete(orders)
    await db.delete(users)
    await db.delete(products)

    console.log('🧹 Dados anteriores deletados')

    // Buscar imagens de roupas do Unsplash
    console.log('📸 Buscando imagens de roupas...')
    const clothingImages = await fetchUnsplashClothingImages()
    console.log(`✅ ${clothingImages.length} imagens carregadas`)

    // 1. Criar usuário com email e ID padrão para mock
    const testUserId = '550e8400-e29b-41d4-a716-446655440000'
    const salt = randomBytes(16)
    const passwordHash = pbkdf2Sync('12345', salt, 100000, 64, 'sha512')
    const passwordHashString = `${salt.toString('hex')}:${passwordHash.toString('hex')}`

    await db
      .insert(users)
      .values({
        id: testUserId,
        name: 'Test User',
        email: 'email@email.com',
        passwordHash: passwordHashString,
      })
      .returning()

    console.log(`✅ Usuário criado`)
    console.log(`   ID: ${testUserId}`)
    console.log(`   Email: email@email.com`)
    console.log(`   Senha: 12345`)

    // 2. Gerar 100 camisas com Faker e imagens do Unsplash
    const productsData = Array.from({ length: 100 }, (_, index) => {
      const style = faker.helpers.arrayElement(shirtStyles)
      const color = faker.helpers.arrayElement(shirtColors)
      const material = faker.helpers.arrayElement(shirtMaterials)
      const occasion = faker.helpers.arrayElement(occasions)

      return {
        name: `${color} ${style} ${occasion} Shirt #${index + 1}`,
        description: `Beautiful ${color.toLowerCase()} ${style.toLowerCase()} shirt perfect for ${occasion.toLowerCase()} occasions. Made from premium ${material.toLowerCase()}. ${faker.lorem.sentence()}`,
        imageUrl: clothingImages[index],
        priceInCents: faker.number.int({ min: 2990, max: 12990 }),
        stock: faker.number.int({ min: 0, max: 50 }),
        isActive: true,
      }
    })

    const createdProducts = await db
      .insert(products)
      .values(productsData)
      .returning()

    console.log(`✅ ${createdProducts.length} produtos criados`)

    // 3. Criar ordens com diferentes status (usando alguns dos 100 produtos)
    const statusValues: OrderStatus[] = ['pending', 'paid', 'failed']
    const ordersToCreate = Array.from({ length: 5 }, (_, i) => ({
      status: statusValues[i % statusValues.length],
      totalInCents:
        createdProducts[i].priceInCents + createdProducts[i + 1].priceInCents,
    }))

    const createdOrders = await db
      .insert(orders)
      .values(
        ordersToCreate.map((order) => ({
          userId: testUserId,
          status: order.status,
          totalInCents: order.totalInCents,
        })),
      )
      .returning()

    console.log(`✅ ${createdOrders.length} ordens criadas`)

    // 4. Criar order items
    const orderItemsToCreate = [
      {
        orderId: createdOrders[0].id,
        productId: createdProducts[0].id,
        quantity: 1,
        priceAtPurchaseInCents: createdProducts[0].priceInCents,
      },
      {
        orderId: createdOrders[1].id,
        productId: createdProducts[2].id,
        quantity: 1,
        priceAtPurchaseInCents: createdProducts[2].priceInCents,
      },
      {
        orderId: createdOrders[1].id,
        productId: createdProducts[4].id,
        quantity: 1,
        priceAtPurchaseInCents: createdProducts[4].priceInCents,
      },
      {
        orderId: createdOrders[2].id,
        productId: createdProducts[1].id,
        quantity: 2,
        priceAtPurchaseInCents: createdProducts[1].priceInCents,
      },
      {
        orderId: createdOrders[3].id,
        productId: createdProducts[5].id,
        quantity: 1,
        priceAtPurchaseInCents: createdProducts[5].priceInCents,
      },
      {
        orderId: createdOrders[4].id,
        productId: createdProducts[10].id,
        quantity: 3,
        priceAtPurchaseInCents: createdProducts[10].priceInCents,
      },
    ]

    await db.insert(orderItems).values(orderItemsToCreate)

    console.log(`✅ ${orderItemsToCreate.length} itens de ordem criados`)

    // 5. Criar cart items com alguns dos 100 produtos
    const cartItemsToCreate = [
      {
        userId: testUserId,
        productId: createdProducts[0].id,
        quantity: 1,
        priceAtAdditionInCents: createdProducts[0].priceInCents,
      },
      {
        userId: testUserId,
        productId: createdProducts[15].id,
        quantity: 2,
        priceAtAdditionInCents: createdProducts[15].priceInCents,
      },
      {
        userId: testUserId,
        productId: createdProducts[42].id,
        quantity: 1,
        priceAtAdditionInCents: createdProducts[42].priceInCents,
      },
      {
        userId: testUserId,
        productId: createdProducts[67].id,
        quantity: 3,
        priceAtAdditionInCents: createdProducts[67].priceInCents,
      },
      {
        userId: testUserId,
        productId: createdProducts[99].id,
        quantity: 1,
        priceAtAdditionInCents: createdProducts[99].priceInCents,
      },
    ]

    await db.insert(cartItems).values(cartItemsToCreate)

    console.log(`✅ ${cartItemsToCreate.length} itens de carrinho criados`)

    // Calcular estatísticas
    const productsWithStock = createdProducts.filter((p) => p.stock > 0).length
    const productsOutOfStock = createdProducts.length - productsWithStock
    const totalInventoryValue = createdProducts.reduce(
      (sum, p) => sum + p.priceInCents * p.stock,
      0,
    )

    console.log('\n🎉 Seed concluído com sucesso!\n')
    console.log('📊 Resumo:')
    console.log(`   Total de Produtos: ${createdProducts.length} camisas`)
    console.log(`   - ${productsWithStock} com estoque`)
    console.log(`   - ${productsOutOfStock} sem estoque`)
    console.log(
      `   Valor total do inventário: R$ ${(totalInventoryValue / 100).toFixed(2)}`,
    )
    console.log(`   Ordens: ${createdOrders.length}`)
    console.log(`   Itens de ordem: ${orderItemsToCreate.length}`)
    console.log(`   Itens de carrinho: ${cartItemsToCreate.length}`)
    console.log(
      `\n💡 Todas as camisas têm imagens do Unsplash (fotos reais de roupas)`,
    )
    console.log(`   Fallback: https://picsum.photos (se Unsplash falhar)`)
    console.log(`\n🔐 Mock User ID: ${testUserId}\n`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Erro ao fazer seed:', error)
    process.exit(1)
  }
}

seed()
