"use client"

import { ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="relative w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 text-white">
          <div className="text-sm">
            {currentIndex + 1} / {images.length}
          </div>
          <span
            onClick={onClose}
            className="w-10 h-10 text-white hover:bg-white/20 flex justify-center items-center cursor-pointer"
          >
            <X className="h-8 w-8" />
          </span>
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

          {/* Navigation buttons */}
          <span
            className="absolute left-0 xl:left-4 text-white hover:bg-white/20 rounded-full h-[60px] w-[60px] flex justify-center items-center cursor-pointer"
            onClick={prevImage}
          >
            <ChevronLeft className="h-[60px] w-[60px]" />
          </span>

          <span
            className="absolute right-0 xl:right-4 text-white hover:bg-white/20 rounded-full h-[60px] w-[60px] flex justify-center items-center cursor-pointer"
            onClick={nextImage}
          >
            <ChevronRight className="h-[60px] w-[60px]" />
          </span>
        </div>

        {/* Thumbnails */}
        <div className="pb-8 xl:py-8 opacity-70 px-4">
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
