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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const isFormValid = () => {
    if (!password || !confirmPassword) return false;
    if (password !== confirmPassword) return false;

    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`-]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleUpdatePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!password || !confirmPassword) {
      setErrorMessage("Please fill in both password fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`-]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be at least 8 characters, combining letters, numbers, and symbols."
      );
      return;
    }

    console.log("Updating password...");
    setSuccessMessage("Your password has been successfully updated!");
    router.push("/password-reset-success");
  };

  return (
    <div className="md:min-h-[calc(100vh-75px)] min-h-screen flex items-center justify-center bg-[#F7F8F9] font-inter p-4">
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 md:hidden border text-gray-700 text-sm p-2 rounded-full hover:bg-gray-100 transition"
      >
        <FaChevronLeft />
      </button>
      <div className="w-full max-w-md bg-white rounded-xl p-4 md:p-6 border border-gray-100">
        <h1 className="text-lg md:text-xl font-bold text-center mb-4">
          Create New Password
        </h1>

        <form
          onSubmit={handleUpdatePassword}
          className="space-y-3 text-sm md:text-base"
        >
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-600 text-center">{successMessage}</p>
          )}

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm md:text-base bg-[#F2F3F5] placeholder:text-gray-400 focus:outline-none"
              required
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <PiEye /> : <PiEyeClosedBold />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg text-sm md:text-base bg-[#F2F3F5] placeholder:text-gray-400 focus:outline-none"
              required
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <PiEye /> : <PiEyeClosedBold />}
            </span>
          </div>

          {/* Info */}
          <div className="flex items-start text-[11px] md:text-xs text-gray-600 pt-1">
            <FaInfoCircle className="text-[#637381] mr-2 mt-0.5 flex-shrink-0" />
            <span>
              It must include at least 8 characters, combining letters, numbers,
              and symbols.
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full flex items-center justify-center gap-2 py-2.5 md:py-3 rounded-lg text-white font-semibold transition-transform duration-200 ${
              isFormValid()
                ? "bg-[#54abdb] hover:bg-[#429aca] hover:scale-105"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Update Password <GoArrowRight />
          </button>
        </form>
      </div>
    </div>
  );
}
