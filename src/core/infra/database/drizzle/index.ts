import { drizzle } from 'drizzle-orm/node-postgres'
import { env } from '@/shared/env'
import * as schema from './schema'

export const db = drizzle(env.DATABASE_URL, {
  schema,
  //  logger: true
})

export type DrizzleDB = typeof db
