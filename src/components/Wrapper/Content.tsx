import { cn } from "@/lib/utils"
import { PropsWithChildren } from "react"

export type WrapperProps = {
  className?: string
}

export const Wrapper = ({
  children,
  className,
}: PropsWithChildren<WrapperProps>) => {
  return (
    <div
      className={cn(
        "w-full 3xl:w-17/25 4xl:w-11/20 3xl:max-w-max-container mx-0 3xl:mx-auto px-3 md:px-6 lg:px-12 xl:px-28 3xl:px-0",
        className
      )}
    >
      {children}
    </div>
  )
}

export default Wrapper

// 'w-full 3xl:w-17/25 4xl:w-11/20 3xl:max-w-max-container mx-0 3xl:mx-auto px-3 md:px-6 lg:px-12 xl:px-28 3xl:px-0'
