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
import { z } from "zod"

// Zod schema for selfie validation
const PhotoSchema = z.object({
  data: z.string().min(1, "Photo data is required"),
  size: z
    .number()
    .min(1000, "Photo is too small")
    .max(10 * 1024 * 1024, "Photo is too large (max 10MB)"),
  format: z.enum(["jpeg", "jpg", "png", "webp"], {
    errorMap: () => ({
      message: "Invalid photo format. Only JPEG, PNG, and WebP are allowed.",
    }),
  }),
  width: z.number().min(200, "Photo width is too small (minimum 200px)"),
  height: z.number().min(200, "Photo height is too small (minimum 200px)"),
})

const SelfiePhotoSchema = PhotoSchema.extend({
  aspectRatio: z
    .number()
    .min(0.5, "Invalid selfie aspect ratio")
    .max(2.0, "Invalid selfie aspect ratio"),
})

interface SelfieUploadProgressProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  onError: (error: string) => void
  selfiePhoto: string
}

export default function SelfieUploadProgress({
  isOpen,
  onClose,
  onComplete,
  onError,
  selfiePhoto,
}: SelfieUploadProgressProps) {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState<
    "validation" | "uploading" | "processing" | "complete" | "error"
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

  // Validate photo using Zod schema
  const validatePhoto = async (photoData: string) => {
    try {
      const metadata = await extractPhotoMetadata(photoData)
      const validationResult = SelfiePhotoSchema.safeParse(metadata)

      if (!validationResult.success) {
        const errorMessages = validationResult.error.errors
          .map((err) => err.message)
          .join(", ")
        throw new Error(`Selfie validation failed: ${errorMessages}`)
      }

      return validationResult.data
    } catch (error) {
      throw new Error(
        `Selfie validation error: ${error instanceof Error ? error.message : "Unknown error"}`
      )
    }
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
        throw new Error("Network error during selfie upload")
      }
    }
  }

  const simulateSelfieUpload = async () => {
    try {
      setCurrentStep("validation")
      setUploadProgress(0)
      setErrorMessage("")

      // Step 1: Validate selfie photo
      await new Promise((resolve) => setTimeout(resolve, 500))
      await validatePhoto(selfiePhoto)

      // Step 2: Upload selfie photo
      setCurrentStep("uploading")
      await simulateUpload(selfiePhoto)

      // Step 3: Processing
      setCurrentStep("processing")
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i)
        await new Promise((resolve) => setTimeout(resolve, 200))
      }

      // Complete
      setCurrentStep("complete")
      setTimeout(() => {
        onComplete() // This will trigger navigation to profile completed step
      }, 1500)
    } catch (error) {
      setCurrentStep("error")
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Selfie upload failed. Please try again."
      setErrorMessage(errorMsg)
      onError(errorMsg)
    }
  }

  useEffect(() => {
    if (isOpen) {
      simulateSelfieUpload()
    } else {
      setUploadProgress(0)
      setCurrentStep("validation")
      setErrorMessage("")
    }
  }, [isOpen])

  useEffect(() => {
    if (currentStep === "complete") {
      const timeout = setTimeout(() => {
        onComplete()
      }, 1500)

      return () => clearTimeout(timeout)
    }
  }, [currentStep, onComplete])

  const handleClose = () => {
    if (
      currentStep !== "validation" &&
      currentStep !== "uploading" &&
      currentStep !== "processing"
    ) {
      onClose()
    }
  }

  const handleRetry = () => {
    setCurrentStep("validation")
    setUploadProgress(0)
    setErrorMessage("")
    simulateSelfieUpload()
  }

  const getProgressWidth = () => {
    switch (currentStep) {
      case "validation":
        return "30%"
      case "uploading":
        return `${uploadProgress}%`
      case "processing":
        return "100%"
      default:
        return "0%"
    }
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
              selfie and completed verification. This usually takes less than a
              minute.
            </p>

            {/* Progress bar for validation, uploading, and processing */}
            {currentStep !== "error" && currentStep !== "complete" && (
              <div className="flex flex-col gap-2">
                <div className="w-full bg-[#DFE3E8] rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 bg-secondary ${
                      currentStep === "validation" ||
                      currentStep === "processing"
                        ? "animate-pulse"
                        : ""
                    }`}
                    style={{
                      width: getProgressWidth(),
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Success message */}
          {/* {currentStep === "complete" && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-2">
                <VerifiedIcon />
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    Verification Complete
                  </p>
                  <p className="text-sm text-success">
                    Your selfie has been validated and uploaded successfully.
                    Redirecting to complete your profile...
                  </p>
                </div>
              </div>
            </div>
          )} */}

          {/* Error message */}
          {currentStep === "error" && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-2">
                <CautionIcon />
                <div>
                  <p className="text-sm font-medium text-red-800 mb-1">
                    Selfie Upload Failed
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
