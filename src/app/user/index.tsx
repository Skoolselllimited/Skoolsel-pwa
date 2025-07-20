"use client"

import BackButton from "@/components/BackButton"
import BreadcrumbNav from "@/components/breadCrumbs"
import {
  ClipboardText,
  CreditCardIcon,
  DashboardIcon,
  Folder,
  GearIcon,
  HeartIcon,
  PlusCircle,
  SignOutIcon,
  UserCircle,
} from "@/components/svgs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { cn, getInitials } from "@/lib/utils"
import type { BreadcrumbItem, NavItem } from "@/types"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import type React from "react"
import { useState } from "react"
import Header from "../(landing-page)/_components/header"
import MobileHeader from "../(landing-page)/_components/mobileHeader"

export const navItems: NavItem[] = [
  { title: "Overview", href: "/user/overview", icon: DashboardIcon },
  {
    title: "View Public Profile",
    href: "/user/view-public-profile",
    icon: UserCircle,
  },
  { title: "Post a Ads", href: "/user/post-ads", icon: PlusCircle },
  { title: "My Ads", href: "/user/my-ads", icon: ClipboardText },
  { title: "Favourite Ads", href: "/user/favourite-ads", icon: HeartIcon },
  { title: "Draft", href: "/user/draft", icon: Folder },
  { title: "Billing", href: "/user/billing", icon: CreditCardIcon },
  { title: "Account Settings", href: "/user/account-settings", icon: GearIcon },
]

export default function UserWrapper({
  children,
  breadcrumbItems,
}: {
  breadcrumbItems?: BreadcrumbItem[]
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const hideSidebarRoutes = [
    // "/user/my-ads",
    "/user/view-public-profile",
    "/user/onboarding",
  ]

  const shouldHideSidebar =
    /^\/user\/my-ads\/\d+/.test(pathname) ||
    /^\/user\/favourite-ads\/\d+/.test(pathname) ||
    hideSidebarRoutes.some((route) => pathname.startsWith(route))

  const user = {
    name: "Jenny Wilson",
    photo: "/images/profile.jpg",
    joinedAt: "2024-11-19",
  }

  return (
    <div className="min-h-screen bg-white xl:bg-[#F4F6F8]">
      {/* Global Header */}
      <Header />

      {/* Desktop Breadcrumb Bar */}

      <BreadcrumbNav pathname={pathname} />

      {/* Main Layout */}
      <div className=" 3xl:w-[1320px] mx-auto py-4 px-3 3xl:p-6 flex gap-6">
        {/* Sidebar (Desktop Only) */}
        {!shouldHideSidebar && (
          <aside className="hidden 2xl:flex flex-col w-[296px]">
            <div className="w-full bg-white border border-[#EBEEF7] rounded-[12px] py-8 flex flex-col gap-6">
              <div className="flex flex-col items-center gap-4 px-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.photo || "/placeholder.svg"} />
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-[20px]">{user.name}</h3>
                  <p className="text-sm text-[#767E94]">Joined - 19/11/2024</p>
                </div>
              </div>

              <nav>
                {navItems?.map((item, idx) => {
                  const isActive =
                    pathname === item.href ||
                    pathname?.startsWith(item.href + "/")

                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      className={cn(
                        "w-full flex justify-start items-center gap-4 h-[48px] py-3 px-8 text-[#767E94] font-medium font-circular-std text-[16px]/[24px] cursor-pointer transition-colors",
                        isActive
                          ? "bg-[#E8F7FF] text-secondary shadow-[2px_0px_0px_0px_#00AAFF_inset]"
                          : "text-[#767E94] hover:bg-[#E8F7FF] hover:text-secondary hover:shadow-[2px_0px_0px_0px_#00AAFF_inset]"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.title}
                    </Link>
                  )
                })}
                <button className="w-full flex items-center gap-4 px-8 py-2 text-destructive hover:bg-destructive/10 cursor-pointer">
                  <SignOutIcon className="w-5 h-5" />
                  Sign Out
                </button>
              </nav>
            </div>
          </aside>
        )}
        {/* Page Content */}
        <main className="flex-1 3xl:w-[984px] relative">{children}</main>
      </div>
    </div>
  )
}
