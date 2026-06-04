import { boolean, object, string, ZodTypeAny } from "zod/v3"

export const createApiResponseSchema = <T extends ZodTypeAny>(data: T) =>
  object({
    success: boolean(),
    data,
    meta: object({ timestamp: string().datetime() }),
  })
