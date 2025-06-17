import { Toaster } from "@/components/ui/sonner"
import { siteDescription, siteUrl } from "@/config"
import type { Metadata } from "next"
import { Nunito, Nunito_Sans } from "next/font/google"
import localFont from "next/font/local"
import Script from "next/script"
import type { ReactNode } from "react"
import "./globals.css"
import React from "react"

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  display: "swap",
})

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
})
const circularStd = localFont({
  src: [
    {
      path: "../../public/fonts/CircularStd-Book.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/CircularStd-BookItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/CircularStd-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/CircularStd-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/CircularStd-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/CircularStd-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/CircularStd-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/CircularStd-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  display: "swap",
  preload: true,
  variable: "--font-circular-std",
})

export const metadata: Metadata = {
  description: siteDescription,
  alternates: {
    canonical: siteUrl,
  },
  metadataBase: new URL(siteUrl),
  title: "SkoolSel",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SkoolSel",
  url: "https://skoolsel.com",
  description: siteDescription,
  potentialAction: {
    "@type": "SearchAction",
    target: "https://skoolsel.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${nunitoSans.variable} ${circularStd.variable}`}
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1, user-scalable=0"
        />
      </head>
      <body className={`${circularStd.className} antialiased`}>
        <React.Suspense fallback={<div>Loading...</div>}>
          {children}
        </React.Suspense>
        <Toaster />
        <Script
          id="jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
