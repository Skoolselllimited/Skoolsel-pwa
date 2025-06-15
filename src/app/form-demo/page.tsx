"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { CustomButton } from "@/components/ui/button/customButton";
import { FormInput, PasswordInput, FormSelect } from "@/components/ui/form";

// Define the validation schema
const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  role: z.string().min(1, "Please select a role"),
  category: z.string().min(1, "Please select a category"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

type FormData = z.infer<typeof formSchema>;

interface FormErrors {
  fullName?: string;
  email?: string;
  role?: string;
  category?: string;
  password?: string;
}

export default function FormDemo() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    role: "",
    category: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    // Real-time validation for the specific field
    try {
      formSchema.shape[field].parse(value);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors((prev) => ({
          ...prev,
          [field]: error.errors[0]?.message,
        }));
      }
    }
  };

  const validateForm = (): boolean => {
    try {
      formSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: FormErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof FormErrors] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted with:", formData);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-[850px] mx-auto rounded-3xl shadow-sm border border-gray-100">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Form Components Demo
            </h1>
            <p className="text-gray-600 text-base leading-relaxed">
              Custom form components with validation
            </p>
          </div>

          <div className="space-y-6">
            <FormInput
              label="Full Name"
              type="text"
              value={formData.fullName}
              onChange={(value) => handleInputChange("fullName", value)}
              error={errors.fullName}
              hasError={!!errors.fullName}
            />

            <FormInput
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(value) => handleInputChange("email", value)}
              error={errors.email}
              hasError={!!errors.email}
            />

            <FormSelect
              label="Select Role"
              value={formData.role}
              onChange={(value) => handleInputChange("role", value)}
              error={errors.role}
              hasError={!!errors.role}
              options={[
                { value: "user", label: "Regular User" },
                { value: "seller", label: "Seller" },
                { value: "admin", label: "Administrator" },
              ]}
            />

            <FormSelect
              label="Category"
              value={formData.category}
              onChange={(value) => handleInputChange("category", value)}
              error={errors.category}
              hasError={!!errors.category}
              options={[
                { value: "electronics", label: "Electronics" },
                { value: "clothing", label: "Clothing" },
                { value: "books", label: "Books" },
                { value: "furniture", label: "Furniture" },
                { value: "other", label: "Other" },
              ]}
              placeholder="Choose a category..."
            />

            <PasswordInput
              label="Password"
              value={formData.password}
              onChange={(value) => handleInputChange("password", value)}
              error={errors.password}
              hasError={!!errors.password}
            />

            <CustomButton onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                "Submit Form"
              )}
            </CustomButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
