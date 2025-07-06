import React, { ChangeEvent } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  reason: string;
  setReason: (val: string) => void;
  onNext: () => void;
  onCancel: () => void;
};

const options = [
  "I no longer need my account",
  "I found what I was looking for",
  "I’m switching to another platform",
  "I have privacy concerns",
  "I’m creating a new account",
  "Other",
];

export default function StepOne({
  reason,
  setReason,
  onNext,
  onCancel,
}: Props) {
  const handleReasonChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReason(e.target.value);
  };

  return (
    <div>
      <h3 className="text-xl font-medium mb-4 text-gray-700">
        Give Us Your Feedback
      </h3>
      <div className="bg-[#FFF8E0] text-[#664C00] p-3 rounded-md mb-6">
        <p className="font-semibold">
          Oh no! Deleting your account means missing out on great deals,
          exclusive student offers, and a trusted marketplace. Are you sure you
          want to leave?
        </p>
      </div>

      <div className="space-y-2 mb-6">
        {options.map((option) => {
          const id = option.replace(/\s/g, "-").toLowerCase();
          return (
            <label
              key={option}
              htmlFor={id}
              className="flex items-center justify-between cursor-pointer px-3 py-2 rounded-md"
            >
              <span className="text-gray-800 font-medium">{option}</span>
              <input
                type="radio"
                id={id}
                name="reason"
                value={option}
                checked={reason === option}
                onChange={handleReasonChange}
                className="h-4 w-4 accent-blue-600"
              />
            </label>
          );
        })}
      </div>

      <div className="flex justify-between mt-6 gap-8">
        <Button
          className="w-full sm:flex-1 bg-white border-2 border-[#54abdb] text-[#54abdb] hover:bg-blue-50 px-4 py-5 text-sm sm:text-base"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          className="w-full sm:flex-1 bg-[#54abdb] border-2 border-[#54abdb] text-white hover:bg-[#4a90d2] px-4 py-5 text-sm sm:text-base"
          onClick={onNext}
          disabled={!reason}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
