import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type PillProps = React.HTMLAttributes<HTMLDivElement> & {
  icon?: LucideIcon;
};

export function Pill({ className, children, icon: Icon, ...props }: PillProps) {
  return (
    <div
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground",
        className
      )}
      {...props}
    >
      {Icon ? <Icon className="h-3.5 w-3.5 text-white" /> : null}
      <span>{children}</span>
    </div>
  );
}
