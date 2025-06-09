"use client"
import React from "react"
import FooterSection from "./sections/FooterSection"
import Navbar from "./sections/Navbar"

export default function LandingRootLayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-[#F4F6F8]">{children}</main>
        <FooterSection />
      </div>
    </div>
  )
}
