// components/StepTwo.jsx
import { Button } from "@/components/ui/button"; // Assuming this Button component is styled correctly by your UI library
import React, { ChangeEvent } from "react";

type Props = {
  details: string;
  setDetails: (val: string) => void;
  onNext: () => void;
  onBack: () => void;
  onCancel?: () => void; // Made optional as it might not always be passed depending on parent's decision
};

export default function StepTwo({
  details,
  setDetails,
  onNext,
  onBack,
  onCancel,
}: Props) {
  const handleDetailsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDetails(e.target.value);
  };

  return (
    <div className="md:w-[400px]">
      <textarea
        placeholder="Please share your reason. Tell us more"
        value={details}
        onChange={handleDetailsChange}
        className="w-full min-h-[120px] max-h-[200px] bg-[#f7f8f9]  text-gray-700 text-sm placeholder:text-gray-400 p-4 rounded-lg resize-y "
      />
      <div className="md:hidden w-full h-[25vh]"></div>
      <div className="flex justify-between flex-col md:flex-row md:mt-10 gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className=" h-[48px] w-full lg-md:w-[123px] text-lg bg-transparent border border-[#CCEEFF] text-secondary hover:bg-[#CCEEFF]/50 rounded-[6px]"
        >
          Cancel
        </Button>

        <Button
          className="h-[48px]  w-full lg-md:w-[140px] bg-secondary text-[18px]/[100%] rounded-[6px] flex gap-3 cursor-pointer"
          onClick={onNext}
          disabled={!details}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
