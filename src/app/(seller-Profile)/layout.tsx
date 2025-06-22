import React from "react";
import Navbar from "../(auth)/components/Navbar";

export default function SellerProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div>
        {children} {/* This is where your page.tsx content will be rendered */}
      </div>
    </div>
  );
}
