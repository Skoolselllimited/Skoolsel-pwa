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

      <div className="flex justify-between flex-col md:flex-row  mt-6 gap-4  md:gap-8">
        <Button
          className="h-[48px]  w-full lg-md:w-[140px] bg-secondary text-[18px]/[100%] rounded-[6px] flex gap-3 cursor-pointer"
          onClick={onNext}
          disabled={!reason}
        >
          Continue
        </Button>
        <Button
          variant="outline"
          onClick={onCancel}
          className=" h-[48px] w-full lg-md:w-[123px] text-lg bg-transparent border border-[#CCEEFF] text-secondary hover:bg-[#CCEEFF]/50 rounded-[6px]"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
