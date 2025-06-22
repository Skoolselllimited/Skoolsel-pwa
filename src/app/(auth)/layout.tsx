import React from "react"
import Header from "../(landing-page)/_components/header"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Header />
      <div className="min-h-[calc(100vh-100px)]">
        {children} {/* This is where your page.tsx content will be rendered */}
      </div>
    </div>
  )
}
