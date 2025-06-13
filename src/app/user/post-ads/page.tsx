"use client"

import { CustomButton } from "@/components/ui/button/customButton"
import { FormInput, PasswordInput } from "@/components/ui/form"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { z } from "zod"

// Define the validation schema directly in this file
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
})

type LoginFormData = z.infer<typeof loginSchema>

interface FormErrors {
  email?: string
  password?: string
}

export default function PostAds() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }

    // Real-time validation for the specific field
    try {
      loginSchema.shape[field].parse(value)
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({
          ...prev,
          [field]: error.errors[0]?.message,
        }))
      }
    }
  }

  const validateForm = (): boolean => {
    try {
      loginSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: FormErrors = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof FormErrors] = err.message
          }
        })
        setErrors(fieldErrors)
      }
      return false
    }
  }

  const handleLogin = async () => {
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate server-side validation error
      if (formData.email === "test@error.com") {
        setErrors({ email: "Email not found." })
        return
      }

      // Handle successful login
      console.log("Login successful with:", formData)

      // You would typically redirect or update app state here
      alert("Login successful!")
    } catch (error) {
      console.error("Login error:", error)
      setErrors({ email: "An error occurred. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleSignIn = () => {
    // Handle Google sign in logic here
    console.log("Google sign in attempted")
  }

  return (
    <div className="min-h-screen bg-white flex flex-col p-4 xl:p-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
        Component Example
      </h1>

      {/* Login Form */}
      <div className="space-y-6">
        {/* Email Field */}
        <FormInput
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(value) => handleInputChange("email", value)}
          error={errors.email}
          hasError={!!errors.email}
        />

        {/* Password Field */}
        <PasswordInput
          label="Password"
          value={formData.password}
          onChange={(value) => handleInputChange("password", value)}
          error={errors.password}
          hasError={!!errors.password}
        />
        {/* Login Button */}
        <CustomButton onClick={handleLogin} disabled={isSubmitting}>
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              <span>Signing in...</span>
            </div>
          ) : (
            <>
              <span>Log In</span>
              <ArrowRight className="h-5 w-5 ml-2" />
            </>
          )}
        </CustomButton>
      </div>
    </div>
  )
}
