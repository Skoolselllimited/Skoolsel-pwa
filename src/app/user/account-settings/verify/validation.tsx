import { z } from "zod"

// Updated to include Nigeria
export const CountryEnum = z.enum(["NG"])

export const DocumentTypeEnum = z.enum([
  "passport",
  "drivers_license",
  "national_id",
  "residence_permit",
])

export type Country = z.infer<typeof CountryEnum>
export type DocumentType = z.infer<typeof DocumentTypeEnum>

export const DocumentSelectionSchema = z.object({
  country: CountryEnum.optional(),
  documentType: DocumentTypeEnum.optional(),
})

export function validateDocumentSelection(data: {
  country?: string
  documentType?: string
}) {
  const result = DocumentSelectionSchema.safeParse(data)

  if (result.success) {
    const errors: Record<string, string> = {}

    if (!data.country) {
      errors.country = "Please select a country"
    }

    if (!data.documentType) {
      errors.documentType = "Please select a document type"
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      data: result.data,
    }
  }

  const errors: Record<string, string> = {}
  result.error.errors.forEach((error) => {
    if (error.path[0]) {
      errors[error.path[0] as string] = error.message
    }
  })

  return {
    isValid: false,
    errors,
    data: null,
  }
}

export function validatePhoto(photoData: string) {
  if (!photoData) {
    return {
      isValid: false,
      error: "Photo is required",
    }
  }

  if (!photoData.startsWith("data:image/")) {
    return {
      isValid: false,
      error: "Invalid photo format",
    }
  }

  // Check file size (base64 is ~33% larger than binary)
  // const sizeInBytes = (photoData.length * 3) / 4
  // const maxSizeInMB = 10

  // if (sizeInBytes > maxSizeInMB * 1024 * 1024) {
  //   return {
  //     isValid: false,
  //     error: `Photo size must be less than ${maxSizeInMB}MB`,
  //   }
  // }

  return {
    isValid: true,
    error: null,
  }
}
