import { ChevronLeft } from "lucide-react"
import { Button } from "../ui/button"

export default function BackButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="h-10 w-10 border border-[#DADDE5] rounded-full"
    >
      <ChevronLeft className="h-10 w-10" />
    </Button>
  )
}
