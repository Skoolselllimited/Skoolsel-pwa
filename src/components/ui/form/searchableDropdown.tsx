"use client"

import type React from "react"

import { useState, useRef, useEffect, forwardRef } from "react"
import { ChevronDown, X, Search } from "lucide-react"
import { CautionIcon } from "@/components/svgs"

export interface DropdownOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

interface CustomSearchableDropdownProps {
  label: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  options: DropdownOption[]
  error?: string
  hasError?: boolean
  className?: string
  placeholder?: string
  emptyMessage?: string
  required?: boolean
  clearable?: boolean
  disabled?: boolean
  maxHeight?: number
}

export const CustomSearchableDropdown = forwardRef<
  HTMLDivElement,
  CustomSearchableDropdownProps
>(
  (
    {
      label,
      value,
      onChange,
      onBlur,
      options,
      error,
      hasError = false,
      className = "",
      placeholder = "Search...",
      emptyMessage = "No options found",
      required = false,
      clearable = false,
      disabled = false,
      maxHeight = 200,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [highlightedIndex, setHighlightedIndex] = useState(-1)
    const [isFocused, setIsFocused] = useState(false)

    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const listRef = useRef<HTMLUListElement>(null)

    // Combine refs
    const handleRef = (element: HTMLDivElement) => {
      containerRef.current = element
      if (typeof ref === "function") {
        ref(element)
      } else if (ref) {
        ref.current = element
      }
    }

    // Filter options based on search term
    const filteredOptions = options.filter(
      (option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (option.description &&
          option.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    // Get selected option
    const selectedOption = options.find((option) => option.value === value)

    // Handle click outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false)
          setIsFocused(false)
          if (onBlur) onBlur()
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [onBlur])

    // Handle keyboard navigation
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (!isOpen) return

        switch (event.key) {
          case "ArrowDown":
            event.preventDefault()
            setHighlightedIndex((prev) =>
              prev < filteredOptions.length - 1 ? prev + 1 : 0
            )
            break
          case "ArrowUp":
            event.preventDefault()
            setHighlightedIndex((prev) =>
              prev > 0 ? prev - 1 : filteredOptions.length - 1
            )
            break
          case "Enter":
            event.preventDefault()
            if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
              handleOptionSelect(filteredOptions[highlightedIndex])
            }
            break
          case "Escape":
            setIsOpen(false)
            setIsFocused(false)
            inputRef.current?.blur()
            break
          case "Tab":
            setIsOpen(false)
            setIsFocused(false)
            break
        }
      }

      if (isOpen) {
        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
      }
    }, [isOpen, highlightedIndex, filteredOptions])

    // Scroll highlighted option into view
    useEffect(() => {
      if (highlightedIndex >= 0 && listRef.current) {
        const highlightedElement = listRef.current.children[
          highlightedIndex
        ] as HTMLElement
        if (highlightedElement) {
          highlightedElement.scrollIntoView({
            block: "nearest",
            behavior: "smooth",
          })
        }
      }
    }, [highlightedIndex])

    const handleOptionSelect = (option: DropdownOption) => {
      if (option.disabled) return
      onChange(option.value)
      setIsOpen(false)
      setSearchTerm("")
      setHighlightedIndex(-1)
      setIsFocused(false)
    }

    const handleInputClick = () => {
      if (disabled) return
      setIsOpen(!isOpen)
      setIsFocused(true)
      setHighlightedIndex(-1)
    }

    const handleInputFocus = () => {
      if (disabled) return
      setIsFocused(true)
    }

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation()
      onChange("")
      setSearchTerm("")
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value)
      setHighlightedIndex(-1)
      if (!isOpen) setIsOpen(true)
    }

    const containerBgClass = hasError ? "bg-[#FF4F4F14]" : "bg-[#919EAB14]"
    const labelColorClass = hasError ? "text-[#FF4F4F]" : "text-[#637381]"

    // Determine if label should be in "active" state
    const isLabelActive = isFocused || isOpen || value.length > 0

    return (
      <div className={className} {...props}>
        <div className="space-y-1">
          <div className="relative" ref={handleRef}>
            <div
              className={`${containerBgClass} rounded-[8px] overflow-hidden h-[53px] ${
                disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
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

                {/* Input/Display Area */}
                <div
                  className="relative h-full flex items-center"
                  onClick={handleInputClick}
                >
                  {isOpen ? (
                    <div className="flex items-center w-full h-full">
                      <input
                        ref={inputRef}
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onFocus={handleInputFocus}
                        placeholder={isLabelActive ? placeholder : ""}
                        className={`w-full h-full bg-transparent text-[#0A243F] font-circular-std font-[450] text-[14px]/[100%] border-0 focus:outline-none placeholder:text-[#919EAB] ${
                          isLabelActive ? "pt-7 pb-1.5" : "pt-0 pb-0"
                        } px-3 pr-10`}
                        disabled={disabled}
                        autoFocus
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-full h-full flex items-center text-[#0A243F] font-circular-std font-[450] text-[14px]/[100%] ${
                        isLabelActive ? "pt-7 pb-1.5" : "pt-0 pb-0"
                      } px-3 pr-10`}
                    >
                      {selectedOption ? (
                        <div className="flex flex-col flex-1">
                          <span className="truncate">
                            {selectedOption.label}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[#919EAB] flex-1">
                          {isLabelActive ? placeholder : ""}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Right side icons */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    {clearable && value && !disabled && (
                      <button
                        type="button"
                        onClick={handleClear}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <X className="w-3 h-3 text-gray-400" />
                      </button>
                    )}
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Dropdown List */}
            {isOpen && (
              <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                <ul
                  ref={listRef}
                  className="py-1"
                  style={{ maxHeight: `${maxHeight}px`, overflowY: "auto" }}
                >
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((option, index) => (
                      <li
                        key={option.value}
                        className={`px-3 py-2 cursor-pointer transition-colors ${
                          option.disabled
                            ? "opacity-50 cursor-not-allowed"
                            : index === highlightedIndex
                              ? "bg-blue-50 text-blue-600"
                              : "hover:bg-gray-50"
                        }`}
                        onClick={() => handleOptionSelect(option)}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{option.label}</span>
                          {option.description && (
                            <span className="text-sm text-gray-500">
                              {option.description}
                            </span>
                          )}
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="px-3 py-2 text-gray-500 text-center">
                      {emptyMessage}
                    </li>
                  )}
                </ul>
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

CustomSearchableDropdown.displayName = "CustomSearchableDropdown"
