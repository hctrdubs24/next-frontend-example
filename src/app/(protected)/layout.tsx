import AuthProvider from "@/features/auth/components/auth-provider"
import { ReactNode } from "react"

type ProtectedLayoutProps = {
  children: ReactNode
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return <AuthProvider>{children}</AuthProvider>
}
