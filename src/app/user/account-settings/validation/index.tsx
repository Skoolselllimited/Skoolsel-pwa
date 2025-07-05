import { z } from "zod"

// Profile validation schema
export const profileSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be less than 100 characters")
    .regex(
      /^[a-zA-Z\s@.]+$/,
      "Full name can only contain letters, spaces, @ and ."
    ),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  phoneNumber: z
    .string()
    .regex(/^\d{10,11}$/, "Phone number must be 10-11 digits")
    .min(1, "Phone number is required"),
  school: z.string().min(1, "Please select a school"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
})

// Base password schema without refinements (for individual field validation)
export const basePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: z.string().min(1, "Please confirm your password"),
})

// Individual field schemas for field-level validation
export const passwordFieldSchemas = {
  currentPassword: basePasswordSchema.shape.currentPassword,
  newPassword: basePasswordSchema.shape.newPassword,
  confirmPassword: basePasswordSchema.shape.confirmPassword,
}

// Full password schema with cross-field validation
export const passwordChangeSchema = basePasswordSchema
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  })

// Type exports
export type ProfileFormData = z.infer<typeof profileSchema>
export type PasswordChangeData = z.infer<typeof passwordChangeSchema>

// Validation helper functions
export function validateForm<T>(schema: z.ZodSchema<T>, data: unknown) {
  const result = schema.safeParse(data)

  if (result.success) {
    return { isValid: true, data: result.data, errors: {} }
  }

  const errors: Record<string, string> = {}
  result.error.errors.forEach((error) => {
    const path = error.path.join(".")
    errors[path] = error.message
  })

  return { isValid: false, data: null, errors }
}

export function validateField(schema: z.ZodSchema, value: unknown): string {
  const result = schema.safeParse(value)
  return result.success
    ? ""
    : result.error.errors[0]?.message || "Invalid value"
}

export function validatePasswordField(
  field: keyof typeof passwordFieldSchemas,
  value: string
): string {
  return validateField(passwordFieldSchemas[field], value)
}

export function validateDropdownField(
  value: string,
  fieldName: string
): string {
  if (!value || value.trim() === "") {
    return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`
  }
  return ""
}
