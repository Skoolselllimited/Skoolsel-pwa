"use client"

import Lottie from "lottie-react"
import React from "react"
import pageloader from "./pageLoader.json"

export default function PageLoader() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Lottie animationData={pageloader} loop={true} />;
    </div>
  )
}
