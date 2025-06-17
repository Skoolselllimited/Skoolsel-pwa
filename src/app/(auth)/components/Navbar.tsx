"use client";
import Link from "next/link";
import Image from "next/image";
import { CircledPlusIcon } from "@/components/svgs";
import { FaSearch, FaBars } from "react-icons/fa";


export default function Navbar() {
  return (
    <nav className="hidden md:block bg-[#003654] text-white py-3 px-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-around">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/logowhite.svg"
              alt="Skoolsel Logo"
              width={120}
              height={40}
              className="w-auto h-auto object-contain"
            />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center flex-grow max-w-xl mx-6">
          <select className="bg-white text-[#6b7b8a] text-sm px-3 h-8 py-2 rounded-md border focus:outline-none">
            <option value="ABU Zaria">ABU Zaria</option>
            <option value="UNILAG">UNILAG</option>
            <option value="UI">UI</option>
          </select>

          <div className=" ml-2 relative flex-grow">
            <input
              type="text"
              placeholder="Search products"
              className="w-full px-4 py-2 h-8 bg-white text-sm text-[#6b7b8a] border-t border-b border-r rounded-md focus:outline-none"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#0088cc]" />
          </div>
        </div>

        {/* Right Navigation */}
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
            href="/ads/post"
            className="flex items-center space-x-2 bg-[#E8B737] hover:bg-[#E8B737]/90 text-white font-normal px-4 py-2 rounded"
          >
            <CircledPlusIcon />
            <span>Post Ads</span>
          </Link>
        </div>

        {/* Mobile Menu */}
        <button className="md:hidden text-white text-xl">
          <FaBars />
        </button>
      </div>
    </nav>
  )
}
