"use client"
import Link from "next/link"
import Image from "next/image"
import { FaPlusCircle, FaSearch, FaBars } from "react-icons/fa"
import { LuCirclePlus } from "react-icons/lu"
export default function Navbar() {
  return (
    <nav className="hidden md:block bg-[#003654] text-white py-3 px-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-around">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/logowhite.svg"
            alt="Skoolsel Logo"
            width={120}
            height={40}
            className="object-contain"
          />
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
        <div className="hidden md:flex items-center gap-4">
          {/* Login/Register Links */}
          <div className="flex items-center text-sm">
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <span className="px-0.5 text-[12px]">/</span>
            <Link href="/register" className="hover:underline">
              Register
            </Link>
          </div>

          <div className="h-4 border-r border-gray-400" />

          {/* Post Ad Button */}
          <Link
            href="/ads/post"
            className="flex items-center gap-2 bg-[#e8b737] hover:bg-yellow-500 text-white px-4 py-2 rounded "
          >
            <LuCirclePlus className="" />
            <span>Post An Ad</span>
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
