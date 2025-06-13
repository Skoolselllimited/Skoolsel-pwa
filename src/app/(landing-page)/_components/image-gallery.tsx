"use client"

import type React from "react"

import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

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
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  // Reset current index when initial index changes
  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  // Handle keyboard navigation
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

  // Prevent body scroll when gallery is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const diffX = touchStartX.current - touchEndX.current
    const threshold = 50 // minimum distance to be considered a swipe

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        // Swipe left, go to next image
        nextImage()
      } else {
        // Swipe right, go to previous image
        prevImage()
      }
    }

    // Reset values
    touchStartX.current = null
    touchEndX.current = null
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
      ref={galleryRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 text-white">
          <div className="text-sm">
            {currentIndex + 1} / {images.length}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-white hover:bg-white/20 flex justify-center items-center cursor-pointer"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Main image area */}
        <div className="flex-1 relative flex items-center justify-center">
          <div className="relative w-full h-full max-w-[1320px] max-h-[625px] mx-auto xl:mt-22">
            <Image
              src={images[currentIndex] || "/placeholder.svg"}
              alt={`Product image ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
          </div>

          {/* Navigation buttons - visible on all devices */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-15 h-15 bg-transparent flex items-center justify-center text-white"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-15 h-15" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-20 h-20 bg-transparent flex items-center justify-center text-white"
            aria-label="Next image"
          >
            <ChevronRight className="w-15 h-15" />
          </button>
        </div>

        {/* Mobile indicator dots */}
        <div className="flex justify-center space-x-2 py-4 md:hidden">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-secondary" : "bg-white/50"}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        {/* Thumbnails - adjust for better mobile display */}
        <div className="pb-8 xl:py-8 opacity-70 px-4 hidden sm:block">
          <div className="h-16 xl:h-[112px] flex justify-center gap-3 overflow-x-auto pb-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`h-[86.14px] w-[86.14px] xl:w-[106px] xl:h-[106px] relative cursor-pointer border-4 overflow-hidden ${
                  index === currentIndex ? "border-secondary" : "border-white"
                }`}
                onClick={() => setCurrentIndex(index)}
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
