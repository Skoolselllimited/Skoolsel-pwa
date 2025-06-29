import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ad Details | Skoolsel",
  description: "Skoolsel ad details page",
}

export default function LandingRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div>{children}</div>
}
