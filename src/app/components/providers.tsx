import { ThemeProvider } from "@/components/theme-provider"
import { QueryProvider } from "@/lib/react-query/query-provider"
import { FC, ReactNode } from "react"

type ProvidersProps = {
  children: ReactNode
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryProvider>
  )
}
