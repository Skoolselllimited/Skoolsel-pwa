import type { Metadata } from "next"
import localFont from "next/font/local"
import type { ReactNode } from "react"
import "./globals.css"

const circularStd = localFont({
  src: [
    { path: "/fonts/CircularStd-Book.woff2", weight: "400", style: "normal" },
    {
      path: "/fonts/CircularStd-BookItalic.woff2",
      weight: "400",
      style: "italic",
    },
    { path: "/fonts/CircularStd-Medium.woff2", weight: "500", style: "normal" },
    {
      path: "/fonts/CircularStd-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    { path: "/fonts/CircularStd-Bold.woff2", weight: "700", style: "normal" },
    {
      path: "/fonts/CircularStd-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    { path: "/fonts/CircularStd-Black.woff2", weight: "900", style: "normal" },
    {
      path: "/fonts/CircularStd-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  display: "swap",
  preload: true,
  variable: "--font-circular-std",
})

export const metadata: Metadata = {
  title: "Skoolsel",
  description: "Number One Students Marketplace",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={` ${circularStd.variable}`}>
      <head />
      <body className={`${circularStd.className} antialiased`}>{children}</body>
    </html>
  )
}
