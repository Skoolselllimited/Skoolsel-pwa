import { Metadata } from "next"
import LandingRootLayoutWrapper from "."

export const metadata: Metadata = {
  title: "Home | Skoolsel",
  description: "Skoolsel landing page",
}

export default function LandingRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <LandingRootLayoutWrapper>{children}</LandingRootLayoutWrapper>
}
