"use client"

import { useState } from "react"
import {
  CircledPlusIcon,
  HeartIcon,
  MenuIcon,
  SignOutIcon,
} from "@/components/svgs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DialogClose, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { getInitials, cn } from "@/lib/utils"
import { X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import SearchBar from "./search"
import { usePathname } from "next/navigation"
import { navItems } from ".."

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Replace with real user data if available
  const user = {
    name: "Jenny Wilson",
    photo: "/images/profile.jpg",
    joinedAt: "2024-11-19",
  }

  return (
    <nav className="bg-primary text-white border-0">
      <div className="w-full max-w-[1320px] mx-auto flex items-center justify-between h-[60px] xl:h-[103px] px-4 lg-md:px-6">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 cursor-pointer">
          <Image
            src="/logowhite.svg"
            alt="Skoolsel Logo"
            width={100}
            height={40}
            priority
            className="object-contain"
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
            href="/ads/post"
            className="flex items-center space-x-2 bg-[#E8B737] hover:bg-[#E8B737]/90 text-white font-normal px-4 py-2 rounded"
          >
            <CircledPlusIcon />
            <span>Post Ads</span>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="xl:hidden flex items-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="p-2 focus:outline-none">
                <MenuIcon />
                <span className="sr-only">Toggle Menu</span>
              </button>
            </SheetTrigger>
            <DialogTitle />
            <SheetContent
              side="left"
              className="bg-primary border-0 w-72 p-4 [&_[aria-label='Close']]:hidden"
            >
              <DialogClose asChild>
                <button
                  className="absolute top-3 right-3 p-1 text-white hover:bg-white/20 rounded z-10"
                  onClick={() => setOpen(false)}
                >
                  <X className="w-6 h-6" />
                  <span className="sr-only">Close menu</span>
                </button>
              </DialogClose>

              <div className="w-full flex flex-col gap-6 py-8">
                {/* User Info */}
                <div className="flex items-center gap-[14px] h-16 px-4">
                  <Avatar className="h-10 w-10 sm:h-16 sm:w-16">
                    <AvatarImage src={user.photo} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold font-nunito text-base xl:text-[20px]/[100%] tracking-normal text-white">
                      {user.name}
                    </h3>
                    <p className="font-[450] font-circular-std text-xs sm:text-[14px]/[20px] tracking-normal text-white/60">
                      Joined - {new Date(user.joinedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Navigation */}
                <nav>
                  {navItems?.map((item, idx) => {
                    const isActive =
                      pathname === item.href ||
                      pathname?.startsWith(item.href + "/")

                    return (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "w-full flex justify-start gap-4 h-[48px] py-3 px-8 text-white/60 font-medium font-circular-std xl:text-[16px]/[24px] text-sm cursor-pointer",
                          isActive
                            ? "bg-[#E8F7FF] text-secondary shadow-[2px_0px_0px_0px_#00AAFF_inset]"
                            : "hover:bg-[#E8F7FF] hover:text-secondary hover:shadow-[2px_0px_0px_0px_#00AAFF_inset]"
                        )}
                      >
                        <item.icon />
                        {item.title}
                      </Link>
                    )
                  })}
                  <button
                    className="w-full flex justify-start gap-4 px-8 h-[48px] py-3 text-[#767E94] font-medium font-circular-std xl:text-[16px]/[24px] text-sm focus:outline-0 cursor-pointer hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => setOpen(false)}
                  >
                    <SignOutIcon />
                    Sign Out
                  </button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
