"use client"

import BackButton from "@/components/BackButton"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog"

interface DocumentSuccessInstructionsProps {
  isOpen: boolean
  onClose: () => void
  onContinueToSelfie: () => void
  onRetakeDocument: () => void
  documentPhoto: string
}

export default function DocumentSuccessInstructions({
  isOpen,
  onClose,
  onContinueToSelfie,
  onRetakeDocument,
  documentPhoto,
}: DocumentSuccessInstructionsProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-[#000000] opacity-60" />
      <DialogContent className="w-full h-full max-w-none max-h-none m-0 lg:w-[520px] lg:h-auto lg:max-w-[520px] lg:max-h-[90vh] px-4 py-6 lg:p-8 bg-white lg:rounded-xl lg:m-auto border-0 shadow-none">
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 relative">
          {/* Header with back button */}
          <div className="flex items-center">
            <BackButton onClick={onClose} className="flex-shrink-0" />
          </div>

          {/* Document Image */}
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-[420px] h-[280px] rounded-md overflow-hidden">
              {documentPhoto ? (
                <img
                  src={documentPhoto || "/placeholder.svg"}
                  alt="Captured document"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/images/passport-sample.png"
                  }}
                />
              ) : (
                <img
                  src="/images/passport-sample.png"
                  alt="Document sample"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-3">
            {/* Title */}
            <h2 className="font-circular-std font-bold text-[#2E3447] text-[20px]/[100%] tracking-normal">
              ID Captured! What's Next?
            </h2>

            {/* Instructions */}
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-[#636A80] flex-shrink-0">&bull;</span>
                <p className="text-[#636A80] font-circular-std font-normal text-[15px]/[20px] tracking-normal">
                  Now take a selfie to verify your identity.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#636A80] flex-shrink-0">&bull;</span>

                <p className="text-[#636A80] font-circular-std font-normal text-[15px]/[20px] tracking-normal">
                  Make sure your face is clear and matches your ID.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#636A80] flex-shrink-0">&bull;</span>

                <p className="text-[#636A80] font-circular-std font-normal text-[15px]/[20px] tracking-normal">
                  We&apos;ll process your verification and notify you once it’s
                  done.
                </p>
              </div>
            </div>
          </div>
          {/* Buttons */}
          <div className="w-full flex flex-col gap-3 mt-6 absolute bottom-4 lg-md:relative lg-md:bottom-0">
            <Button
              onClick={onContinueToSelfie}
              className="w-full h-[50px] bg-[#54ABDB] hover:bg-[#54ABDB]/90 text-white font-semibold text-[16px] rounded-[6px]"
            >
              Continue To Selfie
            </Button>
            <Button
              onClick={onRetakeDocument}
              variant="outline"
              className="w-full h-[50px] bg-transparent border-0 text-[#636A80] hover:bg-gray-50 font-semibold text-[16px] rounded-[6px]"
            >
              Retake ID Card
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
