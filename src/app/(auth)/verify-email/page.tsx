"use client";
import { GoArrowRight } from "react-icons/go";
import { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa6";

export default function VerifyEmail() {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const router = useRouter();

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const userEmail = "info@agrotech.com";

  const correctCode = "12345";

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    // We only want to allow a single digit in each box
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

  const handleVerify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    router.push("/new-password");

    const enteredCode = code.join("");

    if (enteredCode.length !== code.length) {
      setErrorMessage("Please enter a valid 5-digit code.");
      return;
    }

    if (enteredCode === correctCode) {
      setSuccessMessage("Email verified successfully!");
      console.log("Verification successful for:", enteredCode);
      // Here you would typically redirect the user or update the application state
    } else {
      setErrorMessage("Invalid verification code. Please try again.");
      console.log("Verification failed for:", enteredCode);
    }
  };

  const handleResendCode = () => {
    setErrorMessage("");
    setSuccessMessage("");
    setCode(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
    console.log("Resend code requested for:", userEmail);

    setSuccessMessage("A new verification code has been sent to your email.");
  };

  return (
    <div className="md:min-h-[calc(100vh-100px)] min-h-screen flex items-center justify-center bg-[#F7F8F9] font-inter p-4">
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 md:hidden border text-gray-700 text-sm p-2 rounded-full hover:bg-gray-100 transition"
      >
        <FaChevronLeft />
      </button>
      <div className="w-full max-w-lg bg-white rounded-xl px-4 py-8 md:px-6 md:py-10">
        <h1 className="md:text-2xl text-xl font-bold text-center mb-2">
          Verify Your Email
        </h1>
        <p className="text-[11px] md:text-sm text-center text-gray-600 mb-4 md:mb-8">
          Code has been sent to{" "}
          <span className="font-semibold text-[#54abdb]">{userEmail}</span>
        </p>

        <form onSubmit={handleVerify} className="flex  flex-col items-center">
          <div className="w-full">
            {/* Container for code inputs */}
            <div className="flex flex-wrap justify-between gap-x-1 gap-y-2 md:gap-x-2 md:gap-y-3">
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
                  className="w-8 h-8 md:w-12 md:h-12 text-center text-lg md:text-xl font-bold text-gray-700 bg-[#f2f3f5] rounded-lg"
                  inputMode="numeric"
                  pattern="[0-9]"
                />
              ))}
            </div>

            {/* Display success or error messages */}
            <div className="h-5 text-center mb-1 md:mb-4">
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
              {successMessage && (
                <p className="text-green-600 text-sm">{successMessage}</p>
              )}
            </div>

            {/* Resend code button, aligned left */}
            <div className="flex justify-center md:justify-start mb-6">
              <span className="text-[12px] md:text-sm text-gray-600">
                Didn’t get a code?{" "}
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="text-[#54abdb] font-medium hover:underline hover:text-[#429aca] focus:outline-none"
                >
                  Click to Resend
                </button>
              </span>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-[#54abdb] hover:bg-[#429aca] flex items-center justify-center gap-2 text-white py-2 rounded text-sm font-medium transition"
            >
              Verify <GoArrowRight className="text-base" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
