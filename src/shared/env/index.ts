import z from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().transform((val) => parseInt(val, 10)),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
})

export const env = envSchema.parse(process.env)
