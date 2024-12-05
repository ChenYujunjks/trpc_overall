// components/ThemeToggle.tsx
"use client";

import { useTheme } from "@/components/themeProvider";
import { Button } from "@/components/ui/button";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme} variant="outline">
      {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    </Button>
  );
};
