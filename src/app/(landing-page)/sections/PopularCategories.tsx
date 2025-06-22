"use client"

import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/svgs"
import Link from "next/link"

// Category data - you can move this to a separate data file
interface Category {
  name: string
  imageSrc: string
  imageAlt: string
  subcategories: string[]
}

export const data: Category[] = [
  {
    name: "Computer & Laptop",
    imageSrc: "/images/computer.png",
    imageAlt: "Desktop computer and laptop",
    subcategories: [
      "Desktop",
      "Laptop",
      "Gaming PC",
      "Workstation",
      "Mini PC",
      "All-in-One",
      "Others",
    ],
  },
  {
    name: "Mobile",
    imageSrc: "/images/phone.png",
    imageAlt: "Foldable smartphone",
    subcategories: [
      "iPhone",
      "Samsung",
      "Xiaomi",
      "Tecno",
      "Infinix",
      "Oppo",
      "Vivo",
      "Huawei",
      "Nokia",
      "Others",
    ],
  },
  {
    name: "Phone Accessories",
    imageSrc: "/images/accessories.png",
    imageAlt: "Phone Accessories",
    subcategories: [
      "Cases & Covers",
      "Screen Protectors",
      "Chargers",
      "Headphones",
      "Power Banks",
      "Cables",
      "Others",
    ],
  },
  {
    name: "Computer Accessories",
    imageSrc: "/images/computer_acc.png",
    imageAlt: "Gaming keyboard and mouse",
    subcategories: [
      "Keyboards",
      "Mouse",
      "Monitors",
      "Speakers",
      "Webcams",
      "Storage",
      "Others",
    ],
  },
  {
    name: "Fashion & Accessories",
    imageSrc: "/images/clothes.png",
    imageAlt: "Essential items and accessories",
    subcategories: [
      "Clothing",
      "Shoes",
      "Bags",
      "Jewelry",
      "Watches",
      "Sunglasses",
      "Others",
    ],
  },
  {
    name: "Home & Living",
    imageSrc: "/images/electronics.png",
    imageAlt: "Smart TV",
    subcategories: [
      "Furniture",
      "Appliances",
      "Kitchen",
      "Decor",
      "Garden",
      "Lighting",
      "Others",
    ],
  },
  {
    name: "Food",
    imageSrc: "/images/food.png",
    imageAlt: "Home appliances",
    subcategories: [
      "Fresh Food",
      "Packaged Food",
      "Beverages",
      "Snacks",
      "Organic",
      "Local Delicacies",
      "Others",
    ],
  },
  {
    name: "Gaming",
    imageSrc: "/images/game-console.jpg",
    imageAlt: "Gaming consoles and accessories",
    subcategories: [
      "PlayStation",
      "Xbox",
      "Nintendo",
      "PC Gaming",
      "Mobile Gaming",
      "Accessories",
      "Others",
    ],
  },
]

export default function ShopWithCategories() {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(true)

  const checkScrollability = React.useCallback(() => {
    const container = scrollContainerRef.current
    if (container && window.innerWidth >= 1280) {
      setCanScrollLeft(container.scrollLeft > 0)
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 1
      )
    } else {
      setCanScrollLeft(false)
      setCanScrollRight(false)
    }
  }, [])

  React.useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      checkScrollability()
      container.addEventListener("scroll", checkScrollability, {
        passive: true,
      })
      window.addEventListener("resize", checkScrollability)

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
      const scrollAmount = container.clientWidth * 0.75
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  // Generate category filter URL that shows all ads in the selected category
  const getCategoryFilterUrl = (category: Category) => {
    // Create a simple category filter that matches products by main category only
    const params = new URLSearchParams()
    params.set("category", category.name)
    return `/ads?${params.toString()}`
  }

  return (
    <section className="min-h-[516px] py-15 xl:py-[100px] w-full max-w-[1320px] mx-auto px-1 lg-md:px-6 xl:px-8 flex flex-col gap-10">
      <h2 className="text-[20px] sm:text-[28px]/[28.52px] lg:text-[36px]/[45.52px] tracking-normal font-bold font-circular-std text-center text-[#052332]">
        Shop with Categories
      </h2>

      <div className="relative">
        <div
          ref={scrollContainerRef}
          className={cn(
            // Grid layout up to lg
            "grid grid-cols-2 gap-[10px]",
            "sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6",
            // Switch to horizontal scroll on xl
            "xl:flex xl:overflow-x-auto xl:gap-4 xl:scrollbar-hide no-scrollbar"
          )}
        >
          {data.map((category) => (
            <Link
              key={category.name}
              href={getCategoryFilterUrl(category)}
              className={cn(
                "group bg-white rounded border border-[#F1F2F4] hover:shadow-sm transition-all duration-200 flex flex-col gap-[10px] xl:gap-4 cursor-pointer items-center",
                "py-[15.66px] px-[7.83px] xl:py-6 xl:px-3",
                "w-full h-[149px] xl:h-[230px]",
                "xl:min-w-[16.6667%] xl:max-w-[16.6667%] xl:flex-shrink-0"
              )}
            >
              <div className="flex items-center justify-center">
                <Image
                  src={
                    category.imageSrc ||
                    "/placeholder.svg?height=148&width=148&query=category"
                  }
                  alt={category.imageAlt}
                  width={148}
                  height={148}
                  className="w-[96.02px] h-[96.02px] xl:h-[148px] xl:w-[148px] object-contain object-center"
                />
              </div>
              <p className="font-bold font-circular-std text-[12px]/[11.74px] xl:text-[15px]/[18px] tracking-normal text-center text-[#384853] group-hover:text-secondary transition-colors">
                {category.name}
              </p>
            </Link>
          ))}
        </div>

        {/* Scroll buttons (visible only on xl when scrollable) */}
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "w-9 h-9 xl:w-[48px] xl:h-[48px] absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 rounded-full bg-secondary text-white border-secondary hover:bg-secondary hover:text-white/80 p-3",
            "transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
            "hidden xl:flex justify-center items-center"
          )}
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          disabled={!canScrollLeft}
        >
          <ArrowLeftIcon />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className={cn(
            "w-9 h-9 xl:w-[48px] xl:h-[48px] absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 rounded-full bg-secondary text-white border-secondary hover:bg-secondary hover:text-white/80 p-3",
            "transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
            "hidden xl:flex justify-center items-center"
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
