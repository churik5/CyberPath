import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-cyan-300/30 focus:bg-white/[0.06]",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
