"use client"
import React from "react"
import Header from "../(landing-page)/_components/header"

export default function AdsRootLayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}
