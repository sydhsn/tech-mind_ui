import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "ghost" | "primary" | "outline";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    // Define base styles
    const baseStyles =
      "cursor-pointer px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

    // Define variant-specific styles
    const variantStyles = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
      outline:
        "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
      ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
    };

    return (
      <Comp
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
