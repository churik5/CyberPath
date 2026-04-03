import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "border-sky-400/20 bg-sky-400/10 text-sky-300",
        muted: "border-white/8 bg-white/5 text-slate-400",
        accent: "border-indigo-400/20 bg-indigo-400/10 text-indigo-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
