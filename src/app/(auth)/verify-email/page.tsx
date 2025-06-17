"use client";
import { GoArrowRight } from "react-icons/go";
import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa6";
import { z } from "zod"; // Import Zod

import { CustomButton } from "@/components/ui/button/customButton";

const verificationCodeSchema = z.object({
  code: z
    .string()
    .min(6, "Please enter the full 6-digit code.")
    .max(6, "Please enter the full 6-digit code.")
    .regex(/^\d+$/, "Code must contain only digits."),
});

type VerificationFormData = z.infer<typeof verificationCodeSchema>;

type VerificationFormErrors = Partial<
  Record<keyof VerificationFormData, string>
> & {
  general?: string;
};

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${formattedSeconds}`;
};

export default function VerifyEmail() {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [errors, setErrors] = useState<VerificationFormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState<number>(120);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const userEmail = "info@agrotech.com";

  const correctCode = "123456";

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    setErrors({});
    setSuccessMessage("");

    if (value.match(/^\d?$/)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

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
    setErrors({});
    setSuccessMessage("");

    const enteredCode = code.join("");

    const result = verificationCodeSchema.safeParse({ code: enteredCode });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({ code: fieldErrors.code?.[0] });
      setIsSubmitting(false);
      return;
    }

    console.log("Attempting verification for:", result.data.code);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (enteredCode === correctCode) {
        setSuccessMessage("Email verified successfully! Redirecting...");

        router.push("/new-password");
      } else {
        setErrors({ general: "Invalid verification code. Please try again." });
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
    setErrors({});
    setTimer(120);
    setSuccessMessage("");
    setCode(["", "", "", "", "", ""]);
    setCanResend(false);
    inputRefs.current[0]?.focus(); // Focus first input

    console.log("Resend code requested for:", userEmail);

    try {
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
            <div className="flex flex-wrap justify-between gap-x-0.5 gap-y-1 sm:gap-x-1 sm:gap-y-2 md:gap-x-2 md:gap-y-3 mb-3">
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
       w-9 h-9 xs:w-9.5 xs:h-9.5 sm:w-11 sm:h-11 md:w-15 md:h-15 text-center text-lg md:text-xl font-bold text-gray-700 bg-[#f2f3f5] rounded-lg
        focus:outline-none focus:ring-2
        ${
          errors.code
            ? "border-red-500 ring-red-500"
            : "focus:border-[#54abdb] focus:ring-[#54abdb] border border-transparent"
        }
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
            <div className=" flex  gap-2 justify-between flex-row mb-6">
              <span className="text-[12px]  md:text-sm text-gray-600">
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
              {!canResend && (
                <span className="text-gray-500">{formatTime(timer)}</span>
              )}
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
