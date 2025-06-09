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
    <div className="flex w-full gap-2 items-center">
      {/* Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="min-w-[153px] h-10 lg:h-[48px] bg-[#F1F2F4] hover:bg-[#F1F2F4] border border-[#E3E6EA] rounded-[10px] px-4 py-2 text-[14px] lg:text-[16px] text-[#6B7B8A] font-medium flex items-center gap-1 truncate"
          >
            <span className="truncate max-w-[120px]">{selectedSchoolType}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="mt-1 w-auto min-w-[220px]"
        >
          <DropdownMenuLabel>Filter by school</DropdownMenuLabel>
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

      {/* Input Field */}
      <div className="relative w-full">
        <Input
          type="search"
          placeholder="Search products"
          className="bg-white h-10 lg:h-[48px] w-full border border-[#E3E6EA] px-4 py-2 pr-10 text-sm rounded-[10px] placeholder:text-[#9CA3AF] shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-3 top-2 text-secondary hover:bg-[#E3E6EA]/30 rounded-full h-7 w-7"
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
    </div>
  )
}
