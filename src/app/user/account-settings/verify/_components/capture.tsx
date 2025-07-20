"use client"

import type React from "react"

import BackButton from "@/components/BackButton"
import { CautionIcon } from "@/components/svgs"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertCircle, RefreshCw } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { validatePhoto } from "../validation"

interface DocumentCaptureDialogProps {
  isOpen: boolean
  onClose: () => void
  onPhotoCapture: (photoData: string) => void
  documentType: string
}

export default function DocumentCapture({
  isOpen,
  onClose,
  onPhotoCapture,
  documentType,
}: DocumentCaptureDialogProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const playPromiseRef = useRef<Promise<void> | null>(null)
  const focusBoxRef = useRef<HTMLDivElement>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>("")
  const [isCapturing, setIsCapturing] = useState(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [focusPosition, setFocusPosition] = useState({ x: 50, y: 33.33 }) // Default center position (50%, 33.33%)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const getDocumentLabel = (type: string) => {
    const labels: Record<string, string> = {
      passport: "Passport",
      drivers_license: "Driver's License",
      national_id: "National ID Card",
      residence_permit: "Residence Permit",
    }
    return labels[type] || type
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
      setIsLoading(true)
      setError("")

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
        const newX = Math.max(15, Math.min(85, prev.x + deltaXPercent)) // Keep within bounds (15% to 85%)
        const newY = Math.max(15, Math.min(70, prev.y + deltaYPercent)) // Keep within bounds (15% to 70%)
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
      const handleMouseUp = () => handleDragEnd()
      const handleTouchMove = (e: TouchEvent) => handleDragMove(e)
      const handleTouchEnd = () => handleDragEnd()

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      })
      document.addEventListener("touchend", handleTouchEnd)

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        document.removeEventListener("touchmove", handleTouchMove)
        document.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [isDragging, handleDragMove, handleDragEnd])

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

      // Get video's rendered size on screen
      const videoRect = video.getBoundingClientRect()
      const frame = document.querySelector("#focus-box") as HTMLDivElement
      if (!frame) throw new Error("Focus box not found")
      const frameRect = frame.getBoundingClientRect()

      // Ratio between display size and actual video resolution
      const scaleX = video.videoWidth / videoRect.width
      const scaleY = video.videoHeight / videoRect.height

      // Compute capture region on video
      const sx = (frameRect.left - videoRect.left) * scaleX
      const sy = (frameRect.top - videoRect.top) * scaleY
      const sw = frameRect.width * scaleX
      const sh = frameRect.height * scaleY

      canvas.width = sw
      canvas.height = sh

      // Mirror the canvas horizontally to match the flipped video
      context.save()
      context.scale(-1, 1)
      context.drawImage(video, sx, sy, sw, sh, -sw, 0, sw, sh)
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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogOverlay className="bg-[#000000] opacity-60" />
      <DialogContent className="w-full h-full max-w-none max-h-none p-0 m-0 lg-md:w-[520px] lg-md:h-auto lg-md:max-w-[520px] lg-md:max-h-[90vh] lg-md:p-10 bg-white lg-md:rounded-xl lg-md:m-auto border-0 shadow-none">
        {/* Mobile Header - Only visible on mobile */}
        <div className="lg-md:hidden absolute top-0 left-0 right-0 z-50 bg-transparent p-4">
          <div className="flex items-center">
            <BackButton onClick={handleClose} className="flex-shrink-0" />
            <span className="w-full flex-shrink-0 text-white text-center font-semibold font-circular-std text-[16px]/[130%]">
              Powered by YOTI
            </span>
          </div>
        </div>

        {/* Desktop Header - Only visible on desktop */}
        <DialogHeader className="hidden lg-md:flex flex-col gap-8">
          <BackButton onClick={handleClose} />
          <DialogTitle className="flex flex-col gap-2 w-full max-w-[417px] h-16 text-[#0A243F] font-circular-std tracking-normal">
            <span className="font-medium text-[24px]/[32px]">
              {getDocumentLabel(documentType)}
            </span>
            <span className="font-[450] text-[16px]/[24px]">
              Position the front of your ID card in the frame
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="relative w-full h-full lg-md:h-auto">
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
              <div className="relative w-full h-full lg-md:w-[439px] lg-md:h-[515px] overflow-hidden">
                {/* Loading overlay */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-30">
                    <div className="font-circular-std font-[450] text-white text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent mx-auto mb-3"></div>
                      <p className="text-sm">Starting camera...</p>
                    </div>
                  </div>
                )}

                {/* Video feed - Full screen on mobile with horizontal flip */}
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover z-10 scale-x-[-1]"
                  playsInline
                  muted
                  preload="metadata"
                />

                {/* Draggable Focus frame with instruction text */}
                <div
                  ref={focusBoxRef}
                  id="focus-box"
                  className={`absolute w-[90%] h-[320px] lg-md:w-[391px] lg-md:h-[267px] rounded-md shadow-[0_0_0_9999px_rgba(0,0,0,0.7)] z-30 border-[2.34px] border-white cursor-move ${
                    isDragging ? "cursor-grabbing" : "cursor-grab"
                  } select-none touch-none`}
                  style={{
                    left: `${focusPosition.x}%`,
                    top: `${focusPosition.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseDown={handleDragStart}
                  onTouchStart={handleDragStart}
                >
                  {/* Instruction text positioned at bottom center of frame */}
                  <div className="lg-md:hidden w-full max-w-[220px] absolute -bottom-24 left-1/2 -translate-x-1/2">
                    <p className="text-white font-circular-std font-bold text-[16px]/[130%] tracking-normal text-center">
                      {isDragging
                        ? "Drag to position"
                        : "Position the front of your ID card in the frame"}
                    </p>
                  </div>
                </div>

                {/* Error overlay if needed */}
                {error && hasPermission !== false && (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-40">
                    <div className="text-white text-center p-6 max-w-sm">
                      <AlertCircle className="w-8 h-8 mx-auto mb-3 text-red-400" />
                      <p className="text-sm mb-4">{error}</p>
                      <Button
                        onClick={retryCamera}
                        size="sm"
                        className="h-[50px] rounded-[6px] px-8 bg-[#54ABDB] hover:bg-[#54ABDB]/70 text-[16px]/[50px] tracking-normal disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Retry
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Capture Button - Positioned at bottom on mobile, below video on desktop */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 lg-md:relative lg-md:bottom-auto lg-md:left-auto lg-md:translate-x-0 lg-md:mt-4">
                <Button
                  onClick={capturePhoto}
                  disabled={
                    isLoading ||
                    isCapturing ||
                    !!error ||
                    hasPermission === false
                  }
                  className="w-[74.77px] h-[74.77px] lg-md:w-full lg-md:max-w-[438px] lg-md:h-[50px] rounded-full lg-md:rounded-[6px] bg-transparent lg-md:bg-[#54ABDB] hover:bg-gray-100 lg-md:hover:bg-[#54ABDB]/70 text-black lg-md:text-white border-[2.34px] border-white lg-md:border-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center p-0 lg-md:p-4"
                >
                  {isCapturing ? (
                    <div className="animate-spin rounded-full h-6 w-6 lg-md:h-4 lg-md:w-4 border-2 border-black lg-md:border-white border-t-transparent"></div>
                  ) : (
                    <span className="h-[59.82px] w-[59.82px] bg-white rounded-full lg-md:hidden"></span>
                  )}
                  <span className="hidden lg-md:inline">
                    {isCapturing ? "Capturing..." : "Take Photo"}
                  </span>
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
