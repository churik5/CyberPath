import {
  CloudCog,
  Code2,
  Crosshair,
  Fingerprint,
  LockKeyhole,
  Radar,
  Scale,
  Shield,
  UsersRound,
  Workflow,
} from "lucide-react";

import { TrackIconName } from "@/lib/types";
import { cn } from "@/lib/utils";

const iconMap = {
  "cloud-cog": CloudCog,
  "code-2": Code2,
  crosshair: Crosshair,
  fingerprint: Fingerprint,
  "lock-keyhole": LockKeyhole,
  radar: Radar,
  scale: Scale,
  shield: Shield,
  "users-round": UsersRound,
  workflow: Workflow,
} as const;

interface TrackIconProps {
  icon: TrackIconName;
  className?: string;
}

export function TrackIcon({ icon, className }: TrackIconProps) {
  const Icon = iconMap[icon];
  return <Icon className={cn("h-5 w-5", className)} strokeWidth={1.8} />;
}
