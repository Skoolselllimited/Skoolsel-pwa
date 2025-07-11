import { z } from "zod"

// Product Details Schema
export const productDetailsSchema = z.object({
  category: z.string().min(1, "Category is required"),
  subcategory: z.string().min(1, "Subcategory is required"),
  adTitle: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be less than 100 characters"),
  school: z.string().min(1, "School is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Price must be a positive number"
    ),
  condition: z.string().min(1, "Condition is required"),
  negotiable: z.string().min(1, "Negotiable option is required"),
})

// Features & Images Schema
export const featuresImagesSchema = z.object({
  description: z
    .string()
    .max(1000, "Description must be less than 1000 characters")
    .optional(),
  images: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required")
    .max(10, "Maximum 10 images allowed")
    .refine(
      (files) => files.every((file) => file.size <= 5 * 1024 * 1024), // 5MB limit
      "Each image must be less than 5MB"
    ),
})

// Boost & Post Schema
export const boostPostSchema = z.object({
  boostOption: z.enum(["3days", "1week", "2weeks", "1month", "free"], {
    required_error: "Please select a boost option",
  }),
})

export type ProductDetailsData = z.infer<typeof productDetailsSchema>
export type FeaturesImagesData = z.infer<typeof featuresImagesSchema>
export type BoostPostData = z.infer<typeof boostPostSchema>

// Validation helper functions
export function validateField(schema: z.ZodSchema, value: unknown): string {
  const result = schema.safeParse(value)
  return result.success
    ? ""
    : result.error.errors[0]?.message || "Invalid value"
}

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
