"use client";
import { useState } from "react";
import { PiEyeClosedBold, PiEye } from "react-icons/pi";
import { GoArrowRight } from "react-icons/go";
import { FaInfoCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa6";

export default function CreateNewPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const handleUpdatePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/password-reset-success");
    setErrorMessage("");
    setSuccessMessage("");

    const form = e.target as HTMLFormElement;
    const passwordInput = form.elements.namedItem(
      "password"
    ) as HTMLInputElement;
    const confirmPasswordInput = form.elements.namedItem(
      "confirmPassword"
    ) as HTMLInputElement;

    const password = passwordInput?.value;
    const confirmPassword = confirmPasswordInput?.value;

    if (!password || !confirmPassword) {
      setErrorMessage("Please fill in both password fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`-])[A-Za-z\d!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`-]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be at least 8 characters, combining letters, numbers, and symbols."
      );
      return;
    }

    console.log("Updating password...");
    setSuccessMessage("Your password has been successfully updated!");
  };

  return (
    <div className="md:min-h-[calc(100vh-75px)] min-h-screen flex items-center justify-center bg-[#F7F8F9] font-inter p-4">
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 md:hidden border text-gray-700 text-sm p-2 rounded-full hover:bg-gray-100 transition"
      >
        <FaChevronLeft />
      </button>
      <div className="w-full max-w-md bg-white rounded-xl p-4 md:p-8 border border-gray-100">
        <h1 className="text-lg md:text-2xl font-bold text-center mb-6">
          Create New Password
        </h1>

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          {errorMessage && (
            <p className="text-red-500 text-sm text-center mb-4">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="text-green-600 text-sm text-center mb-4">
              {successMessage}
            </p>
          )}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="Password"
              name="Password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg text-[13px] md:text-base focus:outline-none bg-[#F2F3F5] md:placeholder:text-base placeholder:text-gray-400"
              required
            />
            <span
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer text-sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <PiEye /> : <PiEyeClosedBold />}
            </span>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword" // Added name attribute
              placeholder="Confirm password"
              className="w-full px-4 py-3 rounded-lg text-[13px] md:text-base focus:outline-none  bg-[#F2F3F5] placeholder-gray-400"
              required
            />

            <span
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer text-sm"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <PiEye /> : <PiEyeClosedBold />}
            </span>
          </div>

          <div className="flex items-start text-[9px] md:text-xs text-gray-600 pt-2">
            <FaInfoCircle className="text-[#637381] mr-2 mt-0.5 flex-shrink-0" />{" "}
            <span>
              It must include at least 8 characters, combining letters, numbers,
              and symbols.
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-[#54abdb] hover:bg-[#429aca] flex items-center justify-center gap-2 text-white py-3 rounded-lg text-[13px] md:text-base font-semibold transition transform hover:scale-105 duration-200 mt-3 md:mt-6" // Increased top margin for spacing
          >
            Update Password <GoArrowRight className="text-base" />
          </button>
        </form>
      </div>
    </div>
  );
}
