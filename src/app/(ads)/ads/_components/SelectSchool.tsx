"use client"

import DialogHead from "@/components/DialogHead"
import SearchIcon from "@/components/svgs/search"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { schoolTypes } from "@/data"
import { useEffect, useState } from "react"

interface SchoolSelectorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedSchool: string
  onSchoolSelect: (school: string) => void
}

export default function SchoolSelectorDialog({
  open,
  onOpenChange,
  selectedSchool: initialSelectedSchool,
  onSchoolSelect,
}: SchoolSelectorDialogProps) {
  const [selectedSchool, setSelectedSchool] = useState<string>(
    initialSelectedSchool || ""
  )
  const [schoolSearchTerm, setSchoolSearchTerm] = useState("")

  // Reset dialog state when opened
  useEffect(() => {
    if (open) {
      setSelectedSchool(initialSelectedSchool || "")
      setSchoolSearchTerm("")
    }
  }, [open, initialSelectedSchool])

  // Filter schools based on search term
  const filteredSchools = schoolSearchTerm
    ? schoolTypes.filter((school) => {
        const term = schoolSearchTerm.toLowerCase()
        return (
          school.name.toLowerCase().includes(term) ||
          school.abbreviation.toLowerCase().includes(term)
        )
      })
    : schoolTypes

  // Handle school selection
  const handleSchoolSelect = (school: string) => {
    setSelectedSchool(school)
  }

  // Apply school selection
  const applySchoolSelection = () => {
    onSchoolSelect(selectedSchool)
    onOpenChange(false)
  }

  // Clear school selection
  const clearSchoolSelection = () => {
    setSelectedSchool("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full h-full max-w-none max-h-none m-0 shadow-none border-0 rounded-none p-0 overflow-hidden flex flex-col [&>button]:hidden">
        <DialogHead
          back={() => onOpenChange(false)}
          title="Select School"
          clearText="Clear All"
          clear={clearSchoolSelection}
        />

        <div className="flex-1 overflow-y-auto p-4">
          <Input
            type="search"
            placeholder="Search for school..."
            value={schoolSearchTerm}
            onChange={(e) => setSchoolSearchTerm(e.target.value)}
            className="mb-4 font-circular-std placeholder:text-[#8B90A0] text-[16px]/[160%]"
          />

          {filteredSchools.length === 0 && schoolSearchTerm ? (
            <div className="flex flex-col items-center justify-center py-8 text-center gap-[30px]">
              <SearchIcon />
              <p className="text-sm xl:text-[20px]/[24px] font-medium font-circular-std text-center text-[#464D61]">
                Sorry, nothing matched your search. Want to give it another
                shot?
              </p>
              <Button size="sm" onClick={() => setSchoolSearchTerm("")}>
                Clear search
              </Button>
            </div>
          ) : (
            <RadioGroup
              value={selectedSchool}
              onValueChange={handleSchoolSelect}
              className="flex flex-col gap-2"
            >
              <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md">
                <RadioGroupItem value="" id="school-all" />
                <Label
                  htmlFor="school-all"
                  className="text-sm text-[#464D61] font-circular-std font-normal cursor-pointer flex-1"
                >
                  All Schools
                </Label>
              </div>
              {filteredSchools.map((school) => (
                <div
                  key={school.name}
                  className="flex items-center gap-3 px-2 hover:bg-gray-50 rounded-md"
                >
                  <RadioGroupItem
                    value={school.name}
                    id={`school-${school.name}`}
                  />
                  <Label
                    htmlFor={`school-${school.name}`}
                    className="text-sm text-[#464D61] font-circular-std font-normal cursor-pointer flex-1"
                  >
                    {school.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        </div>

        <DialogFooter className="w-full p-4 absolute bottom-4">
          <Button
            onClick={applySchoolSelection}
            className="h-[50px] py-[17.58px] w-full bg-[#54ABDB] hover:bg-[#54ABDB]/60"
          >
            Apply Filter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
