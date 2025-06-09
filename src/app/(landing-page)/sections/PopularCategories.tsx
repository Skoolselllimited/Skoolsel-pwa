"use client"

import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { data } from "@/data/topCategories"
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/svgs"
import Link from "next/link"

export default function ShopWithCategories() {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(true)

  const checkScrollability = React.useCallback(() => {
    const container = scrollContainerRef.current
    if (container) {
      // Only check scrollability for larger screens (flex layout)
      if (window.innerWidth >= 768) {
        // md breakpoint
        setCanScrollLeft(container.scrollLeft > 0)
        setCanScrollRight(
          container.scrollLeft <
            container.scrollWidth - container.clientWidth - 1
        )
      } else {
        // In grid mode, buttons are hidden
        setCanScrollLeft(false)
        setCanScrollRight(false)
      }
    }
  }, [])

  React.useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      checkScrollability() // Initial check
      container.addEventListener("scroll", checkScrollability, {
        passive: true,
      })
      window.addEventListener("resize", checkScrollability) // Re-check on resize

      // Check if scrollbar is even visible initially
      if (container.scrollWidth <= container.clientWidth) {
        setCanScrollRight(false)
      }
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollability)
        window.removeEventListener("resize", checkScrollability)
      }
    }
  }, [checkScrollability])

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current
    if (container) {
      const scrollAmount = container.clientWidth * 0.75 // Scroll by 75% of visible width
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="min-h-[516px] py-[100px] w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10 space-y-6 md:space-y-8">
      <h2 className="text-2xl sm:text-[36px]/[45.52px] tracking-normal font-bold font-circular-std text-center text-[#052332]">
        Shop with Categories
      </h2>
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className={cn(
            // Grid layout for smaller screens (up to md)
            "w-full grid grid-cols-2 gap-[10px] md:grid-cols-3 lg:gap-4",
            // Flex layout for larger screens (md and up)
            "lg:flex md:space-x-3 lg-md:space-x-[18px] lg:overflow-x-auto md:pb-4 lg:scrollbar-hide no-scrollbar"
          )}
        >
          {data.map((category) => (
            <Link
              key={category.name}
              href={`/products?category=${category.name}`}
              className={cn(
                "group bg-white rounded border border-[#F1F2F4] hover:shadow-sm transition-all duration-200 flex flex-col gap-[10px] lg:gap-[18px] cursor-pointer items-center",
                // Grid layout styling
                "py-[15.66px] px-[7.83px] lg:py-6 lg:px-3",
                // Flex layout styling for larger screens
                "md:flex-shrink-0 w-full sm:w-[133px] md:w-[128px] h-[149px] lg:h-[230px] lg:w-[205px]"
              )}
            >
              <div className="aspect-square flex items-center justify-center lg:mb-2">
                <Image
                  src={category.imageSrc || "/images/image-placeholder.jpg"}
                  alt={category.imageAlt}
                  width={148}
                  height={148}
                  className="w-[96.02px] h-[96.02px] lg:h-[148px] lg:w-[148px] object-cover object-center"
                />
              </div>
              <p className="font-bold font-circular-std text-[12px]/[11.74px] lg:text-[15px]/[18px] tracking-normal text-center text-[#384853] group-hover:secondary transition-colors">
                {category.name}
              </p>
            </Link>
          ))}
        </div>

        {/* Left Scroll Button - Hidden on small screens, visible on md+ */}
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "w-9 h-9 lg:w-[48px] lg:h-[48px] absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 rounded-full bg-secondary hover:bg-secondary text-white border-secondary hover:border-secondary hover:text-white/80 p-3",
            "transition-opacity duration-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "hidden lg-md:flex justify-center items-center" // Hide on small screens, show on md+
          )}
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          disabled={!canScrollLeft}
        >
          <ArrowLeftIcon />
        </Button>

        {/* Right Scroll Button - Hidden on small screens, visible on md+ */}
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "w-9 h-9 lg:w-[48px] lg:h-[48px] absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 rounded-full bg-secondary hover:bg-secondary text-white border-secondary cursor-pointer hover:border-secondary hover:text-white/80 p-3",
            "transition-opacity duration-300",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "hidden lg-md:flex justify-center items-center"
          )}
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          disabled={!canScrollRight}
        >
          <ArrowRightIcon />
        </Button>
      </div>
    </section>
  )
}
