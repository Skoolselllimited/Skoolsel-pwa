"use client"

import { CircledPlusIcon, HeartIcon, MenuIcon } from "@/components/svgs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import SearchBar from "./search"

export default function Header() {
  // Replace with real user data if available
  const user = {
    name: "Jenny Wilson",
    photo: "/images/profile.jpg",
    joinedAt: "2024-11-19",
  }

  return (
    <nav className="hidden xl:flex bg-primary text-white border-0">
      <div className="w-full max-w-[1320px] mx-auto flex items-center justify-between h-[60px] xl:h-[103px] px-4 lg-md:px-6">
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
        {/* SearchBar */}
        <div className="hidden lg-md:block w-full max-w-[626px] mx-4">
          <SearchBar />
        </div>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center gap-6">
          <HeartIcon className="text-white" />

          <Avatar className="w-6 h-6">
            <AvatarImage src={user.photo} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>

          <div className="h-4 border-r border-white" />

          <Link
            href="/user/post-ads"
            className="flex items-center space-x-2 bg-[#E8B737] hover:bg-[#E8B737]/90 text-white font-normal px-4 py-2 rounded"
          >
            <CircledPlusIcon />
            <span>Post Ads</span>
          </Link>
        </div>

        <Link
          href="/login"
          className="flex lg:hidden cursor-pointer p-2 focus:outline-none"
        >
          <MenuIcon />
        </Link>
      </div>
    </nav>
  )
}
