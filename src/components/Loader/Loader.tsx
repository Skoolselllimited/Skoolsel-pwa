export type LoaderProps = {
  colorClass?: string
}

export const Loader = ({ colorClass }: LoaderProps) => {
  colorClass = colorClass ?? "text-primary"
  const circleCommonClasses = `h-2.5 w-2.5 bg-current rounded-full ${colorClass}`

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
      <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
      <div className={`${circleCommonClasses} animate-bounce400`}></div>
    </div>
  )
}

export default Loader
