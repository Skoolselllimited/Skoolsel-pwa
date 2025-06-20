import React from "react"
import { DialogTitle } from "../ui/dialog"

export default function Title({ text }: { text: string }) {
  return (
    <DialogTitle className="font-circular-std font-extrabold text-[#4E4E5A] text-[20px]/[32px] tracking-normal">
      {text}
    </DialogTitle>
  )
}
