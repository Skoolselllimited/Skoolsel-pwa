"use client"

import { useState, forwardRef, useEffect, useRef, ReactNode } from "react"
import { Input } from "@/components/ui/input"
import { CautionIcon } from "@/components/svgs"

interface FormInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  type?: string
  error?: string
  hasError?: boolean
  className?: string
  placeholder?: string
  required?: boolean
  icon?: ReactNode
  inputMode?: string
  pattern?: string
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      value,
      onChange,
      onBlur,
      type = "text",
      inputMode,
      error,
      hasError = false,
      className = "",
      placeholder = "",
      required = false,
      pattern,
      icon,
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
        const isAutofilledNow =
          bgColor.includes("rgb(232, 240, 254)") || // Chrome
          bgColor.includes("rgb(250, 255, 189)") || // Firefox
          inputRef.current.matches(":-webkit-autofill") // Webkit browsers

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
              <div className="relative h-full">
                <label
                  className={`absolute left-[12px] text-[12px]/[12px] font-[450] transition-all duration-200 ease-in-out pointer-events-none z-10 ${labelColorClass} ${
                    isLabelActive
                      ? "top-3"
                      : "top-1/2 -translate-y-1/2 text-base font-normal"
                  }`}
                >
                  {label}
                  {required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <Input
                  ref={handleRef}
                  type={type}
                  value={value}
                  inputMode={
                    inputMode as React.HTMLAttributes<HTMLInputElement>["inputMode"]
                  }
                  pattern={pattern}
                  onChange={(e) => onChange(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={handleBlur}
                  placeholder={isLabelActive ? placeholder : ""}
                  className={`w-full h-full bg-transparent text-[#0A243F] font-circular-std font-[450] text-[14px]/[100%] tracking-normal border-0 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-[#919EAB] ${
                    isLabelActive ? "pt-7 pb-1.5" : "pt-0 pb-0 opacity-0"
                  } px-3`}
                  {...props}
                />
              </div>
            </div>
            {icon && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium pointer-events-none">
                {icon}
              </div>
            )}
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

FormInput.displayName = "FormInput"
