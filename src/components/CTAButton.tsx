import { cn } from "@/lib/utils";

export function CTAButton({
  children,
  className,
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button type={type} onClick={onClick} className={cn("btn-cta", className)}>
      {children}
    </button>
  );
}
