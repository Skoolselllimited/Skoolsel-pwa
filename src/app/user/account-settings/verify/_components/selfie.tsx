"use client"
import { useState, useRef, useEffect, useCallback } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog"
import { Camera } from "lucide-react"
import { validatePhoto } from "../validation"
import { CautionIcon } from "@/components/svgs"
import BackButton from "@/components/BackButton"

interface SelfieCaptureProps {
  isOpen: boolean
  onClose: () => void
  onPhotoCapture: (photoData: string) => void
}

export default function SelfieCapture({
  isOpen,
  onClose,
  onPhotoCapture,
}: SelfieCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const playPromiseRef = useRef<Promise<void> | null>(null)
  const focusBoxRef = useRef<HTMLDivElement>(null)

  const [isDragging, setIsDragging] = useState(false)
  const [focusPosition, setFocusPosition] = useState({ x: 50, y: 40 }) // Default center position
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>("")
  const [isCapturing, setIsCapturing] = useState(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)

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
      setIsLoading(true)
      setError("")
      stopCamera()

      await new Promise((resolve) => setTimeout(resolve, 200))

      const constraints = {
        video: {
          facingMode: "user", // Front camera for selfies
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 },
        },
        audio: false,
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = stream
      setHasPermission(true)

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
          setIsLoading(false)
        } catch (playError) {
          playPromiseRef.current = null
          throw new Error("Failed to start video playback")
        }
      }
    } catch (err) {
      setIsLoading(false)
      if (err instanceof Error) {
        if (err.name === "NotAllowedError") {
          setHasPermission(false)
          setError(
            "Camera permission denied. Please allow camera access and try again."
          )
        } else if (err.name === "NotFoundError") {
          setHasPermission(false)
          setError(
            "No camera found. Please ensure your device has a working camera."
          )
        } else if (err.name === "NotReadableError") {
          setHasPermission(false)
          setError(
            "Camera is being used by another application. Please close other apps and try again."
          )
        } else {
          setError(`Camera error: ${err.message}. Please try again.`)
        }
      } else {
        setError(
          "Unable to access camera. Please check your camera settings and try again."
        )
      }
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

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current || isCapturing) return

    try {
      setIsCapturing(true)
      setError("")

      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (!context) {
        throw new Error("Unable to get canvas context")
      }

      if (video.readyState < 2) {
        throw new Error("Video not ready for capture")
      }

      // Get video and container dimensions
      const videoWidth = video.videoWidth || 1280
      const videoHeight = video.videoHeight || 720
      const videoElement = video.getBoundingClientRect()

      // Focus area dimensions (oval)
      const ovalWidth = 273
      const ovalHeight = 336

      // Calculate the scale factors between displayed video and actual video
      const scaleX = videoWidth / videoElement.width
      const scaleY = videoHeight / videoElement.height

      // Convert focus position from percentage to actual video coordinates
      const centerX = (focusPosition.x / 100) * videoWidth
      const centerY = (focusPosition.y / 100) * videoHeight

      // Calculate crop area dimensions in video coordinates
      const cropWidth = ovalWidth * scaleX
      const cropHeight = ovalHeight * scaleY

      // Calculate crop area position (top-left corner)
      const cropX = Math.max(0, centerX - cropWidth / 2)
      const cropY = Math.max(0, centerY - cropHeight / 2)

      // Ensure crop area doesn't exceed video bounds
      const finalCropWidth = Math.min(cropWidth, videoWidth - cropX)
      const finalCropHeight = Math.min(cropHeight, videoHeight - cropY)

      // Set canvas to oval dimensions for output
      canvas.width = ovalWidth
      canvas.height = ovalHeight

      // Clear canvas with transparent background
      context.clearRect(0, 0, ovalWidth, ovalHeight)

      // Create oval clipping path
      context.save()
      context.beginPath()
      context.ellipse(
        ovalWidth / 2,
        ovalHeight / 2,
        ovalWidth / 2,
        ovalHeight / 2,
        0,
        0,
        2 * Math.PI
      )
      context.clip()

      // Mirror the image for selfies (flip horizontally)
      context.scale(-1, 1)
      context.translate(-ovalWidth, 0)

      // Draw the cropped video frame, scaled to fit the oval
      context.drawImage(
        video,
        cropX,
        cropY,
        finalCropWidth,
        finalCropHeight, // Source rectangle (from video)
        0,
        0,
        ovalWidth,
        ovalHeight // Destination rectangle (oval canvas)
      )

      context.restore()

      const photoData = canvas.toDataURL("image/jpeg", 0.95)

      const validation = validatePhoto(photoData)
      if (!validation.isValid) {
        throw new Error(validation.error || "Invalid photo captured")
      }

      onPhotoCapture(photoData)
      stopCamera()
      onClose()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to capture photo. Please try again."
      )
    } finally {
      setIsCapturing(false)
    }
  }

  const retryCamera = () => {
    setHasPermission(null)
    setError("")
    startCamera()
  }

  const handleClose = () => {
    stopCamera()
    onClose()
  }

  // Handle drag start
  const handleDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault()
      setIsDragging(true)
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY
      setDragStart({ x: clientX, y: clientY })
    },
    []
  )

  // Handle drag move - Fixed to match user movement direction
  const handleDragMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !videoRef.current) return

      e.preventDefault()
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

      const videoRect = videoRef.current.getBoundingClientRect()
      const deltaX = clientX - dragStart.x
      const deltaY = clientY - dragStart.y

      // Convert pixel movement to percentage - NO INVERSION for natural movement
      const deltaXPercent = (deltaX / videoRect.width) * 100
      const deltaYPercent = (deltaY / videoRect.height) * 100

      setFocusPosition((prev) => {
        const newX = Math.max(20, Math.min(80, prev.x + deltaXPercent)) // Keep within bounds
        const newY = Math.max(20, Math.min(70, prev.y + deltaYPercent)) // Keep within bounds
        return { x: newX, y: newY }
      })

      setDragStart({ x: clientX, y: clientY })
    },
    [isDragging, dragStart]
  )

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Add event listeners for drag
  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => handleDragMove(e)
      const handleTouchMove = (e: TouchEvent) => handleDragMove(e)
      const handleMouseUp = () => handleDragEnd()
      const handleTouchEnd = () => handleDragEnd()

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      })
      document.addEventListener("mouseup", handleMouseUp)
      document.addEventListener("touchend", handleTouchEnd)

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("touchmove", handleTouchMove)
        document.removeEventListener("mouseup", handleMouseUp)
        document.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [isDragging, handleDragMove, handleDragEnd])

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogOverlay className="bg-[#000000] opacity-60" />
      <DialogContent className="w-full h-full max-w-none max-h-none p-0 m-0 lg:w-[520px] lg:h-auto lg:max-w-[520px] lg:max-h-[90vh] lg:p-10 bg-white lg:rounded-xl lg:m-auto border-0 shadow-none">
        {/* Mobile Header - Only visible on mobile */}
        <div className="lg:hidden absolute top-0 left-0 right-0 z-50 bg-transparent p-4">
          <div className="flex items-center">
            <BackButton onClick={handleClose} className="flex-shrink-0" />
            <span className="w-full flex-shrink-0 text-white text-center font-semibold font-circular-std text-[16px]/[130%]">
              Take a selfie
            </span>
          </div>
        </div>

        {/* Desktop Header - Only visible on desktop */}
        <DialogHeader className="hidden lg:flex flex-col gap-8">
          <BackButton onClick={handleClose} />
          <DialogTitle className="flex flex-col gap-2 w-full max-w-[417px] h-16 text-[#0A243F] font-circular-std tracking-normal">
            <span className="font-medium text-[24px]/[32px]">
              Take your selfie
            </span>
            <span className="font-[450] text-[16px]/[24px]">
              Position your face within the circle and look directly at the
              camera
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="relative w-full h-full lg:h-auto">
          {error && hasPermission === false ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black z-50 p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CautionIcon />
                </div>
                <h3 className="text-lg font-semibold font-circular-std text-white mb-2">
                  Camera Access Required
                </h3>
                <p className="text-gray-300 mb-6 text-sm leading-relaxed max-w-sm mx-auto">
                  {error}
                </p>
                <div className="flex flex-col gap-3 max-w-xs mx-auto">
                  <Button
                    onClick={retryCamera}
                    className="h-[48px] bg-[#54ABDB] hover:bg-[#54ABDB]/70 text-[18px]/[100%] rounded-[6px] flex gap-3 cursor-pointer"
                  >
                    Try Again
                  </Button>
                  <Button
                    onClick={handleClose}
                    variant="outline"
                    className="h-[48px] text-lg bg-transparent border border-[#CCEEFF] text-white hover:bg-[#CCEEFF]/20 rounded-[6px]"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Camera Container */}
              <div className="relative w-full h-full lg:w-[439px] lg:h-[515px] overflow-hidden lg-md:mt-6">
                {/* Loading overlay */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-30">
                    <div className="font-circular-std font-[450] text-white text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent mx-auto mb-3"></div>
                      <p className="text-sm">Starting camera...</p>
                    </div>
                  </div>
                )}

                <video
                  ref={videoRef}
                  className="absolute w-full h-full object-cover z-10 scale-x-[-1]"
                  playsInline
                  muted
                  preload="metadata"
                />

                {/* Oval Focus Area */}
                <div
                  ref={focusBoxRef}
                  id="focus-box"
                  className={`absolute w-[85vw] h-[490px] lg-md:w-[273px] lg-md:h-[336px] rounded-full z-30 border-[2px] border-white cursor-move ${
                    isDragging ? "cursor-grabbing" : "cursor-grab"
                  } select-none touch-none`}
                  style={{
                    left: `${focusPosition.x}%`,
                    top: `${focusPosition.y}%`,
                    transform: "translate(-50%, -50%)",
                    boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.7)",
                  }}
                  onMouseDown={handleDragStart}
                  onTouchStart={handleDragStart}
                >
                  {/* Instruction text positioned at bottom center of frame */}
                  <div className="lg:hidden w-full max-w-[280px] absolute -bottom-15 left-1/2 -translate-x-1/2">
                    <p className="text-white font-circular-std font-bold text-[16px]/[130%] tracking-normal text-center">
                      {isDragging
                        ? "Drag to position"
                        : "Position your face in the circle"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[438px] px-4 space-y-3 z-40 lg:relative lg:bottom-auto lg:left-auto lg:translate-x-0 lg:mt-4 lg:px-0">
                <Button
                  onClick={capturePhoto}
                  disabled={
                    isLoading ||
                    isCapturing ||
                    !!error ||
                    hasPermission === false
                  }
                  className="w-full h-[50px] rounded-[6px] bg-[#54ABDB] hover:bg-[#54ABDB]/70 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isCapturing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Capturing...
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 h-4" />
                      Take Photo
                    </>
                  )}
                </Button>
              </div>
            </>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
