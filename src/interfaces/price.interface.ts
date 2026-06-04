import {
  union,
  literal,
  string,
  object,
  number,
  infer as inferZod,
} from "zod/v3"

const CurrencySchema = union([
  literal("USD"),
  literal("MXN"),
  literal("EUR"),
  string(),
])

const LocaleSchema = union([
  literal("en-US"),
  literal("es-MX"),
  literal("fr-FR"),
  string(),
])

export const PropsSchema = object({
  locale: LocaleSchema.optional(),
  currency: CurrencySchema.optional(),
  minimumFractionDigits: number().int().nonnegative().optional(),
  maximumFractionDigits: number().int().nonnegative().optional(),
})

export type PriceFormatterProps = inferZod<typeof PropsSchema>
