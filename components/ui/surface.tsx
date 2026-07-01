import { cn } from "@/lib/utils";

type SurfaceProps = React.HTMLAttributes<HTMLDivElement> & {
  glow?: boolean;
  gradient?: boolean;
  variant?: "default" | "glass" | "glass-strong";
};

export function Surface({
  className,
  glow = false,
  gradient = false,
  variant = "default",
  ...props
}: SurfaceProps) {
  const variantStyles = {
    default: "bg-surface-1",
    glass:
      "bg-[linear-gradient(180deg,rgba(255,255,255,0.06)0%,rgba(255,255,255,0.02)100%)] backdrop-blur-[24px]",
    "glass-strong":
      "bg-[linear-gradient(180deg,rgba(255,255,255,0.08)0%,rgba(255,255,255,0.03)100%)] backdrop-blur-[32px]",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/[0.06] shadow-soft-xl",
        variantStyles[variant],
        glow &&
          "before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent",
        gradient && "gradient-border",
        className
      )}
      {...props}
    />
  );
}