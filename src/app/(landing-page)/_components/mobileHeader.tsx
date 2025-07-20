"use client"

import { navItems } from "@/app/user"
import BackButton from "@/components/BackButton"
import { SignOutIcon } from "@/components/svgs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { cn, getInitials } from "@/lib/utils"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import React, { useState } from "react"

export default function MobileHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const user = {
    name: "Jenny Wilson",
    photo: "/images/profile.jpg",
    joinedAt: "2024-11-19",
  }
  return (
    <div>
      {" "}
      {/* Mobile Header */}
      <div className="2xl:hidden flex flex-col px-4">
        <div className="w-full h-[72px] flex justify-between items-center py-4">
          <div
            onClick={() => router.push("/")}
            className="cursor-pointer h-10 w-10 rounded-full border border-[#DADDE5] flex justify-center items-center"
          >
            <ChevronLeft className="w-6 h-6 text-[#272727]" />
          </div>

          <div className="text-[#4E4E5A] font-extrabold text-[20px]/[32px]">
            {user.name}
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              {/* Avatar opens the dialog */}
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10 cursor-pointer">
                  <AvatarImage src={user.photo || "/placeholder.svg"} />
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <ChevronDown />
              </div>
            </DialogTrigger>

            <DialogContent className="bg-white w-full h-full max-w-none px-0 m-0 rounded-none border-0 shadow-none [&_[aria-label='Close']]:hidden overflow-y-scroll scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200">
              <div className="flex flex-col gap-10 h-full bg-white">
                <div className="flex flex-col gap-4 px-4">
                  <BackButton onClick={() => setOpen(false)} />
                  {/* User Info in Dialog */}
                  <div className="flex flex-col 2xl:flex-row items-center gap-4 px-4">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={user.photo || "/placeholder.svg"} />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-[20px]">{user.name}</h3>
                      <p className="text-sm text-[#767E94]">
                        Joined - 19/11/2024
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto">
                  <div className="flex flex-col gap-2">
                    {navItems.map((item, idx) => {
                      const isActive =
                        pathname === item.href ||
                        pathname?.startsWith(item.href + "/")

                      return (
                        <Link
                          key={idx}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "w-full flex justify-between items-center gap-4 h-[48px] py-3 px-6 text-[#767E94] font-medium font-circular-std text-[16px]/[24px] cursor-pointer transition-colors",
                            isActive
                              ? "bg-[#E8F7FF] text-secondary shadow-[2px_0px_0px_0px_#00AAFF_inset]"
                              : "text-[#767E94] hover:bg-[#E8F7FF] hover:text-secondary hover:shadow-[2px_0px_0px_0px_#00AAFF_inset]"
                          )}
                        >
                          <div className="flex items-center gap-4">
                            <item.icon />
                            {item.title}
                          </div>
                          <ChevronRight className="w-5 h-5" />
                        </Link>
                      )
                    })}

                    <button
                      onClick={() => {
                        setOpen(false)
                      }}
                      className="flex items-center justify-between gap-4 px-6 py-2 text-destructive hover:bg-destructive/10 cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <SignOutIcon />
                        Sign Out
                      </div>
                    </button>
                  </div>
                </nav>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
