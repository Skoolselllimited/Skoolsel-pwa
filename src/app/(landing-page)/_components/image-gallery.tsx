"use client"

import type React from "react"

import { ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import BackButton from "@/components/BackButton"
import { HeartIcon } from "@/components/svgs"

interface ImageGalleryProps {
  images: string[]
  initialIndex: number
  isOpen: boolean
  onClose: () => void
}

export function ImageGallery({
  images,
  initialIndex,
  isOpen,
  onClose,
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isZoomed, setIsZoomed] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const touchEndY = useRef<number | null>(null)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevImage()
      } else if (e.key === "ArrowRight") {
        nextImage()
      } else if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
      setIsZoomed(false)
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setIsZoomed(false)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setIsZoomed(false)
  }

  const handleImageTap = () => {
    setIsZoomed(!isZoomed)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
    touchEndY.current = e.touches[0].clientY
  }

  const handleTouchEnd = () => {
    if (
      !touchStartX.current ||
      !touchEndX.current ||
      !touchStartY.current ||
      !touchEndY.current
    )
      return

    const diffX = touchStartX.current - touchEndX.current
    const diffY = touchStartY.current - touchEndY.current
    const threshold = 50

    // Check for swipe up to close
    if (diffY > threshold && Math.abs(diffX) < threshold) {
      onClose()
      return
    }

    // Horizontal swipe for navigation (only when not zoomed)
    if (
      Math.abs(diffX) > threshold &&
      Math.abs(diffY) < threshold &&
      !isZoomed
    ) {
      if (diffX > 0) {
        nextImage()
      } else {
        prevImage()
      }
    }

    // Reset values
    touchStartX.current = null
    touchEndX.current = null
    touchStartY.current = null
    touchEndY.current = null
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-white xl:bg-[#000000]/60 flex flex-col"
      onClick={handleBackdropClick}
    >
      {/* Header with Back Button - Mobile only */}
      <div className="xl:hidden px-[15px]">
        <div className="h-[72px] py-4 flex items-center justify-between">
          <BackButton onClick={onClose} aria-label="Go back" />
          <div className="font-circular-std font-extrabold text-[#4E4E5A] text-[20px]/[32px] tracking-normal">
            Ad Details
          </div>
          <HeartIcon className="text-[#464D61]" />
        </div>
      </div>
      {/* Main image area */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        <div
          className={`relative w-full h-full max-w-[1320px] 2xl:mt-24 max-h-[625px] mx-auto transition-transform duration-300 ease-in-out ${
            isZoomed ? "scale-150" : "scale-100"
          }`}
          onClick={handleImageTap}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={images[currentIndex]}
            alt={`Product image ${currentIndex + 1}`}
            fill
            className="object-contain cursor-pointer xl:cursor-default"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
          />
        </div>

        {/* Desktop Navigation buttons */}
        <button
          onClick={prevImage}
          className="hidden xl:flex absolute left-4 top-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full bg-transparent cursor-pointer items-center justify-center text-white transition-all duration-200"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-[60px] w-[60px]" />
        </button>

        <button
          onClick={nextImage}
          className="hidden xl:flex absolute right-4 top-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full bg-transparent cursor-pointer items-center justify-center text-white transition-all duration-200"
          aria-label="Next image"
        >
          <ChevronRight className="h-[60px] w-[60px]" />
        </button>

        {/* Desktop Back Button */}
        <button
          onClick={onClose}
          className="hidden xl:flex absolute top-4 right-4 w-[80px] h-[80px] rounded-full bg-transparent cursor-pointer  items-center justify-center text-white transition-all duration-200"
          aria-label="Close"
        >
          <X className="h-8 w-8" />
        </button>
      </div>

      {/* Thumbnails */}
      <div
        className={`pb-4 xl:pb-0 2xl:pb-8 px-4 transition-opacity duration-300 ${isZoomed ? "opacity-70" : "opacity-100"}`}
      >
        <div className="flex gap-2 xl:gap-3 overflow-x-auto pb-2 xl:pb-4 scrollbar-hide justify-start xl:justify-center">
          <div className="flex gap-2 xl:gap-3 min-w-max">
            {images.map((image, index) => (
              <div
                key={index}
                className={`h-[81.53px] w-[81.53px] flex-shrink-0 relative cursor-pointer border-[3.08px] overflow-hidden rounded transition-all duration-200  ${
                  index === currentIndex
                    ? "border-[#54ABDB]"
                    : "border-[#FFFFFF]"
                }`}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsZoomed(false)
                }}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
