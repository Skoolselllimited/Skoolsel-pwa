"use client"

import type React from "react"

import {
  ArrowRightIcon,
  CameraIcon,
  EditIcon,
  VerifiedIcon,
} from "@/components/svgs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  FormInput,
  FormSelect,
  PasswordInput,
  PhoneInput,
  TextareaInput,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { Star, Trash2, X } from "lucide-react"
import { useRef, useState } from "react"
import DeleteAccountDialog from "./deleteAccount"

// Nigerian universities data
const nigerianUniversities = [
  "Federal University of Technology, Minna",
  "University of Lagos",
  "University of Ibadan",
  "Ahmadu Bello University Zaria",
  "University of Nigeria, Nsukka",
  "Obafemi Awolowo University",
  "Federal University of Technology, Akure",
  "Lagos State University",
  "Covenant University",
  "Babcock University",
]

interface UserData {
  fullName: string
  username: string
  email: string
  phoneNumber: string
  countryCode: string
  school: string
  bio: string
  isVerified: boolean
  joinDate: string
  rating: number
  profileImage: string
}

export default function UserProfileManagement() {
  const [isEditing, setIsEditing] = useState(false)
  const [isVerificationStarted, setIsVerificationStarted] = useState(false)
  const [isPhotoUploading, setIsPhotoUploading] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // User data state
  const [userData, setUserData] = useState<UserData>({
    fullName: "auwalsada@gmail.com",
    username: "auwalsada",
    email: "sample@gmail.com",
    phoneNumber: "0365768468",
    countryCode: "+234",
    school: "Federal University of Technology, Minna",
    bio: "",
    isVerified: false,
    joinDate: "11/11/2024",
    rating: 4.5,
    profileImage: "/images/profile.jpg",
  })

  // Form data for editing
  const [formData, setFormData] = useState(userData)

  // Password data
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleEdit = () => {
    setIsEditing(true)
    setFormData(userData)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setFormData(userData)
  }

  const handleSaveChanges = () => {
    setUserData(formData)
    setIsEditing(false)
  }

  const handleVerifyID = () => {
    setIsVerificationStarted(true)
    // Simulate verification process
    setTimeout(() => {
      setUserData((prev) => ({ ...prev, isVerified: true }))
      setIsVerificationStarted(false)
    }, 2000)
  }

  const handleUpdatePassword = () => {
    // Handle password update logic
    console.log("Updating password...")
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  // Photo upload handlers
  const handlePhotoClick = () => {
    fileInputRef.current?.click()
    // if (isEditing) {
    // }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file")
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB")
        return
      }

      setIsPhotoUploading(true)

      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setPhotoPreview(result)
        setIsPhotoUploading(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = () => {
    setPhotoPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const currentProfileImage = photoPreview || userData.profileImage

  return (
    <div className="min-h-screen bg-white rounded">
      <div className="max-w-[1054px] mx-auto px-4 relative">
        <div
          className="absolute top-0 left-0 right-0 w-full h-[163px]"
          style={{ backgroundImage: `url('/images/profile-dots.png')` }}
        ></div>
        <div className="max-w-[647px] mx-auto flex flex-col gap-[36px] pt-20">
          {/* Profile Header */}
          <div className="w-full flex flex-col justify-center items-center">
            <div className="relative inline-block mb-[15px]">
              <Avatar className="w-50 h-50">
                <AvatarImage
                  src={currentProfileImage || "/placeholder.svg"}
                  alt="Profile"
                />
                <AvatarFallback className="text-2xl">
                  {userData.fullName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={handlePhotoClick}
                disabled={isPhotoUploading}
                className="absolute bottom-0 right-0 w-[58px] h-[58px] rounded-full border-[1.98px] border-white shadow-[0px_5.27px_105.45px_0px_#A7AEC14D] bg-secondary  cursor-pointer flex justify-center items-center"
              >
                {isPhotoUploading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <CameraIcon />
                )}
              </button>
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            {/* Photo upload instructions - only show in edit mode */}

            <p className="text-[#767e94] font-circular-std font-[450] italic text-center text-xs mb-2">
              Supported formats: JPG, JPEG, PNG, GIF (Max 5MB)
            </p>

            <div className="w-full flex items-center justify-center">
              <div className="max-w-[262px] flex flex-col gap-1">
                <div className="h-[30px] flex items-center justify-center gap-2">
                  <h1 className="font-bold font-circular-std text-foreground text-[24px]/[100%] tracking-normal">
                    @{userData.username}
                  </h1>
                  <Badge
                    variant={userData.isVerified ? "default" : "secondary"}
                    className={cn(
                      "text-[15px]/[14px] tracking-normal font-circular-std font-medium flex justify-center items-[5px] py-1 pl-1 pr-[10px]",
                      userData.isVerified
                        ? "bg-[#E4F9E0] w-fit h-6 text-[#104E00] hover:bg-transparent"
                        : "bg-[#EBEEF7] w-fit h-[22px] rounded-[100px] flex gap-[5px]  text-[#464D61] hover:bg-transparent"
                    )}
                  >
                    {userData.isVerified && (
                      <VerifiedIcon className="w-4 h-4" />
                    )}
                    {userData.isVerified ? "Verified Seller" : "Not Verified"}
                  </Badge>
                </div>

                <p className="py-[10px] text-[#767E94] text-[16px]/[20px] font-circular-std font-[450] tracking-normal align-middle text-center">
                  Joined - {userData.joinDate}
                </p>

                <div className="flex items-center justify-center gap-1">
                  <div className="bg-[#FFF8E0] h-[20px] w-fit flex items-center gap-[4.05px] p-1">
                    <span className="font-bold font-circular-std text-[15px]/[16.19px] tracking-normal text-center text-foreground">
                      {userData.rating}
                    </span>

                    <Star
                      className={cn("w-4 h-4 fill-[#FFBF00] text-[#FFBF00]")}
                    />
                  </div>

                  <button className="text-foreground font-circular-std tracking-normal text-[16px]/[20px] align-center hover:underline flex gap-[2px] items-center">
                    View Reviews{" "}
                    <ArrowRightIcon className="text-foreground w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Verify ID Section - Only show if not verified */}
          {!userData.isVerified && (
            <div className="w-full flex justify-between rounded-[12px] p-4 bg-[#54ABDB14]">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold font-circular-std text-[20px]/[100%] tracking-normal text-[#272727]">
                    Verify ID
                  </h3>
                  <p className="font-circular-std font-[450] text-sm lg:text-[16px]/[100%] text-[#636A80] tracking-normal">
                    Verify your ID to help keep Skoolsel secure and ensure a
                    safe marketplace for all users
                  </p>
                </div>
                <Button
                  onClick={handleVerifyID}
                  disabled={isVerificationStarted}
                  className="w-fit bg-secondary hover:bg-secondary px-[10px] rounded h-[40px]"
                >
                  {isVerificationStarted ? "Verifying..." : "Get Started"}
                </Button>
              </div>
            </div>
          )}

          {/* Account Information */}
          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-row items-center justify-between">
              <h2 className="text-[20px]/[32px] tracking-normal font-medium font-circular-std text-[#191F33]">
                Account Information
              </h2>
              {isEditing ? (
                <Button
                  variant="ghost"
                  onClick={handleCancel}
                  className="h-10 rounded-[6px] p-[14px] bg-[#E8F7FF] text-[#005C8F] hover:text-[#005C8F] hover:bg-[#E8F7FF] text-[16px]/[29.01px] font-bold tracking-normal capitalize"
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  onClick={handleEdit}
                  className="min-w-16 w-fit h-10 rounded-md px-[10px] gap-2 bg-[#1890FF14] hover:bg-[#1890FF14] text-secondary hover:text-secondary text-[16px]/[26px] tracking-normal font-bold "
                >
                  <EditIcon />
                  Edit
                </Button>
              )}
            </div>
            <div className="flex flex-col gap-[18px]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  {isEditing ? (
                    <FormInput
                      label="Full Name"
                      value={formData.fullName}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, fullName: value }))
                      }
                    />
                  ) : (
                    <>
                      <div className="text-sm text-gray-600">Full Name</div>
                      <div className="p-3 bg-gray-50 rounded-md text-sm">
                        {userData.fullName}
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-2">
                  {isEditing ? (
                    <FormInput
                      label="Username"
                      value={formData.username}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, username: value }))
                      }
                    />
                  ) : (
                    <>
                      <div className="text-sm text-gray-600">Username</div>
                      <div className="p-3 bg-gray-50 rounded-md text-sm">
                        {userData.username}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  {isEditing ? (
                    <FormInput
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, email: value }))
                      }
                    />
                  ) : (
                    <>
                      <div className="text-sm text-gray-600">Email Address</div>
                      <div className="p-3 bg-gray-50 rounded-md text-sm">
                        {userData.email}
                      </div>
                    </>
                  )}
                </div>

                <div className="space-y-2">
                  {isEditing ? (
                    <PhoneInput
                      label="Phone Number"
                      value={formData.phoneNumber}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, phoneNumber: value }))
                      }
                      countryCode={formData.countryCode}
                      onCountryCodeChange={(code) =>
                        setFormData((prev) => ({ ...prev, countryCode: code }))
                      }
                    />
                  ) : (
                    <>
                      <div className="text-sm text-gray-600">Phone Number</div>
                      <div className="p-3 bg-gray-50 rounded-md text-sm flex items-center gap-2">
                        <span className="text-green-600">🇳🇬</span>
                        <span className="text-gray-400">234</span>
                        <span>{userData.phoneNumber}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                {isEditing ? (
                  <FormSelect
                    label="School"
                    value={formData.school}
                    options={nigerianUniversities.map((university) => ({
                      label: university,
                      value: university,
                    }))}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, school: value }))
                    }
                  />
                ) : (
                  <>
                    <div className="text-sm text-gray-600">School</div>
                    <div className="p-3 bg-gray-50 rounded-md text-sm">
                      {userData.school}
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-2">
                {isEditing ? (
                  <TextareaInput
                    label="Bio"
                    value={formData.bio}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, bio: value }))
                    }
                    placeholder="Tell us about yourself..."
                    rows={4}
                    maxLength={500}
                    showCharCount={true}
                  />
                ) : (
                  <>
                    <div className="text-sm text-gray-600">Bio</div>
                    <div className="p-3 bg-gray-50 rounded-md text-sm min-h-[100px]">
                      {userData.bio || "No bio added yet"}
                    </div>
                  </>
                )}
              </div>

              {isEditing && (
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSaveChanges}
                    className="h-[50px] rounded px-5 text-[16px]/[50px] bg-[#54ABDB] hover:bg-[#54ABDB]"
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="h-[50px] px-8 rounded-[6px] hover:bg-transparent bg-transparent"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Change Password */}
          <div className="flex flex-col gap-[20px]">
            <h2 className="text-[20px]/[32px] tracking-normal font-medium font-circular-std text-[#191F33]">
              Change Password
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <PasswordInput
                  label="Current Password"
                  value={passwordData.currentPassword}
                  onChange={(value) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      currentPassword: value,
                    }))
                  }
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <PasswordInput
                    label="Password"
                    value={passwordData.newPassword}
                    onChange={(value) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        newPassword: value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <PasswordInput
                    label="Confirm Password"
                    value={passwordData.confirmPassword}
                    onChange={(value) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        confirmPassword: value,
                      }))
                    }
                  />
                </div>
              </div>

              <Button
                onClick={handleUpdatePassword}
                className="h-[50px] w-fit px-5 rounded-[6px]  bg-[#54ABDB] hover:bg-[#54ABDB] mt-4"
              >
                Update Password
              </Button>
            </div>
          </div>

          {/* Leave Skoolsel */}
          <div className="flex flex-col gap-4">
            <h3 className="font-circular-std font-medium text-[20px]/[32px] text-[#191F33] tracking-normal">
              Leave Skoolsel
            </h3>
            <p className="font-circular-std font-[450] text-[#636A80] text-[16px]/[24px] tracking-normal">
              Deactivate or delete your account
            </p>
            <DeleteAccountDialog>
              <Button
                variant="destructive"
                className="w-fit gap-2 bg-transparent font-bold text-[#FF4F4F] hover:bg-[#FF4F4F]/10 border-0 text-[16px/[100%] px-0 mb-4"
              >
                <Trash2 className="w-4 h-4" />
                Delete Account
              </Button>
            </DeleteAccountDialog>
          </div>
        </div>
      </div>
    </div>
  )
}
