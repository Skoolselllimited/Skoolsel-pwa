"use client"

import { CircledPlusIcon, MenuIcon } from "@/components/svgs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function Navbar() {
  const pathname = usePathname()
  const [isHome, setIsHome] = useState(false)

  useEffect(() => {
    setIsHome(pathname === "/")
  }, [pathname])

  return (
    <nav
      className={`${
        isHome ? "flex" : "hidden"
      } bg-primary text-white h-[60px] xl:h-[103px] py-4 xl:py-6 px-4 2xl:px-6 xl:flex items-center justify-center`}
    >
      <div className="w-full max-w-[1320px] mx-auto flex items-center justify-between relative">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 w-[182px] h-[42px]">
          <Image
            src="/logowhite.svg"
            alt="Skoolsel Logo"
            width={182}
            height={42}
            priority
            className="w-[182] h-[42px] xl:w-auto xl:h-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}

        <div className="hidden lg-md:flex items-center gap-6">
          <div className="flex gap-1">
            <Link
              href="/login"
              className="text-[16px]/[24px] font-circular-std font-medium tracking-normal hover:underline underline-offset-4 text-white cursor-pointer"
            >
              Login
            </Link>
            <span className="text-[#AEB3C2]">/</span>
            <Link
              href="/register"
              className="text-[16px]/[24px] font-circular-std font-medium tracking-normal hover:underline underline-offset-4 text-white cursor-pointer"
            >
              Register
            </Link>
          </div>

          <span className="text-white">|</span>

          <Link
            href="/user/post-ads"
            className="flex items-center space-x-2 bg-[#E8B737] hover:bg-[#E8B737]/90 text-white font-normal px-4 py-2 rounded"
          >
            <CircledPlusIcon />
            <span>Post Ads</span>
          </Link>
        </div>

        {/* Mobile Menu Trigger (visible below xl) */}
        <div className="lg-md:hidden absolute right-0 top-0">
          <Link className="cursor-pointer" href="/login">
            <MenuIcon />
          </Link>
        </div>
      </div>
    </nav>
  )
}
