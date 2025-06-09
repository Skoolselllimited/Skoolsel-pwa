"use client"

import { CircledPlusIcon, MenuIcon } from "@/components/svgs"
import { DialogClose, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <nav className="bg-primary text-white h-[60px] xl:h-[103px] py-4 xl:py-6 px-4 2xl:px-6 flex items-center justify-center">
      <div className="w-full max-w-[1320px] mx-auto flex items-center justify-between relative">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logowhite.svg"
            alt="Skoolsel Logo"
            width={100}
            height={40}
            priority
            className="object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center gap-6 h-[50px]">
          <Link
            href="/login"
            className="text-white font-medium text-base hover:underline"
          >
            Login / Register
          </Link>

          <div className="h-4 border-r border-white" />

          <Link
            href="/ads/post"
            className="flex items-center space-x-2 bg-[#E8B737] hover:bg-[#E8B737]/90 text-white font-normal px-4 py-2 rounded"
          >
            <CircledPlusIcon />
            <span>Post Ads</span>
          </Link>
        </div>

        {/* Mobile Menu Trigger (visible below xl) */}
        <div className="xl:hidden absolute right-0 top-0">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <button className="focus:outline-none">
                <MenuIcon />
                <span className="sr-only">Open Menu</span>
              </button>
            </SheetTrigger>

            <DialogTitle />
            <SheetContent
              side="left"
              className="bg-primary border-0 w-72 p-4 [&_[aria-label='Close']]:hidden"
            >
              <DialogClose asChild>
                <button className="absolute top-3 right-3 p-1 text-white hover:bg-white/20 rounded z-50">
                  <X className="w-6 h-6" />
                  <span className="sr-only">Close Menu</span>
                </button>
              </DialogClose>

              <div className="mt-16 flex flex-col gap-6">
                <Link
                  href="/login"
                  className="text-white font-medium hover:underline"
                >
                  Login / Register
                </Link>

                <Link
                  href="/ads/post"
                  className="flex items-center space-x-2 bg-[#E8B737] hover:bg-[#E8B737]/90 text-white font-normal px-4 py-2 rounded"
                >
                  <CircledPlusIcon />
                  <span>Post Ads</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
