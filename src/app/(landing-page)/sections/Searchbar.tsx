"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Search } from "lucide-react"
import React from "react"

export default function SearchBar() {
  // Sample options for the dropdown
  const schoolTypes = [
    "All Schools",
    "Ahmadu Bello University Zaria",
    "Federal University of Science and Technology Minna",
    "Lagos State University",
    "College of Education zuba",
    "Abuja University",
  ]
  const [selectedSchoolType, setSelectedSchoolType] = React.useState(
    schoolTypes[0]
  )

  return (
    <div className="flex items-center gap-2  p-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-[141px] h-12 lg:h-[54px] bg-[#F6F6F6] hover:bg-[#F6F6F6]/50 transform duration-300 border border-[#E3E6EA] rounded-[8px] px-4 sm:px-4 py-2 text-[14px]/[18px] lg:text-[16px]/[18px] font-circular-std font-bold tracking-normal flex items-center text-[#384853] gap-[6px] focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-1 focus-visible:ring-offset-white cursor-pointer"
          >
            <span className="truncate max-w-[141px] sm:max-w-xs">
              {selectedSchoolType}
            </span>
            <ChevronDown className="ml-1 sm:ml-2 h-5 w-5 text-[#384853] flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="mt-1 w-[--radix-dropdown-menu-trigger-width]"
        >
          <DropdownMenuLabel>Filter by school type</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {schoolTypes.map((type) => (
            <DropdownMenuItem
              key={type}
              onSelect={() => setSelectedSchoolType(type)}
            >
              {type}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Input
        type="search"
        placeholder="Search by item here...."
        className="bg-white h-9 sm:h-10 lg:h-[56px] flex-1 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-3 lg:pl-4 lg:pr-1 font-nunito text-xs sm:text-sm text-foreground placeholder:text-[#384853]"
      />

      <Button
        variant="ghost"
        size="icon"
        className="text-secondary hover:bg-[#E3E6EA]/30 rounded-full h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 cursor-pointer"
      >
        <Search className="h-6 w-6 sm:h-5 sm:w-5" />
        <span className="sr-only">Search</span>
      </Button>
    </div>
  )
}
