import { cn } from "@/lib/utils";

type IconWrapProps = React.HTMLAttributes<HTMLDivElement>;

export function IconWrap({ className, ...props }: IconWrapProps) {
  return (
    <div
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white shadow-inner-line",
        className
      )}
      {...props}
    />
  );
}
