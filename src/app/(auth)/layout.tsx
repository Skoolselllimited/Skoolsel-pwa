import React from "react";
import Navbar from "./components/Navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-100px)]">
        {children} {/* This is where your page.tsx content will be rendered */}
      </div>
    </div>
  );
}
