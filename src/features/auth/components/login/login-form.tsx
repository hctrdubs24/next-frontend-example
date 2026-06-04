"use client"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useLogin } from "@/features/auth/hooks/use-auth.hook"
import {
  LoginRequestDTO,
  LoginRequestSchema,
} from "@/features/auth/interfaces/auth.interface"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

export const LoginForm = () => {
  const { handleSubmit, control } = useForm<LoginRequestDTO>({
    resolver: zodResolver(LoginRequestSchema),
    defaultValues: { email: "", password: "" },
  })

  const { mutate: login, isPending, error } = useLogin()

  const onSubmit = (data: LoginRequestDTO) => login(data)

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-5"
    >
      <FieldGroup>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field aria-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                disabled={isPending}
                {...field}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field aria-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                disabled={isPending}
                {...field}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {error && <FieldError>{error.message}</FieldError>}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Logging in..." : "Log in"}
      </Button>
    </form>
  )
}
