import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { PageTransition } from "@/components/motion/page-transition"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display-raw",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Portfolio | Ingénieur Électronique & IA",
  description: "Portfolio professionnel - Électronique appliquée, Informatique industrielle, Intelligence Artificielle",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${spaceGrotesk.variable} font-sans antialiased bg-background text-foreground`}>
        <PageTransition>{children}</PageTransition>
        <Analytics />
      </body>
    </html>
  )
}
