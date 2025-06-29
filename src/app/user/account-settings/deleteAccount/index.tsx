"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { TextareaInput } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-mobile"
import BackButton from "@/components/BackButton"

interface DeleteAccountDialogProps {
  children: React.ReactNode
}

const deleteReasons = [
  "I no longer need my account",
  "I found what I was looking for",
  "I'm switching to another platform",
  "I have privacy concerns",
  "I'm creating a new account",
  "Other",
]

export default function DeleteAccountDialog({
  children,
}: DeleteAccountDialogProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedReason, setSelectedReason] = useState("")
  const [additionalFeedback, setAdditionalFeedback] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const isLargeDevice = useMediaQuery("(min-width: 1024px)")

  const handleContinue = () => {
    if (step === 1) {
      if (selectedReason === "Other") {
        setStep(2)
      } else {
        handleDeleteAccount()
      }
    } else if (step === 2) {
      handleDeleteAccount()
    }
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Handle actual account deletion logic here
    console.log("Deleting account with reason:", selectedReason)
    if (additionalFeedback) {
      console.log("Additional feedback:", additionalFeedback)
    }

    setIsDeleting(false)
    setOpen(false)

    // Reset state
    setStep(1)
    setSelectedReason("")
    setAdditionalFeedback("")
  }

  const handleBack = () => {
    if (step === 2) {
      setStep(1)
    } else {
      setOpen(false)
    }
  }

  const canContinue =
    selectedReason !== "" &&
    (step === 1 || (step === 2 && additionalFeedback.trim() !== ""))

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          "p-0 overflow-hidden flex flex-col",
          isLargeDevice
            ? "sm:max-w-[800px] max-h-[90vh] rounded-lg"
            : "w-full h-full max-w-none max-h-none m-0 shadow-none border-0 rounded-none"
        )}
      >
        <div className="flex flex-col h-full bg-white">
          {/* Header */}
          <DialogTitle className="flex items-center justify-between p-4">
            <BackButton onClick={handleBack} />
            <span className="font-circular-std font-extrabold text-[#4E4E5A] text-[20px]/[32px] tracking-normal">
              {step === 1 ? "Give Us Your Feedback" : "Tell Us More"}
            </span>
            <div className="w-9" /> {/* Spacer for centering */}
          </DialogTitle>

          {/* Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {step === 1 ? (
              <>
                {/* Warning Message */}
                <div className="p-3 bg-[#FFF8E0] mx-4 mt-4 rounded-r">
                  <p className="text-sm text-[#664C00]">
                    Oh no! Deleting your account means missing out on great
                    deals, exclusive student offers, and a trusted marketplace.
                    Are you sure you want to leave?
                  </p>
                </div>

                {/* Reason Selection */}
                <div className="flex-1 py-6 px-3 overflow-y-auto">
                  <RadioGroup
                    value={selectedReason}
                    onValueChange={setSelectedReason}
                    className="space-y-6"
                  >
                    {deleteReasons.map((reason) => (
                      <div key={reason} className="flex items-center space-x-3">
                        <RadioGroupItem value={reason} id={reason} />
                        <Label
                          htmlFor={reason}
                          className="text-sm font-medium text-gray-700 cursor-pointer flex-1"
                        >
                          {reason}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </>
            ) : (
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  <TextareaInput
                    label="Please share your reason..."
                    placeholder="Please share your reason..."
                    value={additionalFeedback}
                    onChange={(value: string) => setAdditionalFeedback(value)}
                    rows={6}
                    maxLength={500}
                    showCharCount={true}
                  />
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="p-4">
              <Button
                onClick={handleContinue}
                disabled={!canContinue || isDeleting}
                className="w-full rounded bg-[#54ABDB] hover:bg-[#54ABDB] font-bold h-[50px]"
              >
                {isDeleting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Deleting Account...
                  </div>
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
