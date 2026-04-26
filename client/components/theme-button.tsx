import { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ThemedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "default" | "sm" | "lg";
  href?: string;
  target?: string;
  rel?: string;
}

const ThemedButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ThemedButtonProps
>(({ className, size = "default", href, target, rel, ...props }, ref) => {
  const baseClasses = cn(
    "inline-flex items-center justify-center rounded-md text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 truncate",
    "bg-accent text-black hover:bg-accent/90",
    {
      "h-10 px-4 py-2": size === "default",
      "h-9 rounded-md px-3": size === "sm",
      "h-11 rounded-md px-8": size === "lg",
    },
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        className={baseClasses}
        target={target}
        rel={rel}
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }

  return (
    <button
      className={baseClasses}
      ref={ref as React.Ref<HTMLButtonElement>}
      {...props}
    />
  );
});
ThemedButton.displayName = "ThemedButton";

export { ThemedButton };
export default ThemedButton;
