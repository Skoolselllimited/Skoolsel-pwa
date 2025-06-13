"use client"

import { forwardRef, useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { CautionIcon } from "@/components/svgs"

interface FormInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  error?: string
  hasError?: boolean
  className?: string
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      value,
      onChange,
      type = "text",
      error,
      hasError = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false)
    const [isAutofilled, setIsAutofilled] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    // Combine the forwarded ref with our local ref
    const handleRef = (element: HTMLInputElement) => {
      inputRef.current = element
      if (typeof ref === "function") {
        ref(element)
      } else if (ref) {
        ref.current = element
      }
    }

    // Check for autofill
    useEffect(() => {
      const checkAutofill = () => {
        if (!inputRef.current) return

        // Check for the autofill background color
        const computedStyle = window.getComputedStyle(inputRef.current)
        const bgColor = computedStyle.backgroundColor

        // Different browsers use different colors for autofill
        // This is a simplified check that works in most cases
        const isAutofilledNow =
          bgColor.includes("rgb(232, 240, 254)") || // Chrome
          bgColor.includes("rgb(250, 255, 189)") || // Firefox
          inputRef.current.matches(":-webkit-autofill") // Another way to check

        if (isAutofilledNow !== isAutofilled) {
          setIsAutofilled(isAutofilledNow)
        }
      }

      // Check immediately and then periodically
      checkAutofill()
      const interval = setInterval(checkAutofill, 1000)
      return () => clearInterval(interval)
    }, [isAutofilled])

    const containerBgClass = hasError ? "bg-[#FF4F4F14]" : "bg-[#919EAB14]"
    const labelColorClass = hasError ? "text-[#FF4F4F]" : "text-[#637381]"

    // Determine if label should be in "active" state (small and positioned as label)
    const isLabelActive = isFocused || value.length > 0 || isAutofilled

    return (
      <div className={className}>
        <div className="space-y-1">
          <div className="relative">
            <div
              className={`${containerBgClass} rounded-[8px] overflow-hidden h-[53px]`}
            >
              <div className="relative h-full pl-[12px] pr-[10px]">
                <label
                  className={`absolute left-[12px] text-[12px]/[12px] font-[450] transition-all duration-200 ease-in-out pointer-events-none z-10 ${labelColorClass} ${
                    isLabelActive
                      ? "top-3"
                      : "top-1/2 -translate-y-1/2 text-base font-normal"
                  }`}
                >
                  {label}
                </label>
                <Input
                  ref={handleRef}
                  type={type}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className={`w-full h-full bg-transparent text-[#212B36] text-[14px]/[100%] tracking-normal border-0 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-[#919EAB] ${
                    isLabelActive ? "pt-7 pb-1.5" : "pt-0 pb-0 opacity-0"
                  } px-0`}
                  {...props}
                />
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

FormInput.displayName = "FormInput"
