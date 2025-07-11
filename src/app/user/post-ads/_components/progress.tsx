import { Progress } from "@/components/ui/progress"

interface Step {
  id: number
  name: string
  description: string
}

interface ProgressStepperProps {
  steps: Step[]
  currentStep: number
}

export default function ProgressStepper({
  steps,
  currentStep,
}: ProgressStepperProps) {
  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100

  return (
    <div className="flex flex-col gap-2">
      {/* Progress Bar */}
      <Progress value={progressPercentage} />

      {/* Step Labels */}
      <div className="flex lg-md:justify-between">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`w-2 h-2 rounded-full mr-2 ${
                step.id === currentStep
                  ? "bg-[#005C8F]"
                  : step.id < currentStep
                    ? "bg-green-600 hidden lg-md:flex"
                    : "bg-gray-300 hidden lg-md:flex"
              }`}
            />
            <span
              className={`text-[14px]/[22px] tracking-normal font-circular-std ${
                step.id === currentStep
                  ? "text-gray-900 font-[450]"
                  : step.id < currentStep
                    ? "text-green-600 hidden lg-md:flex"
                    : "text-[#637381] hidden lg-md:flex"
              }`}
            >
              {step.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
