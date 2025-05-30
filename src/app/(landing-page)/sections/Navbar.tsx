"use client";
import Link from "next/link";
import { FaPlusCircle, FaBars } from "react-icons/fa";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-[#003553] text-white py-4 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image
            src="/logowhite.svg"
            alt="Skoolsel Logo"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/login" className="text-sm hover:underline">
            Login / Register
          </Link>

          <div className="h-4 border-r border-gray-400" />

          <Link
            href="/post-ad"
            className="flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-white font-normal px-4 py-2 rounded"
          >
            <FaPlusCircle className="text-sm" />
            <span>Post Ads</span>
          </Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <button className="md:hidden text-white text-xl">
          <FaBars />
        </button>
      </div>
    </nav>
  );
}
