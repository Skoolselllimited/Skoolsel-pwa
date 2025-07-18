import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MyAd Details | Skoolsel",
  description: "Skoolsel my ad details page",
};

export default function LandingRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
