"use client"

import { CautionIcon, UploadingIcon } from "@/components/svgs"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"

interface DocumentUploadProgressProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  onError: (error: string) => void
  documentPhoto: string
}

export default function DocumentUploadProgress({
  isOpen,
  onClose,
  onComplete,
  onError,
  documentPhoto,
}: DocumentUploadProgressProps) {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState<
    "validation" | "uploading" | "complete" | "error"
  >("validation")
  const [errorMessage, setErrorMessage] = useState("")

  // Extract photo metadata from base64 data
  const extractPhotoMetadata = async (base64Data: string) => {
    return new Promise<{
      data: string
      size: number
      format: string
      width: number
      height: number
      aspectRatio: number
    }>((resolve, reject) => {
      if (!base64Data.startsWith("data:image/")) {
        reject(new Error("Invalid image format"))
        return
      }

      const img = new Image()
      img.onload = () => {
        const format = base64Data.split(";")[0].split("/")[1].toLowerCase()
        const sizeInBytes = Math.round((base64Data.length * 3) / 4)

        resolve({
          data: base64Data,
          size: sizeInBytes,
          format,
          width: img.width,
          height: img.height,
          aspectRatio: img.width / img.height,
        })
      }
      img.onerror = () => reject(new Error("Failed to load image"))
      img.src = base64Data
    })
  }

  // Simulate file upload with progress
  const simulateUpload = async (fileData: string) => {
    const totalChunks = 20

    for (let chunk = 0; chunk <= totalChunks; chunk++) {
      const progress = Math.min((chunk / totalChunks) * 100, 100)
      setUploadProgress(progress)

      // Simulate network delay
      await new Promise((resolve) =>
        setTimeout(resolve, 100 + Math.random() * 100)
      )

      // Simulate potential error (1% chance per chunk)
      if (Math.random() < 0.01 && chunk < totalChunks) {
        throw new Error("Network error during document upload")
      }
    }
  }

  const simulateDocumentUpload = async () => {
    try {
      setCurrentStep("validation")
      setUploadProgress(0)
      setErrorMessage("")

      // Step 1: Validate document photo
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Step 2: Upload document photo
      setCurrentStep("uploading")
      await simulateUpload(documentPhoto)

      // Complete
      setCurrentStep("complete")
      setTimeout(() => {
        onComplete()
        onClose()
      }, 1500)
    } catch (error) {
      setCurrentStep("error")
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Document upload failed. Please try again."
      setErrorMessage(errorMsg)
      onError(errorMsg)
    }
  }

  useEffect(() => {
    if (isOpen) {
      simulateDocumentUpload()
    } else {
      setUploadProgress(0)
      setCurrentStep("validation")
      setErrorMessage("")
    }
  }, [isOpen])

  const handleClose = () => {
    if (currentStep !== "validation" && currentStep !== "uploading") {
      onClose()
    }
  }

  const handleRetry = () => {
    setCurrentStep("validation")
    setUploadProgress(0)
    setErrorMessage("")
    simulateDocumentUpload()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogOverlay className="bg-[#000000] opacity-60" />
      <DialogContent className="w-full h-full max-w-none max-h-none m-0 lg:w-[520px] lg:h-auto lg:max-w-[491px] lg:max-h-[409px] px-4 py-10 lg:p-10 bg-white lg:rounded-xl lg:m-auto border-0 shadow-none">
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-[31px]">
          <UploadingIcon />

          <div className="flex flex-col gap-[17px]">
            <p className="font-circular-std font-normal text-[#2E3447] text-[20px]/[100%] -tracking-[1%] max-w-[411px]">
              Please don&apos;t close the app until we&apos;ve uploaded your
              document. This usually takes less than a minute.
            </p>

            {/* Progress bar for validation and uploading */}
            {currentStep !== "error" && currentStep !== "complete" && (
              <div className="w-full bg-[#DFE3E8] rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 bg-secondary ${
                    currentStep === "validation" ? "animate-pulse" : ""
                  }`}
                  style={{
                    width:
                      currentStep === "validation"
                        ? "30%"
                        : `${uploadProgress}%`,
                  }}
                ></div>
              </div>
            )}
          </div>

          {/* Error message */}
          {currentStep === "error" && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-2">
                <CautionIcon />
                <div>
                  <p className="text-sm font-medium text-red-800 mb-1">
                    Document Upload Failed
                  </p>
                  <p className="text-sm text-destructive">{errorMessage}</p>
                </div>
              </div>
            </div>
          )}

          {/* Retry button */}
          {currentStep === "error" && (
            <Button onClick={handleRetry}>Try Again</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
