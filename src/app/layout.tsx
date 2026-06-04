import { cn } from "@/lib/utils"
import { Geist, JetBrains_Mono } from "next/font/google"
import { ReactNode } from "react"
import { Providers } from "@/shared/providers/providers"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

const fontSans = Geist({ subsets: ["latin"], variable: "--font-sans" })

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontSans.variable,
        "font-mono",
        jetbrainsMono.variable
      )}
    >
      <body>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}
