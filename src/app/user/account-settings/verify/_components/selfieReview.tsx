"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog"
import { CheckCircle, AlertCircle, X, RotateCcw, User } from "lucide-react"
import BackButton from "@/components/BackButton"

interface SelfieReviewDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  onRetake: () => void
  selfiePhoto: string
}

export default function SelfieReview({
  isOpen,
  onClose,
  onConfirm,
  onRetake,
  selfiePhoto,
}: SelfieReviewDialogProps) {
  const [isConfirmed, setIsConfirmed] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const playPromiseRef = useRef<Promise<void> | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const handleConfirm = () => {
    setIsConfirmed(true)
    onConfirm()
    onClose()
  }

  const handleRetake = () => {
    onRetake()
    onClose()
  }
  // Cleanup function to properly stop camera
  const stopCamera = useCallback(() => {
    if (playPromiseRef.current) {
      playPromiseRef.current
        .catch(() => {
          // Ignore play promise rejections during cleanup
        })
        .finally(() => {
          playPromiseRef.current = null
        })
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop()
      })
      streamRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.srcObject = null
      videoRef.current.load()
    }
  }, [])

  // Start camera with proper error handling
  const startCamera = useCallback(async () => {
    try {
      stopCamera()

      await new Promise((resolve) => setTimeout(resolve, 200))

      const constraints = {
        video: {
          facingMode: "environment",
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 },
        },
        audio: false,
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = stream

      if (videoRef.current) {
        const video = videoRef.current
        video.srcObject = stream

        await new Promise<void>((resolve, reject) => {
          const onLoadedMetadata = () => {
            video.removeEventListener("loadedmetadata", onLoadedMetadata)
            video.removeEventListener("error", onError)
            resolve()
          }

          const onError = () => {
            video.removeEventListener("loadedmetadata", onLoadedMetadata)
            video.removeEventListener("error", onError)
            reject(new Error("Video failed to load metadata"))
          }

          if (video.readyState >= 1) {
            resolve()
          } else {
            video.addEventListener("loadedmetadata", onLoadedMetadata)
            video.addEventListener("error", onError)
          }
        })

        try {
          playPromiseRef.current = video.play()
          await playPromiseRef.current
          playPromiseRef.current = null
        } catch (playError) {
          playPromiseRef.current = null
          throw new Error("Failed to start video playback")
        }
      }
    } catch (err) {
      console.error("Camera error:", err)
    }
  }, [stopCamera])

  useEffect(() => {
    if (isOpen) {
      startCamera()
    } else {
      stopCamera()
    }

    return () => {
      stopCamera()
    }
  }, [isOpen, startCamera, stopCamera])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-[#000000] opacity-60" />
      <DialogContent className="w-full h-full max-w-none max-h-none p-0 m-0 lg-md:w-[520px] lg-md:h-auto lg-md:max-w-[520px] lg-md:max-h-[95vh] lg-md:p-10 lg-md:bg-white lg-md:rounded-xl lg-md:m-auto border-0 shadow-none">
        {/* Mobile Header - Only visible on mobile */}
        <div className="lg-md:hidden absolute top-0 left-0 right-0 z-50 bg-transparent p-4">
          <div className="flex items-center">
            <BackButton onClick={onClose} className="flex-shrink-0" />
            <span className="w-full flex-shrink-0 text-white text-center font-semibold font-circular-std text-[16px]/[130%]">
              Check your Photo
            </span>
          </div>
        </div>
        {/* Desktop Header - Only visible on desktop */}
        <DialogHeader className="hidden lg-md:flex flex-col gap-8 mb-8">
          <BackButton onClick={onClose} />
          <DialogTitle className="flex flex-col gap-2 w-full max-w-[417px] h-16 text-[#0A243F] font-circular-std tracking-normal">
            <span className="font-medium text-[24px]/[32px]">
              Check your Photo
            </span>
            <span className="font-[450] text-[16px]/[24px]">
              Make sure lighting is good and any lettering is clear before
              continuing.
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="relative w-full h-full lg-md:w-[439px] lg-md:h-[515px] overflow-hidden">
          {/* Background video feed (blurred and flipped) */}
          <video
            ref={videoRef}
            className="absolute w-full h-full object-cover z-10 scale-x-[-1]"
            playsInline
            muted
            preload="metadata"
          />
          {selfiePhoto ? (
            <img
              src={selfiePhoto || "/placeholder.svg"}
              alt="Your selfie"
              className={`absolute left-1/2 top-1/3 lg-md:top-1/3 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[340px] lg-md:w-[262px] lg-md:h-[320px] rounded-full z-30 border-[2px] border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.7)] select-none touch-none object-cover mt-12`}
              onError={(e) => {
                console.error("Image failed to load:", e)
                e.currentTarget.src =
                  "/placeholder.svg?height=220&width=350&text=Document+Photo"
              }}
            />
          ) : (
            <div className="absolute left-1/2 top-1/3 lg-md:top-1/3 -translate-x-1/2 -translate-y-1/2 w-[92%] h-[220px] lg-md:w-[402px] lg-md:h-[267px] bg-gray-200 rounded-lg border-2 border-white z-30 flex items-center justify-center">
              <span className="text-gray-500 text-sm">No photo captured</span>
            </div>
          )}
          {/* Instruction text positioned at bottom center of frame */}
          <div className="lg-md:hidden w-full max-w-[400.7px] absolute bottom-66 lg-md:bottom-86 left-1/2 -translate-x-1/2 z-30">
            <p className="text-white font-circular-std font-bold text-[16px]/[130%] tracking-normal text-center">
              Make sure lighting is good and any
              <br /> lettering is clear before continuing.
            </p>
          </div>
        </div>

        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[438px] px-4 space-y-3 z-[9999] lg-md:relative lg-md:bottom-auto lg-md:left-auto lg-md:translate-x-0 lg-md:mt-4 lg-md:px-0 lg-md:z-auto">
          <Button
            onClick={handleConfirm}
            disabled={isConfirmed || !selfiePhoto}
            className="w-full h-[50px] rounded-[6px] bg-[#54ABDB] hover:bg-[#54ABDB]/70 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-semibold"
          >
            Submit
          </Button>
          <Button
            onClick={handleRetake}
            variant="outline"
            className="w-full h-[50px] rounded-[6px] text-white lg-md:text-[#464D61] text-[16px]/[50px] border-none hover:bg-white/10 lg-md:hover:bg-gray-50 flex items-center justify-center gap-2 bg-transparent lg-md:bg-transparent shadow-none font-semibold"
          >
            Retake
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
