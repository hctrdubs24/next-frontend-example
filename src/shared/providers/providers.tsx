import { ThemeProvider } from "@/shared/components/theme-provider"
import { QueryProvider } from "@/lib/react-query/query-provider"
import StoreProvider from "@/lib/redux/store-provider"
import { FC, ReactNode } from "react"

type ProvidersProps = {
  children: ReactNode
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <StoreProvider>
      <QueryProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </QueryProvider>
    </StoreProvider>
  )
}
