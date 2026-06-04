import { PriceFormatterProps } from "@/interfaces/price.interface"
import { useMemo } from "react"

export const usePriceFormatter = ({
  locale = "es-MX",
  currency = "MXN",
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
}: PriceFormatterProps) => {
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
