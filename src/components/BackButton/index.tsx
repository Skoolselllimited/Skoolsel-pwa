"use client"

import { ArrowLeft, ChevronLast, ChevronLeft } from "lucide-react"
import { Button } from "../ui/button"

interface BackButtonProps {
  onClick?: () => void
  className?: string
}

export default function BackButton({
  onClick,
  className = "",
}: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`h-10 w-10 rounded-full border border-[#DADDE5] bg-white cursor-pointer flex justify-center items-center ${className}`}
    >
      <ChevronLeft className="h-6 w-6 text-[#272727]" />
      <span className="sr-only">Go back</span>
    </button>
  )
}
