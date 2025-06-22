"use client";
import { useState } from "react";

import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaChevronDown } from "react-icons/fa6";
import { SlCallOut } from "react-icons/sl";
import { FaChevronLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { GoArrowRight } from "react-icons/go";
import { CiMemoPad } from "react-icons/ci";
import { LuClipboardList } from "react-icons/lu";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { FormInput, PasswordInput } from "@/components/ui/form";
import { CustomButton } from "@/components/ui/button/customButton";
import Image from "next/image";
import { z } from "zod";

const registrationSchema = z
  .object({
    fullName: z
      .string()
      .min(1, { message: "Full name is required" })
      .max(50, { message: "Full name cannot exceed 50 characters" }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" })
      .max(20, { message: "Username cannot exceed 20 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z
      .string()
      .regex(/^\+?\d{10,15}$/, { message: "Invalid phone number" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password confirmation must match password" }),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registrationSchema>;
type RegisterFormErrors = Partial<Record<keyof RegisterFormData, string>>;

const features = [
  {
    icon: <LuClipboardList className="text-9xl text-[#54abdb]" />,
    title: "Manage Your Ads",
    description:
      "Easily edit, update, or remove your listings anytime. Keep your ads fresh and make sure your items get the attention they deserve!",
  },
  {
    icon: <SlCallOut className="text-6xl text-[#54abdb]" />,
    title: "Connect with Buyers & Sellers",
    description:
      "Reach out with a quick call to chat, negotiate, and seal the deal!",
  },
  {
    icon: <IoShieldCheckmarkOutline className="text-8xl text-[#54abdb]" />,
    title: "Safe & Convenient",
    description:
      "Trade confidently with fellow students knowing you're dealing with people in your school.",
  },
];

const countries = [{ code: "+234", flag: "/flag.png", label: "Nigeria" }];

export default function Register() {
  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [selected, setSelected] = useState(countries[0]);
  // const [open, setOpen] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const handleChange = (name: keyof RegisterFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fullPhoneNumber = selectedCountry.code + formData.phone;

    const result = registrationSchema.safeParse({
      ...formData,
      phone: fullPhoneNumber,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      // Transform fieldErrors to match RegisterFormErrors type
      const newErrors: RegisterFormErrors = {};
      for (const key in fieldErrors) {
        if (fieldErrors[key as keyof typeof fieldErrors]) {
          // Take the first error message or join them
          newErrors[key as keyof RegisterFormData] =
            fieldErrors[key as keyof typeof fieldErrors]?.[0] ||
            "Invalid field";
        }
      }
      setErrors(newErrors); // Set the transformed errors
      setIsSubmitting(false);
      return;
    }

    setErrors({}); // Clear errors on success

    console.log("Form submitted successfully:", result.data);
    // send formData to your backend here.

    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/success");
    }, 1500);
  };

  const DropdownSelector = ({
    options,
    selected,
    onSelect,
    isOpen,
    toggleOpen,
  }: {
    options: typeof countries; // Make sure 'countries' is defined or imported
    selected: (typeof countries)[0];
    onSelect: (option: (typeof countries)[0]) => void;
    isOpen: boolean;
    toggleOpen: () => void;
  }) => (
    <div className="relative">
      <button
        type="button"
        onClick={toggleOpen}
        className="flex items-center gap-1 sm:gap-2             
                 px-1 py-4 sm:px-4 sm:py-4 
                 bg-[#f6f7f8] rounded
                 text-[10px] sm:text-sm      
                 min-h-[30px] sm:min-h-9  
                 "
      >
        {/* Control image size with Tailwind classes */}
        <Image
          src={selected.flag}
          alt=""
          width={20} // Default for larger screens, overridden by class below
          height={15} // Default for larger screens, overridden by class below
          className="w-[16px] h-[12px] sm:w-[20px] sm:h-[15px]" /* Smaller image on small screens */
        />
        {selected.code}
        <FaChevronDown className="text-gray-500 text-xs sm:text-base" />{" "}
        {/* Optionally reduce icon size */}
      </button>

      {isOpen && (
        <div
          className="absolute left-0 bg-white border rounded shadow-md mt-1 z-10
                   w-full max-h-48 overflow-y-auto" /* Added max-height and overflow for long lists */
        >
          {options.map((option) => (
            <div
              key={option.code}
              className="flex items-center
                       gap-1 sm:gap-2             /* Smaller gap on small screens */
                       px-2 py-1 sm:px-3 sm:py-2 /* Smaller padding on small screens */
                       hover:bg-gray-100 cursor-pointer
                     text-[10px] sm:text-sm       /* Smaller text on small screens */
                       "
              onClick={() => {
                onSelect(option);
                toggleOpen();
              }}
            >
              <Image
                src={option.flag}
                alt=""
                width={20} // Default for larger screens, overridden by class below
                height={15} // Default for larger screens, overridden by class below
                className="w-[16px] h-[12px] sm:w-[20px] sm:h-[15px]" /* Smaller image on small screens */
              />
              {option.code}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="h-auto min-h-screen lg:pb-6 flex items-center justify-center bg-[#f9fbfc]">
      <div className="flex flex-row ">
        <div className="hidden md:flex flex-col justify-center items-end w-1/2 p-12 pr-8 space-y-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start text-justify pb-3 gap-5 border-b border-gray-100 max-w-md"
            >
              {feature.icon}
              <div>
                <h3 className="text-xl font-bold text-[#003553] mb-1">
                  {feature.title}
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
              {/* <hr className="flex-grow border-b border-gray-300" /> */}
            </div>
          ))}
        </div>

        {/*------------------------------------------ web version----------------------------------------------------*/}
        <div className="w-full md:w-1/2 hidden lg:flex items-center justify-center pr-28 px-6 py-12">
          <div className="w-full max-w-xl border bg-white rounded-lg p-8">
            <h2 className="text-2xl font-bold text-center text-[#003553] mb-1">
              Let’s Get You Started 🚀
            </h2>
            <p className="text-sm text-center  mb-6">
              Join Skoolsel to buy, sell, and explore what’s trending around
              your campus. It's fast easy and free!
            </p>

            <form className="space-y-4">
              <div className="flex gap-3">
                <FormInput
                  className="w-full"
                  label="Full Name"
                  type="text"
                  value={formData.fullName}
                  onChange={(value) => handleChange("fullName", value)}
                  error={errors.fullName}
                  hasError={!!errors.fullName}
                />
                <FormInput
                  className="w-full"
                  label="Username"
                  type="text"
                  value={formData.username}
                  onChange={(value) => handleChange("username", value)} // Corrected onChange
                  error={errors.username}
                  hasError={!!errors.username}
                />
              </div>
              <FormInput
                label="Email Address"
                type="text"
                value={formData.email}
                onChange={(value) => handleChange("email", value)}
                error={errors.email}
                hasError={!!errors.email}
              />
              <div className="flex gap-1 md:gap-3">
                {/* Dropdown Selector */}
                <div className="flex-shrink-0">
                  <DropdownSelector
                    options={countries}
                    selected={selectedCountry}
                    onSelect={setSelectedCountry}
                    isOpen={dropdownOpen}
                    toggleOpen={() => setDropdownOpen(!dropdownOpen)}
                  />
                </div>

                <FormInput
                  label="Phone Number"
                  type="number"
                  className="w-full"
                  value={formData.phone}
                  onChange={(value) => handleChange("phone", value)}
                  error={errors.phone}
                  hasError={!!errors.phone}
                />
              </div>
              <PasswordInput
                label="Password"
                value={formData.password}
                onChange={(value) => handleChange("password", value)}
                error={errors.password}
                hasError={!!errors.password}
              />
              <PasswordInput
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={(value) => handleChange("confirmPassword", value)}
                error={errors.confirmPassword}
                hasError={!!errors.confirmPassword}
              />
              <label className="flex items-start text-sm text-gray-700">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  className="mr-2 rounded mt-0.5 text-[#54abdb] focus:ring-[#54abdb]"
                  checked={formData.termsAccepted}
                  onChange={(e) =>
                    handleChange("termsAccepted", e.target.checked)
                  }
                  aria-label="Accept terms and conditions"
                />
                <span className="text-[13px]">
                  I’ve read and agree with your{" "}
                  <Link
                    href="#"
                    className="text-[#54abdb] hover:text-[#429aca]"
                  >
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="#"
                    className="text-[#54abdb] hover:text-[#429aca]"
                  >
                    Terms & Conditions
                  </Link>
                </span>
              </label>

              <CustomButton
                onClick={handleSubmit}
                disabledCondition={!formData.termsAccepted || isSubmitting} // Disable based on terms or submission state
                variant="secondary"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </div>
                ) : (
                  <>
                    Sign Up <GoArrowRight className="text-base" />
                  </>
                )}
              </CustomButton>
            </form>

            <div className="text-sm text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#54abdb] font-semibold hover:underline"
              >
                Sign In
              </Link>
            </div>

            <div className="flex items-center justify-between my-5">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-3 text-sm text-gray-500">
                or sign up with email
              </span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <div className="w-full flex items-center justify-center gap-2 bg-[#f7f8f9] py-3 rounded hover:bg-gray-50 transition text-sm">
              <FcGoogle />
              Sign up with Google
            </div>
          </div>
        </div>
      </div>
      {/*------------------------------------------ mobile version----------------------------------------------------*/}
      <div className="w-full md:w-1/2 flex lg:hidden items-center justify-center px-6 pb-22 pt-20 md:py-24 relative">
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 md:hidden border text-gray-700 text-sm p-2 rounded-full hover:bg-gray-100 transition"
        >
          <FaChevronLeft />
        </button>
        <div className="w-full max-w-md border-1 bg-white rounded-xl p-4 ">
          <h2 className="text-[19px] font-bold text-center mb-2">
            Let’s Get You Started 🚀
          </h2>
          <p className="text-[11px] sm:text-[13px] text-center text-gray-600 mb-8">
            Join Skoolsel to buy, sell, and explore what’s trending around your
            campus. It's fast, easy, and free!
          </p>

          <form className="space-y-5">
            <div className="flex flex-col gap-4">
              {" "}
              {/* Ensured stacking on all mobile views */}
              <FormInput
                className="w-full"
                label="Full Name"
                type="text"
                value={formData.fullName}
                onChange={(value) => handleChange("fullName", value)}
                error={errors.fullName}
                hasError={!!errors.fullName}
              />
              <FormInput
                className="w-full"
                label="Username"
                type="text"
                value={formData.username}
                onChange={(value) => handleChange("username", value)} // Corrected onChange
                error={errors.username}
                hasError={!!errors.username}
              />
            </div>

            <FormInput
              label="Email Address"
              type="text"
              value={formData.email}
              onChange={(value) => handleChange("email", value)}
              error={errors.email}
              hasError={!!errors.email}
            />

            <div className="flex gap-3">
              {/* Dropdown Selector */}
              <div className="sm:flex-shrink-0">
                <DropdownSelector
                  options={countries}
                  selected={selectedCountry}
                  onSelect={setSelectedCountry}
                  isOpen={dropdownOpen}
                  toggleOpen={() => setDropdownOpen(!dropdownOpen)}
                />
              </div>

              <FormInput
                label="Phone Number"
                type="number"
                className="w-full"
                value={formData.phone}
                onChange={(value) => handleChange("phone", value)}
                error={errors.phone}
                hasError={!!errors.phone}
              />
            </div>
            <PasswordInput
              label="Password"
              value={formData.password}
              onChange={(value) => handleChange("password", value)}
              error={errors.password}
              hasError={!!errors.password}
            />

            <PasswordInput
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={(value) => handleChange("confirmPassword", value)}
              error={errors.confirmPassword}
              hasError={!!errors.confirmPassword}
            />

            <label className="flex items-start text-sm text-gray-700">
              <input
                type="checkbox"
                className="mt-1 mr-2 rounded text-[#54abdb] focus:ring-[#54abdb]"
                checked={formData.termsAccepted}
                onChange={(e) =>
                  handleChange("termsAccepted", e.target.checked)
                }
              />
              <span className="text-[9px] text-justify">
                I’ve read and agree with your{" "}
                <Link href="#" className="text-[#54abdb] hover:text-[#429aca]">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-[#54abdb] hover:text-[#429aca]">
                  Terms & Conditions
                </Link>
              </span>
            </label>

            <CustomButton onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2  border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </div>
              ) : (
                <>
                  Create Account <GoArrowRight className="text-base" />
                </>
              )}
            </CustomButton>
          </form>

          <div className="text-[12px] text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#54abdb] font-bold hover:underline hover:text-[#429aca]"
            >
              Sign In
            </Link>
          </div>

          <div className="flex items-center justify-between my-6">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-3 text-[12px] text-gray-500 whitespace-nowrap">
              or sign up with email
            </span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <button className="w-full flex items-center justify-center gap-3 py-3 rounded-lg hover:bg-gray-50 transition text-[12px] text-gray-700 font-medium">
            <FcGoogle className="text-xl" />
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
}
