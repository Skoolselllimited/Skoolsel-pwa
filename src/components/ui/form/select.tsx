"use client"

import { useState, forwardRef } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CautionIcon } from "@/components/svgs"

interface SelectOption {
  value: string
  label: string
}

interface FormSelectProps {
  label: string
  value: string
  options: SelectOption[]
  onChange?: (value: string) => void
  onValueChange?: (value: string) => void
  error?: string
  hasError?: boolean
  className?: string
  placeholder?: string
}

export const FormSelect = forwardRef<HTMLButtonElement, FormSelectProps>(
  (
    {
      label,
      value,
      options,
      onChange,
      onValueChange,
      error,
      hasError = false,
      className = "",
      placeholder = "Select...",
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false)

    const handleValueChange = (newValue: string) => {
      if (onChange) onChange(newValue)
      if (onValueChange) onValueChange(newValue)
    }

    const containerBgClass = hasError ? "bg-[#FF4F4F14]" : "bg-[#919EAB14]"
    const labelColorClass = hasError ? "text-[#FF4F4F]" : "text-[#637381]"

    // Determine if label should be in "active" state (small and positioned as label)
    const isLabelActive = isFocused || value.length > 0

    return (
      <div className={className}>
        <div className="space-y-1">
          <div className="relative">
            <div
              className={`${containerBgClass} rounded-[8px] overflow-hidden h-[53px]`}
            >
              <div className="relative h-full">
                <label
                  className={`absolute left-[12px] text-[12px]/[12px] font-[450] transition-all duration-200 ease-in-out pointer-events-none z-10 ${labelColorClass} ${
                    isLabelActive
                      ? "top-3"
                      : "top-1/2 -translate-y-1/2 text-base font-normal"
                  }`}
                >
                  {label}
                </label>
                <Select
                  value={value}
                  onValueChange={handleValueChange}
                  onOpenChange={(open) => setIsFocused(open)}
                >
                  <SelectTrigger
                    ref={ref}
                    className={`w-full h-full bg-transparent text-[#0A243F] font-circular-std font-[450] text-[14px]/[100%] border-0 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none ${
                      isLabelActive ? "pt-9 pb-1.5" : "pt-0 pb-0"
                    } px-3`}
                    {...props}
                  >
                    <SelectValue
                      placeholder={isLabelActive ? placeholder : ""}
                      className={`${!isLabelActive ? "opacity-0" : "opacity-100"}`}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          {error && (
            <div className="flex items-center gap-2 text-[#FF4F4F] text-[12px]/[18px] tracking-normal pt-1 pl-3">
              <CautionIcon />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    )
  }
)

FormSelect.displayName = "FormSelect"
