"use client";

import { useState } from "react";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";

export default function DeleteAccountModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    // API call here to delete account
    console.log({ reason, details });
    alert("Account deleted!");
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      {step === 1 && (
        <StepOne reason={reason} setReason={setReason} onNext={handleNext} />
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
  );
}
