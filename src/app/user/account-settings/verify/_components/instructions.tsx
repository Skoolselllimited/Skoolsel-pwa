"use client"

import BackButton from "@/components/BackButton"
import PageTitle from "@/components/Title/pageTitle"
import { DocumentIcon } from "@/components/svgs"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  validateDocumentSelection,
  type Country,
  type DocumentType,
} from "../validation"
import DocumentCapture from "./capture"
import DocumentUploadProgress from "./documentUploadProgress"
import DocumentSuccessInstructions from "./nextInstruction"
import DocumentReview from "./review"
import SelfieCapture from "./selfie"
import SelfieUploadProgress from "./selfieProgress"
import SelfieReview from "./selfieReview"

interface DocumentInstructionsStepProps {
  onNext: (data: {
    country: Country
    documentType: DocumentType
    documentPhoto: string
    selfiePhoto: string
  }) => void
  onBack: () => void
  documentType: string
  initialData?: {
    country?: Country
    documentType?: DocumentType
    documentPhoto?: string
    selfiePhoto?: string
  }
}

export default function DocumentInstructionsStep({
  onNext,
  onBack,
  documentType,
  initialData,
}: DocumentInstructionsStepProps) {
  const [country, setCountry] = useState<string>(initialData?.country || "NG")
  const [documentPhoto, setDocumentPhoto] = useState<string>(
    initialData?.documentPhoto || ""
  )
  const [selfiePhoto, setSelfiePhoto] = useState<string>(
    initialData?.selfiePhoto || ""
  )
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Upload status tracking
  const [documentUploaded, setDocumentUploaded] = useState(false)
  const [selfieUploaded, setSelfieUploaded] = useState(false)

  // Dialog states
  const [showDocumentCaptureDialog, setShowDocumentCaptureDialog] =
    useState(false)
  const [showDocumentReviewDialog, setShowDocumentReviewDialog] =
    useState(false)
  const [showDocumentUploadProgress, setShowDocumentUploadProgress] =
    useState(false)
  const [showDocumentSuccessInstructions, setShowDocumentSuccessInstructions] =
    useState(false)
  const [showSelfieCaptureDialog, setShowSelfieCaptureDialog] = useState(false)
  const [showSelfieReviewDialog, setShowSelfieReviewDialog] = useState(false)
  const [showSelfieUploadProgress, setShowSelfieUploadProgress] =
    useState(false)

  const getDocumentLabel = (type: string) => {
    const labels: Record<string, string> = {
      passport: "Passport",
      drivers_license: "Driver's License",
      national_id: "National ID Card",
      residence_permit: "Residence Permit",
    }
    return labels[type] || type
  }

  const validateAndProceed = () => {
    const validation = validateDocumentSelection({ country, documentType })
    if (
      validation.isValid &&
      documentPhoto &&
      selfiePhoto &&
      documentUploaded &&
      selfieUploaded
    ) {
      onNext({
        country: country as Country,
        documentType: documentType as DocumentType,
        documentPhoto,
        selfiePhoto,
      })
      console.log("Test", country, documentType, documentPhoto, selfiePhoto)
    } else {
      setErrors(validation.errors)
      setTouched({ country: true, documentType: true })
      if (!documentPhoto) {
        setErrors((prev) => ({
          ...prev,
          documentPhoto: "Document photo is required",
        }))
      }
      if (!selfiePhoto) {
        setErrors((prev) => ({
          ...prev,
          selfiePhoto: "Selfie photo is required",
        }))
      }
    }
  }

  const handleCaptureDocument = () => {
    if (!documentType) {
      setErrors((prev) => ({
        ...prev,
        documentType: "Please select a document type first",
      }))
      setTouched((prev) => ({ ...prev, documentType: true }))
      return
    }
    setShowDocumentCaptureDialog(true)
  }

  const handleDocumentPhotoCapture = (photoData: string) => {
    setDocumentPhoto(photoData)
    setErrors((prev) => ({ ...prev, documentPhoto: "" }))
    setShowDocumentCaptureDialog(false)
    setShowDocumentReviewDialog(true)
  }

  const handleDocumentReviewConfirm = () => {
    setShowDocumentReviewDialog(false)
    setShowDocumentUploadProgress(true)
  }

  const handleDocumentRetake = () => {
    setDocumentPhoto("")
    setShowDocumentReviewDialog(false)
    setShowDocumentCaptureDialog(true)
  }

  const handleDocumentUploadComplete = () => {
    setDocumentUploaded(true)
    setShowDocumentUploadProgress(false)
    // Show success instructions before selfie capture
    setShowDocumentSuccessInstructions(true)
  }

  const handleDocumentUploadError = (error: string) => {
    setErrors((prev) => ({ ...prev, documentUpload: error }))
    setShowDocumentUploadProgress(false)
    setDocumentUploaded(false)
  }

  const handleContinueToSelfie = () => {
    setShowDocumentSuccessInstructions(false)
    setShowSelfieCaptureDialog(true)
  }

  const handleRetakeDocumentFromSuccess = () => {
    setShowDocumentSuccessInstructions(false)
    setDocumentPhoto("")
    setDocumentUploaded(false)
    setShowDocumentCaptureDialog(true)
  }

  const handleSelfiePhotoCapture = (photoData: string) => {
    setSelfiePhoto(photoData)
    setErrors((prev) => ({ ...prev, selfiePhoto: "" }))
    setShowSelfieCaptureDialog(false)
    setShowSelfieReviewDialog(true)
  }

  const handleSelfieReviewConfirm = () => {
    setShowSelfieReviewDialog(false)
    setShowSelfieUploadProgress(true)
  }

  const handleSelfieRetake = () => {
    setSelfiePhoto("")
    setShowSelfieReviewDialog(false)
    setShowSelfieCaptureDialog(true)
  }

  const handleSelfieUploadComplete = () => {
    console.log("i have finished")
    onNext({
      country: country as Country,
      documentType: documentType as DocumentType,
      documentPhoto,
      selfiePhoto,
    })
    // validateAndProceed()
    // setSelfieUploaded(true)
    setShowSelfieUploadProgress(false)

    // Validate and proceed to next step
  }

  const handleSelfieUploadError = (error: string) => {
    setErrors((prev) => ({ ...prev, selfieUpload: error }))
    setShowSelfieUploadProgress(false)
    setSelfieUploaded(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="flex xl:hidden">
          <BackButton onClick={onBack} />
        </span>
        <PageTitle text={`Prepare your ${getDocumentLabel(documentType)}`} />
      </div>

      <div className="w-full xl:w-[984px] bg-white flex flex-col gap-8 justify-center items-center xl:p-9 rounded-xl">
        <div className="w-full lg:w-[536px] mx-auto flex flex-col justify-center items-center gap-[18px]">
          <div className="flex flex-col justify-center items-center gap-[60px]">
            <DocumentIcon className="w-[150px]" />

            {/* Instructions */}
            <div className="flex flex-col gap-3">
              <h3 className="font-circular-std font-bold text-[#2E3447] text-[24px]/[100%] tracking-normal">
                How to successfully capture your document
              </h3>
              <ul className="text-[15px]/[100%] text-[#636A80] font-circular-std font-normal space-y-2 text-left tracking-normal">
                <li>
                  <span>&bull;</span> Your ID isn&apos;t expired
                </li>
                <li>
                  <span>&bull;</span> Find a light area
                </li>
                <li>
                  <span>&bull;</span> Make sure the details are sharp and are
                  not covered
                </li>
                <li>
                  <span>&bull;</span> Ensure all corners and edges are visible
                </li>
              </ul>
            </div>
          </div>
          {/* Error Messages */}
          {Object.keys(errors).length > 0 && (
            <div className="w-full max-w-[535px] p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-medium text-red-900 mb-2">
                Please fix the following issues:
              </h4>
              <ul className="space-y-1">
                {Object.entries(errors).map(([key, error]) => (
                  <li key={key} className="text-sm text-red-700">
                    • {error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Continue Button */}
          <div className="w-full max-w-[535px] mx-auto bg-white z-10 absolute top-auto right-0 left-0 bottom-4 lg:static grid grid-cols-1 lg:grid-cols-2 gap-[12px] mt-10">
            <Button
              variant="outline"
              onClick={onBack}
              className="hidden lg:flex w-auto h-[48px] text-lg bg-transparent border border-[#CCEEFF] text-secondary hover:bg-[#CCEEFF]/50 rounded-[6px]"
            >
              Go back
            </Button>
            <Button
              onClick={handleCaptureDocument}
              className="h-[48px] w-auto bg-secondary text-[18px]/[100%] rounded-[6px] flex gap-3 cursor-pointer"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              onClick={onBack}
              className="lg:hidden h-[48px] w-full lg:w-[123px] text-lg bg-transparent border border-[#CCEEFF] text-secondary hover:bg-[#CCEEFF]/50 rounded-[6px]"
            >
              Go back
            </Button>
          </div>
        </div>
      </div>

      {/* All Dialogs */}
      <DocumentCapture
        isOpen={showDocumentCaptureDialog}
        onClose={() => setShowDocumentCaptureDialog(false)}
        onPhotoCapture={handleDocumentPhotoCapture}
        documentType={documentType}
      />

      <DocumentReview
        isOpen={showDocumentReviewDialog}
        onClose={() => setShowDocumentReviewDialog(false)}
        onConfirm={handleDocumentReviewConfirm}
        onRetake={handleDocumentRetake}
        documentPhoto={documentPhoto}
        documentType={documentType}
      />

      <DocumentUploadProgress
        isOpen={showDocumentUploadProgress}
        onClose={() => setShowDocumentUploadProgress(false)}
        onComplete={handleDocumentUploadComplete}
        onError={handleDocumentUploadError}
        documentPhoto={documentPhoto}
      />

      <DocumentSuccessInstructions
        isOpen={showDocumentSuccessInstructions}
        onClose={() => setShowDocumentSuccessInstructions(false)}
        onContinueToSelfie={handleContinueToSelfie}
        onRetakeDocument={handleRetakeDocumentFromSuccess}
        documentPhoto={documentPhoto}
      />

      <SelfieCapture
        isOpen={showSelfieCaptureDialog}
        onClose={() => setShowSelfieCaptureDialog(false)}
        onPhotoCapture={handleSelfiePhotoCapture}
      />

      <SelfieReview
        isOpen={showSelfieReviewDialog}
        onClose={() => setShowSelfieReviewDialog(false)}
        onConfirm={handleSelfieReviewConfirm}
        onRetake={handleSelfieRetake}
        selfiePhoto={selfiePhoto}
      />

      <SelfieUploadProgress
        isOpen={showSelfieUploadProgress}
        onClose={() => setShowSelfieUploadProgress(false)}
        onComplete={handleSelfieUploadComplete}
        onError={handleSelfieUploadError}
        selfiePhoto={selfiePhoto}
      />
    </div>
  )
}
