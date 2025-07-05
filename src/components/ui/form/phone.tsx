"use client"

import { useState, forwardRef } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { CautionIcon } from "@/components/svgs"

interface CountryCode {
  code: string
  country: string
  flag: string
}

interface PhoneInputProps {
  label: string
  value: string
  countryCode: string
  onChange?: (value: string) => void
  onValueChange?: (value: string) => void
  onCountryCodeChange: (code: string) => void
  onBlur?: () => void
  error?: string
  hasError?: boolean
  className?: string
  placeholder?: string
}

const countryCodes: CountryCode[] = [
  { code: "+234", country: "Nigeria", flag: "🇳🇬" },
  { code: "+1", country: "United States", flag: "🇺🇸" },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧" },
  { code: "+233", country: "Ghana", flag: "🇬🇭" },
  { code: "+254", country: "Kenya", flag: "🇰🇪" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
]

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      label,
      value,
      countryCode,
      onChange,
      onValueChange,
      onCountryCodeChange,
      onBlur,
      error,
      hasError = false,
      className = "",
      placeholder = "Enter phone number",
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false)

    const containerBgClass = hasError ? "bg-[#FF4F4F14]" : "bg-[#919EAB14]"
    const labelColorClass = hasError ? "text-[#FF4F4F]" : "text-[#637381]"

    // Determine if label should be in "active" state (small and positioned as label)
    const isLabelActive = isFocused || value.length > 0

    // Handle value change - support both onChange and onValueChange
    const handleValueChange = (newValue: string) => {
      onChange?.(newValue)
      onValueChange?.(newValue)
    }

    const handleBlur = () => {
      setIsFocused(false)
      if (onBlur) onBlur()
    }

    return (
      <div className={className}>
        <div className="space-y-1">
          <div className="relative">
            <div
              className={`${containerBgClass} rounded-[8px] overflow-hidden h-[53px]`}
            >
              <div className="relative h-full flex items-center">
                <label
                  className={`absolute left-[12px] text-[12px]/[12px] font-[450] transition-all duration-200 ease-in-out pointer-events-none z-10 ${labelColorClass} ${
                    isLabelActive
                      ? "top-3"
                      : "top-1/2 -translate-y-1/2 text-base font-normal"
                  }`}
                >
                  {label}
                </label>

                {/* Country Code Select */}
                <div className="flex-shrink-0">
                  <Select
                    value={countryCode}
                    onValueChange={onCountryCodeChange}
                    onOpenChange={(open) =>
                      setIsFocused(open || value.length > 0)
                    }
                  >
                    <SelectTrigger
                      className={`w-auto h-full bg-transparent text-[#0A243F] font-circular-std font-[450] border-0 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none ${
                        isLabelActive ? "pt-7 pb-1.5" : "pt-0 pb-0"
                      } pl-3 pr-1`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <div className="flex items-center gap-2">
                            <span>{country.flag}</span>
                            <span>{country.code}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Phone Number Input */}
                <Input
                  ref={ref}
                  type="tel"
                  value={value}
                  onChange={(e) => handleValueChange(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={handleBlur}
                  placeholder={isLabelActive ? placeholder : ""}
                  className={`flex-1 h-full bg-transparent text-[#0A243F] font-circular-std font-[450] text-[14px]/[100%] border-0 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none ${
                    isLabelActive ? "pt-7 pb-1.5" : "pt-0 pb-0"
                  } px-2`}
                  {...props}
                />
              </div>
            </div>
          </div>
          {error && (
            <div className="flex items-center gap-2 text-[#FF4F4F] text-[12px]/[18px] tracking-normal pt-1 pl-2">
              <CautionIcon />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    )
  }
)

PhoneInput.displayName = "PhoneInput"
