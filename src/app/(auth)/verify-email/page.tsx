"use client";
import { GoArrowRight } from "react-icons/go";
import { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa6";
import { z } from "zod"; // Import Zod
// Assuming CustomButton is still needed for consistency, if not, replace with native button
import { CustomButton } from "@/components/ui/button/customButton";

// --- 1. Zod Schema for the verification code ---
// Assuming a 6-digit code based on your initial 'code' array length
const verificationCodeSchema = z.object({
  code: z
    .string()
    .min(6, "Please enter the full 6-digit code.")
    .max(6, "Please enter the full 6-digit code.")
    .regex(/^\d+$/, "Code must contain only digits."),
});

type VerificationFormData = z.infer<typeof verificationCodeSchema>;

// Type for errors (we'll only have 'code' and 'general')
type VerificationFormErrors = Partial<
  Record<keyof VerificationFormData, string>
> & {
  general?: string; // For network errors or server-side "invalid code"
};

export default function VerifyEmail() {
  // Using a longer array for the code input boxes if the schema is 6 digits.
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState<VerificationFormErrors>({}); // Use Zod-compatible error state
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false); // For verify button
  const [isResending, setIsResending] = useState(false); // For resend button

  const router = useRouter();

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // These would typically come from user session or previous page
  const userEmail = "info@agrotech.com";
  // The correct code should *not* be hardcoded in client-side code in a real app.
  // It would be validated server-side. This is just for local simulation.
  const correctCode = "123456"; // Changed to 6 digits to match code array

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    setErrors({}); // Clear any previous errors on input change
    setSuccessMessage(""); // Clear success message on input change

    if (value.match(/^\d?$/)) {
      // Allows single digit or empty string
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus next input
      if (value && index < code.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < code.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({}); // Clear previous errors
    setSuccessMessage(""); // Clear success message

    const enteredCode = code.join("");

    // --- Zod validation for the entered code ---
    const result = verificationCodeSchema.safeParse({ code: enteredCode });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({ code: fieldErrors.code?.[0] }); // Set code-specific error
      setIsSubmitting(false);
      return;
    }

    // If Zod validation passes, proceed with actual verification logic
    console.log("Attempting verification for:", result.data.code);

    try {
      // Simulate API call to verify the code
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (enteredCode === correctCode) {
        setSuccessMessage("Email verified successfully! Redirecting...");
        // In a real app, you'd probably get a token or success status from the API
        router.push("/new-password"); // Navigate on success
      } else {
        setErrors({ general: "Invalid verification code. Please try again." }); // Set a general error for server-side validation failure
      }
    } catch (apiError) {
      console.error("Verification API call failed:", apiError);
      setErrors({ general: "Failed to verify code. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setErrors({}); // Clear errors
    setSuccessMessage(""); // Clear success messages
    setCode(["", "", "", "", "", ""]); // Clear input fields
    inputRefs.current[0]?.focus(); // Focus first input

    console.log("Resend code requested for:", userEmail);

    try {
      // Simulate API call to resend code
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSuccessMessage("A new verification code has been sent to your email.");
    } catch (apiError) {
      console.error("Resend code API call failed:", apiError);
      setErrors({ general: "Failed to resend code. Please try again later." });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="md:min-h-[calc(100vh-75px)] min-h-screen flex items-center justify-center bg-[#F7F8F9] font-inter p-4">
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 md:hidden border text-gray-700 text-sm p-2 rounded-full hover:bg-gray-100 transition"
      >
        <FaChevronLeft />
      </button>
      <div className="w-full max-w-lg bg-white rounded-xl px-2 py-8 md:px-6 md:py-10">
        <h1 className="md:text-2xl text-xl font-bold text-center mb-2">
          Verify Your Email
        </h1>
        <p className="text-[11px] md:text-sm text-center text-gray-600 mb-4 md:mb-8">
          Code has been sent to{" "}
          <span className="font-semibold text-[#54abdb]">{userEmail}</span>
        </p>

        <form onSubmit={handleVerify} className="flex flex-col items-center">
          <div className="w-full">
            {/* Container for code inputs */}
            <div className="flex flex-wrap justify-between gap-x-1 gap-y-2 md:gap-x-2 md:gap-y-3 mb-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`
                    w-8 h-8 md:w-15 md:h-15 text-center text-lg md:text-xl font-bold text-gray-700 bg-[#f2f3f5] rounded-lg
                    focus:outline-none focus:ring-2
                    ${errors.code ? "border-red-500 ring-red-500" : "focus:border-[#54abdb] focus:ring-[#54abdb] border border-transparent"}
                  `}
                  inputMode="numeric"
                  pattern="[0-9]"
                />
              ))}
            </div>

            {/* Display success or error messages */}
            <div className="h-5 text-center mb-4">
              {" "}
              {/* Adjusted margin-bottom for better spacing */}
              {errors.code && (
                <p className="text-red-500 text-sm">{errors.code}</p>
              )}
              {errors.general && (
                <p className="text-red-500 text-sm">{errors.general}</p>
              )}
              {successMessage && (
                <p className="text-green-600 text-sm">{successMessage}</p>
              )}
            </div>

            {/* Resend code button */}
            <div className="flex justify-center md:justify-start mb-6">
              <span className="text-[12px] md:text-sm text-gray-600">
                Didn’t get a code?{" "}
                <button
                  type="button" // Important for non-submit buttons inside a form
                  onClick={handleResendCode}
                  disabled={isResending} // Disable during resend
                  className="text-[#54abdb] font-medium hover:underline hover:text-[#429aca] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isResending ? "Sending..." : "Click to Resend"}
                </button>
              </span>
            </div>

            {/* Submit button using CustomButton for consistency */}
            <CustomButton
              type="submit" // This button submits the form
              disabled={isSubmitting} // Disable during verification
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verifying...
                </div>
              ) : (
                <>
                  Verify <GoArrowRight className="text-base" />
                </>
              )}
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
}
