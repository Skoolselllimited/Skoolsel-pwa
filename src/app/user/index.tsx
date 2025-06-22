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
import { cn, generateBreadcrumbs, getInitials } from "@/lib/utils"
import { BreadcrumbItem, NavItem } from "@/types"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Header from "../(landing-page)/_components/header"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DialogClose } from "@/components/ui/dialog"
import { ChevronLeft, X } from "lucide-react"

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
  { title: "Account Settings", href: "/user/settings", icon: GearIcon },
]

export default function UserWrapper({
  children,
  breadcrumbItems,
}: {
  breadcrumbItems?: BreadcrumbItem[]
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const breadcrumbs = breadcrumbItems ?? generateBreadcrumbs(pathname)
  const [open, setOpen] = useState(false)

  const user = {
    name: "Jenny Wilson",
    photo: "/images/profile.jpg",
    joinedAt: "2024-11-19",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Global Header */}
      <Header />

      {/* Mobile Header */}
      <div className="xl:hidden flex flex-col px-4">
        <div className="w-full h-[72px] flex justify-between items-center py-4">
          <div
            onClick={() => router.back()}
            className="cursor-pointer h-10 w-10 rounded-full border border-[#DADDE5] flex justify-center items-center"
          >
            <ChevronLeft className="w-6 h-6 text-[#272727]" />
          </div>

          <div className="text-[#4E4E5A] font-extrabold text-[20px]/[32px]">
            {user.name}
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              {/* Avatar opens the drawer */}
              <Avatar className="h-10 w-10 cursor-pointer">
                <AvatarImage src={user.photo} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="bg-primary w-72 p-4 [&_[aria-label='Close']]:hidden"
            >
              <DialogClose asChild>
                <button className="absolute top-3 right-3 p-1 text-white bg-red-500 rounded">
                  <X className="w-6 h-6" />
                  <span className="sr-only">Close menu</span>
                </button>
              </DialogClose>

              {/* User Info in Drawer */}
              <div className="flex items-center gap-4 py-6 px-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.photo} />
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-white font-semibold">{user.name}</h3>
                  <p className="text-white/60 text-sm">
                    Joined –{" "}
                    {new Date(user.joinedAt).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-2">
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
                        "flex items-center gap-4 px-4 py-2 text-white/60 font-medium",
                        isActive
                          ? "bg-[#E8F7FF] text-secondary shadow-inner"
                          : "hover:bg-[#E8F7FF] hover:text-secondary"
                      )}
                    >
                      <item.icon />
                      {item.title}
                    </Link>
                  )
                })}
                <button
                  onClick={() => {
                    setOpen(false)
                    // TODO: add sign-out logic here
                  }}
                  className="flex items-center gap-4 px-4 py-2 text-destructive hover:bg-destructive/10"
                >
                  <SignOutIcon />
                  Sign Out
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Breadcrumb Bar */}
      <div className="hidden xl:flex w-full bg-[#E8EBEE] h-[43px] items-center">
        <div className="mx-auto max-w-[1320px]">
          <BreadcrumbNav items={breadcrumbs} className="w-[498px] h-6" />
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-[1320px] mx-auto py-4 px-3 lg:p-6 flex gap-6">
        {/* Sidebar (Desktop Only) */}
        <aside className="hidden xl:flex flex-col w-[296px]">
          <div className="bg-white border border-[#EBEEF7] rounded-[12px] py-8 flex flex-col gap-6">
            <div className="flex items-center gap-4 px-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.photo} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-[20px]">{user.name}</h3>
                <p className="text-sm text-[#767E94]">Joined - 19/11/2024</p>
              </div>
            </div>

            <nav className="flex flex-col gap-2">
              {navItems.map((item, idx) => {
                const isActive =
                  pathname === item.href ||
                  pathname?.startsWith(item.href + "/")

                return (
                  <Link
                    key={idx}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-4 px-8 py-3 text-sm font-medium",
                      isActive
                        ? "bg-[#E8F7FF] text-secondary shadow-inner"
                        : "text-[#767E94] hover:bg-[#E8F7FF] hover:text-secondary"
                    )}
                  >
                    <item.icon />
                    {item.title}
                  </Link>
                )
              })}
              <button className="flex items-center gap-4 px-8 py-3 text-sm text-[#767E94] hover:bg-destructive/10 hover:text-destructive">
                <SignOutIcon />
                Sign Out
              </button>
            </nav>
          </div>
        </aside>

        {/* Page Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
