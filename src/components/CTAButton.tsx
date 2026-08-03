import { cn } from "@/lib/utils";

export function CTAButton({
  children,
  className,
  onClick,
  type = "button",
  disabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn("btn-cta", disabled && "cursor-not-allowed opacity-70", className)}
    >
      {children}
    </button>
  );
}
