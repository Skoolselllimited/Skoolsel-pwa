import StepThreeTip from "./setp3"
import StepOneTip from "./step1"
import StepTwoTip from "./step2"

interface StepTipsProps {
  currentStep: number
}

export default function StepTips({ currentStep }: StepTipsProps) {
  if (currentStep > 3) return null

  return (
    <div>
      {currentStep === 1 ? (
        <StepOneTip />
      ) : currentStep === 2 ? (
        <StepTwoTip />
      ) : currentStep === 3 ? (
        <StepThreeTip />
      ) : null}
    </div>
  )
}
