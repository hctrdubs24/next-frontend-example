"use client"

import { useAuthProvider } from "@/features/auth/hooks/use-auth-provider.hook"
import { ReactNode } from "react"

type AuthProviderProps = {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { isInitializing } = useAuthProvider()

  if (isInitializing) {
    return (
      <main className="flex h-screen w-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-50 border-t-transparent"></div>
      </main>
    )
  }

  return <>{children}</>
}
