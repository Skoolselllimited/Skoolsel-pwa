"use client"
import React from "react"
import UserWrapper from "."

export default function UserRootLayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <UserWrapper>{children}</UserWrapper>
}
