import z from "zod/v3"
import { createApiResponseSchema } from "@/interfaces/global.interface"

export const RegisterUserRequestSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  name: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
})

export const RegisterUserFormSchema = RegisterUserRequestSchema.extend({
  confirmPassword: z.string().min(1, "You must confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export const RegisterUserResponseSchema = createApiResponseSchema(
  RegisterUserRequestSchema
)

export type RegisterUserFormDTO = z.input<typeof RegisterUserFormSchema>
export type RegisterUserRequestDTO = z.input<typeof RegisterUserRequestSchema>
export type RegisterUserResponseDTO = z.output<
  typeof RegisterUserResponseSchema
>
