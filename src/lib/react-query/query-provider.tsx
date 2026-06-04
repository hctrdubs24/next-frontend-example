"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { FC, ReactNode } from "react"
import { getQueryClient } from "./query-client"

type QueryProviderProps = {
  children: ReactNode
}

export const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={getQueryClient()}>
      {children}
    </QueryClientProvider>
  )
}
