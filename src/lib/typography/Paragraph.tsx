import { cn } from "../utils";
import React, { PropsWithChildren } from "react";

type ParagraphProps = PropsWithChildren<{
  className?: string;
  fontSize?: "small" | "extraSmall" | "large";
  bold?: boolean;
}>;

const styles = {
  fontSize: {
    extraSmall: "text-xs",
    small: "text-xs",
    large: "text-lg",
  },

  fontWeight: {
    bold: "text-body-900",
  },
};

export const Paragraph = ({
  children,
  className,
  fontSize,
  bold,
}: ParagraphProps) => {
  return (
    <p
      className={cn(
        `text-gray-900 mt-2 font-primary`,
        styles.fontSize[fontSize || "small"],
        bold ? styles.fontWeight.bold : "",
        className
      )}
    >
      {children}
    </p>
  );
};
