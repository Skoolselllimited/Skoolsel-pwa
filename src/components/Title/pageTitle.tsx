export default function PageTitle({ text }: { text: string }) {
  return (
    <h1 className="font-circular-std font-bold text-[20px]/[100%] tracking-normal text-[#212B36]">
      {text}
    </h1>
  )
}
