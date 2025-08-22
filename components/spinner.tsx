import React from "react";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const spinnerVariants = cva("flex-col items-center justify-center", {
  variants: {
    show: {
      true: "flex",
      false: "hidden",
    },
  },
  defaultVariants: {
    show: true,
  },
});

const loaderVariants = cva(
  "animate-spin text-primary  border-secondary  rounded-full",
  {
    variants: {
      size: {
        small: "size-6",
        medium: "size-8",
        large: "size-12",
      },
      borderSize: {
        small: "border-[3px]",
        medium: "border-[5px]",
        large: "border-[12px]",
      },
      borderColor: {
        blue: "border-t-blue-500",
        green: "border-t-green-500",
      },
    },
    defaultVariants: {
      size: "medium",
      borderSize: "small",
      borderColor: "blue",
    },
  }
);

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string;
  children?: React.ReactNode;
}

export function Spinner({
  size,
  borderColor,
  borderSize,
  show,
  children,
  className,
}: SpinnerContentProps) {
  return (
    <span className={spinnerVariants({ show })}>
      <div
        className={cn(
          loaderVariants({ size, borderSize, borderColor }),
          className
        )}
      />
      {children}
    </span>
  );
}
