import React from "react"
import { DialogHeader } from "../ui/dialog"
import BackButton from "../BackButton"
import Title from "../DialogTitle"
import ClearAllButton from "../ClearAllButton"

interface Props {
  back?: () => void
  title: string
  clearText: string
  clear?: () => void
}

export default function DialogHead({ back, title, clear, clearText }: Props) {
  return (
    <DialogHeader className="pt-4 px-[15px]">
      <div className="h-[72px] py-4 flex items-center justify-between">
        <BackButton onClick={back} />
        <Title text={title} />
        <ClearAllButton text={clearText} onClick={clear} />
      </div>
    </DialogHeader>
  )
}
