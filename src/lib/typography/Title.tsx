import { cn } from "../utils";
import React, { PropsWithChildren } from "react";

type TitleProps = PropsWithChildren<{
  className?: string;
  asH1?: boolean;
}>;

export const Title = ({ children, className, asH1 = false }: TitleProps) => {
  const Component = asH1 ? "h1" : "h2";
  const sizeClass = asH1
    ? "text-2xl lg:text-3xl font-secondary font-semibold text-gray-700"
    : "text-xl font-secondary text-gray-700";

  return (
    <Component className={cn(`font-gray`, sizeClass, className)}>
      {children}
    </Component>
  );
};
