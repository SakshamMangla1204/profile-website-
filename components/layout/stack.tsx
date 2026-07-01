import { cn } from "@/lib/utils";

const gapMap = {
  xs: "gap-2",
  sm: "gap-3",
  md: "gap-5",
  lg: "gap-7",
  xl: "gap-10",
} as const;

type StackProps = React.HTMLAttributes<HTMLDivElement> & {
  gap?: keyof typeof gapMap;
};

export function Stack({
  className,
  gap = "md",
  ...props
}: StackProps) {
  return <div className={cn("flex flex-col", gapMap[gap], className)} {...props} />;
}
