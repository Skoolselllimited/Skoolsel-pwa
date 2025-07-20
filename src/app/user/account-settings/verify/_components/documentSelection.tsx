"use client"

import BackButton from "@/components/BackButton"
import { CautionIcon } from "@/components/svgs"
import PageTitle from "@/components/Title/pageTitle"
import { Button } from "@/components/ui/button"
import { FormSelect } from "@/components/ui/form"
import { CreditCard, FileText, BadgeIcon as IdCard, Shield } from "lucide-react"
import { useState } from "react"
import { CiLock } from "react-icons/ci"
import {
  validateDocumentSelection,
  type Country,
  type DocumentType,
} from "../validation"

interface DocumentSelectionStepProps {
  onNext: (data: { country: Country; documentType: DocumentType }) => void
  onBack: () => void
  initialData?: { country?: Country; documentType?: DocumentType }
}

const countries = [{ value: "NG", label: "🇳🇬 Nigeria" }]

const documentTypes = [
  {
    value: "passport",
    label: "International Passport",
    description: "International travel document",
    icon: FileText,
    recommended: true,
  },
  {
    value: "drivers_license",
    label: "Driver's License",
    description: "Government-issued driving permit",
    icon: CreditCard,
    recommended: false,
  },
  {
    value: "national_id",
    label: "National ID Card",
    description: "Government-issued identity card",
    icon: IdCard,
    recommended: false,
  },
  {
    value: "residence_permit",
    label: "Residence Permit",
    description: "Legal residence document",
    icon: Shield,
    recommended: false,
  },
]

export default function DocumentSelectionStep({
  onNext,
  onBack,
  initialData,
}: DocumentSelectionStepProps) {
  const [country, setCountry] = useState<string>(initialData?.country || "NG")
  const [documentType, setDocumentType] = useState<string>(
    initialData?.documentType || ""
  )
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validateAndProceed = () => {
    const validation = validateDocumentSelection({ country, documentType })

    if (validation.isValid) {
      onNext({
        country: country as Country,
        documentType: documentType as DocumentType,
      })
    } else {
      setErrors(validation.errors)
      setTouched({ country: true, documentType: true })
    }
  }

  const handleFieldChange = (field: string, value: string) => {
    if (field === "country") {
      setCountry(value)
    } else if (field === "documentType") {
      setDocumentType(value)
    }

    // Clear error when user makes a selection
    if (value && errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleFieldBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    // Validate field on blur
    const validation = validateDocumentSelection({
      country: field === "country" ? country : undefined,
      documentType: field === "documentType" ? documentType : undefined,
    })

    if (validation.errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: validation.errors[field] }))
    }
  }

  const isFormValid =
    country && documentType && Object.keys(errors).length === 0

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="flex xl:hidden">
          <BackButton onClick={onBack} />
        </span>
        <PageTitle text="Photo of Valid ID" />
      </div>

      <div className="w-full xl:w-[984px] bg-white flex flex-col gap-8 justify-center items-center xl:p-9 rounded-xl">
        <div className="w-full lg:w-[536px] mx-auto flex flex-col justify-center items-center gap-[18px]">
          <div className="w-full flex flex-col gap-[60px]">
            <div className="flex flex-col gap-[24px]">
              {/* Header */}
              <p className="text-[#464D61] text-[16px]/[100%] text-center font-semibold font-circular-std tracking-normal">
                We require a photo of a government ID to verify your identity.
              </p>

              <div className="flex flex-col gap-2">
                <label className="text-[#191F33] font-normal font-circular-std text-[14px]/[20px] tracking-normal">
                  Issuing Country
                </label>
                <FormSelect
                  label="Country"
                  value={country}
                  onChange={(value) => handleFieldChange("country", value)}
                  onBlur={() => handleFieldBlur("country")}
                  options={countries}
                  placeholder="Select your country"
                  error={touched.country ? errors.country : undefined}
                />
              </div>
            </div>

            {/* Document Type Selection as Boost-style Cards */}
            <div className="flex flex-col gap-4">
              <label className="text-[#191F33] font-normal font-circular-std text-[14px]/[20px] tracking-normal">
                Accepted Documents:
              </label>

              <div className="grid grid-cols-1 gap-4">
                {documentTypes.map((doc) => {
                  const isSelected = documentType === doc.value

                  return (
                    <label
                      key={doc.value}
                      className={`flex items-center justify-between p-4 rounded-[10px] cursor-pointer transition-all bg-[#919EAB14]`}
                    >
                      {/* Content */}
                      <div className="flex items-center gap-4 flex-1">
                        {/* Text Content */}
                        <span className="text-[#2E3447] font-normal font-circular-std text-[16px]/[130%] tracking-normal flex-1">
                          {doc.label}
                        </span>

                        {/* Radio Button */}
                        <div className="relative flex justify-between">
                          <input
                            type="radio"
                            name="documentType"
                            value={doc.value}
                            checked={isSelected}
                            onChange={(e) =>
                              handleFieldChange("documentType", e.target.value)
                            }
                            onBlur={() => handleFieldBlur("documentType")}
                            className="sr-only"
                          />
                          <div
                            className={`w-6 h-6 rounded-full border-[1.5px] flex items-center justify-center ${
                              isSelected
                                ? "border-[#54ABDB] bg-white"
                                : "border-[#C5C9D6] bg-white"
                            }`}
                          >
                            {isSelected && (
                              <div className="w-3 h-3 bg-[#54ABDB] rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </label>
                  )
                })}
              </div>

              {/* Document Type Error */}
              {touched.documentType && errors.documentType && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <CautionIcon />
                  {errors.documentType}
                </p>
              )}
            </div>
          </div>

          {/* Continue Button */}
          <div className="w-full max-w-[535px] mx-auto bg-white z-10 absolute top-auto right-0 left-0 bottom-4 lg-md:static grid grid-cols-1 lg-md:grid-cols-2 gap-[12px] mt-10">
            <Button
              variant="outline"
              onClick={onBack}
              className="hidden lg-md:flex w-auto h-[48px] text-lg bg-transparent border border-[#CCEEFF] text-secondary hover:bg-[#CCEEFF]/50 rounded-[6px]"
            >
              Cancel
            </Button>
            <Button
              onClick={validateAndProceed}
              disabled={!isFormValid}
              className="h-[48px] w-auto bg-secondary text-[18px]/[100%] rounded-[6px] flex gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </Button>
            <Button
              variant="outline"
              onClick={onBack}
              className="lg-md:hidden h-[48px] w-full lg-md:w-[123px] text-lg bg-transparent border border-[#CCEEFF] text-secondary hover:bg-[#CCEEFF]/50 rounded-[6px]"
            >
              Cancel
            </Button>
          </div>

          {/* Help Text */}
          <div className="h-6 rounded-md px-[21px] flex justify-center items-center gap-2">
            <span className="w-6 h-6 flex justify-center items-center bg-[#EEB960] rounded-full">
              <CiLock className="w-4 h-4" />
            </span>
            <p className="text-[12px]/[24px] tracking-normal font-circular-std font-medium text-[#636A80]">
              Your ID photo is secure and private.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
