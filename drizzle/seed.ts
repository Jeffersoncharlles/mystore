import { pbkdf2Sync, randomBytes } from 'node:crypto'
import { db } from '@/core/infra/database/drizzle'
import {
  cartItems,
  orderItems,
  orders,
  products,
  users,
} from '@/core/infra/database/drizzle/schema'

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

    // 1. Criar usuário com email específico
    const salt = randomBytes(16)
    const passwordHash = pbkdf2Sync('12345', salt, 100000, 64, 'sha512')
    const passwordHashString = `${salt.toString('hex')}:${passwordHash.toString('hex')}`

    const createdUsers = await db
      .insert(users)
      .values({
        name: 'Test User',
        email: 'email@email.com',
        passwordHash: passwordHashString,
      })
      .returning()

    const testUserId = createdUsers[0].id

    console.log(`✅ Usuário criado: ${testUserId}`)

    // 2. Criar produtos (alguns com estoque, alguns sem)
    const productsData = [
      {
        name: 'Laptop Dell XPS 13',
        description: 'Ultrabook de alta performance com tela 4K',
        priceInCents: 599900,
        stock: 5,
        isActive: true,
      },
      {
        name: 'Mouse Wireless Logitech',
        description: 'Mouse sem fio de precisão',
        priceInCents: 3990,
        stock: 0,
        isActive: true,
      },
      {
        name: 'Teclado Mecânico RGB',
        description: 'Teclado mecânico com iluminação RGB',
        priceInCents: 45990,
        stock: 12,
        isActive: true,
      },
      {
        name: 'Monitor LG 27"',
        description: 'Monitor UltraWide 27 polegadas',
        priceInCents: 189900,
        stock: 0,
        isActive: true,
      },
      {
        name: 'Webcam HD 1080p',
        description: 'Webcam para streaming e videochamadas',
        priceInCents: 12990,
        stock: 8,
        isActive: true,
      },
      {
        name: 'Headset Gamer',
        description: 'Headset com som 7.1 e microfone',
        priceInCents: 34990,
        stock: 3,
        isActive: true,
      },
    ]

    const createdProducts = await db
      .insert(products)
      .values(productsData)
      .returning()

    console.log(`✅ ${createdProducts.length} produtos criados`)

    // 3. Criar ordens com diferentes status
    const ordersToCreate = [
      {
        status: 'pending' as const,
        totalInCents: createdProducts[0].priceInCents,
      },
      {
        status: 'paid' as const,
        totalInCents:
          createdProducts[2].priceInCents + createdProducts[4].priceInCents,
      },
      {
        status: 'failed' as const,
        totalInCents:
          createdProducts[1].priceInCents + createdProducts[5].priceInCents,
      },
      {
        status: 'paid' as const,
        totalInCents: createdProducts[3].priceInCents,
      },
      {
        status: 'pending' as const,
        totalInCents: createdProducts[5].priceInCents * 2,
      },
    ]

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
        quantity: 1,
        priceAtPurchaseInCents: createdProducts[1].priceInCents,
      },
      {
        orderId: createdOrders[2].id,
        productId: createdProducts[5].id,
        quantity: 1,
        priceAtPurchaseInCents: createdProducts[5].priceInCents,
      },
      {
        orderId: createdOrders[3].id,
        productId: createdProducts[3].id,
        quantity: 1,
        priceAtPurchaseInCents: createdProducts[3].priceInCents,
      },
      {
        orderId: createdOrders[4].id,
        productId: createdProducts[5].id,
        quantity: 2,
        priceAtPurchaseInCents: createdProducts[5].priceInCents,
      },
    ]

    await db.insert(orderItems).values(orderItemsToCreate)

    console.log(`✅ ${orderItemsToCreate.length} itens de ordem criados`)

    // 5. Criar cart items
    const cartItemsToCreate = [
      {
        userId: testUserId,
        productId: createdProducts[0].id,
        quantity: 1,
        priceAtAdditionInCents: createdProducts[0].priceInCents,
      },
      {
        userId: testUserId,
        productId: createdProducts[2].id,
        quantity: 1,
        priceAtAdditionInCents: createdProducts[2].priceInCents,
      },
      {
        userId: testUserId,
        productId: createdProducts[4].id,
        quantity: 3,
        priceAtAdditionInCents: createdProducts[4].priceInCents,
      },
    ]

    await db.insert(cartItems).values(cartItemsToCreate)

    console.log(`✅ ${cartItemsToCreate.length} itens de carrinho criados`)

    console.log('\n🎉 Seed concluído com sucesso!\n')
    console.log('📊 Resumo:')
    console.log('   Email: email@email.com')
    console.log('   Senha: 12345')
    console.log(`   Produtos: ${createdProducts.length}`)
    console.log('   - 2 sem estoque')
    console.log('   - 4 com estoque')
    console.log(`   Ordens: ${createdOrders.length}`)
    console.log('   - 2 pending')
    console.log('   - 2 paid')
    console.log('   - 1 failed')
    console.log(`   Itens de ordem: ${orderItemsToCreate.length}`)
    console.log(`   Itens de carrinho: ${cartItemsToCreate.length}`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Erro ao fazer seed:', error)
    process.exit(1)
  }
}

seed()
