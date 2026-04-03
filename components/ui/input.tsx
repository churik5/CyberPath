import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-xl border border-white/8 bg-white/[0.04] px-4 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-sky-400/30 focus:bg-white/[0.06] hover:border-white/12",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
