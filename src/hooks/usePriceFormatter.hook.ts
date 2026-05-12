import { useMemo } from "react"

export type Currency = "USD" | "MXN" | "EUR" | string
export type Locale = "en-US" | "es-MX" | "fr-FR" | string

interface Props {
  locale?: Locale
  currency?: Currency
  minimumFractionDigits?: number
  maximumFractionDigits?: number
}

export const usePriceFormatter = ({
  locale = "es-MX",
  currency = "MXN",
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
}: Props) => {
  const formatPrice = useMemo(() => {
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits,
      maximumFractionDigits,
    })

    return (price: number) => formatter.format(price)
  }, [locale, currency, minimumFractionDigits, maximumFractionDigits])

  return { formatPrice }
}
