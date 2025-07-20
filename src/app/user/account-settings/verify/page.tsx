"use client"

import { useState } from "react"
import type { Country, DocumentType } from "./validation"
import VerifyIntroStep from "./_components/intro"
import DocumentSelectionStep from "./_components/documentSelection"
import DocumentInstructionsStep from "./_components/instructions"
import VerificationCompleteStep from "./_components/verificationComplete"

type VerificationStep =
  | "intro"
  | "document-selection"
  | "instructions"
  | "complete"

interface VerificationData {
  country?: Country
  documentType?: DocumentType
  documentPhoto?: string
  selfiePhoto?: string
}

export default function VerifyIdentityPage() {
  const [currentStep, setCurrentStep] = useState<VerificationStep>("intro")
  const [verificationData, setVerificationData] = useState<VerificationData>({})
  const [error, setError] = useState<string>("")

  const handleStepComplete = (stepData: Partial<VerificationData>) => {
    setVerificationData((prev) => ({ ...prev, ...stepData }))
    setError("")
  }

  const handleNext = (stepData?: Partial<VerificationData>) => {
    if (stepData) {
      handleStepComplete(stepData)
    }

    switch (currentStep) {
      case "intro":
        setCurrentStep("document-selection")
        break
      case "document-selection":
        setCurrentStep("instructions")
        break
      case "instructions":
        setCurrentStep("complete")
        break
      case "complete":
        setCurrentStep("complete")
        // Handle completion - redirect to dashboard or wherever needed
        // window.location.href = "/user/overview"
        break
    }
  }

  const handleBack = () => {
    switch (currentStep) {
      case "document-selection":
        setCurrentStep("intro")
        break
      case "instructions":
        setCurrentStep("document-selection")
        break
      case "complete":
        setCurrentStep("instructions")
        break
      default:
        // For intro and other steps, you might want to go to a previous page
        window.history.back()
        break
    }
  }

  const handleError = (errorMessage: string) => {
    setError(errorMessage)
  }
  const renderCurrentStep = () => {
    switch (currentStep) {
      case "intro":
        return <VerifyIntroStep onNext={handleNext} onBack={handleBack} />

      case "document-selection":
        return (
          <DocumentSelectionStep
            onNext={handleNext}
            onBack={handleBack}
            initialData={verificationData}
          />
        )

      case "instructions":
        return (
          <DocumentInstructionsStep
            onNext={handleNext}
            onBack={handleBack}
            documentType={verificationData?.documentType || ""}
          />
        )

      case "complete":
        return <VerificationCompleteStep onFinish={handleNext} />

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen  xl:w-[960px] flex flex-col gap-[26px]">
      {/* Current Step Component */}
      <div className="w-full xl:w-[648px]">{renderCurrentStep()}</div>
    </div>
  )
}
