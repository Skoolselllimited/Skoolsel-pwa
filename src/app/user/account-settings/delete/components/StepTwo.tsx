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
    <div className="w-[400px]">
      {/* Keeping this h3 as per previous iterations of the UI,
          though the "WriteReviewForm" example doesn't have a separate heading.
          Your previous StepTwo UI screenshots (image_322606.png, image_3fd870.png)
          show the text 'Please share your reason. Tell us more' as a placeholder,
          not a heading. I will leave the placeholder.
      */}
      {/* If you want to remove the separate heading and just use the placeholder like WriteReviewForm, uncomment the next line and remove this h3 */}
      {/* <h3 className="text-xl font-medium mb-4 text-gray-700">Please share your reason. Tell us more</h3> */}

      <textarea
        placeholder="Please share your reason. Tell us more" // Matches your StepTwo UI screenshots
        value={details}
        onChange={handleDetailsChange}
        // Applying the textarea styling from WriteReviewForm
        // className="w-full h-24 bg-[#f7f8f9] border border-gray-200 text-gray-700 text-sm placeholder:text-gray-400 p-4 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#54abdb]"
        // Re-adjusting height for StepTwo's UI, and keeping resize-y
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
