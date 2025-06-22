"use client"
import React from "react"
import dynamic from "next/dynamic"

const PageLoader = dynamic(() => import("@/components/Lottie/pageLoader"), {
  ssr: false,
})

export default function Loader() {
  return <PageLoader />
}
