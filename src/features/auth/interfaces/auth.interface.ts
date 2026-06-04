import z from "zod/v3"

export const LoginRequestSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string(),
})

export const AuthDataSchema = z.object({
  access_token: z.string(),
  refreshToken: z.string(),
})

export const LoginResponseSchema = z.object({
  success: z.boolean(),
  data: AuthDataSchema,
  meta: z.object({
    timestamp: z.string(),
  }),
})

export const UserSessionSchema = z.object({
  username: z.string(),
  sub: z.number().int(),
  v: z.number().int(),
  role: z.string(),
  iat: z.number(),
  exp: z.number(),
})

export type LoginRequestDTO = z.infer<typeof LoginRequestSchema>
export type AuthDataDTO = z.infer<typeof AuthDataSchema>
export type LoginResponseDTO = z.infer<typeof LoginResponseSchema>
export type UserSessionDTO = z.infer<typeof UserSessionSchema>
