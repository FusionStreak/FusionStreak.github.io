"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

type ThemeSwitcherProps = {
  className?: string;
  title?: string;
};

export function ThemeSwitcher({ className, title }: ThemeSwitcherProps) {
  const { theme, systemTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const resolvedTheme = React.useMemo(() => {
    if (!mounted) return "light";
    if (theme === "system") return systemTheme ?? "light";
    return theme ?? "light";
  }, [mounted, theme, systemTheme]);

  const handleToggle = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Toggle theme"
      title={title ?? "Toggle theme"}
      className={cn(
        "relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-border/40 bg-background/80 text-foreground shadow-sm transition-colors duration-200 hover:border-border hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <Sun
        className={cn(
          "h-[1.4rem] w-[1.4rem] rotate-0 scale-100 transform transition-all duration-300",
          resolvedTheme === "dark" && "-rotate-90 scale-0"
        )}
      />
      <Moon
        className={cn(
          "absolute h-[1.3rem] w-[1.3rem] rotate-90 scale-0 transform transition-all duration-300",
          resolvedTheme === "dark" && "rotate-0 scale-100"
        )}
      />
    </button>
  );
}

export default ThemeSwitcher;
