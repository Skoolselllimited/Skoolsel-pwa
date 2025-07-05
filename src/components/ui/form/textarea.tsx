"use client"

import { CautionIcon } from "@/components/svgs"
import { Textarea } from "@/components/ui/textarea"
import type React from "react"
import { forwardRef, useState } from "react"

interface TextareaInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  error?: string
  hasError?: boolean
  className?: string
  placeholder?: string
  rows?: number
  maxLength?: number
  showCharCount?: boolean
}

export const TextareaInput = forwardRef<
  HTMLTextAreaElement,
  TextareaInputProps
>(
  (
    {
      label,
      value,
      onChange,
      onBlur,
      error,
      hasError = false,
      className = "",
      placeholder = "Enter text...",
      rows = 4,
      maxLength,
      showCharCount = false,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false)

    const containerBgClass = hasError ? "bg-[#FF4F4F14]" : "bg-[#919EAB14]"
    const labelColorClass = hasError ? "text-[#FF4F4F]" : "text-[#637381]"

    // Determine if label should be in "active" state (small and positioned as label)
    const isLabelActive = isFocused || value.length > 0

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value
      if (maxLength && newValue.length > maxLength) return
      onChange(newValue)
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
              className={`${containerBgClass} rounded-[8px] overflow-hidden min-h-[135px]`}
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
                <Textarea
                  ref={ref}
                  value={value}
                  onChange={handleChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={handleBlur}
                  placeholder={isLabelActive ? placeholder : ""}
                  rows={rows}
                  maxLength={maxLength}
                  className={`w-full bg-transparent text-[#0A243F] font-circular-std font-[450] text-[14px]/[100%] border-0 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none resize-none ${
                    isLabelActive ? "pt-9 pb-3" : "pt-0 pb-0"
                  } px-3`}
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

TextareaInput.displayName = "TextareaInput"
