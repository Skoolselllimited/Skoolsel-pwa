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
      <div className="flex justify-between flex-col md:flex-row mt-10 gap-4">
        <Button
          className="w-full sm:flex-1 bg-white border-2 border-[#54abdb] text-[#54abdb] hover:bg-blue-50 px-4 py-5 text-sm sm:text-base"
          onClick={onBack}
        >
          Cancel
        </Button>

        <Button
          className="w-full sm:flex-1 bg-[#54abdb] border-2 border-[#54abdb] text-white hover:bg-[#4a90d2] px-4 py-5 text-sm sm:text-base"
          onClick={onNext}
          disabled={!details}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
