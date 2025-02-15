import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "ghost" | "primary" | "outline";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
