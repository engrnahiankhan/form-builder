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

        // New Modern Variants
        brutalist:
          "bg-black text-white border-4 border-black shadow-[4px_4px_0px_0px_theme(colors.yellow.400)] hover:shadow-[2px_2px_0px_0px_theme(colors.yellow.400)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-150 font-bold uppercase tracking-wider",

        neumorphism:
          "bg-gray-200 text-gray-800 shadow-[inset_-8px_-8px_16px_#ffffff,inset_8px_8px_16px_#d1d9e6] hover:shadow-[inset_-4px_-4px_8px_#ffffff,inset_4px_4px_8px_#d1d9e6] dark:bg-gray-700 dark:text-gray-200 dark:shadow-[inset_-8px_-8px_16px_#374151,inset_8px_8px_16px_#1f2937] dark:hover:shadow-[inset_-4px_-4px_8px_#374151,inset_4px_4px_8px_#1f2937]",

        aurora:
          "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white shadow-lg hover:shadow-xl hover:scale-105 animate-gradient-x bg-[length:400%_400%] transition-all duration-300",

        cyber:
          "bg-black text-green-400 border border-green-400 shadow-[0_0_10px_theme(colors.green.400)] hover:shadow-[0_0_20px_theme(colors.green.400)] hover:bg-green-400/10 font-mono uppercase tracking-widest transition-all duration-300",

        holographic:
          "bg-gradient-to-r from-purple-500 via-blue-500 via-green-500 via-yellow-500 to-red-500 text-white shadow-lg hover:shadow-xl hover:scale-105 bg-[length:400%_100%] animate-pulse hover:animate-none transition-all duration-300",

        liquid:
          "bg-gradient-to-br from-blue-400 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105 hover:rotate-1 transition-all duration-300 ease-out hover:bg-gradient-to-br hover:from-purple-400 hover:to-pink-600",

        retro:
          "bg-gradient-to-r from-pink-500 to-violet-500 text-white border-2 border-white shadow-[0_0_20px_theme(colors.pink.500)] hover:shadow-[0_0_30px_theme(colors.violet.500)] font-bold uppercase tracking-wider transition-all duration-300",

        frosted:
          "bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-xl hover:bg-white/30 hover:shadow-2xl transition-all duration-300 dark:bg-black/20 dark:border-white/20 dark:hover:bg-black/30",

        magnetic:
          "bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-lg hover:shadow-2xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 ease-out border border-gray-600 hover:border-white/50",

        rainbow:
          "bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl animate-gradient-x bg-[length:400%_400%] hover:scale-105 transition-all duration-300",

        paper:
          "bg-white text-gray-900 shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] hover:shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)] hover:-translate-y-1 transition-all duration-300 border border-gray-200",

        pixel:
          "bg-green-500 text-white shadow-[0_0_0_2px_theme(colors.green.600),0_0_0_4px_theme(colors.green.700)] hover:shadow-[0_0_0_2px_theme(colors.green.600),0_0_0_4px_theme(colors.green.700),0_0_0_6px_theme(colors.green.800)] font-mono text-xs uppercase tracking-widest transition-all duration-200",

        elastic:
          "bg-blue-500 text-white shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 ease-out hover:bg-blue-600",

        glow: "bg-indigo-600 text-white shadow-[0_0_20px_theme(colors.indigo.600)] hover:shadow-[0_0_40px_theme(colors.indigo.500)] hover:bg-indigo-500 transition-all duration-300",

        morphing:
          "bg-gradient-to-r from-teal-400 to-blue-500 text-white shadow-lg hover:shadow-xl hover:from-pink-500 hover:to-orange-500 hover:scale-105 hover:rotate-3 transition-all duration-500 ease-out",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-2",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        xl: "h-12 rounded-lg px-8 text-base has-[>svg]:px-6",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
        "icon-xl": "size-12",
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
