"use client"

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
import { cn, generateBreadcrumbs } from "@/lib/utils"
import { BreadcrumbItem, NavItem } from "@/types"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Header from "./_components/header"

export const navItems: NavItem[] = [
  {
    title: "Overview",
    href: "/user/overview",
    icon: DashboardIcon,
  },
  {
    title: "View Public Profile",
    href: "/user/view-public-profile",
    icon: UserCircle,
  },
  {
    title: "Post a Ads",
    href: "/user/post-ads",
    icon: PlusCircle,
  },
  {
    title: "My Ads",
    href: "/user/my-ads",
    icon: ClipboardText,
  },
  {
    title: "Favourite Ads",
    href: "/user/favourite-ads",
    icon: HeartIcon,
  },
  {
    title: "Draft",
    href: "/user/draft",
    icon: Folder,
  },
  {
    title: "Billing",
    href: "/user/billing",
    icon: CreditCardIcon,
  },
  {
    title: "Account Settings",
    href: "/user/settings",
    icon: GearIcon,
  },
]

export default function UserWrapper({
  children,
  breadcrumbItems,
}: {
  breadcrumbItems?: BreadcrumbItem[]
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const breadcrumbs = breadcrumbItems ?? generateBreadcrumbs(pathname)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      <div className="w-full bg-[#E8EBEE] h-[43px] flex items-center">
        <div className="w-full h-full max-w-[1320px] bg-[#E8EBEE] mx-auto">
          <div>
            <BreadcrumbNav items={breadcrumbs} className="w-[498px] h-6" />
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto p-4 sm:p-6">
        <div className="flex gap-4 sm:gap-6">
          {/* Left Sidebar - Hidden on mobile, shown as modal or drawer */}
          <div className="hidden xl:flex flex-col w-[296px]">
            <div className="w-full h-[608px] flex flex-col gap-6 rounded-[12px] border border-[#EBEEF7] py-8 bg-white">
              {/* User Profile */}
              <div className="flex items-center gap-[14px] h-16 w-[233px] px-4">
                <Avatar className="h-10 w-10 sm:h-16 sm:w-16">
                  <AvatarImage src="/images/profile.jpg" />
                  <AvatarFallback>JW</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold font-nunito text-base xl:text-[20px]/[100%] tracking-normal text-foreground">
                    Jenny Wilson
                  </h3>
                  <p className="font-[450] font-circular-std text-xs sm:text-[14px]/[20px] tracking-normal text-[#767E94]">
                    Joined - 19/11/2024
                  </p>
                </div>
              </div>

              {/* Navigation Menu */}
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
                        "w-full flex justify-start gap-4 h-[48px] py-3 px-8 text-[#767E94] font-medium font-circular-std xl:text-[16px]/[24px] text-sm cursor-pointer",
                        isActive
                          ? "bg-[#E8F7FF] text-secondary shadow-[2px_0px_0px_0px_#00AAFF_inset]"
                          : "text-[#767E94] hover:bg-[#E8F7FF] hover:text-secondary hover:shadow-[2px_0px_0px_0px_#00AAFF_inset]"
                      )}
                    >
                      <item.icon />
                      {item.title}
                    </Link>
                  )
                })}
                <button className="w-full flex justify-start gap-4 px-8 h-[48px] py-3 text-[#767E94] font-medium font-circular-std xl:text-[16px]/[24px] text-sm focus:outline-0 cursor-pointer hover:bg-destructive/10 hover:text-destructive">
                  <SignOutIcon />
                  Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 w-full">{children}</div>
        </div>
      </div>
    </div>
  )
}
