import { cn } from "@/lib/utils"
import { Geist, JetBrains_Mono } from "next/font/google"
import { ReactNode } from "react"
import { Providers } from "./components/providers"
import "./globals.css"

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
      </body>
    </html>
  )
}
