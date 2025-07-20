"use client";

import { useState } from "react";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";
import { useRouter } from "next/navigation";

export default function DeleteUserAccount() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    // API call here to delete account
    console.log({ reason, details });
    router.push("/account-deleted");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className={`p-3 md:p-3 w-full md:max-w-xl`}>
        <h2 className="text-lg md:text-3xl font-bold mb-4 text-gray-600">
          Delete/Deactivate Account
        </h2>
      </div>

      <div className="bg-white flex items-center rounded-md justify-center">
        <div className={`p-6 w-full md:max-w-xl  mx-auto bg-white`}>
          {step === 1 && (
            <StepOne
              reason={reason}
              setReason={setReason}
              onNext={handleNext}
              onCancel={() => router.push("/user/account-settings")}
            />
          )}
          {step === 2 && (
            <StepTwo
              details={details}
              setDetails={setDetails}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {step === 3 && (
            <StepThree
              confirmDelete={confirmDelete}
              setConfirmDelete={setConfirmDelete}
              onBack={handleBack}
              onDelete={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}
