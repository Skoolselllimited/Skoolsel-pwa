import React from "react"
import { Button } from "../ui/button"

export default function ClearAllButton({
  text = "Clear All",
  onClick,
}: {
  text?: string
  onClick?: () => void
}) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      size="sm"
      className="text-[#1AA7EC] text-base font-semibold underline underline-offset-3 decoration-[#1AA7EC]"
    >
      {text}
    </Button>
  )
}
