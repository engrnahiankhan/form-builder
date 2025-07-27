import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",

        success:
          "bg-green-600 text-white shadow-xs hover:bg-green-700 focus-visible:ring-green-500/20 dark:bg-green-500 dark:hover:bg-green-600",
        warning:
          "bg-yellow-500 text-white shadow-xs hover:bg-yellow-600 focus-visible:ring-yellow-500/20 dark:bg-yellow-600 dark:hover:bg-yellow-700",
        info: "bg-blue-600 text-white shadow-xs hover:bg-blue-700 focus-visible:ring-blue-500/20 dark:bg-blue-500 dark:hover:bg-blue-600",
        purple:
          "bg-purple-600 text-white shadow-xs hover:bg-purple-700 focus-visible:ring-purple-500/20 dark:bg-purple-500 dark:hover:bg-purple-600",
        gradient:
          "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xs hover:from-purple-600 hover:to-pink-600",
        glassmorphism:
          "bg-white/10 backdrop-blur-sm border border-white/20 text-white shadow-xs hover:bg-white/20 dark:bg-black/10 dark:border-white/10",
        neon: "bg-cyan-500 text-white shadow-xs hover:bg-cyan-600 shadow-cyan-500/50 hover:shadow-cyan-600/50 border border-cyan-400",
        minimal:
          "bg-gray-100 text-gray-900 shadow-xs hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
        inverse:
          "bg-foreground text-background shadow-xs hover:bg-foreground/90",
        soft: "bg-primary/10 text-primary shadow-xs hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30",
        solid:
          "bg-slate-900 text-white shadow-xs hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200",
        rounded:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 rounded-full",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-2",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
