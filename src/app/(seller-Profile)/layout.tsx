import React from "react";
import Header from "../(landing-page)/_components/header";

export default function SellerProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <div>
        {children} {/* This is where your page.tsx content will be rendered */}
      </div>
    </div>
  );
}
