import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ads Details | Skoolsel",
  description: "Skoolsel ads details page",
}

export default function LandingRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div>{children}</div>
}
