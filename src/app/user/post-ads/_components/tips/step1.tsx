export default function StepOneTip() {
  return (
    <div className="bg-[rgb(232,247,255)] flex flex-col gap-2 rounded-xl py-6 px-5">
      <h3 className="text-[20px]/[100%] font-medium font-circular-std mb-4 text-[#00476F] -tracking-[1%]">
        Tips for a great ad
      </h3>
      <ul className="flex flex-col gap-[14px]">
        <li className="flex items-start space-x-3">
          <div className="w-2 h-2 bg-[#005C8F] rounded-full mt-2 flex-shrink-0" />
          <span className="text-[#005C8F] font-circular-std font-normal text-[16px/[100%] tracking-normal">
            Use a clear, descriptive title
          </span>
        </li>
        <li className="flex items-start space-x-3">
          <div className="w-2 h-2 bg-[#005C8F] rounded-full mt-2 flex-shrink-0" />
          <span className="text-[#005C8F] font-circular-std font-normal text-[16px/[100%] tracking-normal">
            Include all relevant details in the description
          </span>
        </li>
        <li className="flex items-start space-x-3">
          <div className="w-2 h-2 bg-[#005C8F] rounded-full mt-2 flex-shrink-0" />
          <span className="text-[#005C8F] font-circular-std font-normal text-[16px/[100%] tracking-normal">
            Upload clear, well-lit photos
          </span>
        </li>
        <li className="flex items-start space-x-3">
          <div className="w-2 h-2 bg-[#005C8F] rounded-full mt-2 flex-shrink-0" />
          <span className="text-[#005C8F] font-circular-std font-normal text-[16px/[100%] tracking-normal">
            Set a competitive price
          </span>
        </li>
        <li className="flex items-start space-x-3">
          <div className="w-2 h-2 bg-[#005C8F] rounded-full mt-2 flex-shrink-0" />
          <span className="text-[#005C8F] font-circular-std font-normal text-[16px/[100%] tracking-normal">
            Respond quickly to inquiries
          </span>
        </li>
      </ul>
    </div>
  )
}
