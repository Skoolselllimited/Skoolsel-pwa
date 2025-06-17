"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, Target } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProfileCompletionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onContinueToDashboard: () => void
  onPostFirstAd: () => void
}

// Sample avatar data for floating avatars
const floatingAvatars = [
  {
    id: 1,
    src: "/images/avatar-1.png",
    name: "John D",
    position: "top-4 left-8",
  },
  {
    id: 2,
    src: "/images/avatar-2.png",
    name: "Sarah M",
    position: "top-8 right-12",
  },
  {
    id: 3,
    src: "/images/avatar-3.png",
    name: "Mike R",
    position: "top-16 left-16",
  },
  {
    id: 4,
    src: "/images/avatar-4.png",
    name: "Lisa K",
    position: "bottom-16 left-8",
  },
  {
    id: 5,
    src: "/images/avatar-5.png",
    name: "Tom W",
    position: "bottom-8 right-8",
  },
  {
    id: 6,
    src: "/images/avatar-6.jpg",
    name: "Amy S",
    position: "top-12 right-4",
  },
]

export default function ProfileCompletionDialog({
  open,
  onOpenChange,
  onContinueToDashboard,
  onPostFirstAd,
}: ProfileCompletionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[500px] p-0 bg-transparent border-0 shadow-none">
        <div className="bg-white  relative">
          <div className="h-[236.3px] overflow-hidden bg-[url('/images/profile-bg.svg')] px-3 bg-cover">
            <h1>You&apos;re in! 🎉 We&apos;re thrilled to have you</h1>
          </div>
          <div>
            {/* Feature List */}
            <div className="space-y-4 mb-8 text-left max-w-sm mx-auto">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-white/90 font-medium">
                  Your profile is live
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-white/90 font-medium">
                  You can now post ads
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <span className="text-white/90 font-medium">
                  Start browsing amazing student deals
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                onClick={onContinueToDashboard}
                className="bg-transparent border-white text-white hover:bg-white hover:text-[#2C5AA0] font-medium px-6"
              >
                Continue To Dashboard
              </Button>
              <Button
                onClick={onPostFirstAd}
                className="bg-white text-[#2C5AA0] hover:bg-white/90 font-medium px-6"
              >
                Post Your First Ad
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
